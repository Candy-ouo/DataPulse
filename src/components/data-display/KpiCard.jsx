export default function KpiCard({ label, value, change, status = 'up' }) {
  const statusColor = status === 'up' ? '#00d4ff' : '#ff4757';
  const statusBg = status === 'up' ? 'rgba(0,212,255,0.08)' : 'rgba(255,71,87,0.08)';
  return (
    <div
      className="rounded-[8px] p-[12px] text-center transition-all duration-200"
      style={{
        background: 'rgba(6,10,30,0.7)',
        border: '1px solid rgba(0,212,255,0.08)',
      }}
    >
      <p className="text-[10px] tracking-[1.5px] mb-[6px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
      <p className="text-[22px] font-bold tabular-nums leading-tight" style={{ color: '#00d4ff' }}>{value}</p>
      {change && (
        <span className="inline-block text-[10px] mt-[4px] px-[6px] py-[1px] rounded-full" style={{ color: statusColor, background: statusBg }}>
          {change}
        </span>
      )}
    </div>
  );
}
