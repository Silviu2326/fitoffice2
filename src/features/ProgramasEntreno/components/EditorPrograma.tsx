import { X, Save, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EditorProgramaProps {
  programa?: {
    id: string;
    nombre: string;
    descripcion: string;
    tipo: string;
    nivel: string;
  };
  onClose: () => void;
  onGuardar: (programa: any) => void;
}

export default function EditorPrograma({ programa, onClose, onGuardar }: EditorProgramaProps) {
  const [formData, setFormData] = useState({
    nombre: programa?.nombre || '',
    descripcion: programa?.descripcion || '',
    tipo: programa?.tipo || 'personalizado',
    nivel: programa?.nivel || 'intermedio',
    duracion: '4',
    categoria: 'Fuerza'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0] sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-[#0F172A]">
            {programa ? 'Editar Programa' : 'Nuevo Programa'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#0F172A]">Información Básica</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Nombre del Programa *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full h-12 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                placeholder="Ej: Rutina de Fuerza para Carla"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] resize-none transition-all duration-200"
                placeholder="Describe los objetivos y características del programa..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Tipo de Programa *
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full h-12 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                  required
                >
                  <option value="personalizado">Personalizado</option>
                  <option value="grupal">Grupal</option>
                  <option value="sala">Plan de Sala</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Nivel *
                </label>
                <select
                  value={formData.nivel}
                  onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                  className="w-full h-12 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                  required
                >
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Duración (semanas) *
                </label>
                <input
                  type="number"
                  value={formData.duracion}
                  onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                  min="1"
                  max="52"
                  className="w-full h-12 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full h-12 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                  required
                >
                  <option value="Fuerza">Fuerza</option>
                  <option value="Hipertrofia">Hipertrofia</option>
                  <option value="Resistencia">Resistencia</option>
                  <option value="CrossFit">CrossFit</option>
                  <option value="Rehabilitación">Rehabilitación</option>
                  <option value="Funcional">Funcional</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estructura del programa */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#0F172A]">Estructura del Programa</h3>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Agregar Fase
              </button>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-[#0F172A]">Fase 1: Adaptación</h4>
                  <p className="text-sm text-[#64748B]">Semanas 1-2</p>
                </div>
                <button className="text-[#EF4444] hover:bg-[#FEE2E2] p-1.5 rounded-lg transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[#64748B]">
                Fase inicial de adaptación al programa con ejercicios básicos
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
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
              {programa ? 'Guardar Cambios' : 'Crear Programa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

