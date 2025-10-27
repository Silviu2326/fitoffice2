import { useState } from 'react';
import { Send, Clock, CheckCircle, Mail, Calendar } from 'lucide-react';

interface Factura {
  id: string;
  numeroFactura: string;
  cliente: string;
  fecha: string;
  vencimiento: string;
  importe: number;
  estado: 'pendiente' | 'pagada' | 'vencida' | 'cancelada';
  concepto: string;
}

interface RecordatoriosPagoProps {
  facturas: Factura[];
}

interface Recordatorio {
  id: string;
  facturaId: string;
  tipo: 'automatico' | 'manual';
  fecha: string;
  estado: 'enviado' | 'programado';
}

export default function RecordatoriosPago({ facturas }: RecordatoriosPagoProps) {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([
    {
      id: '1',
      facturaId: '2',
      tipo: 'automatico',
      fecha: '2025-10-15',
      estado: 'enviado'
    },
    {
      id: '2',
      facturaId: '3',
      tipo: 'automatico',
      fecha: '2025-10-12',
      estado: 'enviado'
    }
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState('');

  const facturaPendientes = facturas.filter(f => f.estado === 'pendiente' || f.estado === 'vencida');

  const enviarRecordatorio = () => {
    if (!facturaSeleccionada || !mensaje) return;

    const nuevoRecordatorio: Recordatorio = {
      id: Date.now().toString(),
      facturaId: facturaSeleccionada,
      tipo: 'manual',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'enviado'
    };

    setRecordatorios([nuevoRecordatorio, ...recordatorios]);
    setMostrarFormulario(false);
    setFacturaSeleccionada('');
    setMensaje('');
  };

  const obtenerFactura = (facturaId: string) => {
    return facturas.find(f => f.id === facturaId);
  };

  const recordatoriosEnviados = recordatorios.filter(r => r.estado === 'enviado').length;
  const recordatoriosProgramados = recordatorios.filter(r => r.estado === 'programado').length;

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Total Recordatorios</span>
            <Mail className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{recordatorios.length}</div>
          <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-1">Este mes</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Enviados</span>
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{recordatoriosEnviados}</div>
          <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-1">Recordatorios completados</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Programados</span>
            <Clock className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{recordatoriosProgramados}</div>
          <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-1">Pendientes de envío</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Historial de Recordatorios</h3>
          <p className="text-[14px] leading-[20px] text-[#94A3B8]">Recordatorios de pago enviados a clientes</p>
        </div>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white text-[16px] font-semibold rounded-xl hover:bg-[#2563EB] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
        >
          <Send className="w-5 h-5" />
          Enviar Recordatorio Manual
        </button>
      </div>

      {/* Formulario de envío */}
      {mostrarFormulario && (
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md">
          <h4 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9] mb-4">Nuevo Recordatorio</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] leading-[20px] font-medium text-[#F1F5F9] mb-2">
                Factura *
              </label>
              <select
                value={facturaSeleccionada}
                onChange={(e) => setFacturaSeleccionada(e.target.value)}
                className="w-full h-12 px-4 py-2 bg-[#2A2A3A] border border-[#334155] rounded-xl text-[#F1F5F9] text-[16px] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
              >
                <option value="">Seleccionar factura</option>
                {facturaPendientes.map(factura => (
                  <option key={factura.id} value={factura.id}>
                    {factura.numeroFactura} - {factura.cliente} - €{factura.importe.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[14px] leading-[20px] font-medium text-[#F1F5F9] mb-2">
                Mensaje personalizado
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-[#2A2A3A] border border-[#334155] rounded-xl text-[#F1F5F9] text-[16px] placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                placeholder="Escribe un mensaje personalizado para el cliente..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#2A2A3A] text-[#F1F5F9] text-[16px] font-medium rounded-xl border border-[#334155] hover:bg-[#334155] transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={enviarRecordatorio}
                disabled={!facturaSeleccionada || !mensaje}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#3B82F6] text-white text-[16px] font-semibold rounded-xl hover:bg-[#2563EB] active:scale-[0.98] disabled:bg-[#64748B] disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Enviar Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de recordatorios */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F0F23]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Importe
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {recordatorios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#94A3B8]">
                    <Mail className="w-12 h-12 mx-auto mb-2 text-[#64748B]" />
                    <p className="text-[16px]">No hay recordatorios registrados</p>
                  </td>
                </tr>
              ) : (
                recordatorios.map((recordatorio) => {
                  const factura = obtenerFactura(recordatorio.facturaId);
                  if (!factura) return null;

                  return (
                    <tr key={recordatorio.id} className="hover:bg-[#2A2A3A] transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-[14px] text-[#F1F5F9]">
                          <Calendar className="w-4 h-4 text-[#94A3B8]" />
                          {recordatorio.fecha}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] font-medium text-[#F1F5F9]">{factura.numeroFactura}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] text-[#F1F5F9]">{factura.cliente}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] font-semibold text-[#F1F5F9]">€{factura.importe.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[12px] font-medium ${
                          recordatorio.tipo === 'automatico'
                            ? 'bg-[#8B5CF6]/20 text-[#A78BFA]'
                            : 'bg-[#DBEAFE] text-[#3B82F6]'
                        }`}>
                          {recordatorio.tipo === 'automatico' ? 'Automático' : 'Manual'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium ${
                          recordatorio.estado === 'enviado'
                            ? 'bg-[#D1FAE5] text-[#10B981]'
                            : 'bg-[#FEF3C7] text-[#F59E0B]'
                        }`}>
                          {recordatorio.estado === 'enviado' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {recordatorio.estado === 'enviado' ? 'Enviado' : 'Programado'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

