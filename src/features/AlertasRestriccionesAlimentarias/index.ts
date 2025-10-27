// Exportaciones principales del módulo AlertasRestriccionesAlimentarias

// Página principal
export { default as AlertasRestriccionesAlimentariasPage } from './pages/AlertasRestriccionesAlimentariasPage';

// Componentes
export { default as RestriccionesList } from './components/RestriccionesList';
export { default as AlertasAlergias } from './components/AlertasAlergias';
export { default as ConfiguradorRestricciones } from './components/ConfiguradorRestricciones';
export { default as ValidacionIngredientes } from './components/ValidacionIngredientes';
export { default as HistorialAlertas } from './components/HistorialAlertas';
export { default as SustitucionesSeguras } from './components/SustitucionesSeguras';
export { default as ReportesCompliance } from './components/ReportesCompliance';
export { default as NotificacionesSeguridad } from './components/NotificacionesSeguridad';

// APIs
export * from './api/restricciones';
export * from './api/alertas';
export * from './api/validacion';

