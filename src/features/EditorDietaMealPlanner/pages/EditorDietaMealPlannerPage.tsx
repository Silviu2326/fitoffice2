import { useState } from 'react';
import { ChefHat } from 'lucide-react';
import EditorDieta from '../components/EditorDieta';
import CalculadoraMacros from '../components/CalculadoraMacros';
import PlanificadorComidas from '../components/PlanificadorComidas';
import SelectorAlimentos from '../components/SelectorAlimentos';
import HorariosComida from '../components/HorariosComida';
import GestorSustituciones from '../components/GestorSustituciones';
import ValidadorNutricional from '../components/ValidadorNutricional';
import GeneradorListaCompra from '../components/GeneradorListaCompra';

type Tab = 'editor' | 'calculadora' | 'planificador' | 'alimentos' | 'horarios' | 'sustituciones' | 'validador' | 'lista-compra';

export default function EditorDietaMealPlannerPage() {
  const [tabActiva, setTabActiva] = useState<Tab>('editor');

  const tabs: { id: Tab; label: string; icon?: string }[] = [
    { id: 'editor', label: 'Editor de Dieta' },
    { id: 'calculadora', label: 'Calculadora de Macros' },
    { id: 'planificador', label: 'Planificador' },
    { id: 'alimentos', label: 'Selector de Alimentos' },
    { id: 'horarios', label: 'Horarios' },
    { id: 'sustituciones', label: 'Sustituciones' },
    { id: 'validador', label: 'Validador' },
    { id: 'lista-compra', label: 'Lista de Compra' },
  ];

  const renderContenido = () => {
    switch (tabActiva) {
      case 'editor':
        return <EditorDieta />;
      case 'calculadora':
        return <CalculadoraMacros />;
      case 'planificador':
        return <PlanificadorComidas />;
      case 'alimentos':
        return <SelectorAlimentos />;
      case 'horarios':
        return <HorariosComida />;
      case 'sustituciones':
        return <GestorSustituciones />;
      case 'validador':
        return <ValidadorNutricional />;
      case 'lista-compra':
        return <GeneradorListaCompra />;
      default:
        return <EditorDieta />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] p-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Editor de Dieta & Meal Planner</h1>
            <p className="text-indigo-100 mt-1">
              Herramienta completa para crear dietas personalizadas con macros, planificación y seguimiento
            </p>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white border-b border-[#E2E8F0] px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 pt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ease-out ${
                tabActiva === tab.id
                  ? 'bg-[#6366F1] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {renderContenido()}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-white border-t border-[#E2E8F0] px-6 py-3">
        <div className="flex justify-between items-center text-sm text-[#94A3B8]">
          <div>
            💡 Tip: Usa la calculadora de macros para empezar, luego crea tu dieta en el editor
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Sistema activo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

