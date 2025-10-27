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

// GET /api/leads
export const getLeads = async (): Promise<Lead[]> => {
  try {
    // TODO: Implement actual API call
    // const response = await fetch('/api/leads');
    // return await response.json();
    return [];
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
export const updateLead = async (id: string, data: UpdateLeadDto): Promise<Lead> => {
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
export const deleteLead = async (id: string): Promise<void> => {
  try {
    // TODO: Implement actual API call
    // await fetch(`/api/leads/${id}`, {
    //   method: 'DELETE',
    // });
    console.log('Delete lead:', id);
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};

// GET /api/leads/:id
export const getLeadById = async (id: string): Promise<Lead> => {
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
export const getLeadHistory = async (id: string): Promise<any[]> => {
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

