# Módulo: Plantillas de Dieta

> 📋 Sistema de plantillas nutricionales reutilizables para estandarizar y escalar planes de alimentación

## Objetivo

Proporcionar un sistema completo de plantillas nutricionales reutilizables que permita crear, gestionar y reutilizar planes de alimentación estandarizados. Funcionalidades: plantillas 'vegetariana 1800 kcal', 'déficit suave 2-3kg/mes', catálogo reutilizable de planes nutricionales. Útil tanto para entrenadores como para gimnasios con servicio de nutrición interno. El sistema debe permitir categorización, búsqueda, duplicación y reutilización eficiente de plantillas nutricionales exitosas.

## Estructura del Módulo

```
PlantillasDieta/
├── pages/
│   └── PlantillasDietaPage.tsx          # Página principal con sistema de tabs
├── components/
│   ├── PlantillasDieta.tsx              # Lista principal de plantillas
│   ├── CreadorPlantilla.tsx             # Herramienta para crear plantillas
│   ├── CategorizadorNutricion.tsx       # Organizador por categorías
│   ├── DuplicadorPlan.tsx               # Sistema de duplicación
│   ├── BuscadorPlantillas.tsx           # Motor de búsqueda avanzada
│   ├── VisorPlantilla.tsx               # Visor detallado de plantillas
│   ├── GestorVersiones.tsx              # Control de versiones
│   └── AnalyticsPlantillas.tsx          # Métricas de uso y efectividad
└── api/
    ├── plantillas.ts                     # API para gestión de plantillas
    ├── categorias.ts                     # API para categorías nutricionales
    └── analytics.ts                      # API para métricas y analytics
```

## Componentes Principales

### PlantillasDieta
- Lista principal de plantillas nutricionales
- Cards con estadísticas generales
- Tabla con todas las plantillas y sus métricas
- Acciones: Ver, Duplicar, Editar, Eliminar

### CreadorPlantilla
- Formulario para crear nuevas plantillas
- Definición de información básica (nombre, categoría, objetivo)
- Configuración de macros (calorías, proteínas, carbohidratos, grasas)
- Distribución de comidas y horarios

### CategorizadorNutricion
- Organización de plantillas por tipo de dieta
- Grid visual de categorías con colores
- Estadísticas de plantillas por categoría
- Gestión de categorías personalizadas

### DuplicadorPlan
- Sistema de duplicación de plantillas existentes
- Vista comparativa: original vs. duplicada
- Personalización de parámetros (nombre, calorías, macros)
- Ajuste de categoría

### BuscadorPlantillas
- Motor de búsqueda por texto
- Filtros avanzados: categoría, objetivo, rango de calorías
- Ordenación múltiple (recientes, más usadas, más efectivas)
- Grid de resultados con cards

### VisorPlantilla
- Vista detallada de una plantilla específica
- Información completa: macros, distribución, comidas
- Plan de comidas con horarios y alimentos
- Acciones: Duplicar, Asignar, Editar

### GestorVersiones
- Control de versiones de plantillas
- Timeline visual del historial de cambios
- Comparación entre versiones
- Restauración de versiones anteriores

### AnalyticsPlantillas
- Métricas globales del sistema
- Top plantillas más usadas
- Tendencias de uso mensual
- Estadísticas por categoría
- Insights y recomendaciones

## APIs Disponibles

### Plantillas (`api/plantillas.ts`)
- `obtenerPlantillas()` - Lista todas las plantillas activas
- `crearPlantilla(plantilla)` - Crea una nueva plantilla
- `actualizarPlantilla(id, cambios)` - Actualiza una plantilla
- `eliminarPlantilla(id)` - Elimina (soft delete) una plantilla
- `duplicarPlantilla(id, nuevoNombre)` - Duplica una plantilla
- `buscarPlantillas(filtros)` - Búsqueda con filtros avanzados
- `compartirPlantilla(id, usuarioIds)` - Comparte plantilla con usuarios
- `incrementarUsos(id)` - Incrementa contador de usos
- `actualizarEfectividad(id, efectividad)` - Actualiza métrica de efectividad

### Categorías (`api/categorias.ts`)
- `obtenerCategorias()` - Lista todas las categorías
- `crearCategoria(categoria)` - Crea nueva categoría
- `actualizarCategoria(id, cambios)` - Actualiza categoría
- `eliminarCategoria(id)` - Elimina categoría
- `obtenerEstadisticasCategorias()` - Estadísticas por categoría

