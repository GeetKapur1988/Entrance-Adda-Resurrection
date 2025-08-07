export default function Leaderboard() {
  return (
    <section className="bg-royal text-gold min-h-screen px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        🏆 Top Performers
      </h2>
      <ul className="space-y-4">
        <li className="flex justify-between border-b border-gold-soft pb-2">
          <span>🥇 Anjali Verma</span>
          <span className="text-gold-soft">98.2%</span>
        </li>
        <li className="flex justify-between border-b border-gold-soft pb-2">
          <span>🥈 Rohan Mehta</span>
          <span className="text-gold-soft">97.8%</span>
        </li>
        <li className="flex justify-between">
          <span>🥉 Sneha Iyer</span>
          <span className="text-gold-soft">96.5%</span>
        </li>
      </ul>
    </section>
  );
}
