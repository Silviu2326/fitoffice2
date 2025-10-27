import { Store, TrendingDown, MapPin, Clock } from 'lucide-react';

export default function OptimizadorCompras() {
  const supermercados = [
    {
      nombre: 'Mercadona',
      distancia: '0.8 km',
      tiempoEstimado: '15 min',
      ahorro: 'Mejor precio',
      disponibilidad: '95%',
    },
    {
      nombre: 'Carrefour',
      distancia: '1.2 km',
      tiempoEstimado: '20 min',
      ahorro: 'Más variedad',
      disponibilidad: '88%',
    },
    {
      nombre: 'DIA',
      distancia: '0.5 km',
      tiempoEstimado: '10 min',
      ahorro: 'Más cercano',
      disponibilidad: '78%',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="bg-[#CCFBF1] p-2 rounded-lg">
            <Store className="w-5 h-5 text-[#14B8A6]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Optimizador de Compras</h2>
            <p className="text-sm text-[#64748B]">
              Encuentra el mejor supermercado para esta lista
            </p>
          </div>
        </div>
      </div>

      {/* Supermercados */}
      <div className="p-6 space-y-4">
        {supermercados.map((super_mercado, index) => (
          <div
            key={index}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#CCFBF1] p-2 rounded-lg">
                  <Store className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">{super_mercado.nombre}</h3>
                  <p className="text-sm text-[#64748B]">{super_mercado.ahorro}</p>
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                Seleccionar
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#64748B]" />
                <span className="text-[#0F172A]">{super_mercado.distancia}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#64748B]" />
                <span className="text-[#0F172A]">{super_mercado.tiempoEstimado}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="w-4 h-4 text-[#64748B]" />
                <span className="text-[#0F172A]">{super_mercado.disponibilidad} productos</span>
              </div>
            </div>
          </div>
        ))}

        {/* Info */}
        <div className="bg-[#CCFBF1] border border-[#99F6E4] rounded-xl p-4">
          <p className="text-sm text-[#14B8A6] font-medium mb-2">
            💡 El optimizador sugiere el mejor supermercado basándose en:
          </p>
          <ul className="space-y-1 text-sm text-[#0F172A] ml-6">
            <li>• Disponibilidad de productos de la lista</li>
            <li>• Distancia desde la ubicación del cliente</li>
            <li>• Precios comparativos de ingredientes</li>
            <li>• Preferencias guardadas del cliente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
