import ChartBase from './core/ChartBase';

export default function GaugeChart({ value = 0, title, min = 0, max = 100, unit = '%' }) {
  const options = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '55%'],
        radius: '80%',
        startAngle: 220,
        endAngle: -40,
        min,
        max,
        splitNumber: 4,
        progress: {
          show: true,
          width: 10,
          roundCap: true,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#48b0f7' },
                { offset: 0.5, color: '#00d4ff' },
                { offset: 1, color: '#90e0ef' },
              ],
            },
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '55%',
          width: 5,
          itemStyle: { color: '#00d4ff' },
        },
        axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(0,212,255,0.08)']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          offsetCenter: [0, '40%'],
          fontSize: 22,
          fontWeight: 'bold',
          color: '#00d4ff',
          formatter: `{value}${unit}`,
        },
        title: {
          offsetCenter: [0, '65%'],
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
        },
        data: [{ value, name: title || '' }],
      },
    ],
  };
  return <ChartBase options={options} className="w-full h-full" />;
}
