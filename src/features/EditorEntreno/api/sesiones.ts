import { supabase } from '../../../lib/supabase';

/**
 * API para Sesiones de Entrenamiento
 * Gestiona las operaciones CRUD de sesiones
 */

export interface SesionEntrenamiento {
  id?: string;
  user_id: string;
  nombre: string;
  duracion: number;
  objetivo: string;
  tipo: 'fuerza' | 'hipertrofia' | 'resistencia' | 'funcional' | 'cardio' | 'hiit' | 'movilidad';
  ejercicios: any[];
  modo_asignacion?: 'individual' | 'grupal';
  asignaciones?: any[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtiene todas las sesiones del usuario
 */
export const getSesiones = async (userId: string): Promise<SesionEntrenamiento[]> => {
  try {
    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener sesiones:', error);
    throw error;
  }
};

/**
 * Obtiene una sesión específica por ID
 */
export const getSesionById = async (id: string): Promise<SesionEntrenamiento | null> => {
  try {
    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener sesión:', error);
    throw error;
  }
};

/**
 * Crea una nueva sesión
 */
export const createSesion = async (sesion: Omit<SesionEntrenamiento, 'id' | 'created_at' | 'updated_at'>): Promise<SesionEntrenamiento> => {
  try {
    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .insert(sesion)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear sesión:', error);
    throw error;
  }
};

/**
 * Actualiza una sesión existente
 */
export const updateSesion = async (id: string, updates: Partial<SesionEntrenamiento>): Promise<SesionEntrenamiento> => {
  try {
    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar sesión:', error);
    throw error;
  }
};

/**
 * Elimina una sesión
 */
export const deleteSesion = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('sesiones_entrenamiento')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar sesión:', error);
    throw error;
  }
};

/**
 * Obtiene sesiones asignadas a un cliente específico
 */
export const getSesionesPorCliente = async (clienteId: string): Promise<SesionEntrenamiento[]> => {
  try {
    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .select('*')
      .contains('asignaciones', [{ tipo: 'cliente', id: clienteId }])
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener sesiones del cliente:', error);
    throw error;
  }
};

/**
 * Obtiene sesiones asignadas a un grupo específico
 */
export const getSesionesPorGrupo = async (grupoId: string): Promise<SesionEntrenamiento[]> => {
  try {
    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .select('*')
      .contains('asignaciones', [{ tipo: 'grupo', id: grupoId }])
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener sesiones del grupo:', error);
    throw error;
  }
};

