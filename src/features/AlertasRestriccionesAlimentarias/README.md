# Alertas & Restricciones Alimentarias

⚠️ **Sistema de gestión de restricciones alimentarias y alertas de seguridad sanitaria**

## Descripción

Módulo fundamental para la seguridad y cumplimiento legal de cualquier servicio nutricional. Proporciona un sistema completo de gestión de restricciones alimentarias (alergias, intolerancias, restricciones religiosas y culturales) con validación automática de ingredientes y sistema de alertas de seguridad.

## Objetivo

Garantizar la protección de los usuarios mediante:
- Registro y seguimiento de alergias alimentarias
- Control de intolerancias (lactosa, gluten, etc.)
- Respeto a creencias alimentarias (halal, kosher, etc.)
- Preferencias culturales (vegetarianismo, etc.)
- Alertas automáticas de ingredientes problemáticos
- Validación de compatibilidad de ingredientes
- Propuesta de alternativas seguras
- Cumplimiento legal y sanitario

## Estructura del Módulo

```
AlertasRestriccionesAlimentarias/
├── pages/
│   └── AlertasRestriccionesAlimentariasPage.tsx  # Página principal
├── components/
│   ├── RestriccionesList.tsx                      # Lista de restricciones
│   ├── AlertasAlergias.tsx                        # Sistema de alertas
│   ├── ConfiguradorRestricciones.tsx              # Configuración de restricciones
│   ├── ValidacionIngredientes.tsx                 # Validación de ingredientes
│   ├── HistorialAlertas.tsx                       # Historial completo
│   ├── SustitucionesSeguras.tsx                   # Alternativas seguras
│   ├── ReportesCompliance.tsx                     # Reportes de cumplimiento
│   └── NotificacionesSeguridad.tsx                # Notificaciones
└── api/
    ├── restricciones.ts                           # API de restricciones
    ├── alertas.ts                                 # API de alertas
    └── validacion.ts                              # API de validación
```

## Funcionalidades Principales

### 1. Gestión de Restricciones
- **Tipos soportados:**
  - Alergias (maní, frutos secos, mariscos, etc.)
  - Intolerancias (lactosa, gluten, fructosa, etc.)
  - Religiosas (halal, kosher, etc.)
  - Culturales (vegetarianismo, veganismo, etc.)

- **Niveles de severidad:**
  - Leve: Recomendación de evitar
  - Moderada: Restricción importante
  - Severa: Prohibición absoluta (bloqueo automático)

### 2. Validación de Ingredientes
- Verificación automática contra restricciones del cliente
- Detección de conflictos en tiempo real
- Sistema de bloqueo preventivo
- Sugerencia de alternativas seguras

### 3. Sistema de Alertas
- Alertas automáticas al detectar ingredientes problemáticos
- Clasificación por severidad (alta, media, baja)
- Estados: bloqueada, resuelta, pendiente
- Historial completo de alertas
- Notificaciones en tiempo real

### 4. Sustituciones Seguras
- Base de datos de alternativas nutricionales
- Compatibilidad nutricional calculada
- Propiedades y beneficios de cada alternativa
- Categorización por tipo de ingrediente

### 5. Compliance y Reportes
- Score de cumplimiento en tiempo real
- Reportes mensuales y trimestrales
- Certificaciones (RGPD, ISO 22000, Halal, Kosher)
- Auditoría completa para protección legal
- Exportación de reportes

## Componentes

### RestriccionesList
Lista principal de restricciones alimentarias registradas. Permite:
- Ver todas las restricciones por cliente
- Filtrar por tipo y severidad
- Editar restricciones existentes
- Ver alertas relacionadas
- Acceder a sustituciones seguras

### AlertasAlergias
Sistema de visualización de alertas de seguridad:
- Historial de alertas por restricción
- Resumen de bloqueadas/resueltas/pendientes
- Detalle de cada alerta con acción tomada
- Fechas y tracking completo

### ConfiguradorRestricciones
Modal para crear/editar restricciones:
- Selección de tipo de restricción
- Configuración de severidad
- Lista de ingredientes bloqueados
- Activación/desactivación

### ValidacionIngredientes
Herramienta de validación en tiempo real:
- Validar ingrediente contra restricciones del cliente
- Resultado visual (seguro/bloqueado)
- Lista de restricciones detectadas
- Alternativas seguras sugeridas
- Historial de validaciones recientes

### HistorialAlertas
Registro completo de todas las alertas:
- Filtros por estado, severidad, fecha
- Estadísticas agregadas
- Detalle de cada alerta
- Exportación de reportes

