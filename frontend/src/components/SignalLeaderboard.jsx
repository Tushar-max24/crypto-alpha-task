const SignalLeaderboard = ({ signals }) => {
  if (!signals || signals.length === 0) return null;

  const ranked = [...signals]
    .map((s) => ({
      ...s,
      upside: Number(s.targetPrice) - Number(s.entryPrice)
    }))
    .sort((a, b) => b.upside - a.upside)
    .slice(0, 5);

  return (
    <div className="bg-card-dark/80 rounded-2xl p-4 border border-slate-800 shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Highest Upside Signals</h3>
        <span className="text-[10px] text-gray-400">
          Ranked by potential (target − entry)
        </span>
      </div>
      <div className="space-y-2">
        {ranked.map((s, idx) => (
          <div
            key={s._id}
            className="flex items-center justify-between text-xs bg-bg-dark/70 px-3 py-2 rounded-xl border border-slate-700"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-gray-300">
                {idx + 1}
              </span>
              <div>
                <div className="font-medium">{s.pair}</div>
                <div className="text-[10px] text-gray-400">
                  Risk: {s.riskLevel} • {s.status}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-emerald-400">
                +{(s.upside || 0).toFixed(2)}
              </div>
              <div className="text-[10px] text-gray-500">
                {s.entryPrice} → {s.targetPrice}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalLeaderboard;
