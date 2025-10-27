import { useState } from 'react';
import { Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface PersonaEspera {
  id: string;
  nombre: string;
  posicion: number;
  estado: 'en_espera' | 'notificado' | 'confirmado' | 'expirado';
  tiempoEspera: string;
  clase: string;
  fecha: string;
  hora: string;
  telefono: string;
}

export default function ListaEspera() {
  const [listaEspera] = useState<PersonaEspera[]>([
    {
      id: '1',
      nombre: 'María López',
      posicion: 1,
      estado: 'notificado',
      tiempoEspera: '15 min',
      clase: 'Yoga Avanzado',
      fecha: '2025-10-27',
      hora: '18:00',
      telefono: '+34 612 345 678'
    },
    {
      id: '2',
      nombre: 'Juan Martínez',
      posicion: 2,
      estado: 'en_espera',
      tiempoEspera: '25 min',
      clase: 'Yoga Avanzado',
      fecha: '2025-10-27',
      hora: '18:00',
      telefono: '+34 623 456 789'
    },
    {
      id: '3',
      nombre: 'Ana García',
      posicion: 3,
      estado: 'en_espera',
      tiempoEspera: '30 min',
      clase: 'Yoga Avanzado',
      fecha: '2025-10-27',
      hora: '18:00',
      telefono: '+34 634 567 890'
    },
    {
      id: '4',
      nombre: 'Carlos Ruiz',
      posicion: 1,
      estado: 'expirado',
      tiempoEspera: '2 horas',
      clase: 'CrossFit',
      fecha: '2025-10-27',
      hora: '19:00',
      telefono: '+34 645 678 901'
    }
  ]);

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'en_espera':
        return (
          <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            En Espera
          </span>
        );
      case 'notificado':
        return (
          <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Notificado
          </span>
        );
      case 'confirmado':
        return (
          <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-medium rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Confirmado
          </span>
        );
      case 'expirado':
        return (
          <span className="px-3 py-1 bg-[#FEE2E2] text-[#EF4444] text-xs font-medium rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Expirado
          </span>
        );
      default:
        return null;
    }
  };

  const enEspera = listaEspera.filter(p => p.estado === 'en_espera').length;
  const notificados = listaEspera.filter(p => p.estado === 'notificado').length;
  const confirmados = listaEspera.filter(p => p.estado === 'confirmado').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Lista de Espera Activa</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Limpiar Expiradas
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#0F172A] font-semibold">En Espera</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{enEspera}</p>
          <p className="text-sm text-[#64748B] mt-1">Esperando plaza</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[#0F172A] font-semibold">Notificados</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{notificados}</p>
          <p className="text-sm text-[#64748B] mt-1">Pendientes de confirmar</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#0F172A] font-semibold">Confirmados</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{confirmados}</p>
          <p className="text-sm text-[#64748B] mt-1">Hoy</p>
        </div>
      </div>

      {/* Lista de personas en espera */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[#0F172A]">Personas en Lista</h3>
        {listaEspera.map((persona) => (
          <div
            key={persona.id}
            className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">{persona.posicion}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-[#0F172A]">{persona.nombre}</h4>
                    {getEstadoBadge(persona.estado)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#64748B]">Clase:</span>
                      <span className="text-[#0F172A] font-medium">{persona.clase}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#64748B]">Fecha:</span>
                      <span className="text-[#0F172A] font-medium">{persona.fecha}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#64748B]">Hora:</span>
                      <span className="text-[#0F172A] font-medium">{persona.hora}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#64748B]" />
                      <span className="text-[#0F172A] font-medium">{persona.tiempoEspera}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {persona.estado === 'en_espera' && (
                  <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2">
                    Notificar
                  </button>
                )}
                {persona.estado === 'notificado' && (
                  <>
                    <button className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2">
                      Confirmar
                    </button>
                    <button className="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-2">
                      Pasar al Siguiente
                    </button>
                  </>
                )}
                <button className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-semibold rounded-lg border border-[#E2E8F0] transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

