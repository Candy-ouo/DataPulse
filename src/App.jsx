import ErrorBoundary from "@/components/common/ErrorBoundary";
import DashboardPage from "@/pages/Dashboard";
import LogPanel from "@/logger/components/LogPanel";

export default function App() {
  return (
    <ErrorBoundary>
      <DashboardPage />
      <LogPanel />
    </ErrorBoundary>
  );
}
