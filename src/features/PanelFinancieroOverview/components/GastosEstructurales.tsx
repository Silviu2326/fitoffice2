import { TrendingDown, Home, Users, Wrench, Zap } from 'lucide-react';

interface Gasto {
  categoria: string;
  cantidad: number;
  porcentaje: number;
  tipo: 'fijo' | 'variable';
  icono: 'home' | 'users' | 'wrench' | 'zap';
}

interface GastosEstructuralesProps {
  gastos: Gasto[];
  totalGastos: number;
}

export default function GastosEstructurales({ gastos, totalGastos }: GastosEstructuralesProps) {
  const getIcono = (icono: string) => {
    switch (icono) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'wrench':
        return <Wrench className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <TrendingDown className="w-5 h-5" />;
    }
  };

  const gastosFijos = gastos.filter(g => g.tipo === 'fijo');
  const gastosVariables = gastos.filter(g => g.tipo === 'variable');
  const totalFijos = gastosFijos.reduce((sum, g) => sum + g.cantidad, 0);
  const totalVariables = gastosVariables.reduce((sum, g) => sum + g.cantidad, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#EF4444] p-2 rounded-xl">
          <TrendingDown className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Gastos Estructurales</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Control de costes fijos y variables</p>
        </div>
      </div>

      {/* Resumen de gastos fijos vs variables */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
          <p className="text-[14px] leading-[20px] text-[#64748B] mb-1">Gastos Fijos</p>
          <p className="text-[20px] leading-[28px] font-bold text-[#0F172A]">€{totalFijos.toLocaleString()}</p>
        </div>
        <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
          <p className="text-[14px] leading-[20px] text-[#64748B] mb-1">Gastos Variables</p>
          <p className="text-[20px] leading-[28px] font-bold text-[#0F172A]">€{totalVariables.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-3">
        {gastos.map((gasto, index) => (
          <div key={index} className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${gasto.tipo === 'fijo' ? 'bg-[#FEF3C7] text-[#F59E0B]' : 'bg-[#DBEAFE] text-[#3B82F6]'}`}>
                  {getIcono(gasto.icono)}
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{gasto.categoria}</p>
                  <span className={`text-[12px] leading-[16px] font-medium px-3 py-1 rounded-full ${
                    gasto.tipo === 'fijo' 
                      ? 'bg-[#FEF3C7] text-[#F59E0B]' 
                      : 'bg-[#DBEAFE] text-[#3B82F6]'
                  }`}>
                    {gasto.tipo === 'fijo' ? 'Fijo' : 'Variable'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#0F172A] text-[16px] leading-[24px]">€{gasto.cantidad.toLocaleString()}</p>
                <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8]">{gasto.porcentaje}% del total</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <p className="text-[#64748B] text-[16px] leading-[24px] font-medium">Total Gastos</p>
          <p className="text-[24px] leading-[32px] font-bold text-[#EF4444]">€{totalGastos.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

