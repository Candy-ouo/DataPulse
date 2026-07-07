export default function EmptyState({ message = "暂无数据", icon = "📊" }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-2">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm text-white/30">{message}</p>
    </div>
  );
}
