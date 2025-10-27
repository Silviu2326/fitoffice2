import { useState } from 'react';
import { BookOpen, Plus, Filter, Copy, Eye, GitBranch, BarChart3, FolderTree } from 'lucide-react';
import PlantillasDieta from '../components/PlantillasDieta';
import CreadorPlantilla from '../components/CreadorPlantilla';
import CategorizadorNutricion from '../components/CategorizadorNutricion';
import DuplicadorPlan from '../components/DuplicadorPlan';
import BuscadorPlantillas from '../components/BuscadorPlantillas';
import VisorPlantilla from '../components/VisorPlantilla';
import GestorVersiones from '../components/GestorVersiones';
import AnalyticsPlantillas from '../components/AnalyticsPlantillas';

export default function PlantillasDietaPage() {
  const [activeTab, setActiveTab] = useState<'plantillas' | 'crear' | 'categorias' | 'duplicar' | 'buscar' | 'visor' | 'versiones' | 'analytics'>('plantillas');

  const tabs = [
    { id: 'plantillas', label: 'Plantillas', icon: BookOpen },
    { id: 'crear', label: 'Crear Plantilla', icon: Plus },
    { id: 'categorias', label: 'Categorías', icon: FolderTree },
    { id: 'duplicar', label: 'Duplicar', icon: Copy },
    { id: 'buscar', label: 'Búsqueda Avanzada', icon: Filter },
    { id: 'visor', label: 'Vista Previa', icon: Eye },
    { id: 'versiones', label: 'Versiones', icon: GitBranch },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ] as const;

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Plantillas de Dieta</h1>
            <p className="text-indigo-100">Sistema de plantillas nutricionales reutilizables para estandarizar y escalar planes de alimentación</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ease-out ${
                  activeTab === tab.id
                    ? 'bg-white text-[#6366F1] shadow-lg font-semibold'
                    : 'bg-white/20 text-white hover:bg-white/30 font-medium'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'plantillas' && <PlantillasDieta />}
          {activeTab === 'crear' && <CreadorPlantilla />}
          {activeTab === 'categorias' && <CategorizadorNutricion />}
          {activeTab === 'duplicar' && <DuplicadorPlan />}
          {activeTab === 'buscar' && <BuscadorPlantillas />}
          {activeTab === 'visor' && <VisorPlantilla />}
          {activeTab === 'versiones' && <GestorVersiones />}
          {activeTab === 'analytics' && <AnalyticsPlantillas />}
        </div>
      </div>
    </div>
  );
}

