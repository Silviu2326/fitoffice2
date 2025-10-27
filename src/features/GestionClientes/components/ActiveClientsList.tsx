import { useState } from 'react';
import { Search, UserCheck, TrendingUp, Calendar, Activity, Mail, Phone } from 'lucide-react';

interface ClienteActivo {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  planActual: string;
  fechaInicio: string;
  ultimaSesion: string;
  sesionesEsteMes: number;
  proximaSesion: string;
  adherencia: number;
  objetivoCumplido: number;
}

export default function ActiveClientsList() {
  const [clientesActivos] = useState<ClienteActivo[]>([
    {
      id: '1',
      nombre: 'Carlos Pérez',
      email: 'carlos@email.com',
      telefono: '+34 666 111 222',
      planActual: 'Plan Premium - 5 sesiones/semana',
      fechaInicio: '2025-01-15',
      ultimaSesion: '2025-10-25',
      sesionesEsteMes: 18,
      proximaSesion: '2025-10-27',
      adherencia: 95,
      objetivoCumplido: 85
    },
    {
      id: '2',
      nombre: 'Miguel Ruiz',
      email: 'miguel@email.com',
      telefono: '+34 688 333 444',
      planActual: 'Plan Premium - 5 sesiones/semana',
      fechaInicio: '2025-02-10',
      ultimaSesion: '2025-10-24',
      sesionesEsteMes: 16,
      proximaSesion: '2025-10-28',
      adherencia: 88,
      objetivoCumplido: 78
    },
    {
      id: '3',
      nombre: 'Elena López',
      email: 'elena@email.com',
      telefono: '+34 677 555 666',
      planActual: 'Plan Estándar - 3 sesiones/semana',
      fechaInicio: '2025-03-05',
      ultimaSesion: '2025-10-25',
      sesionesEsteMes: 11,
      proximaSesion: '2025-10-29',
      adherencia: 92,
      objetivoCumplido: 88
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = clientesActivos.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const estadisticas = {
    total: clientesActivos.length,
    adherenciaPromedio: Math.round(
      clientesActivos.reduce((sum, c) => sum + c.adherencia, 0) / clientesActivos.length
    ),
    sesionesTotales: clientesActivos.reduce((sum, c) => sum + c.sesionesEsteMes, 0),
    objetivoPromedio: Math.round(
      clientesActivos.reduce((sum, c) => sum + c.objetivoCumplido, 0) / clientesActivos.length
    )
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Clientes Activos</h2>
            <p className="text-slate-600 mt-1">Gestión de clientes/socios activos con sus planes y estado</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clientes Activos</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Adherencia Promedio</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.adherenciaPromedio}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Sesiones Este Mes</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.sesionesTotales}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Objetivo Cumplido</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.objetivoPromedio}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar clientes activos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredClientes.map((cliente) => (
            <div
              key={cliente.id}
              className="p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{cliente.nombre}</h3>
                  <p className="text-sm text-slate-600 mt-1">{cliente.planActual}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium">
                    ACTIVO
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Contacto</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Mail className="w-4 h-4" />
                    <span>{cliente.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Phone className="w-4 h-4" />
                    <span>{cliente.telefono}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Sesiones</p>
                  <div className="text-sm text-slate-700">
                    <p><strong>{cliente.sesionesEsteMes}</strong> este mes</p>
                    <p className="text-xs">Última: {new Date(cliente.ultimaSesion).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Próxima Sesión</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(cliente.proximaSesion).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Cliente desde</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(cliente.fechaInicio).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>

              {/* Métricas de progreso */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Adherencia</span>
                    <span className="text-sm font-semibold text-emerald-600">{cliente.adherencia}%</span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${cliente.adherencia}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Objetivo Cumplido</span>
                    <span className="text-sm font-semibold text-blue-600">{cliente.objetivoCumplido}%</span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${cliente.objetivoCumplido}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

