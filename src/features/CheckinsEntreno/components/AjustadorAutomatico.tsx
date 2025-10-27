import { Settings, Zap } from 'lucide-react';

export default function AjustadorAutomatico() {
  return (
    <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#EEF2FF] p-2 rounded-[12px]">
          <Settings className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#F1F5F9]">Ajustador Automático</h3>
          <p className="text-[#94A3B8] text-sm">Funcionalidad en desarrollo</p>
        </div>
      </div>

      <div className="bg-[#2A2A3A] rounded-[12px] p-4 flex items-start gap-3">
        <Zap className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-1" />
        <div>
          <p className="text-[#F1F5F9] font-medium mb-1">Próximamente</p>
          <p className="text-[#94A3B8] text-sm">
            El ajustador automático permitirá modificar automáticamente las próximas series
            basándose en los check-ins previos, optimizando el volumen e intensidad del entrenamiento.
          </p>
        </div>
      </div>
    </div>
  );
}

