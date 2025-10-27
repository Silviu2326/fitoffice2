// API para configuración de métricas personalizadas
export interface CustomMetric {
  id: string;
  nombre: string;
  descripcion: string;
  formula: string;
  categoria: 'financiero' | 'operacional' | 'clientes' | 'marketing';
  unidad: string;
  activo: boolean;
}

export const getCustomMetrics = async (): Promise<CustomMetric[]> => {
  return [
    {
      id: '1',
      nombre: 'Ticket Medio',
      descripcion: 'Facturación promedio por cliente',
      formula: 'facturacion_total / numero_clientes',
      categoria: 'financiero',
      unidad: '€',
      activo: true
    },
    {
      id: '2',
      nombre: 'Tasa de Conversión',
      descripcion: 'Porcentaje de leads convertidos en clientes',
      formula: '(clientes_nuevos / leads_totales) * 100',
      categoria: 'marketing',
      unidad: '%',
      activo: true
    },
    {
      id: '3',
      nombre: 'Ocupación Media',
      descripcion: 'Porcentaje de ocupación de las salas',
      formula: '(sesiones_realizadas / sesiones_disponibles) * 100',
      categoria: 'operacional',
      unidad: '%',
      activo: true
    }
  ];
};

export const createCustomMetric = async (metric: Omit<CustomMetric, 'id'>): Promise<CustomMetric> => {
  return { ...metric, id: Date.now().toString() };
};

export const updateCustomMetric = async (id: string, metric: Partial<CustomMetric>): Promise<CustomMetric> => {
  const metrics = await getCustomMetrics();
  const existing = metrics.find(m => m.id === id);
  if (!existing) throw new Error('Métrica no encontrada');
  return { ...existing, ...metric };
};

export const deleteCustomMetric = async (id: string): Promise<void> => {
  console.log('Eliminando métrica:', id);
};

