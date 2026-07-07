export default function RankList({ data = [], labelKey = "name", valueKey = "value" }) {
  if (!data.length) return <p className="text-white/30 text-sm text-center py-8">暂无数据</p>;
  const max = Math.max(...data.map(d => d[valueKey]));
  return (
    <div className="space-y-2 w-full">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className={`w-5 text-center text-xs font-bold ${i < 3 ? "text-[#ffd700]" : "text-white/30"}`}>{i + 1}</span>
          <span className="flex-1 text-sm text-white/70 truncate">{item[labelKey]}</span>
          <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00ffaa] to-[#00cc88] rounded-full transition-all duration-500" style={{ width: `${(item[valueKey] / max) * 100}%` }} />
          </div>
          <span className="w-14 text-right text-sm text-white/60 tabular-nums">{item[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}
