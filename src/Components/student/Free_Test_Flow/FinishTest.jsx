import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/contexts/AuthProvider.jsx";
import { supabase } from "../../../utils/SupabaseClient";

export default function FinishTest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || localStorage.getItem("score") || 0;
  const subject = location.state?.subject || localStorage.getItem("subject") || "General";
  const testName = location.state?.testName || "Free Test";

  useEffect(() => {
    const saveScore = async () => {
      if (!user) return; // Skip saving for free test users
      try {
        const { error } = await supabase.from("test_results").insert([
          {
            user_id: user.id,
            test_name: testName,
            subject: subject,
            score: parseInt(score),
            plan: "free",
            test_type: "free_test",
            taken_at: new Date(),
          },
        ]);
        if (error) console.error("Error saving test result:", error);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    saveScore();
  }, [user, score, subject, testName]);

  const handleRedirect = () => {
    if (user) navigate("/dashboard");
    else navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-6">
        {user
          ? "Your score has been saved to your dashboard. You can review it anytime."
          : "Thank you for attempting the free test. We’ve sent your result to your email."}
      </p>
      <Button onClick={handleRedirect}>
        {user ? "Go to Dashboard" : "Return Home"}
      </Button>
    </div>
  );
}
