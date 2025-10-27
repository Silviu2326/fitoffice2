import { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Notificacion {
  id: string;
  tipo: 'lista_espera' | 'recordatorio' | 'penalizacion' | 'confirmacion';
  destinatario: string;
  asunto: string;
  canal: 'email' | 'sms' | 'push';
  estado: 'pendiente' | 'enviada' | 'fallida' | 'leida';
  fechaEnvio?: string;
  fechaLectura?: string;
}

export default function NotificacionesAutomaticas() {
  const [notificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      tipo: 'lista_espera',
      destinatario: 'María López',
      asunto: '¡Plaza disponible en Yoga Avanzado!',
      canal: 'push',
      estado: 'enviada',
      fechaEnvio: '2025-10-26 14:30'
    },
    {
      id: '2',
      tipo: 'recordatorio',
      destinatario: 'Juan Martínez',
      asunto: 'Recordatorio: Clase de Spinning en 2 horas',
      canal: 'sms',
      estado: 'enviada',
      fechaEnvio: '2025-10-26 07:00'
    },
    {
      id: '3',
      tipo: 'penalizacion',
      destinatario: 'Pedro Sánchez',
      asunto: 'Penalización aplicada por ausencia',
      canal: 'email',
      estado: 'leida',
      fechaEnvio: '2025-10-25 18:30',
      fechaLectura: '2025-10-25 19:15'
    },
    {
      id: '4',
      tipo: 'confirmacion',
      destinatario: 'Ana García',
      asunto: 'Reserva confirmada para CrossFit',
      canal: 'push',
      estado: 'pendiente'
    }
  ]);

  const [config, setConfig] = useState({
    recordatorio24h: true,
    recordatorio2h: true,
    notificarListaEspera: true,
    notificarPenalizacion: true,
    tiempoRespuesta: 30
  });

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'lista_espera':
        return <Bell className="w-5 h-5 text-white" />;
      case 'recordatorio':
        return <Clock className="w-5 h-5 text-white" />;
      case 'penalizacion':
        return <XCircle className="w-5 h-5 text-white" />;
      case 'confirmacion':
        return <CheckCircle className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  const getCanalIcon = (canal: string) => {
    switch (canal) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'push':
        return <Smartphone className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return (
          <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium rounded-full">
            Pendiente
          </span>
        );
      case 'enviada':
        return (
          <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium rounded-full">
            Enviada
          </span>
        );
      case 'fallida':
        return (
          <span className="px-3 py-1 bg-[#FEE2E2] text-[#EF4444] text-xs font-medium rounded-full">
            Fallida
          </span>
        );
      case 'leida':
        return (
          <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-medium rounded-full">
            Leída
          </span>
        );
      default:
        return null;
    }
  };

  const pendientes = notificaciones.filter(n => n.estado === 'pendiente').length;
  const enviadas = notificaciones.filter(n => n.estado === 'enviada').length;
  const leidas = notificaciones.filter(n => n.estado === 'leida').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Notificaciones Automáticas</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Enviar Pendientes
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#0F172A] font-semibold">Pendientes</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{pendientes}</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[#0F172A] font-semibold">Enviadas</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{enviadas}</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#0F172A] font-semibold">Leídas</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{leidas}</p>
        </div>
      </div>

      {/* Configuración */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Configuración de Notificaciones</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0F172A] font-semibold">Recordatorio 24h antes</p>
              <p className="text-sm text-[#64748B]">Enviar recordatorio un día antes de la clase</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.recordatorio24h}
                onChange={(e) => setConfig({ ...config, recordatorio24h: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6366F1] peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366F1]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0F172A] font-semibold">Recordatorio 2h antes</p>
              <p className="text-sm text-[#64748B]">Enviar recordatorio dos horas antes de la clase</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.recordatorio2h}
                onChange={(e) => setConfig({ ...config, recordatorio2h: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6366F1] peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366F1]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0F172A] font-semibold">Notificar Lista de Espera</p>
              <p className="text-sm text-[#64748B]">Avisar cuando se libere una plaza</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notificarListaEspera}
                onChange={(e) => setConfig({ ...config, notificarListaEspera: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6366F1] peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366F1]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0F172A] font-semibold">Notificar Penalizaciones</p>
              <p className="text-sm text-[#64748B]">Informar sobre cargos por ausencias</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notificarPenalizacion}
                onChange={(e) => setConfig({ ...config, notificarPenalizacion: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6366F1] peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366F1]"></div>
            </label>
          </div>

          <div>
            <label className="block text-[#0F172A] font-semibold mb-2">
              Tiempo de respuesta (minutos)
            </label>
            <input
              type="number"
              value={config.tiempoRespuesta}
              onChange={(e) => setConfig({ ...config, tiempoRespuesta: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white text-[#0F172A] rounded-lg border border-[#E2E8F0] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 transition-all duration-200"
            />
            <p className="text-sm text-[#64748B] mt-1">Tiempo que tienen los socios para confirmar desde lista de espera</p>
          </div>
        </div>
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[#0F172A]">Historial de Notificaciones</h3>
        {notificaciones.map((notif) => (
          <div
            key={notif.id}
            className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                  {getTipoIcon(notif.tipo)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-[#0F172A]">{notif.destinatario}</h4>
                    {getEstadoBadge(notif.estado)}
                  </div>
                  
                  <p className="text-[#0F172A] mb-2">{notif.asunto}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-[#64748B]">
                    <div className="flex items-center gap-2">
                      {getCanalIcon(notif.canal)}
                      <span className="capitalize">{notif.canal}</span>
                    </div>
                    {notif.fechaEnvio && (
                      <span>Enviada: {notif.fechaEnvio}</span>
                    )}
                    {notif.fechaLectura && (
                      <span>Leída: {notif.fechaLectura}</span>
                    )}
                  </div>
                </div>
              </div>

              {notif.estado === 'pendiente' && (
                <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2">
                  Enviar Ahora
                </button>
              )}
              {notif.estado === 'fallida' && (
                <button className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2">
                  Reintentar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

