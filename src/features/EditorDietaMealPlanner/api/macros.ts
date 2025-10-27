/**
 * Tipos de datos para el cálculo de macros
 */
export interface DatosPersonales {
  peso: number; // kg
  altura: number; // cm
  edad: number; // años
  sexo: 'hombre' | 'mujer';
  nivelActividad: 'sedentaria' | 'ligera' | 'moderada' | 'intensa' | 'muyIntensa';
  objetivo: 'perdida-peso' | 'mantenimiento' | 'ganancia-muscular' | 'definicion';
}

export interface ResultadosMacros {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  tmb: number; // Tasa Metabólica Basal
  tdee: number; // Gasto Energético Diario Total
}

/**
 * Factores de actividad física para calcular TDEE
 */
const FACTORES_ACTIVIDAD = {
  sedentaria: 1.2,
  ligera: 1.375,
  moderada: 1.55,
  intensa: 1.725,
  muyIntensa: 1.9
};

/**
 * Ajustes de calorías según objetivo
 */
const AJUSTES_OBJETIVO = {
  'perdida-peso': -0.15, // -15%
  'mantenimiento': 0,
  'ganancia-muscular': 0.15, // +15%
  'definicion': -0.10 // -10%
};

/**
 * Calcula la Tasa Metabólica Basal usando la ecuación de Harris-Benedict revisada
 */
function calcularTMB(datos: DatosPersonales): number {
  const { peso, altura, edad, sexo } = datos;

  if (sexo === 'hombre') {
    // TMB Hombres = 88.362 + (13.397 × peso) + (4.799 × altura) - (5.677 × edad)
    return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
  } else {
    // TMB Mujeres = 447.593 + (9.247 × peso) + (3.098 × altura) - (4.330 × edad)
    return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
  }
}

/**
 * Calcula el Gasto Energético Diario Total (TDEE)
 */
function calcularTDEE(tmb: number, nivelActividad: DatosPersonales['nivelActividad']): number {
  return tmb * FACTORES_ACTIVIDAD[nivelActividad];
}

/**
 * Ajusta las calorías según el objetivo
 */
function ajustarCaloriasObjetivo(tdee: number, objetivo: DatosPersonales['objetivo']): number {
  const ajuste = AJUSTES_OBJETIVO[objetivo];
  return tdee * (1 + ajuste);
}

/**
 * Calcula la distribución de macronutrientes
 */
function calcularDistribucionMacros(calorias: number, peso: number, objetivo: DatosPersonales['objetivo']): {
  proteinas: number;
  carbohidratos: number;
  grasas: number;
} {
  // Proteínas: 2-2.5g por kg de peso corporal (dependiendo del objetivo)
  let proteinasPorKg = 2.0;
  if (objetivo === 'ganancia-muscular') proteinasPorKg = 2.5;
  if (objetivo === 'perdida-peso' || objetivo === 'definicion') proteinasPorKg = 2.2;
  
  const proteinas = peso * proteinasPorKg;
  const caloriasProteinas = proteinas * 4; // 4 kcal por gramo

  // Grasas: 25-30% de las calorías totales
  const porcentajeGrasas = 0.25;
  const caloriasGrasas = calorias * porcentajeGrasas;
  const grasas = caloriasGrasas / 9; // 9 kcal por gramo

  // Carbohidratos: resto de calorías
  const caloriasRestantes = calorias - caloriasProteinas - caloriasGrasas;
  const carbohidratos = caloriasRestantes / 4; // 4 kcal por gramo

  return {
    proteinas: Math.round(proteinas),
    carbohidratos: Math.round(carbohidratos),
    grasas: Math.round(grasas)
  };
}

/**
 * Función principal para calcular macros
 */
export function calcularMacros(datos: DatosPersonales): ResultadosMacros {
  // 1. Calcular TMB
  const tmb = calcularTMB(datos);

  // 2. Calcular TDEE
  const tdee = calcularTDEE(tmb, datos.nivelActividad);

  // 3. Ajustar calorías según objetivo
  const caloriasFinal = ajustarCaloriasObjetivo(tdee, datos.objetivo);

  // 4. Calcular distribución de macros
  const macros = calcularDistribucionMacros(caloriasFinal, datos.peso, datos.objetivo);

  return {
    calorias: Math.round(caloriasFinal),
    proteinas: macros.proteinas,
    carbohidratos: macros.carbohidratos,
    grasas: macros.grasas,
    tmb: Math.round(tmb),
    tdee: Math.round(tdee)
  };
}

/**
 * Calcula macros por comida (distribución en N comidas)
 */
export function calcularMacrosPorComida(
  macrosTotales: ResultadosMacros,
  numeroComidas: number
): ResultadosMacros[] {
  const comidas: ResultadosMacros[] = [];

  for (let i = 0; i < numeroComidas; i++) {
    comidas.push({
      calorias: Math.round(macrosTotales.calorias / numeroComidas),
      proteinas: Math.round(macrosTotales.proteinas / numeroComidas),
      carbohidratos: Math.round(macrosTotales.carbohidratos / numeroComidas),
      grasas: Math.round(macrosTotales.grasas / numeroComidas),
      tmb: macrosTotales.tmb,
      tdee: macrosTotales.tdee
    });
  }

  return comidas;
}

/**
 * Calcula el porcentaje de cada macronutriente
 */
export function calcularPorcentajesMacros(macros: ResultadosMacros): {
  proteinas: number;
  carbohidratos: number;
  grasas: number;
} {
  const totalCalorias = macros.calorias;

  return {
    proteinas: Math.round((macros.proteinas * 4 / totalCalorias) * 100),
    carbohidratos: Math.round((macros.carbohidratos * 4 / totalCalorias) * 100),
    grasas: Math.round((macros.grasas * 9 / totalCalorias) * 100)
  };
}

/**
 * Ajusta macros manualmente (mantiene calorías constantes)
 */
export function ajustarMacrosManual(
  macrosActuales: ResultadosMacros,
  ajustes: Partial<Pick<ResultadosMacros, 'proteinas' | 'carbohidratos' | 'grasas'>>
): ResultadosMacros {
  const nuevaProteinas = ajustes.proteinas ?? macrosActuales.proteinas;
  const nuevaCarbohidratos = ajustes.carbohidratos ?? macrosActuales.carbohidratos;
  const nuevaGrasas = ajustes.grasas ?? macrosActuales.grasas;

  const nuevasCalorias = (nuevaProteinas * 4) + (nuevaCarbohidratos * 4) + (nuevaGrasas * 9);

  return {
    ...macrosActuales,
    proteinas: nuevaProteinas,
    carbohidratos: nuevaCarbohidratos,
    grasas: nuevaGrasas,
    calorias: Math.round(nuevasCalorias)
  };
}

