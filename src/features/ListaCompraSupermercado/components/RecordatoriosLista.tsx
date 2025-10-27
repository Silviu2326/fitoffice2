import { Bell, Calendar, Clock, Send } from 'lucide-react';
import { useState } from 'react';

interface RecordatoriosListaProps {
  clienteId: string | null;
}

export default function RecordatoriosLista({ clienteId }: RecordatoriosListaProps) {
  const [recordatorioActivo, setRecordatorioActivo] = useState(true);
  const [frecuencia, setFrecuencia] = useState('semanal');
  const [diaRecordatorio, setDiaRecordatorio] = useState('domingo');
  const [horaRecordatorio, setHoraRecordatorio] = useState('10:00');

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="bg-[#FEF3C7] p-2 rounded-lg">
            <Bell className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Recordatorios Automáticos</h2>
            <p className="text-sm text-[#64748B]">
              Notificaciones de compra programadas
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Activar/Desactivar */}
        <div>
          <label className="flex items-center justify-between cursor-pointer p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#F59E0B]" />
              <div>
                <div className="font-semibold text-[#0F172A]">Recordatorios Activos</div>
                <div className="text-sm text-[#64748B]">
                  Enviar notificaciones al cliente
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={recordatorioActivo}
                onChange={(e) => setRecordatorioActivo(e.target.checked)}
                className="sr-only peer"
              />
              <div
                onClick={() => setRecordatorioActivo(!recordatorioActivo)}
                className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#EEF2FF] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E2E8F0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366F1] cursor-pointer"
              ></div>
            </div>
          </label>
        </div>

        {recordatorioActivo && (
          <>
            {/* Frecuencia */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Frecuencia
              </label>
              <select
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              >
                <option value="diaria">Diaria</option>
                <option value="semanal">Semanal</option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>

            {/* Día de la Semana */}
            {frecuencia === 'semanal' && (
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Día de la Semana
                </label>
                <select
                  value={diaRecordatorio}
                  onChange={(e) => setDiaRecordatorio(e.target.value)}
                  className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                >
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miercoles">Miércoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                  <option value="sabado">Sábado</option>
                  <option value="domingo">Domingo</option>
                </select>
              </div>
            )}

            {/* Hora */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Hora del Recordatorio
              </label>
              <input
                type="time"
                value={horaRecordatorio}
                onChange={(e) => setHoraRecordatorio(e.target.value)}
                className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              />
            </div>

            {/* Botón Enviar Ahora */}
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:from-[#D97706] hover:to-[#EA580C] text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2">
              <Send className="w-5 h-5" />
              Enviar Recordatorio Ahora
            </button>
          </>
        )}

        {/* Info */}
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
          <p className="text-sm text-[#F59E0B]">
            💡 Los recordatorios se envían automáticamente al cliente según la 
            configuración establecida. Incluyen la lista actualizada y un enlace 
            directo para verla en su dispositivo móvil.
          </p>
        </div>
      </div>
    </div>
  );
}
