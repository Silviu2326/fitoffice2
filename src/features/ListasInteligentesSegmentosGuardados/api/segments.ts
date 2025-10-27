import { supabase } from '../../../lib/supabase';

export interface Segment {
  id: string;
  name: string;
  criteria: string;
  count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSegmentData {
  name: string;
  criteria: string;
}

/**
 * Obtiene todos los segmentos
 */
export async function getSegments() {
  const { data, error } = await supabase
    .from('segments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching segments:', error);
    throw error;
  }

  return data;
}

/**
 * Crea un nuevo segmento
 */
export async function createSegment(segmentData: CreateSegmentData) {
  const { data, error } = await supabase
    .from('segments')
    .insert([segmentData])
    .select()
    .single();

  if (error) {
    console.error('Error creating segment:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza un segmento existente
 */
export async function updateSegment(id: string, updates: Partial<CreateSegmentData>) {
  const { data, error } = await supabase
    .from('segments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating segment:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina un segmento
 */
export async function deleteSegment(id: string) {
  const { error } = await supabase
    .from('segments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting segment:', error);
    throw error;
  }

  return true;
}

/**
 * Analiza y actualiza el conteo de clientes en un segmento
 */
export async function analyzeSegment(id: string) {
  // En una implementación real, esto ejecutaría las reglas de segmentación
  // y actualizaría el conteo de clientes que coinciden
  const count = Math.floor(Math.random() * 100); // Simulación
  
  const { data, error } = await supabase
    .from('segments')
    .update({ count, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error analyzing segment:', error);
    throw error;
  }

  return data;
}

