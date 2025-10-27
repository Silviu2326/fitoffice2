/**
 * API de Métricas
 * Gestiona las métricas de rendimiento y análisis de datos
 */

export interface MetricaRendimiento {
  id: string;
  clienteId: string;
  tipo: 'fuerza' | 'resistencia' | 'movilidad' | 'composicion';
  valor: number;
  unidad: string;
  fecha: string;
}

export interface ResumenMetricas {
  totalSesiones: number;
  mejoraPromedio: number;
  rachaActual: number;
  tiempoTotal: number;
}

export interface AlertaEstancamiento {
  id: string;
  ejercicio: string;
  diasSinProgreso: number;
  ultimoProgreso: string;
  prioridad: 'alta' | 'media' | 'baja';
  activa: boolean;
}

/**
 * Obtiene métricas de rendimiento de un cliente
 */
export const getMetricasRendimiento = async (
  clienteId: string,
  tipo?: string
): Promise<MetricaRendimiento[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          clienteId,
          tipo: 'fuerza',
          valor: 420,
          unidad: 'kg',
          fecha: '2025-05-01',
        },
        {
          id: '2',
          clienteId,
          tipo: 'fuerza',
          valor: 435,
          unidad: 'kg',
          fecha: '2025-07-01',
        },
        {
          id: '3',
          clienteId,
          tipo: 'fuerza',
          valor: 470,
          unidad: 'kg',
          fecha: '2025-10-26',
        },
        {
          id: '4',
          clienteId,
          tipo: 'resistencia',
          valor: 42,
          unidad: 'VO2max',
          fecha: '2025-10-26',
        },
      ]);
    }, 500);
  });
};

/**
 * Obtiene el resumen de métricas generales
 */
export const getResumenMetricas = async (clienteId: string): Promise<ResumenMetricas> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalSesiones: 125,
        mejoraPromedio: 12,
        rachaActual: 14,
        tiempoTotal: 187,
      });
    }, 500);
  });
};

/**
 * Obtiene alertas de estancamiento activas
 */
export const getAlertasEstancamiento = async (
  clienteId: string
): Promise<AlertaEstancamiento[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          ejercicio: 'Press Militar',
          diasSinProgreso: 21,
          ultimoProgreso: '2025-10-05',
          prioridad: 'alta',
          activa: true,
        },
        {
          id: '2',
          ejercicio: 'Curl Bíceps',
          diasSinProgreso: 14,
          ultimoProgreso: '2025-10-12',
          prioridad: 'media',
          activa: true,
        },
        {
          id: '3',
          ejercicio: 'Movilidad Cadera',
          diasSinProgreso: 7,
          ultimoProgreso: '2025-10-19',
          prioridad: 'alta',
          activa: true,
        },
      ]);
    }, 500);
  });
};

/**
 * Resuelve una alerta de estancamiento
 */
export const resolverAlerta = async (
  alertaId: string,
  solucion: string
): Promise<{ success: boolean }> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

/**
 * Registra una nueva métrica
 */
export const registrarMetrica = async (
  data: Omit<MetricaRendimiento, 'id'>
): Promise<MetricaRendimiento> => {
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
 * Obtiene métricas comparativas entre períodos
 */
export const getMetricasComparativas = async (
  clienteId: string,
  periodo1: { inicio: string; fin: string },
  periodo2: { inicio: string; fin: string }
) => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        periodo1: {
          fuerza: 420,
          resistencia: 38,
          movilidad: 75,
        },
        periodo2: {
          fuerza: 470,
          resistencia: 42,
          movilidad: 78,
        },
        cambios: {
          fuerza: '+11.9%',
          resistencia: '+10.5%',
          movilidad: '+4.0%',
        },
      });
    }, 500);
  });
};

