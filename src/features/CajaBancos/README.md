# 💰 Módulo Caja & Bancos

## Descripción
Sistema completo de gestión de caja física y bancos para negocios con recepción y TPV. Proporciona control de efectivo, conciliación bancaria, gestión de TPV y auditoría de movimientos.

## Estructura del Módulo

```
src/features/CajaBancos/
├── components/           # Componentes React del módulo
│   ├── CajaManager.tsx             # Dashboard principal de caja
│   ├── ArqueoCaja.tsx              # Sistema de arqueo de caja física
│   ├── ConciliacionBancaria.tsx    # Conciliación con extractos bancarios
│   ├── ControlTPV.tsx              # Control de transacciones TPV
│   ├── MovimientosBancarios.tsx    # Registro de movimientos bancarios
│   ├── ControlDiferencias.tsx      # Gestión de diferencias de caja
│   ├── ReportesCaja.tsx            # Análisis y reportes de caja
│   └── AuditoriaCaja.tsx           # Sistema de auditoría de movimientos
├── pages/               # Páginas del módulo
│   └── CajaBancosPage.tsx         # Página principal con navegación por tabs
├── api/                 # Funciones de API
│   ├── caja.ts         # API para gestión de caja
│   ├── bancos.ts       # API para conciliación bancaria
│   └── movimientos.ts  # API para movimientos generales
├── index.ts            # Exportaciones públicas del módulo
└── README.md           # Este archivo
```

## Funcionalidades Principales

### 1. Resumen de Caja (CajaManager)
- Vista general del efectivo actual en caja
- Ingresos y gastos del día
- Detección de diferencias
- Últimos movimientos registrados

### 2. Arqueo de Caja (ArqueoCaja)
- Conteo de billetes y monedas
- Comparación con saldo del sistema
- Detección automática de diferencias (faltantes/sobrantes)
- Registro de arqueos diarios

### 3. Conciliación Bancaria (ConciliacionBancaria)
- Importación de extractos bancarios (CSV, XLS, XLSX)
- Comparación con registros internos
- Marcado de movimientos conciliados
- Identificación de diferencias y movimientos pendientes

### 4. Control TPV (ControlTPV)
- Registro de transacciones con tarjeta
- Control por terminal
- Estados: Aprobado, Rechazado, Pendiente
- Totales por tipo de transacción

### 5. Movimientos Bancarios (MovimientosBancarios)
- Registro completo de ingresos y gastos
- Filtros por tipo, método, fecha
- Categorización de movimientos
- Balance y resumen de movimientos

### 6. Control de Diferencias (ControlDiferencias)
- Identificación de faltantes y sobrantes
- Seguimiento de diferencias pendientes
- Estados: Pendiente, Investigando, Resuelto
- Registro de resoluciones

### 7. Reportes de Caja (ReportesCaja)
- Generación de reportes diarios, semanales, mensuales
- Exportación en PDF y Excel
- Métricas y análisis de tendencias
- Resúmenes personalizados

### 8. Auditoría de Caja (AuditoriaCaja)
- Registro completo de todas las acciones
- Trazabilidad de modificaciones
- Control de usuarios y horarios
- Exportación de logs de auditoría

## Integración en la Aplicación

### Rutas
El módulo está registrado en `/caja-bancos` en el archivo `src/App.tsx`:

```typescript
<Route path="/caja-bancos" element={<CajaBancosPage />} />
```

### Navegación
El módulo aparece en el sidebar con el icono de billetera (Wallet) y el texto "Caja & Bancos".

## Uso

### Navegación por Tabs
La página principal utiliza tabs para navegar entre las diferentes secciones:
- **Resumen**: Vista general de la caja
- **Arqueo de Caja**: Realizar arqueos diarios
- **Conciliación Bancaria**: Conciliar movimientos bancarios
- **Control TPV**: Gestionar transacciones con tarjeta

## Próximos Pasos (Implementación Futura)

1. **Integración con Backend**
   - Conectar las funciones API con el backend real
   - Implementar autenticación en las llamadas API
   - Gestión de errores y estados de carga

2. **Funcionalidades Adicionales**
   - Exportación de reportes PDF/Excel
   - Gráficos de evolución de caja
   - Alertas de diferencias significativas
   - Historial completo de arqueos
   - Integración con sistemas bancarios (Open Banking)

3. **Mejoras de UX**
   - Filtros avanzados de movimientos
   - Búsqueda en tiempo real
   - Paginación de tablas
   - Modo offline con sincronización

## Tipos de Datos Principales

### CajaMovimiento
```typescript
{
  id: string;
  fecha: string;
  tipo: 'ingreso' | 'gasto';
  monto: number;
  concepto: string;
  metodo: 'efectivo' | 'tarjeta' | 'transferencia';
}
```

### MovimientoBancario
```typescript
{
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  cuenta: string;
  conciliado: boolean;
}
```

### TransaccionTPV
```typescript
{
  id: string;
  fecha: string;
  hora: string;
  monto: number;
  terminal: string;
  estado: 'aprobado' | 'rechazado' | 'pendiente';
  cliente?: string;
}
```

## Tecnologías Utilizadas

- React 18.3
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React (iconos)

## Notas

Este módulo está diseñado para gimnasios y centros fitness que manejan efectivo, TPV y múltiples cuentas bancarias. Es especialmente útil para:
- Gimnasios con recepción física
- Centros con múltiples formas de pago
- Negocios que requieren control diario de caja
- Organizaciones que necesitan conciliación bancaria

Para entrenadores independientes que no manejan caja física, este módulo puede no ser necesario.

