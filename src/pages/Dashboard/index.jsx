import { useData } from "@/hooks/useData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/common/Card";
import KpiCard from "@/components/data-display/KpiCard";
import RankList from "@/components/data-display/RankList";
import { BarChart, LineChart, PieChart } from "@/charts";

function KpiGrid({ data }) {
  if (!data?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {data.map((item, i) => <KpiCard key={i} {...item} />)}
    </div>
  );
}

export default function DashboardPage() {
  const { data: kpiData, loading: kpiLoading, refreshing: kpiRefreshing } = useData("kpi", {}, { refreshInterval: 5000 });
  const { data: trendData, loading: trendLoading, refreshing: trendRefreshing } = useData("trends", {}, { refreshInterval: 10000 });
  const { data: catData, loading: catLoading, refreshing: catRefreshing } = useData("categories", {}, { refreshInterval: 15000 });
  const { data: geoData, loading: geoLoading, refreshing: geoRefreshing } = useData("geography", {}, { refreshInterval: 20000 });

  return (
    <DashboardLayout
      header={<Header title="DataPulse · 数据脉动" />}
      footer={<Footer />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
        {/* Left Panel - KPI */}
        <div className="lg:col-span-1 space-y-4">
          <Card title="核心指标" loading={kpiLoading} refreshing={kpiRefreshing}>
            <KpiGrid data={kpiData} />
          </Card>
          <Card title="地域分布" loading={geoLoading} refreshing={geoRefreshing}>
            <RankList data={geoData || []} labelKey="province" valueKey="value" />
          </Card>
        </div>

        {/* Center Panel - Charts */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="趋势图" className="flex-1" loading={trendLoading} refreshing={trendRefreshing}>
            <div className="h-full min-h-[280px]"><LineChart data={trendData || []} /></div>
          </Card>
          <Card title="各品类分布" className="flex-1" loading={catLoading} refreshing={catRefreshing}>
            <div className="h-full min-h-[240px]"><PieChart data={catData || []} /></div>
          </Card>
        </div>

        {/* Right Panel - More */}
        <div className="lg:col-span-1 space-y-4">
          <Card title="品类售卖图" loading={catLoading} refreshing={catRefreshing}>
            <div className="h-full min-h-[220px]"><BarChart data={catData || []} /></div>
          </Card>
          <Card title="系统状态">
            <div className="flex flex-col gap-3 py-2">
              {[
                { label: "数据源", value: import.meta.env.VITE_DATA_SOURCE || "mock", color: "text-[#00ffaa]" },
                { label: "刷新间隔", value: "5s", color: "text-[#4dabf7]" },
                { label: "日志级别", value: import.meta.env.VITE_LOG_LEVEL || "info", color: "text-[#ffd700]" },
                { label: "版本", value: "1.0.0", color: "text-white/40" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center px-2 py-1.5 bg-white/5 rounded">
                  <span className="text-xs text-white/40">{item.label}</span>
                  <span className={`text-xs font-mono font-medium ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
