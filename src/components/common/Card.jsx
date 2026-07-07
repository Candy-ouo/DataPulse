export default function Card({ title, children, className = '', actions, loading, refreshing, error }) {
  if (loading) {
    return (
      <div className={`rounded-[10px] p-[14px] ${className}`} style={{ background: 'rgba(8,14,42,0.88)', border: '1px solid rgba(0,212,255,0.10)' }}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 rounded w-1/3" style={{ background: 'rgba(0,212,255,0.06)' }} />
          <div className="h-32 rounded" style={{ background: 'rgba(0,212,255,0.04)' }} />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`rounded-[10px] p-[14px] ${className}`} style={{ background: 'rgba(8,14,42,0.88)', border: '1px solid rgba(255,71,87,0.2)' }}>
        <p className="text-sm" style={{ color: '#ff4757' }}>加载失败: {error.message}</p>
      </div>
    );
  }
  return (
    <div className={`rounded-[10px] p-[14px] flex flex-col transition-all duration-300 ${className}`} style={{ background: 'rgba(8,14,42,0.88)', border: '1px solid rgba(0,212,255,0.10)', boxShadow: '0 0 20px rgba(0,212,255,0.03)' }}>
      {title && (
        <div className="flex items-center justify-between mb-[10px]">
          <h3 className="text-[13px] font-semibold tracking-[1.5px] uppercase flex items-center gap-[6px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="text-[16px]" style={{ color: '#00d4ff' }}>▎</span>{title}
            {refreshing && <span className="text-[11px]" style={{ color: 'rgba(0,212,255,0.4)' }}>⟳</span>}
          </h3>
          {refreshing && <span className="inline-block w-[7px] h-[7px] rounded-full animate-ping" style={{ background: '#00d4ff' }} />}
          {actions}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
