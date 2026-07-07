import { useData } from '@/hooks/useData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import KpiCard from '@/components/data-display/KpiCard';
import RankList from '@/components/data-display/RankList';
import { BarChart, LineChart, PieChart } from '@/charts';

function KpiGrid({ data }) {
  if (!data?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-[8px] w-full">
      {data.map((item, i) => <KpiCard key={i} {...item} />)}
    </div>
  );
}

export default function DashboardPage() {
  const { data: kpiData, loading: kpiLoading, refreshing: kpiRefreshing } = useData('kpi', {}, { refreshInterval: 5000 });
  const { data: trendData, loading: trendLoading, refreshing: trendRefreshing } = useData('trends', {}, { refreshInterval: 10000 });
  const { data: catData, loading: catLoading, refreshing: catRefreshing } = useData('categories', {}, { refreshInterval: 15000 });
  const { data: geoData, loading: geoLoading, refreshing: geoRefreshing } = useData('geography', {}, { refreshInterval: 20000 });

  return (
    <DashboardLayout header={<Header title="DataPulse · 数据脉动" />} footer={<Footer />}>
      <div className="grid grid-cols-12 gap-[10px] h-full">
        {/* === 左侧：KPI + 地域 === */}
        <div className="col-span-3 flex flex-col gap-[10px]">
          <div className="flex-[3] min-h-0">
            <Card title="核心指标" loading={kpiLoading} refreshing={kpiRefreshing} className="h-full">
              <KpiGrid data={kpiData} />
            </Card>
          </div>
          <div className="flex-[2] min-h-0">
            <Card title="地域排名" loading={geoLoading} refreshing={geoRefreshing} className="h-full">
              <RankList data={geoData || []} labelKey="province" valueKey="value" />
            </Card>
          </div>
        </div>

        {/* === 中间：趋势图 + 品类分布 === */}
        <div className="col-span-6 flex flex-col gap-[10px]">
          <div className="flex-1 min-h-0">
            <Card title="数据趋势" loading={trendLoading} refreshing={trendRefreshing} className="h-full">
              <div className="w-full h-full"><LineChart data={trendData || []} /></div>
            </Card>
          </div>
          <div className="flex-1 min-h-0">
            <Card title="品类分布" loading={catLoading} refreshing={catRefreshing} className="h-full">
              <div className="w-full h-full"><PieChart data={catData || []} /></div>
            </Card>
          </div>
        </div>

        {/* === 右侧：售卖图 + 系统状态 === */}
        <div className="col-span-3 flex flex-col gap-[10px]">
          <div className="flex-[3] min-h-0">
            <Card title="品类售卖" loading={catLoading} refreshing={catRefreshing} className="h-full">
              <div className="w-full h-full"><BarChart data={catData || []} /></div>
            </Card>
          </div>
          <div className="flex-[2] min-h-0">
            <Card title="系统状态" className="h-full">
              <div className="flex flex-col gap-[6px] py-[4px]">
                {[
                  { label: '数据源', value: import.meta.env.VITE_DATA_SOURCE || 'mock', color: '#00d4ff' },
                  { label: '刷新间隔', value: '5s', color: '#48b0f7' },
                  { label: '日志级别', value: import.meta.env.VITE_LOG_LEVEL || 'info', color: '#90e0ef' },
                  { label: '版本', value: '1.0.0', color: 'rgba(255,255,255,0.3)' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center px-[8px] py-[6px] rounded-[6px]" style={{ background: 'rgba(0,212,255,0.04)' }}>
                    <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</span>
                    <span className="text-[10px] font-mono font-medium" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
