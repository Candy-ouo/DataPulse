export default function RankList({ data = [], labelKey = 'name', valueKey = 'value' }) {
  if (!data.length) return <p className="text-sm text-center py-8" style={{ color: 'rgba(255,255,255,0.2)' }}>暂无数据</p>;
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="space-y-[8px] w-full">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-[10px]">
          <span className="w-[22px] text-center text-[14px] font-bold" style={{ color: i < 3 ? '#00b4d8' : 'rgba(255,255,255,0.25)' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 text-[13px] truncate font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{item[labelKey]}</span>
          <div className="w-[90px] h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(0,212,255,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(item[valueKey] / max) * 100}%`, background: 'linear-gradient(90deg, #00b4d8, #00d4ff)' }} />
          </div>
          <span className="w-[56px] text-right text-[13px] tabular-nums font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {item[valueKey]}
          </span>
        </div>
      ))}
    </div>
  );
}
