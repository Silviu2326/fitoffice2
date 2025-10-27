import { useState } from 'react';
import { Plus, Send, FileText, BarChart3 } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  type: 'NPS' | 'CSAT';
  status: 'draft' | 'active' | 'completed';
  responses: number;
  sentDate?: string;
}

export default function SurveysManager() {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Satisfacción General del Gimnasio',
      type: 'NPS',
      status: 'active',
      responses: 45,
      sentDate: '2025-10-15'
    },
    {
      id: '2',
      title: 'Evaluación de Clases',
      type: 'CSAT',
      status: 'active',
      responses: 32,
      sentDate: '2025-10-18'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-[#94A3B8]/20 text-[#64748B]',
      active: 'bg-[#D1FAE5] text-[#10B981]',
      completed: 'bg-[#DBEAFE] text-[#3B82F6]'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getTypeBadge = (type: string) => {
    return type === 'NPS' 
      ? 'bg-[#EEF2FF] text-[#6366F1]' 
      : 'bg-[#DBEAFE] text-[#3B82F6]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Gestor de Encuestas</h2>
          <p className="text-[#64748B] mt-1">Administra tus encuestas NPS y CSAT</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
          <Plus className="w-5 h-5" />
          Nueva Encuesta
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm">Encuestas Activas</p>
              <p className="text-2xl font-bold text-[#0F172A] mt-1">2</p>
            </div>
            <Send className="w-8 h-8 text-[#10B981]" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm">Total Respuestas</p>
              <p className="text-2xl font-bold text-[#0F172A] mt-1">77</p>
            </div>
            <FileText className="w-8 h-8 text-[#3B82F6]" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm">Tasa de Respuesta</p>
              <p className="text-2xl font-bold text-[#0F172A] mt-1">68%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-[#6366F1]" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm">NPS Promedio</p>
              <p className="text-2xl font-bold text-[#0F172A] mt-1">+42</p>
            </div>
            <BarChart3 className="w-8 h-8 text-[#10B981]" />
          </div>
        </div>
      </div>

      {/* Surveys List */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-md">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]">Encuestas Recientes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-[#0F172A] font-medium">{survey.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(survey.type)}`}>
                      {survey.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(survey.status)}`}>
                      {survey.status === 'draft' ? 'Borrador' : survey.status === 'active' ? 'Activa' : 'Completada'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#64748B]">
                    <span>{survey.responses} respuestas</span>
                    {survey.sentDate && <span>Enviada: {survey.sentDate}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white text-[#0F172A] rounded-lg font-medium transition-all duration-200 text-sm">
                    Ver Resultados
                  </button>
                  <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 text-sm">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

