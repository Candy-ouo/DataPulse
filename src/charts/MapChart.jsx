import ChartBase from './core/ChartBase';
export default function MapChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, left: 'center', textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 400 } } : undefined,
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    series: [
      {
        type: 'map',
        map: 'china',
        roam: true,
        label: { show: true, color: 'rgba(255,255,255,0.5)', fontSize: 9 },
        itemStyle: { areaColor: 'rgba(0,212,255,0.04)', borderColor: 'rgba(0,212,255,0.15)', borderWidth: 1 },
        emphasis: {
          label: { color: '#00d4ff', fontWeight: 'bold' },
          itemStyle: { areaColor: 'rgba(0,212,255,0.15)' },
        },
        data: data.map((d) => ({ name: d.province || d.name, value: d.value })),
      },
    ],
    visualMap: {
      min: 0,
      max: Math.max(...data.map((d) => d.value || 0), 1000),
      text: ['高', '低'],
      textStyle: { color: 'rgba(255,255,255,0.35)' },
      inRange: { color: ['rgba(0,212,255,0.05)', 'rgba(0,212,255,0.3)', '#00d4ff'] },
      calculable: true,
      left: 'left',
      bottom: 10,
    },
  };
  return <ChartBase options={options} />;
}
