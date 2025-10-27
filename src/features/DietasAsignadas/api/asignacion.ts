import { supabase } from '../../../lib/supabase';
import { Dieta } from './dietas';

export interface AsignacionDieta {
  cliente_id: string;
  tipo: 'individual' | 'plan-estandar';
  objetivo: string;
  macros?: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  plan_id?: string;
  duracion_semanas?: number;
  notas?: string;
}

/**
 * Asigna una dieta individual a un cliente
 */
export async function asignarDietaIndividual(asignacion: AsignacionDieta): Promise<Dieta> {
  try {
    const dietaData = {
      cliente_id: asignacion.cliente_id,
      tipo: 'individual' as const,
      objetivo: asignacion.objetivo,
      fecha_asignacion: new Date().toISOString(),
      estado: 'activa' as const,
      macros_proteinas: asignacion.macros?.proteinas,
      macros_carbohidratos: asignacion.macros?.carbohidratos,
      macros_grasas: asignacion.macros?.grasas,
      notas: asignacion.notas
    };

    const { data, error } = await supabase
      .from('dietas')
      .insert([dietaData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al asignar dieta individual:', error);
    throw error;
  }
}

/**
 * Asigna un plan estándar a un cliente
 */
export async function asignarPlanEstandar(asignacion: AsignacionDieta): Promise<Dieta> {
  try {
    // Obtener información del plan
    const { data: plan, error: planError } = await supabase
      .from('planes_nutricion')
      .select('*')
      .eq('id', asignacion.plan_id)
      .single();

    if (planError) throw planError;

    const dietaData = {
      cliente_id: asignacion.cliente_id,
      tipo: 'plan-estandar' as const,
      objetivo: asignacion.objetivo,
      fecha_asignacion: new Date().toISOString(),
      estado: 'activa' as const,
      plan_id: asignacion.plan_id,
      macros_proteinas: plan.macros_proteinas,
      macros_carbohidratos: plan.macros_carbohidratos,
      macros_grasas: plan.macros_grasas,
      notas: asignacion.notas
    };

    const { data, error } = await supabase
      .from('dietas')
      .insert([dietaData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al asignar plan estándar:', error);
    throw error;
  }
}

/**
 * Reasigna una dieta a un cliente (cambia de dieta)
 */
export async function reasignarDieta(dietaActualId: string, nuevaAsignacion: AsignacionDieta): Promise<Dieta> {
  try {
    // Finalizar dieta actual
    await supabase
      .from('dietas')
      .update({ estado: 'finalizada' })
      .eq('id', dietaActualId);

    // Asignar nueva dieta según el tipo
    if (nuevaAsignacion.tipo === 'individual') {
      return await asignarDietaIndividual(nuevaAsignacion);
    } else {
      return await asignarPlanEstandar(nuevaAsignacion);
    }
  } catch (error) {
    console.error('Error al reasignar dieta:', error);
    throw error;
  }
}

/**
 * Pausa una dieta activa
 */
export async function pausarDieta(dietaId: string): Promise<Dieta> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .update({ estado: 'pausada' })
      .eq('id', dietaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al pausar dieta:', error);
    throw error;
  }
}

/**
 * Reactiva una dieta pausada
 */
export async function reactivarDieta(dietaId: string): Promise<Dieta> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .update({ estado: 'activa' })
      .eq('id', dietaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al reactivar dieta:', error);
    throw error;
  }
}

/**
 * Finaliza una dieta
 */
export async function finalizarDieta(dietaId: string): Promise<Dieta> {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .update({ estado: 'finalizada' })
      .eq('id', dietaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al finalizar dieta:', error);
    throw error;
  }
}

