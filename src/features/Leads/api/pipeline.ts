// API functions for Pipeline management

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  leads: string[]; // Lead IDs
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  createdAt: string;
  updatedAt: string;
}

// GET /api/leads/pipeline
export const getPipeline = async (): Promise<Pipeline> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads/pipeline');
    // return await response.json();
    
    // Mock implementation
    return {
      id: '1',
      name: 'Pipeline Principal',
      stages: [
        { id: 'new', name: 'Nuevos', order: 1, leads: [] },
        { id: 'contacted', name: 'Contactados', order: 2, leads: [] },
        { id: 'qualified', name: 'Calificados', order: 3, leads: [] },
        { id: 'negotiation', name: 'Negociación', order: 4, leads: [] },
        { id: 'won', name: 'Ganados', order: 5, leads: [] },
        { id: 'lost', name: 'Perdidos', order: 6, leads: [] },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    throw error;
  }
};

// POST /api/leads/pipeline/move
export const moveLeadInPipeline = async (
  leadId: string,
  fromStage: string,
  toStage: string
): Promise<void> => {
  try {
    // TODO: Implement actual API call
    // await fetch('/api/leads/pipeline/move', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ leadId, fromStage, toStage }),
    // });
    console.log('Move lead:', leadId, 'from', fromStage, 'to', toStage);
  } catch (error) {
    console.error('Error moving lead in pipeline:', error);
    throw error;
  }
};

// GET /api/leads/pipeline/stats
export const getPipelineStats = async (): Promise<any> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads/pipeline/stats');
    // return await response.json();
    
    return {
      totalValue: 0,
      activeLeads: 0,
      conversionRate: 0,
      averageValue: 0,
    };
  } catch (error) {
    console.error('Error fetching pipeline stats:', error);
    throw error;
  }
};

