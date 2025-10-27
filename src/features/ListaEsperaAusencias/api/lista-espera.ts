import { supabase } from '../../../lib/supabase';

export interface ListaEspera {
  id: string;
  socio_id: string;
  clase_id: string;
  fecha: string;
  hora: string;
  posicion: number;
  estado: 'en_espera' | 'notificado' | 'confirmado' | 'expirado' | 'cancelado';
  fecha_notificacion?: string;
  fecha_expiracion?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

// Obtener todas las listas de espera
export const getListasEspera = async () => {
  const { data, error } = await supabase
    .from('lista_espera')
    .select('*')
    .order('posicion', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener lista de espera por clase
export const getListaEsperaPorClase = async (claseId: string, fecha: string) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .select('*')
    .eq('clase_id', claseId)
    .eq('fecha', fecha)
    .eq('estado', 'en_espera')
    .order('posicion', { ascending: true });

  if (error) throw error;
  return data;
};

// Obtener lista de espera por socio
export const getListaEsperaPorSocio = async (socioId: string) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .select('*')
    .eq('socio_id', socioId)
    .in('estado', ['en_espera', 'notificado'])
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data;
};

// Añadir socio a lista de espera
export const addToListaEspera = async (listaEspera: Omit<ListaEspera, 'id' | 'created_at' | 'updated_at'>) => {
  // Obtener la última posición en la lista
  const { data: ultimaPosicion } = await supabase
    .from('lista_espera')
    .select('posicion')
    .eq('clase_id', listaEspera.clase_id)
    .eq('fecha', listaEspera.fecha)
    .order('posicion', { ascending: false })
    .limit(1)
    .single();

  const nuevaPosicion = ultimaPosicion ? ultimaPosicion.posicion + 1 : 1;

  const { data, error } = await supabase
    .from('lista_espera')
    .insert([{ ...listaEspera, posicion: nuevaPosicion }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar estado de lista de espera
export const updateListaEspera = async (id: string, updates: Partial<ListaEspera>) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Notificar disponibilidad al siguiente en la lista
export const notificarSiguiente = async (claseId: string, fecha: string) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .select('*')
    .eq('clase_id', claseId)
    .eq('fecha', fecha)
    .eq('estado', 'en_espera')
    .order('posicion', { ascending: true })
    .limit(1)
    .single();

  if (error) throw error;
  
  if (data) {
    const fechaNotificacion = new Date();
    const fechaExpiracion = new Date(fechaNotificacion.getTime() + 30 * 60000); // 30 minutos

    await updateListaEspera(data.id, {
      estado: 'notificado',
      fecha_notificacion: fechaNotificacion.toISOString(),
      fecha_expiracion: fechaExpiracion.toISOString()
    });
  }

  return data;
};

// Confirmar reserva desde lista de espera
export const confirmarReserva = async (id: string) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .update({ estado: 'confirmado', updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Cancelar entrada en lista de espera
export const cancelarListaEspera = async (id: string) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .update({ estado: 'cancelado', updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Limpiar entradas expiradas
export const limpiarExpiradas = async () => {
  const ahora = new Date().toISOString();
  
  const { error } = await supabase
    .from('lista_espera')
    .update({ estado: 'expirado', updated_at: ahora })
    .eq('estado', 'notificado')
    .lt('fecha_expiracion', ahora);

  if (error) throw error;
};

// Reordenar posiciones después de cancelación
export const reordenarPosiciones = async (claseId: string, fecha: string) => {
  const { data, error } = await supabase
    .from('lista_espera')
    .select('*')
    .eq('clase_id', claseId)
    .eq('fecha', fecha)
    .eq('estado', 'en_espera')
    .order('posicion', { ascending: true });

  if (error) throw error;

  if (data) {
    for (let i = 0; i < data.length; i++) {
      await supabase
        .from('lista_espera')
        .update({ posicion: i + 1, updated_at: new Date().toISOString() })
        .eq('id', data[i].id);
    }
  }
};

