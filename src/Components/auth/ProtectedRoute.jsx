import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from "../../utils/SupabaseClient";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
