import { useState } from 'react';
import { Activity, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import CheckInsEntreno from '../components/CheckInsEntreno';
import HistorialCheckIns from '../components/HistorialCheckIns';
import AnalizadorPatrones from '../components/AnalizadorPatrones';
import AlertasDolor from '../components/AlertasDolor';

type TabType = 'registro' | 'historial' | 'patrones' | 'alertas';

export default function CheckinsEntrenoPage() {
  const [activeTab, setActiveTab] = useState<TabType>('registro');

  const tabs = [
    { id: 'registro' as TabType, label: 'Registro de Check-ins', icon: Activity },
    { id: 'historial' as TabType, label: 'Historial', icon: Clock },
    { id: 'patrones' as TabType, label: 'Análisis de Patrones', icon: TrendingUp },
    { id: 'alertas' as TabType, label: 'Alertas de Dolor', icon: AlertTriangle },
  ];

  return (
    <div className="flex-1 bg-[#0F0F23] overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#6366F1] p-3 rounded-[16px]">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#F1F5F9]">Check-ins de Entrenamiento</h1>
              <p className="text-[#94A3B8] mt-1">
                🚦 Sistema de check-ins detallados por serie/set con semáforos y evaluación de sensaciones
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#334155]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'registro' && <CheckInsEntreno />}
          {activeTab === 'historial' && <HistorialCheckIns />}
          {activeTab === 'patrones' && <AnalizadorPatrones />}
          {activeTab === 'alertas' && <AlertasDolor />}
        </div>
      </div>
    </div>
  );
}

