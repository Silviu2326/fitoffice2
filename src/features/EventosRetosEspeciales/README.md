# Eventos & Retos Especiales

## 🎯 Descripción

Sistema completo de gestión de eventos especiales y retos para entrenadores y gimnasios. Permite crear, gestionar y monitorear retos motivacionales que fomentan la participación, engagement y retención de clientes.

### Diferenciación por Tipo

- **Retos Personales**: Para entrenadores individuales (ej: "Reto 30 días conmigo")
- **Retos Grupales**: Para gimnasios y centros (ej: "Masterclass de movilidad sábado 18:00", "Reto 8 Semanas Verano")

## 📁 Estructura del Módulo

```
EventosRetosEspeciales/
├── api/
│   ├── retos.ts              # API para gestión de retos
│   ├── participantes.ts       # API para gestión de participantes
│   └── progreso.ts           # API para seguimiento de progreso
├── components/
│   ├── EventosList.tsx       # Lista de eventos y retos
│   ├── CreadorReto.tsx       # Formulario de creación/edición de retos
│   ├── Participantes.tsx     # Gestión de participantes
│   ├── SeguimientoProgreso.tsx # Monitoreo del progreso
│   ├── RankingRetos.tsx      # Sistema de clasificación
│   ├── ContenidoMotivacional.tsx # Mensajes motivacionales
│   ├── PremiosReconocimientos.tsx # Sistema de premios
│   └── AnalyticsEventos.tsx  # Métricas y estadísticas
├── pages/
│   └── EventosRetosEspecialesPage.tsx # Página principal
└── README.md
```

## 🚀 Funcionalidades Principales

### 1. Gestión de Retos (EventosList + CreadorReto)
- Crear retos personalizados (personal o grupal)
- Configurar duración, objetivos y reglas
- Definir categorías: duración, objetivo, actividad, estacional, temático, grupo, especialidad
- Estados: borrador, publicado, activo, finalizado
- Límite de participantes (opcional)

### 2. Gestión de Participantes
- Inscripción de participantes
- Verificación de cupos disponibles
- Estados: inscrito, activo, completado, abandonado
- Búsqueda y filtrado de participantes
- Progreso individual de cada participante

### 3. Seguimiento de Progreso
- Registro diario de actividades
- Evidencias (fotos/videos)
- Sistema de puntos
- Cálculo de rachas
- Estadísticas de completación

### 4. Ranking y Competencia
- Top 3 con podio visual
- Clasificación general
- Puntos acumulados
- Días completados
- Porcentaje de progreso

### 5. Contenido Motivacional
- Frases motivacionales predefinidas
- Envío de mensajes masivos
- Consejos prácticos
- Tips de engagement
- Ideas de contenido

### 6. Premios y Reconocimientos
- Categorías de premios:
  - Premio por completar
  - Top 3 del ranking
  - Premio a la constancia
  - Mayor mejora
  - Participación activa
- Reconocimientos digitales (badges, certificados)
- Sistema de puntos y niveles

### 7. Analytics
- KPIs principales (participantes, activos, completados, retención)
- Distribución de estados
- Métricas de progreso
- Tasa de completación
- Insights y recomendaciones automáticas

## 🔌 APIs Implementadas

### Retos
```typescript
getRetos(filtros?)              // Obtener todos los retos
getRetoById(id)                // Obtener reto específico
crearReto(data)                // Crear nuevo reto
actualizarReto(id, data)       // Actualizar reto
eliminarReto(id)               // Eliminar reto
publicarReto(id)               // Cambiar estado a publicado
iniciarReto(id)                // Cambiar estado a activo
finalizarReto(id)              // Cambiar estado a finalizado
```

### Participantes
```typescript
getParticipantesByReto(retoId)           // Obtener participantes de un reto
inscribirParticipante(data)              // Inscribir nuevo participante
getParticipanteById(id)                  // Obtener participante específico
actualizarEstadoParticipante(id, estado) // Actualizar estado
actualizarProgresoParticipante(...)      // Actualizar progreso
eliminarParticipante(id)                 // Eliminar participante
getRankingReto(retoId, limite)           // Obtener ranking
getEstadisticasParticipacion(retoId)     // Obtener estadísticas
```

### Progreso
```typescript
getProgresoByParticipante(participanteId) // Obtener progreso de participante
getProgresoByReto(retoId)                // Obtener progreso del reto
registrarProgreso(data)                  // Registrar progreso diario
actualizarRegistroProgreso(id, data)     // Actualizar registro
eliminarRegistroProgreso(id)             // Eliminar registro
getEstadisticasProgreso(retoId)          // Obtener estadísticas
getResumenProgresoParticipante(id)       // Obtener resumen
```

## 💾 Modelos de Datos

### Reto
```typescript
{
  id: string
  tipo: 'personal' | 'grupal'
  nombre: string
  descripcion: string
  duracion_dias: number
  fecha_inicio: string
  fecha_fin: string
  objetivos: string[]
  reglas: string[]
  estado: 'borrador' | 'publicado' | 'activo' | 'finalizado'
  max_participantes?: number
  categoria: string
  imagen_url?: string
  created_at: string
  updated_at: string
}
```

### Participante
```typescript
{
  id: string
  reto_id: string
  usuario_id: string
  nombre_usuario: string
  email_usuario: string
  fecha_inscripcion: string
  estado: 'inscrito' | 'activo' | 'completado' | 'abandonado'
  progreso: number (0-100)
  dias_completados: number
  puntos: number
  created_at: string
  updated_at: string
}
```

### RegistroProgreso
```typescript
{
  id: string
  participante_id: string
  reto_id: string
  fecha: string
  dia_numero: number
  completado: boolean
  actividad_realizada?: string
  notas?: string
  evidencia_url?: string
  puntos_ganados: number
  created_at: string
}
```

## 🎨 Características de UI/UX

- **Diseño moderno** con gradientes y sombras
- **Sistema de tabs** para organizar funcionalidades
- **Cards interactivas** con efectos hover
- **Podio visual** para el top 3 del ranking
- **Badges de estado** con colores distintivos
- **Iconos de Lucide React** para mejor visualización
- **Diseño responsive** con Tailwind CSS
- **Animaciones suaves** en transiciones
- **Feedback visual** para acciones del usuario

## 🔗 Integración en la App

El módulo está integrado en:

1. **App.tsx**: Ruta `/eventos-retos-especiales`
2. **Sidebar.tsx**: Menú lateral con icono Target (🎯)
3. **Navegación**: Accesible desde cualquier parte de la aplicación

## 📝 Notas de Implementación

- Las tablas de Supabase necesitan ser creadas según los modelos de datos
- Las funciones de API asumen conexión con Supabase
- El sistema de puntos es configurable
- Los premios son sugerencias, deben personalizarse por negocio
- El contenido motivacional puede expandirse con más frases
- Las notificaciones pueden integrarse con servicios externos

## 🚀 Próximas Mejoras

- [ ] Integración con sistema de notificaciones (email/push)
- [ ] Compartir en redes sociales
- [ ] Certificados PDF descargables
- [ ] Sistema de badges digitales coleccionables
- [ ] Chat grupal para participantes
- [ ] Integración con calendario
- [ ] Recordatorios automáticos
- [ ] Exportación de reportes en PDF/Excel
- [ ] Gamificación avanzada con niveles
- [ ] Integración con wearables para tracking automático

