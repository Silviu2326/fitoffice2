import { Activity, TrendingUp, Clock, Target } from 'lucide-react';
import { useState } from 'react';

interface BehaviorPattern {
  id: string;
  pattern: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  trend: number;
}

export default function BehaviorAnalyzer() {
  const [patterns] = useState<BehaviorPattern[]>([
    {
      id: '1',
      pattern: 'Asistencia nocturna (18:00-21:00)',
      frequency: 156,
      impact: 'high',
      trend: 12
    },
    {
      id: '2',
      pattern: 'Reservas con menos de 2h anticipación',
      frequency: 89,
      impact: 'medium',
      trend: -5
    },
    {
      id: '3',
      pattern: 'Cancelaciones último momento',
      frequency: 34,
      impact: 'high',
      trend: 8
    },
    {
      id: '4',
      pattern: 'Clases grupales + entrenamiento personal',
      frequency: 67,
      impact: 'medium',
      trend: 15
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'slate';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return 'Alto Impacto';
      case 'medium': return 'Impacto Medio';
      case 'low': return 'Bajo Impacto';
      default: return 'Sin Clasificar';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#6366F1]" />
            Analizador de Comportamiento
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Identificación automática de patrones y tendencias de uso
          </p>
        </div>
      </div>

      {/* Behavior Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#DBEAFE]">
              <Target className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-[24px] leading-8 font-bold text-[#0F172A]">12</p>
              <p className="text-[14px] leading-5 text-[#64748B]">Patrones Detectados</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#E0E7FF]">
              <Clock className="w-6 h-6 text-[#6366F1]" />
            </div>
            <div>
              <p className="text-[24px] leading-8 font-bold text-[#0F172A]">346</p>
              <p className="text-[14px] leading-5 text-[#64748B]">Eventos Analizados</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#D1FAE5]">
              <TrendingUp className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <p className="text-[24px] leading-8 font-bold text-[#0F172A]">89%</p>
              <p className="text-[14px] leading-5 text-[#64748B]">Precisión Predictiva</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patterns List */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
        <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A] mb-4">Patrones Identificados</h3>
        <div className="space-y-4">
          {patterns.map((pattern) => {
            const impactColor = getImpactColor(pattern.impact);
            const impactBgMap = {
              'red': '#FEE2E2',
              'yellow': '#FEF3C7',
              'green': '#D1FAE5',
              'slate': '#F1F5F9'
            };
            const impactTextMap = {
              'red': '#EF4444',
              'yellow': '#F59E0B',
              'green': '#10B981',
              'slate': '#64748B'
            };
            return (
              <div
                key={pattern.id}
                className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#F1F5F9] transition-colors duration-200"
              >
                <div className="flex-1">
                  <h4 className="text-[#0F172A] font-medium text-[16px] leading-6">{pattern.pattern}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[14px] leading-5 text-[#64748B]">
                      Frecuencia: <span className="text-[#0F172A] font-medium">{pattern.frequency}</span>
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-[12px] leading-4 font-medium"
                      style={{ 
                        backgroundColor: impactBgMap[impactColor as keyof typeof impactBgMap], 
                        color: impactTextMap[impactColor as keyof typeof impactTextMap] 
                      }}
                    >
                      {getImpactLabel(pattern.impact)}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${pattern.trend > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  <TrendingUp className={`w-5 h-5 ${pattern.trend < 0 ? 'rotate-180' : ''}`} />
                  <span className="font-semibold text-[16px] leading-6">{Math.abs(pattern.trend)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

