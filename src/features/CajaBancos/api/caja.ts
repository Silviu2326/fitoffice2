// API para gestión de caja
// Aquí se definirán las funciones para interactuar con el backend

export interface CajaMovimiento {
  id: string;
  fecha: string;
  tipo: 'ingreso' | 'gasto';
  monto: number;
  concepto: string;
  metodo: 'efectivo' | 'tarjeta' | 'transferencia';
}

export interface ArqueoData {
  id: string;
  fecha: string;
  totalEsperado: number;
  totalContado: number;
  diferencia: number;
  usuario: string;
}

// Funciones API placeholder
export const obtenerMovimientosCaja = async (): Promise<CajaMovimiento[]> => {
  // TODO: Implementar llamada real a la API
  return [];
};

export const registrarArqueo = async (arqueo: Omit<ArqueoData, 'id'>): Promise<ArqueoData> => {
  // TODO: Implementar llamada real a la API
  return {
    id: Math.random().toString(),
    ...arqueo
  };
};

export const obtenerArqueos = async (): Promise<ArqueoData[]> => {
  // TODO: Implementar llamada real a la API
  return [];
};

