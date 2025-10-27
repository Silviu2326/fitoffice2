import { supabase } from '../../../lib/supabase';

export interface Recordatorio {
  id: string;
  pago_id: string;
  cliente_id: string;
  cliente_nombre: string;
  tipo: 'amigable' | 'firme' | 'urgente' | 'legal';
  mensaje: string;
  fecha_envio: string;
  estado: 'pendiente' | 'enviado' | 'leido' | 'respondido';
  canal: 'email' | 'sms' | 'whatsapp' | 'app';
  respuesta?: string;
}

export interface PlantillaRecordatorio {
  tipo: Recordatorio['tipo'];
  asunto: string;
  mensaje: string;
  diasRetraso: number;
}

export const plantillasRecordatorio: PlantillaRecordatorio[] = [
  {
    tipo: 'amigable',
    asunto: 'Recordatorio de Pago Pendiente',
    mensaje: 'Hola {nombre}, te recordamos que tienes un pago pendiente de {monto}€ con vencimiento el {fecha}. Si ya lo has realizado, por favor ignora este mensaje. ¡Gracias!',
    diasRetraso: 7
  },
  {
    tipo: 'firme',
    asunto: 'Pago Pendiente - Acción Requerida',
    mensaje: 'Estimado/a {nombre}, tu pago de {monto}€ lleva {dias} días de retraso. Te solicitamos que regularices tu situación lo antes posible para evitar cargos adicionales.',
    diasRetraso: 15
  },
  {
    tipo: 'urgente',
    asunto: 'URGENTE: Pago Vencido - Regularización Inmediata',
    mensaje: 'Atención {nombre}: Tu pago de {monto}€ está seriamente retrasado ({dias} días). Debes regularizar tu situación de inmediato o procederemos con las acciones correspondientes.',
    diasRetraso: 30
  },
  {
    tipo: 'legal',
    asunto: 'Aviso Legal - Gestión de Cobro',
    mensaje: 'Sr/a {nombre}, tu deuda de {monto}€ está siendo escalada a gestión legal. Contacta urgentemente con nosotros para evitar mayores consecuencias.',
    diasRetraso: 60
  }
];

export const generarMensajeRecordatorio = (
  plantilla: PlantillaRecordatorio,
  datos: { nombre: string; monto: number; fecha: string; dias: number }
): string => {
  return plantilla.mensaje
    .replace('{nombre}', datos.nombre)
    .replace('{monto}', datos.monto.toString())
    .replace('{fecha}', datos.fecha)
    .replace('{dias}', datos.dias.toString());
};

export const obtenerPlantillaPorDiasRetraso = (diasRetraso: number): PlantillaRecordatorio => {
  if (diasRetraso <= 7) return plantillasRecordatorio[0];
  if (diasRetraso <= 15) return plantillasRecordatorio[1];
  if (diasRetraso <= 30) return plantillasRecordatorio[2];
  return plantillasRecordatorio[3];
};

export const enviarRecordatorio = async (
  pagoId: string,
  clienteId: string,
  tipo: Recordatorio['tipo'],
  mensaje: string,
  canal: Recordatorio['canal'] = 'email'
): Promise<Recordatorio> => {
  const nuevoRecordatorio = {
    pago_id: pagoId,
    cliente_id: clienteId,
    tipo,
    mensaje,
    fecha_envio: new Date().toISOString(),
    estado: 'enviado' as const,
    canal,
  };

  const { data, error } = await supabase
    .from('recordatorios_morosidad')
    .insert(nuevoRecordatorio)
    .select()
    .single();

  if (error) throw error;

  // Actualizar la fecha del último recordatorio en el pago
  await supabase
    .from('pagos_pendientes')
    .update({ ultimo_recordatorio: new Date().toISOString() })
    .eq('id', pagoId);

  return data;
};

export const obtenerRecordatoriosPago = async (pagoId: string): Promise<Recordatorio[]> => {
  const { data, error } = await supabase
    .from('recordatorios_morosidad')
    .select('*')
    .eq('pago_id', pagoId)
    .order('fecha_envio', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const obtenerRecordatoriosPendientes = async (): Promise<Recordatorio[]> => {
  const { data, error } = await supabase
    .from('recordatorios_morosidad')
    .select('*')
    .eq('estado', 'pendiente')
    .order('fecha_envio', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const marcarRecordatorioLeido = async (recordatorioId: string): Promise<void> => {
  const { error } = await supabase
    .from('recordatorios_morosidad')
    .update({ estado: 'leido', updated_at: new Date().toISOString() })
    .eq('id', recordatorioId);

  if (error) throw error;
};

export const registrarRespuestaRecordatorio = async (
  recordatorioId: string,
  respuesta: string
): Promise<void> => {
  const { error } = await supabase
    .from('recordatorios_morosidad')
    .update({ 
      estado: 'respondido',
      respuesta,
      updated_at: new Date().toISOString()
    })
    .eq('id', recordatorioId);

  if (error) throw error;
};

