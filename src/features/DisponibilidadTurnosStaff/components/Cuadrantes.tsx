import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface CuadranteDia {
  dia: string;
  fecha: string;
  turnos: {
    manana: string;
    tarde: string;
    noche: string;
  };
}

export default function Cuadrantes() {
  const [semanaActual, setSemanaActual] = useState(0);

  const cuadrante: CuadranteDia[] = [
    {
      dia: 'Lunes',
      fecha: '26/10',
      turnos: {
        manana: 'Ana García',
        tarde: 'Carlos Martínez',
        noche: 'Laura Rodríguez'
      }
    },
    {
      dia: 'Martes',
      fecha: '27/10',
      turnos: {
        manana: 'Carlos Martínez',
        tarde: 'Laura Rodríguez',
        noche: 'Ana García'
      }
    },
    {
      dia: 'Miércoles',
      fecha: '28/10',
      turnos: {
        manana: 'Laura Rodríguez',
        tarde: 'Ana García',
        noche: 'Carlos Martínez'
      }
    },
    {
      dia: 'Jueves',
      fecha: '29/10',
      turnos: {
        manana: 'Ana García',
        tarde: 'Carlos Martínez',
        noche: 'Laura Rodríguez'
      }
    },
    {
      dia: 'Viernes',
      fecha: '30/10',
      turnos: {
        manana: 'Carlos Martínez',
        tarde: 'Laura Rodríguez',
        noche: 'Ana García'
      }
    },
    {
      dia: 'Sábado',
      fecha: '31/10',
      turnos: {
        manana: 'Laura Rodríguez',
        tarde: 'Ana García',
        noche: '-'
      }
    },
    {
      dia: 'Domingo',
      fecha: '01/11',
      turnos: {
        manana: '-',
        tarde: '-',
        noche: '-'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Cuadrantes de Personal</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSemanaActual(semanaActual - 1)}
            className="p-2 bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg border border-[#475569] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[#F1F5F9] font-semibold px-4">Semana Actual</span>
          <button
            onClick={() => setSemanaActual(semanaActual + 1)}
            className="p-2 bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg border border-[#475569] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="text-left text-[#94A3B8] font-semibold pb-4 px-4">Día</th>
                <th className="text-left text-[#94A3B8] font-semibold pb-4 px-4">Mañana (9-13h)</th>
                <th className="text-left text-[#94A3B8] font-semibold pb-4 px-4">Tarde (13-17h)</th>
                <th className="text-left text-[#94A3B8] font-semibold pb-4 px-4">Noche (17-21h)</th>
              </tr>
            </thead>
            <tbody>
              {cuadrante.map((dia, index) => (
                <tr key={index} className="border-b border-[#334155]/50 hover:bg-[#2A2A3A]/50 transition-all duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#6366F1]" />
                      <div>
                        <p className="text-[#F1F5F9] font-medium">{dia.dia}</p>
                        <p className="text-[#94A3B8] text-sm">{dia.fecha}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {dia.turnos.manana !== '-' && <Users className="w-4 h-4 text-[#94A3B8]" />}
                      <span className="text-[#F1F5F9]">{dia.turnos.manana}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {dia.turnos.tarde !== '-' && <Users className="w-4 h-4 text-[#94A3B8]" />}
                      <span className="text-[#F1F5F9]">{dia.turnos.tarde}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {dia.turnos.noche !== '-' && <Users className="w-4 h-4 text-[#94A3B8]" />}
                      <span className="text-[#F1F5F9]">{dia.turnos.noche}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            <h3 className="text-[#F1F5F9] font-semibold">Turno Mañana</h3>
          </div>
          <p className="text-[#94A3B8] text-sm">9:00 - 13:00</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#6366F1]"></div>
            <h3 className="text-[#F1F5F9] font-semibold">Turno Tarde</h3>
          </div>
          <p className="text-[#94A3B8] text-sm">13:00 - 17:00</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
            <h3 className="text-[#F1F5F9] font-semibold">Turno Noche</h3>
          </div>
          <p className="text-[#94A3B8] text-sm">17:00 - 21:00</p>
        </div>
      </div>
    </div>
  );
}

