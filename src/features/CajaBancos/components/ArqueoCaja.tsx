import { useState } from 'react';
import { Calculator, CheckCircle, AlertCircle } from 'lucide-react';

interface ArqueoData {
  billetes: { [key: string]: number };
  monedas: { [key: string]: number };
}

export default function ArqueoCaja() {
  const [arqueoData, setArqueoData] = useState<ArqueoData>({
    billetes: {
      '200': 0,
      '100': 0,
      '50': 0,
      '20': 0,
      '10': 0,
      '5': 0
    },
    monedas: {
      '2': 0,
      '1': 0,
      '0.5': 0,
      '0.2': 0,
      '0.1': 0
    }
  });

  const calcularTotal = () => {
    const totalBilletes = Object.entries(arqueoData.billetes).reduce(
      (sum, [valor, cantidad]) => sum + (parseFloat(valor) * cantidad), 0
    );
    const totalMonedas = Object.entries(arqueoData.monedas).reduce(
      (sum, [valor, cantidad]) => sum + (parseFloat(valor) * cantidad), 0
    );
    return totalBilletes + totalMonedas;
  };

  const handleBilleteChange = (valor: string, cantidad: string) => {
    setArqueoData(prev => ({
      ...prev,
      billetes: { ...prev.billetes, [valor]: parseInt(cantidad) || 0 }
    }));
  };

  const handleMonedaChange = (valor: string, cantidad: string) => {
    setArqueoData(prev => ({
      ...prev,
      monedas: { ...prev.monedas, [valor]: parseInt(cantidad) || 0 }
    }));
  };

  const total = calcularTotal();
  const totalSistema = 2450.50; // Este valor vendría de la API
  const diferencia = total - totalSistema;

  return (
    <div className="space-y-6">
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-[#6366F1]" />
            <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
              Arqueo de Caja
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Billetes */}
          <div>
            <h4 className="text-md font-semibold text-[#0F172A] mb-4" style={{ fontSize: '18px', lineHeight: '28px', fontWeight: 600 }}>
              Billetes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(arqueoData.billetes).map(valor => (
                <div key={valor} className="space-y-2">
                  <label className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                    ${valor}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={arqueoData.billetes[valor]}
                    onChange={(e) => handleBilleteChange(valor, e.target.value)}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                    style={{ height: '40px' }}
                    placeholder="Cantidad"
                  />
                  <p className="text-xs text-[#64748B]" style={{ fontSize: '12px', lineHeight: '16px' }}>
                    Total: ${(parseFloat(valor) * arqueoData.billetes[valor]).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Monedas */}
          <div>
            <h4 className="text-md font-semibold text-[#0F172A] mb-4" style={{ fontSize: '18px', lineHeight: '28px', fontWeight: 600 }}>
              Monedas
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(arqueoData.monedas).map(valor => (
                <div key={valor} className="space-y-2">
                  <label className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                    ${valor}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={arqueoData.monedas[valor]}
                    onChange={(e) => handleMonedaChange(valor, e.target.value)}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                    style={{ height: '40px' }}
                    placeholder="Cantidad"
                  />
                  <p className="text-xs text-[#64748B]" style={{ fontSize: '12px', lineHeight: '16px' }}>
                    Total: ${(parseFloat(valor) * arqueoData.monedas[valor]).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del Arqueo */}
          <div className="bg-[#F8FAFC] rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#0F172A] font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>Total Contado:</span>
              <span className="text-2xl font-bold text-[#0F172A]" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700 }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#0F172A] font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>Total Sistema:</span>
              <span className="text-2xl font-bold text-[#0F172A]" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700 }}>
                ${totalSistema.toFixed(2)}
              </span>
            </div>
            <div className={`flex justify-between items-center pt-4 border-t ${
              diferencia === 0 ? 'border-[#E2E8F0]' : 'border-[#EF4444]'
            }`}>
              <span className="text-[#0F172A] font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>Diferencia:</span>
              <div className="flex items-center gap-2">
                {diferencia === 0 ? (
                  <CheckCircle className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                )}
                <span className={`text-2xl font-bold ${
                  diferencia === 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`} style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700 }}>
                  ${Math.abs(diferencia).toFixed(2)}
                  {diferencia !== 0 && (diferencia > 0 ? ' (Sobrante)' : ' (Faltante)')}
                </span>
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <button 
            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold py-3 rounded-lg transition-all duration-200"
            style={{ 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 600
            }}
          >
            Guardar Arqueo
          </button>
        </div>
      </div>
    </div>
  );
}

