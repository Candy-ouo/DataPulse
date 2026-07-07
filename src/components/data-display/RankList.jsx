export default function RankList({ data = [], labelKey = 'name', valueKey = 'value' }) {
  if (!data.length) return <p className="text-sm text-center py-8" style={{ color: 'rgba(255,255,255,0.2)' }}>暂无数据</p>;
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="space-y-[6px] w-full">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-[8px]">
          <span className="w-[18px] text-center text-[11px] font-bold" style={{ color: i < 3 ? '#00b4d8' : 'rgba(255,255,255,0.2)' }}>
            {i + 1}
          </span>
          <span className="flex-1 text-[12px] truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{item[labelKey]}</span>
          <div className="w-[80px] h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(0,212,255,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item[valueKey] / max) * 100}%`,
                background: 'linear-gradient(90deg, #00b4d8, #00d4ff)',
              }}
            />
          </div>
          <span className="w-[50px] text-right text-[11px] tabular-nums" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {item[valueKey]}
          </span>
        </div>
      ))}
    </div>
  );
}
