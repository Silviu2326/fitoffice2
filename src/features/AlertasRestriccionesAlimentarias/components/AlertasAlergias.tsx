import { X, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Restriccion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: string;
  descripcion: string;
  severidad: string;
  ingredientes: string[];
}

interface AlertasAlergiasProps {
  restriccion: Restriccion;
  onClose: () => void;
}

interface Alerta {
  id: string;
  fecha: string;
  ingrediente: string;
  receta: string;
  estado: 'pendiente' | 'resuelta' | 'bloqueada';
  severidad: 'alta' | 'media' | 'baja';
  accion: string;
}

export default function AlertasAlergias({ restriccion, onClose }: AlertasAlergiasProps) {
  // Datos mock de alertas
  const alertas: Alerta[] = [
    {
      id: '1',
      fecha: '2024-10-26',
      ingrediente: 'maní',
      receta: 'Ensalada de pollo con aderezo',
      estado: 'bloqueada',
      severidad: 'alta',
      accion: 'Ingrediente bloqueado automáticamente'
    },
    {
      id: '2',
      fecha: '2024-10-25',
      ingrediente: 'almendras',
      receta: 'Smoothie energético',
      estado: 'resuelta',
      severidad: 'alta',
      accion: 'Sustituido por semillas de girasol'
    },
    {
      id: '3',
      fecha: '2024-10-24',
      ingrediente: 'nueces',
      receta: 'Granola casera',
      estado: 'resuelta',
      severidad: 'media',
      accion: 'Sustituido por copos de avena'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'bloqueada': return 'red';
      case 'resuelta': return 'emerald';
      case 'pendiente': return 'orange';
      default: return 'gray';
    }
  };

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'alta': return 'red';
      case 'media': return 'orange';
      case 'baja': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#E2E8F0] shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-6 flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Historial de Alertas
              </h2>
              <p className="text-white/90">
                {restriccion.clienteNombre} - {restriccion.descripcion}
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
          {/* Resumen */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-[#EF4444] mb-1">
                {alertas.filter(a => a.estado === 'bloqueada').length}
              </div>
              <div className="text-[#64748B] text-sm font-medium">Bloqueadas</div>
            </div>
            <div className="bg-[#D1FAE5] border border-[#10B981]/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-[#10B981] mb-1">
                {alertas.filter(a => a.estado === 'resuelta').length}
              </div>
              <div className="text-[#64748B] text-sm font-medium">Resueltas</div>
            </div>
            <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-[#F59E0B] mb-1">
                {alertas.filter(a => a.estado === 'pendiente').length}
              </div>
              <div className="text-[#64748B] text-sm font-medium">Pendientes</div>
            </div>
          </div>

          {/* Lista de alertas */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Alertas Recientes</h3>
            
            {alertas.map((alerta) => {
              const estadoColor = getEstadoColor(alerta.estado);
              const severidadColor = getSeveridadColor(alerta.severidad);
              
              return (
                <div
                  key={alerta.id}
                  className="bg-white rounded-xl p-4 border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${estadoColor}-500/20 rounded-lg`}>
                        {alerta.estado === 'resuelta' ? (
                          <CheckCircle className={`w-5 h-5 text-${estadoColor}-400`} />
                        ) : (
                          <AlertTriangle className={`w-5 h-5 text-${estadoColor}-400`} />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[#0F172A] font-bold">
                          {alerta.ingrediente} detectado
                        </h4>
                        <p className="text-[#64748B] text-sm">
                          En receta: {alerta.receta}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 bg-${estadoColor}-500/20 text-${estadoColor}-400 rounded-full text-sm font-medium`}>
                        {alerta.estado}
                      </span>
                      <span className={`px-3 py-1 bg-${severidadColor}-500/20 text-${severidadColor}-400 rounded-full text-sm font-medium`}>
                        {alerta.severidad}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] rounded-lg p-3 mb-3">
                    <p className="text-[#10B981] text-sm font-medium">
                      ✓ {alerta.accion}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
                    <Clock className="w-4 h-4" />
                    {new Date(alerta.fecha).toLocaleDateString('es-ES')}
                  </div>
                </div>
              );
            })}
          </div>

          {alertas.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#64748B] mb-2">
                No hay alertas registradas
              </h3>
              <p className="text-[#94A3B8]">
                Aún no se han generado alertas para esta restricción
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F8FAFC] p-4 flex justify-end gap-3 border-t border-[#E2E8F0]">
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

