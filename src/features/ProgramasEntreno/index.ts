// Exportaciones principales del módulo ProgramasEntreno
export { default as ProgramasEntrenoPage } from './pages/ProgramasEntrenoPage';

// Componentes
export { default as ProgramasList } from './components/ProgramasList';
export { default as AsignacionCliente } from './components/AsignacionCliente';
export { default as ProgramasGrupo } from './components/ProgramasGrupo';
export { default as PlanSala } from './components/PlanSala';
export { default as EditorPrograma } from './components/EditorPrograma';
export { default as SeguimientoPrograma } from './components/SeguimientoPrograma';
export { default as DuplicadorPrograma } from './components/DuplicadorPrograma';
export { default as CategorizadorProgramas } from './components/CategorizadorProgramas';

// APIs
export { programasAPI } from './api/programas';
export { asignacionesAPI } from './api/asignaciones';
export { categoriasAPI } from './api/categorias';

// Tipos
export type { Programa, Fase, Ejercicio } from './api/programas';
export type { Asignacion, Cliente } from './api/asignaciones';
export type { Categoria } from './api/categorias';

