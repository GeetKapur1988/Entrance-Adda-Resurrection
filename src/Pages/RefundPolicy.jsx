import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen w-full bg-[#0e0e1a] text-white p-6">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">Refund, Return & Cancellation Policy</h1>

        <p className="mb-4">
          Entrance Adda offers digital products such as test plans and learning modules. We do not offer returns once a test is started or content is accessed.
        </p>

        <h2 className="text-2xl font-semibold text-white mb-2">Refunds</h2>
        <p className="mb-4">
          Refunds are processed in special cases (e.g. accidental or duplicate payments). Refunds will be issued to the original payment method within 5–7 business days upon approval.
        </p>

        <h2 className="text-2xl font-semibold text-white mb-2">Cancellations</h2>
        <p className="mb-4">
          You may cancel a subscription before activation. Once a test begins or content is accessed, cancellation is no longer possible.
        </p>

        <h2 className="text-2xl font-semibold text-white mb-2">Contact for Refund</h2>
        <p>
          For any refund or cancellation requests, please email us at:
          <br />
          <strong className="text-white">support@entranceadda.in</strong>
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
