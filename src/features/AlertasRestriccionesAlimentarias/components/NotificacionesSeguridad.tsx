import { X, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface NotificacionesSeguridadProps {
  onClose: () => void;
}

interface Notificacion {
  id: string;
  tipo: 'critica' | 'advertencia' | 'info';
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
}

export default function NotificacionesSeguridad({ onClose }: NotificacionesSeguridadProps) {
  // Datos mock
  const notificaciones: Notificacion[] = [
    {
      id: '1',
      tipo: 'critica',
      titulo: 'Ingrediente bloqueado automáticamente',
      mensaje: 'Se detectó maní en la receta "Ensalada de pollo" para María García (alergia severa). El ingrediente fue bloqueado automáticamente.',
      fecha: '2024-10-26 14:30',
      leida: false
    },
    {
      id: '2',
      tipo: 'advertencia',
      titulo: 'Nueva restricción registrada',
      mensaje: 'Se ha registrado una nueva restricción alimentaria para Juan Pérez: Intolerancia a la lactosa (moderada).',
      fecha: '2024-10-26 12:15',
      leida: false
    },
    {
      id: '3',
      tipo: 'info',
      titulo: 'Validación exitosa de ingredientes',
      mensaje: 'Se validaron 45 ingredientes para planes nutricionales del día. Todos cumplieron con las restricciones establecidas.',
      fecha: '2024-10-26 10:00',
      leida: true
    },
    {
      id: '4',
      tipo: 'critica',
      titulo: 'Restricción religiosa detectada',
      mensaje: 'Se detectó cerdo en receta para Ahmed Hassan (Restricción Halal). Ingrediente bloqueado y notificación enviada al entrenador.',
      fecha: '2024-10-25 16:45',
      leida: true
    },
    {
      id: '5',
      tipo: 'info',
      titulo: 'Reporte de compliance generado',
      mensaje: 'El reporte mensual de compliance ha sido generado exitosamente. Score: 100% - Sin violaciones detectadas.',
      fecha: '2024-10-25 09:00',
      leida: true
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'critica':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'advertencia':
        return <AlertTriangle className="w-6 h-6 text-orange-400" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-400" />;
      default:
        return <Bell className="w-6 h-6 text-slate-400" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'critica':
        return 'red';
      case 'advertencia':
        return 'orange';
      case 'info':
        return 'blue';
      default:
        return 'slate';
    }
  };

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-[#E2E8F0] shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-6 flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl relative">
              <Bell className="w-6 h-6 text-white" />
              {noLeidas > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#10B981] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {noLeidas}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Notificaciones de Seguridad
              </h2>
              <p className="text-white/90">
                {noLeidas} notificaciones sin leer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Filtros rápidos */}
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-semibold shadow-sm">
              Todas
            </button>
            <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-sm font-medium transition-all duration-200">
              Críticas
            </button>
            <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-sm font-medium transition-all duration-200">
              Advertencias
            </button>
            <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-lg text-sm font-medium transition-all duration-200">
              Info
            </button>
          </div>

          {/* Lista de notificaciones */}
          <div className="space-y-3">
            {notificaciones.map((notificacion) => {
              const tipoColor = getTipoColor(notificacion.tipo);
              
              return (
                <div
                  key={notificacion.id}
                  className={`rounded-xl p-5 border transition-all duration-200 ${
                    notificacion.leida
                      ? 'bg-[#F8FAFC] border-[#E2E8F0]'
                      : 'bg-white border-[#E2E8F0] hover:border-[#6366F1] shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 bg-${tipoColor}-500/20 rounded-lg flex-shrink-0`}>
                      {getTipoIcon(notificacion.tipo)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-[#0F172A] font-bold">
                            {notificacion.titulo}
                          </h4>
                          {!notificacion.leida && (
                            <span className="w-2 h-2 bg-[#6366F1] rounded-full"></span>
                          )}
                        </div>
                        <span className={`px-3 py-1 bg-${tipoColor}-500/20 text-${tipoColor}-400 rounded-full text-xs font-medium flex-shrink-0`}>
                          {notificacion.tipo}
                        </span>
                      </div>
                      <p className={`text-sm mb-3 ${
                        notificacion.leida ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}>
                        {notificacion.mensaje}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#94A3B8] text-xs">
                          {notificacion.fecha}
                        </span>
                        {!notificacion.leida && (
                          <button className="text-xs text-[#10B981] hover:text-[#059669] font-semibold transition-all duration-200 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Marcar como leída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {notificaciones.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#64748B] mb-2">
                No hay notificaciones
              </h3>
              <p className="text-[#94A3B8]">
                Todas tus notificaciones están al día
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F8FAFC] p-4 flex justify-between items-center border-t border-[#E2E8F0]">
          <button className="text-sm text-[#6366F1] hover:text-[#4F46E5] font-semibold transition-all duration-200">
            Marcar todas como leídas
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

