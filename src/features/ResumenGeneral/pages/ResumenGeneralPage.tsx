import { useState, useEffect } from 'react';
import DashboardOverview from '../components/DashboardOverview';
import QuickActions from '../components/QuickActions';
import AlertsPanel from '../components/AlertsPanel';
import MetricsChart from '../components/MetricsChart';
import RecentActivity from '../components/RecentActivity';
import TasksWidget from '../components/TasksWidget';
import FinancialSummary from '../components/FinancialSummary';
import ClientStatus from '../components/ClientStatus';
import { fetchDashboardMetrics, fetchDashboardAlerts, fetchDashboardTasks } from '../api/dashboard';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui';

/**
 * ResumenGeneralPage - Página principal del dashboard
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function ResumenGeneralPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      const [metricsData, alertsData, tasksData] = await Promise.all([
        fetchDashboardMetrics(),
        fetchDashboardAlerts(),
        fetchDashboardTasks()
      ]);
      
      setMetrics(metricsData);
      setAlerts(alertsData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0F0F23]">
        <Loader2 className="w-12 h-12 text-[#6366F1] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#0F0F23]">
      <div className="p-8">
        {/* Header según sistema de diseño */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">📊 Resumen General</h1>
            <p className="text-base text-[#94A3B8]">Panel principal de control y métricas del sistema</p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="primary"
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="ml-2">Actualizar</span>
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Main Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardOverview metrics={metrics} />
            <MetricsChart />
            <RecentActivity />
          </div>

          {/* Right Column - Side Panels */}
          <div className="space-y-6">
            <AlertsPanel alerts={alerts} />
            <TasksWidget tasks={tasks} />
            <ClientStatus />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FinancialSummary />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

