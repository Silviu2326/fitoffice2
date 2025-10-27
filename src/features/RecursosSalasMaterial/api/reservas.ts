export interface Reserva {
  id: string;
  recursoId: string;
  recursoNombre: string;
  tipoRecurso: 'sala' | 'material';
  usuarioId: string;
  usuarioNombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  proposito: string;
  participantes?: number;
  notas?: string;
  fechaReserva: Date;
}

export const getReservas = async (recursoId?: string): Promise<Reserva[]> => {
  // Simulación de datos
  return [];
};

export const crearReserva = async (reserva: Partial<Reserva>): Promise<Reserva> => {
  // Simulación
  return reserva as Reserva;
};

export const cancelarReserva = async (id: string): Promise<void> => {
  // Simulación
};

export const verificarDisponibilidad = async (
  recursoId: string,
  fechaInicio: Date,
  fechaFin: Date
): Promise<boolean> => {
  // Simulación
  return true;
};

