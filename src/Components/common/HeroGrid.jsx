
export default function HeroGrid() {
  return (
    <section className="bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] text-white py-20 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#FFD700] mb-6">AI Powered NEET Preparation</h1>
        <p className="text-gray-300 text-lg mb-10">
          Personalized insights. Adaptive questions. Real-time rank tracking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#FFD700]">
            <h3 className="text-xl font-semibold text-[#FFD700] mb-2">Adaptive Testing</h3>
            <p>Questions that adjust to your level after every assessment.</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#FFD700]">
            <h3 className="text-xl font-semibold text-[#FFD700] mb-2">AI Performance Heatmaps</h3>
            <p>Track your strengths and weaknesses by chapter and topic.</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#FFD700]">
            <h3 className="text-xl font-semibold text-[#FFD700] mb-2">All India Rank Simulation</h3>
            <p>See where you stand if NEET were conducted today.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
