import { X, Edit, Copy, Share2, TrendingUp, Clock, Target } from 'lucide-react';

interface Plantilla {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  categoria: string;
  usos: number;
  efectividad: number;
  version: string;
}

interface Props {
  plantilla: Plantilla;
  onClose: () => void;
  onEditar: () => void;
  onDuplicar: () => void;
}

export default function VisorPlantilla({ plantilla, onClose, onEditar, onDuplicar }: Props) {
  const ejerciciosEjemplo = [
    { nombre: 'Press Banca', series: 4, reps: '8-10', descanso: '90s' },
    { nombre: 'Press Inclinado con Mancuernas', series: 3, reps: '10-12', descanso: '60s' },
    { nombre: 'Aperturas con Cable', series: 3, reps: '12-15', descanso: '45s' },
    { nombre: 'Fondos en Paralelas', series: 3, reps: '8-10', descanso: '90s' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#1E1E2E] rounded-2xl border border-[#334155] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#334155]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-[#F1F5F9]">{plantilla.nombre}</h2>
                <span className="text-xs text-[#94A3B8] px-3 py-1.5 bg-[#2A2A3A] rounded-lg font-medium">
                  v{plantilla.version}
                </span>
              </div>
              <p className="text-[#94A3B8]">{plantilla.descripcion}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2A2A3A] rounded-xl transition-all duration-200"
            >
              <X className="w-5 h-5 text-[#94A3B8]" />
            </button>
          </div>

          {/* Acciones rápidas */}
          <div className="flex gap-2">
            <button
              onClick={onEditar}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 font-semibold shadow-md"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={onDuplicar}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-xl hover:bg-[#7C3AED] transition-all duration-200 font-semibold shadow-md"
            >
              <Copy className="w-4 h-4" />
              Duplicar
            </button>
            <button
              onClick={() => console.log('Compartir')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2A2A3A] text-[#F1F5F9] rounded-xl hover:bg-[#334155] transition-all duration-200 font-medium border border-[#334155]"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Información General */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#0F0F23]/50 rounded-xl p-4 border border-[#334155]">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#10B981]" />
                <p className="text-xs text-[#94A3B8] font-medium">Categoría</p>
              </div>
              <p className="text-lg font-semibold text-[#F1F5F9]">{plantilla.categoria}</p>
            </div>
            <div className="bg-[#0F0F23]/50 rounded-xl p-4 border border-[#334155]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#3B82F6]" />
                <p className="text-xs text-[#94A3B8] font-medium">Duración</p>
              </div>
              <p className="text-lg font-semibold text-[#F1F5F9]">{plantilla.duracion}</p>
            </div>
            <div className="bg-[#0F0F23]/50 rounded-xl p-4 border border-[#334155]">
              <div className="flex items-center gap-2 mb-2">
                <Copy className="w-4 h-4 text-[#8B5CF6]" />
                <p className="text-xs text-[#94A3B8] font-medium">Usos</p>
              </div>
              <p className="text-lg font-semibold text-[#F1F5F9]">{plantilla.usos}</p>
            </div>
            <div className="bg-[#0F0F23]/50 rounded-xl p-4 border border-[#334155]">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
                <p className="text-xs text-[#94A3B8] font-medium">Efectividad</p>
              </div>
              <p className="text-lg font-semibold text-[#F1F5F9]">{plantilla.efectividad}%</p>
            </div>
          </div>

          {/* Características */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-3">Características</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0F0F23]/50 rounded-xl p-3 border border-[#334155]">
                <p className="text-xs text-[#94A3B8] mb-1 font-medium">Tipo</p>
                <p className="text-[#F1F5F9] font-semibold">{plantilla.tipo}</p>
              </div>
              <div className="bg-[#0F0F23]/50 rounded-xl p-3 border border-[#334155]">
                <p className="text-xs text-[#94A3B8] mb-1 font-medium">Nivel</p>
                <p className="text-[#F1F5F9] font-semibold">{plantilla.nivel}</p>
              </div>
            </div>
          </div>

          {/* Ejercicios de Ejemplo */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-3">Ejercicios Incluidos</h3>
            <div className="space-y-3">
              {ejerciciosEjemplo.map((ejercicio, index) => (
                <div
                  key={index}
                  className="bg-[#0F0F23]/50 border border-[#334155] rounded-xl p-4 hover:border-[#6366F1]/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[#64748B] font-semibold">#{index + 1}</span>
                      <p className="text-[#F1F5F9] font-medium">{ejercicio.nombre}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-[#94A3B8]">Series:</span>{' '}
                      <span className="text-[#F1F5F9] font-semibold">{ejercicio.series}</span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Reps:</span>{' '}
                      <span className="text-[#F1F5F9] font-semibold">{ejercicio.reps}</span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Descanso:</span>{' '}
                      <span className="text-[#F1F5F9] font-semibold">{ejercicio.descanso}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas de Efectividad */}
          <div>
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-3">Métricas de Efectividad</h3>
            <div className="bg-[#0F0F23]/50 border border-[#334155] rounded-xl p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#94A3B8] font-medium">Tasa de Finalización</span>
                    <span className="text-[#F1F5F9] font-semibold">89%</span>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2">
                    <div className="bg-[#10B981] h-2 rounded-full transition-all duration-300" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#94A3B8] font-medium">Satisfacción de Clientes</span>
                    <span className="text-[#F1F5F9] font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2">
                    <div className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#94A3B8] font-medium">Resultados Alcanzados</span>
                    <span className="text-[#F1F5F9] font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2">
                    <div className="bg-[#8B5CF6] h-2 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#334155] flex justify-between items-center">
          <div className="text-sm text-[#94A3B8]">
            Última actualización: hace 2 días
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#2A2A3A] rounded-xl transition-all duration-200 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

