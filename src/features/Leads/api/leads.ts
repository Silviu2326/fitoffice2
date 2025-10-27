// API functions for Leads management

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'hot' | 'warm' | 'cold';
  score: number;
  businessType: 'personal_trainer' | 'gym';
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadDto {
  name: string;
  email: string;
  phone: string;
  source: string;
  businessType: 'personal_trainer' | 'gym';
  notes?: string;
}

export interface UpdateLeadDto {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  status?: 'hot' | 'warm' | 'cold';
  score?: number;
  notes?: string;
  assignedTo?: string;
}

// Mock data centralizado
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+34 600 123 456',
    source: 'Instagram',
    status: 'hot',
    score: 85,
    businessType: 'personal_trainer',
    notes: 'Interesado en entrenamiento personal',
    assignedTo: 'trainer@fitoffice.com',
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-01-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    phone: '+34 600 987 654',
    source: 'WhatsApp',
    status: 'warm',
    score: 65,
    businessType: 'gym',
    notes: 'Busca membresía para gimnasio',
    assignedTo: 'carlos@fitoffice.com',
    createdAt: '2025-01-22T14:30:00Z',
    updatedAt: '2025-01-22T14:30:00Z',
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    phone: '+34 600 555 888',
    source: 'Referido',
    status: 'cold',
    score: 35,
    businessType: 'personal_trainer',
    notes: 'Referido por cliente existente',
    createdAt: '2025-01-25T09:15:00Z',
    updatedAt: '2025-01-25T09:15:00Z',
  },
  {
    id: '4',
    name: 'Ana López',
    email: 'ana@example.com',
    phone: '+34 600 777 999',
    source: 'Facebook',
    status: 'hot',
    score: 90,
    businessType: 'gym',
    notes: 'Muy interesada en clases grupales',
    assignedTo: 'trainer@fitoffice.com',
    createdAt: '2025-01-18T16:45:00Z',
    updatedAt: '2025-01-18T16:45:00Z',
  },
  {
    id: '5',
    name: 'Pedro Martínez',
    email: 'pedro@example.com',
    phone: '+34 600 333 111',
    source: 'Instagram',
    status: 'warm',
    score: 70,
    businessType: 'personal_trainer',
    notes: 'Interesado en nutrición deportiva',
    createdAt: '2025-01-23T11:20:00Z',
    updatedAt: '2025-01-23T11:20:00Z',
  },
];

// Mock data para analytics
export const mockAnalyticsData = {
  sourceData: [
    { name: 'Instagram', value: 35, color: 'bg-[#EC4899]', icon: 'Instagram' },
    { name: 'WhatsApp', value: 28, color: 'bg-[#10B981]', icon: 'MessageSquare' },
    { name: 'Facebook', value: 18, color: 'bg-[#3B82F6]', icon: 'Facebook' },
    { name: 'Referidos', value: 12, color: 'bg-[#8B5CF6]', icon: 'Users' },
    { name: 'Otros', value: 7, color: 'bg-[#64748B]', icon: 'Target' },
  ],
  conversionFunnel: [
    { stage: 'Leads Capturados', count: 150, percentage: 100, color: 'bg-[#3B82F6]' },
    { stage: 'Leads Contactados', count: 120, percentage: 80, color: 'bg-[#8B5CF6]' },
    { stage: 'Leads Calificados', count: 75, percentage: 50, color: 'bg-[#F59E0B]' },
    { stage: 'En Negociación', count: 45, percentage: 30, color: 'bg-[#EAB308]' },
    { stage: 'Convertidos', count: 23, percentage: 15, color: 'bg-[#10B981]' },
  ],
  monthlyTrends: [
    { month: 'Ene', leads: 45, converted: 8 },
    { month: 'Feb', leads: 52, converted: 12 },
    { month: 'Mar', leads: 68, converted: 15 },
    { month: 'Abr', leads: 71, converted: 18 },
    { month: 'May', leads: 85, converted: 22 },
    { month: 'Jun', leads: 92, converted: 28 },
  ],
};

// Mock data para pipeline kanban
export const mockPipelineData = [
  {
    id: 'new',
    title: 'Nuevos',
    color: 'bg-[#3B82F6]',
    leads: [
      { id: '1', name: 'Juan Pérez', email: 'juan@example.com', score: 85, value: 500 },
      { id: '2', name: 'María García', email: 'maria@example.com', score: 65, value: 300 },
    ],
  },
  {
    id: 'contacted',
    title: 'Contactados',
    color: 'bg-[#8B5CF6]',
    leads: [
      { id: '3', name: 'Carlos Ruiz', email: 'carlos@example.com', score: 70, value: 400 },
    ],
  },
  {
    id: 'qualified',
    title: 'Calificados',
    color: 'bg-[#F59E0B]',
    leads: [
      { id: '4', name: 'Ana López', email: 'ana@example.com', score: 90, value: 600 },
    ],
  },
  {
    id: 'negotiation',
    title: 'Negociación',
    color: 'bg-[#EAB308]',
    leads: [],
  },
  {
    id: 'closed-won',
    title: 'Cerrados Ganados',
    color: 'bg-[#10B981]',
    leads: [],
  },
  {
    id: 'closed-lost',
    title: 'Cerrados Perdidos',
    color: 'bg-[#EF4444]',
    leads: [],
  },
];

