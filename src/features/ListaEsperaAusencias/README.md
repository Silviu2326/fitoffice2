# Lista de Espera & Ausencias

Sistema de gestión de lista de espera y ausencias para clases grupales con aforo limitado.

## Descripción

Módulo específico para gimnasios y centros con clases grupales que tienen aforo limitado. Proporciona herramientas completas para gestionar listas de espera, controlar ausencias, enviar notificaciones automáticas y analizar patrones de asistencia.

## Características Principales

### 1. Lista de Espera
- Sistema automático cuando las clases se llenan
- Gestión de posiciones en la lista
- Notificaciones automáticas cuando se liberan plazas
- Tiempo de respuesta configurable para confirmaciones
- Seguimiento de estado (en espera, notificado, confirmado, expirado)

### 2. Gestión de Ausencias
- Control de asistencia por clase
- Registro de diferentes tipos de ausencias:
  - No Show (sin presentarse)
  - Cancelaciones (con/sin aviso previo)
  - Tardanzas
- Sistema de penalizaciones configurable
- Justificación de ausencias

### 3. Notificaciones Automáticas
- Recordatorios 24h antes de la clase
- Recordatorios 2h antes de la clase
- Notificaciones de plazas disponibles
- Confirmaciones de reserva
- Avisos de penalizaciones
- Múltiples canales: Email, SMS, Push

### 4. Control de Aforo
- Monitoreo de capacidad por clase
- Visualización de tasas de ocupación
- Alertas de clases casi llenas o completas
- Recomendaciones de optimización
- Gestión de plazas disponibles

### 5. Analytics y Reportes
- Estadísticas de ausencias por período
- Identificación de socios con mayor ausencia
- Clases con mayor tasa de no-show
- Tendencias de asistencia
- ROI de penalizaciones
- Insights y recomendaciones

## Estructura de Archivos

```
ListaEsperaAusencias/
├── pages/
│   └── ListaEsperaAusenciasPage.tsx      # Página principal
├── components/
│   ├── ListaEspera.tsx                    # Gestión de lista de espera
│   ├── GestorAusencias.tsx                # Control de ausencias
│   ├── NotificacionesAutomaticas.tsx      # Sistema de notificaciones
│   ├── ControlAforo.tsx                   # Monitoreo de aforo
│   └── AnalyticsAusencias.tsx             # Análisis y reportes
├── api/
│   ├── lista-espera.ts                    # API de lista de espera
│   ├── ausencias.ts                       # API de ausencias
│   └── notificaciones.ts                  # API de notificaciones
└── README.md
```

## Componentes

### ListaEspera
Gestión completa de la lista de espera:
- Visualización de personas en espera por posición
- Notificación manual o automática
- Confirmación de reservas
- Paso al siguiente en la lista
- Limpieza de entradas expiradas

### GestorAusencias
Control y seguimiento de ausencias:
- Registro de ausencias por tipo
- Aplicación de penalizaciones
- Justificación de ausencias
- Filtros por tipo de ausencia
- Exportación de reportes

### NotificacionesAutomaticas
Sistema de alertas y recordatorios:
- Configuración de notificaciones
- Historial de envíos
- Estado de notificaciones (pendiente, enviada, leída, fallida)
- Reintentos automáticos
- Múltiples canales de comunicación

### ControlAforo
Monitoreo de capacidad de clases:
- Visualización de aforo actual vs máximo
- Barras de progreso por clase
- Alertas de clases completas
- Gestión de lista de espera asociada
- Recomendaciones de optimización

### AnalyticsAusencias
Análisis y métricas:
- Tendencias de ausencias
- Socios con mayor ausencia
- Clases problemáticas
- Tasas de asistencia
- ROI de penalizaciones
- Insights automáticos

## APIs

