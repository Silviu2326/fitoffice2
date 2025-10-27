import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, X } from 'lucide-react';
import { PipelineMetrics } from '../types';

interface PipelineReportsProps {
  metrics: PipelineMetrics;
  onClose: () => void;
}

export default function PipelineReports({ metrics, onClose }: PipelineReportsProps) {
  const [reportType, setReportType] = useState<'general' | 'phases' | 'performance'>('general');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const generateReport = () => {
    // Lógica para generar el reporte
    alert('Generando reporte... (funcionalidad a implementar)');
  };

  const exportToCSV = () => {
    // Lógica para exportar a CSV
    alert('Exportando a CSV... (funcionalidad a implementar)');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#3B82F6]" />
            <h2 className="text-2xl font-bold text-[#0F172A]">Reportes del Pipeline</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-[#64748B] mb-2 font-medium">Tipo de Reporte</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              >
                <option value="general">Reporte General</option>
                <option value="phases">Análisis por Fases</option>
                <option value="performance">Rendimiento de Ventas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2 font-medium">Período</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="all">Todo el período</option>
              </select>
            </div>
          </div>

          {reportType === 'general' && (
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                Resumen General del Pipeline
              </h3>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-[#64748B] mb-1 font-medium">Total de Leads</div>
                  <div className="text-3xl font-bold text-[#0F172A]">{metrics.totalLeads}</div>
                </div>
                <div>
                  <div className="text-sm text-[#64748B] mb-1 font-medium">Valor Total</div>
                  <div className="text-3xl font-bold text-[#10B981]">
                    €{metrics.totalValue.toLocaleString('es-ES')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#64748B] mb-1 font-medium">Tasa de Conversión</div>
                  <div className="text-3xl font-bold text-[#6366F1]">
                    {metrics.conversionRate.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-[#64748B] mb-1 font-medium">Leads Ganados</div>
                    <div className="text-2xl font-bold text-[#10B981]">{metrics.leadsWon}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#64748B] mb-1 font-medium">Leads Perdidos</div>
                    <div className="text-2xl font-bold text-[#EF4444]">{metrics.leadsLost}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reportType === 'phases' && (
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Análisis por Fases</h3>

              <div className="space-y-4">
                {metrics.phaseMetrics.map((phase) => (
                  <div key={phase.phaseId} className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-[#0F172A]">{phase.phaseName}</h4>
                      <span className="text-sm text-[#64748B] font-medium">
                        {phase.leadCount} leads
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-[#64748B] font-medium">Valor Total</div>
                        <div className="text-[#10B981] font-semibold">
                          €{phase.totalValue.toLocaleString('es-ES')}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#64748B] font-medium">Conversión</div>
                        <div className="text-[#0F172A] font-semibold">
                          {phase.conversionRate.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[#64748B] font-medium">Tiempo Promedio</div>
                        <div className="text-[#0F172A] font-semibold">
                          {phase.averageTime} días
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reportType === 'performance' && (
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Rendimiento de Ventas</h3>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-[#64748B] mb-2 font-medium">Tiempo Promedio en Pipeline</div>
                  <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                    <div className="text-3xl font-bold text-[#0F172A]">
                      {metrics.averageTimeInPipeline} días
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#64748B] mb-2 font-medium">Eficiencia de Conversión</div>
                  <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold text-[#0F172A]">
                        {metrics.conversionRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-[#64748B]">
                        ({metrics.leadsWon} de {metrics.totalLeads} leads)
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#64748B] mb-2 font-medium">Valor Promedio por Lead</div>
                  <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                    <div className="text-3xl font-bold text-[#10B981]">
                      €{metrics.totalLeads > 0 
                        ? (metrics.totalValue / metrics.totalLeads).toFixed(0)
                        : 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#E2E8F0] flex justify-between">
          <button
            onClick={exportToCSV}
            className="px-6 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg flex items-center gap-2 transition-all duration-200 font-semibold"
          >
            <Download className="w-5 h-5" />
            Exportar CSV
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg transition-all duration-200 font-semibold"
            >
              Cerrar
            </button>
            <button
              onClick={generateReport}
              className="px-6 py-2 bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
            >
              <FileText className="w-5 h-5" />
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

