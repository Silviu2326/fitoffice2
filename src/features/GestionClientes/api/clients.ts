import { supabase } from '../../../lib/supabase';

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'riesgo' | 'perdido';
  planActual: string;
  fechaInicio: string;
  ultimaActividad: string;
  adherencia: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtiene todos los clientes
 */
export async function getClientes(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error fetching clientes:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un cliente por ID
 */
export async function getClienteById(id: string): Promise<Cliente | null> {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching cliente:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene clientes activos
 */
export async function getClientesActivos(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error fetching clientes activos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene clientes en riesgo
 */
export async function getClientesRiesgo(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('estado', 'riesgo')
    .order('adherencia', { ascending: true });

  if (error) {
    console.error('Error fetching clientes en riesgo:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene clientes perdidos
 */
export async function getClientesPerdidos(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('estado', 'perdido')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching clientes perdidos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Crea un nuevo cliente
 */
export async function createCliente(cliente: Omit<Cliente, 'id' | 'created_at' | 'updated_at'>): Promise<Cliente> {
  const { data, error } = await supabase
    .from('clientes')
    .insert([cliente])
    .select()
    .single();

  if (error) {
    console.error('Error creating cliente:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza un cliente
 */
export async function updateCliente(id: string, updates: Partial<Cliente>): Promise<Cliente> {
  const { data, error } = await supabase
    .from('clientes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating cliente:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina un cliente
 */
export async function deleteCliente(id: string): Promise<void> {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting cliente:', error);
    throw error;
  }
}

/**
 * Obtiene el perfil 360º de un cliente
 */
export async function getClienteProfile360(id: string): Promise<any> {
  // Obtener datos del cliente
  const cliente = await getClienteById(id);
  
  // Aquí se combinarían datos de múltiples tablas:
  // - Historial de planes
  // - Documentos y consentimientos
  // - Información de facturación
  // - Notas y observaciones
  // - Historial de sesiones
  // - Métricas de progreso
  
  return {
    cliente,
    // TODO: Implementar relaciones con otras tablas
    historialPlanes: [],
    documentos: [],
    facturacion: {},
    notas: [],
    metricas: {}
  };
}

