export default function Card({ title, children, className = "", actions, loading, refreshing, error }) {
  // 首次加载 → 骨架屏
  if (loading) {
    return (
      <div className={`bg-[rgba(12,18,34,0.85)] border border-[rgba(0,255,170,0.12)] rounded-xl p-4 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-3 bg-white/5 rounded w-1/3" />
          <div className="h-32 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  // 错误态
  if (error) {
    return (
      <div className={`bg-[rgba(12,18,34,0.85)] border border-red-500/20 rounded-xl p-4 ${className}`}>
        <p className="text-red-400 text-sm">加载失败: {error.message}</p>
      </div>
    );
  }

  // 正常渲染 + 刷新指示器
  return (
    <div className={`bg-[rgba(12,18,34,0.85)] border border-[rgba(0,255,170,0.12)] rounded-xl p-4 hover:border-[rgba(0,255,170,0.25)] transition-colors duration-300 flex flex-col ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/60 tracking-wide uppercase">
            <span className="text-[#00ffaa] mr-1.5">▎</span>{title}
            {refreshing && <span className="ml-2 text-[10px] text-[#00ffaa]/50">刷新中...</span>}
          </h3>
          <div className="flex items-center gap-2">
            {refreshing && <span className="inline-block w-2 h-2 rounded-full bg-[#00ffaa] animate-ping" />}
            {actions}
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
