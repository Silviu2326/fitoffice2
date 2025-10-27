export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  value?: number;
  phaseId: string;
  phaseEntryDate: string;
  createdAt: string;
  tags?: string[];
  assignedTo?: string;
  notes?: string;
  source?: string;
}

export interface Phase {
  id: string;
  name: string;
  order: number;
  color: string;
  description?: string;
}

export interface PipelineMetrics {
  totalLeads: number;
  totalValue: number;
  conversionRate: number;
  averageTimeInPipeline: number;
  leadsWon: number;
  leadsLost: number;
  phaseMetrics: PhaseMetric[];
}

export interface PhaseMetric {
  phaseId: string;
  phaseName: string;
  leadCount: number;
  totalValue: number;
  conversionRate: number;
  averageTime: number;
}

export interface BusinessType {
  id: string;
  name: string;
  defaultPhases: Phase[];
}

