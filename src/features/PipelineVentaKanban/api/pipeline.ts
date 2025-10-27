import { Lead } from '../types';

// Mock data para desarrollo
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 612 345 678',
    company: 'Fitness Club',
    value: 1200,
    phaseId: 'contactado',
    phaseEntryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Gimnasio', 'Premium'],
    assignedTo: 'María García',
    source: 'Web',
  },
  {
    id: '2',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+34 623 456 789',
    value: 800,
    phaseId: 'enviado-precio',
    phaseEntryDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Entrenamiento Personal'],
    assignedTo: 'Carlos López',
    source: 'Referido',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos.r@email.com',
    phone: '+34 634 567 890',
    company: 'Tech Gym',
    value: 2500,
    phaseId: 'llamada',
    phaseEntryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Gimnasio', 'Corporate'],
    assignedTo: 'María García',
    source: 'LinkedIn',
  },
  {
    id: '4',
    name: 'Laura Sánchez',
    email: 'laura.s@email.com',
    phone: '+34 645 678 901',
    value: 1500,
    phaseId: 'enviado-precio',
    phaseEntryDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Nutrición', 'Entrenamiento'],
    assignedTo: 'Carlos López',
    source: 'Instagram',
  },
  {
    id: '5',
    name: 'Miguel Torres',
    email: 'miguel.t@email.com',
    phone: '+34 656 789 012',
    company: 'Wellness Center',
    value: 3000,
    phaseId: 'contactado',
    phaseEntryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Gimnasio', 'VIP'],
    assignedTo: 'María García',
    source: 'Google Ads',
  },
];

export const pipelineAPI = {
  // Obtener todos los leads del pipeline
  getLeads: async (): Promise<Lead[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLeads;
  },

  // Crear un nuevo lead
  createLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'phaseEntryDate'>): Promise<Lead> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      phaseEntryDate: new Date().toISOString(),
    };
    mockLeads.push(newLead);
    return newLead;
  },

  // Actualizar un lead
  updateLead: async (id: string, updates: Partial<Lead>): Promise<Lead> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockLeads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lead no encontrado');
    
    mockLeads[index] = { ...mockLeads[index], ...updates };
    return mockLeads[index];
  },

  // Mover un lead a otra fase
  moveLead: async (leadId: string, newPhaseId: string): Promise<Lead> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockLeads.findIndex(l => l.id === leadId);
    if (index === -1) throw new Error('Lead no encontrado');
    
    mockLeads[index] = {
      ...mockLeads[index],
      phaseId: newPhaseId,
      phaseEntryDate: new Date().toISOString(),
    };
    return mockLeads[index];
  },

  // Eliminar un lead
  deleteLead: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockLeads.findIndex(l => l.id === id);
    if (index !== -1) {
      mockLeads.splice(index, 1);
    }
  },

  // Obtener un lead por ID
  getLeadById: async (id: string): Promise<Lead | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLeads.find(l => l.id === id) || null;
  },
};

