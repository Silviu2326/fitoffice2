import { useState } from 'react';
import { FileText, Plus, Filter, Download } from 'lucide-react';
import CreadorFactura from './CreadorFactura';
import GestorCobros from './GestorCobros';
import RecordatoriosPago from './RecordatoriosPago';
import SeguimientoEstados from './SeguimientoEstados';
import ReportesFacturacion from './ReportesFacturacion';

interface Factura {
  id: string;
  numeroFactura: string;
  cliente: string;
  fecha: string;
  vencimiento: string;
  importe: number;
  estado: 'pendiente' | 'pagada' | 'vencida' | 'cancelada';
  concepto: string;
}

export default function FacturacionManager() {
  const [mostrarCreador, setMostrarCreador] = useState(false);
  const [vistaActual, setVistaActual] = useState<'lista' | 'cobros' | 'recordatorios' | 'reportes'>('lista');
  const [facturas, setFacturas] = useState<Factura[]>([
    {
      id: '1',
      numeroFactura: 'FAC-2025-001',
      cliente: 'Juan Pérez',
      fecha: '2025-10-01',
      vencimiento: '2025-10-15',
      importe: 150.00,
      estado: 'pagada',
      concepto: 'Plan de entrenamiento mensual'
    },
    {
      id: '2',
      numeroFactura: 'FAC-2025-002',
      cliente: 'María González',
      fecha: '2025-10-05',
      vencimiento: '2025-10-20',
      importe: 200.00,
      estado: 'pendiente',
      concepto: 'Plan personalizado + nutrición'
    },
    {
      id: '3',
      numeroFactura: 'FAC-2025-003',
      cliente: 'Carlos Rodríguez',
      fecha: '2025-09-25',
      vencimiento: '2025-10-10',
      importe: 180.00,
      estado: 'vencida',
      concepto: 'Entrenamiento personal - Paquete 8 sesiones'
    }
  ]);

  const agregarFactura = (nuevaFactura: Omit<Factura, 'id'>) => {
    const factura: Factura = {
      ...nuevaFactura,
      id: Date.now().toString()
    };
    setFacturas([factura, ...facturas]);
    setMostrarCreador(false);
  };

  const actualizarEstadoFactura = (id: string, nuevoEstado: Factura['estado']) => {
    setFacturas(facturas.map(f => f.id === id ? { ...f, estado: nuevoEstado } : f));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[30px] leading-[38px] font-bold text-[#F1F5F9] mb-2">Facturación & Cobros</h2>
          <p className="text-[16px] leading-[24px] text-[#94A3B8]">Sistema universal de facturación y gestión de cobros</p>
        </div>
        <button
          onClick={() => setMostrarCreador(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6366F1] text-white text-[16px] font-semibold rounded-xl hover:bg-[#4F46E5] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Factura
        </button>
      </div>

      {/* Navegación de vistas */}
      <div className="flex gap-2 border-b border-[#334155]">
        <button
          onClick={() => setVistaActual('lista')}
          className={`px-4 py-2 text-[16px] font-medium transition-all duration-200 ${
            vistaActual === 'lista'
              ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
              : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          <FileText className="w-5 h-5 inline mr-2" />
          Lista de Facturas
        </button>
        <button
          onClick={() => setVistaActual('cobros')}
          className={`px-4 py-2 text-[16px] font-medium transition-all duration-200 ${
            vistaActual === 'cobros'
              ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
              : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Gestión de Cobros
        </button>
        <button
          onClick={() => setVistaActual('recordatorios')}
          className={`px-4 py-2 text-[16px] font-medium transition-all duration-200 ${
            vistaActual === 'recordatorios'
              ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
              : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Recordatorios
        </button>
        <button
          onClick={() => setVistaActual('reportes')}
          className={`px-4 py-2 text-[16px] font-medium transition-all duration-200 ${
            vistaActual === 'reportes'
              ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
              : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Reportes
        </button>
      </div>

      {/* Modal Creador de Factura */}
      {mostrarCreador && (
        <CreadorFactura
          onClose={() => setMostrarCreador(false)}
          onGuardar={agregarFactura}
        />
      )}

      {/* Contenido según vista actual */}
      {vistaActual === 'lista' && (
        <SeguimientoEstados 
          facturas={facturas}
          onActualizarEstado={actualizarEstadoFactura}
        />
      )}
      {vistaActual === 'cobros' && (
        <GestorCobros 
          facturas={facturas}
          onActualizarEstado={actualizarEstadoFactura}
        />
      )}
      {vistaActual === 'recordatorios' && <RecordatoriosPago facturas={facturas} />}
      {vistaActual === 'reportes' && <ReportesFacturacion facturas={facturas} />}
    </div>
  );
}

