// src/pages/ThankYou.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

export default function ThankYou() {
  const navigate = useNavigate();
  const score = localStorage.getItem("score");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">🎉 Thank You!</h1>
      <p className="text-lg text-gray-800 mb-2">You’ve completed the Free NEET Mock Test.</p>

      {score && (
        <p className="text-xl font-semibold text-green-600 mb-6">
          Your Score: {score}
        </p>
      )}

      <p className="text-center text-gray-600 mb-6">
        Your result has been saved and will be delivered to your email shortly.
      </p>

      {!user && (
        <div className="bg-yellow-100 text-yellow-900 text-center p-4 rounded mb-6 border border-yellow-300 shadow-sm">
          <p className="font-medium">📊 Want detailed analysis?</p>
          <p className="text-sm">
            Login to see your question-wise breakdown, improvement areas, and smart suggestions.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-yellow-500 text-black px-5 py-2 rounded hover:bg-yellow-600 transition"
          >
            Login to Unlock Full Report
          </button>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
}
    