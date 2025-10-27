# Recursos, Salas & Material

Sistema de gestión de recursos físicos, salas y material para gimnasios y centros.

## 📋 Descripción

Este módulo proporciona un sistema completo de gestión de recursos físicos para gimnasios y centros deportivos. Específico para gimnasios/centros. No aplica a un entrenador que trabaja solo.

## 🎯 Objetivo

Optimizar la utilización de espacios y recursos físicos del centro mediante:
- Gestión de salas y control de aforo
- Control de material y equipamiento
- Bloqueos por mantenimiento
- Sistema de reservas
- Mantenimiento preventivo
- Analytics de utilización

## 📁 Estructura

```
RecursosSalasMaterial/
├── pages/
│   └── RecursosSalasMaterialPage.tsx    # Página principal con tabs
├── components/
│   ├── GestorRecursos.tsx               # Gestión general de recursos
│   ├── SalasDisponibles.tsx             # Visualización de salas disponibles
│   ├── ControlAforo.tsx                 # Control de capacidad por sala
│   ├── BloqueosMantenimiento.tsx        # Gestión de bloqueos
│   ├── MaterialDisponible.tsx           # Inventario de material
│   ├── ReservasSalas.tsx                # Sistema de reservas
│   ├── MantenimientoPreventivo.tsx      # Programación de mantenimientos
│   └── AnalyticsRecursos.tsx            # Métricas de utilización
└── api/
    ├── recursos.ts                      # APIs de recursos y salas
    ├── bloqueos.ts                      # APIs de bloqueos
    ├── reservas.ts                      # APIs de reservas
    └── mantenimiento.ts                 # APIs de mantenimiento
```

## ✨ Funcionalidades Principales

### 1. Gestión de Recursos
- Control y administración de espacios del centro
- Registro de salas y material
- Categorización por tipo de recurso

### 2. Salas Disponibles
- Visualización en tiempo real
- Información de aforo y equipamiento
- Horarios de disponibilidad

### 3. Control de Aforo
- Límites de capacidad por sala
- Monitoreo en tiempo real
- Alertas de aforo completo
- Cumplimiento de normativas

### 4. Bloqueos por Mantenimiento
- Gestión de mantenimiento y reparaciones
- Priorización de tareas
- Control de costos
- Historial de bloqueos

### 5. Material Disponible
- Inventario de equipamiento
- Estado y disponibilidad
- Alertas de stock bajo
- Programación de mantenimientos

### 6. Reservas de Espacios
- Sistema de reserva de salas
- Confirmación de reservas
- Gestión de participantes
- Verificación de disponibilidad

### 7. Mantenimiento Preventivo
- Programación de mantenimientos
- Tareas recurrentes (diario, semanal, mensual, etc.)
- Alertas de mantenimientos pendientes
- Control de costos y responsables

### 8. Analytics de Recursos
- Métricas de utilización
- Recursos más usados
- Ocupación por franja horaria
- Insights y recomendaciones

## 🏗️ Tipos de Salas Soportadas

- Sala de Musculación
- Sala de Cardio
- Sala de Spinning
- Sala de Yoga/Pilates
- Sala de Boxeo/Artes Marciales
- Sala de CrossFit
- Sala de Fisioterapia
- Sala de Nutrición

## 📊 Tipos de Datos

### Recurso
```typescript
interface Recurso {
  id: string;
  nombre: string;
  tipo: 'sala' | 'material';
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'bloqueado';
  categoria?: string;
  descripcion?: string;
  aforo?: number;
  ubicacion?: string;
  fechaCreacion: Date;
  fechaActualizacion?: Date;
}
```

### Sala
```typescript
interface Sala extends Recurso {
  tipo: 'sala';
  aforo: number;
  tipoSala: 'musculacion' | 'cardio' | 'spinning' | 'yoga' | 'boxeo' | 'crossfit' | 'fisioterapia' | 'nutricion';
  horarioDisponibilidad: {
    desde: string;
    hasta: string;
  };
  equipamiento: string[];
  superficie: number;
}
```

### Material
```typescript
interface Material extends Recurso {
  tipo: 'material';
  cantidad: number;
  cantidadDisponible: number;
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'dañado';
  ultimoMantenimiento?: Date;
  proximoMantenimiento?: Date;
}
```

## 🔗 Integración

El módulo está integrado en:
- `/src/App.tsx` - Ruta: `/recursos-salas-material`
- `/src/components/Sidebar.tsx` - Menú de navegación

## 💡 Notas

Este módulo es específico para gimnasios y centros que manejan múltiples espacios físicos y equipamiento. Los entrenadores personales que trabajan solos no necesitan este módulo porque no gestionan salas ni material compartido.

## 🚀 Estado

✅ Módulo completamente implementado
✅ 8 componentes funcionales
✅ 4 archivos API con tipos TypeScript
✅ Integrado en App y Sidebar
✅ Sin errores de linter

