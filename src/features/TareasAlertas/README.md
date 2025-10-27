# Módulo Tareas & Alertas

## Descripción
Sistema inteligente de gestión de tareas y alertas personalizadas que se adapta automáticamente al tipo de usuario (entrenador personal vs gimnasio). El sistema prioriza las tareas más importantes y envía alertas relevantes para optimizar la productividad y el seguimiento del negocio.

## Estructura de Carpetas

```
TareasAlertas/
├── components/
│   ├── TasksManager.tsx          # Gestor principal de tareas
│   ├── AlertsPanel.tsx           # Panel de alertas en tiempo real
│   ├── TaskCreator.tsx           # Creador de tareas personalizadas
│   ├── PriorityQueue.tsx         # Cola de tareas ordenada por prioridad
│   ├── NotificationCenter.tsx    # Centro de notificaciones y recordatorios
│   ├── TaskHistory.tsx           # Historial de tareas completadas
│   ├── AlertRules.tsx            # Configurador de reglas de alertas
│   └── TaskAssigner.tsx          # Asignador de tareas a usuarios
├── pages/
│   └── TareasAlertasPage.tsx     # Página principal del módulo
├── api/
│   ├── tasks.ts                  # API de tareas
│   ├── alerts.ts                 # API de alertas
│   ├── notifications.ts          # API de notificaciones
│   └── priority.ts               # Sistema de priorización
└── types/
    └── index.ts                  # Tipos TypeScript

```

## Componentes Principales

### TasksManager
Componente principal para gestionar tareas con:
- Filtrado por prioridad (alta, media, baja)
- Filtrado por estado (pendiente, en progreso, completada, reagendada)
- Marcado rápido de tareas completadas
- Visualización de fechas de vencimiento

### AlertsPanel
Panel de alertas que muestra:
- Alertas sin leer con indicador visual
- Diferentes tipos de alertas con iconos específicos
- Funcionalidad para marcar como leídas
- Opción para marcar todas como leídas

### TaskCreator
Formulario para crear nuevas tareas con:
- Título y descripción
- Prioridad (alta, media, baja)
- Fecha de vencimiento opcional
- Asignación de usuario opcional

### PriorityQueue
Vista de cola de prioridades que organiza tareas en tres columnas:
- Alta prioridad (rojo)
- Media prioridad (amarillo)
- Baja prioridad (azul)

### NotificationCenter
Centro de notificaciones con:
- Contador de notificaciones sin leer
- Lista de alertas recientes
- Filtros y configuración

### TaskHistory
Historial de tareas completadas mostrando:
- Fecha de completación
- Usuario asignado
- Información de la tarea

### AlertRules
Configurador de reglas de alertas con:
- Activación/desactivación de reglas
- Configuración de condiciones
- Prioridad de cada regla

### TaskAssigner
Asignador de tareas que permite:
- Ver tareas sin asignar
- Asignar tareas a usuarios disponibles
- Priorizar tareas por importancia

## Tipos de Datos

### Task
```typescript
{
  id: string;
  titulo: string;
  descripcion: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'en_progreso' | 'completada' | 'reagendada';
  asignado_a?: string;
  fecha_creacion: string;
  fecha_vencimiento?: string;
  tipo: string;
  relacionado_id?: string;
  completada_fecha?: string;
}
```

### Alert
```typescript
{
  id: string;
  tipo: AlertType;
  titulo: string;
  mensaje: string;
  prioridad: 'alta' | 'media' | 'baja';
  fecha: string;
  leida: boolean;
  relacionado_tipo?: string;
  relacionado_id?: string;
  accion_url?: string;
}
```

## Tipos de Alertas

- `cliente_sin_checkin`: Cliente no ha subido check-in
- `lead_sin_seguimiento`: Lead sin seguimiento
- `pago_pendiente`: Pago pendiente
- `factura_vencida`: Factura vencida
- `equipo_roto`: Equipo necesita mantenimiento
- `clase_supera_aforo`: Clase supera aforo máximo
- `personalizada`: Alerta personalizada

## APIs

### Tasks API
```typescript
- getTasks(): Promise<Task[]>
- createTask(task): Promise<Task>
- updateTask(taskId, updates): Promise<Task>
- deleteTask(taskId): Promise<void>
- getTasksByPriority(priority): Promise<Task[]>
- getAssignedTasks(userId): Promise<Task[]>
- completeTask(taskId): Promise<Task>
```

### Alerts API
```typescript
- getAlerts(): Promise<Alert[]>
- createAlert(alert): Promise<Alert>
- markAsRead(alertId): Promise<void>
- getAlertHistory(): Promise<Alert[]>
- getAlertRules(): Promise<AlertRule[]>
- toggleAlertRule(ruleId): Promise<AlertRule>
```

## Características Principales

1. **Priorización Automática**: Las tareas se priorizan automáticamente según:
   - Tipo de tarea (pagos/facturas = alta prioridad)
   - Fecha de vencimiento (< 2 días = alta, < 7 días = media)
   - Relación con clientes (media prioridad)

2. **Alertas Personalizadas por Rol**:
   - Entrenadores: alertas sobre clientes, leads, pagos personales
   - Gimnasios: alertas sobre facturas, equipos, aforo de clases

3. **Sistema de Notificaciones**:
   - Notificaciones inmediatas para alta prioridad
   - Recordatorios programados para media prioridad
   - Cola de tareas para baja prioridad

## Integración

El módulo está integrado en:
- **Ruta**: `/tareas-alertas`
- **Sidebar**: Entrada con icono CheckSquare
- **App.tsx**: Ruta registrada en el router

## Próximos Pasos

- [ ] Implementar integración con Supabase para persistencia
- [ ] Conectar con otros módulos (CRM, Facturación, etc.)
- [ ] Implementar notificaciones push
- [ ] Añadir filtros avanzados y búsqueda
- [ ] Implementar asignación masiva de tareas
- [ ] Añadir reportes y analytics de tareas

## Notas

Este módulo utiliza datos de ejemplo. Para producción, es necesario:
1. Implementar las llamadas a la API de Supabase en los archivos `api/*.ts`
2. Crear las tablas correspondientes en Supabase
3. Configurar el sistema de notificaciones (email, push, etc.)
4. Conectar con los eventos de otros módulos para generar alertas automáticas

