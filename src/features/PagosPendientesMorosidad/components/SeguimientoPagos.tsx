import { useState, useEffect } from 'react';
import { ClipboardList, Plus, Search } from 'lucide-react';
import { 
  AccionSeguimiento, 
  obtenerAccionesPendientes,
  registrarAccionSeguimiento 
} from '../api/seguimiento';
import { PagoVencido, obtenerPagosVencidos } from '../api/morosidad';

export default function SeguimientoPagos() {
  const [acciones, setAcciones] = useState<AccionSeguimiento[]>([]);
  const [pagosVencidos, setPagosVencidos] = useState<PagoVencido[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaAccion, setNuevaAccion] = useState({
    pago_id: '',
    cliente_id: '',
    tipo_accion: 'llamada' as AccionSeguimiento['tipo_accion'],
    descripcion: '',
    resultado: 'pendiente' as AccionSeguimiento['resultado'],
    notas: '',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [accionesData, pagosData] = await Promise.all([
        obtenerAccionesPendientes(),
        obtenerPagosVencidos()
      ]);
      setAcciones(accionesData);
      setPagosVencidos(pagosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrarAccion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarAccionSeguimiento({
        ...nuevaAccion,
        fecha_accion: new Date().toISOString(),
        realizado_por: 'Usuario Actual', // TODO: obtener del contexto de auth
      });
      await cargarDatos();
      setMostrarModal(false);
      setNuevaAccion({
        pago_id: '',
        cliente_id: '',
        tipo_accion: 'llamada',
        descripcion: '',
        resultado: 'pendiente',
        notas: '',
      });
    } catch (error) {
      console.error('Error al registrar acción:', error);
      alert('Error al registrar acción');
    }
  };

  const getColorResultado = (resultado: string) => {
    const colores = {
      exitoso: 'bg-[#D1FAE5] text-[#10B981]',
      sin_respuesta: 'bg-[#E2E8F0] text-[#64748B]',
      promesa_pago: 'bg-[#DBEAFE] text-[#3B82F6]',
      disputa: 'bg-[#FED7AA] text-[#F59E0B]',
      rechazado: 'bg-[#FEE2E2] text-[#EF4444]',
      pendiente: 'bg-[#FEF3C7] text-[#F59E0B]',
    };
    return colores[resultado as keyof typeof colores] || 'bg-[#E2E8F0] text-[#64748B]';
  };

  const getIconoTipoAccion = (tipo: string) => {
    const iconos = {
      llamada: '📞',
      email: '📧',
      sms: '💬',
      whatsapp: '📱',
      reunion: '🤝',
      negociacion: '💰',
      legal: '⚖️',
      otro: '📝',
    };
    return iconos[tipo as keyof typeof iconos] || '📝';
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
            <div className="p-2 bg-[#F3E8FF] rounded-[12px]">
              <ClipboardList className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <div>
              <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Seguimiento de Pagos</h2>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Control detallado de todas las acciones de cobro</p>
            </div>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="px-4 py-2 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg text-[14px] leading-[20px]"
          >
            <Plus className="w-4 h-4" />
            Nueva Acción
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por cliente o descripción..."
              className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-[12px] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[16px] leading-[24px] text-[#0F172A] placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        <div className="space-y-3">
          {acciones.length === 0 ? (
            <div className="text-center py-12 text-[#64748B] text-[16px] leading-[24px]">
              No hay acciones de seguimiento registradas
            </div>
          ) : (
            acciones.map((accion) => (
              <div key={accion.id} className="border border-[#E2E8F0] rounded-[12px] p-4 hover:border-[#6366F1] transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getIconoTipoAccion(accion.tipo_accion)}</div>
                    <div>
                      <div className="font-medium text-[#0F172A] flex items-center gap-2 text-[16px] leading-[24px]">
                        {accion.tipo_accion.toUpperCase()}
                        <span className="text-[14px] leading-[20px] text-[#64748B]">•</span>
                        <span className="text-[14px] leading-[20px] font-normal text-[#64748B]">
                          {new Date(accion.fecha_accion).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <div className="text-[14px] leading-[20px] text-[#64748B] mt-1">{accion.descripcion}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[12px] leading-[16px] font-semibold ${getColorResultado(accion.resultado)}`}>
                    {accion.resultado}
                  </span>
                </div>
                
                {accion.notas && (
                  <div className="mt-2 p-3 bg-[#F8FAFC] rounded-[8px] text-[14px] leading-[20px] text-[#64748B]">
                    <span className="font-medium">Notas:</span> {accion.notas}
                  </div>
                )}

                {accion.fecha_proxima_accion && (
                  <div className="mt-2 flex items-center gap-2 text-[12px] leading-[16px] text-[#F59E0B]">
                    <span>📅</span>
                    <span>Próxima acción: {new Date(accion.fecha_proxima_accion).toLocaleDateString('es-ES')}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Nueva Acción */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="text-[20px] leading-[28px] font-bold text-[#0F172A]">Registrar Nueva Acción</h3>
            </div>
            <form onSubmit={handleRegistrarAccion} className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] leading-[20px] font-medium text-[#0F172A] mb-1">
                  Cliente
                </label>
                <select
                  value={nuevaAccion.pago_id}
                  onChange={(e) => {
                    const pago = pagosVencidos.find(p => p.id === e.target.value);
                    setNuevaAccion({ 
                      ...nuevaAccion, 
                      pago_id: e.target.value,
                      cliente_id: pago?.cliente_id || ''
                    });
                  }}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-[12px] focus:ring-2 focus:ring-[#6366F1] text-[16px] leading-[24px] text-[#0F172A]"
                  required
                >
                  <option value="">Seleccionar cliente...</option>
                  {pagosVencidos.map((pago) => (
                    <option key={pago.id} value={pago.id}>
                      {pago.cliente_nombre} - {pago.monto_pendiente}€ ({pago.dias_retraso} días)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tipo de Acción
                </label>
                <select
                  value={nuevaAccion.tipo_accion}
                  onChange={(e) => setNuevaAccion({ ...nuevaAccion, tipo_accion: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="llamada">Llamada</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="reunion">Reunión</option>
                  <option value="negociacion">Negociación</option>
                  <option value="legal">Legal</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={nuevaAccion.descripcion}
                  onChange={(e) => setNuevaAccion({ ...nuevaAccion, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Resultado
                </label>
                <select
                  value={nuevaAccion.resultado}
                  onChange={(e) => setNuevaAccion({ ...nuevaAccion, resultado: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="exitoso">Exitoso</option>
                  <option value="sin_respuesta">Sin Respuesta</option>
                  <option value="promesa_pago">Promesa de Pago</option>
                  <option value="disputa">Disputa</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  value={nuevaAccion.notas}
                  onChange={(e) => setNuevaAccion({ ...nuevaAccion, notas: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] transition-all duration-200 shadow-md hover:shadow-lg text-[16px] leading-[24px]"
                >
                  Registrar Acción
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 px-4 py-2 bg-[#F1F5F9] text-[#0F172A] rounded-[12px] font-semibold hover:bg-[#E2E8F0] transition-all duration-200 text-[16px] leading-[24px]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

