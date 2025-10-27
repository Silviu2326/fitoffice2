// API para Fotos de Comidas

interface FotoComida {
  id?: string;
  cliente_id: string;
  cliente_nombre: string;
  fecha: string;
  hora: string;
  tipo_comida: string;
  foto_url: string;
  descripcion?: string;
  created_at?: string;
}

// Mock data para desarrollo
const mockFotos: FotoComida[] = [
  {
    id: 'f1',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-26',
    hora: '08:30:00',
    tipo_comida: 'Desayuno',
    foto_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
    descripcion: 'Avena con frutas y nueces',
    created_at: '2025-10-26T08:30:00Z',
  },
  {
    id: 'f2',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-26',
    hora: '14:00:00',
    tipo_comida: 'Comida',
    foto_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    descripcion: 'Ensalada de pollo con vegetales',
    created_at: '2025-10-26T14:00:00Z',
  },
  {
    id: 'f3',
    cliente_id: 'c2',
    cliente_nombre: 'María López',
    fecha: '2025-10-26',
    hora: '09:00:00',
    tipo_comida: 'Desayuno',
    foto_url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800',
    descripcion: 'Tostadas integrales con aguacate',
    created_at: '2025-10-26T09:00:00Z',
  },
  {
    id: 'f4',
    cliente_id: 'c2',
    cliente_nombre: 'María López',
    fecha: '2025-10-26',
    hora: '11:00:00',
    tipo_comida: 'Snack',
    foto_url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800',
    descripcion: 'Yogurt griego con frutos rojos',
    created_at: '2025-10-26T11:00:00Z',
  },
  {
    id: 'f5',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-25',
    hora: '20:00:00',
    tipo_comida: 'Cena',
    foto_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    descripcion: 'Salmón a la plancha con verduras',
    created_at: '2025-10-25T20:00:00Z',
  },
  {
    id: 'f6',
    cliente_id: 'c2',
    cliente_nombre: 'María López',
    fecha: '2025-10-25',
    hora: '19:30:00',
    tipo_comida: 'Cena',
    foto_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    descripcion: 'Bowl de quinoa con vegetales',
    created_at: '2025-10-25T19:30:00Z',
  },
];

let fotos = [...mockFotos];

export async function getFotosComida(): Promise<FotoComida[]> {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...fotos]);
    }, 500);
  });
}

export async function getFotosByCliente(clienteId: string): Promise<FotoComida[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fotosByCliente = fotos.filter(f => f.cliente_id === clienteId);
      resolve(fotosByCliente);
    }, 300);
  });
}

export async function getFotoById(id: string): Promise<FotoComida | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foto = fotos.find(f => f.id === id);
      resolve(foto || null);
    }, 300);
  });
}

export async function uploadFotoComida(data: Omit<FotoComida, 'id' | 'created_at'>): Promise<FotoComida> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFoto: FotoComida = {
        ...data,
        id: `f${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      fotos.unshift(newFoto);
      resolve(newFoto);
    }, 300);
  });
}

export async function updateFoto(id: string, data: Partial<FotoComida>): Promise<FotoComida | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = fotos.findIndex(f => f.id === id);
      if (index !== -1) {
        fotos[index] = { ...fotos[index], ...data };
        resolve(fotos[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
}

export async function deleteFoto(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = fotos.findIndex(f => f.id === id);
      if (index !== -1) {
        fotos.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}

// Funciones de análisis
export async function getEstadisticasFotos(clienteId: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fotosCliente = fotos.filter(f => f.cliente_id === clienteId);
      
      const fotosPorTipo = fotosCliente.reduce((acc, foto) => {
        acc[foto.tipo_comida] = (acc[foto.tipo_comida] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      resolve({
        totalFotos: fotosCliente.length,
        fotosPorTipo,
        ultimaFoto: fotosCliente[0] || null,
      });
    }, 500);
  });
}

