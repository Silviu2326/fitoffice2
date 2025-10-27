import { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

interface TransaccionTPV {
  id: string;
  fecha: string;
  hora: string;
  monto: number;
  terminal: string;
  estado: 'aprobado' | 'rechazado' | 'pendiente';
  cliente?: string;
}

export default function ControlTPV() {
  const [transacciones] = useState<TransaccionTPV[]>([
    {
      id: 'TPV-001',
      fecha: '2025-10-26',
      hora: '10:30',
      monto: 150.00,
      terminal: 'Terminal 1',
      estado: 'aprobado',
      cliente: 'Juan Pérez'
    },
    {
      id: 'TPV-002',
      fecha: '2025-10-26',
      hora: '11:15',
      monto: 200.00,
      terminal: 'Terminal 1',
      estado: 'aprobado',
      cliente: 'María García'
    },
    {
      id: 'TPV-003',
      fecha: '2025-10-26',
      hora: '12:00',
      monto: 75.00,
      terminal: 'Terminal 2',
      estado: 'rechazado'
    }
  ]);

  const totalAprobado = transacciones
    .filter(t => t.estado === 'aprobado')
    .reduce((sum, t) => sum + t.monto, 0);

  const totalRechazado = transacciones.filter(t => t.estado === 'rechazado').length;

  return (
    <div className="space-y-6">
      {/* Resumen TPV */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Total TPV</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${totalAprobado.toFixed(2)}
          </p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Hoy</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Aprobadas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            {transacciones.filter(t => t.estado === 'aprobado').length}
          </p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-[#EF4444]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Rechazadas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            {totalRechazado}
          </p>
        </div>
      </div>

      {/* Lista de Transacciones */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
            Transacciones TPV
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  ID
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Terminal
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E2E8F0]">
              {transacciones.map(transaccion => (
                <tr key={transaccion.id} className="hover:bg-[#F8FAFC] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                    {transaccion.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {transaccion.fecha} {transaccion.hora}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {transaccion.cliente || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {transaccion.terminal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600 }}>
                    ${transaccion.monto.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaccion.estado === 'aprobado' && (
                      <span 
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#10B981]" 
                        style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Aprobado
                      </span>
                    )}
                    {transaccion.estado === 'rechazado' && (
                      <span 
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#EF4444]" 
                        style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
                      >
                        <AlertCircle className="w-3 h-3" />
                        Rechazado
                      </span>
                    )}
                    {transaccion.estado === 'pendiente' && (
                      <span 
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#F59E0B]" 
                        style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
                      >
                        <AlertCircle className="w-3 h-3" />
                        Pendiente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

