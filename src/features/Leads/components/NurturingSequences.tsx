import { useState } from 'react';
import { Plus, Mail, MessageSquare, Calendar, Play, Pause, Edit2, Trash2 } from 'lucide-react';

interface Sequence {
  id: string;
  name: string;
  type: 'email' | 'whatsapp' | 'mixed';
  status: 'active' | 'paused' | 'draft';
  steps: number;
  leads: number;
  conversion: number;
}

export default function NurturingSequences() {
  const [sequences, setSequences] = useState<Sequence[]>([
    {
      id: '1',
      name: 'Bienvenida Nuevos Leads',
      type: 'email',
      status: 'active',
      steps: 5,
      leads: 24,
      conversion: 15,
    },
    {
      id: '2',
      name: 'Seguimiento Post-Consulta',
      type: 'whatsapp',
      status: 'active',
      steps: 3,
      leads: 12,
      conversion: 35,
    },
    {
      id: '3',
      name: 'Reactivación Leads Fríos',
      type: 'mixed',
      status: 'paused',
      steps: 4,
      leads: 45,
      conversion: 8,
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'mixed':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]';
      case 'whatsapp':
        return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]';
      case 'mixed':
        return 'bg-[#EDE9FE] text-[#8B5CF6] border-[#8B5CF6]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'paused':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'draft':
        return 'bg-[#F1F5F9] text-[#64748B]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  const getConversionColor = (conversion: number) => {
    if (conversion >= 30) return 'text-[#10B981]';
    if (conversion >= 15) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Secuencias de Nurturing</h2>
          <p className="text-[#64748B] mt-1">
            Automatiza el seguimiento de leads con secuencias personalizadas
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus className="w-5 h-5" />
          Nueva Secuencia
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Secuencias Activas</p>
          <p className="text-3xl font-bold text-[#0F172A]">
            {sequences.filter((s) => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Leads en Secuencias</p>
          <p className="text-3xl font-bold text-[#0F172A]">
            {sequences.reduce((sum, s) => sum + s.leads, 0)}
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Conversión Promedio</p>
          <p className="text-3xl font-bold text-[#10B981]">
            {Math.round(sequences.reduce((sum, s) => sum + s.conversion, 0) / sequences.length)}%
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Total Pasos</p>
          <p className="text-3xl font-bold text-[#0F172A]">
            {sequences.reduce((sum, s) => sum + s.steps, 0)}
          </p>
        </div>
      </div>

      {/* Sequences List */}
      <div className="space-y-4">
        {sequences.map((sequence) => (
          <div
            key={sequence.id}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-[#0F172A]">{sequence.name}</h3>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                      sequence.type
                    )}`}
                  >
                    {getTypeIcon(sequence.type)}
                    {sequence.type === 'email' && 'Email'}
                    {sequence.type === 'whatsapp' && 'WhatsApp'}
                    {sequence.type === 'mixed' && 'Mixta'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      sequence.status
                    )}`}
                  >
                    {sequence.status === 'active' && '● Activa'}
                    {sequence.status === 'paused' && '● Pausada'}
                    {sequence.status === 'draft' && '● Borrador'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-4">
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Pasos</p>
                    <p className="text-[#0F172A] font-semibold">{sequence.steps} pasos</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Leads Inscritos</p>
                    <p className="text-[#0F172A] font-semibold">{sequence.leads} leads</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs mb-1">Conversión</p>
                    <p className={`font-semibold ${getConversionColor(sequence.conversion)}`}>
                      {sequence.conversion}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {sequence.status === 'active' ? (
                  <button className="p-2 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#F59E0B] rounded-lg transition-all duration-200">
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-2 bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#10B981] rounded-lg transition-all duration-200">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] rounded-lg transition-all duration-200">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#EF4444] rounded-lg transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sequence Progress Bar */}
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#64748B] font-medium">Progreso de la secuencia</span>
                <span className="text-xs text-[#64748B]">
                  {Math.round((sequence.leads * sequence.conversion) / 100)} conversiones
                </span>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] h-2 rounded-full transition-all duration-200"
                  style={{ width: `${sequence.conversion}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Templates */}
      <div className="bg-gradient-to-r from-[#EEF2FF] to-[#EDE9FE] border border-[#6366F1] rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Plantillas de Secuencias</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#6366F1] rounded-lg text-left transition-all duration-200 group shadow-sm hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-[#0F172A] font-semibold">Bienvenida</span>
            </div>
            <p className="text-[#64748B] text-sm">5 emails + 2 WhatsApp</p>
          </button>
          <button className="p-4 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#6366F1] rounded-lg text-left transition-all duration-200 group shadow-sm hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#10B981]" />
              <span className="text-[#0F172A] font-semibold">Seguimiento</span>
            </div>
            <p className="text-[#64748B] text-sm">3 WhatsApp + 1 email</p>
          </button>
          <button className="p-4 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#6366F1] rounded-lg text-left transition-all duration-200 group shadow-sm hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-[#8B5CF6]" />
              <span className="text-[#0F172A] font-semibold">Reactivación</span>
            </div>
            <p className="text-[#64748B] text-sm">4 emails espaciados</p>
          </button>
        </div>
      </div>
    </div>
  );
}

