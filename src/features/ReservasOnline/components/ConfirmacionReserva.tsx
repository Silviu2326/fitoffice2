import { CheckCircle, Calendar, Clock, User, CreditCard, MapPin, Video, X } from 'lucide-react';
import { useState } from 'react';

interface ConfirmacionReservaProps {
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ConfirmacionReserva({ onConfirmar, onCancelar }: ConfirmacionReservaProps) {
  const [tipoSesion, setTipoSesion] = useState<'presencial' | 'videollamada'>('presencial');
  const [servicio, setServicio] = useState('evaluacion');
  const [cliente, setCliente] = useState('');
  const [notas, setNotas] = useState('');

  const servicios = [
    { id: 'evaluacion', nombre: 'Evaluación Inicial', precio: 50, duracion: '60 min' },
    { id: 'seguimiento', nombre: 'Seguimiento Mensual', precio: 40, duracion: '45 min' },
    { id: 'consulta', nombre: 'Consulta Rápida', precio: 25, duracion: '30 min' },
    { id: 'planificacion', nombre: 'Planificación Trimestral', precio: 80, duracion: '90 min' },
  ];

  const servicioSeleccionado = servicios.find(s => s.id === servicio);

  const handleConfirmar = () => {
    if (!cliente.trim()) {
      alert('Por favor, ingresa el nombre del cliente');
      return;
    }
    onConfirmar();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Confirmar Reserva</h2>
          <p className="text-[#64748B] mt-1">Completa los detalles de la reserva</p>
        </div>
        <button
          onClick={onCancelar}
          className="p-2 hover:bg-[#F8FAFC] rounded-xl transition-all duration-200"
        >
          <X className="w-6 h-6 text-[#64748B]" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            {/* Cliente */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Cliente
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Nombre del cliente"
                  className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Tipo de Sesión */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                Tipo de Sesión
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTipoSesion('presencial')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    tipoSesion === 'presencial'
                      ? 'border-[#6366F1] bg-[#EEF2FF] text-[#6366F1]'
                      : 'border-[#E2E8F0] hover:border-[#6366F1] hover:bg-[#F8FAFC] text-[#64748B]'
                  }`}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Presencial</span>
                </button>
                <button
                  onClick={() => setTipoSesion('videollamada')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    tipoSesion === 'videollamada'
                      ? 'border-[#6366F1] bg-[#EEF2FF] text-[#6366F1]'
                      : 'border-[#E2E8F0] hover:border-[#6366F1] hover:bg-[#F8FAFC] text-[#64748B]'
                  }`}
                >
                  <Video className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Videollamada</span>
                </button>
              </div>
            </div>

            {/* Servicio */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Servicio
              </label>
              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
              >
                {servicios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre} - €{s.precio} ({s.duracion})
                  </option>
                ))}
              </select>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Notas (opcional)
              </label>
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Notas adicionales sobre la sesión..."
                rows={4}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Resumen */}
          <div>
            <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] rounded-2xl p-6 border border-[#6366F1]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#6366F1] p-3 rounded-xl shadow-md">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#4338CA]">Resumen de Reserva</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-[#0F172A]">
                    <Calendar className="w-5 h-5 text-[#6366F1]" />
                    <div>
                      <p className="text-xs text-[#64748B] font-medium uppercase">Fecha</p>
                      <p className="font-semibold">27 de Octubre, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-[#0F172A]">
                    <Clock className="w-5 h-5 text-[#6366F1]" />
                    <div>
                      <p className="text-xs text-[#64748B] font-medium uppercase">Hora</p>
                      <p className="font-semibold">10:00 AM</p>
                    </div>
                  </div>
                </div>

                {servicioSeleccionado && (
                  <>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3 text-[#0F172A]">
                        <CreditCard className="w-5 h-5 text-[#6366F1]" />
                        <div>
                          <p className="text-xs text-[#64748B] font-medium uppercase">Servicio</p>
                          <p className="font-semibold">{servicioSeleccionado.nombre}</p>
                          <p className="text-sm text-[#64748B]">{servicioSeleccionado.duracion}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3 text-[#0F172A]">
                        {tipoSesion === 'presencial' ? (
                          <MapPin className="w-5 h-5 text-[#6366F1]" />
                        ) : (
                          <Video className="w-5 h-5 text-[#6366F1]" />
                        )}
                        <div>
                          <p className="text-xs text-[#64748B] font-medium uppercase">Modalidad</p>
                          <p className="font-semibold">
                            {tipoSesion === 'presencial' ? 'Presencial' : 'Videollamada'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {cliente && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 text-[#0F172A]">
                      <User className="w-5 h-5 text-[#6366F1]" />
                      <div>
                        <p className="text-xs text-[#64748B] font-medium uppercase">Cliente</p>
                        <p className="font-semibold">{cliente}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {servicioSeleccionado && (
                <div className="mt-6 pt-4 border-t border-[#6366F1]/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4338CA] font-semibold">Total</span>
                    <span className="text-2xl font-bold text-[#4338CA]">
                      €{servicioSeleccionado.precio}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleConfirmar}
                disabled={!cliente.trim()}
                className={`w-full px-6 py-4 rounded-xl font-semibold shadow-md transition-all duration-200 ${
                  cliente.trim()
                    ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5] active:bg-[#4338CA] hover:shadow-lg'
                    : 'bg-[#94A3B8] text-[#F1F5F9] cursor-not-allowed opacity-50'
                }`}
              >
                Confirmar Reserva y Procesar Pago
              </button>
              <button
                onClick={onCancelar}
                className="w-full px-6 py-4 bg-[#F8FAFC] text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 font-semibold border border-[#E2E8F0]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

