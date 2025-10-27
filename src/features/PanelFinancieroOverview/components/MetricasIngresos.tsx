import { TrendingUp, Users, Package, ShoppingBag } from 'lucide-react';

interface FuenteIngreso {
  nombre: string;
  cantidad: number;
  porcentaje: number;
  icono: 'users' | 'package' | 'shopping';
}

interface MetricasIngresosProps {
  tipo: 'entrenador' | 'gimnasio';
  fuentes: FuenteIngreso[];
  totalIngresos: number;
}

export default function MetricasIngresos({ tipo, fuentes, totalIngresos }: MetricasIngresosProps) {
  const getIcono = (icono: string) => {
    switch (icono) {
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'package':
        return <Package className="w-5 h-5" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#10B981] p-2 rounded-xl">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Análisis de Ingresos</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">
            {tipo === 'entrenador' ? 'Desglose por servicios' : 'Reparto por líneas de negocio'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {fuentes.map((fuente, index) => (
          <div key={index} className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#D1FAE5] p-2 rounded-xl text-[#10B981]">
                  {getIcono(fuente.icono)}
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{fuente.nombre}</p>
                  <p className="text-[14px] leading-[20px] text-[#64748B]">€{fuente.cantidad.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[20px] leading-[28px] font-semibold text-[#10B981]">{fuente.porcentaje}%</p>
                <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8]">del total</p>
              </div>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-200"
                style={{ width: `${fuente.porcentaje}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <p className="text-[#64748B] text-[16px] leading-[24px] font-medium">Total Ingresos</p>
          <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">€{totalIngresos.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

