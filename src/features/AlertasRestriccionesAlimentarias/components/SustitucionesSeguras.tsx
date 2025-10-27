import { X, Shield, ArrowRight, Lightbulb } from 'lucide-react';

interface Restriccion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: string;
  descripcion: string;
  severidad: string;
  ingredientes: string[];
}

interface SustitucionesSegurasProps {
  restriccion: Restriccion;
  onClose: () => void;
}

interface Sustitucion {
  ingredienteBloqueado: string;
  alternativas: {
    nombre: string;
    categoria: string;
    propiedades: string;
    compatibilidad: number;
  }[];
}

export default function SustitucionesSeguras({ restriccion, onClose }: SustitucionesSegurasProps) {
  // Datos mock de sustituciones
  const sustituciones: Sustitucion[] = [
    {
      ingredienteBloqueado: 'maní',
      alternativas: [
        {
          nombre: 'Semillas de girasol',
          categoria: 'Semillas',
          propiedades: 'Alto en proteína, similar textura crujiente',
          compatibilidad: 95
        },
        {
          nombre: 'Semillas de calabaza',
          categoria: 'Semillas',
          propiedades: 'Rico en minerales, sabor suave',
          compatibilidad: 90
        },
        {
          nombre: 'Copos de avena',
          categoria: 'Cereales',
          propiedades: 'Alternativa textura, rico en fibra',
          compatibilidad: 85
        }
      ]
    },
    {
      ingredienteBloqueado: 'almendras',
      alternativas: [
        {
          nombre: 'Copos de avena',
          categoria: 'Cereales',
          propiedades: 'Similar aporte nutricional',
          compatibilidad: 92
        },
        {
          nombre: 'Semillas de chía',
          categoria: 'Semillas',
          propiedades: 'Alto omega-3, versátil',
          compatibilidad: 88
        }
      ]
    }
  ];

  const getCompatibilidadColor = (compatibilidad: number) => {
    if (compatibilidad >= 90) return 'emerald';
    if (compatibilidad >= 80) return 'blue';
    return 'orange';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#E2E8F0] shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-6 flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Sustituciones Seguras
              </h2>
              <p className="text-white/90">
                {restriccion.clienteNombre} - Alternativas seguras para ingredientes bloqueados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Info de la restricción */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#6366F1]" />
              <h3 className="text-[#0F172A] font-bold">Información de Restricción</h3>
            </div>
            <p className="text-[#64748B] mb-2">{restriccion.descripcion}</p>
            <div className="flex flex-wrap gap-2">
              {restriccion.ingredientes.map((ingrediente, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#FEE2E2] text-[#EF4444] rounded-lg text-sm border border-[#FCA5A5]"
                >
                  {ingrediente}
                </span>
              ))}
            </div>
          </div>

          {/* Lista de sustituciones */}
          <div className="space-y-6">
            {sustituciones.map((sustitucion, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
                {/* Ingrediente bloqueado */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-4 py-2 bg-[#FEE2E2] text-[#EF4444] rounded-lg font-bold border border-[#FCA5A5]">
                    {sustitucion.ingredienteBloqueado}
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  <span className="text-[#10B981] font-bold">Alternativas seguras</span>
                </div>

                {/* Alternativas */}
                <div className="space-y-3">
                  {sustitucion.alternativas.map((alternativa, altIdx) => {
                    const compatibilidadColor = getCompatibilidadColor(alternativa.compatibilidad);
                    
                    return (
                      <div
                        key={altIdx}
                        className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-[#0F172A] font-bold text-lg mb-1">
                              {alternativa.nombre}
                            </h4>
                            <span className="px-3 py-1 bg-white border border-[#E2E8F0] text-[#64748B] rounded-full text-sm">
                              {alternativa.categoria}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold text-${compatibilidadColor}-400`}>
                              {alternativa.compatibilidad}%
                            </div>
                            <div className="text-[#64748B] text-sm">Compatibilidad</div>
                          </div>
                        </div>

                        <p className="text-[#64748B] text-sm">
                          {alternativa.propiedades}
                        </p>

                        {/* Barra de compatibilidad */}
                        <div className="mt-3">
                          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r from-${compatibilidadColor}-500 to-${compatibilidadColor}-400 transition-all`}
                              style={{ width: `${alternativa.compatibilidad}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Nota informativa */}
          <div className="mt-6 bg-[#DBEAFE] border border-[#3B82F6]/30 rounded-lg p-4">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#3B82F6] font-bold mb-1">
                  Recomendaciones de Sustitución
                </h4>
                <p className="text-[#0F172A] text-sm">
                  Las alternativas sugeridas se basan en propiedades nutricionales similares y 
                  compatibilidad con las restricciones del cliente. La compatibilidad indica qué 
                  tan similar es el perfil nutricional y funcional del ingrediente sustituto.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8FAFC] p-4 flex justify-end gap-3 border-t border-[#E2E8F0]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

