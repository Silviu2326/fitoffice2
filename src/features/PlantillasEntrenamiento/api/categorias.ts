// API Mock para gestión de categorías de plantillas

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  icono: string;
  plantillasCount: number;
}

class CategoriasAPI {
  // GET /api/entrenamiento/plantillas/categorias
  async getCategorias(): Promise<Categoria[]> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const categorias: Categoria[] = [
      {
        id: '1',
        nombre: 'Fuerza',
        descripcion: 'Programas enfocados en ganancia de fuerza muscular',
        color: 'emerald',
        icono: 'Dumbbell',
        plantillasCount: 12
      },
      {
        id: '2',
        nombre: 'Hipertrofia',
        descripcion: 'Programas para aumento de masa muscular',
        color: 'orange',
        icono: 'Flame',
        plantillasCount: 8
      },
      {
        id: '3',
        nombre: 'Cardio',
        descripcion: 'Entrenamientos cardiovasculares y de resistencia',
        color: 'red',
        icono: 'Heart',
        plantillasCount: 6
      },
      {
        id: '4',
        nombre: 'Movilidad',
        descripcion: 'Programas de movilidad, flexibilidad y rango de movimiento',
        color: 'blue',
        icono: 'Zap',
        plantillasCount: 5
      },
      {
        id: '5',
        nombre: 'Funcional',
        descripcion: 'Entrenamiento funcional y movimientos compuestos',
        color: 'purple',
        icono: 'Target',
        plantillasCount: 9
      }
    ];

    return categorias;
  }

  // POST /api/entrenamiento/plantillas/categorias
  async createCategoria(data: Omit<Categoria, 'id' | 'plantillasCount'>): Promise<Categoria> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const nuevaCategoria: Categoria = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      plantillasCount: 0
    };

    return nuevaCategoria;
  }

  // PUT /api/entrenamiento/plantillas/categorias/:id
  async updateCategoria(id: string, data: Partial<Categoria>): Promise<Categoria> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const categoriaActualizada: Categoria = {
      id,
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      color: data.color || 'slate',
      icono: data.icono || 'Target',
      plantillasCount: data.plantillasCount || 0
    };

    return categoriaActualizada;
  }

  // DELETE /api/entrenamiento/plantillas/categorias/:id
  async deleteCategoria(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    return {
      success: true,
      message: `Categoría ${id} eliminada correctamente`
    };
  }
}

export const categoriasAPI = new CategoriasAPI();

