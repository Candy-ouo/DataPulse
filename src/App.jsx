import ErrorBoundary from "@/components/common/ErrorBoundary";
import DashboardPage from "@/pages/Dashboard";

export default function App() {
  return (
    <ErrorBoundary>
      <DashboardPage />
    </ErrorBoundary>
  );
}
