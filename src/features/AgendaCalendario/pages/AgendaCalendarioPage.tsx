import { Calendar, User, Building2 } from 'lucide-react';
import { useState } from 'react';
import AgendaCalendar from '../components/AgendaCalendar';
import VistaPersonal from '../components/VistaPersonal';
import VistaCentro from '../components/VistaCentro';
import GestorHorarios from '../components/GestorHorarios';
import BloqueosAgenda from '../components/BloqueosAgenda';
import ReservasCitas from '../components/ReservasCitas';
import RecordatoriosAutomaticos from '../components/RecordatoriosAutomaticos';
import AnalyticsOcupacion from '../components/AnalyticsOcupacion';

type VistaActiva = 'personal' | 'centro' | 'horarios' | 'bloqueos' | 'reservas' | 'recordatorios' | 'analytics';
type TipoUsuario = 'entrenador' | 'gimnasio';

export default function AgendaCalendarioPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [vistaActiva, setVistaActiva] = useState<VistaActiva>('personal');
  // En producción, esto vendría del contexto de autenticación
  const [tipoUsuario] = useState<TipoUsuario>('entrenador');

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-2xl shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-[30px] leading-[38px] font-bold text-[#0F172A]">Agenda & Calendario</h1>
                <p className="text-[16px] leading-[24px] text-[#64748B]">
                  {tipoUsuario === 'entrenador'
                    ? 'Gestiona tus sesiones personales y citas'
                    : 'Gestión completa del calendario del centro'}
                </p>
              </div>
            </div>

            {/* Selector de tipo de usuario (solo para demo) */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-[#E2E8F0] shadow-sm">
              <button
                onClick={() => setVistaActiva('personal')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  vistaActiva === 'personal'
                    ? 'bg-[#6366F1] text-white shadow-md'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-semibold text-[14px]">Personal</span>
              </button>
              <button
                onClick={() => setVistaActiva('centro')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  vistaActiva === 'centro'
                    ? 'bg-[#6366F1] text-white shadow-md'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="font-semibold text-[14px]">Centro</span>
              </button>
            </div>
          </div>

          {/* Navegación de pestañas */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setVistaActiva('personal')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'personal'
                  ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Vista Personal
            </button>
            <button
              onClick={() => setVistaActiva('centro')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'centro'
                  ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Vista Centro
            </button>
            <button
              onClick={() => setVistaActiva('horarios')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'horarios'
                  ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Horarios
            </button>
            <button
              onClick={() => setVistaActiva('bloqueos')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'bloqueos'
                  ? 'bg-[#EF4444] text-white shadow-md hover:bg-[#DC2626]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Bloqueos
            </button>
            <button
              onClick={() => setVistaActiva('reservas')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'reservas'
                  ? 'bg-[#10B981] text-white shadow-md hover:bg-[#059669]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Reservas
            </button>
            <button
              onClick={() => setVistaActiva('recordatorios')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'recordatorios'
                  ? 'bg-[#F59E0B] text-white shadow-md hover:bg-[#D97706]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Recordatorios
            </button>
            <button
              onClick={() => setVistaActiva('analytics')}
              className={`px-4 py-2 rounded-xl font-semibold text-[14px] whitespace-nowrap transition-all duration-200 ${
                vistaActiva === 'analytics'
                  ? 'bg-[#3B82F6] text-white shadow-md hover:bg-[#2563EB]'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendario (columna izquierda) */}
          <div className="lg:col-span-1">
            <AgendaCalendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
          </div>

          {/* Vista activa (columna derecha) */}
          <div className="lg:col-span-2">
            {vistaActiva === 'personal' && <VistaPersonal />}
            {vistaActiva === 'centro' && <VistaCentro />}
            {vistaActiva === 'horarios' && <GestorHorarios />}
            {vistaActiva === 'bloqueos' && <BloqueosAgenda />}
            {vistaActiva === 'reservas' && <ReservasCitas />}
            {vistaActiva === 'recordatorios' && <RecordatoriosAutomaticos />}
            {vistaActiva === 'analytics' && <AnalyticsOcupacion />}
          </div>
        </div>
      </div>
    </div>
  );
}

