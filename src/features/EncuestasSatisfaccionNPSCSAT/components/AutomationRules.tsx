import { useState } from 'react';
import { Plus, Zap, Calendar, Users, Mail, MessageSquare, Power, Trash2 } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  sent: number;
  responseRate: number;
}

export default function AutomationRules() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Post-Clase Inmediata',
      trigger: 'Después de asistir a una clase',
      action: 'Enviar encuesta CSAT por email',
      active: true,
      sent: 145,
      responseRate: 72
    },
    {
      id: '2',
      name: 'Evaluación Mensual',
      trigger: 'Cada 30 días de membresía',
      action: 'Enviar encuesta NPS por WhatsApp',
      active: true,
      sent: 89,
      responseRate: 65
    },
    {
      id: '3',
      name: 'Post-Entrenamiento Personal',
      trigger: 'Después de sesión de PT',
      action: 'Enviar encuesta CSAT por SMS',
      active: false,
      sent: 34,
      responseRate: 58
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Reglas de Automatización</h2>
          <p className="text-[#64748B] mt-1">Configura envíos automáticos de encuestas basados en eventos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
          <Plus className="w-5 h-5" />
          Nueva Regla
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-[#10B981]" />
            <p className="text-[#64748B] text-sm">Reglas Activas</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">
            {rules.filter(r => r.active).length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-[#3B82F6]" />
            <p className="text-[#64748B] text-sm">Envíos Automáticos</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">268</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[#6366F1]" />
            <p className="text-[#64748B] text-sm">Tasa de Respuesta</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">68%</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-[#F59E0B]" />
            <p className="text-[#64748B] text-sm">Este Mes</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">113</p>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:border-[#6366F1] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-[#0F172A]">{rule.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rule.active 
                      ? 'bg-[#D1FAE5] text-[#10B981]' 
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    {rule.active ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0F172A]">
                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-sm"><span className="text-[#64748B]">Trigger:</span> {rule.trigger}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0F172A]">
                    <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-sm"><span className="text-[#64748B]">Acción:</span> {rule.action}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    rule.active 
                      ? 'bg-[#10B981] hover:bg-[#059669] text-white shadow-sm' 
                      : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B]'
                  }`}
                  title={rule.active ? 'Desactivar' : 'Activar'}
                >
                  <Power className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0]">
              <div>
                <p className="text-[#64748B] text-sm mb-1">Encuestas Enviadas</p>
                <p className="text-2xl font-bold text-[#0F172A]">{rule.sent}</p>
              </div>
              <div>
                <p className="text-[#64748B] text-sm mb-1">Tasa de Respuesta</p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-[#0F172A]">{rule.responseRate}%</p>
                  <div className="flex-1 mb-2">
                    <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full h-2 transition-all duration-200"
                        style={{ width: `${rule.responseRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Rule Card */}
      <div className="bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 p-8 hover:border-slate-600 transition-colors">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-full mb-4">
            <Plus className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Crear Nueva Regla de Automatización</h3>
          <p className="text-slate-400 mb-4">
            Configura triggers personalizados para enviar encuestas automáticamente
          </p>
          <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
            Configurar Regla
          </button>
        </div>
      </div>

      {/* Available Triggers */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Triggers Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Eventos de Clase</p>
              <p className="text-slate-400 text-xs">Post-clase, cancelación, primer clase</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Basados en Tiempo</p>
              <p className="text-slate-400 text-xs">Mensual, trimestral, aniversario</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
            <Users className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Eventos de Membresía</p>
              <p className="text-slate-400 text-xs">Alta, renovación, cancelación</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
            <MessageSquare className="w-5 h-5 text-emerald-500 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Sesiones Personales</p>
              <p className="text-slate-400 text-xs">Post-PT, post-nutrición, check-in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

