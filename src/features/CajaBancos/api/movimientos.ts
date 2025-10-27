// API para gestión de movimientos generales

export interface Movimiento {
  id: string;
  fecha: string;
  hora: string;
  tipo: 'ingreso' | 'gasto';
  monto: number;
  concepto: string;
  categoria: string;
  metodo: 'efectivo' | 'tarjeta' | 'transferencia';
  origen?: string;
  destino?: string;
}

export interface ResumenMovimientos {
  totalIngresos: number;
  totalGastos: number;
  saldo: number;
  movimientosPorTipo: {
    efectivo: number;
    tarjeta: number;
    transferencia: number;
  };
}

// Funciones API placeholder
export const obtenerMovimientos = async (fechaInicio?: string, fechaFin?: string): Promise<Movimiento[]> => {
  // TODO: Implementar llamada real a la API
  console.log('Obteniendo movimientos desde', fechaInicio, 'hasta', fechaFin);
  return [];
};

export const crearMovimiento = async (movimiento: Omit<Movimiento, 'id'>): Promise<Movimiento> => {
  // TODO: Implementar llamada real a la API
  return {
    id: Math.random().toString(),
    ...movimiento
  };
};

export const eliminarMovimiento = async (movimientoId: string): Promise<void> => {
  // TODO: Implementar llamada real a la API
  console.log('Eliminando movimiento:', movimientoId);
};

export const obtenerResumen = async (_fecha: string): Promise<ResumenMovimientos> => {
  // TODO: Implementar llamada real a la API
  return {
    totalIngresos: 0,
    totalGastos: 0,
    saldo: 0,
    movimientosPorTipo: {
      efectivo: 0,
      tarjeta: 0,
      transferencia: 0
    }
  };
};

