import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { crearReto, actualizarReto, type Reto, type CrearRetoData } from '../api/retos';

interface CreadorRetoProps {
  onCerrar: () => void;
  onGuardar: () => void;
  retoEditar?: Reto | null;
}

export default function CreadorReto({ onCerrar, onGuardar, retoEditar }: CreadorRetoProps) {
  const [formData, setFormData] = useState<CrearRetoData>({
    tipo: retoEditar?.tipo || 'personal',
    nombre: retoEditar?.nombre || '',
    descripcion: retoEditar?.descripcion || '',
    duracion_dias: retoEditar?.duracion_dias || 30,
    fecha_inicio: retoEditar?.fecha_inicio?.split('T')[0] || new Date().toISOString().split('T')[0],
    objetivos: retoEditar?.objetivos || [],
    reglas: retoEditar?.reglas || [],
    max_participantes: retoEditar?.max_participantes,
    categoria: retoEditar?.categoria || 'duracion',
    imagen_url: retoEditar?.imagen_url || '',
  });

  const [nuevoObjetivo, setNuevoObjetivo] = useState('');
  const [nuevaRegla, setNuevaRegla] = useState('');
  const [guardando, setGuardando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    if (retoEditar) {
      await actualizarReto(retoEditar.id, formData);
    } else {
      await crearReto(formData);
    }

    setGuardando(false);
    onGuardar();
  };

  const agregarObjetivo = () => {
    if (nuevoObjetivo.trim()) {
      setFormData({ ...formData, objetivos: [...formData.objetivos, nuevoObjetivo.trim()] });
      setNuevoObjetivo('');
    }
  };

  const eliminarObjetivo = (index: number) => {
    setFormData({ 
      ...formData, 
      objetivos: formData.objetivos.filter((_, i) => i !== index) 
    });
  };

  const agregarRegla = () => {
    if (nuevaRegla.trim()) {
      setFormData({ ...formData, reglas: [...formData.reglas, nuevaRegla.trim()] });
      setNuevaRegla('');
    }
  };

  const eliminarRegla = (index: number) => {
    setFormData({ 
      ...formData, 
      reglas: formData.reglas.filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0] sticky top-0 bg-white z-10 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            {retoEditar ? 'Editar Reto' : 'Crear Nuevo Reto'}
          </h2>
          <button
            onClick={onCerrar}
            className="p-2 hover:bg-[#F8FAFC] rounded-xl transition-all duration-200"
          >
            <X className="w-6 h-6 text-[#64748B]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Reto */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Tipo de Reto
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="personal"
                  checked={formData.tipo === 'personal'}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'personal' | 'grupal' })}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.tipo === 'personal'
                    ? 'border-[#6366F1] bg-[#EEF2FF] shadow-md'
                    : 'border-[#E2E8F0] hover:border-[#6366F1]'
                }`}>
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">👤</span>
                    <span className="font-semibold text-[#0F172A]">Personal</span>
                    <p className="text-xs text-[#64748B] mt-1">Para entrenadores personales</p>
                  </div>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="tipo"
                  value="grupal"
                  checked={formData.tipo === 'grupal'}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'personal' | 'grupal' })}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.tipo === 'grupal'
                    ? 'border-[#F59E0B] bg-[#FEF3C7] shadow-md'
                    : 'border-[#E2E8F0] hover:border-[#F59E0B]'
                }`}>
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">👥</span>
                    <span className="font-semibold text-[#0F172A]">Grupal</span>
                    <p className="text-xs text-[#64748B] mt-1">Para gimnasios y centros</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Nombre del Reto *
            </label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Reto 30 días conmigo"
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Descripción *
            </label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe el reto y qué lograrán los participantes"
              rows={4}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
            />
          </div>

          {/* Duración y Fecha de Inicio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Duración (días) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.duracion_dias}
                onChange={(e) => setFormData({ ...formData, duracion_dias: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                required
                value={formData.fecha_inicio}
                onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] transition-all duration-200"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Categoría *
            </label>
            <select
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] bg-white transition-all duration-200"
            >
              <option value="duracion">Duración</option>
              <option value="objetivo">Objetivo</option>
              <option value="actividad">Actividad</option>
              <option value="estacional">Estacional</option>
              <option value="tematico">Temático</option>
              <option value="grupo">Grupo</option>
              <option value="especialidad">Especialidad</option>
            </select>
          </div>

          {/* Máximo de Participantes */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Máximo de Participantes (opcional)
            </label>
            <input
              type="number"
              min="1"
              value={formData.max_participantes || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                max_participantes: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              placeholder="Dejar vacío para ilimitado"
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
            />
          </div>

          {/* Objetivos */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Objetivos
            </label>
            <div className="space-y-2 mb-2">
              {formData.objetivos.map((objetivo, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#D1FAE5] border border-[#10B981] p-3 rounded-xl">
                  <span className="flex-1 text-sm text-[#0F172A]">{objetivo}</span>
                  <button
                    type="button"
                    onClick={() => eliminarObjetivo(index)}
                    className="p-1 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={nuevoObjetivo}
                onChange={(e) => setNuevoObjetivo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarObjetivo())}
                placeholder="Agregar objetivo"
                className="flex-1 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
              />
              <button
                type="button"
                onClick={agregarObjetivo}
                className="px-4 py-3 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 shadow-md"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reglas */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Reglas
            </label>
            <div className="space-y-2 mb-2">
              {formData.reglas.map((regla, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#DBEAFE] border border-[#3B82F6] p-3 rounded-xl">
                  <span className="flex-1 text-sm text-[#0F172A]">{regla}</span>
                  <button
                    type="button"
                    onClick={() => eliminarRegla(index)}
                    className="p-1 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={nuevaRegla}
                onChange={(e) => setNuevaRegla(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarRegla())}
                placeholder="Agregar regla"
                className="flex-1 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
              />
              <button
                type="button"
                onClick={agregarRegla}
                className="px-4 py-3 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-all duration-200 shadow-md"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCerrar}
              className="flex-1 px-6 py-3 border-2 border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="flex-1 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg"
            >
              {guardando ? 'Guardando...' : (retoEditar ? 'Actualizar' : 'Crear Reto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

