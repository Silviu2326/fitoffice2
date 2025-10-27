import { LineChart, TrendingUp } from 'lucide-react';

export default function GraficosEvolucion() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <LineChart className="w-6 h-6 text-emerald-500" />
          Gráficos de Evolución
        </h2>
        <select className="bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700">
          <option>Últimos 30 días</option>
          <option>Últimos 3 meses</option>
          <option>Últimos 6 meses</option>
          <option>Último año</option>
        </select>
      </div>

      <div className="space-y-6">
        {/* Gráfico placeholder */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Evolución de Fuerza</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 70, 75, 78, 80, 85, 90, 92, 95, 98, 100, 105].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg"
                   style={{ height: `${height}%` }}>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Ene</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Mejora Total</p>
                <p className="text-2xl font-bold text-white">+62%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Crecimiento Mensual</p>
                <p className="text-2xl font-bold text-white">+5.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Proyección 6 Meses</p>
                <p className="text-2xl font-bold text-white">+31%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

