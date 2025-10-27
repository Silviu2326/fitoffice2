import { Download, FileText } from 'lucide-react';

interface ExportPDFProps {
  facturaId: string;
  numeroFactura: string;
}

export default function ExportPDF({ facturaId, numeroFactura }: ExportPDFProps) {
  const generarPDF = () => {
    // Aquí iría la lógica real para generar el PDF
    // Por ahora simulamos la descarga
    console.log(`Generando PDF para factura ${numeroFactura}`);
    alert(`PDF de ${numeroFactura} generado correctamente`);
  };

  return (
    <button
      onClick={generarPDF}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white text-[14px] font-medium rounded-lg hover:bg-[#2563EB] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
      title="Descargar PDF"
    >
      <Download className="w-4 h-4" />
      PDF
    </button>
  );
}

