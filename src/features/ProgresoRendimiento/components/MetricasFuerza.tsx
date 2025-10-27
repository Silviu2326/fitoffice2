import { Dumbbell, TrendingUp, Award } from 'lucide-react';

export default function MetricasFuerza() {
  const ejercicios = [
    { nombre: 'Sentadilla', peso: 120, rm: 140, progreso: '+15%', color: 'emerald' },
    { nombre: 'Press Banca', peso: 90, rm: 100, progreso: '+12%', color: 'blue' },
    { nombre: 'Peso Muerto', peso: 140, rm: 160, progreso: '+18%', color: 'purple' },
    { nombre: 'Press Militar', peso: 60, rm: 70, progreso: '+10%', color: 'orange' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-emerald-500" />
          Métricas de Fuerza
        </h2>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          Registrar RM
        </button>
      </div>

      <div className="space-y-4">
        {/* Resumen general */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-3 rounded-lg">
                <Award className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">RM Total</p>
                <p className="text-2xl font-bold text-white">470 kg</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Progreso Medio</p>
                <p className="text-2xl font-bold text-white">+13.8%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <Dumbbell className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Ejercicios</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de ejercicios */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Evolución por Ejercicio</h3>
          {ejercicios.map((ejercicio, index) => (
            <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`bg-${ejercicio.color}-500/10 p-2 rounded-lg`}>
                    <Dumbbell className={`w-5 h-5 text-${ejercicio.color}-500`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{ejercicio.nombre}</h4>
                    <p className="text-sm text-slate-400">1RM: {ejercicio.rm} kg</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-500 font-semibold">{ejercicio.progreso}</p>
                  <p className="text-sm text-slate-400">vs. mes anterior</p>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className={`bg-${ejercicio.color}-500 h-2 rounded-full`}
                  style={{ width: `${(ejercicio.peso / ejercicio.rm) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>Actual: {ejercicio.peso} kg</span>
                <span>Meta: {ejercicio.rm} kg</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de evolución */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Progreso de Fuerza (6 meses)</h3>
          <div className="h-48 flex items-end justify-around gap-1">
            {[420, 430, 435, 445, 460, 470].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg"
                  style={{ height: `${(value / 500) * 100}%` }}
                ></div>
                <span className="text-xs text-slate-400">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

