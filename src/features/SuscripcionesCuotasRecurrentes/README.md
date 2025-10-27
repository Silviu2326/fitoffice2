# 🔄 Módulo Suscripciones & Cuotas Recurrentes

## Descripción
Sistema completo de gestión de suscripciones y cuotas recurrentes con lógica diferenciada por tipo de usuario. Para entrenadores: paquetes mensuales PT ('4 sesiones/mes'), pagos recurrentes 1 a 1. Para gimnasios: cuotas de socios, freeze, upgrade/downgrade de plan, multisesión. Este módulo automatiza la gestión de membresías y garantiza un flujo de ingresos recurrente predecible.

## Estructura del Módulo

```
src/features/SuscripcionesCuotasRecurrentes/
├── components/                     # Componentes React del módulo
│   ├── SuscripcionesManager.tsx           # Gestión de suscripciones
│   ├── GestorCuotas.tsx                   # Gestión de cuotas recurrentes
│   ├── UpgradeDowngrade.tsx               # Cambios de plan
│   ├── FreezeSuscripcion.tsx              # Pausas temporales
│   ├── Multisesion.tsx                    # Acceso múltiples usuarios
│   └── AnalyticsSuscripciones.tsx         # Métricas y análisis
├── pages/                          # Páginas del módulo
│   └── SuscripcionesCuotasRecurrentesPage.tsx  # Página principal con navegación
├── api/                            # Funciones de API
│   ├── suscripciones.ts           # API para gestión de suscripciones
│   ├── cuotas.ts                  # API para cuotas recurrentes
│   └── renovaciones.ts            # API para renovaciones automáticas
├── index.ts                       # Exportaciones públicas del módulo
└── README.md                      # Este archivo
```

## Funcionalidades Principales

### 1. Gestión de Suscripciones (SuscripcionesManager)
- Vista completa de todas las suscripciones activas
- Diferenciación entre suscripciones de entrenadores y gimnasios
- Control de sesiones disponibles (para entrenadores)
- Estados: Activa, Pausada, Cancelada
- Búsqueda y filtrado de suscripciones
- Creación y edición de suscripciones

### 2. Gestor de Cuotas Recurrentes (GestorCuotas)
- Visualización de cuotas pendientes, procesadas y fallidas
- Automatización de cobros periódicos
- Control de intentos de pago
- Estadísticas de ingresos recurrentes
- Métodos de pago: Tarjeta, Domiciliación bancaria

### 3. Upgrade/Downgrade de Planes (UpgradeDowngrade)
- Cambios flexibles de plan
- Ajustes automáticos de precio
- Historial de cambios
- Estados: Pendiente, Procesado
- Cálculo de diferencias de precio

### 4. Freeze de Suscripción (FreezeSuscripcion)
- Pausa temporal de membresías
- Control de fechas de inicio y fin
- Registro de motivos
- Reactivación automática o manual
- Estados: Programado, Activo, Finalizado

### 5. Multisesión (Multisesion)
- Acceso a múltiples usuarios bajo una suscripción
- Planes familiares y corporativos
- Control de límite de usuarios
- Precio base + precio por usuario adicional
- Gestión de usuarios activos

### 6. Analytics de Suscripciones (AnalyticsSuscripciones)
- Métricas clave: MRR, ARPU, Churn Rate, LTV
- Tasa de retención de clientes
- Distribución por planes
- Tendencias de crecimiento
- Próximas renovaciones

## Integración en la Aplicación

### Rutas
El módulo está registrado en `/suscripciones-cuotas` en el archivo `src/App.tsx`:

```typescript
<Route path="/suscripciones-cuotas" element={<SuscripcionesCuotasRecurrentesPage />} />
```

### Navegación
El módulo aparece en el sidebar con el icono de RefreshCw (🔄) y el texto "Suscripciones & Cuotas".

## Uso

### Navegación por Tabs
La página principal utiliza tabs para navegar entre las diferentes secciones:
- **Suscripciones**: Vista general y gestión
- **Cuotas Recurrentes**: Control de pagos automáticos
- **Upgrade/Downgrade**: Cambios de plan
- **Freeze**: Pausas temporales
- **Multisesión**: Acceso múltiple usuarios
- **Analytics**: Métricas y análisis

## Tipos de Datos Principales

