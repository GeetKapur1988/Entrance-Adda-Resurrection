// PaymentFailed.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PaymentFailed = () => (
  <div className="px-6 py-12 max-w-2xl mx-auto">
    <Card className="rounded-2xl shadow-md p-6 text-center">
      <CardContent>
        <h2 className="text-3xl font-bold mb-4 text-red-600">Payment Failed</h2>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong with your payment. No money was deducted.
        </p>
        <p className="text-sm text-gray-500">You can try again from your dashboard.</p>
      </CardContent>
    </Card>
  </div>
);

export default PaymentFailed;