### lista-espera.ts
```typescript
- getListasEspera(): Obtener todas las listas
- getListaEsperaPorClase(claseId, fecha): Lista por clase
- getListaEsperaPorSocio(socioId): Lista por socio
- addToListaEspera(listaEspera): Añadir a la lista
- updateListaEspera(id, updates): Actualizar estado
- notificarSiguiente(claseId, fecha): Notificar disponibilidad
- confirmarReserva(id): Confirmar desde lista
- cancelarListaEspera(id): Cancelar entrada
- limpiarExpiradas(): Limpiar notificaciones expiradas
- reordenarPosiciones(claseId, fecha): Reorganizar posiciones
```

### ausencias.ts
```typescript
- getAusencias(): Obtener todas las ausencias
- getAusenciasPorSocio(socioId): Ausencias por socio
- getAusenciasPorClase(claseId, fecha): Ausencias por clase
- registrarAusencia(ausencia): Registrar nueva ausencia
- updateAusencia(id, updates): Actualizar ausencia
- deleteAusencia(id): Eliminar ausencia
- getEstadisticasAusenciasSocio(): Estadísticas por socio
- getEstadisticasAsistenciaClase(): Estadísticas por clase
- registrarAsistenciaMasiva(): Registro masivo de asistencia
- calcularPenalizacion(): Calcular monto de penalización
- aplicarPenalizacion(ausenciaId): Aplicar cargo por ausencia
```

### notificaciones.ts
```typescript
- getNotificaciones(destinatarioId?): Obtener notificaciones
- crearNotificacion(notificacion): Crear nueva notificación
- updateNotificacion(id, updates): Actualizar notificación
- marcarComoLeida(id): Marcar como leída
- notificarDisponibilidadListaEspera(): Notificar plaza disponible
- enviarRecordatorioClase(): Enviar recordatorio
- notificarPenalizacion(): Notificar cargo
- enviarConfirmacionReserva(): Confirmar reserva
- procesarColaNotificaciones(): Procesar pendientes
- getConfiguracionNotificaciones(socioId): Obtener config
- updateConfiguracionNotificaciones(): Actualizar config
```

## Flujos de Trabajo

### Flujo de Lista de Espera
1. Socio intenta reservar clase completa
2. Sistema añade automáticamente a lista de espera
3. Se notifica posición en la lista
4. Cuando se libera plaza, notificar automáticamente
5. Socio tiene tiempo limitado para confirmar
6. Si no confirma, pasar al siguiente

### Flujo de Gestión de Ausencias
1. Clase programada
2. Recordatorios automáticos (24h y 2h antes)
3. Hora de la clase
4. Registrar asistencia
5. Si ausencia, registrar tipo
6. Aplicar penalización si corresponde
7. Liberar plaza y notificar lista de espera

## Configuración

### Penalizaciones
- No Show: $10.00
- Cancelación < 2h: $5.00
- Cancelación < 12h: $2.00
- Cancelación > 12h: Sin cargo

### Notificaciones
- Recordatorio 24h: Activado por defecto
- Recordatorio 2h: Activado por defecto
- Tiempo de respuesta lista espera: 30 minutos
- Reintentos fallidos: 3 intentos máximo

## Integración

Este módulo se integra con:
- Sistema de Reservas Online
- Sistema de Clases Grupales
- Sistema de Socios
- Sistema de Pagos (penalizaciones)
- Sistema de Comunicaciones

## Nota Importante

⚠️ Este módulo es específico para gimnasios y centros con clases grupales de aforo limitado. Los entrenadores personales que trabajan 1 a 1 NO necesitan este módulo, ya que no tienen "clases de las 18:00 con 15 plazas" que requieran lista de espera.

## Próximas Mejoras

- [ ] Integración con calendario de Google/Outlook
- [ ] Sistema de prioridades para socios VIP
- [ ] Predicción de ausencias con ML
- [ ] Sistema de recompensas por buena asistencia
- [ ] Exportación de reportes avanzados (PDF/Excel)
- [ ] Dashboard personalizable
- [ ] Integración con WhatsApp Business

