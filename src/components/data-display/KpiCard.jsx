export default function KpiCard({ label, value, change, status = "up" }) {
  const colorMap = { up: "text-[#00ffaa]", down: "text-[#ff4757]" };
  return (
    <div className="bg-[rgba(16,24,48,0.6)] border border-[rgba(0,255,170,0.12)] rounded-lg p-4 text-center hover:border-[rgba(0,255,170,0.2)] hover:bg-[rgba(0,255,170,0.06)] transition-all duration-200">
      <p className="text-[11px] text-white/35 tracking-wider mb-1.5 uppercase">{label}</p>
      <p className="text-2xl font-bold text-[#00ffaa] tabular-nums">{value}</p>
      {change && <p className={`text-[11px] mt-1 ${colorMap[status] || "text-[#00ffaa]"}`}>{change}</p>}
    </div>
  );
}
