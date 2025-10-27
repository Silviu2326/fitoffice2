import { useState } from 'react';
import { Apple, Camera, Scale, Heart, TrendingUp, MessageCircle } from 'lucide-react';
import CheckInsNutricion from '../components/CheckInsNutricion';
import FotosComida from '../components/FotosComida';
import SeguimientoPeso from '../components/SeguimientoPeso';
import EvaluacionHambre from '../components/EvaluacionHambre';
import HistorialNutricional from '../components/HistorialNutricional';
import CalculadoraAdherencia from '../components/CalculadoraAdherencia';
import AnalizadorTendencias from '../components/AnalizadorTendencias';
import FeedbackEntrenador from '../components/FeedbackEntrenador';

export default function CheckinsNutricionalesPage() {
  const [activeTab, setActiveTab] = useState<'checkins' | 'fotos' | 'peso' | 'hambre' | 'historial' | 'adherencia' | 'tendencias' | 'feedback'>('checkins');

  const tabs = [
    { id: 'checkins', label: 'Check-ins', icon: Apple },
    { id: 'fotos', label: 'Fotos de Comida', icon: Camera },
    { id: 'peso', label: 'Peso Diario', icon: Scale },
    { id: 'hambre', label: 'Hambre/Saciedad', icon: Heart },
    { id: 'historial', label: 'Historial', icon: TrendingUp },
    { id: 'adherencia', label: 'Adherencia', icon: TrendingUp },
    { id: 'tendencias', label: 'Análisis', icon: TrendingUp },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
  ] as const;

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Apple className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Check-ins Nutricionales</h1>
            <p className="text-white/90">Sistema de seguimiento nutricional detallado 1 a 1</p>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#6366F1] shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-base">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'checkins' && <CheckInsNutricion />}
          {activeTab === 'fotos' && <FotosComida />}
          {activeTab === 'peso' && <SeguimientoPeso />}
          {activeTab === 'hambre' && <EvaluacionHambre />}
          {activeTab === 'historial' && <HistorialNutricional />}
          {activeTab === 'adherencia' && <CalculadoraAdherencia />}
          {activeTab === 'tendencias' && <AnalizadorTendencias />}
          {activeTab === 'feedback' && <FeedbackEntrenador />}
        </div>
      </div>
    </div>
  );
}

