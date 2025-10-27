import { Zap, Mail, Bell, MessageSquare, Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  segment: string;
  isActive: boolean;
  executed: number;
  successRate: number;
}

export default function AutomationRules() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Email Renovación Automática',
      trigger: 'Cliente entra en "Bono Caducando"',
      action: 'Enviar email con oferta de renovación',
      segment: 'Mujeres 30-45 Bono Caducando',
      isActive: true,
      executed: 156,
      successRate: 73
    },
    {
      id: '2',
      name: 'Notificación Riesgo Abandono',
      trigger: 'Asistencia < 30% durante 30 días',
      action: 'Notificar al staff + SMS al cliente',
      segment: 'Riesgo de Abandono',
      isActive: true,
      executed: 89,
      successRate: 45
    },
    {
      id: '3',
      name: 'Campaña Upsell Premium',
      trigger: 'Adherencia > 80% por 3 meses',
      action: 'Email con oferta premium personalizada',
      segment: 'Alta Adherencia - Upsell',
      isActive: false,
      executed: 234,
      successRate: 62
    },
    {
      id: '4',
      name: 'Bienvenida Nuevos Miembros',
      trigger: 'Cliente se registra',
      action: 'Serie de emails onboarding',
      segment: 'Nuevos Miembros',
      isActive: true,
      executed: 312,
      successRate: 89
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const getActionIcon = (action: string) => {
    if (action.includes('email')) return Mail;
    if (action.includes('SMS') || action.includes('notificar')) return MessageSquare;
    return Bell;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#6366F1]" />
            Reglas de Automatización
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Acciones automáticas basadas en segmentos y comportamiento
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg gap-2 font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          <Zap className="w-5 h-5" />
          Nueva Regla
        </button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => {
          const ActionIcon = getActionIcon(rule.action);
          
          return (
            <div
              key={rule.id}
              className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${rule.isActive ? 'bg-[#EEF2FF]' : 'bg-[#F1F5F9]'}`}>
                    <ActionIcon className={`w-6 h-6 ${rule.isActive ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A]">{rule.name}</h3>
                      {rule.isActive ? (
                        <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-[12px] leading-4 font-medium">
                          Activa
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-[#F1F5F9] text-[#94A3B8] rounded-full text-[12px] leading-4 font-medium">
                          Pausada
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-[14px] leading-5 text-[#64748B]">
                        <span className="text-[#0F172A] font-medium">Trigger:</span> {rule.trigger}
                      </p>
                      <p className="text-[14px] leading-5 text-[#64748B]">
                        <span className="text-[#0F172A] font-medium">Acción:</span> {rule.action}
                      </p>
                      <p className="text-[14px] leading-5 text-[#6366F1]">
                        <span className="text-[#0F172A] font-medium">Segmento:</span> {rule.segment}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    rule.isActive
                      ? 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B]'
                      : 'bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-md'
                  }`}
                >
                  {rule.isActive ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#E2E8F0]">
                <div>
                  <span className="text-[14px] leading-5 text-[#64748B]">Ejecutadas: </span>
                  <span className="text-[#0F172A] font-semibold">{rule.executed}</span>
                </div>
                <div>
                  <span className="text-[14px] leading-5 text-[#64748B]">Tasa de éxito: </span>
                  <span className="text-[#10B981] font-semibold">{rule.successRate}%</span>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#3B82F6] transition-all duration-500"
                      style={{ width: `${rule.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

