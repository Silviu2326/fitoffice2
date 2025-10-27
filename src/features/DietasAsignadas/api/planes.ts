import { supabase } from '../../../lib/supabase';

export interface PlanNutricion {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'perdida-grasa' | 'ganancia-muscular' | 'mantenimiento';
  nivel: number;
  macros_proteinas?: number;
  macros_carbohidratos?: number;
  macros_grasas?: number;
  calorias_objetivo?: number;
  duracion_semanas?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtiene todos los planes nutricionales
 */
export async function getPlanes(): Promise<PlanNutricion[]> {
  try {
    const { data, error } = await supabase
      .from('planes_nutricion')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener planes:', error);
    throw error;
  }
}

/**
 * Obtiene los planes por tipo
 */
export async function getPlanesByTipo(tipo: string): Promise<PlanNutricion[]> {
  try {
    const { data, error } = await supabase
      .from('planes_nutricion')
      .select('*')
      .eq('tipo', tipo)
      .order('nivel', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener planes por tipo:', error);
    throw error;
  }
}

/**
 * Crea un nuevo plan nutricional
 */
export async function createPlan(plan: Omit<PlanNutricion, 'id' | 'created_at' | 'updated_at'>): Promise<PlanNutricion> {
  try {
    const { data, error } = await supabase
      .from('planes_nutricion')
      .insert([plan])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear plan:', error);
    throw error;
  }
}

/**
 * Actualiza un plan nutricional
 */
export async function updatePlan(id: string, updates: Partial<PlanNutricion>): Promise<PlanNutricion> {
  try {
    const { data, error } = await supabase
      .from('planes_nutricion')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar plan:', error);
    throw error;
  }
}

/**
 * Elimina un plan nutricional
 */
export async function deletePlan(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('planes_nutricion')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar plan:', error);
    throw error;
  }
}

/**
 * Duplica un plan nutricional
 */
export async function duplicarPlan(planId: string): Promise<PlanNutricion> {
  try {
    // Obtener el plan original
    const { data: planOriginal, error: getError } = await supabase
      .from('planes_nutricion')
      .select('*')
      .eq('id', planId)
      .single();

    if (getError) throw getError;

    // Crear copia del plan
    const { id, created_at, updated_at, ...planData } = planOriginal;
    const planCopia = {
      ...planData,
      nombre: `${planOriginal.nombre} (Copia)`
    };

    const { data, error } = await supabase
      .from('planes_nutricion')
      .insert([planCopia])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al duplicar plan:', error);
    throw error;
  }
}

