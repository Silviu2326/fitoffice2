import { PipelineMetrics, PhaseMetric } from '../types';
import { pipelineAPI } from './pipeline';
import { phasesAPI } from './phases';

export const metricsAPI = {
  // Obtener métricas generales del pipeline
  getMetrics: async (): Promise<PipelineMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const leads = await pipelineAPI.getLeads();
    const phases = await phasesAPI.getPhases();

    const totalLeads = leads.length;
    const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
    
    // Calcular leads ganados y perdidos (simplificado)
    const leadsWon = leads.filter(l => l.phaseId === 'cerrado' || l.phaseId === 'alta-cerrada').length;
    const leadsLost = 0; // En un sistema real, habría un estado para leads perdidos
    
    const conversionRate = totalLeads > 0 ? (leadsWon / totalLeads) * 100 : 0;
    
    // Calcular tiempo promedio en pipeline
    const now = new Date();
    const totalTime = leads.reduce((sum, lead) => {
      const createdDate = new Date(lead.createdAt);
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return sum + diffDays;
    }, 0);
    const averageTimeInPipeline = totalLeads > 0 ? Math.round(totalTime / totalLeads) : 0;

    // Calcular métricas por fase
    const phaseMetrics: PhaseMetric[] = phases.map(phase => {
      const phaseLeads = leads.filter(l => l.phaseId === phase.id);
      const leadCount = phaseLeads.length;
      const phaseValue = phaseLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
      
      // Calcular conversión de esta fase (simplificado)
      const phaseConversion = leadCount > 0 ? (leadCount / totalLeads) * 100 : 0;
      
      // Calcular tiempo promedio en esta fase
      const phaseTotalTime = phaseLeads.reduce((sum, lead) => {
        const entryDate = new Date(lead.phaseEntryDate);
        const diffTime = Math.abs(now.getTime() - entryDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);
      const averageTime = leadCount > 0 ? Math.round(phaseTotalTime / leadCount) : 0;

      return {
        phaseId: phase.id,
        phaseName: phase.name,
        leadCount,
        totalValue: phaseValue,
        conversionRate: phaseConversion,
        averageTime,
      };
    });

    return {
      totalLeads,
      totalValue,
      conversionRate,
      averageTimeInPipeline,
      leadsWon,
      leadsLost,
      phaseMetrics,
    };
  },

  // Obtener métricas por período
  getMetricsByPeriod: async (startDate: Date, endDate: Date): Promise<PipelineMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En producción, filtrar por fechas
    return metricsAPI.getMetrics();
  },

  // Obtener métricas por vendedor
  getMetricsByAssignee: async (assignee: string): Promise<PipelineMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En producción, filtrar por vendedor asignado
    return metricsAPI.getMetrics();
  },

  // Obtener tasa de conversión por fase
  getConversionRates: async (): Promise<{ phaseId: string; phaseName: string; rate: number }[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const metrics = await metricsAPI.getMetrics();
    return metrics.phaseMetrics.map(pm => ({
      phaseId: pm.phaseId,
      phaseName: pm.phaseName,
      rate: pm.conversionRate,
    }));
  },

  // Obtener velocidad del pipeline (tiempo promedio por fase)
  getPipelineVelocity: async (): Promise<{ phaseId: string; phaseName: string; avgDays: number }[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const metrics = await metricsAPI.getMetrics();
    return metrics.phaseMetrics.map(pm => ({
      phaseId: pm.phaseId,
      phaseName: pm.phaseName,
      avgDays: pm.averageTime,
    }));
  },
};

