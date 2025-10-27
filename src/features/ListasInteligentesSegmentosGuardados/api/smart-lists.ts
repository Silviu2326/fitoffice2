import { supabase } from '../../../lib/supabase';

export interface SmartList {
  id: string;
  name: string;
  criteria: string;
  auto_update: boolean;
  count: number;
  last_updated: string;
  created_at: string;
}

export interface CreateSmartListData {
  name: string;
  criteria: string;
  auto_update?: boolean;
}

/**
 * Obtiene todas las listas inteligentes
 */
export async function getSmartLists() {
  const { data, error } = await supabase
    .from('smart_lists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching smart lists:', error);
    throw error;
  }

  return data;
}

/**
 * Crea una nueva lista inteligente
 */
export async function createSmartList(listData: CreateSmartListData) {
  const { data, error } = await supabase
    .from('smart_lists')
    .insert([{
      ...listData,
      auto_update: listData.auto_update ?? true,
      count: 0,
      last_updated: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating smart list:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza una lista inteligente
 */
export async function updateSmartList(id: string, updates: Partial<CreateSmartListData>) {
  const { data, error } = await supabase
    .from('smart_lists')
    .update({ ...updates, last_updated: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating smart list:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina una lista inteligente
 */
export async function deleteSmartList(id: string) {
  const { error } = await supabase
    .from('smart_lists')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting smart list:', error);
    throw error;
  }

  return true;
}

/**
 * Refresca una lista inteligente (recalcula miembros)
 */
export async function refreshSmartList(id: string) {
  // En una implementación real, esto ejecutaría las reglas de la lista
  // y actualizaría los miembros que coinciden
  const count = Math.floor(Math.random() * 100); // Simulación
  
  const { data, error } = await supabase
    .from('smart_lists')
    .update({ count, last_updated: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error refreshing smart list:', error);
    throw error;
  }

  return data;
}

