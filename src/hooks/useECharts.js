import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart, GaugeChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([BarChart, LineChart, PieChart, GaugeChart, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);

export function useECharts({ options, theme } = {}) {
  const chartRef = useRef(null);
  const instanceRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    instanceRef.current = echarts.init(chartRef.current, theme);
    if (options) instanceRef.current.setOption(options);
    const resize = () => instanceRef.current?.resize();
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); instanceRef.current?.dispose(); };
  }, []);
  useEffect(() => { if (options && instanceRef.current) instanceRef.current.setOption(options, true); }, [options]);
  const setOption = (opt, notMerge) => instanceRef.current?.setOption(opt, notMerge);
  return { chartRef, instance: instanceRef, setOption };
}
