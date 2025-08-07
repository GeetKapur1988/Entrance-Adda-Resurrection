import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Login failed: " + error.message);
    } else {
      navigate("/dashboard");
    }
  };

  const handlePasswordReset = async (email) => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Password reset email sent. Please check your inbox.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* 🔷 Minimal Navbar */}
      <div className="p-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-400">Entrance Adda</Link>
          <div className="space-x-4 text-sm">
            <Link to="/signup" className="hover:underline text-gray-300">Sign Up</Link>
          </div>
        </div>
      </div>

      {/* 🔐 Login Form */}
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={handleLogin}
          className="bg-[#111827] border border-gray-700 p-8 rounded-md w-full max-w-md shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <label className="block mb-2 text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-600"
            required
          />

          <label className="block mb-2 text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-600"
            required
          />

          <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => handlePasswordReset(email)}
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}