import { useState } from 'react';
import { BookTemplate, TrendingUp, Copy, Eye } from 'lucide-react';
import PlantillasList from '../components/PlantillasList';
import CreadorPlantilla from '../components/CreadorPlantilla';
import DuplicadorPlantilla from '../components/DuplicadorPlantilla';
import VisorPlantilla from '../components/VisorPlantilla';
import CategorizadorPlantillas from '../components/CategorizadorPlantillas';
import BuscadorPlantillas from '../components/BuscadorPlantillas';
import GestorVersiones from '../components/GestorVersiones';
import AnalyticsPlantillas from '../components/AnalyticsPlantillas';

type Vista = 'catalogo' | 'analytics' | 'versiones';

interface Plantilla {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  categoria: string;
  usos: number;
  efectividad: number;
  version: string;
}

export default function PlantillasEntrenamientoPage() {
  const [vistaActiva, setVistaActiva] = useState<Vista>('catalogo');
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [mostrarCreador, setMostrarCreador] = useState(false);
  const [mostrarDuplicador, setMostrarDuplicador] = useState(false);
  const [mostrarVisor, setMostrarVisor] = useState(false);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<Plantilla | null>(null);

  const handleNuevaPlantilla = () => {
    setPlantillaSeleccionada(null);
    setMostrarCreador(true);
  };

  const handleEditarPlantilla = (plantilla: Plantilla) => {
    setPlantillaSeleccionada(plantilla);
    setMostrarCreador(true);
  };

  const handleDuplicarPlantilla = (plantilla: Plantilla) => {
    setPlantillaSeleccionada(plantilla);
    setMostrarDuplicador(true);
  };

  const handleVerPlantilla = (plantilla: Plantilla) => {
    setPlantillaSeleccionada(plantilla);
    setMostrarVisor(true);
  };

  const handleGuardarPlantilla = (data: any) => {
    console.log('Guardar plantilla:', data);
    // Aquí iría la lógica para guardar la plantilla
    setMostrarCreador(false);
  };

  const handleDuplicar = (nombre: string, descripcion: string) => {
    console.log('Duplicar plantilla:', nombre, descripcion);
    // Aquí iría la lógica para duplicar la plantilla
    setMostrarDuplicador(false);
  };

  const handleBuscar = (termino: string) => {
    setTerminoBusqueda(termino);
    console.log('Buscar:', termino);
  };

  const estadisticas = [
    {
      titulo: 'Plantillas Creadas',
      valor: '24',
      cambio: '+6 este mes',
      tendencia: 'up',
      color: 'emerald'
    },
    {
      titulo: 'Plantillas Activas',
      valor: '18',
      cambio: '75% del total',
      tendencia: 'neutral',
      color: 'blue'
    },
    {
      titulo: 'Veces Reutilizadas',
      valor: '156',
      cambio: '+23 esta semana',
      tendencia: 'up',
      color: 'purple'
    },
    {
      titulo: 'Efectividad Media',
      valor: '87%',
      cambio: '+4% vs mes anterior',
      tendencia: 'up',
      color: 'orange'
    }
  ];

  const vistas = [
    { id: 'catalogo' as Vista, nombre: 'Catálogo de Plantillas', icono: BookTemplate },
    { id: 'analytics' as Vista, nombre: 'Analytics', icono: TrendingUp },
    { id: 'versiones' as Vista, nombre: 'Gestión de Versiones', icono: Copy }
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-[#0F0F23] via-[#0F0F23] to-[#6366F1]/10">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl shadow-lg">
                <BookTemplate className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#F1F5F9]">Plantillas de Entrenamiento</h1>
                <p className="text-[#94A3B8] mt-1">
                  Sistema de plantillas reutilizables para estandarizar y escalar programas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estadisticas.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1E1E2E] backdrop-blur-sm border border-[#334155] rounded-2xl p-6 hover:border-[#6366F1]/50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#94A3B8] text-sm font-medium">{stat.titulo}</p>
                  <p className="text-3xl font-bold text-[#F1F5F9] mt-1">{stat.valor}</p>
                </div>
                <div className={`p-2 bg-${stat.color}-500/20 rounded-xl`}>
                  <TrendingUp className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
              </div>
              <p className="text-sm text-[#94A3B8]">
                {stat.cambio}
              </p>
            </div>
          ))}
        </div>

        {/* Navegación por pestañas */}
        <div className="flex gap-2 mb-6 bg-[#1E1E2E] backdrop-blur-sm border border-[#334155] rounded-2xl p-2">
          {vistas.map((vista) => {
            const Icono = vista.icono;
            return (
              <button
                key={vista.id}
                onClick={() => setVistaActiva(vista.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                  vistaActiva === vista.id
                    ? 'bg-[#6366F1] text-white shadow-lg font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#2A2A3A]'
                }`}
              >
                <Icono className="w-5 h-5" />
                <span className="font-medium">{vista.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Buscador (solo en vista catálogo) */}
        {vistaActiva === 'catalogo' && (
          <div className="mb-6">
            <BuscadorPlantillas onBuscar={handleBuscar} />
          </div>
        )}

        {/* Categorizador (solo en vista catálogo) */}
        {vistaActiva === 'catalogo' && (
          <div className="mb-6">
            <CategorizadorPlantillas
              categoriaActiva={categoriaActiva}
              onCambiarCategoria={setCategoriaActiva}
            />
          </div>
        )}

        {/* Contenido según vista activa */}
        <div className="bg-[#1E1E2E]/60 backdrop-blur-sm border border-[#334155] rounded-2xl p-6 shadow-xl">
          {vistaActiva === 'catalogo' && (
            <PlantillasList
              onNuevaPlantilla={handleNuevaPlantilla}
              onEditarPlantilla={handleEditarPlantilla}
              onDuplicarPlantilla={handleDuplicarPlantilla}
              onVerPlantilla={handleVerPlantilla}
              categoriaFiltro={categoriaActiva}
              terminoBusqueda={terminoBusqueda}
            />
          )}
          {vistaActiva === 'analytics' && <AnalyticsPlantillas />}
          {vistaActiva === 'versiones' && <GestorVersiones />}
        </div>
      </div>

      {/* Modales */}
      {mostrarCreador && (
        <CreadorPlantilla
          plantilla={plantillaSeleccionada || undefined}
          onClose={() => setMostrarCreador(false)}
          onGuardar={handleGuardarPlantilla}
        />
      )}

      {mostrarDuplicador && plantillaSeleccionada && (
        <DuplicadorPlantilla
          plantilla={{
            id: plantillaSeleccionada.id,
            nombre: plantillaSeleccionada.nombre,
            descripcion: plantillaSeleccionada.descripcion
          }}
          onClose={() => setMostrarDuplicador(false)}
          onDuplicar={handleDuplicar}
        />
      )}

      {mostrarVisor && plantillaSeleccionada && (
        <VisorPlantilla
          plantilla={plantillaSeleccionada}
          onClose={() => setMostrarVisor(false)}
          onEditar={() => {
            setMostrarVisor(false);
            handleEditarPlantilla(plantillaSeleccionada);
          }}
          onDuplicar={() => {
            setMostrarVisor(false);
            handleDuplicarPlantilla(plantillaSeleccionada);
          }}
        />
      )}
    </div>
  );
}

