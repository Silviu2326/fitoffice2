// API Mock para gestión de programas de entrenamiento

export interface Programa {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'personalizado' | 'grupal' | 'sala';
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  duracion: string;
  categoria: string;
  asignados: number;
  ejercicios?: number;
  fases?: Fase[];
  createdAt: string;
  updatedAt: string;
}

export interface Fase {
  id: string;
  nombre: string;
  descripcion: string;
  semanas: number;
  ejercicios: Ejercicio[];
}

export interface Ejercicio {
  id: string;
  nombre: string;
  series: number;
  repeticiones: string;
  descanso: string;
  notas?: string;
}

class ProgramasAPI {
  // GET /api/entrenamiento/programas
  async getProgramas(filters?: {
    tipo?: string;
    nivel?: string;
    categoria?: string;
  }): Promise<Programa[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));

    const programas: Programa[] = [
      {
        id: '1',
        nombre: 'Rutina de Fuerza para Carla',
        descripcion: 'Programa de fuerza enfocado en tren superior',
        tipo: 'personalizado',
        nivel: 'intermedio',
        duracion: '8 semanas',
        categoria: 'Fuerza',
        asignados: 1,
        ejercicios: 32,
        createdAt: '2025-10-01',
        updatedAt: '2025-10-20'
      },
      {
        id: '2',
        nombre: 'Rehab Rodilla Miguel',
        descripcion: 'Programa de rehabilitación post-operatorio',
        tipo: 'personalizado',
        nivel: 'principiante',
        duracion: '12 semanas',
        categoria: 'Rehabilitación',
        asignados: 1,
        ejercicios: 24,
        createdAt: '2025-09-15',
        updatedAt: '2025-10-18'
      },
      {
        id: '3',
        nombre: 'CrossFit WOD Semanal',
        descripcion: 'Programa semanal para clases de CrossFit',
        tipo: 'grupal',
        nivel: 'intermedio',
        duracion: '1 semana',
        categoria: 'CrossFit',
        asignados: 45,
        ejercicios: 15,
        createdAt: '2025-10-10',
        updatedAt: '2025-10-25'
      },
      {
        id: '4',
        nombre: 'Plan de Sala - Hipertrofia',
        descripcion: 'Rutina de sala para ganancia muscular',
        tipo: 'sala',
        nivel: 'intermedio',
        duracion: '4 semanas',
        categoria: 'Hipertrofia',
        asignados: 23,
        ejercicios: 32,
        createdAt: '2025-09-20',
        updatedAt: '2025-10-22'
      }
    ];

    // Aplicar filtros si existen
    let resultado = programas;
    if (filters?.tipo) {
      resultado = resultado.filter(p => p.tipo === filters.tipo);
    }
    if (filters?.nivel) {
      resultado = resultado.filter(p => p.nivel === filters.nivel);
    }
    if (filters?.categoria) {
      resultado = resultado.filter(p => p.categoria === filters.categoria);
    }

    return resultado;
  }

  // POST /api/entrenamiento/programas
  async createPrograma(data: Omit<Programa, 'id' | 'createdAt' | 'updatedAt'>): Promise<Programa> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const nuevoPrograma: Programa = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return nuevoPrograma;
  }

  // PUT /api/entrenamiento/programas/:id
  async updatePrograma(id: string, data: Partial<Programa>): Promise<Programa> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const programaActualizado: Programa = {
      id,
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      tipo: data.tipo || 'personalizado',
      nivel: data.nivel || 'intermedio',
      duracion: data.duracion || '',
      categoria: data.categoria || '',
      asignados: data.asignados || 0,
      ejercicios: data.ejercicios || 0,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return programaActualizado;
  }

  // DELETE /api/entrenamiento/programas/:id
  async deletePrograma(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      success: true,
      message: `Programa ${id} eliminado correctamente`
    };
  }

  // GET /api/entrenamiento/programas/:id
  async getProgramaById(id: string): Promise<Programa> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const programa: Programa = {
      id,
      nombre: 'Rutina de Fuerza para Carla',
      descripcion: 'Programa de fuerza enfocado en tren superior',
      tipo: 'personalizado',
      nivel: 'intermedio',
      duracion: '8 semanas',
      categoria: 'Fuerza',
      asignados: 1,
      ejercicios: 32,
      fases: [
        {
          id: '1',
          nombre: 'Fase 1: Adaptación',
          descripcion: 'Fase inicial de adaptación',
          semanas: 2,
          ejercicios: [
            {
              id: '1',
              nombre: 'Press Banca',
              series: 3,
              repeticiones: '10-12',
              descanso: '90s',
              notas: 'Controlar la técnica'
            }
          ]
        }
      ],
      createdAt: '2025-10-01',
      updatedAt: '2025-10-20'
    };

    return programa;
  }

  // POST /api/entrenamiento/programas/duplicar
  async duplicarPrograma(id: string, nuevoNombre: string): Promise<Programa> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const programaOriginal = await this.getProgramaById(id);
    const programaDuplicado: Programa = {
      ...programaOriginal,
      id: Math.random().toString(36).substr(2, 9),
      nombre: nuevoNombre,
      asignados: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return programaDuplicado;
  }
}

export const programasAPI = new ProgramasAPI();

