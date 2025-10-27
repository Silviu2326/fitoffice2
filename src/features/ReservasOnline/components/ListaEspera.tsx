import { Users, Clock, Calendar, Bell, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface PersonaEspera {
  id: string;
  cliente: string;
  servicio: string;
  tipoServicio: 'clase-grupal' | 'sesion-individual';
  fechaDeseada: string;
  horaDeseada: string;
  fechaRegistro: string;
  prioridad: 'alta' | 'media' | 'baja';
  notificado: boolean;
  email: string;
  telefono: string;
}

export default function ListaEspera() {
  const [filtroServicio, setFiltroServicio] = useState<string>('todos');

  // Datos de ejemplo
  const listaEspera: PersonaEspera[] = [
    {
      id: '1',
      cliente: 'Sofía Ramírez',
      servicio: 'Spinning',
      tipoServicio: 'clase-grupal',
      fechaDeseada: '2025-10-27',
      horaDeseada: '18:00',
      fechaRegistro: '2025-10-25',
      prioridad: 'alta',
      notificado: false,
      email: 'sofia@email.com',
      telefono: '+34 600 123 456',
    },
    {
      id: '2',
      cliente: 'Miguel Ángel Torres',
      servicio: 'HIIT',
      tipoServicio: 'clase-grupal',
      fechaDeseada: '2025-10-28',
      horaDeseada: '07:00',
      fechaRegistro: '2025-10-26',
      prioridad: 'media',
      notificado: false,
      email: 'miguel@email.com',
      telefono: '+34 600 234 567',
    },
    {
      id: '3',
      cliente: 'Carmen Jiménez',
      servicio: 'Fisioterapia',
      tipoServicio: 'sesion-individual',
      fechaDeseada: '2025-10-29',
      horaDeseada: '10:00',
      fechaRegistro: '2025-10-24',
      prioridad: 'alta',
      notificado: true,
      email: 'carmen@email.com',
      telefono: '+34 600 345 678',
    },
    {
      id: '4',
      cliente: 'Roberto Sánchez',
      servicio: 'Boxeo',
      tipoServicio: 'clase-grupal',
      fechaDeseada: '2025-10-27',
      horaDeseada: '19:00',
      fechaRegistro: '2025-10-26',
      prioridad: 'baja',
      notificado: false,
      email: 'roberto@email.com',
      telefono: '+34 600 456 789',
    },
  ];

  const listaFiltrada = listaEspera.filter((persona) => {
    if (filtroServicio === 'todos') return true;
    return persona.tipoServicio === filtroServicio;
  });

  const totalEspera = listaFiltrada.length;
  const altaPrioridad = listaFiltrada.filter(p => p.prioridad === 'alta').length;
  const noNotificados = listaFiltrada.filter(p => !p.notificado).length;

  const getColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]';
      case 'media':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'baja':
        return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const handleNotificar = (id: string) => {
    console.log('Notificar a persona con ID:', id);
    // Aquí se implementaría la lógica de notificación
  };

  const handleAsignarPlaza = (id: string) => {
    console.log('Asignar plaza a persona con ID:', id);
    // Aquí se implementaría la lógica de asignación
  };

  const handleEliminar = (id: string) => {
    console.log('Eliminar de lista de espera:', id);
    // Aquí se implementaría la lógica de eliminación
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">En Lista de Espera</p>
              <p className="text-3xl font-bold text-[#0F172A] mt-2">{totalEspera}</p>
            </div>
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <Users className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Alta Prioridad</p>
              <p className="text-3xl font-bold text-[#EF4444] mt-2">{altaPrioridad}</p>
            </div>
            <div className="bg-[#FEE2E2] p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-[#EF4444]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Pendientes de Notificar</p>
              <p className="text-3xl font-bold text-[#F59E0B] mt-2">{noNotificados}</p>
            </div>
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <Bell className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-[#0F172A]">Filtrar por tipo:</label>
          <select
            value={filtroServicio}
            onChange={(e) => setFiltroServicio(e.target.value)}
            className="border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
          >
            <option value="todos">Todos los servicios</option>
            <option value="clase-grupal">Clases Grupales</option>
            <option value="sesion-individual">Sesiones Individuales</option>
          </select>
        </div>
      </div>

      {/* Información */}
      <div className="bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] rounded-2xl p-6 border border-[#6366F1]/20">
        <div className="flex items-start gap-4">
          <div className="bg-[#6366F1] p-3 rounded-xl shadow-md">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#4338CA] mb-2">Sistema de Lista de Espera</h3>
            <p className="text-sm text-[#4F46E5]">
              Cuando se libera una plaza, el sistema notifica automáticamente a las personas en lista de espera 
              siguiendo el orden de prioridad. Los clientes tienen 2 horas para confirmar su reserva antes de 
              pasar al siguiente en la lista.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Personas en Espera */}
      <div className="space-y-4">
        {listaFiltrada.map((persona) => (
          <div
            key={persona.id}
            className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#DBEAFE] p-3 rounded-xl">
                    <Users className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] text-lg">{persona.cliente}</h3>
                    <p className="text-sm text-[#64748B]">{persona.servicio}</p>
                  </div>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${getColorPrioridad(persona.prioridad)}`}>
                    Prioridad {persona.prioridad}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha: {new Date(persona.fechaDeseada).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <Clock className="w-4 h-4" />
                    <span>Hora: {persona.horaDeseada}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <AlertCircle className="w-4 h-4" />
                    <span>Registrado: {new Date(persona.fechaRegistro).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#64748B]">
                  <div>📧 {persona.email}</div>
                  <div>📱 {persona.telefono}</div>
                </div>

                {persona.notificado && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#10B981]">
                    <CheckCircle className="w-4 h-4" />
                    <span>Cliente notificado - Esperando confirmación</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex gap-2">
              {!persona.notificado && (
                <button
                  onClick={() => handleNotificar(persona.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 text-sm font-semibold shadow-md"
                >
                  <Bell className="w-4 h-4" />
                  Notificar
                </button>
              )}
              <button
                onClick={() => handleAsignarPlaza(persona.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-sm font-semibold shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                Asignar Plaza
              </button>
              <button
                onClick={() => handleEliminar(persona.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 text-sm font-semibold ml-auto border border-[#E2E8F0]"
              >
                <XCircle className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {listaFiltrada.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-md border border-[#E2E8F0] text-center">
          <CheckCircle className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Lista de espera vacía</h3>
          <p className="text-[#64748B]">No hay personas esperando en este momento</p>
        </div>
      )}
    </div>
  );
}

