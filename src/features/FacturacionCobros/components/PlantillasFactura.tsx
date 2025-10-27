import { FileText, Edit, Trash2, Plus } from 'lucide-react';

interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  conceptos: string[];
  precio: number;
}

export default function PlantillasFactura() {
  const plantillas: Plantilla[] = [
    {
      id: '1',
      nombre: 'Plan Entrenamiento Mensual',
      descripcion: 'Plan de entrenamiento personalizado mensual',
      conceptos: ['Entrenamiento personalizado', '4 sesiones semanales', 'Seguimiento continuo'],
      precio: 150.00
    },
    {
      id: '2',
      nombre: 'Plan Entrenamiento + Nutrición',
      descripcion: 'Plan completo de entrenamiento y nutrición',
      conceptos: ['Entrenamiento personalizado', 'Plan nutricional', 'Seguimiento semanal'],
      precio: 200.00
    },
    {
      id: '3',
      nombre: 'Paquete 8 Sesiones',
      descripcion: 'Paquete prepagado de 8 sesiones',
      conceptos: ['8 sesiones de entrenamiento', 'Válido por 2 meses'],
      precio: 180.00
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Plantillas de Factura</h3>
          <p className="text-[14px] leading-[20px] text-[#94A3B8]">Crea y gestiona plantillas para facturación rápida</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white text-[16px] font-semibold rounded-xl hover:bg-[#4F46E5] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          <Plus className="w-5 h-5" />
          Nueva Plantilla
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plantillas.map((plantilla) => (
          <div
            key={plantilla.id}
            className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#6366F1]/20 rounded-xl">
                  <FileText className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <h4 className="text-[16px] leading-[24px] font-semibold text-[#F1F5F9]">{plantilla.nombre}</h4>
                  <p className="text-[12px] leading-[16px] text-[#94A3B8]">{plantilla.descripcion}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {plantilla.conceptos.map((concepto, index) => (
                <div key={index} className="flex items-center gap-2 text-[14px] text-[#F1F5F9]">
                  <div className="w-1.5 h-1.5 bg-[#6366F1] rounded-full"></div>
                  {concepto}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
              <span className="text-[30px] leading-[38px] font-bold text-[#10B981]">€{plantilla.precio.toFixed(2)}</span>
              <div className="flex gap-2">
                <button className="p-2 text-[#3B82F6] hover:bg-[#2A2A3A] rounded-lg transition-all duration-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-[#EF4444] hover:bg-[#2A2A3A] rounded-lg transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

