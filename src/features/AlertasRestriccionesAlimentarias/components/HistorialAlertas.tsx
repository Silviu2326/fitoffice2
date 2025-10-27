import { AlertTriangle, Filter, Calendar, Download } from 'lucide-react';
import { useState } from 'react';

interface Alerta {
  id: string;
  fecha: string;
  cliente: string;
  ingrediente: string;
  receta: string;
  tipo: string;
  severidad: 'alta' | 'media' | 'baja';
  estado: 'bloqueada' | 'resuelta' | 'pendiente';
  accion: string;
}

export default function HistorialAlertas() {
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroSeveridad, setFiltroSeveridad] = useState('todos');

  // Datos mock
  const alertas: Alerta[] = [
    {
      id: '1',
      fecha: '2024-10-26 14:30',
      cliente: 'María García',
      ingrediente: 'maní',
      receta: 'Ensalada de pollo',
      tipo: 'alergia',
      severidad: 'alta',
      estado: 'bloqueada',
      accion: 'Ingrediente bloqueado automáticamente'
    },
    {
      id: '2',
      fecha: '2024-10-26 12:15',
      cliente: 'Juan Pérez',
      ingrediente: 'leche',
      receta: 'Batido proteico',
      tipo: 'intolerancia',
      severidad: 'media',
      estado: 'resuelta',
      accion: 'Sustituido por leche de almendras'
    },
    {
      id: '3',
      fecha: '2024-10-26 10:00',
      cliente: 'Ahmed Hassan',
      ingrediente: 'cerdo',
      receta: 'Ensalada César',
      tipo: 'religiosa',
      severidad: 'alta',
      estado: 'bloqueada',
      accion: 'Ingrediente bloqueado (Restricción Halal)'
    },
    {
      id: '4',
      fecha: '2024-10-25 16:45',
      cliente: 'María García',
      ingrediente: 'almendras',
      receta: 'Granola energética',
      tipo: 'alergia',
      severidad: 'alta',
      estado: 'resuelta',
      accion: 'Sustituido por semillas de girasol'
    },
    {
      id: '5',
      fecha: '2024-10-25 14:20',
      cliente: 'Juan Pérez',
      ingrediente: 'queso',
      receta: 'Pizza integral',
      tipo: 'intolerancia',
      severidad: 'baja',
      estado: 'pendiente',
      accion: 'Pendiente de revisión'
    }
  ];

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'alta': return 'red';
      case 'media': return 'orange';
      case 'baja': return 'yellow';
      default: return 'gray';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'bloqueada': return 'red';
      case 'resuelta': return 'emerald';
      case 'pendiente': return 'orange';
      default: return 'gray';
    }
  };

  const alertasFiltradas = alertas.filter(alerta => {
    const cumpleFiltroEstado = filtroEstado === 'todos' || alerta.estado === filtroEstado;
    const cumpleFiltroSeveridad = filtroSeveridad === 'todos' || alerta.severidad === filtroSeveridad;
    return cumpleFiltroEstado && cumpleFiltroSeveridad;
  });

  const estadisticas = {
    total: alertas.length,
    bloqueadas: alertas.filter(a => a.estado === 'bloqueada').length,
    resueltas: alertas.filter(a => a.estado === 'resuelta').length,
    pendientes: alertas.filter(a => a.estado === 'pendiente').length
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Historial de Alertas</h2>
        <p className="text-[#64748B]">
          Registro completo de todas las alertas de seguridad alimentaria
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 text-center shadow-sm">
          <div className="text-3xl font-bold text-[#0F172A] mb-1">{estadisticas.total}</div>
          <div className="text-[#64748B] text-sm font-medium">Total</div>
        </div>
        <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-[#EF4444] mb-1">{estadisticas.bloqueadas}</div>
          <div className="text-[#64748B] text-sm font-medium">Bloqueadas</div>
        </div>
        <div className="bg-[#D1FAE5] border border-[#10B981]/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-[#10B981] mb-1">{estadisticas.resueltas}</div>
          <div className="text-[#64748B] text-sm font-medium">Resueltas</div>
        </div>
        <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-[#F59E0B] mb-1">{estadisticas.pendientes}</div>
          <div className="text-[#64748B] text-sm font-medium">Pendientes</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-6 flex items-center gap-4 shadow-sm">
        <Filter className="w-5 h-5 text-[#64748B]" />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="h-10 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          >
            <option value="todos">Todos los estados</option>
            <option value="bloqueada">Bloqueadas</option>
            <option value="resuelta">Resueltas</option>
            <option value="pendiente">Pendientes</option>
          </select>

          <select
            value={filtroSeveridad}
            onChange={(e) => setFiltroSeveridad(e.target.value)}
            className="h-10 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          >
            <option value="todos">Todas las severidades</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
            <Download className="w-4 h-4" />
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Lista de alertas */}
      <div className="space-y-4">
        {alertasFiltradas.map((alerta) => {
          const severidadColor = getSeveridadColor(alerta.severidad);
          const estadoColor = getEstadoColor(alerta.estado);
          
          return (
            <div
              key={alerta.id}
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-${severidadColor}-500/20 rounded-lg`}>
                    <AlertTriangle className={`w-5 h-5 text-${severidadColor}-400`} />
                  </div>
                  <div>
                    <h3 className="text-[#0F172A] font-bold text-lg mb-1">
                      {alerta.ingrediente} detectado - {alerta.cliente}
                    </h3>
                    <p className="text-[#64748B]">
                      En receta: <span className="text-[#0F172A] font-medium">{alerta.receta}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 bg-${estadoColor}-500/20 text-${estadoColor}-400 rounded-full text-sm font-medium`}>
                    {alerta.estado}
                  </span>
                  <span className={`px-3 py-1 bg-${severidadColor}-500/20 text-${severidadColor}-400 rounded-full text-sm font-medium`}>
                    {alerta.severidad}
                  </span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-lg p-3 mb-3">
                <p className="text-[#64748B] text-sm">
                  <span className="font-bold text-[#10B981]">Acción tomada:</span> {alerta.accion}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
                <Calendar className="w-4 h-4" />
                {alerta.fecha}
              </div>
            </div>
          );
        })}
      </div>

      {alertasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#64748B] mb-2">
            No se encontraron alertas
          </h3>
          <p className="text-[#94A3B8]">
            No hay alertas que coincidan con los filtros seleccionados
          </p>
        </div>
      )}
    </div>
  );
}

