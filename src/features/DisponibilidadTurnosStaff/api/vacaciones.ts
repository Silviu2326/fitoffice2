import { supabase } from '../../../lib/supabase';

export interface Vacacion {
  id: string;
  personal_id: string;
  fecha_inicio: string;
  fecha_fin: string;
  dias: number;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  reemplazo_id?: string;
  motivo?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface Reemplazo {
  id: string;
  personal_original_id: string;
  reemplazo_id: string;
  fecha: string;
  turno: string;
  motivo: string;
  estado: 'pendiente' | 'confirmado' | 'completado';
  created_at: string;
  updated_at: string;
}

// === VACACIONES ===

// Obtener todas las vacaciones
export const getVacaciones = async () => {
  const { data, error } = await supabase
    .from('vacaciones')
    .select('*')
    .order('fecha_inicio', { ascending: false });

  if (error) throw error;
  return data;
};

// Obtener vacaciones por personal
export const getVacacionesByPersonal = async (personalId: string) => {
  const { data, error } = await supabase
    .from('vacaciones')
    .select('*')
    .eq('personal_id', personalId)
    .order('fecha_inicio', { ascending: false });

  if (error) throw error;
  return data;
};

// Obtener vacaciones pendientes
export const getVacacionesPendientes = async () => {
  const { data, error } = await supabase
    .from('vacaciones')
    .select('*')
    .eq('estado', 'pendiente')
    .order('fecha_inicio', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener vacaciones aprobadas en un rango de fechas
export const getVacacionesEnRango = async (fechaInicio: string, fechaFin: string) => {
  const { data, error } = await supabase
    .from('vacaciones')
    .select('*')
    .eq('estado', 'aprobada')
    .gte('fecha_inicio', fechaInicio)
    .lte('fecha_fin', fechaFin);

  if (error) throw error;
  return data;
};

// Crear solicitud de vacaciones
export const createVacacion = async (vacacion: Omit<Vacacion, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('vacaciones')
    .insert([vacacion])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Aprobar vacaciones
export const aprobarVacacion = async (id: string, reemplazoId?: string) => {
  const updates: Partial<Vacacion> = {
    estado: 'aprobada',
    updated_at: new Date().toISOString()
  };
  
  if (reemplazoId) {
    updates.reemplazo_id = reemplazoId;
  }

  const { data, error } = await supabase
    .from('vacaciones')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Rechazar vacaciones
export const rechazarVacacion = async (id: string, motivo?: string) => {
  const { data, error } = await supabase
    .from('vacaciones')
    .update({
      estado: 'rechazada',
      notas: motivo,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar vacaciones
export const updateVacacion = async (id: string, updates: Partial<Vacacion>) => {
  const { data, error } = await supabase
    .from('vacaciones')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Eliminar vacaciones
export const deleteVacacion = async (id: string) => {
  const { error } = await supabase
    .from('vacaciones')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// === REEMPLAZOS ===

// Obtener todos los reemplazos
export const getReemplazos = async () => {
  const { data, error } = await supabase
    .from('reemplazos')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) throw error;
  return data;
};

// Obtener reemplazos pendientes
export const getReemplazosPendientes = async () => {
  const { data, error } = await supabase
    .from('reemplazos')
    .select('*')
    .eq('estado', 'pendiente')
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data;
};

// Crear reemplazo
export const createReemplazo = async (reemplazo: Omit<Reemplazo, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('reemplazos')
    .insert([reemplazo])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Confirmar reemplazo
export const confirmarReemplazo = async (id: string) => {
  const { data, error } = await supabase
    .from('reemplazos')
    .update({
      estado: 'confirmado',
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Completar reemplazo
export const completarReemplazo = async (id: string) => {
  const { data, error } = await supabase
    .from('reemplazos')
    .update({
      estado: 'completado',
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar reemplazo
export const updateReemplazo = async (id: string, updates: Partial<Reemplazo>) => {
  const { data, error } = await supabase
    .from('reemplazos')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Eliminar reemplazo
export const deleteReemplazo = async (id: string) => {
  const { error } = await supabase
    .from('reemplazos')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

