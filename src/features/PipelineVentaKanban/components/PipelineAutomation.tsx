import { useState } from 'react';
import { Zap, Mail, MessageSquare, Bell, Clock, ArrowRight, Plus, Trash2, Save, X } from 'lucide-react';
import { Phase } from '../types';

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'phase_entry' | 'phase_duration' | 'lead_created';
  phaseId?: string;
  duration?: number;
  action: 'send_email' | 'send_whatsapp' | 'create_task' | 'notification';
  actionData: any;
  enabled: boolean;
}

interface PipelineAutomationProps {
  phases: Phase[];
  onClose: () => void;
}

export default function PipelineAutomation({ phases, onClose }: PipelineAutomationProps) {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Email de bienvenida',
      trigger: 'lead_created',
      action: 'send_email',
      actionData: { template: 'welcome' },
      enabled: true,
    },
    {
      id: '2',
      name: 'Recordatorio seguimiento',
      trigger: 'phase_duration',
      phaseId: 'contactado',
      duration: 3,
      action: 'create_task',
      actionData: { title: 'Hacer seguimiento' },
      enabled: true,
    },
  ]);

  const [showAddRule, setShowAddRule] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const getTriggerLabel = (rule: AutomationRule) => {
    switch (rule.trigger) {
      case 'lead_created':
        return 'Cuando se crea un lead';
      case 'phase_entry':
        const phase = phases.find(p => p.id === rule.phaseId);
        return `Al entrar en fase: ${phase?.name || 'N/A'}`;
      case 'phase_duration':
        const durationPhase = phases.find(p => p.id === rule.phaseId);
        return `${rule.duration} días en fase: ${durationPhase?.name || 'N/A'}`;
      default:
        return 'Desconocido';
    }
  };

  const getActionLabel = (rule: AutomationRule) => {
    switch (rule.action) {
      case 'send_email':
        return 'Enviar email';
      case 'send_whatsapp':
        return 'Enviar WhatsApp';
      case 'create_task':
        return 'Crear tarea';
      case 'notification':
        return 'Enviar notificación';
      default:
        return 'Desconocido';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'send_email':
        return <Mail className="w-4 h-4" />;
      case 'send_whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'create_task':
        return <Clock className="w-4 h-4" />;
      case 'notification':
        return <Bell className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#F59E0B]" />
            <h2 className="text-2xl font-bold text-[#0F172A]">Automatizaciones del Pipeline</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <p className="text-[#64748B] text-sm">
              Configura reglas automáticas para agilizar tu proceso de ventas y no perder oportunidades.
            </p>
          </div>

          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`bg-[#F8FAFC] rounded-xl p-4 border-2 transition-all duration-200 ${
                  rule.enabled ? 'border-[#6366F1]' : 'border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#0F172A]">{rule.name}</h3>
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          rule.enabled
                            ? 'bg-[#6366F1] text-white'
                            : 'bg-[#E2E8F0] text-[#64748B]'
                        }`}
                      >
                        {rule.enabled ? 'Activa' : 'Inactiva'}
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-[#0F172A]">
                      <div className="bg-white border border-[#E2E8F0] px-3 py-1 rounded-lg">
                        {getTriggerLabel(rule)}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
                      <div className="bg-white border border-[#E2E8F0] px-3 py-1 rounded-lg flex items-center gap-2">
                        {getActionIcon(rule.action)}
                        {getActionLabel(rule)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="text-[#EF4444] hover:text-[#DC2626] transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {rules.length === 0 && (
            <div className="text-center py-12 text-[#94A3B8]">
              <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay automatizaciones configuradas</p>
            </div>
          )}

          <button
            onClick={() => setShowAddRule(true)}
            className="mt-6 w-full bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] text-[#0F172A] py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Agregar Nueva Automatización
          </button>
        </div>

        <div className="p-6 border-t border-[#E2E8F0] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg transition-all duration-200 font-semibold"
          >
            Cerrar
          </button>
          <button
            className="px-6 py-2 bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

