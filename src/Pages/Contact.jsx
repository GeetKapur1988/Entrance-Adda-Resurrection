import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer"; // ✅ Corrected path
import SubmitFeedback from "@/components/student/SubmitFeedback";
const Contact = () => {
  return (
    <div className="app-background text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-black/40 to-black/10 backdrop-blur-xl rounded-2xl shadow-md shadow-gold/10 p-10">
          <h2 className="text-4xl font-heading text-gold mb-8 text-center">Get In Touch with Us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">General Queries</h3>
              <p className="mb-1">📧 support@entrance-adda.in</p>
              
              <h3 className="text-xl font-bold text-gold mb-2">Sales & Partnerships</h3>
              <p className="mb-4">📧 support@entrance-adda.in</p>

              <h3 className="text-xl font-bold text-gold mb-2">Registered Address</h3>
              <p>QuantumShift Consulting <br />Bengaluru, Karnataka, India</p>
            </div>
            <SubmitFeedback />

            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gold shadow-sm">
              <p className="italic text-sm">
                We typically respond within 24 hours. For urgent support, please use the phone number listed above.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow">
  <section className="py-20 px-6 max-w-6xl mx-auto">
    {/* existing contact form content */}
  </section>
</div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

