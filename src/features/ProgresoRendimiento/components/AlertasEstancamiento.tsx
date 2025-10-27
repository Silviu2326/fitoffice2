import { AlertTriangle, Bell, CheckCircle, XCircle } from 'lucide-react';

export default function AlertasEstancamiento() {
  const alertas = [
    {
      id: 1,
      tipo: 'estancamiento',
      ejercicio: 'Press Militar',
      dias: 21,
      ultimoProgreso: '2025-10-05',
      prioridad: 'alta',
      activa: true,
    },
    {
      id: 2,
      tipo: 'meseta',
      ejercicio: 'Curl Bíceps',
      dias: 14,
      ultimoProgreso: '2025-10-12',
      prioridad: 'media',
      activa: true,
    },
    {
      id: 3,
      tipo: 'regresión',
      ejercicio: 'Movilidad Cadera',
      dias: 7,
      ultimoProgreso: '2025-10-19',
      prioridad: 'alta',
      activa: true,
    },
  ];

  const alertasResueltas = [
    {
      id: 4,
      tipo: 'estancamiento',
      ejercicio: 'Sentadilla',
      fechaResolucion: '2025-10-20',
      solucion: 'Ajuste de volumen y periodización',
    },
  ];

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'red';
      case 'media':
        return 'yellow';
      case 'baja':
        return 'blue';
      default:
        return 'slate';
    }
  };

  const getPrioridadTexto = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'Alta';
      case 'media':
        return 'Media';
      case 'baja':
        return 'Baja';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          Alertas de Estancamiento
        </h2>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="text-sm text-slate-400">
            {alertas.filter(a => a.activa).length} alertas activas
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Resumen de alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-red-400">Prioridad Alta</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-sm text-yellow-400">Prioridad Media</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-400">Resueltas</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas activas */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Alertas Activas</h3>
          {alertas.map((alerta) => (
            <div key={alerta.id} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`bg-${getPrioridadColor(alerta.prioridad)}-500/10 p-2 rounded-lg`}>
                    <AlertTriangle className={`w-5 h-5 text-${getPrioridadColor(alerta.prioridad)}-500`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">{alerta.ejercicio}</h4>
                      <span className={`text-xs bg-${getPrioridadColor(alerta.prioridad)}-500/10 text-${getPrioridadColor(alerta.prioridad)}-400 px-2 py-1 rounded`}>
                        {getPrioridadTexto(alerta.prioridad)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Sin progreso durante {alerta.dias} días
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Último progreso: {alerta.ultimoProgreso}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                    Resolver
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>

              {/* Sugerencias */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-sm text-slate-300 mb-2">Sugerencias:</p>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li>• Aumentar la intensidad (peso o repeticiones)</li>
                  <li>• Cambiar el rango de repeticiones</li>
                  <li>• Probar variantes del ejercicio</li>
                  <li>• Revisar técnica de ejecución</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Alertas resueltas */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Alertas Resueltas Recientemente</h3>
          {alertasResueltas.map((alerta) => (
            <div key={alerta.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{alerta.ejercicio}</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Resuelto el {alerta.fechaResolucion}
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">
                    Solución: {alerta.solucion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Configuración de alertas */}
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Configuración de Alertas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Días sin progreso para alerta:</span>
              <select className="bg-slate-800 text-white px-3 py-1 rounded border border-slate-700">
                <option>7 días</option>
                <option>14 días</option>
                <option selected>21 días</option>
                <option>30 días</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Notificaciones por email:</span>
              <button className="bg-emerald-600 text-white px-3 py-1 rounded text-xs">
                Activadas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

