import { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Building2 } from 'lucide-react';

interface AforoSala {
  id: string;
  nombreSala: string;
  aforoMaximo: number;
  aforoActual: number;
  porcentajeOcupacion: number;
  ubicacion: string;
  ultimaActualizacion: Date;
}

export default function ControlAforo() {
  const [mostrarSoloOcupadas, setMostrarSoloOcupadas] = useState(false);

  // Datos de ejemplo
  const aforoSalasMock: AforoSala[] = [
    {
      id: '1',
      nombreSala: 'Sala de Musculación Principal',
      aforoMaximo: 50,
      aforoActual: 38,
      porcentajeOcupacion: 76,
      ubicacion: 'Planta 1',
      ultimaActualizacion: new Date()
    },
    {
      id: '2',
      nombreSala: 'Sala de Spinning',
      aforoMaximo: 20,
      aforoActual: 20,
      porcentajeOcupacion: 100,
      ubicacion: 'Planta 2',
      ultimaActualizacion: new Date()
    },
    {
      id: '3',
      nombreSala: 'Sala de Yoga',
      aforoMaximo: 25,
      aforoActual: 12,
      porcentajeOcupacion: 48,
      ubicacion: 'Planta 2',
      ultimaActualizacion: new Date()
    },
    {
      id: '4',
      nombreSala: 'Sala de Cardio',
      aforoMaximo: 30,
      aforoActual: 5,
      porcentajeOcupacion: 17,
      ubicacion: 'Planta 1',
      ultimaActualizacion: new Date()
    },
    {
      id: '5',
      nombreSala: 'Sala de CrossFit',
      aforoMaximo: 15,
      aforoActual: 14,
      porcentajeOcupacion: 93,
      ubicacion: 'Planta 3',
      ultimaActualizacion: new Date()
    }
  ];

  const getColorPorcentaje = (porcentaje: number) => {
    if (porcentaje >= 90) return 'text-red-600';
    if (porcentaje >= 70) return 'text-amber-600';
    if (porcentaje >= 50) return 'text-blue-600';
    return 'text-emerald-600';
  };

  const getBarColor = (porcentaje: number) => {
    if (porcentaje >= 90) return 'bg-red-500';
    if (porcentaje >= 70) return 'bg-amber-500';
    if (porcentaje >= 50) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const salasParaMostrar = mostrarSoloOcupadas
    ? aforoSalasMock.filter(sala => sala.aforoActual > 0)
    : aforoSalasMock;

  const aforoTotalMaximo = aforoSalasMock.reduce((sum, sala) => sum + sala.aforoMaximo, 0);
  const aforoTotalActual = aforoSalasMock.reduce((sum, sala) => sum + sala.aforoActual, 0);
  const ocupacionGlobal = Math.round((aforoTotalActual / aforoTotalMaximo) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Control de Aforo</h2>
        <p className="text-[#64748B] text-[14px] leading-5 mt-1">Monitoreo en tiempo real de la ocupación de salas</p>
      </div>

      {/* Resumen global */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8" />
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {aforoTotalActual} / {aforoTotalMaximo}
          </div>
          <div className="text-[#D1FAE5] text-[14px] leading-5">Ocupación Total</div>
        </div>

        <div className="bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Building2 className="w-8 h-8" />
            <span className="text-[24px] leading-8 font-bold">{aforoSalasMock.length}</span>
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {aforoSalasMock.filter(s => s.aforoActual > 0).length}
          </div>
          <div className="text-[#DBEAFE] text-[14px] leading-5">Salas en Uso</div>
        </div>

        <div className="bg-gradient-to-br from-[#A855F7] to-[#EC4899] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-[24px] leading-8 font-bold">
              {aforoSalasMock.filter(s => s.porcentajeOcupacion >= 90).length}
            </span>
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">{ocupacionGlobal}%</div>
          <div className="text-[#F3E8FF] text-[14px] leading-5">Ocupación Global</div>
        </div>
      </div>

      {/* Filtro */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="soloOcupadas"
          checked={mostrarSoloOcupadas}
          onChange={(e) => setMostrarSoloOcupadas(e.target.checked)}
          className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
        />
        <label htmlFor="soloOcupadas" className="text-sm text-slate-700 cursor-pointer">
          Mostrar solo salas ocupadas
        </label>
      </div>

      {/* Lista de salas */}
      <div className="space-y-4">
        {salasParaMostrar.map(sala => (
          <div
            key={sala.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg transition-all duration-200"
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-[18px] leading-7 text-[#0F172A] mb-1">{sala.nombreSala}</h3>
                <p className="text-[14px] leading-5 text-[#64748B]">{sala.ubicacion}</p>
              </div>
              <div className="text-right">
                <div className={`text-[36px] leading-[44px] font-bold ${getColorPorcentaje(sala.porcentajeOcupacion)}`}>
                  {sala.porcentajeOcupacion}%
                </div>
                <div className="text-[14px] leading-5 text-[#64748B]">
                  {sala.aforoActual} / {sala.aforoMaximo}
                </div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="space-y-2">
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${getBarColor(sala.porcentajeOcupacion)} transition-all duration-500 flex items-center justify-end pr-2`}
                  style={{ width: `${sala.porcentajeOcupacion}%` }}
                >
                  {sala.porcentajeOcupacion >= 20 && (
                    <span className="text-white text-xs font-bold">
                      {sala.aforoActual}
                    </span>
                  )}
                </div>
              </div>

              {/* Alertas */}
              {sala.porcentajeOcupacion >= 90 && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Aforo casi completo - {sala.aforoMaximo - sala.aforoActual} lugares disponibles</span>
                </div>
              )}

              {sala.porcentajeOcupacion === 100 && (
                <div className="flex items-center gap-2 text-red-700 text-sm font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AFORO COMPLETO - No se permiten más entradas</span>
                </div>
              )}
            </div>

            {/* Última actualización */}
            <div className="mt-3 text-xs text-slate-500">
              Última actualización: {sala.ultimaActualizacion.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {salasParaMostrar.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No hay salas ocupadas en este momento</p>
        </div>
      )}
    </div>
  );
}

