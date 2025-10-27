import { useState } from 'react';
import { X, Copy } from 'lucide-react';

interface Props {
  plantilla: {
    id: string;
    nombre: string;
    descripcion: string;
  };
  onClose: () => void;
  onDuplicar: (nombre: string, descripcion: string) => void;
}

export default function DuplicadorPlantilla({ plantilla, onClose, onDuplicar }: Props) {
  const [nombre, setNombre] = useState(`${plantilla.nombre} (Copia)`);
  const [descripcion, setDescripcion] = useState(plantilla.descripcion);
  const [personalizaciones, setPersonalizaciones] = useState({
    mantenerEjercicios: true,
    mantenerProgresion: true,
    mantenerNotas: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDuplicar(nombre, descripcion);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#1E1E2E] rounded-2xl border border-[#334155] w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#334155] flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#F1F5F9]">Duplicar Plantilla</h2>
            <p className="text-[#94A3B8] text-sm mt-1">
              Crea una copia de "{plantilla.nombre}" para personalizar
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2A3A] rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5 text-[#94A3B8]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Nombre de la Nueva Plantilla
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 h-24 resize-none transition-all duration-200"
                required
              />
            </div>

            {/* Opciones de Duplicación */}
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-3">
                Opciones de Duplicación
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-[#0F0F23]/50 rounded-xl cursor-pointer hover:bg-[#0F0F23] transition-all duration-200 border border-[#334155] hover:border-[#6366F1]/30">
                  <input
                    type="checkbox"
                    checked={personalizaciones.mantenerEjercicios}
                    onChange={(e) => setPersonalizaciones({
                      ...personalizaciones,
                      mantenerEjercicios: e.target.checked
                    })}
                    className="w-5 h-5 rounded-lg bg-[#1E1E2E] border-[#334155] text-[#6366F1] focus:ring-[#6366F1] focus:ring-2"
                  />
                  <div>
                    <p className="text-[#F1F5F9] font-semibold">Mantener ejercicios</p>
                    <p className="text-[#94A3B8] text-sm">Copiar todos los ejercicios de la plantilla original</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-[#0F0F23]/50 rounded-xl cursor-pointer hover:bg-[#0F0F23] transition-all duration-200 border border-[#334155] hover:border-[#6366F1]/30">
                  <input
                    type="checkbox"
                    checked={personalizaciones.mantenerProgresion}
                    onChange={(e) => setPersonalizaciones({
                      ...personalizaciones,
                      mantenerProgresion: e.target.checked
                    })}
                    className="w-5 h-5 rounded-lg bg-[#1E1E2E] border-[#334155] text-[#6366F1] focus:ring-[#6366F1] focus:ring-2"
                  />
                  <div>
                    <p className="text-[#F1F5F9] font-semibold">Mantener progresión</p>
                    <p className="text-[#94A3B8] text-sm">Copiar el esquema de progresión semanal</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-[#0F0F23]/50 rounded-xl cursor-pointer hover:bg-[#0F0F23] transition-all duration-200 border border-[#334155] hover:border-[#6366F1]/30">
                  <input
                    type="checkbox"
                    checked={personalizaciones.mantenerNotas}
                    onChange={(e) => setPersonalizaciones({
                      ...personalizaciones,
                      mantenerNotas: e.target.checked
                    })}
                    className="w-5 h-5 rounded-lg bg-[#1E1E2E] border-[#334155] text-[#6366F1] focus:ring-[#6366F1] focus:ring-2"
                  />
                  <div>
                    <p className="text-[#F1F5F9] font-semibold">Mantener notas y observaciones</p>
                    <p className="text-[#94A3B8] text-sm">Copiar todas las notas y comentarios</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-xl">
              <p className="text-[#93C5FD] text-sm">
                💡 La plantilla duplicada será independiente de la original. Podrás modificarla libremente sin afectar la plantilla base.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#334155] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#2A2A3A] rounded-xl transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              <Copy className="w-5 h-5" />
              Duplicar Plantilla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

