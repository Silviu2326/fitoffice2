# Pagos Pendientes & Morosidad

> ⚠️ Sistema de gestión de morosidad y pagos pendientes para entrenadores y gimnasios

## Objetivo

Proporcionar un sistema completo de gestión de morosidad y pagos pendientes. Funcionalidades clave: "¿Quién me debe dinero ahora mismo?", seguimiento de pagos vencidos, alertas de morosidad, gestión de recordatorios. Este módulo optimiza la recuperación de cobros y minimiza las pérdidas por morosidad.

## Estructura del Módulo

```
PagosPendientesMorosidad/
├── api/
│   ├── morosidad.ts          # Gestión de pagos vencidos y estadísticas
│   ├── recordatorios.ts      # Sistema de recordatorios automáticos
│   └── seguimiento.ts        # Seguimiento y clasificación de riesgo
├── components/
│   ├── DashboardMorosidad.tsx       # Vista general del sistema
│   ├── MorosidadList.tsx            # Lista principal de pagos vencidos
│   ├── AlertasVencidos.tsx          # Sistema de alertas por nivel
│   ├── GestorRecordatorios.tsx      # Gestión de recordatorios
│   ├── SeguimientoPagos.tsx         # Control de acciones de cobro
│   ├── ReportesMorosidad.tsx        # Análisis y reportes
│   ├── ClasificadorRiesgo.tsx       # Evaluación de riesgo por cliente
│   └── EstrategiasCobro.tsx         # Protocolos diferenciados
├── pages/
│   └── PagosPendientesMorosidadPage.tsx
└── index.ts
```

## Niveles de Morosidad

El sistema clasifica automáticamente los pagos vencidos en 5 niveles:

- 🟢 **Verde (1-7 días)**: Retraso leve, recordatorio amigable
- 🟡 **Amarillo (8-15 días)**: Retraso moderado, recordatorio firme
- 🟠 **Naranja (16-30 días)**: Retraso alto, recordatorio urgente
- 🔴 **Rojo (31-60 días)**: Morosidad crítica, gestión especial
- ⚫ **Negro (+60 días)**: Morosidad extrema, gestión legal

## Componentes Principales

### 1. Dashboard de Morosidad
Vista general con métricas clave, alertas críticas y distribución por niveles.

### 2. Lista de Morosidad
Responde a la pregunta: "¿Quién me debe dinero ahora mismo?" con filtros por nivel de severidad.

### 3. Alertas de Vencidos
Sistema de notificaciones automáticas que genera alertas según el nivel de morosidad.

### 4. Gestor de Recordatorios
Sistema escalonado de recordatorios automáticos con plantillas diferenciadas.

### 5. Seguimiento de Pagos
Control detallado de todas las acciones de cobro realizadas.

### 6. Reportes de Morosidad
Análisis completo de la situación financiera con estadísticas detalladas.

### 7. Clasificador de Riesgo
Evaluación de probabilidad de cobro basada en:
- Historial de pagos
- Días promedio de retraso
- Número de incumplimientos
- Monto total de deuda
- Tasa de respuesta

### 8. Estrategias de Cobro
Protocolos diferenciados por nivel de morosidad con acciones específicas.

## APIs Disponibles

### Morosidad
```typescript
obtenerPagosVencidos()           // Lista de pagos vencidos
obtenerEstadisticasMorosidad()   // Estadísticas generales
actualizarEstadoPago()           // Cambiar estado de un pago
marcarPagoCobrado()              // Marcar como cobrado
calcularDiasRetraso()            // Calcular días de retraso
determinarNivelMorosidad()       // Determinar nivel de severidad
```

### Recordatorios
```typescript
enviarRecordatorio()              // Enviar recordatorio a cliente
obtenerRecordatoriosPago()        // Historial de recordatorios
obtenerRecordatoriosPendientes()  // Recordatorios por enviar
marcarRecordatorioLeido()        // Marcar como leído
registrarRespuestaRecordatorio() // Registrar respuesta del cliente
```

### Seguimiento
```typescript
registrarAccionSeguimiento()     // Registrar acción de cobro
obtenerSeguimientoPago()         // Historial de seguimiento
obtenerSeguimientoCliente()      // Seguimiento por cliente
calcularClasificacionRiesgo()    // Evaluar riesgo del cliente
obtenerAccionesPendientes()      // Acciones pendientes
programarSeguimiento()           // Programar próxima acción
```

## Flujo de Trabajo

1. **Identificación**: El sistema identifica automáticamente las facturas vencidas
2. **Clasificación**: Calcula días de retraso y asigna nivel de morosidad
3. **Alertas**: Genera alertas automáticas según el nivel
4. **Recordatorios**: Envía recordatorios escalonados
5. **Seguimiento**: Registra todas las acciones de cobro
6. **Evaluación**: Clasifica el riesgo de cada cliente
7. **Estrategia**: Aplica protocolos diferenciados
8. **Monitoreo**: Analiza resultados y genera reportes

## Características Destacadas

- ✅ Vista unificada de todos los pagos pendientes
- ✅ Sistema de alertas automáticas por nivel de morosidad
- ✅ Recordatorios escalonados con plantillas personalizadas
- ✅ Clasificación de riesgo basada en múltiples factores
- ✅ Estrategias diferenciadas de cobro
- ✅ Seguimiento detallado de todas las acciones
- ✅ Reportes ejecutivos con estadísticas
- ✅ Integración con sistema de facturación

## Uso

### Importación
```typescript
import { PagosPendientesMorosidadPage } from '@/features/PagosPendientesMorosidad';
```

### Ruta
```
/pagos-pendientes-morosidad
```

## Integración con Supabase

El módulo requiere las siguientes tablas en Supabase:

- `pagos_pendientes`: Registro de pagos vencidos
- `recordatorios_morosidad`: Historial de recordatorios
- `seguimiento_morosidad`: Acciones de cobro realizadas

## Notas Importantes

> 💡 "Le duele igual al entrenador y al gym" - La gestión de morosidad es crítica para la salud financiera de cualquier negocio. Este sistema permite identificar rápidamente quién debe dinero, clasificar el riesgo y ejecutar estrategias diferenciadas según la gravedad de cada caso.

## Próximas Mejoras

- [ ] Integración con pasarelas de pago
- [ ] Automatización de envío de recordatorios por WhatsApp/SMS
- [ ] Generación de documentos legales
- [ ] Dashboard predictivo con IA
- [ ] Integración con sistemas de cobranza externos

