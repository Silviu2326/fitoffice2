import { metricsAPI } from './metrics';
import { pipelineAPI } from './pipeline';
import { phasesAPI } from './phases';

export interface ReportData {
  type: 'general' | 'phases' | 'performance' | 'custom';
  period: '7d' | '30d' | '90d' | 'all';
  generatedAt: string;
  data: any;
}

export const reportsAPI = {
  // Generar reporte general
  generateGeneralReport: async (period: '7d' | '30d' | '90d' | 'all' = '30d'): Promise<ReportData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const metrics = await metricsAPI.getMetrics();
    const leads = await pipelineAPI.getLeads();

    return {
      type: 'general',
      period,
      generatedAt: new Date().toISOString(),
      data: {
        summary: {
          totalLeads: metrics.totalLeads,
          totalValue: metrics.totalValue,
          conversionRate: metrics.conversionRate,
          leadsWon: metrics.leadsWon,
          leadsLost: metrics.leadsLost,
          averageTime: metrics.averageTimeInPipeline,
        },
        leads: leads.map(lead => ({
          id: lead.id,
          name: lead.name,
          email: lead.email,
          value: lead.value,
          phase: lead.phaseId,
          createdAt: lead.createdAt,
          assignedTo: lead.assignedTo,
        })),
      },
    };
  },

  // Generar reporte por fases
  generatePhaseReport: async (period: '7d' | '30d' | '90d' | 'all' = '30d'): Promise<ReportData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const metrics = await metricsAPI.getMetrics();
    const phases = await phasesAPI.getPhases();

    return {
      type: 'phases',
      period,
      generatedAt: new Date().toISOString(),
      data: {
        phases: metrics.phaseMetrics.map(pm => ({
          phaseId: pm.phaseId,
          phaseName: pm.phaseName,
          leadCount: pm.leadCount,
          totalValue: pm.totalValue,
          conversionRate: pm.conversionRate,
          averageTime: pm.averageTime,
        })),
        totalPhases: phases.length,
      },
    };
  },

  // Generar reporte de rendimiento
  generatePerformanceReport: async (period: '7d' | '30d' | '90d' | 'all' = '30d'): Promise<ReportData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const metrics = await metricsAPI.getMetrics();
    const conversionRates = await metricsAPI.getConversionRates();
    const velocity = await metricsAPI.getPipelineVelocity();

    return {
      type: 'performance',
      period,
      generatedAt: new Date().toISOString(),
      data: {
        overall: {
          totalLeads: metrics.totalLeads,
          totalValue: metrics.totalValue,
          conversionRate: metrics.conversionRate,
          averageTime: metrics.averageTimeInPipeline,
        },
        conversionByPhase: conversionRates,
        velocityByPhase: velocity,
        efficiency: {
          leadsPerDay: metrics.totalLeads / 30, // Simplificado
          valuePerLead: metrics.totalLeads > 0 ? metrics.totalValue / metrics.totalLeads : 0,
        },
      },
    };
  },

  // Exportar datos a CSV
  exportToCSV: async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const leads = await pipelineAPI.getLeads();
    
    // Generar CSV
    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Valor', 'Fase', 'Fecha Creación', 'Asignado a'];
    const rows = leads.map(lead => [
      lead.id,
      lead.name,
      lead.email || '',
      lead.phone || '',
      lead.company || '',
      lead.value?.toString() || '0',
      lead.phaseId,
      new Date(lead.createdAt).toLocaleDateString('es-ES'),
      lead.assignedTo || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    return csv;
  },

  // Exportar reporte completo
  exportFullReport: async (period: '7d' | '30d' | '90d' | 'all' = '30d'): Promise<ReportData> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const generalReport = await reportsAPI.generateGeneralReport(period);
    const phaseReport = await reportsAPI.generatePhaseReport(period);
    const performanceReport = await reportsAPI.generatePerformanceReport(period);

    return {
      type: 'custom',
      period,
      generatedAt: new Date().toISOString(),
      data: {
        general: generalReport.data,
        phases: phaseReport.data,
        performance: performanceReport.data,
      },
    };
  },
};

