import { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';

interface ComidaPlanificada {
  id: string;
  dia: string;
  nombre: string;
  horario: string;
  calorias: number;
}

const diasSemana = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export default function PlanificadorComidas() {
  const [diaSeleccionado, setDiaSeleccionado] = useState('Lunes');
  const [comidas, setComidas] = useState<ComidaPlanificada[]>([]);
  const [nuevaComida, setNuevaComida] = useState({
    nombre: '',
    horario: '12:00',
    calorias: 0
  });

  const agregarComida = () => {
    if (!nuevaComida.nombre) return;

    const comida: ComidaPlanificada = {
      id: Date.now().toString(),
      dia: diaSeleccionado,
      nombre: nuevaComida.nombre,
      horario: nuevaComida.horario,
      calorias: nuevaComida.calorias
    };

    setComidas([...comidas, comida]);
    setNuevaComida({ nombre: '', horario: '12:00', calorias: 0 });
  };

  const eliminarComida = (id: string) => {
    setComidas(comidas.filter(c => c.id !== id));
  };

  const comidasDelDia = comidas.filter(c => c.dia === diaSeleccionado);
  const totalCaloriasDia = comidasDelDia.reduce((sum, c) => sum + c.calorias, 0);

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#6366F1] p-2 rounded-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#0F172A]">Planificador de Comidas Semanal</h2>
      </div>

      {/* Selector de días */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {diasSemana.map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSeleccionado(dia)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ease-out font-semibold ${
              diaSeleccionado === dia
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'bg-[#F8FAFC] text-[#94A3B8] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
            }`}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* Resumen del día */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-semibold text-[#94A3B8]">Comidas planificadas</div>
            <div className="text-2xl font-bold text-[#0F172A]">{comidasDelDia.length}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#94A3B8]">Calorías totales</div>
            <div className="text-2xl font-bold text-blue-600">{totalCaloriasDia}</div>
          </div>
        </div>
      </div>

      {/* Formulario para agregar comida */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-[#0F172A]">Agregar Comida a {diaSeleccionado}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={nuevaComida.nombre}
            onChange={(e) => setNuevaComida({ ...nuevaComida, nombre: e.target.value })}
            placeholder="Nombre de la comida"
            className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
          />
          <input
            type="time"
            value={nuevaComida.horario}
            onChange={(e) => setNuevaComida({ ...nuevaComida, horario: e.target.value })}
            className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
          />
          <input
            type="number"
            value={nuevaComida.calorias || ''}
            onChange={(e) => setNuevaComida({ ...nuevaComida, calorias: parseInt(e.target.value) || 0 })}
            placeholder="Calorías"
            className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
          />
          <button
            onClick={agregarComida}
            className="flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-xl px-4 py-3 transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de comidas del día */}
      <div className="space-y-2">
        {comidasDelDia.length === 0 ? (
          <div className="text-center py-8 text-[#94A3B8]">
            No hay comidas planificadas para {diaSeleccionado}
          </div>
        ) : (
          comidasDelDia
            .sort((a, b) => a.horario.localeCompare(b.horario))
            .map((comida) => (
              <div
                key={comida.id}
                className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-600 font-semibold">{comida.horario}</div>
                  <div>
                    <div className="text-[#0F172A] font-semibold">{comida.nombre}</div>
                    <div className="text-sm text-[#94A3B8]">{comida.calorias} kcal</div>
                  </div>
                </div>
                <button
                  onClick={() => eliminarComida(comida.id)}
                  className="text-[#EF4444] hover:bg-[#FEE2E2] p-2 rounded-xl transition-all duration-200 ease-out"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
        )}
      </div>

      {/* Resumen semanal */}
      <div className="border-t border-[#E2E8F0] pt-4">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Resumen Semanal</h3>
        <div className="grid grid-cols-7 gap-2">
          {diasSemana.map((dia) => {
            const comidasDia = comidas.filter(c => c.dia === dia);
            const caloriasDia = comidasDia.reduce((sum, c) => sum + c.calorias, 0);
            return (
              <div key={dia} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2 text-center">
                <div className="text-xs text-[#94A3B8] mb-1">{dia.substring(0, 3)}</div>
                <div className="text-sm font-bold text-[#0F172A]">{comidasDia.length}</div>
                <div className="text-xs text-blue-600 font-semibold">{caloriasDia}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

