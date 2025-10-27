import { Bell, Mail, MessageSquare, Check } from 'lucide-react';
import { useState } from 'react';

interface ConfigRecordatorio {
  id: string;
  tipo: 'email' | 'sms' | 'push';
  nombre: string;
  anticipacion: number;
  unidad: 'minutos' | 'horas' | 'dias';
  activo: boolean;
  mensaje: string;
}

export default function RecordatoriosAutomaticos() {
  const [recordatorios, setRecordatorios] = useState<ConfigRecordatorio[]>([
    {
      id: '1',
      tipo: 'email',
      nombre: 'Recordatorio 24h antes',
      anticipacion: 24,
      unidad: 'horas',
      activo: true,
      mensaje: 'Hola {cliente}, te recordamos tu cita mañana a las {hora}.'
    },
    {
      id: '2',
      tipo: 'sms',
      nombre: 'Recordatorio 2h antes',
      anticipacion: 2,
      unidad: 'horas',
      activo: true,
      mensaje: 'Tu sesión comienza en 2 horas. Te esperamos!'
    },
    {
      id: '3',
      tipo: 'push',
      nombre: 'Recordatorio 15min antes',
      anticipacion: 15,
      unidad: 'minutos',
      activo: false,
      mensaje: 'Tu sesión comienza en 15 minutos.'
    },
    {
      id: '4',
      tipo: 'email',
      nombre: 'Confirmación de reserva',
      anticipacion: 0,
      unidad: 'minutos',
      activo: true,
      mensaje: 'Tu reserva ha sido confirmada para el {fecha} a las {hora}.'
    }
  ]);

  const toggleRecordatorio = (id: string) => {
    setRecordatorios(prev =>
      prev.map(r => (r.id === id ? { ...r, activo: !r.activo } : r))
    );
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5" />;
      case 'push':
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return 'bg-[#DBEAFE] text-[#3B82F6]';
      case 'sms':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'push':
        return 'bg-[#EEF2FF] text-[#6366F1]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return 'Email';
      case 'sms':
        return 'SMS';
      case 'push':
        return 'Push';
      default:
        return tipo;
    }
  };

  const formatearAnticipacion = (anticipacion: number, unidad: string) => {
    if (anticipacion === 0) return 'Inmediato';
    return `${anticipacion} ${unidad} antes`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-[#F59E0B]" />
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Recordatorios Automáticos</h3>
            <p className="text-[14px] leading-[20px] text-[#64748B]">
              Configura notificaciones automáticas para tus clientes
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#DBEAFE] rounded-2xl p-4 border border-[#3B82F6] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[14px] text-[#0F172A] font-semibold">Emails</span>
            </div>
            <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">
              {recordatorios.filter(r => r.tipo === 'email' && r.activo).length}
            </p>
            <p className="text-[12px] leading-[16px] text-[#64748B]">activos</p>
          </div>

          <div className="bg-[#D1FAE5] rounded-2xl p-4 border border-[#10B981] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-[#10B981]" />
              <span className="text-[14px] text-[#0F172A] font-semibold">SMS</span>
            </div>
            <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">
              {recordatorios.filter(r => r.tipo === 'sms' && r.activo).length}
            </p>
            <p className="text-[12px] leading-[16px] text-[#64748B]">activos</p>
          </div>

          <div className="bg-[#EEF2FF] rounded-2xl p-4 border border-[#6366F1] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-[#6366F1]" />
              <span className="text-[14px] text-[#0F172A] font-semibold">Push</span>
            </div>
            <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">
              {recordatorios.filter(r => r.tipo === 'push' && r.activo).length}
            </p>
            <p className="text-[12px] leading-[16px] text-[#64748B]">activos</p>
          </div>
        </div>

        {/* Lista de recordatorios */}
        <div className="space-y-4">
          {recordatorios.map(recordatorio => (
            <div
              key={recordatorio.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                recordatorio.activo
                  ? 'border-[#10B981] bg-[#D1FAE5]'
                  : 'border-[#E2E8F0] bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Toggle */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={recordatorio.activo}
                      onChange={() => toggleRecordatorio(recordatorio.id)}
                      className="w-5 h-5 text-[#10B981] rounded focus:ring-[#10B981]"
                    />
                  </div>

                  {/* Icono del tipo */}
                  <div className={`p-3 rounded-xl ${getTipoColor(recordatorio.tipo)}`}>
                    {getTipoIcon(recordatorio.tipo)}
                  </div>

                  {/* Información */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4
                        className={`font-semibold text-[16px] ${
                          recordatorio.activo ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                        }`}
                      >
                        {recordatorio.nombre}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-[12px] leading-[16px] font-medium ${getTipoColor(
                          recordatorio.tipo
                        )}`}
                      >
                        {getTipoLabel(recordatorio.tipo)}
                      </span>
                    </div>

                    {recordatorio.activo && (
                      <>
                        <p className="text-[14px] leading-[20px] text-[#64748B] mb-2">
                          <span className="font-medium">Enviar:</span>{' '}
                          {formatearAnticipacion(recordatorio.anticipacion, recordatorio.unidad)}
                        </p>
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-3">
                          <p className="text-[14px] leading-[20px] text-[#0F172A] italic">"{recordatorio.mensaje}"</p>
                        </div>
                      </>
                    )}
                    {!recordatorio.activo && (
                      <p className="text-[14px] text-[#94A3B8] italic">Recordatorio desactivado</p>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                {recordatorio.activo && (
                  <button className="px-3 py-2 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-white transition-all duration-200 text-[14px] font-semibold">
                    Editar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-[#DBEAFE] border border-[#3B82F6] rounded-xl">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#3B82F6] mt-0.5" />
            <div>
              <p className="text-[14px] leading-[20px] text-[#0F172A] font-semibold mb-1">
                Recordatorios Automáticos Activos
              </p>
              <p className="text-[14px] leading-[20px] text-[#64748B]">
                Los recordatorios se enviarán automáticamente a tus clientes según la configuración.
                Puedes usar variables como {'{cliente}'}, {'{fecha}'} y {'{hora}'} en tus mensajes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

