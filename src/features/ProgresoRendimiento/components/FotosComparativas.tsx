import { Camera, Calendar, ArrowRight } from 'lucide-react';

export default function FotosComparativas() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Camera className="w-6 h-6 text-emerald-500" />
          Fotos Comparativas
        </h2>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          Subir Nueva Foto
        </button>
      </div>

      <div className="space-y-6">
        {/* Comparación Antes/Después */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Antes</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>01/01/2025</span>
                </div>
              </div>
              <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
                <Camera className="w-16 h-16 text-slate-600" />
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <p className="text-sm text-slate-400">Peso: <span className="text-white font-semibold">75 kg</span></p>
              <p className="text-sm text-slate-400">% Grasa: <span className="text-white font-semibold">18%</span></p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Después</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>26/10/2025</span>
                </div>
              </div>
              <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
                <Camera className="w-16 h-16 text-slate-600" />
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <p className="text-sm text-slate-400">Peso: <span className="text-white font-semibold">72 kg</span></p>
              <p className="text-sm text-slate-400">% Grasa: <span className="text-white font-semibold">14%</span></p>
            </div>
          </div>
        </div>

        {/* Resumen de cambios */}
        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
          <h3 className="text-lg font-semibold text-emerald-500 mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Cambios en 298 días
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-slate-400">Peso perdido</p>
              <p className="text-xl font-bold text-emerald-500">-3 kg</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Grasa reducida</p>
              <p className="text-xl font-bold text-emerald-500">-4%</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Músculo ganado</p>
              <p className="text-xl font-bold text-emerald-500">+2 kg</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Progreso</p>
              <p className="text-xl font-bold text-emerald-500">Excelente</p>
            </div>
          </div>
        </div>

        {/* Historial de fotos */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">Historial de Fotos</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer hover:border-2 hover:border-emerald-500 transition-all">
                <Camera className="w-8 h-8 text-slate-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

