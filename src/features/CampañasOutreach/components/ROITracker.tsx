import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface CampaignROI {
  name: string;
  investment: number;
  revenue: number;
  conversions: number;
  roi: number;
  status: 'profit' | 'loss' | 'break-even';
}

export default function ROITracker() {
  const [campaigns] = useState<CampaignROI[]>([
    {
      name: 'Black Friday 2025',
      investment: 2500,
      revenue: 15600,
      conversions: 89,
      roi: 524,
      status: 'profit'
    },
    {
      name: 'Retención Socios',
      investment: 800,
      revenue: 6750,
      conversions: 45,
      roi: 744,
      status: 'profit'
    },
    {
      name: 'Bienvenida Leads',
      investment: 450,
      revenue: 3300,
      conversions: 22,
      roi: 633,
      status: 'profit'
    },
    {
      name: 'Reactivación Inactivos',
      investment: 600,
      revenue: 1800,
      conversions: 12,
      roi: 200,
      status: 'profit'
    }
  ]);

  const totalInvestment = campaigns.reduce((sum, c) => sum + c.investment, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgROI = ((totalRevenue - totalInvestment) / totalInvestment * 100).toFixed(1);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'profit':
        return <TrendingUp className="w-5 h-5 text-[#10B981]" />;
      case 'loss':
        return <TrendingDown className="w-5 h-5 text-[#EF4444]" />;
      default:
        return <TrendingUp className="w-5 h-5 text-[#F59E0B]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'profit': return 'text-[#10B981]';
      case 'loss': return 'text-[#EF4444]';
      default: return 'text-[#F59E0B]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-[#10B981] to-[#14B8A6] p-3 rounded-xl shadow-md">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Seguimiento de ROI</h2>
          <p className="text-[#64748B]">Retorno de inversión y efectividad</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#DBEAFE] border border-[#3B82F6]/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <div className="text-sm text-[#64748B] mb-1">Inversión Total</div>
          <div className="text-3xl font-bold text-[#0F172A]">
            €{totalInvestment.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#D1FAE5] border border-[#10B981]/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-[#10B981]" />
          </div>
          <div className="text-sm text-[#64748B] mb-1">Ingresos Generados</div>
          <div className="text-3xl font-bold text-[#0F172A]">
            €{totalRevenue.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#EEF2FF] border border-[#6366F1]/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="w-8 h-8 text-[#6366F1]" />
          </div>
          <div className="text-sm text-[#64748B] mb-1">ROI Promedio</div>
          <div className="text-3xl font-bold text-[#10B981]">
            {avgROI}%
          </div>
        </div>

        <div className="bg-[#FEF3C7] border border-[#F59E0B]/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
          </div>
          <div className="text-sm text-[#64748B] mb-1">Total Conversiones</div>
          <div className="text-3xl font-bold text-[#0F172A]">
            {totalConversions}
          </div>
        </div>
      </div>

      {/* ROI Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-bold text-[#0F172A]">ROI por Campaña</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-[#64748B]">
                  Campaña
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-[#64748B]">
                  Inversión
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-[#64748B]">
                  Ingresos
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-[#64748B]">
                  Conversiones
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-[#64748B]">
                  ROI
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-[#64748B]">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {campaigns.map((campaign, index) => {
                const profit = campaign.revenue - campaign.investment;
                const costPerConversion = (campaign.investment / campaign.conversions).toFixed(2);

                return (
                  <tr key={index} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 text-[#0F172A] font-medium">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 text-right text-[#64748B]">
                      €{campaign.investment.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-[#64748B]">€{campaign.revenue.toLocaleString()}</div>
                      <div className="text-xs text-[#10B981] font-medium">
                        +€{profit.toLocaleString()} ganancia
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-[#64748B]">{campaign.conversions}</div>
                      <div className="text-xs text-[#64748B]">
                        €{costPerConversion}/conv.
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-2xl font-bold ${getStatusColor(campaign.status)}`}>
                        {campaign.roi}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {getStatusIcon(campaign.status)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-[#D1FAE5] border border-[#10B981]/20 rounded-xl p-6">
        <div className="flex gap-4">
          <DollarSign className="w-12 h-12 text-[#10B981] flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">
              Optimización de ROI
            </h3>
            <p className="text-[#64748B] text-sm mb-3">
              El seguimiento del ROI te permite identificar qué campañas son más efectivas
              y optimizar tu presupuesto de marketing para maximizar resultados.
            </p>
            <ul className="text-sm text-[#64748B] space-y-1">
              <li>• Campañas con ROI superior a 300% son consideradas altamente exitosas</li>
              <li>• El costo por conversión óptimo depende del valor de vida del cliente (LTV)</li>
              <li>• Reinvierte las ganancias en las campañas con mejor desempeño</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
