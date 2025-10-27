import { AlertCircle, Clock, User, DollarSign } from 'lucide-react';

interface PagoAtrasado {
  cliente: string;
  servicio: string;
  cantidad: number;
  diasAtraso: number;
  estado: 'leve' | 'moderado' | 'grave';
}

interface AlertasPagosProps {
  pagosAtrasados: PagoAtrasado[];
  totalPendiente: number;
}

export default function AlertasPagos({ pagosAtrasados, totalPendiente }: AlertasPagosProps) {
  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'leve':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'moderado':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'grave':
        return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const getTextEstado = (estado: string) => {
    switch (estado) {
      case 'leve':
        return 'Recordatorio';
      case 'moderado':
        return 'Urgente';
      case 'grave':
        return 'Crítico';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#EF4444] p-2 rounded-xl">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Alertas de Pagos</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Clientes con pagos pendientes</p>
        </div>
        <div className="text-right">
          <p className="text-[14px] leading-[20px] text-[#64748B]">Total pendiente</p>
          <p className="text-[20px] leading-[28px] font-bold text-[#EF4444]">€{totalPendiente.toLocaleString()}</p>
        </div>
      </div>

      {pagosAtrasados.length === 0 ? (
        <div className="bg-[#D1FAE5] border border-[#10B981] rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#10B981] rounded-full mb-3">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <p className="text-[#10B981] font-semibold text-[16px] leading-[24px]">¡Todo al día!</p>
          <p className="text-[14px] leading-[20px] text-[#64748B] mt-1">No hay pagos pendientes</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pagosAtrasados.map((pago, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 ${getColorEstado(pago.estado)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[#F1F5F9] p-2 rounded-xl">
                    <User className="w-4 h-4 text-[#64748B]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{pago.cliente}</p>
                    <p className="text-[14px] leading-[20px] text-[#64748B]">{pago.servicio}</p>
                  </div>
                </div>
                <span className={`text-[12px] leading-[16px] px-3 py-1 rounded-full font-medium ${getColorEstado(pago.estado)}`}>
                  {getTextEstado(pago.estado)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] leading-[20px]">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <span className="text-[#64748B]">
                    {pago.diasAtraso} {pago.diasAtraso === 1 ? 'día' : 'días'} de retraso
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[18px] leading-[28px] font-bold text-[#0F172A]">€{pago.cantidad.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagosAtrasados.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
          <button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)]">
            Enviar Recordatorios Masivos
          </button>
        </div>
      )}
    </div>
  );
}

