import { Play, AlertTriangle, CheckCircle, Plus, Share2 } from 'lucide-react';
import ReproductorVideo from './ReproductorVideo';
import AdvertenciasLesion from './AdvertenciasLesion';
import GestorFavoritos from './GestorFavoritos';
import IntegradorProgramas from './IntegradorProgramas';

interface VisorEjercicioProps {
  ejercicio: any;
}

export default function VisorEjercicio({ ejercicio }: VisorEjercicioProps) {
  if (!ejercicio) {
    return (
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-xl p-8 sticky top-24">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#2A2A3A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-[#64748B]" />
          </div>
          <h3 className="text-lg font-semibold text-[#94A3B8] mb-2">
            Selecciona un ejercicio
          </h3>
          <p className="text-sm text-[#64748B]">
            Haz clic en cualquier ejercicio de la lista para ver sus detalles completos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E2E] border border-[#334155] rounded-xl sticky top-24 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-[#334155]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#F1F5F9] mb-2">{ejercicio.nombre}</h2>
            <p className="text-[#94A3B8]">{ejercicio.descripcion}</p>
          </div>
          <GestorFavoritos ejercicioId={ejercicio.id} />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-medium border border-[#6366F1]/30">
            {ejercicio.grupoMuscular}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium border border-[#3B82F6]/30">
            {ejercicio.equipamiento}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium border border-[#F59E0B]/30">
            {ejercicio.dificultad}
          </span>
        </div>
      </div>

      {/* Video */}
      <div className="p-6 border-b border-[#334155]">
        <ReproductorVideo videoUrl={ejercicio.videoUrl} thumbnail={ejercicio.thumbnail} />
      </div>

      {/* Instrucciones */}
      <div className="p-6 border-b border-[#334155]">
        <h3 className="text-lg font-bold text-[#F1F5F9] mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#10B981]" />
          Instrucciones de Ejecución
        </h3>
        <ol className="space-y-2">
          {ejercicio.instrucciones.map((instruccion: string, index: number) => (
            <li key={index} className="flex gap-3 text-[#F1F5F9]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D1FAE5] text-[#10B981] text-xs font-bold flex items-center justify-center border border-[#10B981]/30">
                {index + 1}
              </span>
              <span>{instruccion}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Advertencias */}
      <div className="p-6 border-b border-[#334155]">
        <AdvertenciasLesion advertencias={ejercicio.advertencias} />
      </div>

      {/* Acciones */}
      <div className="p-6">
        <IntegradorProgramas ejercicioId={ejercicio.id} />
        <button className="w-full mt-3 bg-[#2A2A3A] text-[#94A3B8] px-4 py-3 rounded-lg hover:bg-[#334155] transition-all duration-200 ease-out flex items-center justify-center gap-2 border border-[#334155]">
          <Share2 className="w-4 h-4" />
          Compartir Ejercicio
        </button>
      </div>
    </div>
  );
}

