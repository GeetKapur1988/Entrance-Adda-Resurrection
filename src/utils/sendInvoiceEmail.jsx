import React, { useState } from 'react';
import { supabase } from '../utils/SupabaseClient';
import generateInvoice from '../utils/InvoiceGenerator';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    txnId: '',
    plan: 'Achiever',
    amount: 450,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from('manual_payments').insert([
      {
        email: formData.email,
        name: formData.name,
        txn_id: formData.txnId,
        amount: formData.amount,
        plan_selected: formData.plan,
        status: 'pending',
      },
    ]);

    if (!error) {
      setSubmitted(true);

      const invoiceNumber = `EA-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
      generateInvoice({
        invoiceNumber,
        customerName: formData.name,
        customerEmail: formData.email,
        plan: `${formData.plan} Plan – 1 Month`,
        baseAmount: formData.amount,
        date: new Date().toLocaleDateString('en-IN'),
      });

      // Email automation handled via Hostinger + Zapier + Outlook
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0e0e1a] text-white p-6">
        <div className="max-w-xl mx-auto bg-[#1a1a2e] p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Payment Submitted</h2>
          <p className="text-gray-300 mb-2">Thank you! Your payment will be verified shortly.</p>
          <p className="text-sm italic text-gray-400">Your invoice has been downloaded automatically.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white p-6">
      <div className="max-w-xl mx-auto bg-[#1a1a2e] p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-white">Manual Payment via PhonePe</h1>
        <p className="mb-4 text-gray-400">
          Please send ₹450 to UPI ID <strong className="text-yellow-300">geetkapur@ybl</strong> and enter your details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 rounded bg-[#2a2a3c] text-white"
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 rounded bg-[#2a2a3c] text-white"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 rounded bg-[#2a2a3c] text-white"
            type="text"
            name="txnId"
            placeholder="PhonePe Transaction ID"
            value={formData.txnId}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Payment Info'}
          </button>
        </form>
      </div>
    </div>
  );
}
