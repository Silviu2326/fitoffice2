import { supabase } from '../../../lib/supabase';

export interface Dieta {
  id?: string;
  nombre: string;
  objetivo: string;
  trainer_id: string;
  cliente_id?: string;
  comidas: any[];
  macros_totales: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  notas?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtiene todas las dietas del entrenador
 */
export async function obtenerDietas(trainerId: string) {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('trainer_id', trainerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener dietas:', error);
    return { data: null, error };
  }
}

/**
 * Obtiene una dieta específica por ID
 */
export async function obtenerDietaPorId(dietaId: string) {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .select('*')
      .eq('id', dietaId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener dieta:', error);
    return { data: null, error };
  }
}

/**
 * Crea una nueva dieta
 */
export async function crearDieta(dieta: Dieta) {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .insert([{
        ...dieta,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al crear dieta:', error);
    return { data: null, error };
  }
}

/**
 * Actualiza una dieta existente
 */
export async function actualizarDieta(dietaId: string, dieta: Partial<Dieta>) {
  try {
    const { data, error } = await supabase
      .from('dietas')
      .update({
        ...dieta,
        updated_at: new Date().toISOString()
      })
      .eq('id', dietaId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al actualizar dieta:', error);
    return { data: null, error };
  }
}

/**
 * Elimina una dieta
 */
export async function eliminarDieta(dietaId: string) {
  try {
    const { error } = await supabase
      .from('dietas')
      .delete()
      .eq('id', dietaId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar dieta:', error);
    return { error };
  }
}

/**
 * Asigna una dieta a un cliente
 */
export async function asignarDietaCliente(dietaId: string, clienteId: string) {
  try {
    const { data, error } = await supabase
      .from('dietas_asignadas')
      .insert([{
        dieta_id: dietaId,
        cliente_id: clienteId,
        fecha_inicio: new Date().toISOString(),
        activa: true
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al asignar dieta:', error);
    return { data: null, error };
  }
}

/**
 * Valida los macros de una dieta
 */
export function validarMacrosDieta(
  macrosActuales: { calorias: number; proteinas: number; carbohidratos: number; grasas: number },
  macrosObjetivo: { calorias: number; proteinas: number; carbohidratos: number; grasas: number }
) {
  const validaciones = [];

  // Validar calorías (±10%)
  const difCalorias = Math.abs(macrosActuales.calorias - macrosObjetivo.calorias);
  const porcentajeCalorias = (difCalorias / macrosObjetivo.calorias) * 100;
  validaciones.push({
    campo: 'calorias',
    valido: porcentajeCalorias <= 10,
    porcentaje: porcentajeCalorias
  });

  // Validar proteínas (±15%)
  const difProteinas = Math.abs(macrosActuales.proteinas - macrosObjetivo.proteinas);
  const porcentajeProteinas = (difProteinas / macrosObjetivo.proteinas) * 100;
  validaciones.push({
    campo: 'proteinas',
    valido: porcentajeProteinas <= 15,
    porcentaje: porcentajeProteinas
  });

  // Validar carbohidratos (±15%)
  const difCarbohidratos = Math.abs(macrosActuales.carbohidratos - macrosObjetivo.carbohidratos);
  const porcentajeCarbohidratos = (difCarbohidratos / macrosObjetivo.carbohidratos) * 100;
  validaciones.push({
    campo: 'carbohidratos',
    valido: porcentajeCarbohidratos <= 15,
    porcentaje: porcentajeCarbohidratos
  });

  // Validar grasas (±15%)
  const difGrasas = Math.abs(macrosActuales.grasas - macrosObjetivo.grasas);
  const porcentajeGrasas = (difGrasas / macrosObjetivo.grasas) * 100;
  validaciones.push({
    campo: 'grasas',
    valido: porcentajeGrasas <= 15,
    porcentaje: porcentajeGrasas
  });

  const todasValidas = validaciones.every(v => v.valido);

  return {
    valido: todasValidas,
    validaciones
  };
}

