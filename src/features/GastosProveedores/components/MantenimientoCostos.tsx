import { useState, useEffect } from 'react';
import { Wrench, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { getGastosByCategoria, type Gasto } from '../api/gastos';
import { getCategorias, type CategoriaGasto } from '../api/categorias';

export default function MantenimientoCostos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categorias, setCategorias] = useState<CategoriaGasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState<'mes' | 'trimestre' | 'año'>('mes');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const categoriasData = await getCategorias();
      const categoriasMantenimiento = categoriasData.filter(c => c.tipo_gasto === 'mantenimiento');
      
      // Cargar gastos de categorías de mantenimiento
      const gastosPromises = categoriasMantenimiento.map(cat => getGastosByCategoria(cat.id));
      const gastosArrays = await Promise.all(gastosPromises);
      const todosGastos = gastosArrays.flat();

      setCategorias(categoriasMantenimiento);
      setGastos(todosGastos);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const calcularTotalMantenimiento = () => {
    const ahora = new Date();
    let fechaInicio = new Date();
    
    switch (periodo) {
      case 'mes':
        fechaInicio.setMonth(ahora.getMonth() - 1);
        break;
      case 'trimestre':
        fechaInicio.setMonth(ahora.getMonth() - 3);
        break;
      case 'año':
        fechaInicio.setFullYear(ahora.getFullYear() - 1);
        break;
    }

    return gastos
      .filter(g => new Date(g.fecha) >= fechaInicio && g.estado === 'pagado')
      .reduce((sum, g) => sum + g.monto, 0);
  };

  const gastosPorCategoria = categorias.map(categoria => {
    const gastosCategoria = gastos.filter(g => g.categoria_id === categoria.id && g.estado === 'pagado');
    const total = gastosCategoria.reduce((sum, g) => sum + g.monto, 0);
    return { categoria, total, cantidad: gastosCategoria.length };
  }).sort((a, b) => b.total - a.total);

  const gastosProximos = gastos
    .filter(g => g.estado === 'pendiente' || g.estado === 'aprobado')
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6366F1] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Mantenimiento & Costos</h2>
          <p className="text-[#64748B]">Control de gastos de mantenimiento y equipamiento</p>
        </div>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value as 'mes' | 'trimestre' | 'año')}
          className="h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
        >
          <option value="mes">Último Mes</option>
          <option value="trimestre">Último Trimestre</option>
          <option value="año">Último Año</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#DBEAFE] p-6 rounded-xl border border-[#3B82F6]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#3B82F6] p-3 rounded-xl shadow-sm">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Total Mantenimiento</p>
              <p className="text-2xl font-bold text-[#0F172A]">€{calcularTotalMantenimiento().toFixed(2)}</p>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8]">Último {periodo}</p>
        </div>

        <div className="bg-[#D1FAE5] p-6 rounded-xl border border-[#10B981]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#10B981] p-3 rounded-xl shadow-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Gastos Realizados</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {gastos.filter(g => g.estado === 'pagado').length}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8]">Registros completados</p>
        </div>

        <div className="bg-[#FEF3C7] p-6 rounded-xl border border-[#F59E0B]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#F59E0B] p-3 rounded-xl shadow-sm">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {gastos.filter(g => g.estado === 'pendiente' || g.estado === 'aprobado').length}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8]">Requieren atención</p>
        </div>
      </div>

      {/* Gastos por Categoría */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Gastos por Categoría</h3>
        <div className="space-y-4">
          {gastosPorCategoria.length === 0 ? (
            <p className="text-[#64748B] text-center py-8">No hay gastos de mantenimiento registrados</p>
          ) : (
            gastosPorCategoria.map(({ categoria, total, cantidad }) => {
              const maxTotal = Math.max(...gastosPorCategoria.map(g => g.total));
              const porcentaje = maxTotal > 0 ? (total / maxTotal) * 100 : 0;

              return (
                <div key={categoria.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoria.color }}
                      />
                      <span className="text-[#0F172A] font-semibold">{categoria.nombre}</span>
                      <span className="text-[#94A3B8] text-sm">({cantidad} gastos)</span>
                    </div>
                    <span className="text-[#0F172A] font-bold">€{total.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${porcentaje}%`,
                        backgroundColor: categoria.color
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Próximos Mantenimientos */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#6366F1]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">Próximos Mantenimientos</h3>
        </div>
        {gastosProximos.length === 0 ? (
          <p className="text-[#64748B] text-center py-8">No hay mantenimientos pendientes</p>
        ) : (
          <div className="space-y-3">
            {gastosProximos.map(gasto => {
              const categoria = categorias.find(c => c.id === gasto.categoria_id);
              return (
                <div 
                  key={gasto.id} 
                  className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${categoria?.color}20` }}
                    >
                      <Wrench className="w-5 h-5" style={{ color: categoria?.color }} />
                    </div>
                    <div>
                      <p className="text-[#0F172A] font-semibold">{gasto.concepto}</p>
                      {gasto.descripcion && (
                        <p className="text-[#64748B] text-sm">{gasto.descripcion}</p>
                      )}
                      <p className="text-[#94A3B8] text-xs mt-1">
                        {new Date(gasto.fecha).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#0F172A] font-bold">€{gasto.monto.toFixed(2)}</p>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      gasto.estado === 'aprobado' ? 'bg-[#DBEAFE] text-[#3B82F6]' :
                      'bg-[#FEF3C7] text-[#F59E0B]'
                    }`}>
                      {gasto.estado}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recomendaciones */}
      <div className="bg-[#DBEAFE] border border-[#3B82F6]/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="bg-[#3B82F6] p-3 rounded-xl shadow-sm">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#0F172A] font-semibold mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Recomendaciones</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>• Programa mantenimientos preventivos regulares para evitar costos mayores</li>
              <li>• Mantén un registro detallado de cada intervención para análisis histórico</li>
              <li>• Considera contratos de mantenimiento con proveedores de confianza</li>
              <li>• Establece alertas para mantenimientos periódicos obligatorios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

