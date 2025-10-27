import { useState } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface Ejercicio {
  id: string;
  nombre: string;
  series: number;
  repeticiones: string;
  descanso: string;
}

interface Props {
  plantilla?: {
    id: string;
    nombre: string;
    descripcion: string;
    tipo: string;
    nivel: string;
    duracion: string;
    categoria: string;
  };
  onClose: () => void;
  onGuardar: (data: any) => void;
}

export default function CreadorPlantilla({ plantilla, onClose, onGuardar }: Props) {
  const [nombre, setNombre] = useState(plantilla?.nombre || '');
  const [descripcion, setDescripcion] = useState(plantilla?.descripcion || '');
  const [tipo, setTipo] = useState(plantilla?.tipo || 'Fuerza');
  const [nivel, setNivel] = useState(plantilla?.nivel || 'Intermedio');
  const [duracion, setDuracion] = useState(plantilla?.duracion || '8 semanas');
  const [categoria, setCategoria] = useState(plantilla?.categoria || 'Fuerza');
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([
    {
      id: '1',
      nombre: 'Press Banca',
      series: 4,
      repeticiones: '8-10',
      descanso: '90s'
    }
  ]);

  const handleAgregarEjercicio = () => {
    const nuevoEjercicio: Ejercicio = {
      id: Date.now().toString(),
      nombre: '',
      series: 3,
      repeticiones: '10-12',
      descanso: '60s'
    };
    setEjercicios([...ejercicios, nuevoEjercicio]);
  };

  const handleEliminarEjercicio = (id: string) => {
    setEjercicios(ejercicios.filter(e => e.id !== id));
  };

  const handleActualizarEjercicio = (id: string, campo: string, valor: any) => {
    setEjercicios(ejercicios.map(e => 
      e.id === id ? { ...e, [campo]: valor } : e
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      nombre,
      descripcion,
      tipo,
      nivel,
      duracion,
      categoria,
      ejercicios
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#1E1E2E] rounded-2xl border border-[#334155] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#334155] flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#F1F5F9]">
              {plantilla ? 'Editar Plantilla' : 'Nueva Plantilla de Entrenamiento'}
            </h2>
            <p className="text-[#94A3B8] text-sm mt-1">
              Crea una plantilla reutilizable para estandarizar tus programas
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
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} id="form-plantilla">
            {/* Información Básica */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Nombre de la Plantilla
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                    placeholder="Ej: Hipertrofia 12 Semanas"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 h-24 resize-none transition-all duration-200"
                    placeholder="Describe el objetivo y características de la plantilla..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Categoría
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                  >
                    <option value="Fuerza">Fuerza</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Hipertrofia">Hipertrofia</option>
                    <option value="Movilidad">Movilidad</option>
                    <option value="Funcional">Funcional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Nivel
                  </label>
                  <select
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Todos">Todos los Niveles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Duración
                  </label>
                  <input
                    type="text"
                    value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                    placeholder="Ej: 8 semanas"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Tipo
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                  >
                    <option value="Fuerza">Fuerza</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Mixto">Mixto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ejercicios */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#F1F5F9]">Ejercicios</h3>
                <button
                  type="button"
                  onClick={handleAgregarEjercicio}
                  className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 text-sm font-semibold shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Ejercicio
                </button>
              </div>

              <div className="space-y-3">
                {ejercicios.map((ejercicio, index) => (
                  <div
                    key={ejercicio.id}
                    className="bg-[#0F0F23]/50 border border-[#334155] rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#94A3B8] font-semibold">#{index + 1}</span>
                      <input
                        type="text"
                        value={ejercicio.nombre}
                        onChange={(e) => handleActualizarEjercicio(ejercicio.id, 'nombre', e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#1E1E2E] border border-[#334155] rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                        placeholder="Nombre del ejercicio"
                      />
                      <button
                        type="button"
                        onClick={() => handleEliminarEjercicio(ejercicio.id)}
                        className="p-2 text-[#EF4444] hover:bg-[#EF4444]/20 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Series</label>
                        <input
                          type="number"
                          value={ejercicio.series}
                          onChange={(e) => handleActualizarEjercicio(ejercicio.id, 'series', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-[#1E1E2E] border border-[#334155] rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Repeticiones</label>
                        <input
                          type="text"
                          value={ejercicio.repeticiones}
                          onChange={(e) => handleActualizarEjercicio(ejercicio.id, 'repeticiones', e.target.value)}
                          className="w-full px-3 py-2 bg-[#1E1E2E] border border-[#334155] rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                          placeholder="8-10"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Descanso</label>
                        <input
                          type="text"
                          value={ejercicio.descanso}
                          onChange={(e) => handleActualizarEjercicio(ejercicio.id, 'descanso', e.target.value)}
                          className="w-full px-3 py-2 bg-[#1E1E2E] border border-[#334155] rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                          placeholder="90s"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#334155] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#2A2A3A] rounded-xl transition-all duration-200 font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="form-plantilla"
            className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            {plantilla ? 'Actualizar' : 'Crear'} Plantilla
          </button>
        </div>
      </div>
    </div>
  );
}

