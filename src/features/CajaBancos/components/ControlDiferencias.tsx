import { useState } from 'react';
import { AlertCircle, CheckCircle, Search, FileText } from 'lucide-react';

interface Diferencia {
  id: string;
  fecha: string;
  tipo: 'sobrante' | 'faltante';
  monto: number;
  origen: 'caja' | 'banco' | 'tpv';
  estado: 'pendiente' | 'investigando' | 'resuelto';
  descripcion: string;
  responsable?: string;
  resolucion?: string;
}

export default function ControlDiferencias() {
  const [diferencias] = useState<Diferencia[]>([
    {
      id: 'DIF-001',
      fecha: '2025-10-25',
      tipo: 'faltante',
      monto: 20.00,
      origen: 'caja',
      estado: 'investigando',
      descripcion: 'Diferencia en arqueo de caja del turno tarde',
      responsable: 'Ana Martínez'
    },
    {
      id: 'DIF-002',
      fecha: '2025-10-23',
      tipo: 'sobrante',
      monto: 15.50,
      origen: 'caja',
      estado: 'resuelto',
      descripcion: 'Diferencia por cambio mal registrado',
      responsable: 'Carlos López',
      resolucion: 'Error de caja, se ajustó el registro'
    },
    {
      id: 'DIF-003',
      fecha: '2025-10-20',
      tipo: 'faltante',
      monto: 50.00,
      origen: 'tpv',
      estado: 'pendiente',
      descripcion: 'Transacción TPV no registrada en sistema',
      responsable: 'María González'
    }
  ]);

  const totalFaltante = diferencias
    .filter(d => d.tipo === 'faltante' && d.estado !== 'resuelto')
    .reduce((sum, d) => sum + d.monto, 0);

  const totalSobrante = diferencias
    .filter(d => d.tipo === 'sobrante' && d.estado !== 'resuelto')
    .reduce((sum, d) => sum + d.monto, 0);

  const pendientes = diferencias.filter(d => d.estado === 'pendiente').length;
  const resueltas = diferencias.filter(d => d.estado === 'resuelto').length;

  const getEstadoBadge = (estado: Diferencia['estado']) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'investigando':
        return 'bg-[#DBEAFE] text-[#3B82F6]';
      case 'resuelto':
        return 'bg-[#D1FAE5] text-[#10B981]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumen de Diferencias */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Faltantes</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${totalFaltante.toFixed(2)}
          </p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Sin resolver</p>
        </div>

        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Sobrantes</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${totalSobrante.toFixed(2)}
          </p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Sin resolver</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Search className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Pendientes</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>{pendientes}</p>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Por revisar</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Resueltas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>{resueltas}</p>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Este mes</p>
        </div>
      </div>

      {/* Alertas Importantes */}
      {pendientes > 0 && (
        <div className="bg-[#FEF3C7] border-l-4 border-[#F59E0B] p-4 rounded-r-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-[#F59E0B] mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-[#92400E]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                Atención: Tienes {pendientes} diferencia{pendientes > 1 ? 's' : ''} pendiente{pendientes > 1 ? 's' : ''} de investigar
              </h3>
              <p className="text-sm text-[#92400E] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
                Es importante revisar y resolver las diferencias lo antes posible para mantener la precisión contable.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0] p-6" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Estado</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="investigando">Investigando</option>
              <option value="resuelto">Resuelto</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Tipo</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos</option>
              <option value="faltante">Faltante</option>
              <option value="sobrante">Sobrante</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Origen</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos</option>
              <option value="caja">Caja</option>
              <option value="banco">Banco</option>
              <option value="tpv">TPV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Diferencias */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>Control de Diferencias</h3>
        </div>
        <div className="divide-y divide-[#E2E8F0]">
          {diferencias.map(diferencia => (
            <div key={diferencia.id} className="p-6 hover:bg-[#F8FAFC] transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    diferencia.tipo === 'faltante' ? 'bg-[#FEE2E2]' : 'bg-[#FEF3C7]'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      diferencia.tipo === 'faltante' ? 'text-[#EF4444]' : 'text-[#F59E0B]'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#0F172A]" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{diferencia.id}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoBadge(diferencia.estado)}`} style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        {diferencia.estado.charAt(0).toUpperCase() + diferencia.estado.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px' }}>{diferencia.descripcion}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#94A3B8]" style={{ fontSize: '12px', lineHeight: '16px' }}>
                      <span>📅 {diferencia.fecha}</span>
                      <span>📍 {diferencia.origen.toUpperCase()}</span>
                      {diferencia.responsable && <span>👤 {diferencia.responsable}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    diferencia.tipo === 'faltante' ? 'text-[#EF4444]' : 'text-[#F59E0B]'
                  }`} style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700 }}>
                    {diferencia.tipo === 'faltante' ? '-' : '+'}${diferencia.monto.toFixed(2)}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1 capitalize" style={{ fontSize: '12px', lineHeight: '16px' }}>{diferencia.tipo}</p>
                </div>
              </div>

              {diferencia.resolucion && (
                <div className="mt-3 p-3 bg-[#D1FAE5] rounded-lg border border-[#10B981]">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#10B981] mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[#047857]" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Resolución:</p>
                      <p className="text-sm text-[#047857]" style={{ fontSize: '14px', lineHeight: '20px' }}>{diferencia.resolucion}</p>
                    </div>
                  </div>
                </div>
              )}

              {diferencia.estado !== 'resuelto' && (
                <div className="flex gap-2 mt-3">
                  <button 
                    className="text-sm bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8] text-white font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{ 
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 500
                    }}
                  >
                    Investigar
                  </button>
                  <button 
                    className="text-sm bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{ 
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 500
                    }}
                  >
                    Marcar como Resuelto
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

