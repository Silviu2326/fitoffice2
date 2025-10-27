# Ejemplos de Uso de Componentes UI - Sistema de Diseño FitOffice

## 🎯 Guía Rápida con Ejemplos

### 1. Botones

#### Ejemplo Básico
```tsx
import { Button } from '@/components/ui';

// Botón primario (default)
<Button onClick={handleClick}>
  Guardar Cambios
</Button>

// Botón con icono
<Button variant="primary">
  <PlusIcon className="w-5 h-5 mr-2" />
  Agregar Cliente
</Button>
```

#### Todos los Variantes
```tsx
// Primary - Acciones principales
<Button variant="primary">Crear Nuevo</Button>

// Secondary - Acciones secundarias
<Button variant="secondary">Cancelar</Button>

// Ghost - Acciones sutiles
<Button variant="ghost">Ver Detalles</Button>

// Destructive - Acciones peligrosas
<Button variant="destructive">Eliminar</Button>
```

#### Tamaños
```tsx
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano (default)</Button>
<Button size="lg">Grande</Button>
```

#### Estados
```tsx
// Loading
<Button loading>Guardando...</Button>

// Disabled
<Button disabled>No Disponible</Button>

// Con clase personalizada
<Button className="w-full">Botón de ancho completo</Button>
```

### 2. Cards

#### Card Básica
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Información del Cliente</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-body text-text-secondary">
      Juan Pérez - Cliente activo desde 2024
    </p>
  </CardContent>
</Card>
```

#### Card con Hover
```tsx
<Card hover>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Métrica del Mes</CardTitle>
      <Badge variant="success">+12%</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-4">
      <div className="bg-primary-50 p-3 rounded-lg">
        <UsersIcon className="w-icon-lg h-icon-lg text-primary" />
      </div>
      <div>
        <p className="text-display font-bold text-text-primary">45</p>
        <p className="text-body-small text-text-secondary">Clientes Activos</p>
      </div>
    </div>
  </CardContent>
</Card>
```

#### Card en Modo Oscuro
```tsx
<Card className="bg-dark-surface border-dark-border">
  <CardHeader>
    <CardTitle className="text-dark-text-primary">Panel de Control</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-dark-text-secondary">Contenido en modo oscuro</p>
  </CardContent>
</Card>
```

### 3. Inputs

#### Input Básico
```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email"
  type="email"
  placeholder="tu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### Input con Error
```tsx
<Input 
  label="Nombre"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={nameError ? "El nombre es requerido" : undefined}
/>
```

#### Input con Helper Text
```tsx
<Input 
  label="Contraseña"
  type="password"
  helperText="Mínimo 8 caracteres, incluye mayúsculas y números"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

#### Tamaños de Input
```tsx
<Input label="Pequeño" inputSize="sm" />
<Input label="Mediano (default)" inputSize="md" />
<Input label="Grande" inputSize="lg" />
```

#### Input con Clases CSS
```tsx
// Sin componente React, usando clases directamente
<input 
  className="input-base input-lg"
  placeholder="Email"
/>

<input 
  className="input-base input-md input-error"
  placeholder="Campo con error"
/>
```

### 4. Badges

#### Badges Semánticos
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Vencido</Badge>
<Badge variant="info">Información</Badge>
<Badge>Default</Badge>
```

#### Badges con Iconos
```tsx
<Badge variant="success">
  <CheckIcon className="w-3 h-3 mr-1" />
  Completado
</Badge>

<Badge variant="error">
  <XIcon className="w-3 h-3 mr-1" />
  Rechazado
</Badge>
```

#### Badges en Tablas
```tsx
<table>
  <tbody>
    <tr>
      <td>Juan Pérez</td>
      <td><Badge variant="success">Activo</Badge></td>
    </tr>
    <tr>
      <td>María López</td>
      <td><Badge variant="warning">Pendiente</Badge></td>
    </tr>
  </tbody>
</table>
```

### 5. Chips

#### Chip Básico
```tsx
import { Chip } from '@/components/ui';

<Chip>Etiqueta</Chip>
```

#### Chip Seleccionado
```tsx
<Chip selected>Seleccionado</Chip>
```

#### Chip con Remover
```tsx
<Chip onRemove={() => removeTag('fitness')}>
  Fitness
</Chip>
```

#### Grupo de Chips (Filtros)
```tsx
<div className="flex flex-wrap gap-2">
  <Chip 
    selected={selectedFilter === 'todos'}
    onClick={() => setSelectedFilter('todos')}
  >
    Todos
  </Chip>
  <Chip 
    selected={selectedFilter === 'activos'}
    onClick={() => setSelectedFilter('activos')}
  >
    Activos
  </Chip>
  <Chip 
    selected={selectedFilter === 'inactivos'}
    onClick={() => setSelectedFilter('inactivos')}
  >
    Inactivos
  </Chip>
</div>
```

## 🎨 Patrones Comunes

### Formulario Completo
```tsx
import { Input, Button } from '@/components/ui';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ... lógica de envío
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre Completo"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        inputSize="lg"
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        inputSize="lg"
      />
      
      <Input
        label="Teléfono"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        helperText="Formato: +34 600 000 000"
        inputSize="lg"
      />

      <div className="flex gap-3">
        <Button type="submit" loading={loading}>
          Guardar
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
```

