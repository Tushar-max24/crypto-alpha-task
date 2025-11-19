import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import SignalForm from "../components/SignalForm.jsx";
import SignalTable from "../components/SignalTable.jsx";
import SignalInsights from "../components/SignalInsights.jsx";
import SignalLeaderboard from "../components/SignalLeaderboard.jsx";
import { useCryptoPrices } from "../hooks/useCryptoPrices.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  const [signals, setSignals] = useState([]);
  const [editingSignal, setEditingSignal] = useState(null);
  const [filters, setFilters] = useState({ search: "", riskLevel: "" });

  const { prices } = useCryptoPrices(signals);

  const fetchSignals = async () => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.riskLevel) params.riskLevel = filters.riskLevel;

    const res = await api.get("/signals", { params });
    setSignals(res.data);
  };

  useEffect(() => {
    fetchSignals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleCreateOrUpdate = async (data) => {
    if (editingSignal) {
      await api.put(`/signals/${editingSignal._id}`, data);
      setEditingSignal(null);
    } else {
      await api.post("/signals", data);
    }
    fetchSignals();
  };

  const handleDelete = async (id) => {
    await api.delete(`/signals/${id}`);
    fetchSignals();
  };

  const handleExportPdf = () => {
    if (!signals.length) return;

    const doc = new jsPDF();
    doc.text("Crypto Alpha - Signals Report", 14, 15);

    const rows = signals.map((s, i) => [
      i + 1,
      s.pair,
      s.entryPrice,
      s.targetPrice,
      s.riskLevel,
      s.status
    ]);

    autoTable(doc, {
      head: [["#", "Pair", "Entry", "Target", "Risk", "Status"]],
      body: rows,
      startY: 20
    });

    doc.save("crypto-alpha-signals.pdf");
  };

  const openCount = signals.filter((s) => s.status === "Open").length;
  const highRisk = signals.filter((s) => s.riskLevel === "High").length;

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-slate-100 bg-grid-sci bg-[length:18px_18px]">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-6 space-y-5">
        {/* Header + Export */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              Trading Signals Dashboard
            </h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Track your crypto alpha with live pricing, risk analytics and
              exportable reports tailored for Web3 research workflows.
            </p>
          </div>
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 text-xs rounded-full border border-accent bg-bg-dark hover:bg-accent hover:text-bg-dark transition shadow-neon"
          >
            🧾 Export as PDF
          </button>
        </div>

        {/* Small stat cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card-dark/80 rounded-2xl p-3 border border-slate-800 shadow">
            <p className="text-[10px] text-gray-400">Total Signals</p>
            <p className="text-xl font-semibold">{signals.length}</p>
          </div>
          <div className="bg-card-dark/80 rounded-2xl p-3 border border-slate-800 shadow">
            <p className="text-[10px] text-gray-400">Open Positions</p>
            <p className="text-xl font-semibold text-sky-400">{openCount}</p>
          </div>
          <div className="bg-card-dark/80 rounded-2xl p-3 border border-slate-800 shadow">
            <p className="text-[10px] text-gray-400">High Risk</p>
            <p className="text-xl font-semibold text-red-400">{highRisk}</p>
          </div>
        </div>

        {/* Middle row: insights + leaderboard */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SignalInsights signals={signals} />
          </div>
          <div>
            <SignalLeaderboard signals={signals} />
          </div>
        </div>

        {/* Bottom row: form + table */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <SignalForm
              onSubmit={handleCreateOrUpdate}
              editingSignal={editingSignal}
            />
          </div>
          <div className="md:col-span-2">
            <SignalTable
              signals={signals}
              onEdit={setEditingSignal}
              onDelete={handleDelete}
              filters={filters}
              setFilters={setFilters}
              prices={prices}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
