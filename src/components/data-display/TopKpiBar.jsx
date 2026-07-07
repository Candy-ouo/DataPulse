export default function TopKpiBar({ data = [] }) {
  if (!data.length) return null;
  return (
    <div className="grid grid-cols-6 gap-[8px] w-full">
      {data.map((item, i) => (
        <div
          key={i}
          className="rounded-[8px] px-[14px] py-[8px] flex items-center gap-[12px] transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(0,180,216,0.02))',
            border: '1px solid rgba(0,212,255,0.08)',
          }}
        >
          {/* 左侧装饰线 */}
          <div className="w-[3px] h-[36px] rounded-full shrink-0" style={{ background: 'linear-gradient(180deg, #00d4ff, #48b0f7)' }} />

          {/* 内容 */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-[1px] mb-[2px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.label}</p>
            <div className="flex items-baseline gap-[2px]">
              <span className="text-[20px] font-bold leading-none tabular-nums" style={{ color: '#00d4ff' }}>{item.value}</span>
              <span className="text-[11px]" style={{ color: 'rgba(0,212,255,0.4)' }}>{item.suffix}</span>
            </div>
          </div>

          {/* 右下辅助信息 */}
          <span className="text-[9px] self-end pb-[2px] shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>{item.sub}</span>
        </div>
      ))}
    </div>
  );
}
