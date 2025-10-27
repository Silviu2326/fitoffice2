# Módulo de Facturación & Cobros

Sistema universal de facturación y gestión de cobros para entrenadores y gimnasios.

## Descripción

Este módulo automatiza y simplifica todo el proceso de facturación, desde la creación hasta el cobro, garantizando un flujo de caja eficiente y profesional.

## Estructura del Módulo

```
src/features/FacturacionCobros/
├── pages/
│   └── FacturacionCobrosPage.tsx      # Página principal del módulo
├── components/
│   ├── FacturacionManager.tsx          # Componente principal de gestión
│   ├── CreadorFactura.tsx              # Herramienta para crear nuevas facturas
│   ├── GestorCobros.tsx                # Sistema de gestión y seguimiento de cobros
│   ├── RecordatoriosPago.tsx           # Sistema de notificaciones automáticas
│   ├── ExportPDF.tsx                   # Generador de documentos PDF
│   ├── PlantillasFactura.tsx           # Sistema de plantillas personalizables
│   ├── SeguimientoEstados.tsx          # Control del ciclo de vida de facturas
│   └── ReportesFacturacion.tsx         # Análisis y reportes de facturación
└── api/
    ├── facturas.ts                     # API de gestión de facturas
    ├── cobros.ts                       # API de gestión de cobros
    └── recordatorios.ts                # API de gestión de recordatorios
```

## Funcionalidades Principales

### 1. Creación de Facturas
- Formulario completo con líneas de detalle
- Cálculo automático de subtotales, IVA y total
- Soporte para descuentos por línea
- Generación automática de número de factura

### 2. Gestión de Cobros
- Visualización de facturas pendientes
- Marcado de facturas como pagadas
- Seguimiento de facturas vencidas
- Estadísticas de cobros

### 3. Recordatorios de Pago
- Recordatorios automáticos programados
- Envío manual de recordatorios
- Historial de recordatorios enviados
- Personalización de mensajes

### 4. Seguimiento de Estados
- Vista completa de todas las facturas
- Estados: Pendiente, Pagada, Vencida, Cancelada
- Exportación a PDF por factura
- Búsqueda y filtrado

### 5. Reportes y Análisis
- Total facturado y cobrado
- Tasa de cobro y morosidad
- Análisis del mes actual
- Distribución por estado
- Top clientes por facturación

## Componentes

### FacturacionManager
Componente principal que coordina todas las vistas del módulo.

**Props:**
- Ninguna (gestiona su propio estado)

**Vistas:**
- Lista de Facturas
- Gestión de Cobros
- Recordatorios
- Reportes

### CreadorFactura
Modal para crear nuevas facturas.

**Props:**
```typescript
interface CreadorFacturaProps {
  onClose: () => void;
  onGuardar: (factura: any) => void;
}
```

### GestorCobros
Vista de gestión de cobros pendientes.

**Props:**
```typescript
interface GestorCobrosProps {
  facturas: Factura[];
  onActualizarEstado: (id: string, nuevoEstado: Factura['estado']) => void;
}
```

### RecordatoriosPago
Gestión de recordatorios automáticos y manuales.

**Props:**
```typescript
interface RecordatoriosPagoProps {
  facturas: Factura[];
}
```

### SeguimientoEstados
Vista completa del ciclo de vida de facturas.

**Props:**
```typescript
interface SeguimientoEstadosProps {
  facturas: Factura[];
  onActualizarEstado: (id: string, nuevoEstado: Factura['estado']) => void;
}
```

### ReportesFacturacion
Dashboard de análisis y métricas.

**Props:**
```typescript
interface ReportesFacturacionProps {
  facturas: Factura[];
}
```

## Tipos de Datos

### Factura
```typescript
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
```

### LineaFactura
```typescript
interface LineaFactura {
  concepto: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
}
```

## APIs Requeridas

```bash
# Facturas
GET    /api/finanzas/facturas
POST   /api/finanzas/facturas
PUT    /api/finanzas/facturas/:id
DELETE /api/finanzas/facturas/:id

# Cobros
POST   /api/finanzas/cobros
GET    /api/finanzas/cobros

# Recordatorios
GET    /api/finanzas/recordatorios
POST   /api/finanzas/recordatorios

# Exportación
POST   /api/finanzas/exportar-pdf
```

## Integración

### Ruta
```typescript
// En App.tsx
import FacturacionCobrosPage from './features/FacturacionCobros/pages/FacturacionCobrosPage';

<Route path="/facturacion-cobros" element={<FacturacionCobrosPage />} />
```

### Sidebar
```typescript
// En Sidebar.tsx
import { FileText } from 'lucide-react';

<Link to="/facturacion-cobros">
  <FileText className="w-5 h-5" />
  <span>Facturación & Cobros</span>
</Link>
```

## Próximas Mejoras

- [ ] Integración real con backend
- [ ] Generación real de PDFs
- [ ] Envío de emails automáticos
- [ ] Plantillas de factura personalizables
- [ ] Integración con pasarelas de pago
- [ ] Exportación masiva a Excel/CSV
- [ ] Facturación recurrente automática
- [ ] Notificaciones push
- [ ] Firma digital de facturas
- [ ] Multi-idioma y multi-divisa

## Notas

- Los datos actualmente son de ejemplo (mock data)
- Las llamadas API están preparadas pero pendientes de implementación
- El módulo es completamente funcional en frontend
- Diseño responsive y accesible
- Estilo consistente con el resto de la aplicación

