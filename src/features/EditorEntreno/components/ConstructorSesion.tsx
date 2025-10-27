import { useState } from 'react';
import { Plus, Trash2, Edit, Copy } from 'lucide-react';
import SelectorEjercicios from './SelectorEjercicios';
import GestorSeries from './GestorSeries';
import ConfiguradorRPE from './ConfiguradorRPE';
import ConfiguradorProgresion from './ConfiguradorProgresion';
import CheckInsSemaforo from './CheckInsSemaforo';

interface ConstructorSesionProps {
  sesion: any;
  onSesionChange: (sesion: any) => void;
}

export default function ConstructorSesion({ sesion, onSesionChange }: ConstructorSesionProps) {
  const [ejercicios, setEjercicios] = useState<any[]>(sesion?.ejercicios || []);
  const [showSelectorEjercicios, setShowSelectorEjercicios] = useState(false);
  const [ejercicioEditando, setEjercicioEditando] = useState<any>(null);

  const agregarEjercicio = (ejercicio: any) => {
    const nuevoEjercicio = {
      id: Date.now().toString(),
      ...ejercicio,
      series: 3,
      repeticiones: 10,
      descanso: 60,
      rpe: 7,
      progresion: 'manual',
      checkIns: []
    };
    
    const nuevosEjercicios = [...ejercicios, nuevoEjercicio];
    setEjercicios(nuevosEjercicios);
    onSesionChange({ ...sesion, ejercicios: nuevosEjercicios });
    setShowSelectorEjercicios(false);
  };

  const eliminarEjercicio = (id: string) => {
    const nuevosEjercicios = ejercicios.filter(ej => ej.id !== id);
    setEjercicios(nuevosEjercicios);
    onSesionChange({ ...sesion, ejercicios: nuevosEjercicios });
  };

  const duplicarEjercicio = (ejercicio: any) => {
    const duplicado = {
      ...ejercicio,
      id: Date.now().toString()
    };
    const nuevosEjercicios = [...ejercicios, duplicado];
    setEjercicios(nuevosEjercicios);
    onSesionChange({ ...sesion, ejercicios: nuevosEjercicios });
  };

  const actualizarEjercicio = (id: string, campo: string, valor: any) => {
    const nuevosEjercicios = ejercicios.map(ej =>
      ej.id === id ? { ...ej, [campo]: valor } : ej
    );
    setEjercicios(nuevosEjercicios);
    onSesionChange({ ...sesion, ejercicios: nuevosEjercicios });
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#EEF2FF] p-2 rounded-lg">
            <Plus className="w-6 h-6 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Constructor de Sesión</h2>
            <p className="text-sm text-[#64748B]">Agrega y configura ejercicios para la sesión</p>
          </div>
        </div>
        <button
          onClick={() => setShowSelectorEjercicios(true)}
          className="bg-[#6366F1] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#4F46E5] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Agregar Ejercicio
        </button>
      </div>

      {/* Lista de ejercicios */}
      {ejercicios.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
          <Plus className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#64748B] mb-2">No hay ejercicios añadidos</h3>
          <p className="text-[#94A3B8] mb-4">Comienza agregando ejercicios a tu sesión</p>
          <button
            onClick={() => setShowSelectorEjercicios(true)}
            className="bg-[#6366F1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4F46E5] transition-all duration-200 shadow-md"
          >
            Agregar Primer Ejercicio
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {ejercicios.map((ejercicio, index) => (
            <div
              key={ejercicio.id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#EEF2FF] w-10 h-10 rounded-lg flex items-center justify-center">
                    <span className="text-[#6366F1] font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{ejercicio.nombre}</h3>
                    <p className="text-sm text-[#64748B]">{ejercicio.grupoMuscular}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => duplicarEjercicio(ejercicio)}
                    className="p-2 text-[#6366F1] hover:bg-[#EEF2FF] rounded-lg transition-all duration-200"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEjercicioEditando(ejercicio)}
                    className="p-2 text-[#F59E0B] hover:bg-[#FEF3C7] rounded-lg transition-all duration-200"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => eliminarEjercicio(ejercicio.id)}
                    className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Componentes de configuración */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <GestorSeries
                  ejercicio={ejercicio}
                  onUpdate={(campo, valor) => actualizarEjercicio(ejercicio.id, campo, valor)}
                />
                <ConfiguradorRPE
                  ejercicio={ejercicio}
                  onUpdate={(valor) => actualizarEjercicio(ejercicio.id, 'rpe', valor)}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ConfiguradorProgresion
                  ejercicio={ejercicio}
                  onUpdate={(valor) => actualizarEjercicio(ejercicio.id, 'progresion', valor)}
                />
                <CheckInsSemaforo
                  ejercicio={ejercicio}
                  onUpdate={(checkIns) => actualizarEjercicio(ejercicio.id, 'checkIns', checkIns)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Selector de Ejercicios */}
      {showSelectorEjercicios && (
        <SelectorEjercicios
          onSelect={agregarEjercicio}
          onClose={() => setShowSelectorEjercicios(false)}
        />
      )}
    </div>
  );
}

