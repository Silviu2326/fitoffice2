import { useState, useEffect } from 'react';
import { Plus, FileText, Package, Check, X, Clock } from 'lucide-react';
import { 
  getOrdenesCompra, 
  createOrdenCompra,
  updateEstadoOrdenCompra,
  generarNumeroOrden,
  type OrdenCompra,
  type OrdenCompraItem 
} from '../api/categorias';
import { getProveedoresActivos, type Proveedor } from '../api/proveedores';

export default function OrdenesCompra() {
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<OrdenCompraItem[]>([{ descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordenesData, proveedoresData] = await Promise.all([
        getOrdenesCompra(),
        getProveedoresActivos()
      ]);
      setOrdenes(ordenesData);
      setProveedores(proveedoresData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;
    const numeroOrden = await generarNumeroOrden();

    const ordenData: Omit<OrdenCompra, 'id' | 'created_at' | 'updated_at'> = {
      numero_orden: numeroOrden,
      proveedor_id: formData.get('proveedor_id') as string,
      fecha_orden: formData.get('fecha_orden') as string,
      fecha_entrega_estimada: formData.get('fecha_entrega_estimada') as string || undefined,
      estado: 'pendiente',
      items,
      subtotal,
      iva,
      total,
      notas: formData.get('notas') as string || undefined,
    };

    try {
      await createOrdenCompra(ordenData);
      await loadData();
      setShowModal(false);
      setItems([{ descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
    } catch (error) {
      console.error('Error al crear orden:', error);
    }
  };

  const handleEstadoChange = async (id: string, nuevoEstado: OrdenCompra['estado']) => {
    try {
      await updateEstadoOrdenCompra(id, nuevoEstado);
      await loadData();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const addItem = () => {
    setItems([...items, { descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof OrdenCompraItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'cantidad' || field === 'precio_unitario') {
      newItems[index].total = newItems[index].cantidad * newItems[index].precio_unitario;
    }
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6366F1] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Órdenes de Compra</h2>
          <p className="text-[#64748B]">Gestiona tus pedidos a proveedores</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md"
        >
          <Plus className="w-5 h-5" />
          Nueva Orden
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#FEF3C7] p-5 rounded-xl border border-[#F59E0B]/20">
          <div className="flex items-center gap-3">
            <div className="bg-[#F59E0B] p-3 rounded-lg shadow-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {ordenes.filter(o => o.estado === 'pendiente').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#DBEAFE] p-5 rounded-xl border border-[#3B82F6]/20">
          <div className="flex items-center gap-3">
            <div className="bg-[#3B82F6] p-3 rounded-lg shadow-sm">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Enviadas</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {ordenes.filter(o => o.estado === 'enviada').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#D1FAE5] p-5 rounded-xl border border-[#10B981]/20">
          <div className="flex items-center gap-3">
            <div className="bg-[#10B981] p-3 rounded-lg shadow-sm">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Recibidas</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {ordenes.filter(o => o.estado === 'recibida').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FEE2E2] p-5 rounded-xl border border-[#EF4444]/20">
          <div className="flex items-center gap-3">
            <div className="bg-[#EF4444] p-3 rounded-lg shadow-sm">
              <X className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Canceladas</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {ordenes.filter(o => o.estado === 'cancelada').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {ordenes.map((orden) => {
          const proveedor = proveedores.find(p => p.id === orden.proveedor_id);
          return (
            <div key={orden.id} className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#6366F1] transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#EEF2FF] p-3 rounded-xl">
                    <FileText className="w-6 h-6 text-[#6366F1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">{orden.numero_orden}</h3>
                    <p className="text-[#64748B] text-sm">{proveedor?.nombre || 'Proveedor desconocido'}</p>
                    <p className="text-[#94A3B8] text-xs mt-1">
                      {new Date(orden.fecha_orden).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#0F172A]">€{orden.total.toFixed(2)}</p>
                  <select
                    value={orden.estado}
                    onChange={(e) => handleEstadoChange(orden.id, e.target.value as OrdenCompra['estado'])}
                    className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#6366F1] cursor-pointer ${
                      orden.estado === 'recibida' ? 'bg-[#D1FAE5] text-[#10B981]' :
                      orden.estado === 'enviada' ? 'bg-[#DBEAFE] text-[#3B82F6]' :
                      orden.estado === 'pendiente' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                      'bg-[#FEE2E2] text-[#EF4444]'
                    }`}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="enviada">Enviada</option>
                    <option value="recibida">Recibida</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-2">Items:</h4>
                {orden.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-[#64748B]">
                      {item.descripcion} <span className="text-[#94A3B8]">x{item.cantidad}</span>
                    </span>
                    <span className="text-[#0F172A] font-semibold">€{item.total.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Subtotal:</span>
                  <span className="text-[#0F172A] font-semibold">€{orden.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">IVA (21%):</span>
                  <span className="text-[#0F172A] font-semibold">€{orden.iva.toFixed(2)}</span>
                </div>
              </div>

              {orden.fecha_entrega_estimada && (
                <div className="mt-4 text-sm text-[#64748B] flex items-center gap-2">
                  <span>📦</span>
                  <span>Entrega estimada: {new Date(orden.fecha_entrega_estimada).toLocaleDateString('es-ES')}</span>
                </div>
              )}

              {orden.notas && (
                <div className="mt-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#64748B]">
                  <strong className="text-[#0F172A]">Notas:</strong> {orden.notas}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="text-xl font-bold text-[#0F172A]">Nueva Orden de Compra</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Proveedor *
                  </label>
                  <select
                    name="proveedor_id"
                    required
                    className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                  >
                    <option value="">Seleccionar proveedor</option>
                    {proveedores.map(prov => (
                      <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Fecha de Orden *
                  </label>
                  <input
                    type="date"
                    name="fecha_orden"
                    required
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Fecha de Entrega Estimada
                </label>
                <input
                  type="date"
                  name="fecha_entrega_estimada"
                  className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                />
              </div>

              {/* Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#0F172A]">Items *</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-semibold transition-colors"
                  >
                    + Añadir Item
                  </button>
                </div>
                
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Descripción"
                        value={item.descripcion}
                        onChange={(e) => updateItem(index, 'descripcion', e.target.value)}
                        required
                        className="w-full h-10 px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Cant."
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => updateItem(index, 'cantidad', parseFloat(e.target.value))}
                        required
                        className="w-full h-10 px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Precio"
                        step="0.01"
                        min="0"
                        value={item.precio_unitario}
                        onChange={(e) => updateItem(index, 'precio_unitario', parseFloat(e.target.value))}
                        required
                        className="w-full h-10 px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={`€${item.total.toFixed(2)}`}
                        disabled
                        className="w-full h-10 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#64748B] font-medium"
                      />
                    </div>
                    <div className="col-span-1">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="w-full h-10 px-3 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="border-t border-[#E2E8F0] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Subtotal:</span>
                  <span className="text-[#0F172A] font-semibold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">IVA (21%):</span>
                  <span className="text-[#0F172A] font-semibold">€{iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#0F172A]">Total:</span>
                  <span className="text-[#6366F1]">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Notas
                </label>
                <textarea
                  name="notas"
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setItems([{ descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
                  }}
                  className="px-6 py-3 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-lg font-semibold hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 shadow-md"
                >
                  Crear Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

