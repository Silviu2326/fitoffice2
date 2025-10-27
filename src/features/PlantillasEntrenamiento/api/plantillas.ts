// API Mock para gestión de plantillas de entrenamiento

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'Fuerza' | 'Cardio' | 'Mixto';
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos';
  duracion: string;
  categoria: string;
  usos: number;
  efectividad: number;
  version: string;
  ejercicios?: Ejercicio[];
  createdAt: string;
  updatedAt: string;
  autor?: string;
}

export interface Ejercicio {
  id: string;
  nombre: string;
  series: number;
  repeticiones: string;
  descanso: string;
  notas?: string;
}

class PlantillasAPI {
  // GET /api/entrenamiento/plantillas
  async getPlantillas(filters?: {
    categoria?: string;
    nivel?: string;
    busqueda?: string;
  }): Promise<Plantilla[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));

    const plantillas: Plantilla[] = [
      {
        id: '1',
        nombre: 'Hipertrofia 12 Semanas',
        descripcion: 'Programa completo de hipertrofia muscular de 12 semanas',
        tipo: 'Fuerza',
        nivel: 'Intermedio',
        duracion: '12 semanas',
        categoria: 'Fuerza',
        usos: 45,
        efectividad: 92,
        version: '2.1',
        createdAt: '2025-09-01',
        updatedAt: '2025-10-15',
        autor: 'María Coach'
      },
      {
        id: '2',
        nombre: 'Pierna 2x/Semana',
        descripcion: 'Rutina especializada de piernas dos veces por semana',
        tipo: 'Fuerza',
        nivel: 'Avanzado',
        duracion: '8 semanas',
        categoria: 'Fuerza',
        usos: 32,
        efectividad: 88,
        version: '1.5',
        createdAt: '2025-08-15',
        updatedAt: '2025-10-10',
        autor: 'Ana Fitness'
      },
      {
        id: '3',
        nombre: 'Cardio HIIT Intensivo',
        descripcion: 'Programa de alta intensidad para pérdida de grasa',
        tipo: 'Cardio',
        nivel: 'Intermedio',
        duracion: '6 semanas',
        categoria: 'Cardio',
        usos: 28,
        efectividad: 85,
        version: '1.0',
        createdAt: '2025-09-20',
        updatedAt: '2025-09-20',
        autor: 'Carlos Trainer'
      },
      {
        id: '4',
        nombre: 'Full Body 3 Días',
        descripcion: 'Entrenamiento de cuerpo completo 3 días por semana',
        tipo: 'Fuerza',
        nivel: 'Principiante',
        duracion: '10 semanas',
        categoria: 'Fuerza',
        usos: 67,
        efectividad: 90,
        version: '3.0',
        createdAt: '2025-07-01',
        updatedAt: '2025-10-20',
        autor: 'Carlos Trainer'
      },
      {
        id: '5',
        nombre: 'Movilidad y Flexibilidad',
        descripcion: 'Programa de mejora de movilidad y rango de movimiento',
        tipo: 'Mixto',
        nivel: 'Todos',
        duracion: '4 semanas',
        categoria: 'Movilidad',
        usos: 19,
        efectividad: 82,
        version: '1.2',
        createdAt: '2025-09-05',
        updatedAt: '2025-10-05',
        autor: 'Pedro Wellness'
      }
    ];

    // Aplicar filtros si existen
    let resultado = plantillas;
    
    if (filters?.categoria && filters.categoria !== 'todas') {
      resultado = resultado.filter(p => p.categoria === filters.categoria);
    }
    
    if (filters?.nivel) {
      resultado = resultado.filter(p => p.nivel === filters.nivel);
    }
    
    if (filters?.busqueda) {
      const termino = filters.busqueda.toLowerCase();
      resultado = resultado.filter(p => 
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino)
      );
    }

    return resultado;
  }

  // POST /api/entrenamiento/plantillas
  async createPlantilla(data: Omit<Plantilla, 'id' | 'createdAt' | 'updatedAt' | 'usos' | 'efectividad'>): Promise<Plantilla> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const nuevaPlantilla: Plantilla = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      usos: 0,
      efectividad: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return nuevaPlantilla;
  }

  // PUT /api/entrenamiento/plantillas/:id
  async updatePlantilla(id: string, data: Partial<Plantilla>): Promise<Plantilla> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const plantillaActualizada: Plantilla = {
      id,
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      tipo: data.tipo || 'Fuerza',
      nivel: data.nivel || 'Intermedio',
      duracion: data.duracion || '',
      categoria: data.categoria || '',
      usos: data.usos || 0,
      efectividad: data.efectividad || 0,
      version: data.version || '1.0',
      ejercicios: data.ejercicios || [],
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      autor: data.autor
    };

    return plantillaActualizada;
  }

  // DELETE /api/entrenamiento/plantillas/:id
  async deletePlantilla(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      success: true,
      message: `Plantilla ${id} eliminada correctamente`
    };
  }

  // GET /api/entrenamiento/plantillas/:id
  async getPlantillaById(id: string): Promise<Plantilla> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const plantilla: Plantilla = {
      id,
      nombre: 'Hipertrofia 12 Semanas',
      descripcion: 'Programa completo de hipertrofia muscular de 12 semanas',
      tipo: 'Fuerza',
      nivel: 'Intermedio',
      duracion: '12 semanas',
      categoria: 'Fuerza',
      usos: 45,
      efectividad: 92,
      version: '2.1',
      ejercicios: [
        {
          id: '1',
          nombre: 'Press Banca',
          series: 4,
          repeticiones: '8-10',
          descanso: '90s',
          notas: 'Enfocarse en la técnica'
        },
        {
          id: '2',
          nombre: 'Press Inclinado con Mancuernas',
          series: 3,
          repeticiones: '10-12',
          descanso: '60s'
        }
      ],
      createdAt: '2025-09-01',
      updatedAt: '2025-10-15',
      autor: 'María Coach'
    };

    return plantilla;
  }

  // POST /api/entrenamiento/plantillas/duplicar
  async duplicarPlantilla(id: string, nuevoNombre: string, nuevaDescripcion: string): Promise<Plantilla> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const plantillaOriginal = await this.getPlantillaById(id);
    const plantillaDuplicada: Plantilla = {
      ...plantillaOriginal,
      id: Math.random().toString(36).substr(2, 9),
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion,
      usos: 0,
      efectividad: 0,
      version: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return plantillaDuplicada;
  }

  // POST /api/entrenamiento/plantillas/compartir
  async compartirPlantilla(id: string, destinatarios: string[]): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      success: true,
      message: `Plantilla compartida con ${destinatarios.length} usuarios`
    };
  }
}

export const plantillasAPI = new PlantillasAPI();

