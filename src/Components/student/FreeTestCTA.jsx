import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";

const FREE_TEST_ID = "c917f18f-2684-4ae2-be3a-2597870922b1";

export default function FreeTestCTA() {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const checkFreeTestEligibility = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user?.id) {
        // Not logged in → show CTA anyway (they’ll be redirected to sign up)
        setShowCTA(true);
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from("user_assessments")
        .select("attempted")
        .eq("user_id", userId)
        .eq("assessment_id", FREE_TEST_ID)
        .maybeSingle();

      if (error) {
        console.warn("Free Test check error:", error.message);
        setShowCTA(true); // fallback to show CTA if error
        return;
      }

      if (!data || data.attempted !== true) {
        setShowCTA(true);
      }
    };

    checkFreeTestEligibility();
  }, []);

  if (!showCTA) return null;

  return (
    <div className="my-8 text-center">
      <Link
        to={`/exam/${FREE_TEST_ID}`}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
      >
        Take Free NEET Test
      </Link>
    </div>
  );
}