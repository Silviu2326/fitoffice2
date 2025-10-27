// API endpoints para automatización de outreach

export interface OutreachSequence {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused';
  steps: OutreachStep[];
  contacts: number;
  conversions: number;
  createdAt: string;
  updatedAt: string;
}

export interface OutreachStep {
  id: string;
  sequenceId: string;
  order: number;
  type: 'email' | 'whatsapp' | 'sms' | 'wait';
  delay: number; // En horas
  content: {
    subject?: string;
    body: string;
    cta?: string;
  };
  conditions?: {
    field: string;
    operator: string;
    value: any;
  }[];
}

export interface ContactSequence {
  id: string;
  contactId: string;
  sequenceId: string;
  currentStep: number;
  status: 'active' | 'completed' | 'stopped';
  startedAt: string;
  completedAt?: string;
}

/**
 * Obtener todas las secuencias de outreach
 */
export async function getOutreachSequences(): Promise<OutreachSequence[]> {
  // TODO: Implementar llamada real a la API
  // const response = await fetch('/api/campaigns/outreach');
  // return response.json();
  
  return Promise.resolve([
    {
      id: '1',
      name: 'Bienvenida Nuevos Leads',
      trigger: 'Lead creado',
      status: 'active',
      steps: [
        {
          id: '1',
          sequenceId: '1',
          order: 1,
          type: 'email',
          delay: 0,
          content: {
            subject: 'Bienvenido a nuestro gym',
            body: 'Hola {{nombre}}, gracias por tu interés...',
            cta: 'Agenda tu sesión'
          }
        }
      ],
      contacts: 234,
      conversions: 45,
      createdAt: '2025-10-01T10:00:00Z',
      updatedAt: '2025-10-25T10:00:00Z'
    }
  ]);
}

/**
 * Obtener una secuencia por ID
 */
export async function getOutreachSequenceById(id: string): Promise<OutreachSequence | null> {
  // TODO: Implementar llamada real a la API
  const sequences = await getOutreachSequences();
  return sequences.find(s => s.id === id) || null;
}

/**
 * Crear una nueva secuencia de outreach
 */
export async function createOutreachSequence(
  data: Omit<OutreachSequence, 'id' | 'createdAt' | 'updatedAt'>
): Promise<OutreachSequence> {
  // TODO: Implementar llamada real a la API
  return Promise.resolve({
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

/**
 * Actualizar una secuencia existente
 */
export async function updateOutreachSequence(
  id: string,
  data: Partial<OutreachSequence>
): Promise<OutreachSequence> {
  // TODO: Implementar llamada real a la API
  const sequence = await getOutreachSequenceById(id);
  if (!sequence) throw new Error('Sequence not found');
  
  return Promise.resolve({
    ...sequence,
    ...data,
    updatedAt: new Date().toISOString()
  });
}

/**
 * Eliminar una secuencia
 */
export async function deleteOutreachSequence(id: string): Promise<void> {
  // TODO: Implementar llamada real a la API
  return Promise.resolve();
}

/**
 * Activar/Pausar una secuencia
 */
export async function toggleSequenceStatus(
  id: string,
  status: 'active' | 'paused'
): Promise<OutreachSequence> {
  // TODO: Implementar llamada real a la API
  return updateOutreachSequence(id, { status });
}

/**
 * Añadir un contacto a una secuencia
 */
export async function addContactToSequence(
  contactId: string,
  sequenceId: string
): Promise<ContactSequence> {
  // TODO: Implementar llamada real a la API
  return Promise.resolve({
    id: Math.random().toString(36).substr(2, 9),
    contactId,
    sequenceId,
    currentStep: 0,
    status: 'active',
    startedAt: new Date().toISOString()
  });
}

/**
 * Remover un contacto de una secuencia
 */
export async function removeContactFromSequence(
  contactId: string,
  sequenceId: string
): Promise<void> {
  // TODO: Implementar llamada real a la API
  return Promise.resolve();
}

