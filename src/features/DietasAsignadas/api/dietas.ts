import { supabase } from '../../../lib/supabase';

export interface Dieta {
  id: string;
  cliente_id: string;
  tipo: 'individual' | 'plan-estandar';
  objetivo: string;
  fecha_asignacion: string;
  estado: 'activa' | 'pausada' | 'finalizada';
  macros_proteinas?: number;
  macros_carbohidratos?: number;
  macros_grasas?: number;
  notas?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtiene todas las dietas asignadas
 */
export async function getDietas(): Promise<Dieta[]> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .order('fecha_asignacion', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener dietas:', error);
    throw error;
  }
}

/**
 * Obtiene las dietas de un cliente específico
 */
export async function getDietasByCliente(clienteId: string): Promise<Dieta[]> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('cliente_id', clienteId)
      .order('fecha_asignacion', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener dietas del cliente:', error);
    throw error;
  }
}

/**
 * Crea una nueva dieta
 */
export async function createDieta(dieta: Omit<Dieta, 'id' | 'created_at' | 'updated_at'>): Promise<Dieta> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .insert([dieta])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear dieta:', error);
    throw error;
  }
}

/**
 * Actualiza una dieta existente
 */
export async function updateDieta(id: string, updates: Partial<Dieta>): Promise<Dieta> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar dieta:', error);
    throw error;
  }
}

/**
 * Elimina una dieta
 */
export async function deleteDieta(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('dietas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar dieta:', error);
    throw error;
  }
}

/**
 * Ajusta los macros de una dieta individual
 */
export async function ajustarMacros(
  dietaId: string,
  macros: { proteinas: number; carbohidratos: number; grasas: number }
): Promise<Dieta> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .update({
        macros_proteinas: macros.proteinas,
        macros_carbohidratos: macros.carbohidratos,
        macros_grasas: macros.grasas,
        updated_at: new Date().toISOString()
      })
      .eq('id', dietaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al ajustar macros:', error);
    throw error;
  }
}

