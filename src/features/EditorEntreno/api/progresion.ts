import { supabase } from '../../../lib/supabase';

/**
 * API para Progresión Automática
 * Gestiona las reglas y cálculos de progresión de entrenamientos
 */

export interface ConfigProgresion {
  id?: string;
  sesion_id: string;
  ejercicio_id: string;
  tipo: 'manual' | 'lineal' | 'ondulante';
  parametros: {
    incrementoPeso?: number;
    incrementoReps?: number;
    frecuenciaSemanas?: number;
    cicloAlto?: number;
    cicloMedio?: number;
    cicloBajo?: number;
  };
  created_at?: string;
  updated_at?: string;
}

export interface HistorialProgresion {
  id?: string;
  sesion_id: string;
  ejercicio_id: string;
  fecha: string;
  peso: number;
  repeticiones: number;
  series: number;
  rpe: number;
  notas?: string;
  created_at?: string;
}

/**
 * Calcula la progresión lineal para un ejercicio
 */
export const calcularProgresionLineal = (
  pesoActual: number,
  repsActuales: number,
  rpeActual: number,
  incrementoPeso: number = 2.5,
  incrementoReps: number = 2
): { peso: number; repeticiones: number } => {
  // Si el RPE es bajo (menor a 7), incrementar repeticiones
  if (rpeActual < 7) {
    return {
      peso: pesoActual,
      repeticiones: repsActuales + incrementoReps
    };
  }
  
  // Si el RPE es alto (8 o más) y las reps son altas, incrementar peso
  if (rpeActual >= 8 && repsActuales >= 10) {
    return {
      peso: pesoActual + incrementoPeso,
      repeticiones: Math.max(8, repsActuales - 2) // Reducir reps al aumentar peso
    };
  }
  
  // Mantener valores actuales
  return {
    peso: pesoActual,
    repeticiones: repsActuales
  };
};

/**
 * Calcula la progresión ondulante basada en el ciclo
 */
export const calcularProgresionOndulante = (
  pesoBase: number,
  semanaActual: number,
  cicloSemanas: number = 4
): { intensidad: number; volumen: number } => {
  const posicionCiclo = semanaActual % cicloSemanas;
  
  switch (posicionCiclo) {
    case 0: // Semana de descarga
      return { intensidad: 0.7, volumen: 0.6 };
    case 1: // Semana ligera
      return { intensidad: 0.75, volumen: 0.8 };
    case 2: // Semana media
      return { intensidad: 0.85, volumen: 0.9 };
    case 3: // Semana pesada
      return { intensidad: 0.95, volumen: 1.0 };
    default:
      return { intensidad: 0.8, volumen: 0.8 };
  }
};

/**
 * Guarda la configuración de progresión para un ejercicio
 */
export const saveConfigProgresion = async (config: Omit<ConfigProgresion, 'id' | 'created_at' | 'updated_at'>): Promise<ConfigProgresion> => {
  try {
    const { data, error } = await supabase
      .from('config_progresion')
      .upsert(config)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al guardar configuración de progresión:', error);
    throw error;
  }
};

/**
 * Obtiene la configuración de progresión para un ejercicio
 */
export const getConfigProgresion = async (sesionId: string, ejercicioId: string): Promise<ConfigProgresion | null> => {
  try {
    const { data, error } = await supabase
      .from('config_progresion')
      .select('*')
      .eq('sesion_id', sesionId)
      .eq('ejercicio_id', ejercicioId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al obtener configuración de progresión:', error);
    throw error;
  }
};

/**
 * Registra un punto en el historial de progresión
 */
export const registrarProgresion = async (historial: Omit<HistorialProgresion, 'id' | 'created_at'>): Promise<HistorialProgresion> => {
  try {
    const { data, error } = await supabase
      .from('historial_progresion')
      .insert(historial)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al registrar progresión:', error);
    throw error;
  }
};

/**
 * Obtiene el historial de progresión de un ejercicio
 */
export const getHistorialProgresion = async (sesionId: string, ejercicioId: string, limite: number = 10): Promise<HistorialProgresion[]> => {
  try {
    const { data, error } = await supabase
      .from('historial_progresion')
      .select('*')
      .eq('sesion_id', sesionId)
      .eq('ejercicio_id', ejercicioId)
      .order('fecha', { ascending: false })
      .limit(limite);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener historial de progresión:', error);
    throw error;
  }
};

/**
 * Calcula la siguiente progresión recomendada basada en el historial
 */
export const calcularSiguienteProgresion = async (
  sesionId: string,
  ejercicioId: string,
  tipoProgresion: 'manual' | 'lineal' | 'ondulante'
): Promise<{ peso: number; repeticiones: number; series: number } | null> => {
  try {
    // Obtener último registro
    const historial = await getHistorialProgresion(sesionId, ejercicioId, 1);
    
    if (historial.length === 0) {
      return null;
    }

    const ultimo = historial[0];

    if (tipoProgresion === 'lineal') {
      const progresion = calcularProgresionLineal(
        ultimo.peso,
        ultimo.repeticiones,
        ultimo.rpe
      );
      
      return {
        peso: progresion.peso,
        repeticiones: progresion.repeticiones,
        series: ultimo.series
      };
    }

    // Para manual y ondulante, retornar los valores actuales
    return {
      peso: ultimo.peso,
      repeticiones: ultimo.repeticiones,
      series: ultimo.series
    };
  } catch (error) {
    console.error('Error al calcular siguiente progresión:', error);
    throw error;
  }
};

