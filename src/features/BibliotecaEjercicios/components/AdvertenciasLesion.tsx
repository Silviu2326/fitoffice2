import { AlertTriangle } from 'lucide-react';

interface AdvertenciasLesionProps {
  advertencias: string[];
}

export default function AdvertenciasLesion({ advertencias }: AdvertenciasLesionProps) {
  if (!advertencias || advertencias.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-[#F1F5F9] mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
        Advertencias y Precauciones
      </h3>
      <div className="space-y-3">
        {advertencias.map((advertencia, index) => (
          <div
            key={index}
            className="flex gap-3 p-3 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg"
          >
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <p className="text-[#0F172A] text-sm">{advertencia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

