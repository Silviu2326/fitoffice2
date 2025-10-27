import { useState } from 'react';
import { AlertTriangle, Shield, TrendingUp, FileCheck } from 'lucide-react';
import RestriccionesList from '../components/RestriccionesList';
import AlertasAlergias from '../components/AlertasAlergias';
import ConfiguradorRestricciones from '../components/ConfiguradorRestricciones';
import ValidacionIngredientes from '../components/ValidacionIngredientes';
import HistorialAlertas from '../components/HistorialAlertas';
import SustitucionesSeguras from '../components/SustitucionesSeguras';
import ReportesCompliance from '../components/ReportesCompliance';
import NotificacionesSeguridad from '../components/NotificacionesSeguridad';

type Vista = 'restricciones' | 'validacion' | 'historial' | 'compliance';

interface Restriccion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: 'alergia' | 'intolerancia' | 'religiosa' | 'cultural';
  descripcion: string;
  severidad: 'leve' | 'moderada' | 'severa';
  ingredientes: string[];
  fechaRegistro: string;
  activa: boolean;
}

export default function AlertasRestriccionesAlimentariasPage() {
  const [vistaActiva, setVistaActiva] = useState<Vista>('restricciones');
  const [mostrarConfigurador, setMostrarConfigurador] = useState(false);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [mostrarSustituciones, setMostrarSustituciones] = useState(false);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [restriccionSeleccionada, setRestriccionSeleccionada] = useState<Restriccion | null>(null);

  const handleNuevaRestriccion = () => {
    setRestriccionSeleccionada(null);
    setMostrarConfigurador(true);
  };

  const handleEditarRestriccion = (restriccion: Restriccion) => {
    setRestriccionSeleccionada(restriccion);
    setMostrarConfigurador(true);
  };

  const handleVerAlertas = (restriccion: Restriccion) => {
    setRestriccionSeleccionada(restriccion);
    setMostrarAlertas(true);
  };

  const handleVerSustituciones = (restriccion: Restriccion) => {
    setRestriccionSeleccionada(restriccion);
    setMostrarSustituciones(true);
  };

  const handleGuardarRestriccion = (data: any) => {
    console.log('Guardar restricción:', data);
    // Aquí iría la lógica para guardar la restricción
    setMostrarConfigurador(false);
  };

  const estadisticas = [
    {
      titulo: 'Restricciones Activas',
      valor: '47',
      cambio: '+8 este mes',
      tendencia: 'up',
      color: 'red',
      icono: AlertTriangle
    },
    {
      titulo: 'Alertas Generadas',
      valor: '156',
      cambio: '12 hoy',
      tendencia: 'neutral',
      color: 'orange',
      icono: Shield
    },
    {
      titulo: 'Ingredientes Bloqueados',
      valor: '234',
      cambio: '98% efectividad',
      tendencia: 'up',
      color: 'blue',
      icono: TrendingUp
    },
    {
      titulo: 'Compliance Score',
      valor: '100%',
      cambio: 'Sin violaciones',
      tendencia: 'up',
      color: 'emerald',
      icono: FileCheck
    }
  ];

  const vistas = [
    { id: 'restricciones' as Vista, nombre: 'Restricciones Alimentarias', icono: AlertTriangle },
    { id: 'validacion' as Vista, nombre: 'Validación de Ingredientes', icono: Shield },
    { id: 'historial' as Vista, nombre: 'Historial de Alertas', icono: TrendingUp },
    { id: 'compliance' as Vista, nombre: 'Reportes Compliance', icono: FileCheck }
  ];

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-md">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">Alertas & Restricciones Alimentarias</h1>
                <p className="text-[#64748B] mt-1">
                  Sistema de gestión de restricciones alimentarias y alertas de seguridad sanitaria
                </p>
              </div>
            </div>
            <button
              onClick={() => setMostrarNotificaciones(true)}
              className="px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Shield className="w-5 h-5" />
              Ver Notificaciones
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estadisticas.map((stat, index) => {
            const Icono = stat.icono;
            return (
              <div
                key={index}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[#64748B] text-sm font-medium">{stat.titulo}</p>
                    <p className="text-3xl font-bold text-[#0F172A] mt-1">{stat.valor}</p>
                  </div>
                  <div className={`p-2 bg-${stat.color}-500/20 rounded-lg`}>
                    <Icono className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                </div>
                <p className="text-sm text-[#64748B]">
                  {stat.cambio}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navegación por pestañas */}
        <div className="flex gap-2 mb-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2">
          {vistas.map((vista) => {
            const Icono = vista.icono;
            return (
              <button
                key={vista.id}
                onClick={() => setVistaActiva(vista.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                  vistaActiva === vista.id
                    ? 'bg-[#6366F1] text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
                }`}
              >
                <Icono className="w-4 h-4" />
                <span>{vista.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido según vista activa */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-md">
          {vistaActiva === 'restricciones' && (
            <RestriccionesList
              onNuevaRestriccion={handleNuevaRestriccion}
              onEditarRestriccion={handleEditarRestriccion}
              onVerAlertas={handleVerAlertas}
              onVerSustituciones={handleVerSustituciones}
            />
          )}
          {vistaActiva === 'validacion' && <ValidacionIngredientes />}
          {vistaActiva === 'historial' && <HistorialAlertas />}
          {vistaActiva === 'compliance' && <ReportesCompliance />}
        </div>
      </div>

      {/* Modales */}
      {mostrarConfigurador && (
        <ConfiguradorRestricciones
          restriccion={restriccionSeleccionada || undefined}
          onClose={() => setMostrarConfigurador(false)}
          onGuardar={handleGuardarRestriccion}
        />
      )}

      {mostrarAlertas && restriccionSeleccionada && (
        <AlertasAlergias
          restriccion={restriccionSeleccionada}
          onClose={() => setMostrarAlertas(false)}
        />
      )}

      {mostrarSustituciones && restriccionSeleccionada && (
        <SustitucionesSeguras
          restriccion={restriccionSeleccionada}
          onClose={() => setMostrarSustituciones(false)}
        />
      )}

      {mostrarNotificaciones && (
        <NotificacionesSeguridad
          onClose={() => setMostrarNotificaciones(false)}
        />
      )}
    </div>
  );
}

