import { useState } from 'react';
import { Edit3, Calendar, Clock, Target, Plus } from 'lucide-react';

interface EditorEntrenoProps {
  sesion: any;
  onSesionChange: (sesion: any) => void;
  modoAsignacion: 'individual' | 'grupal';
}

export default function EditorEntreno({ sesion, onSesionChange, modoAsignacion }: EditorEntrenoProps) {
  const [nombre, setNombre] = useState(sesion?.nombre || '');
  const [duracion, setDuracion] = useState(sesion?.duracion || 60);
  const [objetivo, setObjetivo] = useState(sesion?.objetivo || '');
  const [tipo, setTipo] = useState(sesion?.tipo || 'fuerza');

  const handleUpdate = (field: string, value: any) => {
    const updatedSesion = {
      ...sesion,
      [field]: value
    };
    onSesionChange(updatedSesion);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#EEF2FF] p-2 rounded-lg">
          <Edit3 className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Configuración de Sesión</h2>
          <p className="text-sm text-[#64748B]">
            {modoAsignacion === 'individual' 
              ? 'Configuración para asignación individual'
              : 'Configuración para asignación grupal'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre de la sesión */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Nombre de la Sesión
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              handleUpdate('nombre', e.target.value);
            }}
            placeholder="Ej: Entrenamiento de Fuerza"
            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>

        {/* Duración */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Duración (minutos)
          </label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => {
              setDuracion(parseInt(e.target.value));
              handleUpdate('duracion', parseInt(e.target.value));
            }}
            min="15"
            max="180"
            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>

        {/* Tipo de entrenamiento */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Target className="w-4 h-4" />
            Tipo de Entrenamiento
          </label>
          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              handleUpdate('tipo', e.target.value);
            }}
            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          >
            <option value="fuerza">Fuerza</option>
            <option value="hipertrofia">Hipertrofia</option>
            <option value="resistencia">Resistencia</option>
            <option value="funcional">Funcional</option>
            <option value="cardio">Cardio</option>
            <option value="hiit">HIIT</option>
            <option value="movilidad">Movilidad</option>
          </select>
        </div>

        {/* Objetivo */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Target className="w-4 h-4" />
            Objetivo Principal
          </label>
          <input
            type="text"
            value={objetivo}
            onChange={(e) => {
              setObjetivo(e.target.value);
              handleUpdate('objetivo', e.target.value);
            }}
            placeholder="Ej: Aumentar fuerza en tren superior"
            className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-[#DBEAFE] border border-[#3B82F6]/20 rounded-xl">
        <p className="text-sm text-[#3B82F6]">
          💡 <span className="font-semibold">Tip:</span> Define claramente el objetivo de la sesión para facilitar 
          {modoAsignacion === 'individual' 
            ? ' la personalización para cada cliente'
            : ' la aplicación grupal en clases o programas estándar'}
        </p>
      </div>
    </div>
  );
}

