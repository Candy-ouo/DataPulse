import ChartBase from './core/ChartBase';
export default function BarChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 } } : undefined,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '16%', top: title ? 30 : 4, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.label || d.name || d.date),
      axisLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        rotate: 30,
        interval: 0,
        margin: 8,
      },
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(0,212,255,0.05)' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value || 0),
        barWidth: '55%',
        itemStyle: {
          borderRadius: [3, 3, 0, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#00d4ff' },
              { offset: 1, color: 'rgba(0,180,216,0.3)' },
            ],
          },
        },
        emphasis: { itemStyle: { color: '#90e0ef' } },
      },
    ],
  };
  return <ChartBase options={options} />;
}
