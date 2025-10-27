import { X, Copy, Save } from 'lucide-react';
import { useState } from 'react';

interface DuplicadorProgramaProps {
  programa: {
    id: string;
    nombre: string;
    descripcion: string;
  };
  onClose: () => void;
  onDuplicar: (nombre: string, descripcion: string) => void;
}

export default function DuplicadorPrograma({ programa, onClose, onDuplicar }: DuplicadorProgramaProps) {
  const [nombre, setNombre] = useState(`${programa.nombre} (Copia)`);
  const [descripcion, setDescripcion] = useState(programa.descripcion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDuplicar(nombre, descripcion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <Copy className="w-5 h-5 text-[#6366F1]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#0F172A]">Duplicar Programa</h2>
              <p className="text-sm text-[#64748B] mt-0.5">Crear una copia de "{programa.nombre}"</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Nombre del Nuevo Programa
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full h-12 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              placeholder="Nombre del programa duplicado"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] resize-none transition-all duration-200"
              placeholder="Describe el programa duplicado..."
            />
          </div>

          {/* Info */}
          <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-xl p-4">
            <p className="text-sm text-[#3B82F6] font-medium">
              Se duplicará toda la estructura del programa incluyendo fases, ejercicios, series y repeticiones.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#64748B] hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl font-medium transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              Duplicar Programa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

