import { Sparkles, TrendingDown, AlertTriangle, Trophy } from 'lucide-react';
import { useState } from 'react';

interface Prediction {
  id: string;
  segment: string;
  prediction: string;
  confidence: number;
  count: number;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

export default function PredictiveSegmentation() {
  const [predictions] = useState<Prediction[]>([
    {
      id: '1',
      segment: 'Riesgo de Abandono',
      prediction: 'Es probable que abandonen en 30 días',
      confidence: 87,
      count: 18,
      priority: 'high',
      action: 'Campaña de retención inmediata'
    },
    {
      id: '2',
      segment: 'Potencial Upsell',
      prediction: 'Alta probabilidad de upgrade',
      confidence: 92,
      count: 34,
      priority: 'medium',
      action: 'Ofertas personalizadas premium'
    },
    {
      id: '3',
      segment: 'Promotores Activos',
      prediction: 'Candidatos a programa referidos',
      confidence: 78,
      count: 56,
      priority: 'low',
      action: 'Invitar a programa de referidos'
    },
    {
      id: '4',
      segment: 'Renovación Incierta',
      prediction: 'Probabilidad media de no renovar',
      confidence: 71,
      count: 23,
      priority: 'high',
      action: 'Contacto personalizado pre-renovación'
    }
  ]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return TrendingDown;
      case 'low': return Trophy;
      default: return Sparkles;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#6366F1]" />
            Segmentación Predictiva
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Análisis predictivo basado en machine learning y patrones históricos
          </p>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="space-y-4">
        {predictions.map((pred) => {
          const PriorityIcon = getPriorityIcon(pred.priority);
          const color = getPriorityColor(pred.priority);
          const colorMap = {
            'red': { bg: '#FEE2E2', text: '#EF4444' },
            'yellow': { bg: '#FEF3C7', text: '#F59E0B' },
            'green': { bg: '#D1FAE5', text: '#10B981' },
            'blue': { bg: '#DBEAFE', text: '#3B82F6' }
          };
          const colors = colorMap[color as keyof typeof colorMap];
          
          return (
            <div
              key={pred.id}
              className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl mt-1" style={{ backgroundColor: colors.bg }}>
                    <PriorityIcon className="w-6 h-6" style={{ color: colors.text }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">{pred.segment}</h3>
                      <span className="px-3 py-1 rounded-full text-[12px] leading-4 uppercase font-medium" style={{ backgroundColor: colors.bg, color: colors.text }}>
                        {pred.priority === 'high' ? 'Alta' : pred.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                      </span>
                    </div>
                    <p className="text-[#64748B] mb-3 text-[16px] leading-6">{pred.prediction}</p>
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-[14px] leading-5 text-[#64748B]">Clientes afectados: </span>
                        <span className="text-[#0F172A] font-semibold">{pred.count}</span>
                      </div>
                      <div>
                        <span className="text-[14px] leading-5 text-[#64748B]">Confianza: </span>
                        <span className="text-[#10B981] font-semibold">{pred.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-4">
                <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#3B82F6] transition-all duration-500"
                    style={{ width: `${pred.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div className="text-[14px] leading-5 text-[#64748B]">
                  <span className="text-[#6366F1] font-medium">Acción recomendada: </span>
                  {pred.action}
                </div>
                <button className="inline-flex items-center justify-center px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-[14px] leading-5 font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                  Ejecutar Acción
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

