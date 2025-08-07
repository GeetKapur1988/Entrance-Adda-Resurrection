import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stream, setStream] = useState("NEET");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, sign up the user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (authData?.user) {
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: email,
        name: name,
        phone: phone,
        stream: stream,
        signup_source: 'manual_signup',
        created_at: new Date().toISOString(),
      });

    if (userError) {
      console.error("Error creating user profile:", userError);
    }
  }

      if (authError) {
        alert("Signup failed: " + authError.message);
        setIsLoading(false);
        return;
      }

      // If signup successful, create entry in users table
      await supabase.from('users').insert({
  id: authData.user.id,
  email: email,
  name: name,
  phone: phone,
  stream: stream,
  signup_source: 'manual_signup',
  created_at: new Date().toISOString()
});


        if (userError) {
          console.error("Error creating user profile:", userError);
          // Don't show error to user as auth signup was successful
          // They can still proceed and update profile later
        }
      alert("Signup successful! Please check your inbox to verify your email.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* 🔷 Minimal Navbar */}
      <div className="p-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-400">Entrance Adda</Link>
          <div className="space-x-4 text-sm">
            <Link to="/login" className="hover:underline text-gray-300">Login</Link>
          </div>
        </div>
      </div>

      {/* 📝 Signup Form */}
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={handleSignup}
          className="bg-[#111827] border border-gray-700 p-8 rounded-md w-full max-w-md shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

          <label className="block mb-2 text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
            placeholder="Enter your full name"
            required
          />

          <label className="block mb-2 text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
            placeholder="your@email.com"
            required
          />

          <label className="block mb-2 text-sm text-gray-300">Phone (Optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
            placeholder="10-digit mobile number"
            pattern="[6-9]{1}[0-9]{9}"
            maxLength="10"
          />

          <label className="block mb-2 text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
            placeholder="Choose a strong password"
            minLength="6"
            required
          />

          <label className="block mb-2 text-sm text-gray-300">Stream</label>
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="w-full p-2 mb-6 rounded bg-gray-900 text-white border border-gray-600"
            required
          >
            <option value="NEET">NEET</option>
            <option value="JEE" disabled className="text-gray-500">JEE - Coming Soon</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>

          <p className="text-center text-xs text-gray-500 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
            <br />
            No plan will be assigned until you make a payment.
          </p>
        </form>
      </div>
    </div>
  );
}