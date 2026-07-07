export default function Loading({ text = "加载中..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-8 h-8 border-2 border-[#00ffaa]/30 border-t-[#00ffaa] rounded-full animate-spin" />
      <p className="text-sm text-white/40">{text}</p>
    </div>
  );
}
