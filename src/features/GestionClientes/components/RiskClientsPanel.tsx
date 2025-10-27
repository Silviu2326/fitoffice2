import { useState } from 'react';
import { AlertTriangle, Calendar, Activity, Mail, Phone, Clock, TrendingDown } from 'lucide-react';

interface ClienteRiesgo {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  planActual: string;
  diasInactivo: number;
  ultimaSesion: string;
  adherenciaAnterior: number;
  adherenciaActual: number;
  motivosRiesgo: string[];
  nivelRiesgo: 'bajo' | 'medio' | 'alto';
}

export default function RiskClientsPanel() {
  const [clientesRiesgo] = useState<ClienteRiesgo[]>([
    {
      id: '1',
      nombre: 'Laura González',
      email: 'laura@email.com',
      telefono: '+34 677 222 333',
      planActual: 'Plan Estándar - 3 sesiones/semana',
      diasInactivo: 15,
      ultimaSesion: '2025-10-10',
      adherenciaAnterior: 85,
      adherenciaActual: 45,
      motivosRiesgo: ['Inactividad prolongada', 'Caída de adherencia >40%', 'No responde mensajes'],
      nivelRiesgo: 'alto'
    },
    {
      id: '2',
      nombre: 'Pedro Sánchez',
      email: 'pedro@email.com',
      telefono: '+34 666 777 888',
      planActual: 'Plan Premium - 5 sesiones/semana',
      diasInactivo: 8,
      ultimaSesion: '2025-10-17',
      adherenciaAnterior: 90,
      adherenciaActual: 65,
      motivosRiesgo: ['Reducción de sesiones', 'Cancelaciones frecuentes'],
      nivelRiesgo: 'medio'
    },
    {
      id: '3',
      nombre: 'Isabel Moreno',
      email: 'isabel@email.com',
      telefono: '+34 699 888 999',
      planActual: 'Plan Básico - 2 sesiones/semana',
      diasInactivo: 5,
      ultimaSesion: '2025-10-20',
      adherenciaAnterior: 78,
      adherenciaActual: 60,
      motivosRiesgo: ['Cambio de horarios', 'Baja participación'],
      nivelRiesgo: 'bajo'
    }
  ]);

  const getRiesgoColor = (nivel: string) => {
    switch (nivel) {
      case 'alto':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medio':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'bajo':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const estadisticas = {
    total: clientesRiesgo.length,
    alto: clientesRiesgo.filter(c => c.nivelRiesgo === 'alto').length,
    medio: clientesRiesgo.filter(c => c.nivelRiesgo === 'medio').length,
    bajo: clientesRiesgo.filter(c => c.nivelRiesgo === 'bajo').length
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
              Clientes en Riesgo
            </h2>
            <p className="text-slate-600 mt-1">Identificación automática de clientes con riesgo de baja</p>
          </div>
        </div>

        {/* Estadísticas de riesgo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total en Riesgo</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Riesgo Alto</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.alto}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Riesgo Medio</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.medio}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Riesgo Bajo</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.bajo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de clientes en riesgo */}
      <div className="p-6">
        <div className="space-y-4">
          {clientesRiesgo.map((cliente) => (
            <div
              key={cliente.id}
              className="p-5 bg-amber-50 rounded-lg border-2 border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{cliente.nombre}</h3>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border-2 ${getRiesgoColor(cliente.nivelRiesgo)}`}>
                      <AlertTriangle className="w-3 h-3" />
                      RIESGO {cliente.nivelRiesgo.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{cliente.planActual}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <Clock className="w-5 h-5" />
                    <span>{cliente.diasInactivo} días inactivo</span>
                  </div>
                </div>
              </div>

              {/* Contacto e información */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Mail className="w-4 h-4" />
                    <span>{cliente.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Phone className="w-4 h-4" />
                    <span>{cliente.telefono}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4" />
                    <span>Última sesión: {new Date(cliente.ultimaSesion).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
                    <TrendingDown className="w-4 h-4" />
                    <span>Adherencia: {cliente.adherenciaAnterior}% → {cliente.adherenciaActual}%</span>
                  </div>
                </div>
              </div>

              {/* Motivos de riesgo */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Motivos de riesgo detectados:</p>
                <div className="flex flex-wrap gap-2">
                  {cliente.motivosRiesgo.map((motivo, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded-full text-xs font-medium"
                    >
                      {motivo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comparativa de adherencia */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Adherencia Anterior</span>
                      <span className="text-xs font-semibold text-emerald-600">{cliente.adherenciaAnterior}%</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${cliente.adherenciaAnterior}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Adherencia Actual</span>
                      <span className="text-xs font-semibold text-red-600">{cliente.adherenciaActual}%</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${cliente.adherenciaActual}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones de retención */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                  Activar Plan de Retención
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Contactar
                </button>
                <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

