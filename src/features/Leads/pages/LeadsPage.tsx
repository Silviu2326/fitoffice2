import { useState } from 'react';
import { Target, TrendingUp, Users, BarChart3, Layers, Award, History, FileText } from 'lucide-react';
import LeadsManager from '../components/LeadsManager';
import PipelineKanban from '../components/PipelineKanban';
import LeadCapture from '../components/LeadCapture';
import ScoringEngine from '../components/ScoringEngine';
import NurturingSequences from '../components/NurturingSequences';
import LeadAnalytics from '../components/LeadAnalytics';
import LeadAssignment from '../components/LeadAssignment';
import LeadHistory from '../components/LeadHistory';

type TabType = 'manager' | 'pipeline' | 'capture' | 'scoring' | 'nurturing' | 'analytics' | 'assignment' | 'history';

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('manager');

  const tabs = [
    { id: 'manager' as TabType, name: 'Gestión de Leads', icon: Users },
    { id: 'pipeline' as TabType, name: 'Pipeline', icon: Layers },
    { id: 'capture' as TabType, name: 'Captura', icon: FileText },
    { id: 'scoring' as TabType, name: 'Scoring', icon: Target },
    { id: 'nurturing' as TabType, name: 'Nurturing', icon: TrendingUp },
    { id: 'analytics' as TabType, name: 'Analytics', icon: BarChart3 },
    { id: 'assignment' as TabType, name: 'Asignación', icon: Award },
    { id: 'history' as TabType, name: 'Historial', icon: History },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'manager':
        return <LeadsManager />;
      case 'pipeline':
        return <PipelineKanban />;
      case 'capture':
        return <LeadCapture />;
      case 'scoring':
        return <ScoringEngine />;
      case 'nurturing':
        return <NurturingSequences />;
      case 'analytics':
        return <LeadAnalytics />;
      case 'assignment':
        return <LeadAssignment />;
      case 'history':
        return <LeadHistory />;
      default:
        return <LeadsManager />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl shadow-md">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Leads</h1>
              <p className="text-[#64748B] mt-1">
                Sistema de gestión de leads y pipeline comercial personalizado
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#6366F1] text-white shadow-md hover:shadow-lg hover:bg-[#4F46E5]'
                      : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

