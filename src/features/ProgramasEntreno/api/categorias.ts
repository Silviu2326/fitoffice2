// API Mock para categorías de programas

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  icono?: string;
  count?: number;
}

class CategoriasAPI {
  // GET /api/entrenamiento/programas/categorias
  async getCategorias(): Promise<Categoria[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const categorias: Categoria[] = [
      {
        id: '1',
        nombre: 'Fuerza',
        descripcion: 'Programas enfocados en desarrollo de fuerza máxima',
        color: 'red',
        icono: 'dumbbell',
        count: 5
      },
      {
        id: '2',
        nombre: 'Hipertrofia',
        descripcion: 'Programas de ganancia de masa muscular',
        color: 'purple',
        icono: 'muscle',
        count: 4
      },
      {
        id: '3',
        nombre: 'Resistencia',
        descripcion: 'Programas de entrenamiento cardiovascular y resistencia',
        color: 'blue',
        icono: 'heart',
        count: 2
      },
      {
        id: '4',
        nombre: 'CrossFit',
        descripcion: 'Programas de entrenamiento funcional de alta intensidad',
        color: 'orange',
        icono: 'flame',
        count: 3
      },
      {
        id: '5',
        nombre: 'Rehabilitación',
        descripcion: 'Programas de recuperación y prevención de lesiones',
        color: 'green',
        icono: 'shield',
        count: 1
      },
      {
        id: '6',
        nombre: 'Funcional',
        descripcion: 'Programas de movimientos funcionales y movilidad',
        color: 'teal',
        icono: 'activity',
        count: 3
      },
      {
        id: '7',
        nombre: 'Pérdida de Peso',
        descripcion: 'Programas enfocados en quema de grasa',
        color: 'yellow',
        icono: 'trending-down',
        count: 2
      },
      {
        id: '8',
        nombre: 'Iniciación',
        descripcion: 'Programas para principiantes en el gimnasio',
        color: 'emerald',
        icono: 'user-plus',
        count: 4
      }
    ];

    return categorias;
  }

  // POST /api/entrenamiento/programas/categorias
  async createCategoria(
    data: Omit<Categoria, 'id' | 'count'>
  ): Promise<Categoria> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const nuevaCategoria: Categoria = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      count: 0
    };

    return nuevaCategoria;
  }

  // PUT /api/entrenamiento/programas/categorias/:id
  async updateCategoria(
    id: string,
    data: Partial<Categoria>
  ): Promise<Categoria> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const categoriaActualizada: Categoria = {
      id,
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      color: data.color || 'slate',
      icono: data.icono,
      count: data.count || 0
    };

    return categoriaActualizada;
  }

  // DELETE /api/entrenamiento/programas/categorias/:id
  async deleteCategoria(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      success: true,
      message: `Categoría ${id} eliminada correctamente`
    };
  }

  // GET /api/entrenamiento/programas/categorias/:id
  async getCategoriaById(id: string): Promise<Categoria> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const categoria: Categoria = {
      id,
      nombre: 'Fuerza',
      descripcion: 'Programas enfocados en desarrollo de fuerza máxima',
      color: 'red',
      icono: 'dumbbell',
      count: 5
    };

    return categoria;
  }
}

export const categoriasAPI = new CategoriasAPI();

