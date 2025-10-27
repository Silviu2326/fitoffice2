import { useState } from 'react';
import { Zap, Plus, Play, Pause } from 'lucide-react';

interface AutomationSequence {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused';
  steps: number;
  contacts: number;
  conversions: number;
}

export default function OutreachAutomation() {
  const [sequences, setSequences] = useState<AutomationSequence[]>([
    {
      id: '1',
      name: 'Bienvenida Nuevos Leads',
      trigger: 'Lead creado',
      status: 'active',
      steps: 5,
      contacts: 234,
      conversions: 45
    },
    {
      id: '2',
      name: 'Reactivación Inactivos',
      trigger: '30 días sin actividad',
      status: 'active',
      steps: 3,
      contacts: 89,
      conversions: 12
    },
    {
      id: '3',
      name: 'Prevención de Baja',
      trigger: 'Riesgo de cancelación',
      status: 'paused',
      steps: 4,
      contacts: 56,
      conversions: 8
    }
  ]);

  const toggleStatus = (id: string) => {
    setSequences(prev =>
      prev.map(seq =>
        seq.id === id
          ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' }
          : seq
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#F59E0B] to-[#F97316] p-3 rounded-xl shadow-md">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Automatización de Outreach</h2>
            <p className="text-[#64748B]">Secuencias automáticas basadas en comportamiento</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-lg hover:bg-[#4F46E5] transition-all duration-200 shadow-md hover:shadow-lg font-semibold">
          <Plus className="w-5 h-5" />
          Nueva Secuencia
        </button>
      </div>

      {/* Sequences List */}
      <div className="grid gap-4">
        {sequences.map((sequence) => (
          <div
            key={sequence.id}
            className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#0F172A]">{sequence.name}</h3>
                  <span
                    className={`${
                      sequence.status === 'active' ? 'bg-[#10B981]' : 'bg-[#94A3B8]'
                    } text-white text-xs px-3 py-1.5 rounded-full font-medium`}
                  >
                    {sequence.status === 'active' ? 'Activa' : 'Pausada'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#64748B]">Trigger:</span>
                  <span className="bg-[#F1F5F9] text-[#64748B] px-2.5 py-1 rounded-md font-medium">
                    {sequence.trigger}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleStatus(sequence.id)}
                className={`p-2 rounded-lg transition-all ${
                  sequence.status === 'active'
                    ? 'bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FECACA]'
                    : 'bg-[#D1FAE5] text-[#10B981] hover:bg-[#A7F3D0]'
                }`}
              >
                {sequence.status === 'active' ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0]">
              <div>
                <div className="text-sm text-[#64748B]">Pasos</div>
                <div className="text-2xl font-bold text-[#0F172A]">{sequence.steps}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748B]">Contactos en Secuencia</div>
                <div className="text-2xl font-bold text-[#3B82F6]">{sequence.contacts}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748B]">Conversiones</div>
                <div className="text-2xl font-bold text-[#10B981]">{sequence.conversions}</div>
                <div className="text-xs text-[#94A3B8]">
                  {((sequence.conversions / sequence.contacts) * 100).toFixed(1)}% tasa
                </div>
              </div>
            </div>

            {/* Workflow Preview */}
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2 text-sm text-[#64748B] mb-2">
                <span>Flujo de trabajo:</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {Array.from({ length: sequence.steps }, (_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-[#F1F5F9] px-3 py-2 rounded text-sm text-[#0F172A] whitespace-nowrap font-medium">
                      Paso {i + 1}
                    </div>
                    {i < sequence.steps - 1 && (
                      <div className="text-[#94A3B8]">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-[#FEF3C7] border border-[#F59E0B]/20 rounded-xl p-6">
        <div className="flex gap-4">
          <Zap className="w-12 h-12 text-[#F59E0B] flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">
              Automatización Inteligente
            </h3>
            <p className="text-[#64748B] text-sm">
              Las secuencias de outreach automatizado se activan basándose en el comportamiento
              de tus contactos. Cada secuencia personaliza el mensaje y selecciona el canal
              óptimo para maximizar las conversiones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
