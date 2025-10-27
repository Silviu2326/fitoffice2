import { useState } from 'react';
import ClientsManager from '../components/ClientsManager';
import ActiveClientsList from '../components/ActiveClientsList';
import RiskClientsPanel from '../components/RiskClientsPanel';
import LostClientsManager from '../components/LostClientsManager';
import Client360Profile from '../components/Client360Profile';
import RetentionAlerts from '../components/RetentionAlerts';
import ChurnAnalytics from '../components/ChurnAnalytics';
import ClientSegmentation from '../components/ClientSegmentation';
import { Users, UserCheck, AlertTriangle, UserX, User, Bell, TrendingDown, Filter } from 'lucide-react';

type TabType = 'gestor' | 'activos' | 'riesgo' | 'perdidos' | 'perfil' | 'alertas' | 'analytics' | 'segmentacion';

export default function GestionClientesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('gestor');

  const tabs = [
    { id: 'gestor' as TabType, label: 'Gestor Principal', icon: Users },
    { id: 'activos' as TabType, label: 'Clientes Activos', icon: UserCheck },
    { id: 'riesgo' as TabType, label: 'En Riesgo', icon: AlertTriangle },
    { id: 'perdidos' as TabType, label: 'Clientes Perdidos', icon: UserX },
    { id: 'perfil' as TabType, label: 'Perfil 360º', icon: User },
    { id: 'alertas' as TabType, label: 'Alertas de Retención', icon: Bell },
    { id: 'analytics' as TabType, label: 'Analytics de Churn', icon: TrendingDown },
    { id: 'segmentacion' as TabType, label: 'Segmentación', icon: Filter }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'gestor':
        return <ClientsManager />;
      case 'activos':
        return <ActiveClientsList />;
      case 'riesgo':
        return <RiskClientsPanel />;
      case 'perdidos':
        return <LostClientsManager />;
      case 'perfil':
        return <Client360Profile />;
      case 'alertas':
        return <RetentionAlerts />;
      case 'analytics':
        return <ChurnAnalytics />;
      case 'segmentacion':
        return <ClientSegmentation />;
      default:
        return <ClientsManager />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestión de Clientes</h1>
            <p className="text-slate-600 mt-1">Sistema integral de gestión de clientes con seguimiento de estado, retención y perfil 360º</p>
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  isActive ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

