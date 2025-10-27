// API para generación de reportes
export interface Report {
  id: string;
  nombre: string;
  tipo: 'mensual' | 'trimestral' | 'anual' | 'personalizado';
  fechaGeneracion: string;
  periodo: {
    inicio: string;
    fin: string;
  };
  metricas: {
    nombre: string;
    valor: number;
    unidad: string;
  }[];
  resumen: string;
}

export const getReports = async (): Promise<Report[]> => {
  return [
    {
      id: '1',
      nombre: 'Reporte Mensual - Octubre 2025',
      tipo: 'mensual',
      fechaGeneracion: '2025-10-26',
      periodo: {
        inicio: '2025-10-01',
        fin: '2025-10-31'
      },
      metricas: [
        { nombre: 'Facturación', valor: 9800, unidad: '€' },
        { nombre: 'Adherencia', valor: 88, unidad: '%' },
        { nombre: 'Retención', valor: 92, unidad: '%' },
        { nombre: 'Clientes Activos', valor: 45, unidad: 'clientes' }
      ],
      resumen: 'Mes con crecimiento sostenido en todas las métricas principales. La adherencia supera el objetivo establecido.'
    },
    {
      id: '2',
      nombre: 'Reporte Trimestral - Q3 2025',
      tipo: 'trimestral',
      fechaGeneracion: '2025-09-30',
      periodo: {
        inicio: '2025-07-01',
        fin: '2025-09-30'
      },
      metricas: [
        { nombre: 'Facturación', valor: 28500, unidad: '€' },
        { nombre: 'Adherencia', valor: 86, unidad: '%' },
        { nombre: 'Retención', valor: 90, unidad: '%' },
        { nombre: 'Clientes Activos', valor: 42, unidad: 'clientes' }
      ],
      resumen: 'Trimestre con resultados positivos. Se alcanzaron el 95% de los objetivos planteados.'
    }
  ];
};

export const generateReport = async (tipo: Report['tipo'], periodo: Report['periodo']): Promise<Report> => {
  return {
    id: Date.now().toString(),
    nombre: `Reporte ${tipo} - ${new Date().toLocaleDateString()}`,
    tipo,
    fechaGeneracion: new Date().toISOString(),
    periodo,
    metricas: [],
    resumen: 'Reporte generado automáticamente'
  };
};

