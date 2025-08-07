import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";

export default function ResultDetail() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("results")
        .select(`
          *,
          assessments(title),
          questions (
            id,
            question,
            options,
            correct_option,
            selected_option,
            diagram_attachment
          )
        `)
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (!error) setResult(data);
      setLoading(false);
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        <p className="text-center text-gray-400">Loading result...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        <p className="text-center text-red-500">Result not found or access denied.</p>
      </div>
    );
  }

  const { assessments, questions, parsed_score, score, created_at } = result;
  const formattedDate = new Date(created_at).toLocaleString();
  const title = assessments?.title || "Assessment";
  const totalScore = parsed_score ?? score ?? "N/A";

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-4 py-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-3 text-blue-400">{title}</h1>

        <div className="text-center text-sm text-gray-400 mb-6 space-y-1">
          <p>Submitted on: {formattedDate}</p>
          <p>
            Score: <span className="text-green-300 font-semibold">{totalScore}</span>
          </p>
        </div>

        <div className="space-y-8">
          {questions?.map((q, index) => (
            <div
              key={q.id}
              className="bg-[#111827] border border-gray-700 p-5 rounded-lg shadow-md space-y-3"
            >
              <h2 className="text-base font-medium text-blue-300">
                Q{index + 1}. {q.question}
              </h2>

              {q.diagram_attachment && (
                <img
                  src={q.diagram_attachment}
                  alt={`Diagram Q${index + 1}`}
                  className="max-w-sm border border-gray-600 rounded"
                />
              )}

              <ul className="grid gap-2 text-sm">
                {q.options?.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isCorrect = letter === q.correct_option;
                  const isSelected = letter === q.selected_option;

                  return (
                    <li
                      key={letter}
                      className={`px-3 py-2 rounded-md transition-all
                        ${isCorrect ? "bg-green-800 text-green-200 border border-green-500" : ""}
                        ${!isCorrect && isSelected ? "bg-red-800 text-red-200 border border-red-500" : ""}
                        ${!isCorrect && !isSelected ? "bg-[#1f2937] text-gray-300 border border-gray-700" : ""}
                      `}
                    >
                      <span className="font-bold">{letter})</span> {opt}
                      {isCorrect && " ✅"}
                      {isSelected && !isCorrect && " ❌"}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/results"
            className="inline-block px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition"
          >
            ← Back to Results
          </Link>
        </div>
      </div>
    </div>
  );
}