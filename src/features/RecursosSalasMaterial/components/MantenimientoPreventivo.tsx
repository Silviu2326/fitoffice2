import { useState } from 'react';
import { Wrench, Calendar, Clock, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';
import { type MantenimientoPreventivo as Mantenimiento } from '../api/mantenimiento';

export default function MantenimientoPreventivo() {
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'pendiente' | 'completado'>('pendiente');

  // Datos de ejemplo
  const mantenimientosMock: Mantenimiento[] = [
    {
      id: '1',
      recursoId: '1',
      recursoNombre: 'Cintas de Correr',
      tipo: 'mensual',
      descripcion: 'Lubricación de banda y revisión de motor',
      ultimaEjecucion: new Date('2025-09-26'),
      proximaEjecucion: new Date('2025-10-26'),
      estado: 'pendiente',
      responsable: 'Técnico Juan',
      tareas: [
        'Limpiar banda y rodillos',
        'Aplicar lubricante específico',
        'Revisar tensión de la banda',
        'Verificar funcionamiento del motor',
        'Comprobar panel de control'
      ],
      duracionEstimada: 45,
      costoEstimado: 80
    },
    {
      id: '2',
      recursoId: '2',
      recursoNombre: 'Bicicletas Estáticas',
      tipo: 'semanal',
      descripcion: 'Ajuste y revisión de pedales y sillín',
      ultimaEjecucion: new Date('2025-10-19'),
      proximaEjecucion: new Date('2025-10-27'),
      estado: 'pendiente',
      responsable: 'Equipo Mantenimiento',
      tareas: [
        'Revisar apriete de pedales',
        'Ajustar altura de sillines',
        'Verificar sistema de resistencia',
        'Limpiar y engrasar cadena'
      ],
      duracionEstimada: 30,
      costoEstimado: 40
    },
    {
      id: '3',
      recursoId: '5',
      recursoNombre: 'Equipamiento de Boxeo',
      tipo: 'trimestral',
      descripcion: 'Revisión integral de sacos y ring',
      ultimaEjecucion: new Date('2025-07-26'),
      proximaEjecucion: new Date('2025-10-26'),
      estado: 'en_progreso',
      responsable: 'Mantenimiento General S.L.',
      tareas: [
        'Revisar anclajes de sacos',
        'Comprobar estado de cuerdas del ring',
        'Revisar tatami y suelo',
        'Verificar guantes y protecciones'
      ],
      duracionEstimada: 120,
      costoEstimado: 200
    },
    {
      id: '4',
      recursoId: '10',
      recursoNombre: 'Sistema de Ventilación Sala Principal',
      tipo: 'mensual',
      descripcion: 'Limpieza de filtros y revisión de sistema',
      ultimaEjecucion: new Date('2025-10-15'),
      proximaEjecucion: new Date('2025-11-15'),
      estado: 'completado',
      responsable: 'Climatización Pro',
      tareas: [
        'Limpiar filtros de aire',
        'Revisar conductos',
        'Verificar temperatura',
        'Comprobar nivel de ruido'
      ],
      duracionEstimada: 60
    }
  ];

  const mantenimientosFiltrados = mantenimientosMock.filter(mant => {
    if (filtroEstado === 'todos') return true;
    return mant.estado === filtroEstado;
  });

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'diario':
        return 'bg-blue-100 text-blue-700';
      case 'semanal':
        return 'bg-green-100 text-green-700';
      case 'mensual':
        return 'bg-purple-100 text-purple-700';
      case 'trimestral':
        return 'bg-orange-100 text-orange-700';
      case 'anual':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Pendiente
          </span>
        );
      case 'en_progreso':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Wrench className="w-4 h-4" />
            En Progreso
          </span>
        );
      case 'completado':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Completado
          </span>
        );
      default:
        return null;
    }
  };

  const formatFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const diasHastaMantenimiento = (fecha: Date) => {
    const hoy = new Date();
    const proxima = new Date(fecha);
    const diff = Math.ceil((proxima.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Mantenimiento Preventivo</h2>
          <p className="text-[#64748B] text-[14px] leading-5 mt-1">Programa y gestiona el mantenimiento de recursos</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200"
          style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
          <Plus className="w-5 h-5" />
          Programar Mantenimiento
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {mantenimientosMock.filter(m => m.estado === 'pendiente').length}
          </div>
          <div className="text-[#FEF3C7] text-[14px] leading-5">Pendientes</div>
        </div>

        <div className="bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Wrench className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {mantenimientosMock.filter(m => m.estado === 'en_progreso').length}
          </div>
          <div className="text-[#DBEAFE] text-[14px] leading-5">En Progreso</div>
        </div>

        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {mantenimientosMock.filter(m => m.estado === 'completado').length}
          </div>
          <div className="text-[#D1FAE5] text-[14px] leading-5">Completados</div>
        </div>

        <div className="bg-gradient-to-br from-[#A855F7] to-[#EC4899] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {mantenimientosMock.filter(m => {
              const dias = diasHastaMantenimiento(m.proximaEjecucion);
              return dias <= 7 && m.estado === 'pendiente';
            }).length}
          </div>
          <div className="text-[#F3E8FF] text-[14px] leading-5">Próximos 7 días</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <button
          onClick={() => setFiltroEstado('todos')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'todos'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltroEstado('pendiente')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'pendiente'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFiltroEstado('completado')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'completado'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Completados
        </button>
      </div>

      {/* Lista de mantenimientos */}
      <div className="space-y-4">
        {mantenimientosFiltrados.map(mant => {
          const dias = diasHastaMantenimiento(mant.proximaEjecucion);
          const esUrgente = dias <= 7 && dias >= 0 && mant.estado === 'pendiente';
          const estaAtrasado = dias < 0 && mant.estado === 'pendiente';

          return (
            <div
              key={mant.id}
              className={`bg-white rounded-lg border-2 p-6 hover:shadow-lg transition-shadow ${
                estaAtrasado ? 'border-red-300 bg-red-50' :
                esUrgente ? 'border-amber-300 bg-amber-50' :
                'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                      {mant.recursoNombre}
                    </h3>
                    <p className="text-slate-600 mb-2">{mant.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTipoColor(mant.tipo)}`}>
                        {mant.tipo.charAt(0).toUpperCase() + mant.tipo.slice(1)}
                      </span>
                      {getEstadoBadge(mant.estado)}
                    </div>
                  </div>
                </div>
                {mant.costoEstimado && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{mant.costoEstimado}€</div>
                    <div className="text-xs text-slate-500">Estimado</div>
                  </div>
                )}
              </div>

              {/* Alertas de urgencia */}
              {estaAtrasado && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold">
                    ATRASADO - Hace {Math.abs(dias)} días
                  </span>
                </div>
              )}
              {esUrgente && !estaAtrasado && (
                <div className="mb-4 p-3 bg-amber-100 border border-amber-300 rounded-lg flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold">
                    Urgente - Faltan {dias} días
                  </span>
                </div>
              )}

              {/* Información de fechas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-600">Última ejecución</div>
                    <div className="font-medium text-slate-900">
                      {mant.ultimaEjecucion ? formatFecha(mant.ultimaEjecucion) : 'Nunca'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="text-xs text-slate-600">Próxima ejecución</div>
                    <div className="font-medium text-slate-900">{formatFecha(mant.proximaEjecucion)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-600">Duración estimada</div>
                    <div className="font-medium text-slate-900">{mant.duracionEstimada} min</div>
                  </div>
                </div>
              </div>

              {/* Responsable */}
              {mant.responsable && (
                <div className="mb-4">
                  <span className="text-sm text-slate-600">Responsable: </span>
                  <span className="text-sm font-medium text-slate-900">{mant.responsable}</span>
                </div>
              )}

              {/* Lista de tareas */}
              <div className="mb-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Tareas a realizar
                </h4>
                <ul className="space-y-1">
                  {mant.tareas.map((tarea, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>{tarea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de acción */}
              {mant.estado === 'pendiente' && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 text-[14px] leading-5 font-semibold">
                    Iniciar Mantenimiento
                  </button>
                  <button className="px-4 py-2 bg-[#64748B] text-white rounded-xl hover:bg-[#475569] transition-all duration-200 text-[14px] leading-5 font-semibold">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] transition-all duration-200 text-[14px] leading-5 font-semibold">
                    Cancelar
                  </button>
                </div>
              )}

              {mant.estado === 'en_progreso' && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-[14px] leading-5 font-semibold">
                    Marcar como Completado
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mantenimientosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No hay mantenimientos {filtroEstado !== 'todos' && filtroEstado + 's'}</p>
        </div>
      )}
    </div>
  );
}

