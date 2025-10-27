import { supabase } from '../../../lib/supabase';

export interface Suscripcion {
  id: string;
  cliente_id: string;
  plan: string;
  precio: number;
  frecuencia: 'mensual' | 'trimestral' | 'anual';
  sesiones_disponibles?: number;
  fecha_inicio: string;
  fecha_renovacion: string;
  estado: 'activa' | 'pausada' | 'cancelada';
  tipo: 'entrenador' | 'gimnasio';
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtener todas las suscripciones
 */
export const getSuscripciones = async (): Promise<Suscripcion[]> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Obtener una suscripción por ID
 */
export const getSuscripcionById = async (id: string): Promise<Suscripcion | null> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Crear una nueva suscripción
 */
export const createSuscripcion = async (suscripcion: Omit<Suscripcion, 'id' | 'created_at' | 'updated_at'>): Promise<Suscripcion> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .insert([suscripcion])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Actualizar una suscripción
 */
export const updateSuscripcion = async (id: string, updates: Partial<Suscripcion>): Promise<Suscripcion> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Eliminar una suscripción
 */
export const deleteSuscripcion = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('suscripciones')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

/**
 * Procesar upgrade de plan
 */
export const procesarUpgrade = async (suscripcionId: string, nuevoPlan: string, nuevoPrecio: number): Promise<Suscripcion> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .update({
      plan: nuevoPlan,
      precio: nuevoPrecio,
      updated_at: new Date().toISOString()
    })
    .eq('id', suscripcionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Procesar downgrade de plan
 */
export const procesarDowngrade = async (suscripcionId: string, nuevoPlan: string, nuevoPrecio: number): Promise<Suscripcion> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .update({
      plan: nuevoPlan,
      precio: nuevoPrecio,
      updated_at: new Date().toISOString()
    })
    .eq('id', suscripcionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Congelar suscripción (freeze)
 */
export const freezeSuscripcion = async (suscripcionId: string, fechaFin: string): Promise<Suscripcion> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .update({
      estado: 'pausada',
      fecha_renovacion: fechaFin,
      updated_at: new Date().toISOString()
    })
    .eq('id', suscripcionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Reactivar suscripción
 */
export const reactivarSuscripcion = async (suscripcionId: string): Promise<Suscripcion> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .update({
      estado: 'activa',
      updated_at: new Date().toISOString()
    })
    .eq('id', suscripcionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Obtener suscripciones activas
 */
export const getSuscripcionesActivas = async (): Promise<Suscripcion[]> => {
  const { data, error } = await supabase
    .from('suscripciones')
    .select('*')
    .eq('estado', 'activa')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

