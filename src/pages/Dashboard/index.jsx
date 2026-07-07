import { useData } from '@/hooks/useData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import TopKpiBar from '@/components/data-display/TopKpiBar';
import RankList from '@/components/data-display/RankList';
import { BarChart, LineChart, PieChart } from '@/charts';

export default function DashboardPage() {
  const { data: topKpis, loading: kpiLoading, refreshing: kpiRefreshing } = useData('topKpis', {}, { refreshInterval: 5000 });
  const { data: trendData, loading: trendLoading, refreshing: trendRefreshing } = useData('trends', {}, { refreshInterval: 10000 });
  const { data: catData, loading: catLoading, refreshing: catRefreshing } = useData('categories', {}, { refreshInterval: 15000 });
  const { data: geoData, loading: geoLoading, refreshing: geoRefreshing } = useData('geography', {}, { refreshInterval: 20000 });

  return (
    <DashboardLayout header={<Header title="DataPulse · 数据脉动" />} footer={<Footer />}>
      <div className="flex flex-col gap-[10px] h-full">
        {/* ========== Top KPI Bar ========== */}
        <div className="shrink-0">
          {kpiLoading ? (
            <div className="grid grid-cols-6 gap-[8px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[60px] rounded-[8px] animate-pulse" style={{ background: 'rgba(0,212,255,0.04)' }} />
              ))}
            </div>
          ) : (
            <TopKpiBar data={topKpis || []} />
          )}
        </div>

        {/* ========== Main Grid: 3+6+3 ========== */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-[10px]">
          {/* === Left: 地域排名 === */}
          <div className="col-span-3 flex flex-col gap-[10px]">
            <div className="flex-1 min-h-0">
              <Card title="地域排名" loading={geoLoading} refreshing={geoRefreshing} className="h-full">
                <RankList data={geoData || []} labelKey="province" valueKey="value" />
              </Card>
            </div>
            <div className="h-[100px] shrink-0">
              <Card title="系统状态" className="h-full">
                <div className="flex items-center gap-[16px] h-full px-[4px]">
                  {[
                    { label: '数据源', value: import.meta.env.VITE_DATA_SOURCE || 'mock', color: '#00d4ff' },
                    { label: '刷新', value: '5s', color: '#48b0f7' },
                    { label: '日志', value: import.meta.env.VITE_LOG_LEVEL || 'info', color: '#90e0ef' },
                    { label: '版本', value: '1.0.0', color: 'rgba(255,255,255,0.3)' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-[4px] flex-1">
                      <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.label}</span>
                      <span className="text-[12px] font-mono font-semibold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* === Center: 趋势图 + 品类分布 === */}
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

          {/* === Right: 品类售卖 === */}
          <div className="col-span-3 flex flex-col gap-[10px]">
            <div className="flex-1 min-h-0">
              <Card title="品类售卖" loading={catLoading} refreshing={catRefreshing} className="h-full">
                <div className="w-full h-full"><BarChart data={catData || []} /></div>
              </Card>
            </div>
            <div className="h-[100px] shrink-0">
              <Card title="数据快照" className="h-full">
                <div className="flex items-center justify-center h-full gap-[20px]">
                  <div className="text-center">
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>更新于</p>
                    <p className="text-[13px] font-mono mt-[2px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {new Date().toLocaleTimeString('zh-CN')}
                    </p>
                  </div>
                  <div className="w-[1px] h-[30px]" style={{ background: 'rgba(0,212,255,0.08)' }} />
                  <div className="text-center">
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>状态</p>
                    <p className="text-[13px] mt-[2px] flex items-center gap-[6px]" style={{ color: '#00d4ff' }}>
                      <span className="inline-block w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: '#00d4ff', boxShadow: '0 0 6px rgba(0,212,255,0.6)' }} />
                      运行中
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
