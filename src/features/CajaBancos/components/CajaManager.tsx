import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface CajaSummary {
  efectivoActual: number;
  ingresosDia: number;
  gastosDia: number;
  diferencias: number;
}

export default function CajaManager() {
  const [cajaSummary] = useState<CajaSummary>({
    efectivoActual: 2450.50,
    ingresosDia: 850.00,
    gastosDia: 125.50,
    diferencias: 0
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Efectivo Actual */}
        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Efectivo</span>
          </div>
          <div>
            <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
              ${cajaSummary.efectivoActual.toFixed(2)}
            </p>
            <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>En caja física</p>
          </div>
        </div>

        {/* Ingresos del Día */}
        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Ingresos</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
              ${cajaSummary.ingresosDia.toFixed(2)}
            </p>
            <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Hoy</p>
          </div>
        </div>

        {/* Gastos del Día */}
        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-8 h-8 text-[#EF4444]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Gastos</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
              ${cajaSummary.gastosDia.toFixed(2)}
            </p>
            <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Hoy</p>
          </div>
        </div>

        {/* Diferencias */}
        <div 
          className={`rounded-2xl p-6 border ${
            cajaSummary.diferencias === 0 
              ? 'bg-white border-[#E2E8F0]' 
              : 'bg-[#FEE2E2] border-[#EF4444]'
          }`}
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className={`w-8 h-8 ${cajaSummary.diferencias === 0 ? 'text-[#94A3B8]' : 'text-[#EF4444]'}`} />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Diferencias</span>
          </div>
          <div>
            <p className={`text-3xl font-bold ${cajaSummary.diferencias === 0 ? 'text-[#0F172A]' : 'text-[#EF4444]'}`} style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
              ${Math.abs(cajaSummary.diferencias).toFixed(2)}
            </p>
            <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
              {cajaSummary.diferencias === 0 ? 'Todo correcto' : 'Requiere ajuste'}
            </p>
          </div>
        </div>
      </div>

      {/* Últimos Movimientos */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
            Últimos Movimientos
          </h3>
        </div>
        <div className="p-6">
          <p className="text-[#64748B] text-center py-8" style={{ fontSize: '16px', lineHeight: '24px' }}>
            No hay movimientos registrados hoy
          </p>
        </div>
      </div>
    </div>
  );
}

