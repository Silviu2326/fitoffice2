import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';

export default function AnalizadorTendencias() {
  const tendencias = [
    { 
      categoria: 'Fuerza Superior', 
      tendencia: 'up', 
      cambio: '+15%', 
      estado: 'excelente',
      descripcion: 'Progreso constante en press banca y dominadas'
    },
    { 
      categoria: 'Fuerza Inferior', 
      tendencia: 'up', 
      cambio: '+12%', 
      estado: 'muy_bien',
      descripcion: 'Mejora sostenida en sentadilla y peso muerto'
    },
    { 
      categoria: 'Resistencia', 
      tendencia: 'neutral', 
      cambio: '+3%', 
      estado: 'atención',
      descripcion: 'Progreso lento, considerar ajustes'
    },
    { 
      categoria: 'Movilidad', 
      tendencia: 'down', 
      cambio: '-2%', 
      estado: 'preocupante',
      descripcion: 'Reducción en rango de movimiento, requiere enfoque'
    },
  ];

  const getTrendIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'excelente':
        return 'emerald';
      case 'muy_bien':
        return 'blue';
      case 'atención':
        return 'yellow';
      case 'preocupante':
        return 'red';
      default:
        return 'slate';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'excelente':
        return 'Excelente';
      case 'muy_bien':
        return 'Muy Bien';
      case 'atención':
        return 'Atención';
      case 'preocupante':
        return 'Preocupante';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          Analizador de Tendencias
        </h2>
        <button className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700">
          Configurar Alertas
        </button>
      </div>

      <div className="space-y-4">
        {/* Resumen general */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-sm text-emerald-400">Tendencias Positivas</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-sm text-yellow-400">Requieren Atención</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-red-400">Tendencias Negativas</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de tendencias */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Análisis Detallado</h3>
          {tendencias.map((item, index) => (
            <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  {getTrendIcon(item.tendencia)}
                  <div>
                    <h4 className="text-white font-semibold">{item.categoria}</h4>
                    <p className="text-sm text-slate-400 mt-1">{item.descripcion}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-${getEstadoColor(item.estado)}-500 font-bold text-lg`}>
                    {item.cambio}
                  </p>
                  <span className={`text-xs bg-${getEstadoColor(item.estado)}-500/10 text-${getEstadoColor(item.estado)}-400 px-2 py-1 rounded`}>
                    {getEstadoTexto(item.estado)}
                  </span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className={`bg-${getEstadoColor(item.estado)}-500 h-2 rounded-full transition-all`}
                  style={{ width: `${Math.abs(parseInt(item.cambio)) * 5}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recomendaciones */}
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Recomendaciones</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
              <span>Mantener la intensidad actual en ejercicios de fuerza superior</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <span>Incorporar más trabajo de resistencia cardiovascular</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <span>Aumentar sesiones de movilidad y estiramiento (mínimo 3x/semana)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

