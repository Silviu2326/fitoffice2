import { Download, FileText, Mail, Smartphone, Printer } from 'lucide-react';

interface ExportListaProps {
  lista: any;
}

export default function ExportLista({ lista }: ExportListaProps) {
  const handleExport = (formato: string) => {
    console.log(`Exportando lista en formato: ${formato}`);
    // Implementar lógica de exportación
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="bg-[#F3E8FF] p-2 rounded-lg">
            <Download className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Exportar Lista</h2>
            <p className="text-sm text-[#64748B]">
              Múltiples formatos disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Opciones de Exportación */}
      <div className="p-6 space-y-3">
        <button
          onClick={() => handleExport('pdf')}
          className="w-full flex items-center gap-3 px-4 py-4 bg-white border border-[#E2E8F0] hover:border-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200 group"
        >
          <div className="bg-[#FEE2E2] p-2 rounded-lg group-hover:bg-white transition-all">
            <FileText className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-[#0F172A]">Descargar PDF</div>
            <div className="text-sm text-[#64748B]">Lista completa en formato imprimible</div>
          </div>
        </button>

        <button
          onClick={() => handleExport('email')}
          className="w-full flex items-center gap-3 px-4 py-4 bg-white border border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#DBEAFE] rounded-xl transition-all duration-200 group"
        >
          <div className="bg-[#DBEAFE] p-2 rounded-lg group-hover:bg-white transition-all">
            <Mail className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-[#0F172A]">Enviar por Email</div>
            <div className="text-sm text-[#64748B]">Enviar directamente al cliente</div>
          </div>
        </button>

        <button
          onClick={() => handleExport('app')}
          className="w-full flex items-center gap-3 px-4 py-4 bg-white border border-[#E2E8F0] hover:border-[#10B981] hover:bg-[#D1FAE5] rounded-xl transition-all duration-200 group"
        >
          <div className="bg-[#D1FAE5] p-2 rounded-lg group-hover:bg-white transition-all">
            <Smartphone className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-[#0F172A]">Enviar a App Móvil</div>
            <div className="text-sm text-[#64748B]">Disponible en la app del cliente</div>
          </div>
        </button>

        <button
          onClick={() => handleExport('print')}
          className="w-full flex items-center gap-3 px-4 py-4 bg-white border border-[#E2E8F0] hover:border-[#8B5CF6] hover:bg-[#F3E8FF] rounded-xl transition-all duration-200 group"
        >
          <div className="bg-[#F3E8FF] p-2 rounded-lg group-hover:bg-white transition-all">
            <Printer className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-[#0F172A]">Imprimir</div>
            <div className="text-sm text-[#64748B]">Formato optimizado para papel</div>
          </div>
        </button>

        {/* Info */}
        <div className="mt-4 bg-[#F3E8FF] border border-[#E9D5FF] rounded-xl p-4">
          <p className="text-sm text-[#8B5CF6]">
            💡 Las listas exportadas incluyen todos los ingredientes organizados por secciones,
            cantidades precisas y notas personalizadas del entrenador.
          </p>
        </div>
      </div>
    </div>
  );
}
