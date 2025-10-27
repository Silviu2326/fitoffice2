// API Mock para asignaciones de programas

export interface Asignacion {
  id: string;
  programaId: string;
  clienteId: string;
  fechaInicio: string;
  fechaFin?: string;
  estado: 'activa' | 'completada' | 'pausada' | 'cancelada';
  progreso: number;
  notas?: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  avatar?: string;
  programasActivos: number;
}

class AsignacionesAPI {
  // GET /api/entrenamiento/asignaciones
  async getAsignaciones(filters?: {
    programaId?: string;
    clienteId?: string;
    estado?: string;
  }): Promise<Asignacion[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const asignaciones: Asignacion[] = [
      {
        id: '1',
        programaId: '1',
        clienteId: '1',
        fechaInicio: '2025-10-01',
        estado: 'activa',
        progreso: 65,
        notas: 'Cliente avanzando bien'
      },
      {
        id: '2',
        programaId: '2',
        clienteId: '2',
        fechaInicio: '2025-09-15',
        estado: 'activa',
        progreso: 40,
        notas: 'Rehabilitación en curso'
      },
      {
        id: '3',
        programaId: '3',
        clienteId: '3',
        fechaInicio: '2025-10-10',
        fechaFin: '2025-10-17',
        estado: 'completada',
        progreso: 100
      }
    ];

    // Aplicar filtros
    let resultado = asignaciones;
    if (filters?.programaId) {
      resultado = resultado.filter(a => a.programaId === filters.programaId);
    }
    if (filters?.clienteId) {
      resultado = resultado.filter(a => a.clienteId === filters.clienteId);
    }
    if (filters?.estado) {
      resultado = resultado.filter(a => a.estado === filters.estado);
    }

    return resultado;
  }

  // POST /api/entrenamiento/asignar
  async asignarPrograma(
    programaId: string,
    clienteId: string,
    fechaInicio?: string
  ): Promise<Asignacion> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const nuevaAsignacion: Asignacion = {
      id: Math.random().toString(36).substr(2, 9),
      programaId,
      clienteId,
      fechaInicio: fechaInicio || new Date().toISOString().split('T')[0],
      estado: 'activa',
      progreso: 0
    };

    return nuevaAsignacion;
  }

  // GET /api/entrenamiento/programas/cliente/:id
  async getProgramasByCliente(clienteId: string): Promise<Asignacion[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return this.getAsignaciones({ clienteId });
  }

  // GET /api/entrenamiento/programas/grupo/:id
  async getProgramasByGrupo(grupoId: string): Promise<Asignacion[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const asignaciones: Asignacion[] = [
      {
        id: '4',
        programaId: '3',
        clienteId: grupoId,
        fechaInicio: '2025-10-01',
        estado: 'activa',
        progreso: 45
      }
    ];

    return asignaciones;
  }

  // GET /api/clientes - Para el modal de asignación
  async getClientes(busqueda?: string): Promise<Cliente[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const clientes: Cliente[] = [
      {
        id: '1',
        nombre: 'Carla Martínez',
        email: 'carla@example.com',
        telefono: '+34 600 123 456',
        programasActivos: 1
      },
      {
        id: '2',
        nombre: 'Miguel Sánchez',
        email: 'miguel@example.com',
        telefono: '+34 600 234 567',
        programasActivos: 2
      },
      {
        id: '3',
        nombre: 'Laura Pérez',
        email: 'laura@example.com',
        telefono: '+34 600 345 678',
        programasActivos: 0
      },
      {
        id: '4',
        nombre: 'David García',
        email: 'david@example.com',
        telefono: '+34 600 456 789',
        programasActivos: 1
      },
      {
        id: '5',
        nombre: 'Ana López',
        email: 'ana@example.com',
        telefono: '+34 600 567 890',
        programasActivos: 1
      }
    ];

    // Filtrar por búsqueda si existe
    if (busqueda) {
      const termino = busqueda.toLowerCase();
      return clientes.filter(
        c =>
          c.nombre.toLowerCase().includes(termino) ||
          c.email.toLowerCase().includes(termino)
      );
    }

    return clientes;
  }

  // PUT /api/entrenamiento/asignaciones/:id
  async updateAsignacion(
    id: string,
    data: Partial<Asignacion>
  ): Promise<Asignacion> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const asignacionActualizada: Asignacion = {
      id,
      programaId: data.programaId || '',
      clienteId: data.clienteId || '',
      fechaInicio: data.fechaInicio || new Date().toISOString().split('T')[0],
      fechaFin: data.fechaFin,
      estado: data.estado || 'activa',
      progreso: data.progreso || 0,
      notas: data.notas
    };

    return asignacionActualizada;
  }

  // DELETE /api/entrenamiento/asignaciones/:id
  async deleteAsignacion(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      success: true,
      message: `Asignación ${id} eliminada correctamente`
    };
  }
}

export const asignacionesAPI = new AsignacionesAPI();

