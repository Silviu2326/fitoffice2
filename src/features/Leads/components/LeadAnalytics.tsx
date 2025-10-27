import { useState, useEffect } from 'react';
import { TrendingUp, Users, Target, Award, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { getLeadAnalytics } from '../api/leads';

export default function LeadAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLeadAnalytics();
      setAnalyticsData(data);
    } catch (err) {
      setError('Error al cargar los datos de analytics');
      console.error('Error loading analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error al cargar analytics</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <button 
          onClick={loadAnalyticsData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Instagram': return Instagram;
      case 'WhatsApp': return MessageSquare;
      case 'Facebook': return Facebook;
      case 'Referidos': return Users;
      case 'Target': return Target;
      default: return Target;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Analytics de Leads</h2>
        <p className="text-[#64748B] mt-1">
          Métricas de efectividad por canal y campaña
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#DBEAFE] rounded-lg">
              <Users className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Total Leads</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">150</p>
          <p className="text-sm text-[#10B981] mt-1 font-medium">+23% vs mes anterior</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#D1FAE5] rounded-lg">
              <Award className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Convertidos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">23</p>
          <p className="text-sm text-[#10B981] mt-1 font-medium">15% tasa de conversión</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#FEF3C7] rounded-lg">
              <Target className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Score Promedio</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">58</p>
          <p className="text-sm text-[#64748B] mt-1">puntos</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#EDE9FE] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Tiempo Promedio</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">14</p>
          <p className="text-sm text-[#64748B] mt-1">días hasta conversión</p>
        </div>
      </div>

      {/* Source Distribution & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Distribution */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
            Distribución por Origen
          </h3>
          <div className="space-y-4">
            {sourceData.map((source) => {
              const Icon = getIconComponent(source.icon);
              return (
                <div key={source.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#64748B]" />
                      <span className="text-[#0F172A] text-sm font-medium">{source.name}</span>
                    </div>
                    <span className="text-[#0F172A] font-semibold">{source.value}%</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className={`${source.color} h-2 rounded-full transition-all duration-200`}
                      style={{ width: `${source.value}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
            Embudo de Conversión
          </h3>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0F172A] text-sm font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F172A] font-semibold">{stage.count}</span>
                    <span className="text-[#64748B] text-xs">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div
                      className={`${stage.color} h-2 rounded-full transition-all duration-200`}
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="text-[#94A3B8] text-xs">↓</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-6">
          Tendencias Mensuales
        </h3>
        <div className="flex items-end justify-between gap-4 h-64">
          {monthlyTrends.map((data) => {
            const maxLeads = Math.max(...monthlyTrends.map((d) => d.leads));
            const leadsHeight = (data.leads / maxLeads) * 100;
            const convertedHeight = (data.converted / maxLeads) * 100;

            return (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1 h-48">
                  <div
                    className="w-full bg-[#DBEAFE] hover:bg-[#BFDBFE] rounded-t transition-all duration-200 relative group"
                    style={{ height: `${leadsHeight}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-[#0F172A] whitespace-nowrap font-medium">
                        {data.leads} leads
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-full bg-[#D1FAE5] hover:bg-[#A7F3D0] rounded-t transition-all duration-200 relative group"
                    style={{ height: `${convertedHeight}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-[#10B981] whitespace-nowrap font-medium">
                        {data.converted} conv
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#64748B] mt-2 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#DBEAFE] rounded"></div>
            <span className="text-xs text-[#64748B] font-medium">Leads Capturados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D1FAE5] rounded"></div>
            <span className="text-xs text-[#64748B] font-medium">Convertidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

