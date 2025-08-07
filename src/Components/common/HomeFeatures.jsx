// src/components/HomeFeatures.jsx

const HomeFeatures = () => {
  return (
    <section className="py-16 px-4 md:px-8 text-white">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Our Core Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="feature-card">
          <h3 className="text-lg font-bold">AI-Powered Performance Analysis</h3>
          <p className="text-sm">Receive smart diagnostics and performance reports tailored to your NEET goals.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-lg font-bold">Instant Rank Prediction</h3>
          <p className="text-sm">Know where you stand among aspirants with real-time rank simulation.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-lg font-bold">Syllabus-Wise Test Coverage</h3>
          <p className="text-sm">Every question is mapped to NEET syllabus units for focused practice.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-lg font-bold">Tiered Result Reports</h3>
          <p className="text-sm">Choose between Starter, Pro, and Achiever packages to get the depth of insights you need.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-lg font-bold">Smart Question Generator (Coming Soon)</h3>
          <p className="text-sm">Let AI create personalized mock questions based on your weak zones.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-lg font-bold">Encrypted Result Delivery</h3>
          <p className="text-sm">Secure, private, and fast delivery of results directly to your email or dashboard.</p>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;