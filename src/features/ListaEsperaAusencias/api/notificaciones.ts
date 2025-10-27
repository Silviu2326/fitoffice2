import { supabase } from '../../../lib/supabase';

export interface Notificacion {
  id: string;
  tipo: 'lista_espera_disponible' | 'recordatorio_clase' | 'penalizacion' | 'confirmacion';
  destinatario_id: string;
  asunto: string;
  mensaje: string;
  canal: 'email' | 'sms' | 'push' | 'in_app';
  estado: 'pendiente' | 'enviada' | 'fallida' | 'leida';
  fecha_envio?: string;
  fecha_lectura?: string;
  datos_adicionales?: any;
  intentos: number;
  created_at: string;
  updated_at: string;
}

export interface ConfiguracionNotificaciones {
  recordatorio_24h: boolean;
  recordatorio_2h: boolean;
  notificar_lista_espera: boolean;
  notificar_penalizacion: boolean;
  canal_preferido: 'email' | 'sms' | 'push';
  tiempo_respuesta_minutos: number;
}

// Obtener notificaciones
export const getNotificaciones = async (destinatarioId?: string) => {
  let query = supabase
    .from('notificaciones')
    .select('*')
    .order('created_at', { ascending: false });

  if (destinatarioId) {
    query = query.eq('destinatario_id', destinatarioId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Crear notificación
export const crearNotificacion = async (notificacion: Omit<Notificacion, 'id' | 'created_at' | 'updated_at' | 'intentos'>) => {
  const { data, error } = await supabase
    .from('notificaciones')
    .insert([{ ...notificacion, intentos: 0 }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar estado de notificación
export const updateNotificacion = async (id: string, updates: Partial<Notificacion>) => {
  const { data, error } = await supabase
    .from('notificaciones')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Marcar notificación como leída
export const marcarComoLeida = async (id: string) => {
  return updateNotificacion(id, {
    estado: 'leida',
    fecha_lectura: new Date().toISOString()
  });
};

// Enviar notificación de disponibilidad en lista de espera
export const notificarDisponibilidadListaEspera = async (
  socioId: string,
  claseNombre: string,
  fecha: string,
  hora: string,
  posicion: number,
  tiempoRespuestaMinutos: number = 30
) => {
  const mensaje = `¡Buenas noticias! Se ha liberado una plaza en la clase "${claseNombre}" el ${fecha} a las ${hora}. 
Estás en posición ${posicion} de la lista de espera. 
Tienes ${tiempoRespuestaMinutos} minutos para confirmar tu asistencia.`;

  return crearNotificacion({
    tipo: 'lista_espera_disponible',
    destinatario_id: socioId,
    asunto: '¡Plaza disponible en lista de espera!',
    mensaje,
    canal: 'push',
    estado: 'pendiente',
    datos_adicionales: {
      clase: claseNombre,
      fecha,
      hora,
      posicion,
      tiempo_expiracion: tiempoRespuestaMinutos
    }
  });
};

// Enviar recordatorio de clase
export const enviarRecordatorioClase = async (
  socioId: string,
  claseNombre: string,
  fecha: string,
  hora: string,
  horasAntes: number
) => {
  const mensaje = `Recordatorio: Tienes una clase de "${claseNombre}" programada para el ${fecha} a las ${hora} (en ${horasAntes} horas). 
Si no puedes asistir, por favor cancela tu reserva para liberar la plaza.`;

  return crearNotificacion({
    tipo: 'recordatorio_clase',
    destinatario_id: socioId,
    asunto: `Recordatorio de clase - ${claseNombre}`,
    mensaje,
    canal: 'push',
    estado: 'pendiente',
    datos_adicionales: {
      clase: claseNombre,
      fecha,
      hora,
      horas_antes: horasAntes
    }
  });
};

// Notificar penalización por ausencia
export const notificarPenalizacion = async (
  socioId: string,
  claseNombre: string,
  fecha: string,
  monto: number,
  motivo: string
) => {
  const mensaje = `Se ha aplicado una penalización de $${monto.toFixed(2)} por ${motivo} en la clase "${claseNombre}" del ${fecha}. 
El cargo se ha añadido a tu cuenta.`;

  return crearNotificacion({
    tipo: 'penalizacion',
    destinatario_id: socioId,
    asunto: 'Penalización aplicada por ausencia',
    mensaje,
    canal: 'email',
    estado: 'pendiente',
    datos_adicionales: {
      clase: claseNombre,
      fecha,
      monto,
      motivo
    }
  });
};

// Enviar confirmación de reserva
export const enviarConfirmacionReserva = async (
  socioId: string,
  claseNombre: string,
  fecha: string,
  hora: string,
  esListaEspera: boolean = false
) => {
  const mensaje = esListaEspera
    ? `Tu reserva ha sido confirmada desde la lista de espera para la clase "${claseNombre}" el ${fecha} a las ${hora}.`
    : `Tu reserva ha sido confirmada para la clase "${claseNombre}" el ${fecha} a las ${hora}.`;

  return crearNotificacion({
    tipo: 'confirmacion',
    destinatario_id: socioId,
    asunto: 'Reserva confirmada',
    mensaje,
    canal: 'push',
    estado: 'pendiente',
    datos_adicionales: {
      clase: claseNombre,
      fecha,
      hora,
      desde_lista_espera: esListaEspera
    }
  });
};

// Procesar cola de notificaciones pendientes
export const procesarColaNotificaciones = async () => {
  const { data, error } = await supabase
    .from('notificaciones')
    .select('*')
    .eq('estado', 'pendiente')
    .lt('intentos', 3)
    .order('created_at', { ascending: true })
    .limit(50);

  if (error) throw error;

  // Aquí se implementaría la lógica real de envío
  // Por ahora solo simulamos el envío
  for (const notificacion of data) {
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await updateNotificacion(notificacion.id, {
        estado: 'enviada',
        fecha_envio: new Date().toISOString(),
        intentos: notificacion.intentos + 1
      });
    } catch (error) {
      await updateNotificacion(notificacion.id, {
        estado: 'fallida',
        intentos: notificacion.intentos + 1
      });
    }
  }

  return data.length;
};

// Obtener configuración de notificaciones de un socio
export const getConfiguracionNotificaciones = async (socioId: string): Promise<ConfiguracionNotificaciones> => {
  const { data, error } = await supabase
    .from('configuracion_notificaciones')
    .select('*')
    .eq('socio_id', socioId)
    .single();

  if (error) {
    // Si no existe, retornar configuración por defecto
    return {
      recordatorio_24h: true,
      recordatorio_2h: true,
      notificar_lista_espera: true,
      notificar_penalizacion: true,
      canal_preferido: 'push',
      tiempo_respuesta_minutos: 30
    };
  }

  return data;
};

// Actualizar configuración de notificaciones
export const updateConfiguracionNotificaciones = async (
  socioId: string,
  config: ConfiguracionNotificaciones
) => {
  const { data, error } = await supabase
    .from('configuracion_notificaciones')
    .upsert([{ socio_id: socioId, ...config }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