### Suscripcion
```typescript
{
  id: string;
  cliente: string;
  plan: string;
  precio: number;
  frecuencia: 'mensual' | 'trimestral' | 'anual';
  sesiones_disponibles?: number;
  fecha_inicio: string;
  fecha_renovacion: string;
  estado: 'activa' | 'pausada' | 'cancelada';
  tipo: 'entrenador' | 'gimnasio';
}
```

### Cuota
```typescript
{
  id: string;
  suscripcion_id: string;
  cliente_id: string;
  monto: number;
  fecha_cobro: string;
  estado: 'pendiente' | 'procesado' | 'fallido';
  metodo_pago: string;
  intentos: number;
}
```

### Renovacion
```typescript
{
  id: string;
  suscripcion_id: string;
  cliente_id: string;
  fecha_renovacion: string;
  monto: number;
  estado: 'programada' | 'completada' | 'fallida';
  metodo_pago: string;
}
```

### CambioPlan
```typescript
{
  id: string;
  cliente: string;
  plan_actual: string;
  plan_nuevo: string;
  precio_actual: number;
  precio_nuevo: number;
  tipo: 'upgrade' | 'downgrade';
  fecha_solicitud: string;
  estado: 'pendiente' | 'procesado';
}
```

### FreezeSolicitud
```typescript
{
  id: string;
  cliente: string;
  plan: string;
  fecha_inicio_freeze: string;
  fecha_fin_freeze: string;
  motivo: string;
  estado: 'activo' | 'programado' | 'finalizado';
}
```

### MultisesionCliente
```typescript
{
  id: string;
  cliente_principal: string;
  usuarios_adicionales: string[];
  plan: string;
  max_usuarios: number;
  precio_base: number;
  precio_por_adicional: number;
  estado: 'activo' | 'inactivo';
}
```

## Métricas Clave (KPIs)

### MRR (Monthly Recurring Revenue)
Ingresos recurrentes mensuales totales.

### ARPU (Average Revenue Per User)
Ingreso promedio por usuario.

### Churn Rate
Tasa de cancelación de suscripciones.

### LTV (Lifetime Value)
Valor de vida del cliente.

### Tasa de Retención
Porcentaje de clientes que renuevan su suscripción.

## Próximos Pasos (Implementación Futura)

1. **Integración con Backend**
   - Conectar las funciones API con Supabase
   - Implementar webhooks para renovaciones automáticas
   - Sistema de notificaciones por email/SMS
   - Gestión de errores y reintentos de pago

2. **Integración con Pasarelas de Pago**
   - Stripe para pagos recurrentes
   - PayPal para suscripciones
   - Domiciliación bancaria SEPA
   - Sistema de recordatorios de pago

3. **Funcionalidades Adicionales**
   - Cupones y descuentos
   - Períodos de prueba gratuitos
   - Prorratas automáticas en cambios de plan
   - Sistema de referidos
   - Contratos y términos de suscripción
   - Facturación automática

4. **Mejoras de UX**
   - Portal de cliente para gestión de suscripción
   - Calendario de renovaciones
   - Gráficos de evolución de MRR
   - Reportes exportables (PDF/Excel)
   - Dashboard de predicción de ingresos

## Lógica Diferenciada por Tipo de Usuario

### Para Entrenadores Personales 🧍
- Paquetes PT: 4, 8, 12 sesiones/mes
- Control de sesiones disponibles
- Pagos recurrentes 1 a 1
- Pausas por viajes o lesiones
- Upgrades simples de paquetes

### Para Gimnasios/Centros 🏢
- Planes: Básico, Premium, VIP
- Acceso completo a instalaciones
- Multisesión familiar/corporativa
- Freeze más estructurado
- Gestión masiva de socios
- Control de acceso por tipo de membresía

## Tecnologías Utilizadas

- React 18.3
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React (iconos)
- Supabase (backend previsto)

## Notas

Este módulo es fundamental tanto para entrenadores personales como para gimnasios, aunque la lógica y las funcionalidades difieren:

**Entrenadores**: Se enfoca en paquetes de sesiones, pagos recurrentes simples y relación 1 a 1 con el cliente.

**Gimnasios**: Se centra en cuotas de socios, control de acceso, multisesión familiar/corporativa y gestión masiva de membresías.

El módulo proporciona un flujo de ingresos predecible y automatiza completamente la gestión de suscripciones, mejorando la retención de clientes y reduciendo la carga administrativa.


