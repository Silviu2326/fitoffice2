import { useState } from 'react';
import { Calendar, User, TrendingDown, TrendingUp } from 'lucide-react';
import SemáforoSerie from './SemáforoSerie';

interface CheckInHistorial {
  id: string;
  fecha: string;
  cliente: string;
  ejercicio: string;
  totalSeries: number;
  seriesVerdes: number;
  seriesAmarillas: number;
  seriesRojas: number;
  rpePromedio: number;
}

export default function HistorialCheckIns() {
  const [historial] = useState<CheckInHistorial[]>([
    {
      id: '1',
      fecha: '2025-10-26',
      cliente: 'Juan Pérez',
      ejercicio: 'Sentadilla',
      totalSeries: 4,
      seriesVerdes: 3,
      seriesAmarillas: 1,
      seriesRojas: 0,
      rpePromedio: 7.5
    },
    {
      id: '2',
      fecha: '2025-10-25',
      cliente: 'María García',
      ejercicio: 'Press Banca',
      totalSeries: 3,
      seriesVerdes: 2,
      seriesAmarillas: 1,
      seriesRojas: 0,
      rpePromedio: 6.8
    },
    {
      id: '3',
      fecha: '2025-10-25',
      cliente: 'Carlos Ruiz',
      ejercicio: 'Peso Muerto',
      totalSeries: 3,
      seriesVerdes: 1,
      seriesAmarillas: 1,
      seriesRojas: 1,
      rpePromedio: 8.2
    },
    {
      id: '4',
      fecha: '2025-10-24',
      cliente: 'Juan Pérez',
      ejercicio: 'Press Militar',
      totalSeries: 3,
      seriesVerdes: 3,
      seriesAmarillas: 0,
      seriesRojas: 0,
      rpePromedio: 6.0
    }
  ]);

  const [filtroCliente, setFiltroCliente] = useState('');

  const historialFiltrado = filtroCliente
    ? historial.filter(h => h.cliente === filtroCliente)
    : historial;

  const clientes = Array.from(new Set(historial.map(h => h.cliente)));

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 shadow-md">
        <h3 className="text-lg font-bold text-[#F1F5F9] mb-4">Filtros</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
              Cliente
            </label>
            <select
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="w-full h-12 px-4 bg-[#2A2A3A] border border-[#334155] rounded-[12px] text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            >
              <option value="">Todos los clientes</option>
              {clientes.map(cliente => (
                <option key={cliente} value={cliente}>{cliente}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline de check-ins */}
      <div className="space-y-4">
        {historialFiltrado.map((item) => (
          <div
            key={item.id}
            className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 hover:border-[#6366F1] transition-all duration-200 shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#EEF2FF] p-2 rounded-[12px]">
                  <Calendar className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <p className="text-[#F1F5F9] font-medium">{item.fecha}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-[#94A3B8]" />
                    <p className="text-[#94A3B8] text-sm">{item.cliente}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#F1F5F9]">{item.rpePromedio}</p>
                <p className="text-xs text-[#94A3B8]">RPE Promedio</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-bold text-[#F1F5F9]">{item.ejercicio}</h4>
              <p className="text-[#94A3B8] text-sm">Total: {item.totalSeries} series</p>
            </div>

            {/* Resumen de semáforos */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#D1FAE5] border border-[#10B981] rounded-[12px] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#10B981] text-sm font-medium">Verdes</span>
                  <span className="text-[#10B981] text-xl font-bold">{item.seriesVerdes}</span>
                </div>
              </div>
              <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-[12px] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#F59E0B] text-sm font-medium">Amarillas</span>
                  <span className="text-[#F59E0B] text-xl font-bold">{item.seriesAmarillas}</span>
                </div>
              </div>
              <div className="bg-[#FEE2E2] border border-[#EF4444] rounded-[12px] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#EF4444] text-sm font-medium">Rojas</span>
                  <span className="text-[#EF4444] text-xl font-bold">{item.seriesRojas}</span>
                </div>
              </div>
            </div>

            {/* Indicador de tendencia */}
            <div className="mt-4 flex items-center gap-2">
              {item.rpePromedio > 7.5 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-[#EF4444]" />
                  <span className="text-sm text-[#EF4444]">Esfuerzo alto</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm text-[#10B981]">Esfuerzo controlado</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {historialFiltrado.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#94A3B8]">No hay check-ins registrados</p>
        </div>
      )}
    </div>
  );
}

