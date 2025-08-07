// PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '@supabase/auth-helpers-react';
import { Card, CardContent } from '@/Components/ui/card';

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const user = useUser(); // Ensure you are wrapped in <SessionContextProvider>

  useEffect(() => {
    const txnid = params.get('txnid');
    const status = params.get('status');
    const productinfo = params.get('productinfo') || '';
    const [plan, duration] = productinfo.split('-');
    const amount = params.get('amount');

    if (!user?.id || !txnid || status !== 'success') return;

    const payload = {
      txnid,
      user_id: user.id,
      plan,
      duration,
      amount,
      status,
    };

    fetch('https://szlgopcqquwizeivkutc.functions.supabase.co/payment-verify', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Optional: redirect after a few seconds
    const timeout = setTimeout(() => navigate('/dashboard'), 6000);
    return () => clearTimeout(timeout);
  }, [params, user, navigate]);

  return (
    <div className="px-6 py-12 max-w-2xl mx-auto">
      <Card className="rounded-2xl shadow-md p-6 text-center">
        <CardContent>
          <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful</h2>
          <p className="text-lg text-gray-700 mb-6">Thank you for upgrading your Entrance Adda plan.</p>
          <p className="text-sm text-gray-500">You’ll be redirected to your dashboard shortly.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;