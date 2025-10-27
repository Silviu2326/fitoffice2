import { useState } from 'react';
import { Dumbbell, TrendingUp } from 'lucide-react';
import ProgramasList from '../components/ProgramasList';
import ProgramasGrupo from '../components/ProgramasGrupo';
import PlanSala from '../components/PlanSala';
import SeguimientoPrograma from '../components/SeguimientoPrograma';
import CategorizadorProgramas from '../components/CategorizadorProgramas';
import EditorPrograma from '../components/EditorPrograma';
import AsignacionCliente from '../components/AsignacionCliente';
import DuplicadorPrograma from '../components/DuplicadorPrograma';

type Vista = 'lista' | 'grupales' | 'sala' | 'seguimiento';

interface Programa {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  asignados: number;
  duracion: string;
  nivel: string;
  categoria: string;
}

export default function ProgramasEntrenoPage() {
  const [vistaActiva, setVistaActiva] = useState<Vista>('lista');
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const [mostrarAsignacion, setMostrarAsignacion] = useState(false);
  const [mostrarDuplicador, setMostrarDuplicador] = useState(false);
  const [programaSeleccionado, setProgramaSeleccionado] = useState<Programa | null>(null);

  const handleNuevoPrograma = () => {
    setProgramaSeleccionado(null);
    setMostrarEditor(true);
  };

  const handleEditarPrograma = (programa: Programa) => {
    setProgramaSeleccionado(programa);
    setMostrarEditor(true);
  };

  const handleDuplicarPrograma = (programa: Programa) => {
    setProgramaSeleccionado(programa);
    setMostrarDuplicador(true);
  };

  const handleAsignarPrograma = (programa: Programa) => {
    setProgramaSeleccionado(programa);
    setMostrarAsignacion(true);
  };

  const handleGuardarPrograma = (data: any) => {
    console.log('Guardar programa:', data);
    // Aquí iría la lógica para guardar el programa
  };

  const handleAsignar = (clienteId: string) => {
    console.log('Asignar programa a cliente:', clienteId);
    // Aquí iría la lógica para asignar el programa
  };

  const handleDuplicar = (nombre: string, descripcion: string) => {
    console.log('Duplicar programa:', nombre, descripcion);
    // Aquí iría la lógica para duplicar el programa
  };

  const estadisticas = [
    {
      titulo: 'Programas Activos',
      valor: '15',
      cambio: '+3 este mes',
      tendencia: 'up',
      color: 'emerald'
    },
    {
      titulo: 'Clientes Asignados',
      valor: '87',
      cambio: '+12 esta semana',
      tendencia: 'up',
      color: 'blue'
    },
    {
      titulo: 'Adherencia Media',
      valor: '82%',
      cambio: '+5% vs mes anterior',
      tendencia: 'up',
      color: 'purple'
    },
    {
      titulo: 'Programas Grupales',
      valor: '8',
      cambio: '3 clases hoy',
      tendencia: 'neutral',
      color: 'orange'
    }
  ];

  const vistas = [
    { id: 'lista' as Vista, nombre: 'Todos los Programas', icono: Dumbbell },
    { id: 'grupales' as Vista, nombre: 'Programas Grupales', icono: Dumbbell },
    { id: 'sala' as Vista, nombre: 'Planes de Sala', icono: Dumbbell },
    { id: 'seguimiento' as Vista, nombre: 'Seguimiento', icono: TrendingUp }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#6366F1] rounded-xl shadow-md">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Programas de Entreno</h1>
              <p className="text-[#64748B] mt-1">
                Gestiona programas personalizados, grupales y planes de sala
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estadisticas.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#64748B] text-sm font-medium">{stat.titulo}</p>
                  <p className="text-3xl font-bold text-[#0F172A] mt-1">{stat.valor}</p>
                </div>
                <div className="p-2 bg-[#EEF2FF] rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#6366F1]" />
                </div>
              </div>
              <p className="text-sm text-[#10B981]">
                {stat.cambio}
              </p>
            </div>
          ))}
        </div>

        {/* Navegación por pestañas */}
        <div className="flex gap-2 mb-6 bg-white border border-[#E2E8F0] rounded-xl p-2 shadow-sm">
          {vistas.map((vista) => {
            const Icono = vista.icono;
            return (
              <button
                key={vista.id}
                onClick={() => setVistaActiva(vista.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                  vistaActiva === vista.id
                    ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                    : 'text-[#64748B] hover:text-[#6366F1] hover:bg-[#EEF2FF]'
                }`}
              >
                <Icono className="w-4 h-4" />
                <span>{vista.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Categorizador (solo en vista lista) */}
        {vistaActiva === 'lista' && (
          <div className="mb-6">
            <CategorizadorProgramas
              categoriaActiva={categoriaActiva}
              onCambiarCategoria={setCategoriaActiva}
            />
          </div>
        )}

        {/* Contenido según vista activa */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          {vistaActiva === 'lista' && (
            <ProgramasList
              onNuevoPrograma={handleNuevoPrograma}
              onEditarPrograma={handleEditarPrograma}
              onDuplicarPrograma={handleDuplicarPrograma}
              onAsignarPrograma={handleAsignarPrograma}
            />
          )}
          {vistaActiva === 'grupales' && <ProgramasGrupo />}
          {vistaActiva === 'sala' && <PlanSala />}
          {vistaActiva === 'seguimiento' && <SeguimientoPrograma />}
        </div>
      </div>

      {/* Modales */}
      {mostrarEditor && (
        <EditorPrograma
          programa={programaSeleccionado || undefined}
          onClose={() => setMostrarEditor(false)}
          onGuardar={handleGuardarPrograma}
        />
      )}

      {mostrarAsignacion && programaSeleccionado && (
        <AsignacionCliente
          programa={{
            id: programaSeleccionado.id,
            nombre: programaSeleccionado.nombre
          }}
          onClose={() => setMostrarAsignacion(false)}
          onAsignar={handleAsignar}
        />
      )}

      {mostrarDuplicador && programaSeleccionado && (
        <DuplicadorPrograma
          programa={{
            id: programaSeleccionado.id,
            nombre: programaSeleccionado.nombre,
            descripcion: programaSeleccionado.descripcion
          }}
          onClose={() => setMostrarDuplicador(false)}
          onDuplicar={handleDuplicar}
        />
      )}
    </div>
  );
}

