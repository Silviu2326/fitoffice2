// API para Seguimiento de Peso

interface RegistroPeso {
  id?: string;
  cliente_id: string;
  cliente_nombre: string;
  fecha: string;
  peso: number;
  diferencia?: number;
  created_at?: string;
}

// Mock data para desarrollo
const mockPesos: RegistroPeso[] = [
  {
    id: 'p1',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-26',
    peso: 78.5,
    diferencia: -0.3,
    created_at: '2025-10-26T07:00:00Z',
  },
  {
    id: 'p2',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-25',
    peso: 78.8,
    diferencia: -0.2,
    created_at: '2025-10-25T07:00:00Z',
  },
  {
    id: 'p3',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-24',
    peso: 79.0,
    diferencia: -0.4,
    created_at: '2025-10-24T07:00:00Z',
  },
  {
    id: 'p4',
    cliente_id: 'c2',
    cliente_nombre: 'María López',
    fecha: '2025-10-26',
    peso: 65.2,
    diferencia: -0.1,
    created_at: '2025-10-26T07:30:00Z',
  },
  {
    id: 'p5',
    cliente_id: 'c2',
    cliente_nombre: 'María López',
    fecha: '2025-10-25',
    peso: 65.3,
    diferencia: -0.2,
    created_at: '2025-10-25T07:30:00Z',
  },
];

let pesos = [...mockPesos];

export async function getPesoDiario(): Promise<RegistroPeso[]> {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...pesos]);
    }, 500);
  });
}

export async function getPesosByCliente(clienteId: string): Promise<RegistroPeso[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pesosByCliente = pesos.filter(p => p.cliente_id === clienteId);
      resolve(pesosByCliente);
    }, 300);
  });
}

export async function getPesoById(id: string): Promise<RegistroPeso | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const peso = pesos.find(p => p.id === id);
      resolve(peso || null);
    }, 300);
  });
}

export async function registrarPeso(data: Omit<RegistroPeso, 'id' | 'created_at' | 'diferencia'>): Promise<RegistroPeso> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calcular diferencia con el último registro del mismo cliente
      const pesosCliente = pesos
        .filter(p => p.cliente_nombre === data.cliente_nombre)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      
      const diferencia = pesosCliente.length > 0 
        ? parseFloat((data.peso - pesosCliente[0].peso).toFixed(1))
        : 0;

      const newPeso: RegistroPeso = {
        ...data,
        id: `p${Date.now()}`,
        cliente_id: data.cliente_id || `c${Date.now()}`,
        diferencia,
        created_at: new Date().toISOString(),
      };
      
      pesos.unshift(newPeso);
      resolve(newPeso);
    }, 300);
  });
}

export async function updatePeso(id: string, data: Partial<RegistroPeso>): Promise<RegistroPeso | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = pesos.findIndex(p => p.id === id);
      if (index !== -1) {
        pesos[index] = { ...pesos[index], ...data };
        resolve(pesos[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
}

export async function deletePeso(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = pesos.findIndex(p => p.id === id);
      if (index !== -1) {
        pesos.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}

// Funciones de análisis
export async function getEstadisticasPeso(clienteId: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pesosCliente = pesos.filter(p => p.cliente_id === clienteId);
      
      if (pesosCliente.length === 0) {
        resolve({
          pesoActual: 0,
          pesoInicial: 0,
          cambioTotal: 0,
          promedio: 0,
          tendencia: 'estable',
        });
        return;
      }

      const pesosOrdenados = pesosCliente.sort((a, b) => 
        new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );

      const pesoInicial = pesosOrdenados[0].peso;
      const pesoActual = pesosOrdenados[pesosOrdenados.length - 1].peso;
      const cambioTotal = pesoActual - pesoInicial;
      const promedio = pesosCliente.reduce((acc, p) => acc + p.peso, 0) / pesosCliente.length;
      
      let tendencia: 'subiendo' | 'bajando' | 'estable' = 'estable';
      if (cambioTotal > 0.5) tendencia = 'subiendo';
      else if (cambioTotal < -0.5) tendencia = 'bajando';

      resolve({
        pesoActual: pesoActual.toFixed(1),
        pesoInicial: pesoInicial.toFixed(1),
        cambioTotal: cambioTotal.toFixed(1),
        promedio: promedio.toFixed(1),
        tendencia,
      });
    }, 500);
  });
}

