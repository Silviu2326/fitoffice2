import { useState, useEffect } from 'react';
import { BarChart3, Download, Filter, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface ReporteGasto {
  id: string;
  fecha: string;
  proveedor: string;
  categoria: string;
  monto: number;
  descripcion: string;
  estado: 'pagado' | 'pendiente' | 'vencido';
}

interface EstadisticasGastos {
  totalGastos: number;
  gastosMes: number;
  promedioDiario: number;
  categoriaMasGastada: string;
  proveedorMasUsado: string;
  gastosPendientes: number;
}

export default function ReportesGastos() {
  const [reportes, setReportes] = useState<ReporteGasto[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasGastos>({
    totalGastos: 0,
    gastosMes: 0,
    promedioDiario: 0,
    categoriaMasGastada: '',
    proveedorMasUsado: '',
    gastosPendientes: 0
  });
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    categoria: '',
    proveedor: '',
    estado: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    setLoading(true);
    try {
      // Simulación de datos - en producción esto vendría de la API
      const datosSimulados: ReporteGasto[] = [
        {
          id: '1',
          fecha: '2024-01-15',
          proveedor: 'Proveedor A',
          categoria: 'Suministros',
          monto: 1500,
          descripcion: 'Material de oficina',
          estado: 'pagado'
        },
        {
          id: '2',
          fecha: '2024-01-14',
          proveedor: 'Proveedor B',
          categoria: 'Servicios',
          monto: 2500,
          descripcion: 'Servicio de limpieza',
          estado: 'pendiente'
        },
        {
          id: '3',
          fecha: '2024-01-13',
          proveedor: 'Proveedor C',
          categoria: 'Equipamiento',
          monto: 5000,
          descripcion: 'Nuevo equipo',
          estado: 'pagado'
        }
      ];

      setReportes(datosSimulados);
      
      // Calcular estadísticas
      const totalGastos = datosSimulados.reduce((sum, gasto) => sum + gasto.monto, 0);
      const gastosMes = datosSimulados.filter(g => g.fecha.startsWith('2024-01')).reduce((sum, gasto) => sum + gasto.monto, 0);
      const gastosPendientes = datosSimulados.filter(g => g.estado === 'pendiente').reduce((sum, gasto) => sum + gasto.monto, 0);
      
      setEstadisticas({
        totalGastos,
        gastosMes,
        promedioDiario: gastosMes / 31,
        categoriaMasGastada: 'Servicios',
        proveedorMasUsado: 'Proveedor B',
        gastosPendientes
      });
    } catch (error) {
      console.error('Error al cargar reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportarReporte = () => {
    // Implementar exportación a Excel/PDF
    console.log('Exportando reporte...');
  };

  const aplicarFiltros = () => {
    // Implementar lógica de filtros
    console.log('Aplicando filtros:', filtros);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Gastos</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                ${estadisticas.totalGastos.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Gastos del Mes</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                ${estadisticas.gastosMes.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Promedio Diario</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                ${estadisticas.promedioDiario.toFixed(0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pendientes</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                ${estadisticas.gastosPendientes.toLocaleString()}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y acciones */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Filtros de Reporte</h2>
          <div className="flex gap-3">
            <button
              onClick={exportarReporte}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={filtros.fechaInicio}
              onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha Fin
            </label>
            <input
              type="date"
              value={filtros.fechaFin}
              onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Categoría
            </label>
            <select
              value={filtros.categoria}
              onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todas</option>
              <option value="suministros">Suministros</option>
              <option value="servicios">Servicios</option>
              <option value="equipamiento">Equipamiento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Proveedor
            </label>
            <select
              value={filtros.proveedor}
              onChange={(e) => setFiltros({ ...filtros, proveedor: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="proveedor-a">Proveedor A</option>
              <option value="proveedor-b">Proveedor B</option>
              <option value="proveedor-c">Proveedor C</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={aplicarFiltros}
              className="w-full flex items-center justify-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de reportes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Detalle de Gastos</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {reportes.map((reporte) => (
                <tr key={reporte.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {new Date(reporte.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {reporte.proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                      {reporte.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {reporte.descripcion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${reporte.monto.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      reporte.estado === 'pagado' 
                        ? 'bg-green-100 text-green-800'
                        : reporte.estado === 'pendiente'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {reporte.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen por categorías */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Gastos por Categoría</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Servicios</span>
              <span className="text-sm font-medium text-slate-900">$2,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Equipamiento</span>
              <span className="text-sm font-medium text-slate-900">$5,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Suministros</span>
              <span className="text-sm font-medium text-slate-900">$1,500</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Proveedores</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Proveedor B</span>
              <span className="text-sm font-medium text-slate-900">$2,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Proveedor C</span>
              <span className="text-sm font-medium text-slate-900">$5,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Proveedor A</span>
              <span className="text-sm font-medium text-slate-900">$1,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