### Lista con Cards
```tsx
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';

function ClientList({ clients }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map(client => (
        <Card key={client.id} hover>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{client.name}</CardTitle>
              <Badge variant={client.active ? 'success' : 'warning'}>
                {client.active ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-body-small text-text-secondary">
                {client.email}
              </p>
              <p className="text-body-small text-text-muted">
                Miembro desde {client.memberSince}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### Panel de Estadísticas
```tsx
import { Card } from '@/components/ui';

function StatsPanel({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-body-small text-text-secondary mb-1">
                {stat.label}
              </p>
              <h3 className="text-display font-bold text-text-primary mb-2">
                {stat.value}
              </h3>
              <span className="text-success text-body-small font-medium">
                {stat.change}
              </span>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg shadow-sm`}>
              <stat.icon className={`w-icon-lg h-icon-lg ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Modal/Dialog
```tsx
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body text-text-secondary mb-6">
            {message}
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Confirmar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Tabs
```tsx
import { Card } from '@/components/ui';

function TabsComponent() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: HomeIcon },
    { id: 'details', label: 'Detalles', icon: InfoIcon },
    { id: 'settings', label: 'Configuración', icon: SettingsIcon }
  ];

  return (
    <Card>
      <div className="flex gap-2 p-4 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-normal ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface text-text-primary hover:bg-primary-50 border border-border'
              }`}
            >
              <Icon className="w-icon-md h-icon-md" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="p-6">
        {/* Contenido de cada tab */}
      </div>
    </Card>
  );
}
```

### Empty State
```tsx
import { Card, Button } from '@/components/ui';

function EmptyState({ icon: Icon, title, message, actionLabel, onAction }) {
  return (
    <Card>
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="bg-surface-2 p-6 rounded-full">
            <Icon className="w-12 h-12 text-text-muted" />
          </div>
        </div>
        <h3 className="text-h3 font-bold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-body text-text-secondary mb-6">
          {message}
        </p>
        {actionLabel && onAction && (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}

// Uso
<EmptyState
  icon={UsersIcon}
  title="No hay clientes"
  message="Comienza agregando tu primer cliente al sistema"
  actionLabel="Agregar Cliente"
  onAction={() => openAddClientModal()}
/>
```

### Loading State (Skeleton)
```tsx
function SkeletonCard() {
  return (
    <Card>
      <div className="animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-surface-2 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-surface-2 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-surface-2 rounded w-1/4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-surface-2 rounded"></div>
          <div className="h-3 bg-surface-2 rounded w-5/6"></div>
        </div>
      </div>
    </Card>
  );
}
```

## 💡 Tips y Mejores Prácticas

### 1. Composición de Componentes
```tsx
// ✅ BIEN - Composición limpia
<Card hover>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Título</CardTitle>
      <Badge variant="success">Estado</Badge>
    </div>
  </CardHeader>
  <CardContent>
    {/* Contenido */}
  </CardContent>
</Card>

// ❌ MAL - Estructura plana sin componentes
<div className="card-base card-hover">
  <div className="mb-4">
    <div className="flex items-center justify-between">
      <h3 className="text-h3">Título</h3>
      <span className="badge-success">Estado</span>
    </div>
  </div>
  <div>
    {/* Contenido */}
  </div>
</div>
```

### 2. Estados Interactivos
```tsx
// ✅ BIEN - Feedback visual claro
<Button 
  onClick={handleSave}
  loading={isSaving}
  disabled={!isValid}
>
  {isSaving ? 'Guardando...' : 'Guardar'}
</Button>

// ❌ MAL - Sin feedback
<button onClick={handleSave}>Guardar</button>
```

### 3. Manejo de Errores
```tsx
// ✅ BIEN - Errores visibles y descriptivos
<Input
  label="Email"
  value={email}
  onChange={handleEmailChange}
  error={emailError}
/>

// ❌ MAL - Error solo en console
<input 
  value={email} 
  onChange={handleEmailChange}
/>
{console.error(emailError)}
```

### 4. Consistencia de Colores
```tsx
// ✅ BIEN - Usa colores del sistema
<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Vencido</Badge>

// ❌ MAL - Colores personalizados inconsistentes
<span className="bg-green-500 text-white">Activo</span>
<span className="bg-yellow-400 text-black">Pendiente</span>
<span className="bg-red-600 text-white">Vencido</span>
```

### 5. Accesibilidad
```tsx
// ✅ BIEN - Labels y aria-labels
<Input
  label="Email"
  id="email"
  aria-describedby="email-error"
  error={emailError}
/>

// ❌ MAL - Sin labels
<input placeholder="Email" />
```

## 🚀 Ejemplos Avanzados

### Tabla con Componentes UI
```tsx
import { Card, Badge, Button, Chip } from '@/components/ui';

function ClientsTable({ clients }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 text-body-small font-semibold text-text-secondary">
                Cliente
              </th>
              <th className="text-left py-3 px-4 text-body-small font-semibold text-text-secondary">
                Estado
              </th>
              <th className="text-left py-3 px-4 text-body-small font-semibold text-text-secondary">
                Tags
              </th>
              <th className="text-right py-3 px-4 text-body-small font-semibold text-text-secondary">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-surface transition-fast">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={client.avatar} 
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-body font-medium text-text-primary">
                        {client.name}
                      </p>
                      <p className="text-body-small text-text-muted">
                        {client.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={client.active ? 'success' : 'warning'}>
                    {client.active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {client.tags.map(tag => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                    <Button variant="secondary" size="sm">
                      Editar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
```

---

**💡 Recuerda**: Estos componentes están diseñados para ser reutilizables y consistentes. Úsalos en todos los módulos para mantener la coherencia visual del sistema.

