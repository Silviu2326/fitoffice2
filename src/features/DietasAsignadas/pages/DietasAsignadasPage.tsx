import { useState } from 'react';
import { Apple } from 'lucide-react';
import DietasList from '../components/DietasList';
import AsignacionDieta from '../components/AsignacionDieta';
import PlanesNutricion from '../components/PlanesNutricion';
import SeguimientoMacros from '../components/SeguimientoMacros';
import FotosComida from '../components/FotosComida';
import GestorRestricciones from '../components/GestorRestricciones';
import PacksSemanales from '../components/PacksSemanales';
import AnalyticsNutricion from '../components/AnalyticsNutricion';

type TabType = 'lista' | 'asignar' | 'planes' | 'seguimiento' | 'fotos' | 'restricciones' | 'packs' | 'analytics';

export default function DietasAsignadasPage() {
  const [activeTab, setActiveTab] = useState<TabType>('lista');

  const tabs = [
    { id: 'lista' as TabType, label: 'Dietas Asignadas', component: DietasList },
    { id: 'asignar' as TabType, label: 'Asignar Dieta', component: AsignacionDieta },
    { id: 'planes' as TabType, label: 'Planes Nutrición', component: PlanesNutricion },
    { id: 'seguimiento' as TabType, label: 'Seguimiento Macros', component: SeguimientoMacros },
    { id: 'fotos' as TabType, label: 'Fotos de Comida', component: FotosComida },
    { id: 'restricciones' as TabType, label: 'Restricciones', component: GestorRestricciones },
    { id: 'packs' as TabType, label: 'Packs Semanales', component: PacksSemanales },
    { id: 'analytics' as TabType, label: 'Analytics', component: AnalyticsNutricion }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DietasList;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0F0F23]">
      {/* Header */}
      <header className="bg-[#1E1E2E] backdrop-blur-sm border-b border-[#334155] px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#6366F1] p-3 rounded-xl shadow-lg">
            <Apple className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#F1F5F9]">Dietas Asignadas</h1>
            <p className="text-[#94A3B8] mt-1">
              Sistema de gestión de dietas con asignación diferenciada para entrenadores personales y gimnasios
            </p>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-[#1E1E2E]/50 border-b border-[#334155] px-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#6366F1] border-[#6366F1]'
                  : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9] hover:border-[#475569]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}

