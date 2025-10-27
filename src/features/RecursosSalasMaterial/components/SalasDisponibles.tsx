import { useState } from 'react';
import { Building2, Users, MapPin, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { type Sala } from '../api/recursos';

export default function SalasDisponibles() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [horaSeleccionada, setHoraSeleccionada] = useState('');

  // Datos de ejemplo
  const salasMock: Sala[] = [
    {
      id: '1',
      nombre: 'Sala de Musculación Principal',
      tipo: 'sala',
      estado: 'disponible',
      tipoSala: 'musculacion',
      aforo: 50,
      ubicacion: 'Planta 1',
      superficie: 200,
      horarioDisponibilidad: { desde: '06:00', hasta: '23:00' },
      equipamiento: ['Mancuernas', 'Barras', 'Máquinas guiadas', 'Banco press'],
      fechaCreacion: new Date()
    },
    {
      id: '2',
      nombre: 'Sala de Spinning',
      tipo: 'sala',
      estado: 'en_uso',
      tipoSala: 'spinning',
      aforo: 20,
      ubicacion: 'Planta 2',
      superficie: 80,
      horarioDisponibilidad: { desde: '07:00', hasta: '22:00' },
      equipamiento: ['20 Bicicletas estáticas', 'Sistema de audio', 'Pantalla'],
      fechaCreacion: new Date()
    },
    {
      id: '3',
      nombre: 'Sala de Yoga',
      tipo: 'sala',
      estado: 'disponible',
      tipoSala: 'yoga',
      aforo: 25,
      ubicacion: 'Planta 2',
      superficie: 100,
      horarioDisponibilidad: { desde: '08:00', hasta: '21:00' },
      equipamiento: ['Esterillas', 'Bloques', 'Correas', 'Bolsters'],
      fechaCreacion: new Date()
    },
    {
      id: '4',
      nombre: 'Sala de Boxeo',
      tipo: 'sala',
      estado: 'mantenimiento',
      tipoSala: 'boxeo',
      aforo: 15,
      ubicacion: 'Planta 3',
      superficie: 120,
      horarioDisponibilidad: { desde: '10:00', hasta: '22:00' },
      equipamiento: ['Ring', 'Sacos', 'Guantes', 'Protecciones'],
      fechaCreacion: new Date()
    }
  ];

  const getTipoSalaIcon = (tipo: string) => {
    return <Building2 className="w-5 h-5" />;
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Disponible
          </div>
        );
      case 'en_uso':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            En Uso
          </div>
        );
      case 'mantenimiento':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Mantenimiento
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Salas Disponibles</h2>
        <p className="text-[#64748B] text-[14px] leading-5 mt-1">Consulta la disponibilidad de salas en tiempo real</p>
      </div>

      {/* Filtros de fecha y hora */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] leading-5 font-medium text-[#0F172A] mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="w-full h-12 px-4 py-2 border border-[#E2E8F0] rounded-xl text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-[14px] leading-5 font-medium text-[#0F172A] mb-2">
              Hora (opcional)
            </label>
            <input
              type="time"
              value={horaSeleccionada}
              onChange={(e) => setHoraSeleccionada(e.target.value)}
              className="w-full h-12 px-4 py-2 border border-[#E2E8F0] rounded-xl text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Lista de salas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {salasMock.map(sala => (
          <div
            key={sala.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            {/* Header de la sala */}
            <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getTipoSalaIcon(sala.tipoSala)}
                  <h3 className="font-bold text-[18px] leading-7">{sala.nombre}</h3>
                </div>
                {getEstadoBadge(sala.estado)}
              </div>
              <div className="flex items-center gap-4 text-[14px] leading-5">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {sala.ubicacion}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Aforo: {sala.aforo}
                </div>
              </div>
            </div>

            {/* Detalles de la sala */}
            <div className="p-6 space-y-4">
              {/* Horario */}
              <div>
                <h4 className="font-semibold text-[16px] leading-6 text-[#0F172A] mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horario de Disponibilidad
                </h4>
                <p className="text-[14px] leading-5 text-[#64748B]">
                  {sala.horarioDisponibilidad.desde} - {sala.horarioDisponibilidad.hasta}
                </p>
              </div>

              {/* Equipamiento */}
              <div>
                <h4 className="font-semibold text-[16px] leading-6 text-[#0F172A] mb-2">Equipamiento</h4>
                <div className="flex flex-wrap gap-2">
                  {sala.equipamiento.map((equipo, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] rounded-full text-[12px] leading-4 font-medium"
                    >
                      {equipo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Superficie */}
              <div className="flex justify-between items-center pt-3 border-t border-[#E2E8F0]">
                <span className="text-[#64748B] text-[14px] leading-5">Superficie</span>
                <span className="font-medium text-[16px] leading-6 text-[#0F172A]">{sala.superficie} m²</span>
              </div>

              {/* Botón de acción */}
              {sala.estado === 'disponible' && (
                <button className="w-full px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold"
                  style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                  Reservar Sala
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

