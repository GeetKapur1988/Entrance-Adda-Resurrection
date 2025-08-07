import { useState } from "react";
import { supabase } from "../../utils/SupabaseClient";
import { useNavigate } from "react-router-dom";

const FREE_TEST_ID = "c917f18f-2684-4ae2-be3a-2597870922b1"; // replace with actual test ID

const LeadForm = ({ source }) => {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stream: "NEET",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const generateTempPassword = () => {
    return Math.random().toString(36).slice(-10) + "#Aa";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const tempPassword = generateTempPassword();

    try {
      // ✅ Sign up user
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: tempPassword,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            stream: formData.stream,
            has_taken_free_test: false,
            plan: "starter",
            source,
          },
        },
      });

      if (signupError) {
  // 🔁 Check if user exists and already took free test
  if (source === "freetest") {
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("has_taken_free_test")
      .eq("email", formData.email)
      .single();

    if (existingUser?.has_taken_free_test) {
      alert("You’ve already taken the Free Test. Log in to view your results.");
      setSubmitting(false);
      return;
    }
  }

  // Default fallback if not a duplicate user
  throw signupError;
}
  
      const user = signupData?.user;
      const session = signupData?.session;

      // ✅ Insert into Leads table
      await supabase.from("Leads").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          stream: formData.stream,
          source: source || "unknown",
        },
      ]);

      // ✅ Insert into user_assessments (only for Free Test)
      if (source === "freetest") {
        await supabase.from("user_assessments").insert([
          {
            user_id: user?.id,
            user_email: formData.email,
            assessment_id: FREE_TEST_ID,
            submitted_on: null,
          },
        ]);
      }

      // ✅ Send password email
await fetch("/api/send-temp-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: formData.email,
    password: tempPassword,
    name: formData.name,
  }),
});

// ✅ Login only for checkout
if (source === "checkout" && session) {
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
  navigate("/checkout");
}

// ✅ Go to Free Test directly
if (source === "freetest") {
  navigate(`/exam/${FREE_TEST_ID}`);
}

// ✅ Cleanup
setFormData({ name: "", email: "", phone: "", stream: "NEET" });
    } catch (err) {
      console.error("Lead form error:", err.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Your Name"
        className="w-full px-4 py-2 rounded border border-yellow-400 bg-black text-white"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 rounded border border-yellow-400 bg-black text-white"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full px-4 py-2 rounded border border-yellow-400 bg-black text-white"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <select
        name="stream"
        className="w-full px-4 py-2 rounded border border-yellow-400 bg-black text-white"
        value={formData.stream}
        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
      >
        <option value="NEET">NEET</option>
        <option value="JEE" disabled>
          JEE (Coming Soon)
        </option>
      </select>
      <button
        type="submit"
        className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "Processing..." : "Continue"}
      </button>
    </form>
  );
};

export default LeadForm;
