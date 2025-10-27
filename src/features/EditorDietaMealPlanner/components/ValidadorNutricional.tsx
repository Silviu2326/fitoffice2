import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

interface MacrosActuales {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

interface MacrosObjetivo {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

interface ValidadorNutricionalProps {
  macrosActuales?: MacrosActuales;
  macrosObjetivo?: MacrosObjetivo;
}

export default function ValidadorNutricional({ 
  macrosActuales = { calorias: 1800, proteinas: 120, carbohidratos: 200, grasas: 60 },
  macrosObjetivo = { calorias: 2000, proteinas: 150, carbohidratos: 220, grasas: 65 }
}: ValidadorNutricionalProps) {
  
  const calcularPorcentaje = (actual: number, objetivo: number): number => {
    if (objetivo === 0) return 0;
    return (actual / objetivo) * 100;
  };

  const obtenerEstado = (porcentaje: number): 'excelente' | 'bueno' | 'advertencia' | 'critico' => {
    if (porcentaje >= 95 && porcentaje <= 105) return 'excelente';
    if (porcentaje >= 85 && porcentaje < 95) return 'bueno';
    if (porcentaje >= 105 && porcentaje < 115) return 'bueno';
    if (porcentaje >= 75 && porcentaje < 85) return 'advertencia';
    if (porcentaje >= 115 && porcentaje < 125) return 'advertencia';
    return 'critico';
  };

  const getIcono = (estado: string) => {
    switch (estado) {
      case 'excelente':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'bueno':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'advertencia':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'critico':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  const getColorBarra = (estado: string) => {
    switch (estado) {
      case 'excelente':
        return 'bg-green-500';
      case 'bueno':
        return 'bg-emerald-500';
      case 'advertencia':
        return 'bg-yellow-500';
      case 'critico':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  const validaciones = [
    {
      nombre: 'Calorías',
      actual: macrosActuales.calorias,
      objetivo: macrosObjetivo.calorias,
      unidad: 'kcal'
    },
    {
      nombre: 'Proteínas',
      actual: macrosActuales.proteinas,
      objetivo: macrosObjetivo.proteinas,
      unidad: 'g'
    },
    {
      nombre: 'Carbohidratos',
      actual: macrosActuales.carbohidratos,
      objetivo: macrosObjetivo.carbohidratos,
      unidad: 'g'
    },
    {
      nombre: 'Grasas',
      actual: macrosActuales.grasas,
      objetivo: macrosObjetivo.grasas,
      unidad: 'g'
    }
  ];

  const validacionesConEstado = validaciones.map(v => ({
    ...v,
    porcentaje: calcularPorcentaje(v.actual, v.objetivo),
    estado: obtenerEstado(calcularPorcentaje(v.actual, v.objetivo))
  }));

  const estadoGeneral = validacionesConEstado.every(v => v.estado === 'excelente' || v.estado === 'bueno')
    ? 'excelente'
    : validacionesConEstado.some(v => v.estado === 'critico')
    ? 'critico'
    : 'advertencia';

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 p-2 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Validador Nutricional</h2>
        </div>
        <div className="flex items-center gap-2">
          {getIcono(estadoGeneral)}
          <span className="text-sm font-medium text-white">
            {estadoGeneral === 'excelente' && 'Balance Excelente'}
            {estadoGeneral === 'advertencia' && 'Necesita Ajustes'}
            {estadoGeneral === 'critico' && 'Requiere Corrección'}
          </span>
        </div>
      </div>

      {/* Resumen del estado */}
      <div className={`rounded-lg p-4 ${
        estadoGeneral === 'excelente' ? 'bg-green-900/30 border border-green-700/50' :
        estadoGeneral === 'advertencia' ? 'bg-yellow-900/30 border border-yellow-700/50' :
        'bg-red-900/30 border border-red-700/50'
      }`}>
        <div className="flex gap-3">
          {getIcono(estadoGeneral)}
          <div>
            <h4 className={`font-medium mb-1 ${
              estadoGeneral === 'excelente' ? 'text-green-300' :
              estadoGeneral === 'advertencia' ? 'text-yellow-300' :
              'text-red-300'
            }`}>
              {estadoGeneral === 'excelente' && 'Dieta Balanceada Correctamente'}
              {estadoGeneral === 'advertencia' && 'Dieta Con Desbalances Menores'}
              {estadoGeneral === 'critico' && 'Dieta Requiere Ajustes Importantes'}
            </h4>
            <p className="text-sm text-slate-300">
              {estadoGeneral === 'excelente' && 'Todos los macronutrientes están dentro del rango objetivo (±5%).'}
              {estadoGeneral === 'advertencia' && 'Algunos macronutrientes están fuera del rango ideal. Considera ajustar las porciones.'}
              {estadoGeneral === 'critico' && 'Varios macronutrientes están significativamente desbalanceados. Se requieren cambios.'}
            </p>
          </div>
        </div>
      </div>

      {/* Validaciones individuales */}
      <div className="space-y-4">
        {validacionesConEstado.map((validacion, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getIcono(validacion.estado)}
                <span className="text-white font-medium">{validacion.nombre}</span>
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-medium">{validacion.actual}</span> / {validacion.objetivo} {validacion.unidad}
                <span className="ml-2 text-slate-500">
                  ({validacion.porcentaje.toFixed(0)}%)
                </span>
              </div>
            </div>
            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`absolute h-full ${getColorBarra(validacion.estado)} transition-all duration-500`}
                style={{ width: `${Math.min(validacion.porcentaje, 100)}%` }}
              />
            </div>
            {validacion.estado !== 'excelente' && validacion.estado !== 'bueno' && (
              <p className="text-xs text-slate-400">
                {validacion.porcentaje < 85 && `Faltan ${(validacion.objetivo - validacion.actual).toFixed(0)} ${validacion.unidad}`}
                {validacion.porcentaje > 115 && `Exceso de ${(validacion.actual - validacion.objetivo).toFixed(0)} ${validacion.unidad}`}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="border-t border-slate-700 pt-4">
        <h4 className="text-sm font-medium text-white mb-3">Leyenda de Validación</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-slate-300">Excelente: 95-105% del objetivo</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Bueno: 85-95% o 105-115%</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-300">Advertencia: 75-85% o 115-125%</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-slate-300">Crítico: {'<'}75% o {'>'}125%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

