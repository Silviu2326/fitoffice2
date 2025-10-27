import { useState } from 'react';
import { Target, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Estrategia {
  id: string;
  nivel: 'verde' | 'amarillo' | 'naranja' | 'rojo' | 'negro';
  nombre: string;
  descripcion: string;
  acciones: string[];
  frecuencia: string;
  canales: string[];
  tono: string;
  resultado_esperado: string;
}

const estrategias: Estrategia[] = [
  {
    id: 'est-verde',
    nivel: 'verde',
    nombre: 'Estrategia Amigable',
    descripcion: 'Para retrasos leves (1-7 días). Enfoque preventivo y cordial.',
    acciones: [
      'Enviar recordatorio amigable por email',
      'Mensaje de WhatsApp casual',
      'Ofrecer facilidades de pago si es necesario',
      'Confirmar recepción de factura',
    ],
    frecuencia: 'Un recordatorio cada 3 días',
    canales: ['Email', 'WhatsApp', 'SMS'],
    tono: 'Amigable, comprensivo, servicial',
    resultado_esperado: 'Pago dentro de 2-3 días',
  },
  {
    id: 'est-amarillo',
    nivel: 'amarillo',
    nombre: 'Estrategia Firme',
    descripcion: 'Para retrasos moderados (8-15 días). Enfoque más directo pero profesional.',
    acciones: [
      'Enviar recordatorio firme con fecha límite',
      'Llamada telefónica de seguimiento',
      'Advertir sobre posibles cargos por mora',
      'Solicitar compromiso de pago específico',
    ],
    frecuencia: 'Recordatorios cada 2 días',
    canales: ['Email', 'Teléfono', 'WhatsApp'],
    tono: 'Firme, profesional, directo',
    resultado_esperado: 'Compromiso de pago o pago inmediato',
  },
  {
    id: 'est-naranja',
    nivel: 'naranja',
    nombre: 'Estrategia Urgente',
    descripcion: 'Para retrasos altos (16-30 días). Requiere acción inmediata.',
    acciones: [
      'Notificación urgente con consecuencias claras',
      'Múltiples intentos de contacto telefónico',
      'Proponer plan de pagos estructurado',
      'Advertir suspensión de servicios',
      'Incluir cargos por mora',
    ],
    frecuencia: 'Contacto diario hasta resolución',
    canales: ['Teléfono (prioritario)', 'Email certificado', 'Visita presencial'],
    tono: 'Urgente, serio, consecuente',
    resultado_esperado: 'Plan de pagos acordado o pago parcial',
  },
  {
    id: 'est-rojo',
    nivel: 'rojo',
    nombre: 'Estrategia Crítica',
    descripcion: 'Para morosidad crítica (31-60 días). Gestión especializada.',
    acciones: [
      'Suspensión inmediata de servicios',
      'Carta certificada de requerimiento de pago',
      'Negociación directa con garantías',
      'Evaluación de activos del deudor',
      'Preparar expediente para gestión legal',
    ],
    frecuencia: 'Seguimiento diario intensivo',
    canales: ['Reunión presencial', 'Carta certificada', 'Teléfono'],
    tono: 'Formal, serio, legal',
    resultado_esperado: 'Acuerdo de pago con garantías o escalación legal',
  },
  {
    id: 'est-negro',
    nivel: 'negro',
    nombre: 'Estrategia Legal',
    descripcion: 'Para morosidad extrema (+60 días). Proceso legal iniciado.',
    acciones: [
      'Derivar a departamento legal o agencia de cobranzas',
      'Iniciar proceso judicial de cobro',
      'Requerir embargo de bienes si procede',
      'Reportar a buró de crédito',
      'Considerar venta de deuda a terceros',
    ],
    frecuencia: 'Proceso legal continuo',
    canales: ['Gestión legal', 'Notificación judicial', 'Agencia de cobranzas'],
    tono: 'Legal, formal, definitivo',
    resultado_esperado: 'Recuperación mediante vía judicial o liquidación',
  },
];

export default function EstrategiasCobro() {
  const [estrategiaSeleccionada, setEstrategiaSeleccionada] = useState<Estrategia | null>(null);

  const getColorNivel = (nivel: string) => {
    const colores = {
      verde: 'from-[#10B981] to-[#059669]',
      amarillo: 'from-[#F59E0B] to-[#D97706]',
      naranja: 'from-[#F59E0B] to-[#EA580C]',
      rojo: 'from-[#EF4444] to-[#DC2626]',
      negro: 'from-[#0F172A] to-[#1E293B]',
    };
    return colores[nivel as keyof typeof colores] || 'from-[#64748B] to-[#475569]';
  };

  const getBorderColor = (nivel: string) => {
    const colores = {
      verde: 'border-[#10B981]',
      amarillo: 'border-[#F59E0B]',
      naranja: 'border-[#F59E0B]',
      rojo: 'border-[#EF4444]',
      negro: 'border-[#0F172A]',
    };
    return colores[nivel as keyof typeof colores] || 'border-[#E2E8F0]';
  };

  return (
    <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#CFFAFE] rounded-[12px]">
            <Target className="w-6 h-6 text-[#06B6D4]" />
          </div>
          <div>
            <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Estrategias de Cobro</h2>
            <p className="text-[14px] leading-[20px] text-[#64748B]">Protocolos diferenciados según nivel de morosidad</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Estrategias */}
          <div className="space-y-4">
            {estrategias.map((estrategia) => (
              <div
                key={estrategia.id}
                onClick={() => setEstrategiaSeleccionada(estrategia)}
                className={`border-2 rounded-[12px] p-4 cursor-pointer transition-all duration-200 ${
                  estrategiaSeleccionada?.id === estrategia.id
                    ? `${getBorderColor(estrategia.nivel)} bg-[#F8FAFC]`
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${getColorNivel(estrategia.nivel)} rounded-[12px] flex items-center justify-center text-white font-bold text-[14px] leading-[20px] shadow-md`}>
                    {estrategia.nivel.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0F172A] mb-1 text-[16px] leading-[24px]">{estrategia.nombre}</h3>
                    <p className="text-[14px] leading-[20px] text-[#64748B]">{estrategia.descripcion}</p>
                  </div>
                  {estrategiaSeleccionada?.id === estrategia.id && (
                    <CheckCircle className="flex-shrink-0 w-6 h-6 text-[#10B981]" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detalle de Estrategia Seleccionada */}
          <div>
            {estrategiaSeleccionada ? (
              <div className="border border-[#E2E8F0] rounded-[12px] overflow-hidden shadow-md">
                <div className={`bg-gradient-to-r ${getColorNivel(estrategiaSeleccionada.nivel)} text-white p-6`}>
                  <h3 className="text-[24px] leading-[32px] font-bold mb-2">{estrategiaSeleccionada.nombre}</h3>
                  <p className="text-white text-opacity-90 text-[16px] leading-[24px]">{estrategiaSeleccionada.descripcion}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Acciones a Tomar */}
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2 text-[16px] leading-[24px]">
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                      Acciones a Tomar
                    </h4>
                    <ul className="space-y-2">
                      {estrategiaSeleccionada.acciones.map((accion, index) => (
                        <li key={index} className="flex items-start gap-2 text-[14px] leading-[20px] text-[#0F172A]">
                          <span className="text-[#10B981] font-bold">•</span>
                          <span>{accion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Frecuencia */}
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2 flex items-center gap-2 text-[16px] leading-[24px]">
                      <Clock className="w-5 h-5 text-[#3B82F6]" />
                      Frecuencia de Seguimiento
                    </h4>
                    <p className="text-[14px] leading-[20px] text-[#1E40AF] bg-[#DBEAFE] border border-[#3B82F6] rounded-[12px] p-3">
                      {estrategiaSeleccionada.frecuencia}
                    </p>
                  </div>

                  {/* Canales de Comunicación */}
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2 text-[16px] leading-[24px]">Canales de Comunicación</h4>
                    <div className="flex flex-wrap gap-2">
                      {estrategiaSeleccionada.canales.map((canal, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#F3E8FF] text-[#7C3AED] rounded-full text-[12px] leading-[16px] font-medium"
                        >
                          {canal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tono de Comunicación */}
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2 text-[16px] leading-[24px]">Tono de Comunicación</h4>
                    <p className="text-[14px] leading-[20px] text-[#0F172A] bg-[#F8FAFC] rounded-[12px] p-3">
                      {estrategiaSeleccionada.tono}
                    </p>
                  </div>

                  {/* Resultado Esperado */}
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2 flex items-center gap-2 text-[16px] leading-[24px]">
                      <Target className="w-5 h-5 text-[#F59E0B]" />
                      Resultado Esperado
                    </h4>
                    <p className="text-[14px] leading-[20px] text-[#92400E] bg-[#FEF3C7] border border-[#F59E0B] rounded-[12px] p-3 font-medium">
                      {estrategiaSeleccionada.resultado_esperado}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-[12px] p-12 text-center">
                <Target className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
                <p className="text-[#64748B] font-medium text-[16px] leading-[24px]">Selecciona una estrategia para ver los detalles</p>
                <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-2">
                  Cada estrategia está diseñada para un nivel específico de morosidad
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

