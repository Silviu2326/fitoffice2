import { useState } from 'react';
import { Megaphone, Zap, Users, Wand2, Send, BarChart3, DollarSign } from 'lucide-react';
import CampaignsManager from '../components/CampaignsManager';
import CampaignBuilder from '../components/CampaignBuilder';
import OutreachAutomation from '../components/OutreachAutomation';
import AudienceSegmenter from '../components/AudienceSegmenter';
import ContentPersonalizer from '../components/ContentPersonalizer';
import MultiChannelSender from '../components/MultiChannelSender';
import CampaignAnalytics from '../components/CampaignAnalytics';
import ROITracker from '../components/ROITracker';

export default function CampañasOutreachPage() {
  const [activeTab, setActiveTab] = useState('manager');

  const tabs = [
    { id: 'manager', label: 'Campañas', icon: Megaphone, component: CampaignsManager },
    { id: 'builder', label: 'Constructor', icon: Wand2, component: CampaignBuilder },
    { id: 'automation', label: 'Automatización', icon: Zap, component: OutreachAutomation },
    { id: 'segmentation', label: 'Segmentación', icon: Users, component: AudienceSegmenter },
    { id: 'personalization', label: 'Personalización', icon: Wand2, component: ContentPersonalizer },
    { id: 'multichannel', label: 'Multi-Canal', icon: Send, component: MultiChannelSender },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: CampaignAnalytics },
    { id: 'roi', label: 'ROI', icon: DollarSign, component: ROITracker }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CampaignsManager;

  return (
    <main className="flex-1 overflow-y-auto bg-surface">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-primary to-[#8B5CF6] p-3 rounded-xl shadow-md">
              <Megaphone className="w-icon-xl h-icon-xl text-white" />
            </div>
            <div>
              <h1 className="text-h1 font-bold text-text-primary">Campañas & Outreach</h1>
              <p className="text-body text-text-secondary">
                Gestión de campañas coordinadas y outreach automatizado
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-border">
          <div className="flex gap-2 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all duration-normal whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-background text-primary border-b-2 border-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="card-base">
          <ActiveComponent />
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-primary-50 border border-primary/20 rounded-xl p-6">
          <div className="flex gap-4">
            <Megaphone className="w-12 h-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-h3 font-bold text-text-primary mb-2">
                Sistema de Campañas Profesional
              </h3>
              <p className="text-body-small text-text-secondary">
                El módulo de Campañas & Outreach está diseñado especialmente para gimnasios
                que necesitan realizar campañas masivas coordinadas (Black Friday, retención de socios).
                Incluye segmentación avanzada, automatización de secuencias, envío multi-canal
                (WhatsApp, Email, SMS) y análisis detallado de ROI.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge-base badge-success">
                  WhatsApp Business API
                </span>
                <span className="badge-base badge-info">
                  Email Marketing
                </span>
                <span className="badge-base badge-info">
                  SMS Gateway
                </span>
                <span className="badge-base badge-success">
                  Analytics Avanzados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

