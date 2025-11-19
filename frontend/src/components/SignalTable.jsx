import { getBaseSymbol } from "../hooks/useCryptoPrices";

const SignalTable = ({
  signals,
  onEdit,
  onDelete,
  filters,
  setFilters,
  prices
}) => {
  return (
    <div className="bg-card-dark/80 rounded-2xl p-4 shadow-neon border border-slate-800">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <input
          placeholder="Search by pair..."
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
          className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
        />
        <div className="flex gap-2">
          <select
            value={filters.riskLevel}
            onChange={(e) =>
              setFilters((f) => ({ ...f, riskLevel: e.target.value }))
            }
            className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
          >
            <option value="">All Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto text-xs">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2">Pair</th>
              <th>Entry</th>
              <th>Target</th>
              <th>Live Price</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Note</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((s) => {
              const base = getBaseSymbol(s.pair);
              const livePrice = base ? prices[base] : null;
              const hitTarget =
                livePrice &&
                s.status === "Open" &&
                Number(livePrice) >= Number(s.targetPrice);

              return (
                <tr key={s._id} className="border-b border-gray-800">
                  <td className="py-2 font-medium">{s.pair}</td>
                  <td>{s.entryPrice}</td>
                  <td>{s.targetPrice}</td>
                  <td>
                    {livePrice ? (
                      <span className="text-emerald-400">
                        {livePrice.toFixed(2)}
                        {hitTarget && (
                          <span className="ml-1 text-[10px] text-amber-300">
                            • target hit!
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 text-[10px] rounded-full border ${
                        s.riskLevel === "High"
                          ? "bg-red-500/20 text-red-300 border-red-500/60"
                          : s.riskLevel === "Medium"
                          ? "bg-yellow-500/20 text-yellow-200 border-yellow-500/60"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/60"
                      }`}
                    >
                      {s.riskLevel}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 text-[10px] rounded-full border ${
                        s.status === "Open"
                          ? "border-sky-400/70 text-sky-300 bg-sky-500/10"
                          : "border-slate-500/70 text-slate-300 bg-slate-500/10"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="max-w-xs truncate">{s.note}</td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => onEdit(s)}
                      className="px-2 py-1 rounded-lg border border-gray-600 hover:border-accent text-[11px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(s._id)}
                      className="px-2 py-1 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 text-[11px]"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              );
            })}
            {signals.length === 0 && (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-400">
                  No signals yet. Add your first one 🚀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignalTable;
