import { Brain, Users, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface SegmentationStats {
  totalSegments: number;
  activeRules: number;
  clientsSegmented: number;
  automationsTriggers: number;
}

export default function SegmentationEngine() {
  const [stats] = useState<SegmentationStats>({
    totalSegments: 12,
    activeRules: 8,
    clientsSegmented: 340,
    automationsTriggers: 5
  });

  const segmentationCards = [
    {
      title: 'Total de Segmentos',
      value: stats.totalSegments,
      icon: Users,
      color: 'emerald',
      description: 'Segmentos activos'
    },
    {
      title: 'Reglas Activas',
      value: stats.activeRules,
      icon: Target,
      color: 'blue',
      description: 'Criterios aplicados'
    },
    {
      title: 'Clientes Segmentados',
      value: stats.clientsSegmented,
      icon: TrendingUp,
      color: 'purple',
      description: 'Usuarios clasificados'
    },
    {
      title: 'Automatizaciones',
      value: stats.automationsTriggers,
      icon: Brain,
      color: 'orange',
      description: 'Triggers activos'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#6366F1]" />
            Motor de Segmentación
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Sistema avanzado de clasificación y análisis de comportamiento
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {segmentationCards.map((card, index) => {
          const Icon = card.icon;
          const colorMap = {
            'emerald': { bg: '#EEF2FF', text: '#6366F1' },
            'blue': { bg: '#DBEAFE', text: '#3B82F6' },
            'purple': { bg: '#E0E7FF', text: '#6366F1' },
            'orange': { bg: '#FEF3C7', text: '#F59E0B' }
          };
          const colors = colorMap[card.color as keyof typeof colorMap];
          return (
            <div
              key={index}
              className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: colors.bg }}>
                  <Icon className="w-6 h-6" style={{ color: colors.text }} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[30px] leading-[38px] font-bold text-[#0F172A]">{card.value}</p>
                <p className="text-[14px] leading-5 font-medium text-[#0F172A]">{card.title}</p>
                <p className="text-[12px] leading-4 text-[#64748B]">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segmentation Status */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
        <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A] mb-4">Estado del Motor</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-[16px] leading-6">Procesamiento en tiempo real</span>
            <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-[14px] leading-5 font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-[16px] leading-6">Análisis predictivo</span>
            <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-[14px] leading-5 font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-[16px] leading-6">Última actualización</span>
            <span className="text-[#64748B] text-[14px] leading-5">Hace 2 minutos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

