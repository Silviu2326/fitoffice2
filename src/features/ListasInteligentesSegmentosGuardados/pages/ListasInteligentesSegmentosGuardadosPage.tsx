import { useState } from 'react';
import { List, Brain, Filter, Activity, Sparkles, BarChart3, Zap, GitCompare } from 'lucide-react';
import SegmentationEngine from '../components/SegmentationEngine';
import SmartListsManager from '../components/SmartListsManager';
import SegmentBuilder from '../components/SegmentBuilder';
import BehaviorAnalyzer from '../components/BehaviorAnalyzer';
import PredictiveSegmentation from '../components/PredictiveSegmentation';
import SegmentAnalytics from '../components/SegmentAnalytics';
import AutomationRules from '../components/AutomationRules';
import SegmentComparison from '../components/SegmentComparison';

type TabType = 
  | 'engine' 
  | 'lists' 
  | 'builder' 
  | 'behavior' 
  | 'predictive' 
  | 'analytics' 
  | 'automation' 
  | 'comparison';

export default function ListasInteligentesSegmentosGuardadosPage() {
  const [activeTab, setActiveTab] = useState<TabType>('engine');

  const tabs = [
    { id: 'engine' as TabType, label: 'Motor de Segmentación', icon: Brain },
    { id: 'lists' as TabType, label: 'Listas Inteligentes', icon: List },
    { id: 'builder' as TabType, label: 'Constructor', icon: Filter },
    { id: 'behavior' as TabType, label: 'Comportamiento', icon: Activity },
    { id: 'predictive' as TabType, label: 'Predictivo', icon: Sparkles },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'automation' as TabType, label: 'Automatización', icon: Zap },
    { id: 'comparison' as TabType, label: 'Comparación', icon: GitCompare }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'engine':
        return <SegmentationEngine />;
      case 'lists':
        return <SmartListsManager />;
      case 'builder':
        return <SegmentBuilder />;
      case 'behavior':
        return <BehaviorAnalyzer />;
      case 'predictive':
        return <PredictiveSegmentation />;
      case 'analytics':
        return <SegmentAnalytics />;
      case 'automation':
        return <AutomationRules />;
      case 'comparison':
        return <SegmentComparison />;
      default:
        return <SegmentationEngine />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FFFFFF]">
      {/* Header */}
      <header className="bg-[#FFFFFF] border-b border-[#E2E8F0] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[30px] leading-[38px] font-bold text-[#0F172A] flex items-center gap-3">
              <div className="p-2 bg-[#6366F1] rounded-xl shadow-md">
                <List className="w-8 h-8 text-white" />
              </div>
              Listas Inteligentes & Segmentos Guardados
            </h1>
            <p className="text-[#64748B] mt-2 text-[16px] leading-6">
              Sistema avanzado de segmentación automática y análisis predictivo
            </p>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-8">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#6366F1] text-[#6366F1] bg-[#EEF2FF]'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-[14px] leading-5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

