import { useState } from 'react';
import ObjectivesManager from '../components/ObjectivesManager';
import PerformanceDashboard from '../components/PerformanceDashboard';
import MetricsChart from '../components/MetricsChart';
import GoalTracker from '../components/GoalTracker';
import ReportsGenerator from '../components/ReportsGenerator';
import AlertsManager from '../components/AlertsManager';
import ComparisonTool from '../components/ComparisonTool';
import KPIConfigurator from '../components/KPIConfigurator';
import { Target, TrendingUp, BarChart3, CheckCircle, FileText, Bell, GitCompare, Settings } from 'lucide-react';

type TabType = 'gestor' | 'dashboard' | 'graficos' | 'seguimiento' | 'reportes' | 'alertas' | 'comparacion' | 'kpis';

export default function ObjetivosRendimientoPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: TrendingUp },
    { id: 'gestor' as TabType, label: 'Gestor de Objetivos', icon: Target },
    { id: 'seguimiento' as TabType, label: 'Seguimiento', icon: CheckCircle },
    { id: 'graficos' as TabType, label: 'Gráficos', icon: BarChart3 },
    { id: 'reportes' as TabType, label: 'Reportes', icon: FileText },
    { id: 'alertas' as TabType, label: 'Alertas', icon: Bell },
    { id: 'comparacion' as TabType, label: 'Comparación', icon: GitCompare },
    { id: 'kpis' as TabType, label: 'Configurar KPIs', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'gestor':
        return <ObjectivesManager />;
      case 'dashboard':
        return <PerformanceDashboard />;
      case 'graficos':
        return <MetricsChart />;
      case 'seguimiento':
        return <GoalTracker />;
      case 'reportes':
        return <ReportsGenerator />;
      case 'alertas':
        return <AlertsManager />;
      case 'comparacion':
        return <ComparisonTool />;
      case 'kpis':
        return <KPIConfigurator />;
      default:
        return <PerformanceDashboard />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="bg-background border-b border-border px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-primary to-[#8B5CF6] p-3 rounded-xl shadow-md">
            <Target className="w-icon-lg h-icon-lg text-white" />
          </div>
          <div>
            <h1 className="text-h1 font-bold text-text-primary">Objetivos & Rendimiento</h1>
            <p className="text-body text-text-secondary mt-1">Sistema de gestión de objetivos y seguimiento de rendimiento personalizado por rol</p>
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-normal whitespace-nowrap ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary to-[#8B5CF6] text-white shadow-md' 
                    : 'bg-surface text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-surface p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

