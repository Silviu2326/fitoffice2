import { Circle, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface CheckInsSemaforoProps {
  ejercicio: any;
  onUpdate: (checkIns: any[]) => void;
}

export default function CheckInsSemaforo({ ejercicio, onUpdate }: CheckInsSemaforoProps) {
  const checkIns = ejercicio.checkIns || [];

  const estadosSemaforo = [
    {
      id: 'verde',
      nombre: 'Verde',
      descripcion: 'Excelente ejecución',
      icon: CheckCircle2,
      color: 'text-[#10B981] bg-[#D1FAE5] border-[#10B981]/30 hover:bg-[#D1FAE5]'
    },
    {
      id: 'amarillo',
      nombre: 'Amarillo',
      descripcion: 'Dificultad moderada',
      icon: AlertCircle,
      color: 'text-[#F59E0B] bg-[#FEF3C7] border-[#F59E0B]/30 hover:bg-[#FEF3C7]'
    },
    {
      id: 'rojo',
      nombre: 'Rojo',
      descripcion: 'Ajuste necesario',
      icon: XCircle,
      color: 'text-[#EF4444] bg-[#FEE2E2] border-[#EF4444]/30 hover:bg-[#FEE2E2]'
    }
  ];

  const getCheckInCount = (estado: string) => {
    return checkIns.filter((ci: any) => ci.estado === estado).length;
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      <h4 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
        <Circle className="w-4 h-4" />
        Check-ins Semáforo
      </h4>

      <div className="space-y-2">
        {estadosSemaforo.map((estado) => {
          const Icon = estado.icon;
          const count = getCheckInCount(estado.id);
          
          return (
            <div
              key={estado.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${estado.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <h5 className="font-semibold text-sm">{estado.nombre}</h5>
                    <p className="text-xs opacity-80">{estado.descripcion}</p>
                  </div>
                </div>
                {count > 0 && (
                  <div className="px-3 py-1 rounded-full bg-white border border-current">
                    <span className="text-sm font-bold">{count}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Información */}
      <div className="mt-4 p-3 bg-[#F8FAFC] rounded-lg">
        <p className="text-xs text-[#64748B]">
          <span className="font-semibold">Sistema de Feedback:</span> Los clientes reportan su experiencia después de cada sesión
        </p>
      </div>

      {/* Estadísticas si hay check-ins */}
      {checkIns.length > 0 && (
        <div className="mt-4 p-3 bg-[#DBEAFE] border border-[#3B82F6]/20 rounded-lg">
          <p className="text-xs text-[#3B82F6]">
            <span className="font-semibold">Total de check-ins:</span> {checkIns.length}
          </p>
          <div className="mt-2 flex gap-2">
            <span className="text-xs text-[#10B981]">🟢 {getCheckInCount('verde')}</span>
            <span className="text-xs text-[#F59E0B]">🟡 {getCheckInCount('amarillo')}</span>
            <span className="text-xs text-[#EF4444]">🔴 {getCheckInCount('rojo')}</span>
          </div>
        </div>
      )}
    </div>
  );
}

