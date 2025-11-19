import { useEffect, useState } from "react";

const initialState = {
  pair: "",
  entryPrice: "",
  targetPrice: "",
  riskLevel: "Medium",
  note: "",
  status: "Open"
};

const SignalForm = ({ onSubmit, editingSignal }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingSignal) {
      setForm({
        pair: editingSignal.pair,
        entryPrice: editingSignal.entryPrice,
        targetPrice: editingSignal.targetPrice,
        riskLevel: editingSignal.riskLevel,
        note: editingSignal.note || "",
        status: editingSignal.status
      });
    } else {
      setForm(initialState);
    }
  }, [editingSignal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      entryPrice: Number(form.entryPrice),
      targetPrice: Number(form.targetPrice)
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card-dark/80 rounded-2xl p-4 space-y-3 shadow-lg"
    >
      <h3 className="text-sm font-semibold mb-1">
        {editingSignal ? "Edit Signal" : "Add New Signal"}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="pair"
          placeholder="Pair (e.g. BTC/USDT)"
          value={form.pair}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
        />
        <select
          name="riskLevel"
          value={form.riskLevel}
          onChange={handleChange}
          className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          name="entryPrice"
          type="number"
          step="0.0001"
          placeholder="Entry Price"
          value={form.entryPrice}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
        />
        <input
          name="targetPrice"
          type="number"
          step="0.0001"
          placeholder="Target Price"
          value={form.targetPrice}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent col-span-2"
        >
          <option>Open</option>
          <option>Closed</option>
        </select>
      </div>

      <textarea
        name="note"
        rows="2"
        placeholder="Notes about this signal"
        value={form.note}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
      />

      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-accent text-bg-dark text-xs font-semibold hover:opacity-90 transition"
      >
        {editingSignal ? "Update Signal" : "Add Signal"}
      </button>
    </form>
  );
};

export default SignalForm;
