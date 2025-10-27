import { useState } from 'react';
import { Bell, AlertTriangle, Clock, CheckCircle, XCircle, Send } from 'lucide-react';

interface AlertaRetencion {
  id: string;
  tipo: 'inactividad' | 'baja_adherencia' | 'cancelacion' | 'pago_pendiente';
  clienteNombre: string;
  clienteId: string;
  prioridad: 'alta' | 'media' | 'baja';
  mensaje: string;
  fechaCreacion: string;
  estado: 'pendiente' | 'en_proceso' | 'completada' | 'ignorada';
  accionesSugeridas: string[];
}

export default function RetentionAlerts() {
  const [alertas, setAlertas] = useState<AlertaRetencion[]>([
    {
      id: '1',
      tipo: 'inactividad',
      clienteNombre: 'Laura González',
      clienteId: '2',
      prioridad: 'alta',
      mensaje: 'Cliente sin actividad en los últimos 15 días. Adherencia cayó del 85% al 45%.',
      fechaCreacion: '2025-10-25',
      estado: 'pendiente',
      accionesSugeridas: ['Llamada telefónica', 'Email personalizado', 'Oferta especial']
    },
    {
      id: '2',
      tipo: 'baja_adherencia',
      clienteNombre: 'Pedro Sánchez',
      clienteId: '3',
      prioridad: 'media',
      mensaje: 'Reducción significativa en adherencia. Cancelaciones frecuentes en las últimas 2 semanas.',
      fechaCreacion: '2025-10-24',
      estado: 'en_proceso',
      accionesSugeridas: ['Revisar horarios disponibles', 'Sesión de motivación', 'Ajuste de plan']
    },
    {
      id: '3',
      tipo: 'cancelacion',
      clienteNombre: 'Isabel Moreno',
      clienteId: '4',
      prioridad: 'media',
      mensaje: 'Cliente ha cancelado 3 de las últimas 5 sesiones programadas.',
      fechaCreacion: '2025-10-23',
      estado: 'pendiente',
      accionesSugeridas: ['Contactar para entender motivos', 'Flexibilizar horarios', 'Sesión online']
    },
    {
      id: '4',
      tipo: 'pago_pendiente',
      clienteNombre: 'Roberto García',
      clienteId: '5',
      prioridad: 'alta',
      mensaje: 'Pago mensual pendiente desde hace 7 días. Cliente en riesgo de baja.',
      fechaCreacion: '2025-10-22',
      estado: 'completada',
      accionesSugeridas: ['Recordatorio de pago', 'Facilidades de pago', 'Contacto directo']
    }
  ]);

  const [filtroEstado, setFiltroEstado] = useState<string>('pendiente');

  const alertasFiltradas = alertas.filter(alerta => 
    filtroEstado === 'todas' || alerta.estado === filtroEstado
  );

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'inactividad':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'baja_adherencia':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelacion':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pago_pendiente':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-600';
      case 'media':
        return 'bg-amber-500';
      case 'baja':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'en_proceso':
        return <Send className="w-5 h-5 text-blue-600" />;
      case 'completada':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'ignorada':
        return <XCircle className="w-5 h-5 text-slate-400" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const estadisticas = {
    total: alertas.length,
    pendientes: alertas.filter(a => a.estado === 'pendiente').length,
    enProceso: alertas.filter(a => a.estado === 'en_proceso').length,
    completadas: alertas.filter(a => a.estado === 'completada').length,
    prioridadAlta: alertas.filter(a => a.prioridad === 'alta' && a.estado === 'pendiente').length
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-7 h-7 text-amber-600" />
              Alertas de Retención
            </h2>
            <p className="text-slate-600 mt-1">Notificaciones automáticas para clientes en riesgo de baja</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Alertas</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Pendientes</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.pendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En Proceso</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.enProceso}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Completadas</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.completadas}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Alta Prioridad</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.prioridadAlta}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-6 flex gap-2">
          {['pendiente', 'en_proceso', 'completada', 'todas'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filtroEstado === estado
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {estado === 'todas' ? 'Todas' : estado.replace('_', ' ').charAt(0).toUpperCase() + estado.replace('_', ' ').slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de alertas */}
      <div className="p-6">
        <div className="space-y-4">
          {alertasFiltradas.map((alerta) => (
            <div
              key={alerta.id}
              className={`p-5 rounded-lg border-l-4 ${
                alerta.prioridad === 'alta' ? 'border-red-600 bg-red-50' :
                alerta.prioridad === 'media' ? 'border-amber-500 bg-amber-50' :
                'border-yellow-400 bg-yellow-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getEstadoIcon(alerta.estado)}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{alerta.clienteNombre}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTipoColor(alerta.tipo)}`}>
                        {alerta.tipo.replace('_', ' ').toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getPrioridadColor(alerta.prioridad)}`} />
                        <span className="text-xs text-slate-600 capitalize">Prioridad {alerta.prioridad}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(alerta.fechaCreacion).toLocaleDateString('es-ES')}
                </span>
              </div>

              <p className="text-sm text-slate-700 mb-4">{alerta.mensaje}</p>

              {/* Acciones sugeridas */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Acciones Sugeridas:</p>
                <div className="flex flex-wrap gap-2">
                  {alerta.accionesSugeridas.map((accion, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700"
                    >
                      {accion}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                {alerta.estado === 'pendiente' && (
                  <>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                      Iniciar Acción
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Ver Cliente
                    </button>
                    <button className="px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors text-sm font-medium">
                      Ignorar
                    </button>
                  </>
                )}
                {alerta.estado === 'en_proceso' && (
                  <>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                      Marcar Completada
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Ver Progreso
                    </button>
                  </>
                )}
                {alerta.estado === 'completada' && (
                  <span className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Acción Completada
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

