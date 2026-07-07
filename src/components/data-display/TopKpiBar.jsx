export default function TopKpiBar({ data = [] }) {
  if (!data.length) return null;
  return (
    <div className="grid grid-cols-6 gap-[10px] w-full">
      {data.map((item, i) => (
        <div key={i} className="rounded-[10px] px-[16px] py-[10px] flex items-center gap-[14px] transition-all duration-200" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,180,216,0.02))', border: '1px solid rgba(0,212,255,0.10)' }}>
          <div className="w-[3px] h-[46px] rounded-full shrink-0" style={{ background: 'linear-gradient(180deg, #00d4ff, #48b0f7)' }} />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] tracking-[1px] mb-[4px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.label}</p>
            <div className="flex items-baseline gap-[3px]">
              <span className="text-[26px] font-bold leading-none tabular-nums tracking-tight" style={{ color: '#00d4ff' }}>{item.value}</span>
              <span className="text-[12px]" style={{ color: 'rgba(0,212,255,0.5)' }}>{item.suffix}</span>
            </div>
          </div>
          <span className="text-[10px] self-end pb-[2px] shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.sub}</span>
        </div>
      ))}
    </div>
  );
}
