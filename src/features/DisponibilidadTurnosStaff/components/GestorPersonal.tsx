import { useState } from 'react';
import { User, Mail, Phone, Briefcase, Calendar } from 'lucide-react';

interface Personal {
  id: string;
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  especialidad: string;
  fechaIngreso: string;
  estado: 'activo' | 'vacaciones' | 'baja';
}

export default function GestorPersonal() {
  const [personal] = useState<Personal[]>([
    {
      id: '1',
      nombre: 'Ana García',
      cargo: 'Entrenadora Personal',
      email: 'ana.garcia@fitoffice.com',
      telefono: '+34 600 123 456',
      especialidad: 'Musculación',
      fechaIngreso: '2023-01-15',
      estado: 'activo'
    },
    {
      id: '2',
      nombre: 'Carlos Martínez',
      cargo: 'Fisioterapeuta',
      email: 'carlos.martinez@fitoffice.com',
      telefono: '+34 600 123 457',
      especialidad: 'Rehabilitación',
      fechaIngreso: '2022-06-20',
      estado: 'activo'
    },
    {
      id: '3',
      nombre: 'Laura Rodríguez',
      cargo: 'Instructora Yoga',
      email: 'laura.rodriguez@fitoffice.com',
      telefono: '+34 600 123 458',
      especialidad: 'Yoga',
      fechaIngreso: '2023-09-10',
      estado: 'vacaciones'
    }
  ]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'vacaciones':
        return 'bg-[#DBEAFE] text-[#3B82F6]';
      case 'baja':
        return 'bg-[#FEE2E2] text-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Gestión de Personal</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Añadir Personal
        </button>
      </div>

      <div className="grid gap-4">
        {personal.map((persona) => (
          <div
            key={persona.id}
            className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F1F5F9]">{persona.nombre}</h3>
                    <p className="text-[#94A3B8] text-sm">{persona.cargo}</p>
                  </div>
                  <span className={`px-3 py-1 ${getEstadoColor(persona.estado)} text-xs font-medium rounded-full ml-2`}>
                    {persona.estado}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 ml-15">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{persona.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{persona.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{persona.especialidad}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">Ingreso: {persona.fechaIngreso}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg font-medium border border-[#475569] transition-all duration-200">
                  Editar
                </button>
                <button className="px-3 py-1 text-sm bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg font-medium border border-[#475569] transition-all duration-200">
                  Ver Turnos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

