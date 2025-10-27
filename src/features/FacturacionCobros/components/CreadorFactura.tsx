import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface LineaFactura {
  concepto: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
}

interface CreadorFacturaProps {
  onClose: () => void;
  onGuardar: (factura: any) => void;
}

export default function CreadorFactura({ onClose, onGuardar }: CreadorFacturaProps) {
  const [cliente, setCliente] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [vencimiento, setVencimiento] = useState('');
  const [lineas, setLineas] = useState<LineaFactura[]>([
    { concepto: '', cantidad: 1, precioUnitario: 0, descuento: 0 }
  ]);
  const [iva, setIva] = useState(21);

  const agregarLinea = () => {
    setLineas([...lineas, { concepto: '', cantidad: 1, precioUnitario: 0, descuento: 0 }]);
  };

  const eliminarLinea = (index: number) => {
    if (lineas.length > 1) {
      setLineas(lineas.filter((_, i) => i !== index));
    }
  };

  const actualizarLinea = (index: number, campo: keyof LineaFactura, valor: any) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index] = { ...nuevasLineas[index], [campo]: valor };
    setLineas(nuevasLineas);
  };

  const calcularSubtotal = (linea: LineaFactura) => {
    const subtotal = linea.cantidad * linea.precioUnitario;
    return subtotal - (subtotal * linea.descuento / 100);
  };

  const calcularTotal = () => {
    const subtotal = lineas.reduce((sum, linea) => sum + calcularSubtotal(linea), 0);
    const importeIva = subtotal * (iva / 100);
    return { subtotal, iva: importeIva, total: subtotal + importeIva };
  };

  const handleGuardar = () => {
    const { total } = calcularTotal();
    const factura = {
      numeroFactura: `FAC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      cliente,
      fecha,
      vencimiento,
      importe: total,
      estado: 'pendiente' as const,
      concepto: lineas.map(l => l.concepto).join(', ')
    };
    onGuardar(factura);
  };

  const totales = calcularTotal();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E1E2E] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#334155]">
          <h3 className="text-[24px] leading-[32px] font-semibold text-[#F1F5F9]">Nueva Factura</h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[14px] leading-[20px] font-medium text-[#F1F5F9] mb-2">
                Cliente *
              </label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full h-12 px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-xl text-[#F1F5F9] text-[16px] placeholder:text-[#64748B] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                placeholder="Nombre del cliente"
              />
            </div>
            <div>
              <label className="block text-[14px] leading-[20px] font-medium text-[#F1F5F9] mb-2">
                Fecha de emisión *
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full h-12 px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-xl text-[#F1F5F9] text-[16px] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[14px] leading-[20px] font-medium text-[#F1F5F9] mb-2">
                Fecha de vencimiento *
              </label>
              <input
                type="date"
                value={vencimiento}
                onChange={(e) => setVencimiento(e.target.value)}
                className="w-full h-12 px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-xl text-[#F1F5F9] text-[16px] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Líneas de factura */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Conceptos</h4>
              <button
                onClick={agregarLinea}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2A2A3A] text-[#6366F1] text-[14px] font-medium rounded-lg hover:bg-[#334155] transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Agregar línea
              </button>
            </div>

            <div className="space-y-3">
              {lineas.map((linea, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <label className="block text-[12px] leading-[16px] text-[#94A3B8] mb-1">Concepto</label>
                    <input
                      type="text"
                      value={linea.concepto}
                      onChange={(e) => actualizarLinea(index, 'concepto', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-lg text-[#F1F5F9] text-[14px] placeholder:text-[#64748B] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                      placeholder="Descripción del servicio/producto"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] leading-[16px] text-[#94A3B8] mb-1">Cantidad</label>
                    <input
                      type="number"
                      value={linea.cantidad}
                      onChange={(e) => actualizarLinea(index, 'cantidad', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-lg text-[#F1F5F9] text-[14px] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] leading-[16px] text-[#94A3B8] mb-1">Precio</label>
                    <input
                      type="number"
                      value={linea.precioUnitario}
                      onChange={(e) => actualizarLinea(index, 'precioUnitario', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-lg text-[#F1F5F9] text-[14px] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] leading-[16px] text-[#94A3B8] mb-1">Dto. %</label>
                    <input
                      type="number"
                      value={linea.descuento}
                      onChange={(e) => actualizarLinea(index, 'descuento', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#2A2A3A] border border-[#334155] rounded-lg text-[#F1F5F9] text-[14px] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => eliminarLinea(index)}
                      className="p-2 text-[#EF4444] hover:bg-[#2A2A3A] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={lineas.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totales */}
          <div className="border-t border-[#334155] pt-4">
            <div className="flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-[16px] text-[#F1F5F9]">
                  <span>Subtotal:</span>
                  <span className="font-semibold">€{totales.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[16px] text-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <span>IVA:</span>
                    <select
                      value={iva}
                      onChange={(e) => setIva(Number(e.target.value))}
                      className="px-3 py-1.5 bg-[#2A2A3A] border border-[#334155] rounded-lg text-[14px] text-[#F1F5F9] focus:border-[#6366F1] focus:outline-none transition-all duration-200"
                    >
                      <option value="0">0%</option>
                      <option value="4">4%</option>
                      <option value="10">10%</option>
                      <option value="21">21%</option>
                    </select>
                  </div>
                  <span className="font-semibold">€{totales.iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[18px] leading-[28px] font-bold border-t border-[#334155] pt-2">
                  <span className="text-[#F1F5F9]">TOTAL:</span>
                  <span className="text-[#10B981]">€{totales.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[#334155]">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#2A2A3A] text-[#F1F5F9] text-[16px] font-medium rounded-xl border border-[#334155] hover:bg-[#334155] transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={!cliente || !vencimiento || lineas.some(l => !l.concepto)}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] text-white text-[16px] font-semibold rounded-xl hover:bg-[#4F46E5] active:scale-[0.98] disabled:bg-[#64748B] disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Crear Factura
          </button>
        </div>
      </div>
    </div>
  );
}

