import { useECharts } from '@/hooks/useECharts';
export default function ChartBase({ options, theme, className = '', style }) {
  const { chartRef } = useECharts({ options, theme });
  return (
    <div
      ref={chartRef}
      className={className}
      style={{ width: '100%', height: '100%', minHeight: 180, ...style }}
    />
  );
}
