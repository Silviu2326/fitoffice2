import { useState } from 'react';
import { GitBranch, Clock, User, CheckCircle, Eye } from 'lucide-react';

interface Version {
  id: string;
  version: string;
  plantilla: string;
  fecha: string;
  autor: string;
  cambios: string;
  activa: boolean;
}

export default function GestorVersiones() {
  const [versiones] = useState<Version[]>([
    {
      id: '1',
      version: '3.0',
      plantilla: 'Full Body 3 Días',
      fecha: '2025-10-20',
      autor: 'Carlos Trainer',
      cambios: 'Optimización de volumen y frecuencia. Añadidos ejercicios de movilidad.',
      activa: true
    },
    {
      id: '2',
      version: '2.1',
      plantilla: 'Hipertrofia 12 Semanas',
      fecha: '2025-10-15',
      autor: 'María Coach',
      cambios: 'Actualización de rangos de repeticiones y ajuste de progresión.',
      activa: true
    },
    {
      id: '3',
      version: '2.0',
      plantilla: 'Hipertrofia 12 Semanas',
      fecha: '2025-09-28',
      autor: 'Carlos Trainer',
      cambios: 'Rediseño completo de la fase de intensificación.',
      activa: false
    },
    {
      id: '4',
      version: '1.5',
      plantilla: 'Pierna 2x/Semana',
      fecha: '2025-10-10',
      autor: 'Ana Fitness',
      cambios: 'Incorporación de ejercicios unilaterales para balance muscular.',
      activa: true
    },
    {
      id: '5',
      version: '1.2',
      plantilla: 'Movilidad y Flexibilidad',
      fecha: '2025-10-05',
      autor: 'Pedro Wellness',
      cambios: 'Adición de secuencias de yoga y estiramientos dinámicos.',
      activa: true
    }
  ]);

  const [filtroActivo, setFiltroActivo] = useState<'todas' | 'activas' | 'archivadas'>('todas');

  const versionesFiltradas = versiones.filter(v => {
    if (filtroActivo === 'activas') return v.activa;
    if (filtroActivo === 'archivadas') return !v.activa;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Gestión de Versiones</h2>
          <p className="text-[#94A3B8] text-sm mt-1">
            Control de versiones y actualizaciones de plantillas
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFiltroActivo('todas')}
          className={`px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
            filtroActivo === 'todas'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9] border border-[#334155]'
          }`}
        >
          Todas ({versiones.length})
        </button>
        <button
          onClick={() => setFiltroActivo('activas')}
          className={`px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
            filtroActivo === 'activas'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9] border border-[#334155]'
          }`}
        >
          Activas ({versiones.filter(v => v.activa).length})
        </button>
        <button
          onClick={() => setFiltroActivo('archivadas')}
          className={`px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
            filtroActivo === 'archivadas'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9] border border-[#334155]'
          }`}
        >
          Archivadas ({versiones.filter(v => !v.activa).length})
        </button>
      </div>

      {/* Lista de versiones */}
      <div className="space-y-4">
        {versionesFiltradas.map((version) => (
          <div
            key={version.id}
            className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 hover:border-[#6366F1]/50 transition-all duration-200 shadow-md hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl ${version.activa ? 'bg-[#10B981]/20' : 'bg-[#2A2A3A]'}`}>
                    <GitBranch className={`w-5 h-5 ${version.activa ? 'text-[#10B981]' : 'text-[#94A3B8]'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-[#F1F5F9]">{version.plantilla}</h3>
                      <span className="text-xs px-3 py-1 bg-[#2A2A3A] text-[#94A3B8] rounded-lg font-medium">
                        v{version.version}
                      </span>
                      {version.activa && (
                        <span className="flex items-center gap-1 text-xs px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-lg font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          Activa
                        </span>
                      )}
                    </div>
                    <p className="text-[#94A3B8] text-sm mt-1">{version.cambios}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#94A3B8] mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{version.autor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(version.fecha).toLocaleDateString('es-ES')}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-all duration-200 text-sm font-semibold shadow-sm">
                <Eye className="w-4 h-4" />
                Ver Detalles
              </button>
              {!version.activa && (
                <button className="px-5 py-2.5 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 text-sm font-semibold shadow-sm">
                  Restaurar Versión
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

