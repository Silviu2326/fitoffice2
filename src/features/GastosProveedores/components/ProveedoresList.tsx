import { useState } from 'react';
import { Plus, Search, Star, Mail, Phone, MapPin, Edit2, Trash2 } from 'lucide-react';

interface Proveedor {
  id: string;
  nombre: string;
  categoria: string;
  contacto: string;
  telefono: string;
  email: string;
  calificacion: number;
  totalCompras: number;
  ultimaCompra: string;
}

export default function ProveedoresList() {
  const [proveedores] = useState<Proveedor[]>([
    {
      id: '1',
      nombre: 'NutriPro',
      categoria: 'Suplementos',
      contacto: 'Juan García',
      telefono: '+34 666 123 456',
      email: 'info@nutripro.es',
      calificacion: 4.8,
      totalCompras: 12500,
      ultimaCompra: '2025-10-20'
    },
    {
      id: '2',
      nombre: 'TechFit',
      categoria: 'Mantenimiento',
      contacto: 'María López',
      telefono: '+34 677 234 567',
      email: 'contacto@techfit.es',
      calificacion: 4.5,
      totalCompras: 8300,
      ultimaCompra: '2025-10-15'
    },
    {
      id: '3',
      nombre: 'Iberdrola',
      categoria: 'Servicios',
      contacto: 'Servicio al Cliente',
      telefono: '+34 900 123 456',
      email: 'clientes@iberdrola.es',
      calificacion: 4.0,
      totalCompras: 3500,
      ultimaCompra: '2025-10-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-[#F59E0B] text-[#F59E0B]'
                : 'text-[#E2E8F0]'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-[#64748B]">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0]">
      {/* Header */}
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Gestión de Proveedores</h2>
            <p className="text-sm text-[#64748B] mt-1">
              {proveedores.length} proveedores registrados
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] transition-all duration-200 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nuevo Proveedor
          </button>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar proveedores por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
        </div>
      </div>

      {/* Formulario de nuevo proveedor */}
      {showForm && (
        <div className="p-6 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Registrar Nuevo Proveedor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del proveedor"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <select className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200">
              <option value="">Seleccionar categoría</option>
              <option value="suplementos">Suplementos</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="servicios">Servicios</option>
              <option value="equipamiento">Equipamiento</option>
              <option value="otros">Otros</option>
            </select>
            <input
              type="text"
              placeholder="Persona de contacto"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <input
              type="email"
              placeholder="Email"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Dirección"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] transition-all duration-200 shadow-md">
              Guardar Proveedor
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-lg font-semibold hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de proveedores */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProveedores.map((proveedor) => (
            <div
              key={proveedor.id}
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Header de la tarjeta */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#0F172A]">{proveedor.nombre}</h3>
                  <span className="inline-block px-3 py-1 bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold rounded-full mt-2">
                    {proveedor.categoria}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-[#3B82F6] hover:bg-[#DBEAFE] rounded-lg transition-all duration-200">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Calificación */}
              <div className="mb-4">
                {renderStars(proveedor.calificacion)}
              </div>

              {/* Información de contacto */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#64748B]">
                  <MapPin className="w-4 h-4" />
                  <span>{proveedor.contacto}</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <Phone className="w-4 h-4" />
                  <span>{proveedor.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{proveedor.email}</span>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="mt-4 pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">Total compras</p>
                  <p className="font-bold text-[#0F172A]">€{proveedor.totalCompras.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">Última compra</p>
                  <p className="font-bold text-[#0F172A]">
                    {new Date(proveedor.ultimaCompra).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
