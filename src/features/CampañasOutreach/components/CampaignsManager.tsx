import { useState } from 'react';
import { Megaphone, Plus, Search, Filter } from 'lucide-react';
import { Button, Badge } from '../../../components/ui';

interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  channels: string[];
  audienceSize: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  startDate: string;
  endDate?: string;
}

export default function CampaignsManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Black Friday 2025',
      objective: 'Captación',
      status: 'scheduled',
      channels: ['WhatsApp', 'Email'],
      audienceSize: 1500,
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
      startDate: '2025-11-29'
    },
    {
      id: '2',
      name: 'Retención Socios',
      objective: 'Retención',
      status: 'active',
      channels: ['Email', 'SMS'],
      audienceSize: 350,
      sentCount: 350,
      openRate: 68.5,
      clickRate: 24.3,
      conversionRate: 12.8,
      startDate: '2025-10-15',
      endDate: '2025-11-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusVariant = (status: string): 'info' | 'warning' | 'success' | 'error' => {
    switch (status) {
      case 'draft': return 'warning';
      case 'scheduled': return 'info';
      case 'active': return 'success';
      case 'completed': return 'info';
      default: return 'info';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Borrador';
      case 'scheduled': return 'Programada';
      case 'active': return 'Activa';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-[#8B5CF6] p-3 rounded-xl shadow-md">
            <Megaphone className="w-icon-lg h-icon-lg text-white" />
          </div>
          <div>
            <h2 className="text-h2 font-bold text-text-primary">Gestor de Campañas</h2>
            <p className="text-body text-text-secondary">Gestiona campañas coordinadas y outreach automatizado</p>
          </div>
        </div>
        <Button variant="primary">
          <Plus className="w-5 h-5 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar campañas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base input-lg pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-base input-lg pl-10 pr-8 appearance-none"
          >
            <option value="all">Todas</option>
            <option value="draft">Borradores</option>
            <option value="scheduled">Programadas</option>
            <option value="active">Activas</option>
            <option value="completed">Completadas</option>
          </select>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-background rounded-xl p-6 border border-border hover:border-primary transition-all duration-normal cursor-pointer shadow-sm hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-h3 font-bold text-text-primary">{campaign.name}</h3>
                  <Badge variant={getStatusVariant(campaign.status)}>
                    {getStatusText(campaign.status)}
                  </Badge>
                </div>
                <p className="text-body text-text-secondary">Objetivo: {campaign.objective}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-body-small text-text-muted">Canales:</span>
                  {campaign.channels.map((channel) => (
                    <span key={channel} className="chip-base">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-body-small text-text-secondary">Audiencia</div>
                <div className="text-2xl font-bold text-text-primary">{campaign.audienceSize.toLocaleString()}</div>
              </div>
            </div>

            {/* Métricas */}
            {campaign.status !== 'draft' && (
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
                <div>
                  <div className="text-body-small text-text-secondary">Enviados</div>
                  <div className="text-lg font-semibold text-text-primary">{campaign.sentCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-body-small text-text-secondary">Tasa de Apertura</div>
                  <div className="text-lg font-semibold text-success">{campaign.openRate}%</div>
                </div>
                <div>
                  <div className="text-body-small text-text-secondary">Tasa de Click</div>
                  <div className="text-lg font-semibold text-info">{campaign.clickRate}%</div>
                </div>
                <div>
                  <div className="text-body-small text-text-secondary">Conversión</div>
                  <div className="text-lg font-semibold text-primary">{campaign.conversionRate}%</div>
                </div>
              </div>
            )}

            {/* Fechas */}
            <div className="flex items-center gap-4 mt-4 text-body-small text-text-secondary">
              <span>Inicio: {new Date(campaign.startDate).toLocaleDateString('es-ES')}</span>
              {campaign.endDate && (
                <span>• Fin: {new Date(campaign.endDate).toLocaleDateString('es-ES')}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12 bg-surface rounded-xl border border-border">
          <Megaphone className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-h3 font-semibold text-text-secondary mb-2">No se encontraron campañas</h3>
          <p className="text-body text-text-muted">Intenta ajustar los filtros o crea una nueva campaña</p>
        </div>
      )}
    </div>
  );
}

