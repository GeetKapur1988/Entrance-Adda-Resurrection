// ✅ Final, Future-Proof Assessments.jsx (Handles Free Test & Paid Assessments)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/SupabaseClient';
import { toast } from 'react-hot-toast';

const FREE_TEST_ID = "c917f18f-2684-4ae2-be3a-2597870922b1";

const Assessment = () => {
  const { id } = useParams();
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const isFreeTest = id === FREE_TEST_ID;

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAssessmentAndQuestions = async () => {
      const { data: assessmentData, error: assessError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single();

      if (assessError) {
        console.error('Error fetching assessment:', assessError);
        setLoading(false);
        return;
      }

      setAssessment(assessmentData);

      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .select('*')
        .eq('assessment_id', id);

      if (questionError) {
        console.error('Error fetching questions:', questionError);
      } else {
        setQuestions(questionData);
      }

      setLoading(false);
    };

    fetchAssessmentAndQuestions();
  }, [id]);

  useEffect(() => {
    const blockFreeTestIfAlreadyAttempted = async () => {
      if (!isFreeTest || !userId) return;

      const { data, error } = await supabase
        .from('user_assessments')
        .select('attempted')
        .eq('user_id', userId)
        .eq('assessment_id', FREE_TEST_ID)
        .maybeSingle();

      if (data?.attempted === true) {
        toast("🚫 You've already attempted the Free Test.");
        navigate('/dashboard');
      }
    };
    blockFreeTestIfAlreadyAttempted();
  }, [userId, isFreeTest, navigate]);

  useEffect(() => {
    const blockPaidRetake = async () => {
      if (isFreeTest || !userId) return;

      const { data, error } = await supabase
        .from("user_attempts")
        .select("id")
        .eq("user_id", userId)
        .eq("assessment_id", id)
        .maybeSingle();

      if (data) {
        toast("🚫 You've already submitted this test.");
        navigate("/dashboard");
      }
    };
    blockPaidRetake();
  }, [userId, isFreeTest, id, navigate]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const calculateScore = () => {
    return questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0),
      0
    );
  };

  const handleSubmit = async () => {
  const finalScore = calculateScore();
  setScore(finalScore);
  setSubmitted(true);

  if (!userId || !assessment) return;

  if (isFreeTest) {
    const { error } = await supabase.from('user_assessments').upsert(
      [
        {
          user_id: userId,
          assessment_id: FREE_TEST_ID,
          score: finalScore,
          attempted: true,
          submitted_on: new Date().toISOString(),
        },
      ],
      { onConflict: ['user_id', 'assessment_id'] }
    );
    if (error) {
      console.error("❌ Failed to save Free Test:", error.message);
    }
  } else {
    const { error: attemptError } = await supabase.from('user_attempts').insert([
      {
        user_id: userId,
        assessment_id: id,
        score: finalScore,
      },
    ]);
    if (attemptError) {
      console.error("❌ Failed to save user_attempts:", attemptError.message);
    }

    // ✅ NEW: Save to user_assessments so Dashboard hides it
    const { error: assessmentError } = await supabase.from('user_assessments').upsert(
      [
        {
          user_id: userId,
          assessment_id: id,
          score: finalScore,
          attempted: true,
          submitted_on: new Date().toISOString(),
        },
      ],
      { onConflict: ['user_id', 'assessment_id'] }
    );
    if (assessmentError) {
      console.error("❌ Failed to save user_assessments:", assessmentError.message);
    }
  }

  toast.success("✅ Test Submitted – Redirecting to Dashboard...");
  setTimeout(() => navigate('/dashboard'), 1500);
};

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {assessment?.name || 'Assessment'} – {assessment?.schedule_date && new Date(assessment.schedule_date).toLocaleString()}
      </h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this assessment.</p>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q.id} className="mb-6 border p-4 rounded-lg shadow">
              <h2 className="font-semibold">Q{q.id}: {q.question}</h2>
              <div className="mt-2 space-y-2">
                {['A', 'B', 'C', 'D'].map((key) => (
                  <label key={key} className="block">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={key}
                      checked={answers[q.id] === key}
                      onChange={() => handleOptionChange(q.id, key)}
                      className="mr-2"
                      disabled={submitted}
                    />
                    {key}. {q[`option_${key.toLowerCase()}`]}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-4 text-lg">
              ✅ Your Score: {score} / {questions.length}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Assessment;