import { AlertTriangle, Plus, X } from 'lucide-react';

interface Restriccion {
  id: string;
  clienteNombre: string;
  tipo: 'alergia' | 'intolerancia' | 'preferencia';
  alimento: string;
  severidad: 'alta' | 'media' | 'baja';
  notas?: string;
}

export default function GestorRestricciones() {
  const restricciones: Restriccion[] = [
    {
      id: '1',
      clienteNombre: 'Ana García',
      tipo: 'alergia',
      alimento: 'Frutos secos',
      severidad: 'alta',
      notas: 'Anafilaxia - evitar completamente'
    },
    {
      id: '2',
      clienteNombre: 'Ana García',
      tipo: 'intolerancia',
      alimento: 'Lactosa',
      severidad: 'media',
      notas: 'Puede consumir productos sin lactosa'
    },
    {
      id: '3',
      clienteNombre: 'Carlos Ruiz',
      tipo: 'preferencia',
      alimento: 'Pescado',
      severidad: 'baja',
      notas: 'Prefiere no consumirlo'
    }
  ];

  const getTipoBadge = (tipo: string) => {
    const styles = {
      alergia: 'bg-[#FEE2E2] text-[#EF4444]',
      intolerancia: 'bg-[#FEF3C7] text-[#F59E0B]',
      preferencia: 'bg-[#DBEAFE] text-[#3B82F6]'
    };
    return styles[tipo as keyof typeof styles] || styles.preferencia;
  };

  const getSeveridadBadge = (severidad: string) => {
    const styles = {
      alta: 'bg-[#FEE2E2] text-[#EF4444]',
      media: 'bg-[#FEF3C7] text-[#F59E0B]',
      baja: 'bg-[#D1FAE5] text-[#10B981]'
    };
    return styles[severidad as keyof typeof styles] || styles.baja;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#FEF3C7] p-3 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F1F5F9]">Restricciones Alimentarias</h2>
            <p className="text-sm text-[#94A3B8]">Alergias, intolerancias y preferencias</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus className="w-5 h-5" />
          Nueva Restricción
        </button>
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
            <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Tipo</label>
            <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
              <option value="">Todos</option>
              <option>Alergias</option>
              <option>Intolerancias</option>
              <option>Preferencias</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Severidad</label>
            <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
              <option value="">Todas</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de restricciones */}
      <div className="space-y-3">
        {restricciones.map((restriccion) => (
          <div
            key={restriccion.id}
            className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] hover:border-[#F59E0B] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-[#F1F5F9]">{restriccion.clienteNombre}</h3>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTipoBadge(restriccion.tipo)}`}>
                    {restriccion.tipo.charAt(0).toUpperCase() + restriccion.tipo.slice(1)}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getSeveridadBadge(restriccion.severidad)}`}>
                    Severidad {restriccion.severidad}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="text-[#94A3B8] text-sm">Alimento: </span>
                  <span className="text-[#F1F5F9] font-medium">{restriccion.alimento}</span>
                </div>

                {restriccion.notas && (
                  <div className="bg-[#0F0F23] rounded-xl p-3 mt-3">
                    <p className="text-sm text-[#F1F5F9]">{restriccion.notas}</p>
                  </div>
                )}
              </div>

              <button className="ml-4 p-2.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen por tipo */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Resumen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0F0F23] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94A3B8]">Alergias</span>
              <span className="text-3xl font-bold text-[#EF4444]">
                {restricciones.filter(r => r.tipo === 'alergia').length}
              </span>
            </div>
            <div className="h-2.5 bg-[#1E1E2E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#EF4444]"
                style={{ width: `${(restricciones.filter(r => r.tipo === 'alergia').length / restricciones.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#0F0F23] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94A3B8]">Intolerancias</span>
              <span className="text-3xl font-bold text-[#F59E0B]">
                {restricciones.filter(r => r.tipo === 'intolerancia').length}
              </span>
            </div>
            <div className="h-2.5 bg-[#1E1E2E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F59E0B]"
                style={{ width: `${(restricciones.filter(r => r.tipo === 'intolerancia').length / restricciones.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#0F0F23] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#94A3B8]">Preferencias</span>
              <span className="text-3xl font-bold text-[#3B82F6]">
                {restricciones.filter(r => r.tipo === 'preferencia').length}
              </span>
            </div>
            <div className="h-2.5 bg-[#1E1E2E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#3B82F6]"
                style={{ width: `${(restricciones.filter(r => r.tipo === 'preferencia').length / restricciones.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

