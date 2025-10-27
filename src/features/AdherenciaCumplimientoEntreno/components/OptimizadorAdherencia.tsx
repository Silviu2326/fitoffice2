import { Lightbulb, Target, CheckCircle, MessageSquare, Clock, Users, TrendingUp } from 'lucide-react';

interface Recomendacion {
  id: string;
  categoria: 'comunicacion' | 'horarios' | 'programacion' | 'motivacion';
  titulo: string;
  descripcion: string;
  impactoEsperado: string;
  prioridad: 'alta' | 'media' | 'baja';
  accion: string;
}

export default function OptimizadorAdherencia() {
  // Datos de ejemplo
  const recomendaciones: Recomendacion[] = [
    {
      id: '1',
      categoria: 'comunicacion',
      titulo: 'Implementar recordatorios automáticos',
      descripcion: 'Enviar recordatorios 24h antes de las sesiones programadas',
      impactoEsperado: 'Aumento estimado del 15% en adherencia',
      prioridad: 'alta',
      accion: 'Configurar automatización'
    },
    {
      id: '2',
      categoria: 'motivacion',
      titulo: 'Seguimiento personalizado para clientes en riesgo',
      descripcion: 'Contacto directo con los 8 clientes con adherencia < 50%',
      impactoEsperado: 'Recuperación del 60% de clientes en riesgo',
      prioridad: 'alta',
      accion: 'Programar llamadas'
    },
    {
      id: '3',
      categoria: 'horarios',
      titulo: 'Ajustar horarios de clases con baja ocupación',
      descripcion: 'Mover clases de tarde con < 50% ocupación a horarios más demandados',
      impactoEsperado: 'Mejora del 20% en ocupación global',
      prioridad: 'media',
      accion: 'Revisar disponibilidad'
    },
    {
      id: '4',
      categoria: 'programacion',
      titulo: 'Optimizar sesiones de fin de semana',
      descripcion: 'Las sesiones de viernes tienen 65% adherencia vs 85% inicio semana',
      impactoEsperado: 'Igualar adherencia en toda la semana',
      prioridad: 'media',
      accion: 'Rediseñar programación'
    },
    {
      id: '5',
      categoria: 'motivacion',
      titulo: 'Sistema de logros y recompensas',
      descripcion: 'Implementar gamificación para mantener motivación',
      impactoEsperado: 'Incremento del 10% en adherencia sostenida',
      prioridad: 'baja',
      accion: 'Diseñar sistema'
    }
  ];

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'comunicacion':
        return <MessageSquare className="w-5 h-5" />;
      case 'horarios':
        return <Clock className="w-5 h-5" />;
      case 'programacion':
        return <Target className="w-5 h-5" />;
      case 'motivacion':
        return <Users className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'comunicacion':
        return 'text-[#6366F1] bg-[#EEF2FF]';
      case 'horarios':
        return 'text-[#8B5CF6] bg-[#F3E8FF]';
      case 'programacion':
        return 'text-[#10B981] bg-[#D1FAE5]';
      case 'motivacion':
        return 'text-[#F59E0B] bg-[#FEF3C7]';
      default:
        return 'text-[#64748B] bg-[#F8FAFC]';
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-[#EF4444] text-white';
      case 'media':
        return 'bg-[#F59E0B] text-white';
      case 'baja':
        return 'bg-[#3B82F6] text-white';
      default:
        return 'bg-[#94A3B8] text-white';
    }
  };

  const recomendacionesAlta = recomendaciones.filter(r => r.prioridad === 'alta').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Optimizador de Adherencia</h3>
          <p className="text-[14px] leading-5 text-[#64748B] mt-1">Recomendaciones automáticas para mejorar cumplimiento</p>
        </div>
        <Lightbulb className="w-6 h-6 text-[#F59E0B]" />
      </div>

      {/* Resumen */}
      <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] border border-[#F59E0B]/20 rounded-2xl p-4 mb-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-[#F59E0B] rounded-xl p-2">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-[#0F172A] text-[16px]">
              {recomendacionesAlta} acciones de alta prioridad identificadas
            </p>
            <p className="text-[14px] leading-5 text-[#64748B]">
              Impacto potencial: +15-20% en adherencia general
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Recomendaciones */}
      <div className="space-y-4">
        {recomendaciones.map((rec) => (
          <div key={rec.id} className="border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#6366F1] hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getCategoriaColor(rec.categoria)}`}>
                {getCategoriaIcon(rec.categoria)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-[#0F172A] text-[18px] leading-7">{rec.titulo}</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] leading-4 font-semibold uppercase ${getPrioridadBadge(rec.prioridad)}`}>
                    {rec.prioridad}
                  </span>
                </div>
                
                <p className="text-[#64748B] text-[14px] leading-5 mb-3">{rec.descripcion}</p>
                
                <div className="bg-[#D1FAE5] border border-[#10B981]/20 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[14px] leading-5 font-semibold text-[#059669]">
                      {rec.impactoEsperado}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[12px] leading-4 font-medium text-[#94A3B8] uppercase">
                    {rec.categoria}
                  </span>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-all duration-200 text-[14px] leading-5 font-semibold shadow-md hover:shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                    {rec.accion}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Impacto Acumulado */}
      <div className="mt-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] leading-5 text-[#64748B] mb-1">Impacto Potencial Total</p>
            <p className="text-[24px] leading-8 font-bold text-[#0F172A]">+25-30% en adherencia</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] leading-5 text-[#64748B] mb-1">Implementando todas las recomendaciones</p>
            <p className="text-[18px] leading-7 font-semibold text-[#10B981]">{recomendaciones.length} acciones disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
