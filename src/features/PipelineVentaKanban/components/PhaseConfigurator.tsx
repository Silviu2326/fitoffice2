import { useState } from 'react';
import { Plus, Save, X, GripVertical, Trash2 } from 'lucide-react';
import { Phase } from '../types';

interface PhaseConfiguratorProps {
  phases: Phase[];
  onSave: (phases: Phase[]) => void;
  onClose: () => void;
}

const colorOptions = [
  { label: 'Azul', value: 'bg-blue-500' },
  { label: 'Verde', value: 'bg-emerald-500' },
  { label: 'Amarillo', value: 'bg-amber-500' },
  { label: 'Rojo', value: 'bg-red-500' },
  { label: 'Púrpura', value: 'bg-purple-500' },
  { label: 'Rosa', value: 'bg-pink-500' },
  { label: 'Índigo', value: 'bg-indigo-500' },
  { label: 'Teal', value: 'bg-teal-500' },
];

export default function PhaseConfigurator({ phases: initialPhases, onSave, onClose }: PhaseConfiguratorProps) {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);

  const addPhase = () => {
    const newPhase: Phase = {
      id: `phase-${Date.now()}`,
      name: 'Nueva Fase',
      order: phases.length,
      color: 'bg-slate-500',
      description: '',
    };
    setPhases([...phases, newPhase]);
  };

  const updatePhase = (id: string, updates: Partial<Phase>) => {
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, ...updates } : phase
    ));
  };

  const deletePhase = (id: string) => {
    setPhases(phases.filter(phase => phase.id !== id).map((phase, index) => ({
      ...phase,
      order: index,
    })));
  };

  const handleSave = () => {
    onSave(phases);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#0F172A]">Configurar Fases del Pipeline</h2>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className="bg-[#F8FAFC] rounded-xl p-4 flex items-start gap-4 border border-[#E2E8F0]"
              >
                <div className="cursor-move pt-2">
                  <GripVertical className="w-5 h-5 text-[#94A3B8]" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-[#64748B] mb-1 font-medium">
                        Nombre de la Fase
                      </label>
                      <input
                        type="text"
                        value={phase.name}
                        onChange={(e) => updatePhase(phase.id, { name: e.target.value })}
                        className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#64748B] mb-1 font-medium">
                        Color
                      </label>
                      <select
                        value={phase.color}
                        onChange={(e) => updatePhase(phase.id, { color: e.target.value })}
                        className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                      >
                        {colorOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#64748B] mb-1 font-medium">
                      Descripción (opcional)
                    </label>
                    <input
                      type="text"
                      value={phase.description || ''}
                      onChange={(e) => updatePhase(phase.id, { description: e.target.value })}
                      placeholder="Describe esta fase..."
                      className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  onClick={() => deletePhase(phase.id)}
                  className="text-[#EF4444] hover:text-[#DC2626] transition-colors p-2"
                  disabled={phases.length <= 2}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addPhase}
            className="mt-4 w-full bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] text-[#0F172A] py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Agregar Nueva Fase
          </button>
        </div>

        <div className="p-6 border-t border-[#E2E8F0] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg transition-all duration-200 font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}

