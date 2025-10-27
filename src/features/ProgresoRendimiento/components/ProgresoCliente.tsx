import { useState } from 'react';
import { TrendingUp, Activity, Target } from 'lucide-react';

interface ProgresoClienteProps {
  clienteId?: string;
}

export default function ProgresoCliente({ clienteId }: ProgresoClienteProps) {
  const [selectedClient, setSelectedClient] = useState(clienteId || '');

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-emerald-500" />
          Progreso del Cliente
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Progreso General</p>
                <p className="text-2xl font-bold text-white">+15%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Objetivos Alcanzados</p>
                <p className="text-2xl font-bold text-white">7/10</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Sesiones Completadas</p>
                <p className="text-2xl font-bold text-white">45</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">Resumen de Progreso</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Fuerza</span>
                <span className="text-emerald-500">+12%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Resistencia</span>
                <span className="text-blue-500">+18%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Movilidad</span>
                <span className="text-purple-500">+9%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '59%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

