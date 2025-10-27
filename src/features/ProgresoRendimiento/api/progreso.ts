/**
 * API de Progreso
 * Gestiona las operaciones relacionadas con el seguimiento de progreso de clientes
 */

export interface ProgresoData {
  id: string;
  clienteId: string;
  fecha: string;
  peso: number;
  porcentajeGrasa: number;
  masaMuscular: number;
  notas?: string;
}

export interface EvolucionFuerza {
  ejercicio: string;
  peso: number;
  repeticiones: number;
  fecha: string;
  rm?: number;
}

/**
 * Obtiene el progreso general de un cliente
 */
export const getProgresoCliente = async (clienteId: string): Promise<ProgresoData[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          clienteId,
          fecha: '2025-01-01',
          peso: 75,
          porcentajeGrasa: 18,
          masaMuscular: 35,
        },
        {
          id: '2',
          clienteId,
          fecha: '2025-02-01',
          peso: 74,
          porcentajeGrasa: 17,
          masaMuscular: 35.5,
        },
        {
          id: '3',
          clienteId,
          fecha: '2025-03-01',
          peso: 73,
          porcentajeGrasa: 16,
          masaMuscular: 36,
        },
        {
          id: '4',
          clienteId,
          fecha: '2025-10-26',
          peso: 72,
          porcentajeGrasa: 14,
          masaMuscular: 37,
        },
      ]);
    }, 500);
  });
};

/**
 * Registra un nuevo punto de progreso
 */
export const registrarProgreso = async (data: Omit<ProgresoData, 'id'>): Promise<ProgresoData> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        ...data,
      });
    }, 500);
  });
};

/**
 * Obtiene la evolución de fuerza de un cliente
 */
export const getEvolucionFuerza = async (
  clienteId: string,
  ejercicio?: string
): Promise<EvolucionFuerza[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ejercicio: 'Press Banca',
          peso: 80,
          repeticiones: 5,
          fecha: '2025-01-15',
          rm: 90,
        },
        {
          ejercicio: 'Press Banca',
          peso: 85,
          repeticiones: 5,
          fecha: '2025-03-15',
          rm: 95,
        },
        {
          ejercicio: 'Press Banca',
          peso: 90,
          repeticiones: 5,
          fecha: '2025-10-26',
          rm: 100,
        },
        {
          ejercicio: 'Sentadilla',
          peso: 100,
          repeticiones: 5,
          fecha: '2025-01-15',
          rm: 120,
        },
        {
          ejercicio: 'Sentadilla',
          peso: 110,
          repeticiones: 5,
          fecha: '2025-03-15',
          rm: 130,
        },
        {
          ejercicio: 'Sentadilla',
          peso: 120,
          repeticiones: 5,
          fecha: '2025-10-26',
          rm: 140,
        },
      ]);
    }, 500);
  });
};

/**
 * Registra una nueva repetición máxima
 */
export const registrarRM = async (data: EvolucionFuerza): Promise<EvolucionFuerza> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

/**
 * Obtiene análisis de tendencias de progreso
 */
export const analizarTendencias = async (clienteId: string) => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tendenciaGeneral: 'positiva',
        areasExcelentes: ['Fuerza Superior', 'Fuerza Inferior'],
        areasAtencion: ['Resistencia'],
        areasPreocupantes: ['Movilidad'],
        recomendaciones: [
          'Mantener intensidad en fuerza',
          'Aumentar trabajo cardiovascular',
          'Incorporar más movilidad',
        ],
      });
    }, 500);
  });
};

