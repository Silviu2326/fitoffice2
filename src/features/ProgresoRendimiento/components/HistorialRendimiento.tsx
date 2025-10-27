import { Clock, Calendar, TrendingUp, Activity } from 'lucide-react';

export default function HistorialRendimiento() {
  const historial = [
    { fecha: '2025-10-26', tipo: 'Entrenamiento', ejercicio: 'Press Banca', resultado: '90kg x 5', progreso: '+5kg', color: 'emerald' },
    { fecha: '2025-10-24', tipo: 'Evaluación', ejercicio: 'Sentadilla', resultado: '120kg x 3', progreso: '+10kg', color: 'blue' },
    { fecha: '2025-10-22', tipo: 'Entrenamiento', ejercicio: 'Peso Muerto', resultado: '140kg x 4', progreso: '+8kg', color: 'purple' },
    { fecha: '2025-10-20', tipo: 'Evaluación', ejercicio: 'Press Militar', resultado: '60kg x 6', progreso: '+3kg', color: 'orange' },
    { fecha: '2025-10-18', tipo: 'Entrenamiento', ejercicio: 'Dominadas', resultado: '12 reps', progreso: '+2 reps', color: 'pink' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-emerald-500" />
          Historial de Rendimiento
        </h2>
        <div className="flex gap-2">
          <button className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700">
            Filtrar
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
            Exportar
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-xs text-slate-400">Total Sesiones</p>
                <p className="text-xl font-bold text-white">125</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-slate-400">Mejora Promedio</p>
                <p className="text-xl font-bold text-white">+12%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-slate-400">Racha Actual</p>
                <p className="text-xl font-bold text-white">14 días</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-slate-400">Tiempo Total</p>
                <p className="text-xl font-bold text-white">187h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de historial */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Registros Recientes</h3>
          <div className="space-y-2">
            {historial.map((item, index) => (
              <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`bg-${item.color}-500/10 p-2 rounded-lg`}>
                      <Activity className={`w-5 h-5 text-${item.color}-500`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold">{item.ejercicio}</h4>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                          {item.tipo}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{item.resultado}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{item.progreso}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{item.fecha}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">Mostrando 5 de 125 registros</p>
          <div className="flex gap-2">
            <button className="bg-slate-900 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors border border-slate-700">
              Anterior
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

