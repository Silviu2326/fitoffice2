import { AlertTriangle, User, Calendar, AlertOctagon } from 'lucide-react';

interface Alerta {
  id: string;
  tipo: 'dolor_lumbar' | 'fatiga_excesiva' | 'patron_negativo';
  cliente: string;
  ejercicio: string;
  fecha: string;
  descripcion: string;
  severidad: 'alta' | 'media' | 'baja';
}

export default function AlertasDolor() {
  const alertas: Alerta[] = [
    {
      id: '1',
      tipo: 'dolor_lumbar',
      cliente: 'Carlos Ruiz',
      ejercicio: 'Peso Muerto',
      fecha: '2025-10-26',
      descripcion: 'Dolor lumbar reportado en 2 de las últimas 3 series',
      severidad: 'alta'
    },
    {
      id: '2',
      tipo: 'fatiga_excesiva',
      cliente: 'María García',
      ejercicio: 'Press Banca',
      fecha: '2025-10-25',
      descripcion: 'RPE promedio superior a 8.5 en las últimas 5 sesiones',
      severidad: 'media'
    },
    {
      id: '3',
      tipo: 'patron_negativo',
      cliente: 'Juan Pérez',
      ejercicio: 'Sentadilla',
      fecha: '2025-10-24',
      descripcion: 'Disminución progresiva en sensaciones positivas durante la semana',
      severidad: 'baja'
    }
  ];

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'alta':
        return 'border-[#EF4444] bg-[#FEE2E2]';
      case 'media':
        return 'border-[#F59E0B] bg-[#FEF3C7]';
      case 'baja':
        return 'border-[#3B82F6] bg-[#DBEAFE]';
      default:
        return 'border-[#334155] bg-[#2A2A3A]';
    }
  };

  const getSeveridadTextColor = (severidad: string) => {
    switch (severidad) {
      case 'alta':
        return 'text-[#EF4444]';
      case 'media':
        return 'text-[#F59E0B]';
      case 'baja':
        return 'text-[#3B82F6]';
      default:
        return 'text-[#94A3B8]';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'dolor_lumbar':
        return <AlertOctagon className="w-5 h-5" />;
      case 'fatiga_excesiva':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'dolor_lumbar':
        return 'Dolor Lumbar';
      case 'fatiga_excesiva':
        return 'Fatiga Excesiva';
      case 'patron_negativo':
        return 'Patrón Negativo';
      default:
        return 'Alerta';
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumen de alertas */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[#FEE2E2] border border-[#EF4444] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <AlertOctagon className="w-8 h-8 text-[#EF4444]" />
            <span className="text-3xl font-bold text-[#EF4444]">
              {alertas.filter(a => a.severidad === 'alta').length}
            </span>
          </div>
          <p className="text-[#0F172A] font-semibold">Alertas Críticas</p>
          <p className="text-[#64748B] text-sm mt-1">Requieren atención inmediata</p>
        </div>

        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-3xl font-bold text-[#F59E0B]">
              {alertas.filter(a => a.severidad === 'media').length}
            </span>
          </div>
          <p className="text-[#0F172A] font-semibold">Alertas Moderadas</p>
          <p className="text-[#64748B] text-sm mt-1">Monitoreo recomendado</p>
        </div>

        <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-3xl font-bold text-[#3B82F6]">
              {alertas.filter(a => a.severidad === 'baja').length}
            </span>
          </div>
          <p className="text-[#0F172A] font-semibold">Alertas Leves</p>
          <p className="text-[#64748B] text-sm mt-1">Seguimiento preventivo</p>
        </div>
      </div>

      {/* Lista de alertas */}
      <div className="space-y-4">
        {alertas.map((alerta) => (
          <div
            key={alerta.id}
            className={`border rounded-[16px] p-6 shadow-md ${getSeveridadColor(alerta.severidad)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`${getSeveridadTextColor(alerta.severidad)}`}>
                  {getTipoIcon(alerta.tipo)}
                </div>
                <div>
                  <p className={`font-bold ${getSeveridadTextColor(alerta.severidad)}`}>
                    {getTipoLabel(alerta.tipo)}
                  </p>
                  <p className="text-[#64748B] text-sm mt-1">{alerta.descripcion}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeveridadTextColor(alerta.severidad)}`}>
                {alerta.severidad.toUpperCase()}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#64748B]" />
                <div>
                  <p className="text-xs text-[#64748B]">Cliente</p>
                  <p className="text-[#0F172A] font-medium">{alerta.cliente}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#64748B]" />
                <div>
                  <p className="text-xs text-[#64748B]">Fecha</p>
                  <p className="text-[#0F172A] font-medium">{alerta.fecha}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Ejercicio</p>
                <p className="text-[#0F172A] font-medium">{alerta.ejercicio}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="inline-flex items-center justify-center h-10 px-4 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-[12px] font-semibold hover:bg-[#F1F5F9] hover:border-[#6366F1] transition-all duration-200 text-sm">
                Ver Detalles
              </button>
              <button className="inline-flex items-center justify-center h-10 px-4 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                Marcar como Resuelta
              </button>
            </div>
          </div>
        ))}
      </div>

      {alertas.length === 0 && (
        <div className="text-center py-12 bg-[#1E1E2E] border border-[#334155] rounded-[16px] shadow-md">
          <AlertTriangle className="w-12 h-12 text-[#475569] mx-auto mb-3" />
          <p className="text-[#94A3B8]">No hay alertas activas</p>
        </div>
      )}
    </div>
  );
}

