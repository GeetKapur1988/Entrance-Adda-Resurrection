import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";

export default function Results() {
  const [results, setResults] = useState([]);
  const [userPlan, setUserPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("plan_tier")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setUserPlan(profileData.plan_tier);
        }

        const { data: resultsData } = await supabase
          .from("results")
          .select("*, assessments(title)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (resultsData) {
          setResults(resultsData);
        }

        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // ✅ All JSX must be inside this return
  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Your Test History</h1>

      {userPlan === "free" && (
        <div className="bg-yellow-900 border border-yellow-600 text-yellow-300 p-4 rounded mb-6 text-sm text-center">
          🚀 Want detailed breakdowns, accuracy heatmaps & weak area insights?
          <br />
          <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-4 rounded">
            Upgrade to Premium
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No previous tests found.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {results.map((result, index) => {
            const status = result.status || "submitted";

            const getStatusColor = (status) => {
              switch (status) {
                case "evaluated":
                  return "text-green-400 border-green-500 bg-green-900";
                case "submitted":
                  return "text-yellow-400 border-yellow-500 bg-yellow-900";
                case "flagged":
                  return "text-red-400 border-red-500 bg-red-900";
                case "overridden":
                  return "text-purple-400 border-purple-500 bg-purple-900";
                default:
                  return "text-gray-300 border-gray-600 bg-gray-800";
              }
            };

            return (
              <div
                key={index}
                className="bg-[#111827] border border-gray-700 p-4 rounded shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    {new Date(result.created_at).toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-green-400">
                    Score: {result.parsed_score ?? result.score ?? "N/A"}
                  </span>
                </div>

                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Test:</strong> {result.assessments?.title || "Unknown"}</p>
                  <p><strong>Result ID:</strong> {result.id}</p>

                  <div className={`inline-block mt-2 px-2 py-1 text-xs rounded-full border font-semibold uppercase tracking-wide ${getStatusColor(status)}`}>
                    {status}
                  </div>
                </div>

                <a
                  href={`/results/${result.id}`}
                  className="text-blue-400 hover:underline text-sm mt-2 block"
                >
                  View Full Breakdown →
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
