import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 md:px-24 py-16 text-white bg-[#0d0d12]">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-6">
        Entrance Adda ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Your email address and name when you sign up.</li>
            <li>Phone number and educational preferences (like exam stream).</li>
            <li>Payment-related data for plan purchases (handled securely via trusted gateways).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use This Information</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>To create and manage your Entrance Adda account.</li>
            <li>To deliver educational assessments and analysis.</li>
            <li>To process payments securely and maintain service access.</li>
            <li>To improve our platform and respond to user queries.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
          <p>We do <strong>not</strong> share your personal data with third parties except:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>When required by law.</li>
            <li>With trusted partners like payment gateways (e.g., PayU, PhonePe) for transaction processing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal data by emailing us at <strong>support@entrance-adda.com</strong>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
          <p>We retain your data as long as your account is active or as needed for compliance and service delivery.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Security Measures</h2>
          <p>We use encryption, access controls, and secure infrastructure to protect your data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Updates to This Policy</h2>
          <p>We may update this policy. Changes will be reflected on this page with an updated revision date.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>If you have any questions or concerns about this policy, contact us at <strong>support@entrance-adda.com</strong>.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
