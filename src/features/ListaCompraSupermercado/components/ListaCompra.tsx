import { useState } from 'react';
import { ShoppingCart, User, Calendar, Download, Send, Eye, Trash2 } from 'lucide-react';

interface ListaCompraProps {
  onSeleccionarCliente?: (clienteId: string) => void;
  onGenerarNueva?: () => void;
}

export default function ListaCompra({ onSeleccionarCliente, onGenerarNueva }: ListaCompraProps) {
  const [listas] = useState([
    {
      id: '1',
      clienteNombre: 'María García López',
      clienteId: 'cliente-1',
      fechaCreacion: '2025-10-20',
      fechaCompra: '2025-10-27',
      totalIngredientes: 45,
      estado: 'pendiente',
      supermercado: 'Mercadona',
    },
    {
      id: '2',
      clienteNombre: 'Juan Pérez Martínez',
      clienteId: 'cliente-2',
      fechaCreacion: '2025-10-19',
      fechaCompra: '2025-10-26',
      totalIngredientes: 38,
      estado: 'enviada',
      supermercado: 'Carrefour',
    },
    {
      id: '3',
      clienteNombre: 'Ana Rodríguez Sánchez',
      clienteId: 'cliente-3',
      fechaCreacion: '2025-10-18',
      fechaCompra: '2025-10-25',
      totalIngredientes: 52,
      estado: 'completada',
      supermercado: 'DIA',
    },
  ]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'enviada':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completada':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Listas de Compra Activas</h2>
              <p className="text-sm text-slate-400">
                Gestión de listas personalizadas por cliente
              </p>
            </div>
          </div>
          <button
            onClick={onGenerarNueva}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all font-medium"
          >
            + Nueva Lista
          </button>
        </div>
      </div>

      {/* Listas */}
      <div className="p-6">
        <div className="space-y-4">
          {listas.map((lista) => (
            <div
              key={lista.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#EEF2FF] p-2 rounded-lg">
                      <User className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0F172A]">
                        {lista.clienteNombre}
                      </h3>
                      <p className="text-sm text-[#64748B]">
                        {lista.supermercado} • {lista.totalIngredientes} ingredientes
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${getEstadoColor(
                        lista.estado
                      )}`}
                    >
                      {lista.estado.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Calendar className="w-4 h-4" />
                      <span>Creada: {lista.fechaCreacion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Calendar className="w-4 h-4" />
                      <span>Compra: {lista.fechaCompra}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => onSeleccionarCliente?.(lista.clienteId)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalles
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2">
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2">
                      <Send className="w-4 h-4" />
                      Enviar
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-2 ml-auto">
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {listas.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#F1F5F9] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-[#94A3B8]" />
            </div>
            <h3 className="text-xl font-semibold text-[#64748B] mb-2">
              No hay listas activas
            </h3>
            <p className="text-[#94A3B8] mb-6">
              Genera una lista de compra personalizada para empezar
            </p>
            <button
              onClick={onGenerarNueva}
              className="inline-flex items-center px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
            >
              + Crear Primera Lista
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

