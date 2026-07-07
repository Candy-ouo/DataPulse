export default function Card({ title, children, className = "", actions, loading, error }) {
  if (loading) return <div className={`bg-[rgba(12,18,34,0.85)] border border-[rgba(0,255,170,0.12)] rounded-xl p-4 ${className}`}><div className="animate-pulse space-y-3"><div className="h-3 bg-white/5 rounded w-1/3"/><div className="h-32 bg-white/5 rounded"/></div></div>;
  if (error) return <div className={`bg-[rgba(12,18,34,0.85)] border border-red-500/20 rounded-xl p-4 ${className}`}><p className="text-red-400 text-sm">加载失败: {error.message}</p></div>;
  return (
    <div className={`bg-[rgba(12,18,34,0.85)] border border-[rgba(0,255,170,0.12)] rounded-xl p-4 hover:border-[rgba(0,255,170,0.25)] transition-colors duration-300 flex flex-col ${className}`}>
      {title && <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-semibold text-white/60 tracking-wide uppercase before:content-['\\255e'] before:text-[#00ffaa] before:mr-1.5">{title}</h3>{actions}</div>}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
