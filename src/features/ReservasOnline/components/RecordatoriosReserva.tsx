import { Bell, Calendar, Clock, Mail, MessageSquare, CheckCircle, Settings } from 'lucide-react';
import { useState } from 'react';

interface Recordatorio {
  id: string;
  tipo: 'email' | 'sms' | 'notificacion';
  cliente: string;
  servicio: string;
  fecha: string;
  hora: string;
  horasAntes: number;
  estado: 'pendiente' | 'enviado' | 'fallido';
  fechaEnvio?: string;
}

export default function RecordatoriosReserva() {
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // Datos de ejemplo
  const recordatorios: Recordatorio[] = [
    {
      id: '1',
      tipo: 'email',
      cliente: 'Ana García',
      servicio: 'Evaluación Inicial',
      fecha: '2025-10-27',
      hora: '10:00',
      horasAntes: 24,
      estado: 'enviado',
      fechaEnvio: '2025-10-26 10:00',
    },
    {
      id: '2',
      tipo: 'sms',
      cliente: 'Carlos Ruiz',
      servicio: 'Seguimiento Mensual',
      fecha: '2025-10-27',
      hora: '12:00',
      horasAntes: 24,
      estado: 'pendiente',
    },
    {
      id: '3',
      tipo: 'notificacion',
      cliente: 'María López',
      servicio: 'Spinning',
      fecha: '2025-10-28',
      hora: '18:00',
      horasAntes: 2,
      estado: 'pendiente',
    },
    {
      id: '4',
      tipo: 'email',
      cliente: 'Pedro Martínez',
      servicio: 'HIIT',
      fecha: '2025-10-28',
      hora: '07:00',
      horasAntes: 24,
      estado: 'fallido',
    },
  ];

  const recordatoriosFiltrados = recordatorios.filter((recordatorio) => {
    if (filtroEstado === 'todos') return true;
    return recordatorio.estado === filtroEstado;
  });

  const totalRecordatorios = recordatoriosFiltrados.length;
  const enviados = recordatoriosFiltrados.filter(r => r.estado === 'enviado').length;
  const pendientes = recordatoriosFiltrados.filter(r => r.estado === 'pendiente').length;
  const fallidos = recordatoriosFiltrados.filter(r => r.estado === 'fallido').length;

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5" />;
      case 'notificacion':
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'enviado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'fallido':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return 'bg-blue-100 text-blue-700';
      case 'sms':
        return 'bg-purple-100 text-purple-700';
      case 'notificacion':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Recordatorios</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{totalRecordatorios}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Enviados</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{enviados}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendientes}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Fallidos</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{fallidos}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de Recordatorios */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Configuración Automática</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span><strong>Email:</strong> 24 horas antes de la cita</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span><strong>SMS:</strong> 2 horas antes de la cita</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span><strong>Notificación Push:</strong> 1 hora antes de la cita</span>
                </div>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            Editar Configuración
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Filtrar por estado:</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todos los estados</option>
            <option value="enviado">Enviados</option>
            <option value="pendiente">Pendientes</option>
            <option value="fallido">Fallidos</option>
          </select>
        </div>
      </div>

      {/* Lista de Recordatorios */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Fecha & Hora Cita
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Envío Programado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recordatoriosFiltrados.map((recordatorio) => (
                <tr key={recordatorio.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{recordatorio.cliente}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700">{recordatorio.servicio}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(recordatorio.fecha).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{recordatorio.hora}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getColorTipo(recordatorio.tipo)}`}>
                      {getIconoTipo(recordatorio.tipo)}
                      <span className="capitalize">{recordatorio.tipo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">
                      {recordatorio.horasAntes}h antes
                    </p>
                    {recordatorio.fechaEnvio && (
                      <p className="text-xs text-slate-500 mt-1">
                        Enviado: {recordatorio.fechaEnvio}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getColorEstado(recordatorio.estado)}`}>
                      {recordatorio.estado === 'enviado' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {recordatorio.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {recordatorio.estado === 'pendiente' && (
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                        Enviar Ahora
                      </button>
                    )}
                    {recordatorio.estado === 'fallido' && (
                      <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                        Reintentar
                      </button>
                    )}
                    {recordatorio.estado === 'enviado' && (
                      <span className="text-slate-400 text-sm">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recordatoriosFiltrados.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No hay recordatorios</h3>
            <p className="text-slate-600">No se encontraron recordatorios con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  );
}

