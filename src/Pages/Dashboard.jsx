import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/SupabaseClient';

export default function Dashboard() {
  const FREE_TEST_ID = "c917f18f-2684-4ae2-be3a-2597870922b1";
  const [user, setUser] = useState(null);
  const [userAttempts, setUserAttempts] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [freeTestSubmitted, setFreeTestSubmitted] = useState(false);
  const [plan, setPlan] = useState(null);
  const [nextAssessmentDate, setNextAssessmentDate] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('starter_month');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) setUser(data.session.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      const user = userData?.user;
      setUser(user); // setState so it can be used later

      const stream = user?.user_metadata?.stream;

      if (stream) {
        const { data: streamInfo } = await supabase
          .from('stream_schedule')
          .select('next_assessment_date')
          .eq('stream', stream)
          .single();

        if (streamInfo?.next_assessment_date) {
          setNextAssessmentDate(streamInfo.next_assessment_date);
        }
      }

      const { data: attempts } = await supabase
        .from('user_attempts')
        .select('assessment_id')
        .eq('user_id', user.id);

      const { data: userAssessments } = await supabase
        .from('user_assessments')
        .select('assessment_id, submitted_on')
        .eq('user_id', user.id);

      const submittedIds = userAssessments
        .filter(a => a.submitted_on)
        .map(a => a.assessment_id);

      if (submittedIds.includes(FREE_TEST_ID)) setFreeTestSubmitted(true);

      const { data: allAssessments } = await supabase
        .from('assessments')
        .select('*');

      const attemptedSet = new Set([
        ...attempts.map((a) => a.assessment_id),
        ...submittedIds,
      ]);

      const filtered = allAssessments.filter((a) => !attemptedSet.has(a.id));
      setAssessments(filtered);
      setUserAttempts(attempts);
    };

    const fetchPlan = async () => {
      const { data } = await supabase
        .from('user_plans')
        .select('plan')
        .eq('user_id', user.id)
        .eq('status', 'success')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data?.plan) {
        setPlan(data.plan);
      } else {
        setPlan(null);
      }
    };

    fetchData();
    fetchPlan();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar">
        <h2>Dashboard</h2>

        <button className="sidebar-btn" onClick={() => navigate('/results')}>
          View Results
        </button>

        <div className="sidebar-card">
          {nextAssessmentDate && (
            <div style={{ marginBottom: '1rem', color: '#82aaff', fontSize: '0.85rem' }}>
              📅 Next Test: <strong>{new Date(nextAssessmentDate).toLocaleDateString()}</strong>
            </div>
          )}

          {assessments.length > 0 ? (
            <>
              <strong style={{ color: '#82aaff' }}>🧠 Available Tests:</strong>
              <ul style={{ paddingLeft: '1rem' }}>
                {assessments.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={`/exam/${a.id}`}
                      style={{ color: '#C3E88D', textDecoration: 'underline' }}
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <span style={{ color: '#f07178', fontStyle: 'italic' }}>
              No assessments available.
            </span>
          )}

          {!freeTestSubmitted && (
            <button
              className="sidebar-btn"
              style={{ marginTop: '1rem', backgroundColor: '#82aaff', color: '#000' }}
              onClick={() => navigate(`/exam/${FREE_TEST_ID}`)}
            >
              Take Free Test
            </button>
          )}
        </div>

        <button className="sidebar-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-content">
          <h1>Welcome to Your Dashboard</h1>
          {user?.email && (
            <p>
              Logged in as: <strong>{user.email}</strong>
            </p>
            
          )}
  {user?.user_metadata?.phone && (
  <p>Phone: <strong>{user.user_metadata.phone}</strong></p>
)}
{user?.user_metadata?.stream && (
  <p>Stream: <strong>{user.user_metadata.stream}</strong></p>
)}


          {plan ? (
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4caf50' }}>
              ✅ Current Plan: <strong>{plan}</strong>
            </p>
          ) : (
            <>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#f07178' }}>
                🆓 No active paid plan yet.
              </p>
              <button
                onClick={() => setShowPlanModal(true)}
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
              >
                💳 Buy a Plan
              </button>
            </>
          )}
        </div>
      </div>

      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-sm border border-gray-700 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-4">Choose a Plan</h2>
            <select
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="starter_month">Starter - ₹250/month</option>
              <option value="starter_6month">Starter - ₹1500/6 months</option>
              <option disabled>──────────</option>
              <option disabled>Achiever - ₹450/month (Coming Soon)</option>
              <option disabled>Achiever - ₹2700/6 months (Coming Soon)</option>
              <option disabled>Challenger - ₹750/month (Coming Soon)</option>
              <option disabled>Challenger - ₹4500/6 months (Coming Soon)</option>
            </select>
            <button
              onClick={() => navigate(`/checkout?plan=${selectedPlan}`)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Continue to Pay
            </button>
            <button
              onClick={() => setShowPlanModal(false)}
              className="mt-3 text-sm text-gray-400 hover:text-white text-center w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
