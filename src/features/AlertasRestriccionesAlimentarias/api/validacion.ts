// API para validación de ingredientes

export interface ResultadoValidacion {
  ingrediente: string;
  esSeguro: boolean;
  restriccionesDetectadas: RestriccionDetectada[];
  alternativasSeguras: AlternativaSegura[];
  clienteId: string;
  clienteNombre: string;
  fecha: string;
}

export interface RestriccionDetectada {
  id: string;
  tipo: 'alergia' | 'intolerancia' | 'religiosa' | 'cultural';
  descripcion: string;
  severidad: 'leve' | 'moderada' | 'severa';
}

export interface AlternativaSegura {
  ingrediente: string;
  categoria: string;
  propiedades: string;
  compatibilidad: number;
  valorNutricional: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

export interface ValidarIngredienteDTO {
  ingrediente: string;
  clienteId: string;
  recetaId?: string;
}

export interface ValidarRecetaDTO {
  recetaId: string;
  ingredientes: string[];
  clienteId: string;
}

// POST /api/nutricion/validar-ingrediente
export async function validarIngrediente(data: ValidarIngredienteDTO): Promise<ResultadoValidacion> {
  // TODO: Implementar llamada real a la API
  console.log('Validar ingrediente:', data);
  
  // Mock de respuesta
  return {
    ingrediente: data.ingrediente,
    esSeguro: true,
    restriccionesDetectadas: [],
    alternativasSeguras: [],
    clienteId: data.clienteId,
    clienteNombre: 'Cliente Mock',
    fecha: new Date().toISOString()
  };
}

// POST /api/nutricion/validar-receta
export async function validarReceta(data: ValidarRecetaDTO): Promise<{
  recetaId: string;
  esSegura: boolean;
  ingredientesProblematicos: string[];
  validaciones: ResultadoValidacion[];
}> {
  // TODO: Implementar llamada real a la API
  console.log('Validar receta:', data);
  
  return {
    recetaId: data.recetaId,
    esSegura: true,
    ingredientesProblematicos: [],
    validaciones: []
  };
}

// GET /api/nutricion/sustituciones
export async function obtenerSustituciones(ingrediente: string, restricciones: string[]): Promise<AlternativaSegura[]> {
  // TODO: Implementar llamada real a la API
  console.log('Obtener sustituciones para:', ingrediente, restricciones);
  return [];
}

// GET /api/nutricion/validaciones/historial
export async function obtenerHistorialValidaciones(clienteId?: string): Promise<ResultadoValidacion[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// POST /api/nutricion/validaciones/batch
export async function validarIngredientesBatch(data: {
  ingredientes: string[];
  clienteId: string;
}): Promise<ResultadoValidacion[]> {
  // TODO: Implementar llamada real a la API
  console.log('Validar ingredientes en batch:', data);
  return [];
}

