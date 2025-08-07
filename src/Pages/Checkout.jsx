import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";
import { v4 as uuidv4 } from "uuid";

const plans = [
  { id: "starter_month", name: "Starter - ₹250/month", price: 250 },
  { id: "starter_6month", name: "Starter - ₹1500/6 months", price: 1500 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  }, []);

  const handlePayment = async () => {
    const transactionRef = uuidv4();

    if (user) {
      await supabase.from("payments").insert([
        {
          user_id: user.id,
          email,
          phone,
          amount: selectedPlan.price,
          plan_id: selectedPlan.id,
          status: "initiated",
          gateway: "PayU",
          transaction_ref: transactionRef,
          created_at: new Date().toISOString(),
        },
      ]);

      await supabase.from("user_plans").insert({
        user_id: user.id,
        plan: selectedPlan.id,
        status: "success",
        activated_at: new Date().toISOString(),
      });

      await supabase.from("payment_logs").insert({
        user_id: user.id,
        email: user.email,
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || null,
        amount: selectedPlan.price,
        plan_id: selectedPlan.id,
        status: "success",
        timestamp: new Date().toISOString(),
        gateway: "PayU",
        transaction_ref: transactionRef,
        error_message: null,
      });

      await fetch("https://szlgopcqquwizeivkutc.functions.supabase.co/send_payment_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          plan: selectedPlan.name,
          amount: selectedPlan.price,
          transaction_ref: transactionRef,
        }),
      });

      await supabase.from("users").update({ has_paid: true }).eq("id", user.id);
      alert("Payment successful! Plan activated.");
      navigate("/dashboard");
    } else {
      const { data: signedUp, error: signupError } = await supabase.auth.signUp({
        email,
        password: phone + "@qshift",
      });

      if (signupError) {
        console.error("❌ Error signing up:", signupError);
        return;
      }

      const newUser = signedUp?.user;

      if (newUser) {
        await supabase.from("users").insert([
          {
            id: newUser.id,
            email: newUser.email,
            signup_source: "auto_checkout",
            created_at: new Date().toISOString(),
          },
        ]);

        await fetch("https://szlgopcqquwizeivkutc.functions.supabase.co/send_signup_email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: newUser.email,
            temp_password: phone + "@qshift",
          }),
        });

        await supabase.from("user_plans").insert([
          {
            user_id: newUser.id,
            plan: selectedPlan.id,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]);

        await supabase.from("payment_logs").insert([
          {
            email,
            phone,
            name,
            amount: selectedPlan.price,
            plan_id: selectedPlan.id,
            gateway: "PayU",
            status: "initiated",
            transaction_ref: transactionRef,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    }

    alert("Proceeding to payment gateway...");
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center">
      <div className="bg-[#111827] p-6 rounded-lg w-[90%] max-w-sm border border-gray-700 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">Select Plan & Checkout</h2>

        <select
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
          value={selectedPlan.id}
          onChange={(e) =>
            setSelectedPlan(plans.find((p) => p.id === e.target.value))
          }
        >
          <option value="starter_month">Starter - ₹250/month</option>
          <option value="starter_6month">Starter - ₹1500/6 months</option>
          <option disabled>──────────</option>
          <option disabled>Achiever - ₹450/month (Coming Soon)</option>
          <option disabled>Achiever - ₹2700/6 months (Coming Soon)</option>
          <option disabled>Challenger - ₹750/month (Coming Soon)</option>
          <option disabled>Challenger - ₹4500/6 months (Coming Soon)</option>
        </select>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-900 text-white border border-gray-700"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-900 text-white border border-gray-700"
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-700"
        />

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          Continue to Pay
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-3 text-sm text-gray-400 hover:text-white text-center w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
