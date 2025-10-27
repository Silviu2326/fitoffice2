import { Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

interface SelectorHuecosProps {
  onSeleccionar: (fecha: Date, hora: string) => void;
  onCancelar: () => void;
}

export default function SelectorHuecos({ onSeleccionar, onCancelar }: SelectorHuecosProps) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');

  // Generar horarios disponibles (ejemplo)
  const horariosDisponibles = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00'
  ];

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const obtenerDiasMes = () => {
    const año = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const dias = [];

    // Días vacíos al inicio
    for (let i = 0; i < primerDia.getDay(); i++) {
      dias.push(null);
    }

    // Días del mes
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(año, mes, i));
    }

    return dias;
  };

  const cambiarMes = (direccion: number) => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + direccion);
    setFechaSeleccionada(nuevaFecha);
  };

  const seleccionarFecha = (fecha: Date | null) => {
    if (fecha) {
      setFechaSeleccionada(fecha);
      setHoraSeleccionada('');
    }
  };

  const confirmarSeleccion = () => {
    if (horaSeleccionada) {
      onSeleccionar(fechaSeleccionada, horaSeleccionada);
    }
  };

  const esDiaSeleccionado = (fecha: Date | null) => {
    if (!fecha) return false;
    return fecha.toDateString() === fechaSeleccionada.toDateString();
  };

  const esDiaHoy = (fecha: Date | null) => {
    if (!fecha) return false;
    return fecha.toDateString() === new Date().toDateString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Seleccionar Fecha y Hora</h2>
          <p className="text-[#64748B] mt-1">Elige un hueco disponible para la reserva</p>
        </div>
        <button
          onClick={onCancelar}
          className="p-2 hover:bg-[#F8FAFC] rounded-xl transition-all duration-200"
        >
          <X className="w-6 h-6 text-[#64748B]" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendario */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => cambiarMes(-1)}
                className="p-2 hover:bg-[#F8FAFC] rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-[#64748B]" />
              </button>
              <h3 className="text-lg font-semibold text-[#0F172A] capitalize">
                {fechaSeleccionada.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => cambiarMes(1)}
                className="p-2 hover:bg-[#F8FAFC] rounded-xl transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {diasSemana.map((dia) => (
                <div key={dia} className="text-center text-xs font-medium text-[#64748B] py-2 uppercase">
                  {dia}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {obtenerDiasMes().map((fecha, index) => (
                <button
                  key={index}
                  onClick={() => seleccionarFecha(fecha)}
                  disabled={!fecha}
                  className={`
                    aspect-square p-2 rounded-xl text-sm font-semibold transition-all duration-200
                    ${!fecha ? 'invisible' : ''}
                    ${esDiaSeleccionado(fecha) ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]' : ''}
                    ${esDiaHoy(fecha) && !esDiaSeleccionado(fecha) ? 'bg-[#EEF2FF] text-[#6366F1] border-2 border-[#6366F1]' : ''}
                    ${!esDiaSeleccionado(fecha) && !esDiaHoy(fecha) ? 'hover:bg-[#F8FAFC] text-[#0F172A]' : ''}
                  `}
                >
                  {fecha?.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Horarios */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#6366F1]" />
              <h3 className="text-lg font-semibold text-[#0F172A]">Horarios Disponibles</h3>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4 mb-4 border border-[#E2E8F0]">
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Calendar className="w-4 h-4 text-[#6366F1]" />
                <span className="font-medium capitalize">
                  {fechaSeleccionada.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {horariosDisponibles.map((hora) => (
                <button
                  key={hora}
                  onClick={() => setHoraSeleccionada(hora)}
                  className={`
                    p-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${horaSeleccionada === hora 
                      ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]' 
                      : 'bg-white border-2 border-[#E2E8F0] text-[#0F172A] hover:border-[#6366F1] hover:bg-[#EEF2FF]'
                    }
                  `}
                >
                  {hora}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen y Botones */}
        {horaSeleccionada && (
          <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
            <div className="bg-[#EEF2FF] rounded-xl p-4 mb-4 border border-[#6366F1]/20">
              <h4 className="font-semibold text-[#6366F1] mb-2">Resumen de la Selección</h4>
              <div className="space-y-1 text-sm text-[#4F46E5]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="capitalize">
                    {fechaSeleccionada.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{horaSeleccionada}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCancelar}
                className="flex-1 px-6 py-3 bg-[#F8FAFC] text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 font-semibold border border-[#E2E8F0]"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarSeleccion}
                className="flex-1 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

