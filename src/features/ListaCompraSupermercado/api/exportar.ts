import { ListaCompra } from './lista-compra';

/**
 * Exportar lista de compra a PDF
 */
export async function exportarListaPDF(lista: ListaCompra): Promise<Blob> {
  try {
    // TODO: Implementar generación de PDF con librería como jsPDF
    console.log('Exportando lista a PDF:', lista);
    
    // Por ahora, simulamos la generación de PDF
    const pdfContent = `
      Lista de Compra
      Cliente: ${lista.cliente_id}
      Fecha: ${lista.fecha_compra}
      
      Ingredientes:
      ${lista.ingredientes.map(ing => `- ${ing.nombre}: ${ing.cantidad}`).join('\n')}
    `;
    
    return new Blob([pdfContent], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error al exportar lista a PDF:', error);
    throw error;
  }
}

/**
 * Exportar lista de compra a formato de texto
 */
export function exportarListaTexto(lista: ListaCompra): string {
  try {
    let texto = `🛒 LISTA DE COMPRA\n`;
    texto += `═══════════════════════════════\n\n`;
    texto += `📅 Fecha de compra: ${lista.fecha_compra}\n`;
    texto += `👥 Personas: ${lista.num_personas}\n`;
    texto += `🏪 Supermercado: ${lista.supermercado}\n\n`;
    
    // Agrupar por sección
    const ingredientesPorSeccion = lista.ingredientes.reduce((acc, ing) => {
      if (!acc[ing.seccion]) {
        acc[ing.seccion] = [];
      }
      acc[ing.seccion].push(ing);
      return acc;
    }, {} as Record<string, typeof lista.ingredientes>);
    
    // Generar lista por sección
    Object.entries(ingredientesPorSeccion).forEach(([seccion, ingredientes]) => {
      texto += `\n📍 ${seccion.toUpperCase()}\n`;
      texto += `───────────────────────────────\n`;
      ingredientes.forEach((ing) => {
        texto += `☐ ${ing.nombre} - ${ing.cantidad}`;
        if (ing.precio_estimado) {
          texto += ` (€${ing.precio_estimado.toFixed(2)})`;
        }
        texto += '\n';
      });
    });
    
    // Ingredientes extra
    if (lista.ingredientes_extra && lista.ingredientes_extra.length > 0) {
      texto += `\n📍 INGREDIENTES ADICIONALES\n`;
      texto += `───────────────────────────────\n`;
      lista.ingredientes_extra.forEach((ing) => {
        texto += `☐ ${ing}\n`;
      });
    }
    
    return texto;
  } catch (error) {
    console.error('Error al exportar lista a texto:', error);
    throw error;
  }
}

/**
 * Exportar lista de compra a CSV
 */
export function exportarListaCSV(lista: ListaCompra): string {
  try {
    let csv = 'Sección,Ingrediente,Cantidad,Precio Estimado,Comprado\n';
    
    lista.ingredientes.forEach((ing) => {
      csv += `"${ing.seccion}","${ing.nombre}","${ing.cantidad}",`;
      csv += `"${ing.precio_estimado || ''}","${ing.comprado ? 'Sí' : 'No'}"\n`;
    });
    
    return csv;
  } catch (error) {
    console.error('Error al exportar lista a CSV:', error);
    throw error;
  }
}

/**
 * Enviar lista de compra por email
 */
export async function enviarListaPorEmail(
  lista: ListaCompra,
  emailCliente: string
): Promise<void> {
  try {
    // TODO: Implementar envío de email con servicio como SendGrid o similar
    console.log('Enviando lista por email a:', emailCliente);
    
    const textoLista = exportarListaTexto(lista);
    
    // Aquí iría la lógica de envío de email
    // await emailService.send({
    //   to: emailCliente,
    //   subject: 'Tu lista de compra personalizada',
    //   body: textoLista,
    // });
    
    console.log('Email enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar lista por email:', error);
    throw error;
  }
}

/**
 * Generar enlace para compartir lista en app móvil
 */
export function generarEnlaceAppMovil(listaId: string): string {
  try {
    // Generar deep link para app móvil
    const baseUrl = 'fitoffice://lista-compra';
    return `${baseUrl}/${listaId}`;
  } catch (error) {
    console.error('Error al generar enlace de app móvil:', error);
    throw error;
  }
}

/**
 * Descargar lista como archivo
 */
export function descargarLista(contenido: string | Blob, nombreArchivo: string, tipo: string): void {
  try {
    const blob = typeof contenido === 'string' 
      ? new Blob([contenido], { type: tipo })
      : contenido;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar lista:', error);
    throw error;
  }
}

/**
 * Imprimir lista de compra
 */
export function imprimirLista(lista: ListaCompra): void {
  try {
    const textoLista = exportarListaTexto(lista);
    
    const ventanaImpresion = window.open('', '', 'width=800,height=600');
    if (ventanaImpresion) {
      ventanaImpresion.document.write('<html><head><title>Lista de Compra</title>');
      ventanaImpresion.document.write('<style>');
      ventanaImpresion.document.write('body { font-family: monospace; white-space: pre-wrap; padding: 20px; }');
      ventanaImpresion.document.write('</style></head><body>');
      ventanaImpresion.document.write(textoLista);
      ventanaImpresion.document.write('</body></html>');
      ventanaImpresion.document.close();
      ventanaImpresion.print();
    }
  } catch (error) {
    console.error('Error al imprimir lista:', error);
    throw error;
  }
}

