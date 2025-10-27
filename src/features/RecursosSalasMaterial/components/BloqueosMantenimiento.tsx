import { useState } from 'react';
import { Plus, AlertTriangle, Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { type Bloqueo } from '../api/bloqueos';

export default function BloqueosMantenimiento() {
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'completado'>('activo');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Datos de ejemplo
  const bloqueosMock: Bloqueo[] = [
    {
      id: '1',
      recursoId: '5',
      recursoNombre: 'Sala de Boxeo',
      tipoBloqueo: 'mantenimiento',
      motivo: 'Revisión anual del ring y reparación de lonas',
      fechaInicio: new Date('2025-10-26'),
      fechaFin: new Date('2025-10-28'),
      estado: 'activo',
      responsable: 'Mantenimiento General S.L.',
      prioridad: 'alta',
      costoEstimado: 850,
      notas: 'Incluye cambio de cuerdas y reparación del tatami'
    },
    {
      id: '2',
      recursoId: '15',
      recursoNombre: 'Bicicletas de Spinning (unidades 5-8)',
      tipoBloqueo: 'reparacion',
      motivo: 'Ajuste de pedales y cambio de sillín',
      fechaInicio: new Date('2025-10-25'),
      fechaFin: new Date('2025-10-27'),
      estado: 'activo',
      responsable: 'Técnico Juan Pérez',
      prioridad: 'urgente',
      costoEstimado: 320
    },
    {
      id: '3',
      recursoId: '2',
      recursoNombre: 'Sala de Musculación',
      tipoBloqueo: 'limpieza',
      motivo: 'Limpieza profunda mensual',
      fechaInicio: new Date('2025-10-20'),
      fechaFin: new Date('2025-10-20'),
      estado: 'completado',
      responsable: 'Equipo de Limpieza',
      prioridad: 'media',
      costoReal: 150
    }
  ];

  const bloqueosFiltrados = bloqueosMock.filter(bloqueo => {
    if (filtroEstado === 'todos') return true;
    return bloqueo.estado === filtroEstado;
  });

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'urgente':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'alta':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'media':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'baja':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getTipoBloqueoIcon = (tipo: string) => {
    switch (tipo) {
      case 'mantenimiento':
        return <Clock className="w-5 h-5" />;
      case 'reparacion':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <XCircle className="w-5 h-5" />;
    }
  };

  const formatFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Bloqueos & Mantenimiento</h2>
          <p className="text-[#64748B] text-[14px] leading-5 mt-1">Gestión de bloqueos temporales y mantenimientos programados</p>
        </div>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200"
          style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
        >
          <Plus className="w-5 h-5" />
          Nuevo Bloqueo
        </button>
      </div>

      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {bloqueosMock.filter(b => b.estado === 'activo').length}
              </div>
              <div className="text-sm text-slate-600">Activos</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {bloqueosMock.filter(b => b.prioridad === 'urgente').length}
              </div>
              <div className="text-sm text-slate-600">Urgentes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {bloqueosMock.filter(b => b.estado === 'completado').length}
              </div>
              <div className="text-sm text-slate-600">Completados</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {bloqueosMock.length}
              </div>
              <div className="text-sm text-slate-600">Total</div>
            </div>
          </div>
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
          onClick={() => setFiltroEstado('activo')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'activo'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Activos
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

      {/* Lista de bloqueos */}
      <div className="space-y-4">
        {bloqueosFiltrados.map(bloqueo => (
          <div
            key={bloqueo.id}
            className="bg-white rounded-lg border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`p-3 ${getPrioridadColor(bloqueo.prioridad)} rounded-lg border`}>
                  {getTipoBloqueoIcon(bloqueo.tipoBloqueo)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">
                    {bloqueo.recursoNombre}
                  </h3>
                  <p className="text-slate-600 mb-2">{bloqueo.motivo}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                      {bloqueo.tipoBloqueo.charAt(0).toUpperCase() + bloqueo.tipoBloqueo.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPrioridadColor(bloqueo.prioridad)}`}>
                      Prioridad: {bloqueo.prioridad}
                    </span>
                    {bloqueo.estado === 'activo' ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                        En progreso
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                        ✓ Completado
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {(bloqueo.costoEstimado || bloqueo.costoReal) && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {bloqueo.costoReal || bloqueo.costoEstimado}€
                  </div>
                  <div className="text-xs text-slate-500">
                    {bloqueo.costoReal ? 'Costo real' : 'Estimado'}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-sm text-slate-600 mb-1">Fecha inicio</div>
                <div className="font-medium text-slate-900">{formatFecha(bloqueo.fechaInicio)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Fecha fin</div>
                <div className="font-medium text-slate-900">{formatFecha(bloqueo.fechaFin)}</div>
              </div>
              {bloqueo.responsable && (
                <div>
                  <div className="text-sm text-slate-600 mb-1">Responsable</div>
                  <div className="font-medium text-slate-900">{bloqueo.responsable}</div>
                </div>
              )}
            </div>

            {bloqueo.notas && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Notas</div>
                <p className="text-slate-700">{bloqueo.notas}</p>
              </div>
            )}

            {bloqueo.estado === 'activo' && (
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Marcar como Completado
                </button>
                <button className="px-4 py-2 bg-[#64748B] text-white rounded-xl hover:bg-[#475569] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Editar
                </button>
                <button className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Cancelar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {bloqueosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No hay bloqueos {filtroEstado !== 'todos' && filtroEstado + 's'}</p>
        </div>
      )}
    </div>
  );
}

