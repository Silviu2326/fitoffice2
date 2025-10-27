# Módulo Resumen General

## 📊 Descripción

Panel principal de control y métricas del sistema FitOffice. Proporciona una vista general del estado del negocio, métricas clave y acceso rápido a las funcionalidades más importantes para entrenadores personales y gimnasios.

## 🎯 Objetivo

Proporcionar una vista general del estado del negocio, métricas clave y acceso rápido a las funcionalidades más importantes. El resumen general se adapta automáticamente según el tipo de usuario, mostrando información relevante y personalizada para cada rol.

## 📁 Estructura del Módulo

```
ResumenGeneral/
├── pages/
│   └── ResumenGeneralPage.tsx       # Página principal del módulo
├── components/
│   ├── DashboardOverview.tsx        # Vista general de métricas principales
│   ├── QuickActions.tsx             # Accesos rápidos a módulos del sistema
│   ├── AlertsPanel.tsx              # Panel de alertas y notificaciones
│   ├── MetricsChart.tsx             # Gráficos de rendimiento y tendencias
│   ├── RecentActivity.tsx           # Actividad reciente del sistema
│   ├── TasksWidget.tsx              # Widget de tareas pendientes
│   ├── FinancialSummary.tsx         # Resumen financiero personalizado
│   └── ClientStatus.tsx             # Estado de clientes/leads activos
├── api/
│   └── dashboard.ts                 # Funciones de API para el dashboard
└── README.md                        # Este archivo
```

## 🧩 Componentes Principales

### DashboardOverview
Muestra las métricas principales del negocio en tarjetas:
- Clientes Activos
- Sesiones de Hoy
- Ingresos del Mes
- Tasa de Adherencia

### QuickActions
Panel de accesos rápidos a funcionalidades clave:
- Nuevo Cliente
- Agendar Sesión
- Nueva Factura
- Asignar Entreno
- Asignar Dieta
- Registrar Pago

### AlertsPanel
Sistema de notificaciones inteligentes que muestra:
- Pagos pendientes
- Check-ins sin realizar
- Objetivos cumplidos
- Alertas del sistema

### MetricsChart
Gráfico de rendimiento semanal que visualiza:
- Tasa de ocupación de sesiones
- Tendencias de asistencia
- Comparativa semanal

### RecentActivity
Registro de actividad reciente:
- Nuevos clientes registrados
- Sesiones completadas
- Pagos recibidos
- Planes asignados

### TasksWidget
Lista de tareas del día con:
- Prioridades (alta, media, baja)
- Estado de completado
- Contador de tareas pendientes

### FinancialSummary
Resumen financiero completo:
- Ingresos totales
- Gastos totales
- Beneficio neto
- Transacciones recientes

### ClientStatus
Estado de los clientes:
- Total de clientes
- Clientes activos
- Clientes inactivos
- Nuevos clientes del mes
- Lista de clientes recientes

## 🔌 APIs Implementadas

```typescript
// Obtener métricas del dashboard
GET /api/dashboard/metrics

// Obtener alertas
GET /api/dashboard/alerts

// Obtener estadísticas rápidas
GET /api/dashboard/quick-stats

// Obtener tareas
GET /api/dashboard/tasks

// Obtener resumen financiero
GET /api/dashboard/financial-summary

// Obtener estado de clientes
GET /api/dashboard/client-status

// Refrescar dashboard
POST /api/dashboard/refresh

// Actualizar preferencias
PUT /api/dashboard/preferences
```

## 🚀 Funcionalidades

### Personalización por Rol

#### Para Entrenadores Personales 🧍
- Clientes activos personales
- Ingresos personales del mes
- Sesiones del día
- Tareas pendientes
- Alertas sobre clientes sin check-in
- Progreso de clientes

#### Para Gimnasios/Centros 🏢
- Ocupación del centro
- Facturación del día
- Incidencias del centro
- Leads nuevos
- Alertas de equipos rotos
- Ocupación de clases

### Características Clave
- ✅ Actualización en tiempo real
- ✅ Métricas adaptativas por rol
- ✅ Panel de alertas inteligentes
- ✅ Accesos rápidos contextuales
- ✅ Gráficos de rendimiento
- ✅ Resumen financiero detallado
- ✅ Seguimiento de actividad

## 🔗 Integración

El módulo está integrado en:
- **App.tsx**: Ruta `/resumen-general`
- **Sidebar.tsx**: Enlace "Resumen General" con icono Home

## 📝 Notas de Desarrollo

> 💡 El resumen general es la página más importante del sistema ya que es el punto de entrada principal. Se adapta automáticamente según el tipo de usuario (entrenador personal vs gimnasio) mostrando métricas, alertas y funcionalidades relevantes para cada rol.

### Próximas Mejoras
- [ ] Implementar conexión real con backend
- [ ] Añadir más gráficos de análisis
- [ ] Implementar filtros por fecha
- [ ] Añadir exportación de reportes
- [ ] Implementar notificaciones push
- [ ] Añadir widgets personalizables

## 🎨 Diseño

- Fondo: `bg-slate-950`
- Tarjetas: `bg-slate-900` con bordes `border-slate-800`
- Colores de gradientes para iconos según categoría
- Hover states para mejor UX
- Responsive design (grid adaptativo)

## 📦 Dependencias

- React Router (navegación)
- Lucide React (iconos)
- TailwindCSS (estilos)

