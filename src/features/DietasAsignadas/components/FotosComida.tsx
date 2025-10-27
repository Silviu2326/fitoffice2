import { Camera, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';

interface FotoComida {
  id: string;
  clienteNombre: string;
  fecha: string;
  hora: string;
  comida: string;
  aprobada: boolean | null;
  nota?: string;
}

export default function FotosComida() {
  const fotosEjemplo: FotoComida[] = [
    {
      id: '1',
      clienteNombre: 'Ana García',
      fecha: '2025-10-26',
      hora: '13:45',
      comida: 'Almuerzo',
      aprobada: true,
      nota: 'Excelente porción de proteína'
    },
    {
      id: '2',
      clienteNombre: 'Carlos Ruiz',
      fecha: '2025-10-26',
      hora: '09:30',
      comida: 'Desayuno',
      aprobada: null
    },
    {
      id: '3',
      clienteNombre: 'Ana García',
      fecha: '2025-10-25',
      hora: '20:15',
      comida: 'Cena',
      aprobada: false,
      nota: 'Demasiados carbohidratos para la cena'
    }
  ];

  const getAprobacionBadge = (aprobada: boolean | null) => {
    if (aprobada === null) {
      return { icon: Camera, style: 'bg-[#FEF3C7] text-[#F59E0B]', texto: 'Pendiente' };
    }
    if (aprobada) {
      return { icon: CheckCircle, style: 'bg-[#D1FAE5] text-[#10B981]', texto: 'Aprobada' };
    }
    return { icon: XCircle, style: 'bg-[#FEE2E2] text-[#EF4444]', texto: 'Rechazada' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#EEF2FF] p-3 rounded-xl">
          <Camera className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Fotos de Comida</h2>
          <p className="text-sm text-[#94A3B8]">Control visual de adherencia nutricional</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Cliente</label>
            <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
              <option value="">Todos los clientes</option>
              <option>Ana García</option>
              <option>Carlos Ruiz</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Estado</label>
            <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
              <option value="">Todos</option>
              <option>Pendientes</option>
              <option>Aprobadas</option>
              <option>Rechazadas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Fecha</label>
            <input
              type="date"
              className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fotosEjemplo.map((foto) => {
          const badge = getAprobacionBadge(foto.aprobada);
          const IconComponent = badge.icon;
          
          return (
            <div
              key={foto.id}
              className="bg-[#1E1E2E] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              {/* Imagen placeholder */}
              <div className="aspect-video bg-[#0F0F23] flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-[#475569]" />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#F1F5F9]">{foto.clienteNombre}</h3>
                    <p className="text-sm text-[#94A3B8]">{foto.comida}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${badge.style}`}>
                    <IconComponent className="w-3 h-3" />
                    {badge.texto}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-3">
                  <span>{foto.fecha}</span>
                  <span>{foto.hora}</span>
                </div>

                {foto.nota && (
                  <div className="bg-[#0F0F23] rounded-xl p-3 mb-3">
                    <p className="text-sm text-[#F1F5F9]">{foto.nota}</p>
                  </div>
                )}

                {foto.aprobada === null && (
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md">
                      Aprobar
                    </button>
                    <button className="flex-1 px-3 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md">
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Estadísticas */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Estadísticas de Fotos</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0F0F23] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#6366F1]">{fotosEjemplo.length}</p>
            <p className="text-xs text-[#94A3B8] mt-1">Total de fotos</p>
          </div>
          <div className="bg-[#0F0F23] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#F59E0B]">
              {fotosEjemplo.filter(f => f.aprobada === null).length}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">Pendientes</p>
          </div>
          <div className="bg-[#0F0F23] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#10B981]">
              {fotosEjemplo.filter(f => f.aprobada === true).length}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">Aprobadas</p>
          </div>
          <div className="bg-[#0F0F23] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#EF4444]">
              {fotosEjemplo.filter(f => f.aprobada === false).length}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">Rechazadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

