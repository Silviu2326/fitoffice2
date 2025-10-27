import { Calendar, Package, ChevronRight } from 'lucide-react';

interface PackSemanal {
  id: string;
  nombre: string;
  semanas: number;
  diasPorSemana: number;
  comidasPorDia: number;
  clientesAsignados: number;
  precioSugerido: number;
}

export default function PacksSemanales() {
  const packs: PackSemanal[] = [
    {
      id: '1',
      nombre: 'Pack Básico Semanal',
      semanas: 4,
      diasPorSemana: 7,
      comidasPorDia: 5,
      clientesAsignados: 15,
      precioSugerido: 120
    },
    {
      id: '2',
      nombre: 'Pack Intensivo Mensual',
      semanas: 4,
      diasPorSemana: 7,
      comidasPorDia: 6,
      clientesAsignados: 8,
      precioSugerido: 180
    },
    {
      id: '3',
      nombre: 'Pack Express 2 Semanas',
      semanas: 2,
      diasPorSemana: 7,
      comidasPorDia: 5,
      clientesAsignados: 12,
      precioSugerido: 70
    }
  ];

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#EEF2FF] p-3 rounded-xl">
          <Package className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Packs Semanales</h2>
          <p className="text-sm text-[#94A3B8]">Planes estructurados por semanas</p>
        </div>
      </div>

      {/* Resumen de packs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] hover:border-[#6366F1] hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#F1F5F9] pr-2">{pack.nombre}</h3>
              <span className="bg-[#D1FAE5] text-[#10B981] px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
                {pack.clientesAsignados} activos
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#94A3B8]">Duración:</span>
                <span className="text-[#F1F5F9] font-medium">{pack.semanas} semanas</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#94A3B8]">Días por semana:</span>
                <span className="text-[#F1F5F9] font-medium">{pack.diasPorSemana}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#94A3B8]">Comidas por día:</span>
                <span className="text-[#F1F5F9] font-medium">{pack.comidasPorDia}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#334155]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#94A3B8]">Precio sugerido:</span>
                <span className="text-2xl font-bold text-[#10B981]">€{pack.precioSugerido}</span>
              </div>
              <button className="w-full px-4 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                Ver Detalles
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ejemplo de estructura semanal */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-[#6366F1]" />
          <div>
            <h3 className="text-lg font-semibold text-[#F1F5F9]">Estructura del Pack Básico Semanal</h3>
            <p className="text-sm text-[#94A3B8]">Ejemplo de distribución de comidas</p>
          </div>
        </div>

        <div className="space-y-3">
          {diasSemana.map((dia, index) => (
            <div
              key={dia}
              className="bg-[#0F0F23] rounded-xl p-4 hover:bg-[#1E1E2E] transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                    <span className="text-[#6366F1] font-bold">{dia.substring(0, 1)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#F1F5F9]">{dia}</p>
                    <p className="text-sm text-[#94A3B8]">5 comidas planificadas</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['D', 'A', 'C', 'M', 'Ce'].map((comida, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-[#1E1E2E] rounded-lg flex items-center justify-center border border-[#334155]"
                      title={['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'][i]}
                    >
                      <span className="text-xs text-[#94A3B8] font-medium">{comida}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-[#334155]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#6366F1]">35</p>
              <p className="text-xs text-[#94A3B8] mt-1">Comidas totales/semana</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#3B82F6]">140</p>
              <p className="text-xs text-[#94A3B8] mt-1">Comidas totales/mes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#10B981]">€3.43</p>
              <p className="text-xs text-[#94A3B8] mt-1">Precio por comida</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#8B5CF6]">€17.14</p>
              <p className="text-xs text-[#94A3B8] mt-1">Precio por día</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

