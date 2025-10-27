import { useState } from 'react';
import { UserX, Calendar, TrendingDown, FileText, Search } from 'lucide-react';

interface ClientePerdido {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  planAnterior: string;
  fechaBaja: string;
  motivoBaja: string;
  tiempoComoCliente: number;
  valorTotal: number;
  intentosRecuperacion: number;
  posibilidadRetorno: 'baja' | 'media' | 'alta';
}

export default function LostClientsManager() {
  const [clientesPerdidos] = useState<ClientePerdido[]>([
    {
      id: '1',
      nombre: 'Ana Martínez',
      email: 'ana@email.com',
      telefono: '+34 699 444 555',
      planAnterior: 'Plan Básico - 2 sesiones/semana',
      fechaBaja: '2025-09-15',
      motivoBaja: 'Problemas económicos',
      tiempoComoCliente: 9,
      valorTotal: 1350.00,
      intentosRecuperacion: 2,
      posibilidadRetorno: 'media'
    },
    {
      id: '2',
      nombre: 'Roberto García',
      email: 'roberto@email.com',
      telefono: '+34 655 111 222',
      planAnterior: 'Plan Premium - 5 sesiones/semana',
      fechaBaja: '2025-08-20',
      motivoBaja: 'Mudanza a otra ciudad',
      tiempoComoCliente: 14,
      valorTotal: 3200.00,
      intentosRecuperacion: 0,
      posibilidadRetorno: 'baja'
    },
    {
      id: '3',
      nombre: 'Sofia Ruiz',
      email: 'sofia@email.com',
      telefono: '+34 677 333 444',
      planAnterior: 'Plan Estándar - 3 sesiones/semana',
      fechaBaja: '2025-09-30',
      motivoBaja: 'Falta de tiempo',
      tiempoComoCliente: 6,
      valorTotal: 900.00,
      intentosRecuperacion: 1,
      posibilidadRetorno: 'alta'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = clientesPerdidos.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPosibilidadColor = (posibilidad: string) => {
    switch (posibilidad) {
      case 'alta':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'media':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'baja':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const estadisticas = {
    total: clientesPerdidos.length,
    valorPerdido: clientesPerdidos.reduce((sum, c) => sum + c.valorTotal, 0),
    tiempoPromedio: Math.round(
      clientesPerdidos.reduce((sum, c) => sum + c.tiempoComoCliente, 0) / clientesPerdidos.length
    ),
    recuperables: clientesPerdidos.filter(c => c.posibilidadRetorno === 'alta').length
  };

  const motivosBaja = clientesPerdidos.reduce((acc, cliente) => {
    acc[cliente.motivoBaja] = (acc[cliente.motivoBaja] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <UserX className="w-7 h-7 text-red-600" />
              Clientes Perdidos
            </h2>
            <p className="text-slate-600 mt-1">Gestión de bajas con análisis de motivos y oportunidades de recuperación</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <UserX className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clientes Perdidos</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Valor Perdido</p>
                <p className="text-xl font-bold text-slate-900">€{estadisticas.valorPerdido.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tiempo Promedio</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.tiempoPromedio} meses</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Recuperables</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.recuperables}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Análisis de motivos de baja */}
        <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Motivos de Baja Más Frecuentes</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(motivosBaja).map(([motivo, count]) => (
              <div key={motivo} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg">
                <span className="text-sm text-slate-700">{motivo}</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buscador */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar clientes perdidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Lista de clientes perdidos */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredClientes.map((cliente) => (
            <div
              key={cliente.id}
              className="p-5 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{cliente.nombre}</h3>
                    <span className="px-3 py-1 bg-red-200 text-red-900 border border-red-300 rounded-full text-xs font-bold">
                      CLIENTE PERDIDO
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPosibilidadColor(cliente.posibilidadRetorno)}`}>
                      Retorno {cliente.posibilidadRetorno}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Plan anterior: {cliente.planAnterior}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Fecha de Baja</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(cliente.fechaBaja).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Motivo de Baja</p>
                  <div className="text-sm text-slate-700 font-medium">
                    {cliente.motivoBaja}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Tiempo como Cliente</p>
                  <div className="text-sm text-slate-700">
                    <strong>{cliente.tiempoComoCliente}</strong> meses
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Valor Total Generado</p>
                  <div className="text-sm text-slate-700 font-bold">
                    €{cliente.valorTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Información de recuperación */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Intentos de Recuperación</p>
                      <p className="text-lg font-bold text-slate-900">{cliente.intentosRecuperacion}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Posibilidad de Retorno</p>
                      <p className="text-lg font-bold text-slate-900 capitalize">{cliente.posibilidadRetorno}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                  Iniciar Campaña de Recuperación
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Ver Historial
                </button>
                <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                  Análisis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

