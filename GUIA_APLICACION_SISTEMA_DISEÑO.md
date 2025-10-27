# Guía de Aplicación del Sistema de Diseño FitOffice

## 📋 Resumen

Esta guía explica cómo aplicar el sistema de diseño especificado en `guiaestilos.md` a todos los módulos del sistema FitOffice.

## ✅ Trabajo Completado

### 1. Configuración Base
- ✅ `tailwind.config.js` actualizado con todo el sistema de diseño
- ✅ `src/index.css` actualizado con clases base y utilidades
- ✅ Componentes UI base creados en `src/components/ui/`

### 2. Componentes Principales Actualizados
- ✅ `Login.tsx` - Usa sistema de diseño completo
- ✅ `Sidebar.tsx` - Usa colores primary en lugar de emerald
- ✅ `Dashboard.tsx` - Usa clases del sistema de diseño

### 3. Módulos de Features Actualizados (Ejemplos)
- ✅ `ResumenGeneral/` - Página y componentes (DashboardOverview, AlertsPanel)
- ✅ `CajaBancos/` - Página principal

## 🎨 Sistema de Diseño Implementado

### Colores
```typescript
// Primarios
primary: #6366F1
primary-600: #4F46E5 (hover)
primary-700: #4338CA (active)
primary-50: #EEF2FF (backgrounds)

// Estados Semánticos
success: #10B981
warning: #F59E0B
error: #EF4444
info: #3B82F6

// Neutros (Light Mode)
background: #FFFFFF
surface: #F8FAFC
text-primary: #0F172A
text-secondary: #64748B
text-muted: #94A3B8
border: #E2E8F0

// Dark Mode
dark-background: #0F0F23
dark-surface: #1E1E2E
dark-text-primary: #F1F5F9
dark-text-secondary: #94A3B8
dark-border: #334155
```

### Tipografía
```css
text-h1: 30px / 38px line-height / 700 weight
text-h2: 24px / 32px / 600
text-h3: 20px / 28px / 600
text-body: 16px / 24px / 400
text-body-small: 14px / 20px / 400
text-caption: 12px / 16px / 500
```

### Espaciado (Sistema 8px)
```css
1: 8px
1.5: 12px
2: 16px
3: 24px
4: 32px
6: 48px
```

### Radios de Borde
```css
rounded-lg: 12px (botones, inputs)
rounded-xl: 16px (cards)
rounded-2xl: 24px (contenedores grandes)
```

## 🧩 Componentes UI Base Disponibles

### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" loading>Loading...</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

**Variantes:** `primary`, `secondary`, `ghost`, `destructive`  
**Tamaños:** `sm`, `md` (default), `lg`

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card hover>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Contenido aquí
  </CardContent>
</Card>
```

### Input
```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email"
  type="email"
  placeholder="tu@email.com"
  error="Este campo es requerido"
  inputSize="lg"
/>
```

### Badge
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Chip
```tsx
import { Chip } from '@/components/ui';

<Chip selected>Seleccionado</Chip>
<Chip onRemove={() => {}}>Removible</Chip>
```

## 📝 Patrón de Actualización de Módulos

### Paso 1: Actualizar Página Principal
```tsx
// ANTES
<div className="flex-1 overflow-auto bg-slate-950">
  <div className="p-8">
    <h1 className="text-3xl font-bold text-white mb-2">Título</h1>
    <p className="text-slate-400">Descripción</p>
  </div>
</div>

// DESPUÉS
import { Button, Card } from '../../../components/ui';

<div className="flex-1 overflow-auto bg-dark-background">
  <div className="p-8">
    <h1 className="text-h1 text-dark-text-primary mb-2">Título</h1>
    <p className="text-body text-dark-text-secondary">Descripción</p>
  </div>
</div>
```

### Paso 2: Reemplazar Colores

| Antes | Después |
|-------|---------|
| `bg-emerald-600` | `bg-primary` |
| `text-emerald-500` | `text-primary` |
| `bg-slate-900` | `bg-dark-surface` |
| `text-white` | `text-dark-text-primary` |
| `text-slate-400` | `text-dark-text-secondary` |
| `border-slate-800` | `border-dark-border` |
| `bg-red-50` | `bg-error-light` |
| `text-red-700` | `text-error` |
| `bg-green-50` | `bg-success-light` |
| `text-green-700` | `text-success` |

### Paso 3: Usar Clases de Tipografía

```tsx
// ANTES
<h1 className="text-3xl font-bold">Título</h1>
<p className="text-sm">Texto pequeño</p>

// DESPUÉS
<h1 className="text-h1 font-bold">Título</h1>
<p className="text-body-small">Texto pequeño</p>
```

### Paso 4: Usar Clases de Componentes

```tsx
// ANTES
<button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
  Acción
</button>

// DESPUÉS
<Button variant="primary">Acción</Button>

// O usando clases CSS
<button className="btn-primary">Acción</button>
```

### Paso 5: Actualizar Cards

```tsx
// ANTES
<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
  <h2 className="text-xl font-bold mb-4">Título</h2>
  <div>Contenido</div>
