import { supabase } from '../../../lib/supabase';

export interface Turno {
  id: string;
  personal_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: 'activo' | 'ausente' | 'reemplazo';
  especialidad: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

// Obtener todos los turnos
export const getTurnos = async () => {
  const { data, error } = await supabase
    .from('turnos')
    .select('*')
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener turnos por fecha
export const getTurnosByFecha = async (fecha: string) => {
  const { data, error } = await supabase
    .from('turnos')
    .select('*')
    .eq('fecha', fecha)
    .order('hora_inicio', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener turnos por personal
export const getTurnosByPersonal = async (personalId: string) => {
  const { data, error } = await supabase
    .from('turnos')
    .select('*')
    .eq('personal_id', personalId)
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data;
};

// Crear un nuevo turno
export const createTurno = async (turno: Omit<Turno, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('turnos')
    .insert([turno])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar un turno
export const updateTurno = async (id: string, updates: Partial<Turno>) => {
  const { data, error } = await supabase
    .from('turnos')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Eliminar un turno
export const deleteTurno = async (id: string) => {
  const { error } = await supabase
    .from('turnos')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Verificar disponibilidad para asignar turno
export const verificarDisponibilidad = async (
  personalId: string,
  fecha: string,
  horaInicio: string,
  horaFin: string
) => {
  const { data, error } = await supabase
    .from('turnos')
    .select('*')
    .eq('personal_id', personalId)
    .eq('fecha', fecha)
    .or(`hora_inicio.lte.${horaInicio},hora_fin.gte.${horaInicio}`)
    .or(`hora_inicio.lte.${horaFin},hora_fin.gte.${horaFin}`);

  if (error) throw error;
  return data.length === 0; // true si está disponible
};

