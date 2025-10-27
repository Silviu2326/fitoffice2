import { Clock, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Horario {
  id: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
}

export default function GestorHorarios() {
  const [horarios, setHorarios] = useState<Horario[]>([
    { id: '1', dia: 'Lunes', horaInicio: '09:00', horaFin: '20:00', activo: true },
    { id: '2', dia: 'Martes', horaInicio: '09:00', horaFin: '20:00', activo: true },
    { id: '3', dia: 'Miércoles', horaInicio: '09:00', horaFin: '20:00', activo: true },
    { id: '4', dia: 'Jueves', horaInicio: '09:00', horaFin: '20:00', activo: true },
    { id: '5', dia: 'Viernes', horaInicio: '09:00', horaFin: '18:00', activo: true },
    { id: '6', dia: 'Sábado', horaInicio: '10:00', horaFin: '14:00', activo: false },
    { id: '7', dia: 'Domingo', horaInicio: '10:00', horaFin: '14:00', activo: false }
  ]);

  const toggleDia = (id: string) => {
    setHorarios(prev =>
      prev.map(h => (h.id === id ? { ...h, activo: !h.activo } : h))
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#6366F1]" />
            <div>
              <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Horarios de Trabajo</h3>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Configura tu disponibilidad semanal</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 shadow-md">
            <Plus className="w-4 h-4" />
            <span className="font-semibold text-[14px]">Agregar Horario</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {horarios.map(horario => (
            <div
              key={horario.id}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                horario.activo
                  ? 'border-[#6366F1] bg-[#EEF2FF]'
                  : 'border-[#E2E8F0] bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={horario.activo}
                  onChange={() => toggleDia(horario.id)}
                  className="w-5 h-5 text-[#6366F1] rounded focus:ring-[#6366F1]"
                />
                <div className="w-28">
                  <p className={`font-semibold text-[16px] ${horario.activo ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
                    {horario.dia}
                  </p>
                </div>
                {horario.activo && (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={horario.horaInicio}
                        className="px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[14px]"
                      />
                      <span className="text-[#64748B]">-</span>
                      <input
                        type="time"
                        value={horario.horaFin}
                        className="px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[14px]"
                      />
                    </div>
                    <div className="text-[14px] text-[#64748B] ml-4">
                      {(() => {
                        const inicio = new Date(`2000-01-01T${horario.horaInicio}`);
                        const fin = new Date(`2000-01-01T${horario.horaFin}`);
                        const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
                        return `${horas}h de trabajo`;
                      })()}
                    </div>
                  </>
                )}
                {!horario.activo && (
                  <span className="text-[#94A3B8] italic text-[14px]">No disponible</span>
                )}
              </div>
              {horario.activo && (
                <button className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#DBEAFE] border border-[#3B82F6] rounded-xl">
          <p className="text-[14px] leading-[20px] text-[#0F172A]">
            <span className="font-semibold">💡 Consejo:</span> Configura tus horarios de trabajo para que
            tus clientes puedan reservar citas automáticamente en los momentos que estés disponible.
          </p>
        </div>
      </div>
    </div>
  );
}