### SustitucionesSeguras
Propuestas de alternativas para ingredientes bloqueados:
- Lista de sustituciones por ingrediente
- Score de compatibilidad nutricional
- Propiedades de cada alternativa
- Categorización

### ReportesCompliance
Dashboard de cumplimiento legal:
- Score de compliance
- Métricas principales
- Certificaciones activas
- Historial de reportes
- Generación de nuevos reportes

### NotificacionesSeguridad
Centro de notificaciones:
- Notificaciones críticas, advertencias e info
- Estado leído/no leído
- Filtros por tipo
- Marcado de leídas

## APIs

### Restricciones API (`/api/nutricion/restricciones`)
```typescript
GET    /restricciones              // Obtener todas
GET    /restricciones/:id          // Obtener por ID
GET    /restricciones/cliente/:id  // Por cliente
POST   /restricciones              // Crear
PUT    /restricciones/:id          // Actualizar
DELETE /restricciones/:id          // Eliminar
POST   /restricciones/:id/activar  // Activar
POST   /restricciones/:id/desactivar // Desactivar
```

### Alertas API (`/api/nutricion/alertas`)
```typescript
GET    /alertas                    // Obtener todas
GET    /alertas/:id                // Por ID
GET    /alertas/cliente/:id        // Por cliente
GET    /alertas/restriccion/:id    // Por restricción
POST   /alertas/:id/resolver       // Resolver alerta
GET    /alertas/estadisticas       // Estadísticas
```

### Validación API (`/api/nutricion/`)
```typescript
POST   /validar-ingrediente        // Validar ingrediente
POST   /validar-receta             // Validar receta completa
GET    /sustituciones              // Obtener sustituciones
GET    /validaciones/historial     // Historial
POST   /validaciones/batch         // Validación múltiple
```

## Flujo de Trabajo

1. **Registro de Restricción**
   - Cliente informa sobre alergia/intolerancia
   - Se registra en el sistema con severidad
   - Se activa la restricción

2. **Planificación Nutricional**
   - Al crear plan nutricional, se validan ingredientes
   - Sistema verifica automáticamente contra restricciones
   - Si hay conflicto, genera alerta

3. **Gestión de Alerta**
   - Alerta bloqueada automáticamente (si severa)
   - Se notifica al entrenador
   - Sistema propone alternativas seguras
   - Se sustituye ingrediente
   - Se marca alerta como resuelta

4. **Compliance**
   - Se registra todo el proceso
   - Se actualiza score de compliance
   - Se genera reporte para auditoría

## Importancia Legal

Este módulo es **fundamental** y **obligatorio** para:
- ✅ Cumplimiento de normativas sanitarias
- ✅ Protección legal contra demandas
- ✅ Respeto a creencias religiosas y culturales
- ✅ Responsabilidad social corporativa
- ✅ Seguridad del usuario
- ✅ Auditorías y certificaciones

## Integración

### En App.tsx
```typescript
import AlertasRestriccionesAlimentariasPage from './features/AlertasRestriccionesAlimentarias/pages/AlertasRestriccionesAlimentariasPage';

// En rutas:
<Route path="/alertas-restricciones-alimentarias" element={<AlertasRestriccionesAlimentariasPage />} />
```

### En Sidebar.tsx
```typescript
import { AlertTriangle } from 'lucide-react';

// En navegación:
<Link to="/alertas-restricciones-alimentarias">
  <AlertTriangle className="w-5 h-5" />
  <span>Restricciones Alimentarias</span>
</Link>
```

## Tecnologías

- **React** + **TypeScript**
- **TailwindCSS** para estilos
- **Lucide React** para iconos
- **React Router** para navegación

## Notas de Seguridad

> ⚠️ **IMPORTANTE**: Este módulo maneja información crítica de salud. Cualquier fallo puede tener consecuencias graves para la salud del usuario y responsabilidad legal para el centro. El sistema debe ser robusto, automático y generar alertas inmediatas.

## Estado

✅ **Completado** - Módulo funcional con todos los componentes implementados

## Próximas Mejoras

- Integración con base de datos de alimentos
- Machine Learning para sugerencias de sustituciones
- Integración con sistemas de notificación (email/SMS)
- App móvil para clientes
- Escaneo de código de barras
- Base de datos de recetas seguras

---

**Creado:** Octubre 2024  
**Versión:** 1.0.0  
**Autor:** ERP Fitness - Módulo de Nutrición

