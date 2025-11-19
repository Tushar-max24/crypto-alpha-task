import Chart from "react-apexcharts";

const SignalInsights = ({ signals }) => {
  if (!signals || signals.length === 0) {
    return (
      <div className="bg-card-dark/80 rounded-2xl p-4 shadow-neon border border-slate-800">
        <p className="text-xs text-gray-400">
          Add a few signals to unlock analytics ✨
        </p>
      </div>
    );
  }

  const total = signals.length;
  const riskCounts = { Low: 0, Medium: 0, High: 0 };
  let openCount = 0;
  let closedCount = 0;

  signals.forEach((s) => {
    riskCounts[s.riskLevel] = (riskCounts[s.riskLevel] || 0) + 1;
    if (s.status === "Open") openCount++;
    else closedCount++;
  });

  const riskOptions = {
    chart: { type: "donut", background: "transparent" },
    labels: ["Low", "Medium", "High"],
    theme: { mode: "dark" },
    legend: { position: "bottom", labels: { colors: "#cbd5f5" } },
    dataLabels: { style: { colors: ["#f9fafb"] } }
  };

  const statusOptions = {
    chart: { type: "bar", background: "transparent" },
    xaxis: {
      categories: ["Open", "Closed"],
      labels: { style: { colors: "#cbd5f5" } }
    },
    yaxis: {
      labels: { style: { colors: "#cbd5f5" } }
    },
    theme: { mode: "dark" },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%"
      }
    }
  };

  const riskSeries = [
    riskCounts.Low,
    riskCounts.Medium,
    riskCounts.High
  ];
  const statusSeries = [openCount, closedCount];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-card-dark/80 rounded-2xl p-4 border border-slate-800 shadow">
        <p className="text-xs text-gray-400 mb-2">
          Risk profile of your signals
        </p>
        <Chart options={riskOptions} series={riskSeries} type="donut" height={230} />
      </div>
      <div className="bg-card-dark/80 rounded-2xl p-4 border border-slate-800 shadow">
        <p className="text-xs text-gray-400 mb-2">
          Open vs closed positions
        </p>
        <Chart
          options={statusOptions}
          series={[{ name: "Signals", data: statusSeries }]}
          type="bar"
          height={230}
        />
      </div>
    </div>
  );
};

export default SignalInsights;
