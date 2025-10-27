import { useState } from 'react';
import { BarChart3, TrendingUp, Users, MousePointer, DollarSign, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui';

interface AnalyticsData {
  metric: string;
  value: number;
  change: number;
  icon: any;
  color: string;
}

export default function CampaignAnalytics() {
  const [timeRange, setTimeRange] = useState('7days');

  const metrics: AnalyticsData[] = [
    {
      metric: 'Mensajes Enviados',
      value: 2450,
      change: 12.5,
      icon: Users,
      color: 'blue'
    },
    {
      metric: 'Tasa de Apertura',
      value: 68.3,
      change: 5.2,
      icon: Eye,
      color: 'green'
    },
    {
      metric: 'Tasa de Click',
      value: 24.7,
      change: -2.1,
      icon: MousePointer,
      color: 'purple'
    },
    {
      metric: 'Conversiones',
      value: 156,
      change: 18.9,
      icon: TrendingUp,
      color: 'yellow'
    }
  ];

  const campaigns = [
    {
      name: 'Black Friday 2025',
      sent: 1500,
      opened: 1050,
      clicked: 420,
      converted: 89
    },
    {
      name: 'Retención Socios',
      sent: 350,
      opened: 240,
      clicked: 85,
      converted: 45
    },
    {
      name: 'Bienvenida Leads',
      sent: 600,
      opened: 480,
      clicked: 180,
      converted: 22
    }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'from-info to-[#06B6D4]';
      case 'green': return 'from-success to-success-dark';
      case 'purple': return 'from-primary to-[#8B5CF6]';
      case 'yellow': return 'from-warning to-[#F97316]';
      default: return 'from-text-secondary to-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-[#8B5CF6] p-3 rounded-xl shadow-md">
            <BarChart3 className="w-icon-lg h-icon-lg text-white" />
          </div>
          <div>
            <h2 className="text-h2 font-bold text-text-primary">Analytics de Campañas</h2>
            <p className="text-body text-text-secondary">Métricas y rendimiento de tus campañas</p>
          </div>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-base"
        >
          <option value="24h">Últimas 24 horas</option>
          <option value="7days">Últimos 7 días</option>
          <option value="30days">Últimos 30 días</option>
          <option value="90days">Últimos 90 días</option>
        </select>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.metric}
              hover
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${getColorClass(metric.color)} p-3 rounded-lg shadow-sm`}>
                  <Icon className="w-icon-lg h-icon-lg text-white" />
                </div>
                <div className={`flex items-center gap-1 text-body-small font-medium ${
                  metric.change >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="text-body-small text-text-secondary mb-1">{metric.metric}</div>
              <div className="text-3xl font-bold text-text-primary">
                {metric.metric.includes('Tasa') ? `${metric.value}%` : metric.value.toLocaleString()}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento por Campaña</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="text-left px-6 py-3 text-body-small font-semibold text-text-secondary">
                  Campaña
                </th>
                <th className="text-right px-6 py-3 text-body-small font-semibold text-text-secondary">
                  Enviados
                </th>
                <th className="text-right px-6 py-3 text-body-small font-semibold text-text-secondary">
                  Abiertos
                </th>
                <th className="text-right px-6 py-3 text-body-small font-semibold text-text-secondary">
                  Clicks
                </th>
                <th className="text-right px-6 py-3 text-body-small font-semibold text-text-secondary">
                  Conversiones
                </th>
                <th className="text-right px-6 py-3 text-body-small font-semibold text-text-secondary">
                  Tasa Conv.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {campaigns.map((campaign, index) => {
                const openRate = ((campaign.opened / campaign.sent) * 100).toFixed(1);
                const clickRate = ((campaign.clicked / campaign.opened) * 100).toFixed(1);
                const conversionRate = ((campaign.converted / campaign.sent) * 100).toFixed(1);

                return (
                  <tr key={index} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4 text-text-primary font-medium">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 text-right text-text-secondary">
                      {campaign.sent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-text-secondary">{campaign.opened.toLocaleString()}</div>
                      <div className="text-caption text-success font-medium">{openRate}%</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-text-secondary">{campaign.clicked.toLocaleString()}</div>
                      <div className="text-caption text-info font-medium">{clickRate}%</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-text-secondary">{campaign.converted.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-primary-50 text-primary px-3 py-1.5 rounded-full text-body-small font-semibold">
                        {conversionRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Channel Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-info/10 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-info" />
            </div>
            <h3 className="font-semibold text-text-primary">Email</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Tasa de Apertura</span>
              <span className="text-text-primary font-semibold">72.4%</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Tasa de Click</span>
              <span className="text-text-primary font-semibold">28.3%</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Conversiones</span>
              <span className="text-text-primary font-semibold">98</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-success/10 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-text-primary">WhatsApp</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Tasa de Apertura</span>
              <span className="text-text-primary font-semibold">89.2%</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Tasa de Respuesta</span>
              <span className="text-text-primary font-semibold">34.7%</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Conversiones</span>
              <span className="text-text-primary font-semibold">58</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">SMS</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Tasa de Entrega</span>
              <span className="text-text-primary font-semibold">97.8%</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Tasa de Click</span>
              <span className="text-text-primary font-semibold">15.2%</span>
            </div>
            <div className="flex justify-between text-body-small">
              <span className="text-text-secondary">Conversiones</span>
              <span className="text-text-primary font-semibold">23</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
