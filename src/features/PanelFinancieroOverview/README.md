# Panel Financiero & Overview

## 💰 Descripción

Módulo de overview financiero completo para entrenadores y gimnasios con métricas diferenciadas. Proporciona una visión clara y en tiempo real de la salud financiera del negocio.

## 🎯 Objetivo

Proporcionar un sistema completo de overview financiero:
- **Para entrenadores**: Ingresos personales, clientes sin pagar, rendimiento mes actual
- **Para gimnasios**: Facturación total del centro, reparto por líneas (cuotas, PT, tienda), costes estructurales

## 📁 Estructura del Módulo

```
PanelFinancieroOverview/
├── components/
│   ├── PanelFinanciero.tsx           # Panel principal con métricas generales
│   ├── MetricasIngresos.tsx          # Análisis detallado de fuentes de ingresos
│   ├── GastosEstructurales.tsx       # Control de costes fijos y variables
│   ├── RendimientoMensual.tsx        # Comparación y evolución de resultados
│   ├── AlertasPagos.tsx              # Sistema de notificaciones de cobros pendientes
│   ├── AnalisisRentabilidad.tsx      # Métricas de eficiencia financiera
│   ├── ProyeccionesFinancieras.tsx   # Estimaciones y previsiones
│   └── ReportesPersonalizados.tsx    # Análisis específicos por usuario
├── pages/
│   └── PanelFinancieroOverviewPage.tsx
├── api/
│   ├── overview.ts                   # APIs principales de overview
│   ├── ingresos.ts                   # APIs específicas de ingresos
│   └── gastos.ts                     # APIs específicas de gastos
└── README.md
```

## 🧩 Componentes Principales

### PanelFinanciero
Panel principal que muestra:
- Ingresos totales del período
- Gastos totales del período
- Beneficio neto
- Tendencia comparada con período anterior

### MetricasIngresos
Análisis detallado de fuentes de ingresos:
- Desglose por servicios (para entrenadores)
- Reparto por líneas de negocio (para gimnasios)
- Porcentajes y visualización gráfica

### GastosEstructurales
Control y análisis de costes:
- Gastos fijos vs. variables
- Categorización por tipo
- Análisis de impacto en rentabilidad

### RendimientoMensual
Comparación temporal:
- Evolución de últimos meses
- Gráficos comparativos
- Tendencias de crecimiento

### AlertasPagos
Sistema de alertas:
- Clientes con pagos pendientes
- Niveles de urgencia (leve, moderado, grave)
- Total pendiente de cobro

### AnalisisRentabilidad
Métricas de eficiencia:
- Margen bruto y neto
- ROI (Retorno de inversión)
- Punto de equilibrio
- Objetivos vs. resultados

### ProyeccionesFinancieras
Estimaciones futuras:
- Proyecciones basadas en datos históricos
- Nivel de confianza de las predicciones
- Tasa de crecimiento estimada

### ReportesPersonalizados
Generación de informes:
- Diferentes tipos según tipo de usuario
- Múltiples formatos (PDF, Excel, CSV)
- Períodos personalizables

## 🔌 APIs Disponibles

### Endpoints Principales
```typescript
GET  /api/finanzas/overview          // Overview general
GET  /api/finanzas/ingresos          // Ingresos detallados
GET  /api/finanzas/gastos            // Gastos detallados
GET  /api/finanzas/rendimiento       // Rendimiento mensual
GET  /api/finanzas/alertas           // Alertas de pagos
GET  /api/finanzas/rentabilidad      // Análisis de rentabilidad
GET  /api/finanzas/proyecciones      // Proyecciones financieras
POST /api/finanzas/reportes          // Generar reportes
```

### APIs Específicas de Ingresos
```typescript
GET /api/finanzas/ingresos/detalle
GET /api/finanzas/ingresos/por-categoria
GET /api/finanzas/ingresos/comparativa
GET /api/finanzas/ingresos/top-clientes
```

### APIs Específicas de Gastos
```typescript
GET    /api/finanzas/gastos/detalle
GET    /api/finanzas/gastos/por-categoria
GET    /api/finanzas/gastos/comparativa
GET    /api/finanzas/gastos/pendientes
POST   /api/finanzas/gastos/registrar
PUT    /api/finanzas/gastos/:id
DELETE /api/finanzas/gastos/:id
```

## 🎨 Características de UI

- **Diseño responsivo**: Adaptado a diferentes tamaños de pantalla
- **Visualización de datos**: Gráficos y barras de progreso
- **Código de colores**: 
  - Verde: Ingresos, beneficios positivos
  - Rojo: Gastos, alertas
  - Amarillo/Naranja: Advertencias
  - Azul/Morado: Análisis y proyecciones
- **Estados visuales**: Diferentes niveles de urgencia y confianza

## 📊 Métricas por Tipo de Usuario

### Entrenadores
- Ingresos personales
- Clientes pendientes de pago
- Rendimiento individual
- Sesiones facturadas
- Tasa de retención

### Gimnasios
- Facturación total del centro
- Reparto por líneas de negocio
- Costes estructurales
- Análisis por departamentos
- Rentabilidad por servicio

## 🚀 Uso

1. El módulo se integra automáticamente en el menú lateral
2. Accesible desde la ruta `/panel-financiero-overview`
3. Los datos se cargan automáticamente al entrar
4. Los reportes se pueden generar desde el componente de reportes personalizados

## 🔄 Integración

El módulo está integrado en:
- `src/App.tsx`: Ruta registrada
- `src/components/Sidebar.tsx`: Enlace en el menú lateral con icono PieChart

## 📝 Notas

- Las proyecciones se basan en datos históricos
- Los resultados pueden variar según factores externos
- Se recomienda revisar regularmente las alertas de pagos
- Los reportes se generan bajo demanda

## 🎯 User Stories Cubiertas

### Para Entrenadores
- ✅ Ver ingresos del mes
- ✅ Saber quién no ha pagado
- ✅ Comparar rendimiento mensual
- ✅ Recibir alertas de impagos
- ✅ Ver servicios más rentables
- ✅ Proyectar ingresos futuros

### Para Gimnasios
- ✅ Ver facturación total
- ✅ Reparto por líneas de negocio
- ✅ Controlar costes estructurales
- ✅ Analizar servicios rentables
- ✅ Recibir alertas de rentabilidad
- ✅ Proyecciones a largo plazo

