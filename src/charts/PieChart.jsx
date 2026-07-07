import ChartBase from './core/ChartBase';
const PIE_COLORS = ['#00d4ff', '#48b0f7', '#90e0ef', '#00b4d8', '#6fc2e8', '#2a9df4', '#7ec8e3', '#a8d8ea'];
export default function PieChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, left: 'center', textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 400 } } : undefined,
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [
      {
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        label: { color: 'rgba(255,255,255,0.45)', fontSize: 10 },
        labelLine: { lineStyle: { color: 'rgba(0,212,255,0.15)' } },
        emphasis: {
          label: { fontSize: 13, fontWeight: 'bold' },
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,212,255,0.3)' },
        },
        data: data.map((d) => ({ name: d.name || d.label, value: d.value })),
        itemStyle: { borderRadius: 3, borderColor: 'rgba(4,8,22,0.8)', borderWidth: 2 },
        color: PIE_COLORS,
      },
    ],
  };
  return <ChartBase options={options} />;
}
