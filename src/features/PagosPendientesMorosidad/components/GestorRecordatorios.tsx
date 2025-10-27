import { useState, useEffect } from 'react';
import { Send, Mail, MessageSquare, Phone, Calendar } from 'lucide-react';
import { 
  Recordatorio, 
  obtenerRecordatoriosPendientes,
  enviarRecordatorio,
  obtenerPlantillaPorDiasRetraso,
  generarMensajeRecordatorio
} from '../api/recordatorios';
import { PagoVencido, obtenerPagosVencidos } from '../api/morosidad';

export default function GestorRecordatorios() {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [pagosVencidos, setPagosVencidos] = useState<PagoVencido[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [recordatoriosData, pagosData] = await Promise.all([
        obtenerRecordatoriosPendientes(),
        obtenerPagosVencidos()
      ]);
      setRecordatorios(recordatoriosData);
      setPagosVencidos(pagosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarRecordatorio = async (pago: PagoVencido) => {
    try {
      setEnviando(true);
      const plantilla = obtenerPlantillaPorDiasRetraso(pago.dias_retraso);
      const mensaje = generarMensajeRecordatorio(plantilla, {
        nombre: pago.cliente_nombre,
        monto: pago.monto_pendiente,
        fecha: new Date(pago.fecha_vencimiento).toLocaleDateString('es-ES'),
        dias: pago.dias_retraso
      });

      await enviarRecordatorio(
        pago.id,
        pago.cliente_id,
        plantilla.tipo,
        mensaje,
        'email'
      );

      await cargarDatos();
      alert('Recordatorio enviado correctamente');
    } catch (error) {
      console.error('Error al enviar recordatorio:', error);
      alert('Error al enviar recordatorio');
    } finally {
      setEnviando(false);
    }
  };

  const handleEnviarMasivo = async () => {
    if (!confirm(`¿Enviar recordatorios a ${pagosVencidos.length} clientes?`)) {
      return;
    }

    try {
      setEnviando(true);
      for (const pago of pagosVencidos) {
        await handleEnviarRecordatorio(pago);
      }
      alert('Recordatorios masivos enviados correctamente');
    } catch (error) {
      console.error('Error en envío masivo:', error);
      alert('Error en envío masivo');
    } finally {
      setEnviando(false);
    }
  };

  const getIconoCanal = (canal: string) => {
    switch (canal) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'app':
        return <Phone className="w-4 h-4" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  const getColorTipo = (tipo: string) => {
    const colores = {
      amigable: 'bg-[#D1FAE5] text-[#10B981]',
      firme: 'bg-[#FEF3C7] text-[#F59E0B]',
      urgente: 'bg-[#FED7AA] text-[#F59E0B]',
      legal: 'bg-[#FEE2E2] text-[#EF4444]',
    };
    return colores[tipo as keyof typeof colores] || 'bg-[#E2E8F0] text-[#64748B]';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[16px] shadow-md p-6 border border-[#E2E8F0]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6366F1] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#DBEAFE] rounded-[12px]">
              <Send className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Gestor de Recordatorios</h2>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Sistema escalonado de recordatorios automáticos</p>
            </div>
          </div>
          <button
            onClick={handleEnviarMasivo}
            disabled={enviando || pagosVencidos.length === 0}
            className="px-4 py-2 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg text-[14px] leading-[20px]"
          >
            <Send className="w-4 h-4" />
            Enviar Masivo ({pagosVencidos.length})
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recordatorios Pendientes */}
          <div>
            <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#3B82F6]" />
              Recordatorios Pendientes
            </h3>
            <div className="space-y-3">
              {recordatorios.length === 0 ? (
                <div className="text-center py-8 text-[#64748B] text-[16px] leading-[24px]">
                  No hay recordatorios pendientes
                </div>
              ) : (
                recordatorios.map((recordatorio) => (
                  <div key={recordatorio.id} className="border border-[#E2E8F0] rounded-[12px] p-4 hover:border-[#6366F1] transition-all duration-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIconoCanal(recordatorio.canal)}
                        <span className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{recordatorio.cliente_nombre}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-[8px] text-[12px] leading-[16px] font-semibold ${getColorTipo(recordatorio.tipo)}`}>
                        {recordatorio.tipo}
                      </span>
                    </div>
                    <p className="text-[14px] leading-[20px] text-[#64748B] mb-2">{recordatorio.mensaje}</p>
                    <div className="flex items-center justify-between text-[12px] leading-[16px] text-[#64748B]">
                      <span>Canal: {recordatorio.canal}</span>
                      <span>{new Date(recordatorio.fecha_envio).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagos Que Necesitan Recordatorio */}
          <div>
            <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-[#F59E0B]" />
              Clientes Que Necesitan Recordatorio
            </h3>
            <div className="space-y-3">
              {pagosVencidos.length === 0 ? (
                <div className="text-center py-8 text-[#64748B] text-[16px] leading-[24px]">
                  ¡Todos al día! No hay clientes que necesiten recordatorios
                </div>
              ) : (
                pagosVencidos.slice(0, 10).map((pago) => {
                  const plantilla = obtenerPlantillaPorDiasRetraso(pago.dias_retraso);
                  return (
                    <div key={pago.id} className="border border-[#E2E8F0] rounded-[12px] p-4 hover:border-[#6366F1] transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{pago.cliente_nombre}</div>
                          <div className="text-[14px] leading-[20px] text-[#64748B]">{pago.descripcion}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-[#EF4444] text-[16px] leading-[24px]">{pago.monto_pendiente.toFixed(2)}€</div>
                          <div className="text-[12px] leading-[16px] text-[#64748B]">{pago.dias_retraso} días</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`px-2 py-1 rounded-[8px] text-[12px] leading-[16px] font-semibold ${getColorTipo(plantilla.tipo)}`}>
                          {plantilla.tipo}
                        </span>
                        <button
                          onClick={() => handleEnviarRecordatorio(pago)}
                          disabled={enviando}
                          className="px-3 py-1 bg-[#6366F1] text-white rounded-[8px] text-[12px] leading-[16px] font-semibold hover:bg-[#4F46E5] transition-all duration-200 disabled:opacity-50 shadow-sm"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

