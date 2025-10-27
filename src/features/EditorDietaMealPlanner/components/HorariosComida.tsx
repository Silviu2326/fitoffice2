import { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

interface Horario {
  id: string;
  nombre: string;
  hora: string;
  notificacion: boolean;
}

export default function HorariosComida() {
  const [horarios, setHorarios] = useState<Horario[]>([
    { id: '1', nombre: 'Desayuno', hora: '08:00', notificacion: true },
    { id: '2', nombre: 'Snack Mañana', hora: '11:00', notificacion: false },
    { id: '3', nombre: 'Almuerzo', hora: '14:00', notificacion: true },
    { id: '4', nombre: 'Snack Tarde', hora: '17:00', notificacion: false },
    { id: '5', nombre: 'Cena', hora: '21:00', notificacion: true },
  ]);

  const [nuevoHorario, setNuevoHorario] = useState({
    nombre: '',
    hora: '12:00',
    notificacion: false
  });

  const agregarHorario = () => {
    if (!nuevoHorario.nombre) return;

    const horario: Horario = {
      id: Date.now().toString(),
      nombre: nuevoHorario.nombre,
      hora: nuevoHorario.hora,
      notificacion: nuevoHorario.notificacion
    };

    setHorarios([...horarios, horario].sort((a, b) => a.hora.localeCompare(b.hora)));
    setNuevoHorario({ nombre: '', hora: '12:00', notificacion: false });
  };

  const eliminarHorario = (id: string) => {
    setHorarios(horarios.filter(h => h.id !== id));
  };

  const actualizarHorario = (id: string, campo: keyof Horario, valor: any) => {
    setHorarios(horarios.map(h => 
      h.id === id ? { ...h, [campo]: valor } : h
    ).sort((a, b) => a.hora.localeCompare(b.hora)));
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-purple-600 p-2 rounded-lg">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Horarios de Comida</h2>
      </div>

      {/* Formulario para agregar horario */}
      <div className="bg-slate-700 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">Agregar Nuevo Horario</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={nuevoHorario.nombre}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, nombre: e.target.value })}
            placeholder="Nombre de la comida"
            className="bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="time"
            value={nuevoHorario.hora}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, hora: e.target.value })}
            className="bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <label className="flex items-center gap-2 bg-slate-600 rounded-lg px-4 py-2">
            <input
              type="checkbox"
              checked={nuevoHorario.notificacion}
              onChange={(e) => setNuevoHorario({ ...nuevoHorario, notificacion: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm text-white">Notificar</span>
          </label>
          <button
            onClick={agregarHorario}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de horarios */}
      <div className="space-y-2">
        {horarios.map((horario) => (
          <div
            key={horario.id}
            className="bg-slate-700 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-purple-600 text-white font-bold text-lg px-3 py-2 rounded-lg min-w-[80px] text-center">
                {horario.hora}
              </div>
              <input
                type="text"
                value={horario.nombre}
                onChange={(e) => actualizarHorario(horario.id, 'nombre', e.target.value)}
                className="flex-1 bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="time"
                value={horario.hora}
                onChange={(e) => actualizarHorario(horario.id, 'hora', e.target.value)}
                className="bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.notificacion}
                  onChange={(e) => actualizarHorario(horario.id, 'notificacion', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-300">Notificar</span>
              </label>
            </div>
            <button
              onClick={() => eliminarHorario(horario.id)}
              className="ml-4 text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-blue-400 mt-1">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-blue-300 font-medium mb-1">Distribución de Comidas</h4>
            <p className="text-sm text-slate-300">
              Configura los horarios de comida según las necesidades de tu cliente. 
              Las notificaciones ayudarán a recordar cuándo es el momento de cada comida.
            </p>
            <div className="mt-2 text-sm text-slate-400">
              Total de comidas configuradas: <span className="text-white font-medium">{horarios.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