// GET /api/leads
export const getLeads = async (): Promise<Lead[]> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads');
    // return await response.json();
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockLeads];
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

// POST /api/leads
export const createLead = async (data: CreateLeadDto): Promise<Lead> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();
    
    // Mock implementation
    const newLead: Lead = {
      id: Date.now().toString(),
      ...data,
      status: 'cold',
      score: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newLead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

// PUT /api/leads/:id
export const updateLead = async (_id: string, _data: UpdateLeadDto): Promise<Lead> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch(`/api/leads/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();
    throw new Error('Not implemented');
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
};

// DELETE /api/leads/:id
export const deleteLead = async (_id: string): Promise<void> => {
  try {
    // TODO: Implement actual API call
    // await fetch(`/api/leads/${id}`, {
    //   method: 'DELETE',
    // });
    console.log('Delete lead:', _id);
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};

// GET /api/leads/:id
export const getLeadById = async (_id: string): Promise<Lead> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch(`/api/leads/${id}`);
    // return await response.json();
    throw new Error('Not implemented');
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw error;
  }
};

// GET /api/leads/history/:id
export const getLeadHistory = async (_id: string): Promise<any[]> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch(`/api/leads/history/${id}`);
    // return await response.json();
    return [];
  } catch (error) {
    console.error('Error fetching lead history:', error);
    throw error;
  }
};

// POST /api/leads/assign
export const assignLead = async (leadId: string, userId: string): Promise<void> => {
  try {
    // TODO: Implement actual API call
    // await fetch('/api/leads/assign', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ leadId, userId }),
    // });
    console.log('Assign lead:', leadId, 'to user:', userId);
  } catch (error) {
    console.error('Error assigning lead:', error);
    throw error;
  }
};

// GET /api/leads/analytics
export const getLeadAnalytics = async () => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads/analytics');
    // return await response.json();
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAnalyticsData;
  } catch (error) {
    console.error('Error fetching lead analytics:', error);
    throw error;
  }
};

// GET /api/leads/pipeline
export const getPipelineData = async () => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads/pipeline');
    // return await response.json();
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPipelineData;
  } catch (error) {
    console.error('Error fetching pipeline data:', error);
    throw error;
  }
};

// Mock data para nurturing sequences
export const mockNurturingSequences = [
  {
    id: '1',
    name: 'Bienvenida Nuevos Leads',
    type: 'email',
    status: 'active',
    steps: 5,
    leads: 24,
    conversion: 15,
  },
  {
    id: '2',
    name: 'Seguimiento Post-Consulta',
    type: 'whatsapp',
    status: 'active',
    steps: 3,
    leads: 18,
    conversion: 8,
  },
  {
    id: '3',
    name: 'Reactivación Leads Fríos',
    type: 'mixed',
    status: 'paused',
    steps: 7,
    leads: 12,
    conversion: 3,
  },
];

// Mock data para lead assignment
export const mockSalesReps = [
  {
    id: '1',
    name: 'Carlos Martínez',
    avatar: 'CM',
    assignedLeads: 15,
    activeLeads: 8,
    converted: 12,
    conversionRate: 35,
    color: 'bg-[#3B82F6]',
  },
  {
    id: '2',
    name: 'Ana García',
    avatar: 'AG',
    assignedLeads: 12,
    activeLeads: 6,
    converted: 15,
    conversionRate: 42,
    color: 'bg-[#8B5CF6]',
  },
  {
    id: '3',
    name: 'Miguel Rodríguez',
    avatar: 'MR',
    assignedLeads: 18,
    activeLeads: 11,
    converted: 8,
    conversionRate: 28,
    color: 'bg-[#10B981]',
  },
];

// GET /api/leads/nurturing-sequences
export const getNurturingSequences = async () => {
  try {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNurturingSequences;
  } catch (error) {
    console.error('Error fetching nurturing sequences:', error);
    throw error;
  }
};

// GET /api/leads/sales-reps
export const getSalesReps = async () => {
  try {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSalesReps;
  } catch (error) {
    console.error('Error fetching sales reps:', error);
    throw error;
  }
};