### Analytics (`api/analytics.ts`)
- `obtenerAnalyticsGlobales()` - Métricas generales del sistema
- `obtenerAnalyticsPlantilla(id)` - Analytics de plantilla específica
- `obtenerTendenciasUso(diasAtras)` - Tendencias de uso por período
- `obtenerComparativaEfectividad()` - Comparativa entre plantillas
- `obtenerDistribucionCategorias()` - Distribución por categoría
- `obtenerReporteMensual(mes, año)` - Reporte mensual completo

## Integración en la App

### Ruta Registrada
```tsx
// src/App.tsx
import PlantillasDietaPage from './features/PlantillasDieta/pages/PlantillasDietaPage';

<Route path="/plantillas-dieta" element={<PlantillasDietaPage />} />
```

### Enlace en Sidebar
```tsx
// src/components/Sidebar.tsx
<Link to="/plantillas-dieta">
  <BookOpen className="w-5 h-5" />
  <span>Plantillas de Dieta</span>
</Link>
```

## User Stories

### Para Entrenadores Personales 🧍
- Como entrenador personal, quiero crear plantillas de dietas exitosas para reutilizar
- Como entrenador personal, necesito duplicar plantillas y personalizarlas para cada cliente
- Como entrenador personal, debo poder categorizar plantillas por tipo de dieta
- Como entrenador personal, quiero buscar plantillas por objetivos específicos
- Como entrenador personal, necesito escalar mi servicio con plantillas estandarizadas
- Como entrenador personal, debo poder compartir plantillas con otros entrenadores

### Para Gimnasios/Centros 🏢
- Como gimnasio, quiero estandarizar planes nutricionales para servicio interno
- Como centro, necesito crear plantillas para diferentes tipos de servicio nutricional
- Como gimnasio, debo poder duplicar plantillas exitosas para nuevos socios
- Como centro, quiero categorizar plantillas por nivel de servicio
- Como gimnasio, necesito gestionar versiones de plantillas para actualizaciones
- Como centro, debo poder analizar la efectividad de las plantillas

## Características Principales

1. **Catálogo de Plantillas**: Biblioteca completa de planes nutricionales reutilizables
2. **Creador de Plantillas**: Herramienta para diseñar nuevas plantillas desde cero
3. **Categorización Nutricional**: Organización por tipo de dieta (vegetariana, keto, etc.)
4. **Duplicador de Planes**: Sistema de copia y personalización rápida
5. **Búsqueda Avanzada**: Filtros por categoría, calorías, objetivos
6. **Gestión de Versiones**: Control de versiones y actualizaciones
7. **Analytics de Uso**: Métricas de efectividad y popularidad
8. **Optimización Continua**: Mejoras basadas en resultados reales

## Flujo de Trabajo

1. **Crear Plantilla**: Diseñar una nueva plantilla desde el editor
2. **Definir Categoría**: Asignar tipo de dieta y objetivo nutricional
3. **Configurar Macros**: Establecer calorías y distribución de macronutrientes
4. **Agregar Comidas**: Definir plan de comidas con horarios y alimentos
5. **Guardar en Catálogo**: Publicar plantilla para uso futuro
6. **Buscar y Filtrar**: Encontrar plantillas según necesidades
7. **Duplicar y Personalizar**: Crear variantes de plantillas exitosas
8. **Asignar a Clientes**: Aplicar plantilla a planes individuales
9. **Monitorear Resultados**: Evaluar efectividad de la plantilla
10. **Optimizar**: Crear nuevas versiones con mejoras

## Integraciones

- **Editor de Dieta**: Creación de plantillas desde el editor
- **Base de Datos de Alimentos**: Alimentos disponibles para plantillas
- **Sistema de Dietas**: Asignación de plantillas a dietas individuales
- **Sistema de Progreso**: Evaluación de efectividad
- **Sistema de Comunicaciones**: Compartir plantillas entre usuarios
- **Sistema de Analytics**: Métricas de uso y rendimiento

## Nota Final

> 💡 Las plantillas de dieta son un activo reutilizable fundamental que permite escalar el servicio nutricional tanto para entrenadores personales como para gimnasios con servicio de nutrición interno. El sistema de duplicación y personalización permite mantener la flexibilidad mientras se aprovecha la estandarización. La categorización nutricional y búsqueda avanzada facilitan la gestión de grandes catálogos de plantillas, mientras que el sistema de versiones y analytics permite la mejora continua basada en datos reales de uso y efectividad.

