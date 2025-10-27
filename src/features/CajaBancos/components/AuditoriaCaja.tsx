import { useState } from 'react';
import { Shield, Eye, Clock, User, FileText, Search } from 'lucide-react';

interface AuditoriaRegistro {
  id: string;
  fecha: string;
  hora: string;
  usuario: string;
  accion: string;
  modulo: 'caja' | 'banco' | 'tpv' | 'arqueo';
  detalles: string;
  ipAddress: string;
  valorAnterior?: string;
  valorNuevo?: string;
}

export default function AuditoriaCaja() {
  const [registros] = useState<AuditoriaRegistro[]>([
    {
      id: 'AUD-001',
      fecha: '2025-10-26',
      hora: '14:35:22',
      usuario: 'Ana Martínez',
      accion: 'Registro de arqueo',
      modulo: 'arqueo',
      detalles: 'Se realizó arqueo de caja del turno tarde',
      ipAddress: '192.168.1.105'
    },
    {
      id: 'AUD-002',
      fecha: '2025-10-26',
      hora: '12:20:15',
      usuario: 'Carlos López',
      accion: 'Modificación de movimiento',
      modulo: 'caja',
      detalles: 'Modificó el concepto de un movimiento',
      ipAddress: '192.168.1.103',
      valorAnterior: 'Pago cliente',
      valorNuevo: 'Pago suscripción mensual'
    },
    {
      id: 'AUD-003',
      fecha: '2025-10-26',
      hora: '10:15:30',
      usuario: 'María González',
      accion: 'Conciliación bancaria',
      modulo: 'banco',
      detalles: 'Importó extracto bancario y concilió movimientos',
      ipAddress: '192.168.1.110'
    },
    {
      id: 'AUD-004',
      fecha: '2025-10-25',
      hora: '18:45:12',
      usuario: 'Juan Pérez',
      accion: 'Registro TPV',
      modulo: 'tpv',
      detalles: 'Registró transacción con tarjeta',
      ipAddress: '192.168.1.102'
    },
    {
      id: 'AUD-005',
      fecha: '2025-10-25',
      hora: '16:30:45',
      usuario: 'Ana Martínez',
      accion: 'Ajuste de diferencia',
      modulo: 'caja',
      detalles: 'Ajustó diferencia de caja',
      ipAddress: '192.168.1.105',
      valorAnterior: '$0.00',
      valorNuevo: '-$15.50'
    }
  ]);

  const totalAcciones = registros.length;
  const usuariosActivos = new Set(registros.map(r => r.usuario)).size;
  const accionesHoy = registros.filter(r => r.fecha === '2025-10-26').length;

  const getModuloBadge = (modulo: AuditoriaRegistro['modulo']) => {
    const colors = {
      caja: 'bg-[#D1FAE5] text-[#10B981]',
      banco: 'bg-[#DBEAFE] text-[#3B82F6]',
      tpv: 'bg-[#E9D5FF] text-[#8B5CF6]',
      arqueo: 'bg-[#FEF3C7] text-[#F59E0B]'
    };
    return colors[modulo];
  };

  return (
    <div className="space-y-6">
      {/* Resumen de Auditoría */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Total</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>{totalAcciones}</p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Registros de auditoría</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Hoy</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>{accionesHoy}</p>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Acciones registradas</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <User className="w-8 h-8 text-[#8B5CF6]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Usuarios</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>{usuariosActivos}</p>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Usuarios activos</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Última</span>
          </div>
          <p className="text-lg font-bold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 700 }}>{registros[0].hora}</p>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>Última actividad</p>
        </div>
      </div>

      {/* Información de Auditoría */}
      <div className="bg-[#DBEAFE] border-l-4 border-[#3B82F6] p-4 rounded-r-lg">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-[#3B82F6] mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-[#1E40AF]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
              Sistema de Auditoría Activo
            </h3>
            <p className="text-sm text-[#1E40AF] mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
              Todas las acciones en el módulo de Caja & Bancos son registradas automáticamente para garantizar la trazabilidad y seguridad de las operaciones financieras.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros de Búsqueda */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0] p-6" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-[#64748B]" />
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>Filtros de Auditoría</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Usuario</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos los usuarios</option>
              <option value="ana">Ana Martínez</option>
              <option value="carlos">Carlos López</option>
              <option value="maria">María González</option>
              <option value="juan">Juan Pérez</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Módulo</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos los módulos</option>
              <option value="caja">Caja</option>
              <option value="banco">Banco</option>
              <option value="tpv">TPV</option>
              <option value="arqueo">Arqueo</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Fecha Desde</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Fecha Hasta</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            />
          </div>
        </div>
      </div>

      {/* Registros de Auditoría */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>Registros de Auditoría</h3>
          <button 
            className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
            style={{ 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500
            }}
          >
            <FileText className="w-4 h-4" />
            Exportar Log
          </button>
        </div>
        <div className="divide-y divide-[#E2E8F0]">
          {registros.map(registro => (
            <div key={registro.id} className="p-6 hover:bg-[#F8FAFC] transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F8FAFC] rounded-lg">
                    <Eye className="w-5 h-5 text-[#64748B]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#0F172A]" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{registro.accion}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getModuloBadge(registro.modulo)}`} style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        {registro.modulo.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B] mb-2" style={{ fontSize: '14px', lineHeight: '20px' }}>{registro.detalles}</p>
                    <div className="flex items-center gap-4 text-xs text-[#94A3B8]" style={{ fontSize: '12px', lineHeight: '16px' }}>
                      <span>👤 {registro.usuario}</span>
                      <span>📅 {registro.fecha} {registro.hora}</span>
                      <span>🌐 {registro.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#94A3B8]" style={{ fontSize: '12px', lineHeight: '16px' }}>{registro.id}</span>
              </div>

              {(registro.valorAnterior || registro.valorNuevo) && (
                <div className="mt-3 p-3 bg-[#F8FAFC] rounded-lg">
                  <p className="text-xs font-medium text-[#0F172A] mb-2" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Cambios realizados:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {registro.valorAnterior && (
                      <div>
                        <span className="text-xs text-[#94A3B8]" style={{ fontSize: '12px', lineHeight: '16px' }}>Valor anterior:</span>
                        <p className="text-[#0F172A] font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>{registro.valorAnterior}</p>
                      </div>
                    )}
                    {registro.valorNuevo && (
                      <div>
                        <span className="text-xs text-[#94A3B8]" style={{ fontSize: '12px', lineHeight: '16px' }}>Valor nuevo:</span>
                        <p className="text-[#0F172A] font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>{registro.valorNuevo}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

