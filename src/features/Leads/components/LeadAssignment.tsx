import { useState, useEffect } from 'react';
import { Users, UserPlus, TrendingUp, Award } from 'lucide-react';
import { getSalesReps } from '../api/leads';

export default function LeadAssignment() {
  const [salesReps, setSalesReps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSalesReps();
  }, []);

  const loadSalesReps = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSalesReps();
      setSalesReps(data);
    } catch (err) {
      setError('Error al cargar los representantes de ventas');
      console.error('Error loading sales reps:', err);
    } finally {
      setLoading(false);
    }
  };

  const unassignedLeads = [
    { id: '1', name: 'Pedro Sánchez', source: 'Instagram', score: 85 },
    { id: '2', name: 'Carmen López', source: 'WhatsApp', score: 72 },
    { id: '3', name: 'David Ruiz', source: 'Referido', score: 68 },
  ];

  const getConversionColor = (rate: number) => {
    if (rate >= 40) return 'text-[#10B981]';
    if (rate >= 30) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
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
            <Users className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error al cargar vendedores</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <button 
          onClick={loadSalesReps}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Asignación de Leads</h2>
        <p className="text-[#64748B] mt-1">
          Distribuye leads entre tu equipo comercial
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#DBEAFE] rounded-lg">
              <Users className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Vendedores</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{salesReps.length}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#FEF3C7] rounded-lg">
              <UserPlus className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Sin Asignar</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{unassignedLeads.length}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#D1FAE5] rounded-lg">
              <Award className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Total Convertidos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {salesReps.reduce((sum, rep) => sum + rep.converted, 0)}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#EDE9FE] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Tasa Promedio</span>
          </div>
          <p className="text-3xl font-bold text-[#10B981]">
            {Math.round(
              salesReps.reduce((sum, rep) => sum + rep.conversionRate, 0) / salesReps.length
            )}
            %
          </p>
        </div>
      </div>

      {/* Sales Team */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Equipo Comercial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {salesReps.map((rep) => (
            <div
              key={rep.id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${rep.color} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {rep.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-[#0F172A] font-semibold mb-3">{rep.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#64748B] text-xs mb-1">Leads Asignados</p>
                      <p className="text-[#0F172A] font-semibold">{rep.assignedLeads}</p>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-xs mb-1">Leads Activos</p>
                      <p className="text-[#0F172A] font-semibold">{rep.activeLeads}</p>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-xs mb-1">Convertidos</p>
                      <p className="text-[#10B981] font-semibold">{rep.converted}</p>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-xs mb-1">Tasa Conv.</p>
                      <p className={`font-semibold ${getConversionColor(rep.conversionRate)}`}>
                        {rep.conversionRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#6366F1] rounded-lg transition-all duration-200 text-sm font-semibold">
                Asignar Leads
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Unassigned Leads */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Leads Sin Asignar ({unassignedLeads.length})
          </h3>
          <button className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-semibold transition-colors duration-200">
            Asignación Automática
          </button>
        </div>

        <div className="space-y-3">
          {unassignedLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg hover:border-[#6366F1] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#64748B] font-semibold text-sm">
                  {lead.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h4 className="text-[#0F172A] font-semibold">{lead.name}</h4>
                  <p className="text-[#64748B] text-xs">{lead.source}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[#10B981] font-bold">{lead.score}</p>
                  <p className="text-[#94A3B8] text-xs">score</p>
                </div>
                <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg active:scale-[0.98] transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg">
                  Asignar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Rules */}
      <div className="bg-gradient-to-r from-[#EEF2FF] to-[#EDE9FE] border border-[#6366F1] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Reglas de Asignación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
            <h4 className="text-[#0F172A] font-semibold mb-2">Round Robin</h4>
            <p className="text-[#64748B] text-sm">Distribución equitativa automática</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
            <h4 className="text-[#0F172A] font-semibold mb-2">Por Score</h4>
            <p className="text-[#64748B] text-sm">Leads calientes a top performers</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
            <h4 className="text-[#0F172A] font-semibold mb-2">Por Origen</h4>
            <p className="text-[#64748B] text-sm">Asignación según canal de captación</p>
          </div>
        </div>
      </div>
    </div>
  );
}

