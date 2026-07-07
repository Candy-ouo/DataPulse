import ChartBase from './core/ChartBase';
const PIE_COLORS = ['#00d4ff', '#48b0f7', '#90e0ef', '#00b4d8', '#6fc2e8', '#2a9df4', '#7ec8e3', '#a8d8ea'];
export default function PieChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, left: 'center', textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 } } : undefined,
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [{
      type: 'pie', radius: ['28%', '56%'], center: ['50%', '52%'],
      avoidLabelOverlap: true,
      label: { color: 'rgba(255,255,255,0.55)', fontSize: 12 },
      labelLine: { lineStyle: { color: 'rgba(0,212,255,0.18)' } },
      emphasis: { label: { fontSize: 14, fontWeight: 'bold' }, itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,212,255,0.3)' } },
      data: data.map((d) => ({ name: d.name || d.label, value: d.value })),
      itemStyle: { borderRadius: 4, borderColor: 'rgba(4,8,22,0.8)', borderWidth: 2 },
      color: PIE_COLORS,
    }],
  };
  return <ChartBase options={options} />;
}