</div>

// DESPUÉS
<Card hover>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Contenido
  </CardContent>
</Card>
```

### Paso 6: Actualizar Inputs

```tsx
// ANTES
<input 
  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
  placeholder="Email"
/>

// DESPUÉS
<Input 
  label="Email"
  placeholder="Email"
  inputSize="lg"
/>

// O usando clases
<input className="input-base input-lg" placeholder="Email" />
```

## 🔄 Clases CSS Predefinidas

### Botones
```css
.btn-primary    /* Botón primario */
.btn-secondary  /* Botón secundario */
.btn-ghost      /* Botón fantasma */
.btn-destructive /* Botón destructivo */
.btn-sm         /* Tamaño pequeño */
.btn-lg         /* Tamaño grande */
```

### Inputs
```css
.input-base     /* Input base */
.input-lg       /* Input grande (48px) */
.input-md       /* Input medio (40px) */
.input-sm       /* Input pequeño (32px) */
.input-error    /* Input con error */
```

### Cards
```css
.card-base      /* Card base */
.card-hover     /* Card con efecto hover */
```

### Badges
```css
.badge-base     /* Badge base */
.badge-success  /* Badge de éxito */
.badge-warning  /* Badge de advertencia */
.badge-error    /* Badge de error */
.badge-info     /* Badge de info */
```

### Chips
```css
.chip-base      /* Chip base */
.chip-selected  /* Chip seleccionado */
```

### Transiciones
```css
.transition-fast    /* 100ms */
.transition-normal  /* 200ms */
.transition-slow    /* 300ms */
```

## 📂 Módulos Pendientes de Actualizar

Aplicar el patrón anterior a los siguientes módulos:

1. ✅ CajaBancos (completado)
2. GastosProveedores
3. SuscripcionesCuotasRecurrentes
4. PagosPendientesMorosidad
5. FacturacionCobros
6. PanelFinancieroOverview
7. EventosRetosEspeciales
8. RecursosSalasMaterial
9. DisponibilidadTurnosStaff
10. ListaEsperaAusencias
11. ReservasOnline
12. AgendaCalendario
13. ProgramasEntreno
14. PlantillasEntrenamiento
15. AlertasRestriccionesAlimentarias
16. ListaCompraSupermercado
17. CheckinsNutricionales
18. RecetarioComidasGuardadas
19. PlantillasDieta
20. EditorDietaMealPlanner
21. DietasAsignadas
22. ProgresoRendimiento
23. AdherenciaCumplimientoEntreno
24. CheckinsEntreno
25. BibliotecaEjercicios
26. EditorEntreno
27. ListasInteligentesSegmentosGuardados
28. CampañasOutreach
29. EncuestasSatisfaccionNPSCSAT
30. GestionClientes
31. PipelineVentaKanban
32. Leads
33. ObjetivosRendimiento
34. TareasAlertas
35. ✅ ResumenGeneral (completado)

## 🎯 Checklist por Módulo

Para cada módulo, verificar:

- [ ] Página principal actualizada con colores del sistema
- [ ] Componentes usan `Card`, `Button`, `Input`, etc.
- [ ] Colores primary (#6366F1) en lugar de emerald/teal
- [ ] Tipografía con clases text-h1, text-body, etc.
- [ ] Espaciado consistente (sistema 8px)
- [ ] Transiciones con duration-normal (200ms)
- [ ] Radios de borde correctos (12px botones, 16px cards)
- [ ] Estados semánticos (success, warning, error, info)

## 💡 Consejos

1. **Reutiliza componentes UI**: Usa los componentes de `src/components/ui/` en lugar de crear estilos inline.
2. **Sigue la convención de nombres**: Usa las clases exactas del sistema (text-primary, bg-surface, etc.).
3. **Modo oscuro**: Usa clases `dark-*` para componentes en modo oscuro.
4. **Transiciones**: Todas las transiciones deben ser `duration-normal` (200ms) o `duration-fast` (100ms).
5. **Iconos**: Usa tamaños `w-icon-md h-icon-md` (20px) para navegación.
6. **Feedback visual**: Todos los elementos interactivos deben tener estados hover y focus.

## 🔍 Ejemplos de Referencia

Consulta estos archivos para ver el sistema de diseño en acción:

- `src/components/Login.tsx` - Login completo
- `src/components/Sidebar.tsx` - Navegación
- `src/components/Dashboard.tsx` - Dashboard principal
- `src/features/ResumenGeneral/pages/ResumenGeneralPage.tsx` - Página de módulo
- `src/features/ResumenGeneral/components/DashboardOverview.tsx` - Cards de métricas
- `src/features/ResumenGeneral/components/AlertsPanel.tsx` - Panel de alertas
- `src/features/CajaBancos/pages/CajaBancosPage.tsx` - Tabs y navegación

## 📚 Referencias

- **Guía de estilos completa**: `guiaestilos.md`
- **Configuración Tailwind**: `tailwind.config.js`
- **Estilos base**: `src/index.css`
- **Componentes UI**: `src/components/ui/`

