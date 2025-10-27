export type TaskPriority = 'alta' | 'media' | 'baja';
export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada' | 'reagendada';
export type AlertType = 'cliente_sin_checkin' | 'lead_sin_seguimiento' | 'pago_pendiente' | 
                        'factura_vencida' | 'equipo_roto' | 'clase_supera_aforo' | 'personalizada';

export interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  prioridad: TaskPriority;
  estado: TaskStatus;
  asignado_a?: string;
  fecha_creacion: string;
  fecha_vencimiento?: string;
  tipo: string;
  relacionado_id?: string;
  completada_fecha?: string;
}

export interface Alert {
  id: string;
  tipo: AlertType;
  titulo: string;
  mensaje: string;
  prioridad: TaskPriority;
  fecha: string;
  leida: boolean;
  relacionado_tipo?: string;
  relacionado_id?: string;
  accion_url?: string;
}

export interface AlertRule {
  id: string;
  nombre: string;
  tipo: AlertType;
  activa: boolean;
  condiciones: Record<string, any>;
  prioridad: TaskPriority;
}

