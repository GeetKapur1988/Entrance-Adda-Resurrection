// PayUForm.jsx
import React, { useEffect } from 'react';

const PayUForm = ({ formData }) => {
  useEffect(() => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://test.payu.in/_payment';

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, [formData]);

  return <div className="text-center mt-20 text-xl">Redirecting to PayU...</div>;
};

export default PayUForm;