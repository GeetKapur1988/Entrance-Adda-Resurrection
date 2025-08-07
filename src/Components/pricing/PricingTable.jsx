// PricingTable.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@supabase/auth-helpers-react';
import { launchPayU } from '@/utils/payuHash';

const plans = [
  {
    name: 'Starter',
    price: 250,
    mrp: 350,
    discountLabel: '🎉 Launch Discount – Save ₹100!',
    sixMonthPrice: 1500,
    features: ['Attempt NEET Free Test', 'Basic Scorecard View', 'Basic Time Analysis'],
    buttonText: 'Start Now',
    planType: 'starter',
    isActive: true,
  },
  {
    name: 'Achiever',
    price: 450,
    sixMonthPrice: 2700,
    features: ['Unlock Detailed Scorecard', 'Time & Accuracy Report', 'Heatmap Analysis Demo'],
    buttonText: 'Upgrade to Achiever',
    planType: 'achiever',
    isActive: false,
  },
  {
    name: 'Challenger',
    price: 750,
    sixMonthPrice: 4500,
    features: ['All Achiever Features', 'Full Heatmap Access', 'Upcoming Features Included'],
    buttonText: 'Go Challenger',
    planType: 'challenger',
    isActive: false,
  },
];

const PricingTable = () => {
  const user = useUser();

  const handleBuy = (planType, isActive, amount, durationLabel) => {
    if (!isActive || !user) return;
    const planName = `${planType === 'starter' ? 'Starter Plan' : planType} - ${durationLabel}`;
    launchPayU({
      amount,
      plan: planName,
      user,
    });
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <Card key={idx} className="rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-4 text-center">{plan.name}</h3>

              {plan.planType === 'starter' ? (
                <div className="text-center mb-1">
                  <p className="text-sm line-through text-gray-400">₹{plan.mrp}</p>
                  <p className="text-3xl font-bold text-green-600">₹{plan.price}</p>
                  <p className="text-xs text-yellow-600 font-medium mt-1">{plan.discountLabel}</p>
                </div>
              ) : (
                <p className="text-3xl font-bold text-center mb-1">
                  ₹{plan.price} <span className="text-sm font-medium text-gray-400">/ month</span>
                </p>
              )}

              <p className="text-md text-center text-gray-500 mb-4">₹{plan.sixMonthPrice} for 6 months</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-700">✔ {feature}</li>
                ))}
              </ul>

              <div className="flex gap-2">
                <Button
                  className={`w-full ${!plan.isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                  variant="default"
                  onClick={() => handleBuy(plan.planType, plan.isActive, plan.price, 'Monthly')}
                >
                  {plan.buttonText}
                </Button>
                {plan.planType === 'starter' && (
                  <Button
                    className={`w-full ${!plan.isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                    variant="secondary"
                    onClick={() => handleBuy(plan.planType, plan.isActive, plan.sixMonthPrice, '6M')}
                  >
                    Starter 6M
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;