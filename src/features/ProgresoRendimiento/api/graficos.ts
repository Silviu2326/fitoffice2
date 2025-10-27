/**
 * API de Gráficos
 * Gestiona los datos para visualizaciones y gráficos de progreso
 */

export interface DatosGrafico {
  etiqueta: string;
  valor: number;
  fecha?: string;
}

export interface ConfiguracionGrafico {
  tipo: 'linea' | 'barra' | 'area' | 'radar';
  titulo: string;
  etiquetaX: string;
  etiquetaY: string;
  color?: string;
}

export interface SerieGrafico {
  nombre: string;
  datos: DatosGrafico[];
  color?: string;
}

/**
 * Obtiene datos para gráfico de evolución de fuerza
 */
export const getDatosEvolucionFuerza = async (
  clienteId: string,
  ejercicio?: string,
  periodo?: '30d' | '3m' | '6m' | '1y'
): Promise<SerieGrafico[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          nombre: 'Press Banca',
          datos: [
            { etiqueta: 'Ene', valor: 80, fecha: '2025-01-01' },
            { etiqueta: 'Feb', valor: 82, fecha: '2025-02-01' },
            { etiqueta: 'Mar', valor: 85, fecha: '2025-03-01' },
            { etiqueta: 'Abr', valor: 87, fecha: '2025-04-01' },
            { etiqueta: 'May', valor: 88, fecha: '2025-05-01' },
            { etiqueta: 'Jun', valor: 90, fecha: '2025-06-01' },
          ],
          color: '#10b981',
        },
        {
          nombre: 'Sentadilla',
          datos: [
            { etiqueta: 'Ene', valor: 100, fecha: '2025-01-01' },
            { etiqueta: 'Feb', valor: 105, fecha: '2025-02-01' },
            { etiqueta: 'Mar', valor: 110, fecha: '2025-03-01' },
            { etiqueta: 'Abr', valor: 112, fecha: '2025-04-01' },
            { etiqueta: 'May', valor: 115, fecha: '2025-05-01' },
            { etiqueta: 'Jun', valor: 120, fecha: '2025-06-01' },
          ],
          color: '#3b82f6',
        },
      ]);
    }, 500);
  });
};

/**
 * Obtiene datos para gráfico de composición corporal
 */
export const getDatosComposicionCorporal = async (
  clienteId: string
): Promise<SerieGrafico[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          nombre: 'Peso',
          datos: [
            { etiqueta: 'Ene', valor: 75 },
            { etiqueta: 'Feb', valor: 74 },
            { etiqueta: 'Mar', valor: 73 },
            { etiqueta: 'Abr', valor: 72.5 },
            { etiqueta: 'May', valor: 72.2 },
            { etiqueta: 'Jun', valor: 72 },
          ],
          color: '#8b5cf6',
        },
        {
          nombre: '% Grasa',
          datos: [
            { etiqueta: 'Ene', valor: 18 },
            { etiqueta: 'Feb', valor: 17 },
            { etiqueta: 'Mar', valor: 16 },
            { etiqueta: 'Abr', valor: 15 },
            { etiqueta: 'May', valor: 14.5 },
            { etiqueta: 'Jun', valor: 14 },
          ],
          color: '#ef4444',
        },
      ]);
    }, 500);
  });
};

/**
 * Obtiene datos para gráfico de rendimiento general
 */
export const getDatosRendimientoGeneral = async (
  clienteId: string
): Promise<{ categoria: string; valor: number }[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { categoria: 'Fuerza', valor: 85 },
        { categoria: 'Resistencia', valor: 72 },
        { categoria: 'Movilidad', valor: 68 },
        { categoria: 'Potencia', valor: 78 },
        { categoria: 'Técnica', valor: 90 },
        { categoria: 'Consistencia', valor: 88 },
      ]);
    }, 500);
  });
};

/**
 * Obtiene datos para gráfico de distribución de entrenamientos
 */
export const getDatosDistribucionEntrenamientos = async (
  clienteId: string
): Promise<{ tipo: string; cantidad: number; porcentaje: number }[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { tipo: 'Fuerza', cantidad: 45, porcentaje: 36 },
        { tipo: 'Hipertrofia', cantidad: 35, porcentaje: 28 },
        { tipo: 'Cardiovascular', cantidad: 25, porcentaje: 20 },
        { tipo: 'Movilidad', cantidad: 15, porcentaje: 12 },
        { tipo: 'Técnica', cantidad: 5, porcentaje: 4 },
      ]);
    }, 500);
  });
};

/**
 * Obtiene datos para timeline de progreso
 */
export const getDatosTimelineProgreso = async (
  clienteId: string
): Promise<{
  fecha: string;
  evento: string;
  tipo: 'logro' | 'record' | 'hito' | 'evaluacion';
  descripcion: string;
}[]> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          fecha: '2025-01-15',
          evento: 'Inicio del programa',
          tipo: 'hito',
          descripcion: 'Evaluación inicial y establecimiento de objetivos',
        },
        {
          fecha: '2025-03-01',
          evento: 'Primer récord personal',
          tipo: 'record',
          descripcion: 'Sentadilla 120kg - +20kg desde inicio',
        },
        {
          fecha: '2025-05-15',
          evento: 'Evaluación trimestral',
          tipo: 'evaluacion',
          descripcion: 'Excelente progreso en todos los indicadores',
        },
        {
          fecha: '2025-08-01',
          evento: 'Logro: 100kg Press Banca',
          tipo: 'logro',
          descripcion: 'Objetivo principal alcanzado',
        },
        {
          fecha: '2025-10-26',
          evento: 'Evaluación actual',
          tipo: 'evaluacion',
          descripcion: 'Análisis de progreso y ajuste de programa',
        },
      ]);
    }, 500);
  });
};

/**
 * Genera configuración de gráfico personalizada
 */
export const generarConfiguracionGrafico = (
  tipo: ConfiguracionGrafico['tipo'],
  titulo: string
): ConfiguracionGrafico => {
  return {
    tipo,
    titulo,
    etiquetaX: 'Tiempo',
    etiquetaY: 'Valor',
    color: '#10b981',
  };
};

/**
 * Exporta datos de gráfico en formato específico
 */
export const exportarDatosGrafico = async (
  datos: SerieGrafico[],
  formato: 'csv' | 'json' | 'pdf'
): Promise<{ url: string; nombre: string }> => {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: `http://example.com/export/progreso_${Date.now()}.${formato}`,
        nombre: `progreso_${Date.now()}.${formato}`,
      });
    }, 1000);
  });
};

