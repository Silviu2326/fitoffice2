import { useState, useEffect } from 'react';
import { PieChart, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { getGastosByDateRange } from '../api/gastos';
import { getCategorias, type CategoriaGasto } from '../api/categorias';

export default function ControlPresupuesto() {
  const [categorias, setCategorias] = useState<CategoriaGasto[]>([]);
  const [presupuestos, setPresupuestos] = useState<Array<{
    categoria: CategoriaGasto;
    gastado: number;
    presupuesto: number;
    porcentaje: number;
    estado: 'ok' | 'warning' | 'danger';
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [mesSeleccionado, setMesSeleccionado] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    loadData();
  }, [mesSeleccionado]);

  const loadData = async () => {
    try {
      setLoading(true);
      const categoriasData = await getCategorias();
      const categoriasConPresupuesto = categoriasData.filter(c => c.presupuesto_mensual && c.presupuesto_mensual > 0);

      // Calcular fechas del mes
      const [year, month] = mesSeleccionado.split('-');
      const fechaInicio = `${year}-${month}-01`;
      const ultimoDia = new Date(parseInt(year), parseInt(month), 0).getDate();
      const fechaFin = `${year}-${month}-${ultimoDia}`;

      const gastosDelMes = await getGastosByDateRange(fechaInicio, fechaFin);

      // Calcular presupuestos
      const presupuestosCalculados = categoriasConPresupuesto.map(categoria => {
        const gastado = gastosDelMes
          .filter(g => g.categoria_id === categoria.id && g.estado === 'pagado')
          .reduce((sum, g) => sum + g.monto, 0);
        
        const presupuesto = categoria.presupuesto_mensual || 0;
        const porcentaje = presupuesto > 0 ? (gastado / presupuesto) * 100 : 0;
        
        let estado: 'ok' | 'warning' | 'danger' = 'ok';
        if (porcentaje >= 100) estado = 'danger';
        else if (porcentaje >= 80) estado = 'warning';

        return { categoria, gastado, presupuesto, porcentaje, estado };
      });

      setCategorias(categoriasConPresupuesto);
      setPresupuestos(presupuestosCalculados);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPresupuesto = presupuestos.reduce((sum, p) => sum + p.presupuesto, 0);
  const totalGastado = presupuestos.reduce((sum, p) => sum + p.gastado, 0);
  const porcentajeGlobal = totalPresupuesto > 0 ? (totalGastado / totalPresupuesto) * 100 : 0;
  const disponible = totalPresupuesto - totalGastado;

  const categoriasEnPeligro = presupuestos.filter(p => p.estado === 'danger').length;
  const categoriasEnAdvertencia = presupuestos.filter(p => p.estado === 'warning').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Control de Presupuesto</h2>
          <p className="text-slate-400">Monitorea y gestiona tus límites de gasto</p>
        </div>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Stats Globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Presupuesto Total</p>
              <p className="text-2xl font-bold text-white">€{totalPresupuesto.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Gastado</p>
              <p className="text-2xl font-bold text-white">€{totalGastado.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Disponible</p>
              <p className="text-2xl font-bold text-white">€{disponible.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-lg ${
              porcentajeGlobal >= 100 ? 'bg-red-500/10' :
              porcentajeGlobal >= 80 ? 'bg-yellow-500/10' :
              'bg-green-500/10'
            }`}>
              <PieChart className={`w-6 h-6 ${
                porcentajeGlobal >= 100 ? 'text-red-400' :
                porcentajeGlobal >= 80 ? 'text-yellow-400' :
                'text-green-400'
              }`} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Uso Global</p>
              <p className="text-2xl font-bold text-white">{porcentajeGlobal.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {(categoriasEnPeligro > 0 || categoriasEnAdvertencia > 0) && (
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-1">⚠️ Alertas de Presupuesto</h3>
              <div className="text-sm text-slate-300 space-y-1">
                {categoriasEnPeligro > 0 && (
                  <p>• {categoriasEnPeligro} categoría(s) han superado el 100% del presupuesto</p>
                )}
                {categoriasEnAdvertencia > 0 && (
                  <p>• {categoriasEnAdvertencia} categoría(s) están por encima del 80% del presupuesto</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Presupuestos por Categoría */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Presupuestos por Categoría</h3>
        {presupuestos.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            No hay categorías con presupuesto asignado
          </p>
        ) : (
          <div className="space-y-6">
            {presupuestos.map(({ categoria, gastado, presupuesto, porcentaje, estado }) => (
              <div key={categoria.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoria.color }}
                    />
                    <div>
                      <span className="text-white font-medium">{categoria.nombre}</span>
                      {estado !== 'ok' && (
                        <AlertCircle className={`inline-block w-4 h-4 ml-2 ${
                          estado === 'danger' ? 'text-red-400' : 'text-yellow-400'
                        }`} />
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      €{gastado.toFixed(2)} / €{presupuesto.toFixed(2)}
                    </p>
                    <p className={`text-sm font-medium ${
                      estado === 'danger' ? 'text-red-400' :
                      estado === 'warning' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {porcentaje.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="relative w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      estado === 'danger' ? 'bg-red-500' :
                      estado === 'warning' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                  />
                  {porcentaje > 100 && (
                    <div 
                      className="absolute top-0 right-0 h-3 bg-red-700"
                      style={{ width: `${Math.min(porcentaje - 100, 100)}%` }}
                    />
                  )}
                </div>

                {estado !== 'ok' && (
                  <p className={`text-xs mt-1 ${
                    estado === 'danger' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {estado === 'danger' 
                      ? `Has excedido el presupuesto en €${(gastado - presupuesto).toFixed(2)}`
                      : `Te quedan €${(presupuesto - gastado).toFixed(2)} antes de alcanzar el límite`
                    }
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gráfico Circular Visual */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Distribución del Presupuesto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {presupuestos.slice(0, 6).map(({ categoria, gastado, presupuesto }) => {
            const porcentajeUso = presupuesto > 0 ? (gastado / presupuesto) * 100 : 0;
            const porcentajeTotal = totalPresupuesto > 0 ? (presupuesto / totalPresupuesto) * 100 : 0;

            return (
              <div key={categoria.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={categoria.color}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${porcentajeUso * 1.76} 176`}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {porcentajeUso.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{categoria.nombre}</p>
                  <p className="text-sm text-slate-400">
                    €{gastado.toFixed(2)} de €{presupuesto.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {porcentajeTotal.toFixed(1)}% del presupuesto total
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-700/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg">
            <PieChart className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">💡 Consejos de Gestión</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Revisa y ajusta tus presupuestos mensualmente según tendencias reales</li>
              <li>• Establece alertas automáticas al 75% y 90% del presupuesto</li>
              <li>• Analiza categorías que superan constantemente el presupuesto</li>
              <li>• Considera reasignar presupuesto de categorías infrautilizadas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

