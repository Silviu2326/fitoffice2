import { DollarSign, Zap, Package, Wrench, Users, TrendingUp, TrendingDown } from 'lucide-react';

interface Categoria {
  id: string;
  nombre: string;
  total: number;
  porcentaje: number;
  cambio: number;
  icon: any;
  color: string;
}

export default function CategoriasGastos() {
  const categorias: Categoria[] = [
    {
      id: '1',
      nombre: 'Servicios',
      total: 1250.50,
      porcentaje: 35,
      cambio: 5.2,
      icon: Zap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      nombre: 'Suplementos',
      total: 890.00,
      porcentaje: 25,
      cambio: -2.1,
      icon: Package,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: '3',
      nombre: 'Mantenimiento',
      total: 750.00,
      porcentaje: 21,
      cambio: 8.5,
      icon: Wrench,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: '4',
      nombre: 'Nóminas',
      total: 680.00,
      porcentaje: 19,
      cambio: 0,
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const totalGastos = categorias.reduce((sum, cat) => sum + cat.total, 0);

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0]">
      {/* Header */}
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Categorías de Gastos</h2>
            <p className="text-sm text-[#64748B] mt-1">
              Total del mes: <span className="font-bold text-[#6366F1]">€{totalGastos.toFixed(2)}</span>
            </p>
          </div>
          <select className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200">
            <option value="mes">Este mes</option>
            <option value="trimestre">Último trimestre</option>
            <option value="año">Este año</option>
          </select>
        </div>
      </div>

      {/* Gráfico de barras horizontal */}
      <div className="p-6">
        <div className="space-y-6">
          {categorias.map((categoria) => {
            const Icon = categoria.icon;
            return (
              <div key={categoria.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-r ${categoria.color} p-3 rounded-xl shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F172A]">{categoria.nombre}</h3>
                      <p className="text-sm text-[#64748B] font-medium">€{categoria.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">{categoria.porcentaje}%</span>
                      {categoria.cambio !== 0 && (
                        <span className={`flex items-center gap-1 text-sm font-semibold ${
                          categoria.cambio > 0 ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}>
                          {categoria.cambio > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {Math.abs(categoria.cambio)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-4 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${categoria.color} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${categoria.porcentaje}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen */}
        <div className="mt-8 p-6 bg-[#EEF2FF] border border-[#6366F1]/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#6366F1] p-3 rounded-xl shadow-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-medium">Total de Gastos</p>
                <p className="text-2xl font-bold text-[#0F172A]">€{totalGastos.toFixed(2)}</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] transition-all duration-200 shadow-md">
              Ver Detalles
            </button>
          </div>
        </div>

        {/* Consejos */}
        <div className="mt-6 p-5 bg-[#DBEAFE] border border-[#3B82F6]/30 rounded-xl">
          <h4 className="font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>Consejo de Optimización</span>
          </h4>
          <p className="text-sm text-[#64748B]">
            La categoría de Mantenimiento ha aumentado un 8.5% este mes. 
            Considera revisar contratos con proveedores para optimizar costos.
          </p>
        </div>
      </div>
    </div>
  );
}
