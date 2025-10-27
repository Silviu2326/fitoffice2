import { useState } from 'react';
import { Grid3x3, Apple, Beef, Milk, Wheat, Snowflake, Package } from 'lucide-react';

interface OrganizadorSeccionesProps {
  lista: any;
}

export default function OrganizadorSecciones({ lista }: OrganizadorSeccionesProps) {
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>('frutas');

  const secciones = [
    {
      id: 'frutas',
      nombre: 'Frutas y Verduras',
      icono: Apple,
      color: 'emerald',
      items: [
        { nombre: 'Plátanos', cantidad: '6 unidades', precio: '€2.40' },
        { nombre: 'Manzanas', cantidad: '1 kg', precio: '€2.20' },
        { nombre: 'Espinacas', cantidad: '250g', precio: '€1.80' },
        { nombre: 'Brócoli', cantidad: '500g', precio: '€2.50' },
      ],
    },
    {
      id: 'carnes',
      nombre: 'Carnes y Pescados',
      icono: Beef,
      color: 'red',
      items: [
        { nombre: 'Pechuga de Pollo', cantidad: '800g', precio: '€7.20' },
        { nombre: 'Salmón', cantidad: '400g', precio: '€9.60' },
        { nombre: 'Carne Picada', cantidad: '500g', precio: '€5.50' },
      ],
    },
    {
      id: 'lacteos',
      nombre: 'Lácteos y Huevos',
      icono: Milk,
      color: 'blue',
      items: [
        { nombre: 'Leche Desnatada', cantidad: '2 litros', precio: '€2.00' },
        { nombre: 'Yogur Natural', cantidad: '8 unidades', precio: '€3.20' },
        { nombre: 'Huevos', cantidad: '12 unidades', precio: '€2.80' },
        { nombre: 'Queso Fresco', cantidad: '250g', precio: '€2.50' },
      ],
    },
    {
      id: 'panaderia',
      nombre: 'Panadería y Cereales',
      icono: Wheat,
      color: 'yellow',
      items: [
        { nombre: 'Pan Integral', cantidad: '2 barras', precio: '€2.00' },
        { nombre: 'Avena', cantidad: '500g', precio: '€2.30' },
        { nombre: 'Arroz Integral', cantidad: '1 kg', precio: '€2.50' },
      ],
    },
    {
      id: 'congelados',
      nombre: 'Congelados',
      icono: Snowflake,
      color: 'cyan',
      items: [
        { nombre: 'Verduras Congeladas', cantidad: '1 kg', precio: '€3.50' },
        { nombre: 'Pescado Blanco', cantidad: '600g', precio: '€6.00' },
      ],
    },
    {
      id: 'conservas',
      nombre: 'Conservas y Despensa',
      icono: Package,
      color: 'orange',
      items: [
        { nombre: 'Atún en Lata', cantidad: '4 unidades', precio: '€4.00' },
        { nombre: 'Garbanzos', cantidad: '2 latas', precio: '€2.00' },
        { nombre: 'Aceite de Oliva', cantidad: '1 litro', precio: '€8.50' },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: 'bg-[#D1FAE5]', text: 'text-[#10B981]', border: 'border-[#A7F3D0]' },
      red: { bg: 'bg-[#FEE2E2]', text: 'text-[#EF4444]', border: 'border-[#FECACA]' },
      blue: { bg: 'bg-[#DBEAFE]', text: 'text-[#3B82F6]', border: 'border-[#BFDBFE]' },
      yellow: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', border: 'border-[#FDE68A]' },
      cyan: { bg: 'bg-[#CFFAFE]', text: 'text-[#06B6D4]', border: 'border-[#A5F3FC]' },
      orange: { bg: 'bg-[#FFEDD5]', text: 'text-[#F97316]', border: 'border-[#FED7AA]' },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="bg-[#EEF2FF] p-2 rounded-lg">
            <Grid3x3 className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Organizado por Secciones</h2>
            <p className="text-sm text-[#64748B]">
              Lista optimizada para compra eficiente en el supermercado
            </p>
          </div>
        </div>
      </div>

      {/* Secciones */}
      <div className="p-6 space-y-4">
        {secciones.map((seccion) => {
          const Icon = seccion.icono;
          const isExpanded = seccionExpandida === seccion.id;
          const colorClasses = getColorClasses(seccion.color);

          return (
            <div
              key={seccion.id}
              className={`${colorClasses.bg} border ${colorClasses.border} rounded-xl overflow-hidden transition-all duration-200`}
            >
              {/* Header de Sección */}
              <button
                onClick={() => setSeccionExpandida(isExpanded ? null : seccion.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:opacity-80 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${colorClasses.text}`} />
                  <span className={`font-semibold text-lg ${colorClasses.text}`}>{seccion.nombre}</span>
                  <span className={`text-sm ${colorClasses.text} opacity-75`}>({seccion.items.length} items)</span>
                </div>
                <div className={`text-sm ${colorClasses.text} font-semibold`}>
                  {isExpanded ? '▲' : '▼'}
                </div>
              </button>

              {/* Items de Sección */}
              {isExpanded && (
                <div className="px-5 pb-4 space-y-2">
                  {seccion.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 flex items-center justify-between border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200"
                    >
                      <div>
                        <div className="font-medium text-[#0F172A]">{item.nombre}</div>
                        <div className="text-sm text-[#64748B]">{item.cantidad}</div>
                      </div>
                      <div className="text-[#10B981] font-semibold">{item.precio}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen Total */}
      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-[#64748B] font-medium">Total Estimado:</div>
          <div className="text-2xl font-bold text-[#10B981]">€82.00</div>
        </div>
      </div>
    </div>
  );
}
