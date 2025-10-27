import { useState } from 'react';
import { Repeat, Plus, Trash2 } from 'lucide-react';

interface Sustitucion {
  id: string;
  alimentoOriginal: string;
  alimentosAlternativos: string[];
  razon?: string;
}

export default function GestorSustituciones() {
  const [sustituciones, setSustituciones] = useState<Sustitucion[]>([
    {
      id: '1',
      alimentoOriginal: 'Pechuga de Pollo',
      alimentosAlternativos: ['Pavo', 'Atún', 'Tofu'],
      razon: 'Variedad de proteínas'
    },
    {
      id: '2',
      alimentoOriginal: 'Arroz Blanco',
      alimentosAlternativos: ['Arroz Integral', 'Quinoa', 'Batata'],
      razon: 'Opciones de carbohidratos'
    }
  ]);

  const [nuevaSustitucion, setNuevaSustitucion] = useState({
    alimentoOriginal: '',
    alternativa: '',
    razon: ''
  });

  const agregarSustitucion = () => {
    if (!nuevaSustitucion.alimentoOriginal || !nuevaSustitucion.alternativa) return;

    const existente = sustituciones.find(s => s.alimentoOriginal === nuevaSustitucion.alimentoOriginal);

    if (existente) {
      // Agregar alternativa a sustitucion existente
      setSustituciones(sustituciones.map(s =>
        s.id === existente.id
          ? { ...s, alimentosAlternativos: [...s.alimentosAlternativos, nuevaSustitucion.alternativa] }
          : s
      ));
    } else {
      // Crear nueva sustitucion
      const sustitucion: Sustitucion = {
        id: Date.now().toString(),
        alimentoOriginal: nuevaSustitucion.alimentoOriginal,
        alimentosAlternativos: [nuevaSustitucion.alternativa],
        razon: nuevaSustitucion.razon
      };
      setSustituciones([...sustituciones, sustitucion]);
    }

    setNuevaSustitucion({ alimentoOriginal: '', alternativa: '', razon: '' });
  };

  const eliminarSustitucion = (id: string) => {
    setSustituciones(sustituciones.filter(s => s.id !== id));
  };

  const eliminarAlternativa = (sustitucionId: string, alternativa: string) => {
    setSustituciones(sustituciones.map(s => {
      if (s.id === sustitucionId) {
        const nuevasAlternativas = s.alimentosAlternativos.filter(a => a !== alternativa);
        return { ...s, alimentosAlternativos: nuevasAlternativas };
      }
      return s;
    }).filter(s => s.alimentosAlternativos.length > 0));
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-orange-600 p-2 rounded-lg">
          <Repeat className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Gestor de Sustituciones</h2>
      </div>

      <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-blue-400 mt-1">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-blue-300 font-medium mb-1">Flexibilidad Alimentaria</h4>
            <p className="text-sm text-slate-300">
              Configura alimentos alternativos para dar flexibilidad a la dieta. 
              Los clientes podrán intercambiar alimentos manteniendo los macros.
            </p>
          </div>
        </div>
      </div>

      {/* Formulario para agregar sustitución */}
      <div className="bg-slate-700 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">Agregar Nueva Sustitución</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={nuevaSustitucion.alimentoOriginal}
            onChange={(e) => setNuevaSustitucion({ ...nuevaSustitucion, alimentoOriginal: e.target.value })}
            placeholder="Alimento original"
            className="bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            value={nuevaSustitucion.alternativa}
            onChange={(e) => setNuevaSustitucion({ ...nuevaSustitucion, alternativa: e.target.value })}
            placeholder="Alimento alternativo"
            className="bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            value={nuevaSustitucion.razon}
            onChange={(e) => setNuevaSustitucion({ ...nuevaSustitucion, razon: e.target.value })}
            placeholder="Razón (opcional)"
            className="bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={agregarSustitucion}
            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-4 py-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de sustituciones */}
      <div className="space-y-3">
        {sustituciones.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No hay sustituciones configuradas
          </div>
        ) : (
          sustituciones.map((sustitucion) => (
            <div
              key={sustitucion.id}
              className="bg-slate-700 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-medium text-lg">{sustitucion.alimentoOriginal}</h4>
                    {sustitucion.razon && (
                      <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                        {sustitucion.razon}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sustitucion.alimentosAlternativos.map((alternativa, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-orange-600/20 border border-orange-600/30 text-orange-300 px-3 py-1 rounded-lg"
                      >
                        <Repeat className="w-3 h-3" />
                        <span className="text-sm">{alternativa}</span>
                        <button
                          onClick={() => eliminarAlternativa(sustitucion.id, alternativa)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => eliminarSustitucion(sustitucion.id)}
                  className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-sm text-slate-400">Alimentos con sustituciones</div>
          <div className="text-2xl font-bold text-white">{sustituciones.length}</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-sm text-slate-400">Total de alternativas</div>
          <div className="text-2xl font-bold text-orange-400">
            {sustituciones.reduce((sum, s) => sum + s.alimentosAlternativos.length, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

