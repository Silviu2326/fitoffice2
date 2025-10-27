// API para métricas de rendimiento
export interface PerformanceMetric {
  id: string;
  nombre: string;
  valor: number;
  valorAnterior: number;
  unidad: string;
  tendencia: 'up' | 'down' | 'stable';
  porcentajeCambio: number;
}

export interface DashboardData {
  facturacionMensual: number;
  adherenciaPromedio: number;
  tasaRetencion: number;
  clientesActivos: number;
  objetivosCompletados: number;
  objetivosTotales: number;
}

export const getPerformanceMetrics = async (): Promise<PerformanceMetric[]> => {
  return [
    {
      id: '1',
      nombre: 'Facturación Mensual',
      valor: 9800,
      valorAnterior: 8500,
      unidad: '€',
      tendencia: 'up',
      porcentajeCambio: 15.29
    },
    {
      id: '2',
      nombre: 'Adherencia Promedio',
      valor: 88,
      valorAnterior: 85,
      unidad: '%',
      tendencia: 'up',
      porcentajeCambio: 3.53
    },
    {
      id: '3',
      nombre: 'Tasa de Retención',
      valor: 92,
      valorAnterior: 90,
      unidad: '%',
      tendencia: 'up',
      porcentajeCambio: 2.22
    },
    {
      id: '4',
      nombre: 'Clientes Activos',
      valor: 45,
      valorAnterior: 42,
      unidad: 'clientes',
      tendencia: 'up',
      porcentajeCambio: 7.14
    }
  ];
};

export const getDashboardData = async (): Promise<DashboardData> => {
  return {
    facturacionMensual: 9800,
    adherenciaPromedio: 88,
    tasaRetencion: 92,
    clientesActivos: 45,
    objetivosCompletados: 12,
    objetivosTotales: 18
  };
};

