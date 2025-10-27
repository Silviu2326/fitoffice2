import { Sparkles, Target, TrendingUp, Lightbulb } from 'lucide-react';

export default function OptimizadorProgreso() {
  const recomendaciones = [
    {
      id: 1,
      tipo: 'volumen',
      titulo: 'Aumentar Volumen de Entrenamiento',
      descripcion: 'Basado en tu progreso, puedes tolerar un 15% más de volumen en pierna',
      impacto: 'alto',
      categoria: 'Fuerza',
    },
    {
      id: 2,
      tipo: 'recuperacion',
      titulo: 'Optimizar Días de Recuperación',
      descripcion: 'Agregar un día extra de descanso entre sesiones de press podría mejorar tu recuperación',
      impacto: 'medio',
      categoria: 'Recuperación',
    },
    {
      id: 3,
      tipo: 'variacion',
      titulo: 'Introducir Variantes de Ejercicios',
      descripcion: 'Alternar entre sentadilla frontal y trasera cada 4 semanas para evitar estancamiento',
      impacto: 'medio',
      categoria: 'Variedad',
    },
    {
      id: 4,
      tipo: 'intensidad',
      titulo: 'Ajustar Rango de Repeticiones',
      descripcion: 'Incorporar series de 3-5 repeticiones para maximizar ganancias de fuerza',
      impacto: 'alto',
      categoria: 'Intensidad',
    },
  ];

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'alto':
        return 'emerald';
      case 'medio':
        return 'blue';
      case 'bajo':
        return 'slate';
      default:
        return 'slate';
    }
  };

  const getImpactoTexto = (impacto: string) => {
    switch (impacto) {
      case 'alto':
        return 'Alto Impacto';
      case 'medio':
        return 'Impacto Medio';
      case 'bajo':
        return 'Bajo Impacto';
      default:
        return 'Impacto';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-500" />
          Optimizador de Progreso
        </h2>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          Aplicar Todo
        </button>
      </div>

      <div className="space-y-6">
        {/* Resumen de optimización */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-400">Mejora Potencial</p>
                <p className="text-2xl font-bold text-white">+18%</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-blue-400">Recomendaciones</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm text-purple-400">Tiempo Estimado</p>
                <p className="text-2xl font-bold text-white">4 sem</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de recomendaciones */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Recomendaciones Personalizadas</h3>
          {recomendaciones.map((rec) => (
            <div key={rec.id} className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-emerald-500 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`bg-${getImpactoColor(rec.impacto)}-500/10 p-2 rounded-lg`}>
                    <Lightbulb className={`w-5 h-5 text-${getImpactoColor(rec.impacto)}-500`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">{rec.titulo}</h4>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                        {rec.categoria}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{rec.descripcion}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs bg-${getImpactoColor(rec.impacto)}-500/10 text-${getImpactoColor(rec.impacto)}-400 px-2 py-1 rounded`}>
                        {getImpactoTexto(rec.impacto)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                    Aplicar
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                    Más Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Análisis basado en IA */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Análisis Inteligente</h3>
              <p className="text-sm text-slate-300 mb-4">
                Basándome en tu historial de entrenamiento de los últimos 6 meses, he identificado
                patrones que sugieren que respondes mejor a entrenamientos con volumen moderado-alto
                y frecuencia de 4-5 días por semana. Tu recuperación es óptima con 48-72 horas entre
                sesiones del mismo grupo muscular.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-white mb-2">Recomendación Principal:</p>
                <p className="text-sm text-slate-300">
                  Implementar una periodización ondulatoria con bloques de 3-4 semanas alternando
                  entre fuerza (3-5 reps) e hipertrofia (8-12 reps) para maximizar ganancias y
                  evitar estancamiento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan de acción */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">Plan de Acción - Próximas 4 Semanas</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-emerald-500 rounded-full w-2 h-2"></div>
              <span className="text-slate-300">Semana 1-2: Implementar aumento de volumen gradual (+10%)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-blue-500 rounded-full w-2 h-2"></div>
              <span className="text-slate-300">Semana 2-3: Introducir variantes de ejercicios principales</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-purple-500 rounded-full w-2 h-2"></div>
              <span className="text-slate-300">Semana 3-4: Ajustar rangos de repeticiones (3-5 reps)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-orange-500 rounded-full w-2 h-2"></div>
              <span className="text-slate-300">Semana 4: Evaluar progreso y ajustar plan siguiente ciclo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

