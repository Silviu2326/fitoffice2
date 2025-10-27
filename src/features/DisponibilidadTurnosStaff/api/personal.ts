import { supabase } from '../../../lib/supabase';

export interface Personal {
  id: string;
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  especialidad: string;
  fecha_ingreso: string;
  estado: 'activo' | 'vacaciones' | 'baja';
  horas_semanales: number;
  dias_trabajo: string[];
  disponibilidad_extra: boolean;
  created_at: string;
  updated_at: string;
}

// Obtener todo el personal
export const getPersonal = async () => {
  const { data, error } = await supabase
    .from('personal')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener personal por ID
export const getPersonalById = async (id: string) => {
  const { data, error } = await supabase
    .from('personal')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Obtener personal activo
export const getPersonalActivo = async () => {
  const { data, error } = await supabase
    .from('personal')
    .select('*')
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener personal por especialidad
export const getPersonalByEspecialidad = async (especialidad: string) => {
  const { data, error } = await supabase
    .from('personal')
    .select('*')
    .eq('especialidad', especialidad)
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
};

// Crear un nuevo miembro del personal
export const createPersonal = async (personal: Omit<Personal, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('personal')
    .insert([personal])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar personal
export const updatePersonal = async (id: string, updates: Partial<Personal>) => {
  const { data, error } = await supabase
    .from('personal')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Eliminar personal
export const deletePersonal = async (id: string) => {
  const { error } = await supabase
    .from('personal')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Obtener disponibilidad del personal para una fecha
export const getDisponibilidadFecha = async (fecha: string) => {
  // Primero obtenemos todo el personal activo
  const { data: personalActivo, error: errorPersonal } = await supabase
    .from('personal')
    .select('*')
    .eq('estado', 'activo');

  if (errorPersonal) throw errorPersonal;

  // Luego obtenemos los turnos para esa fecha
  const { data: turnos, error: errorTurnos } = await supabase
    .from('turnos')
    .select('*')
    .eq('fecha', fecha);

  if (errorTurnos) throw errorTurnos;

  // Combinamos la información
  return personalActivo?.map(persona => {
    const turnoHoy = turnos?.find(t => t.personal_id === persona.id);
    return {
      ...persona,
      turno_hoy: turnoHoy,
      disponible: !turnoHoy || turnoHoy.estado === 'activo'
    };
  });
};

