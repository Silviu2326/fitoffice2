import { useState } from 'react';
import { BarChart3, FileText, ClipboardList, Settings, TrendingUp, MessageSquare, Zap } from 'lucide-react';
import SurveysManager from '../components/SurveysManager';
import NPSSurvey from '../components/NPSSurvey';
import CSATSurvey from '../components/CSATSurvey';
import SatisfactionDashboard from '../components/SatisfactionDashboard';
import SurveyBuilder from '../components/SurveyBuilder';
import ResponseAnalytics from '../components/ResponseAnalytics';
import ComparisonReports from '../components/ComparisonReports';
import AutomationRules from '../components/AutomationRules';

type TabType = 'dashboard' | 'manager' | 'nps' | 'csat' | 'builder' | 'analytics' | 'comparison' | 'automation';

export default function EncuestasSatisfaccionNPSCSATPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'manager' as TabType, label: 'Gestión', icon: FileText },
    { id: 'nps' as TabType, label: 'Encuesta NPS', icon: ClipboardList },
    { id: 'csat' as TabType, label: 'Encuesta CSAT', icon: ClipboardList },
    { id: 'builder' as TabType, label: 'Constructor', icon: Settings },
    { id: 'analytics' as TabType, label: 'Análisis', icon: MessageSquare },
    { id: 'comparison' as TabType, label: 'Comparativas', icon: TrendingUp },
    { id: 'automation' as TabType, label: 'Automatización', icon: Zap }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-xl shadow-md">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Encuestas & Satisfacción NPS/CSAT</h1>
              <p className="text-[#64748B]">Sistema de evaluación de satisfacción y experiencia del cliente</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-[#E2E8F0]">
          <div className="flex gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#F8FAFC] text-[#6366F1] border-b-2 border-[#6366F1]'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'dashboard' && <SatisfactionDashboard />}
          {activeTab === 'manager' && <SurveysManager />}
          {activeTab === 'nps' && <NPSSurvey />}
          {activeTab === 'csat' && <CSATSurvey />}
          {activeTab === 'builder' && <SurveyBuilder />}
          {activeTab === 'analytics' && <ResponseAnalytics />}
          {activeTab === 'comparison' && <ComparisonReports />}
          {activeTab === 'automation' && <AutomationRules />}
        </div>

        {/* Info Section */}
        <div className="bg-[#EEF2FF] border border-[#6366F1]/20 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-[#6366F1]/10 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-[#6366F1]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#0F172A] font-semibold mb-2">Sobre las Métricas NPS y CSAT</h3>
              <div className="space-y-2 text-sm text-[#64748B]">
                <p>
                  <span className="font-semibold text-[#6366F1]">NPS (Net Promoter Score):</span> Mide la probabilidad de que 
                  los clientes recomienden tu servicio. Escala 0-10 donde 9-10 son promotores, 7-8 neutrales y 0-6 detractores.
                </p>
                <p>
                  <span className="font-semibold text-[#3B82F6]">CSAT (Customer Satisfaction Score):</span> Evalúa la satisfacción 
                  con aspectos específicos del servicio. Escala 1-5 donde 4-5 se consideran satisfechos.
                </p>
                <p className="text-[#94A3B8] text-xs mt-3">
                  💡 Estos sistemas están especialmente diseñados para gimnasios y centros que necesitan evaluar 
                  múltiples aspectos del servicio (clases, instalaciones, atención, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

