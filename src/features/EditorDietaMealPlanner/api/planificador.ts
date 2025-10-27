/**
 * Tipos para la planificación de comidas
 */
export interface ComidaPlanificada {
  id: string;
  dia: string;
  nombre: string;
  horario: string;
  alimentos: AlimentoComida[];
  macros: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

export interface AlimentoComida {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  macros: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    calorias: number;
  };
}

export interface PlanSemanal {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  comidas: ComidaPlanificada[];
  macrosDiarios: {
    [dia: string]: {
      calorias: number;
      proteinas: number;
      carbohidratos: number;
      grasas: number;
    };
  };
}

/**
 * Días de la semana
 */
export const DIAS_SEMANA = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
] as const;

export type DiaSemana = typeof DIAS_SEMANA[number];

/**
 * Plantillas de horarios de comidas comunes
 */
export const PLANTILLAS_HORARIOS = {
  '3-comidas': [
    { nombre: 'Desayuno', horario: '08:00' },
    { nombre: 'Almuerzo', horario: '14:00' },
    { nombre: 'Cena', horario: '21:00' }
  ],
  '4-comidas': [
    { nombre: 'Desayuno', horario: '08:00' },
    { nombre: 'Almuerzo', horario: '13:00' },
    { nombre: 'Merienda', horario: '17:00' },
    { nombre: 'Cena', horario: '21:00' }
  ],
  '5-comidas': [
    { nombre: 'Desayuno', horario: '08:00' },
    { nombre: 'Snack AM', horario: '11:00' },
    { nombre: 'Almuerzo', horario: '14:00' },
    { nombre: 'Snack PM', horario: '17:00' },
    { nombre: 'Cena', horario: '21:00' }
  ],
  '6-comidas': [
    { nombre: 'Desayuno', horario: '07:00' },
    { nombre: 'Snack AM', horario: '10:00' },
    { nombre: 'Almuerzo', horario: '13:00' },
    { nombre: 'Snack Pre-Entreno', horario: '16:00' },
    { nombre: 'Cena', horario: '19:00' },
    { nombre: 'Snack Nocturno', horario: '22:00' }
  ]
};

/**
 * Crea un plan semanal vacío con estructura base
 */
export function crearPlanSemanalVacio(nombre: string): PlanSemanal {
  const hoy = new Date();
  const finSemana = new Date(hoy);
  finSemana.setDate(finSemana.getDate() + 7);

  const macrosDiarios: PlanSemanal['macrosDiarios'] = {};
  DIAS_SEMANA.forEach(dia => {
    macrosDiarios[dia] = {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };
  });

  return {
    id: Date.now().toString(),
    nombre,
    fechaInicio: hoy.toISOString(),
    fechaFin: finSemana.toISOString(),
    comidas: [],
    macrosDiarios
  };
}

/**
 * Agrega una comida al plan semanal
 */
export function agregarComidaPlan(
  plan: PlanSemanal,
  dia: DiaSemana,
  nombre: string,
  horario: string,
  alimentos: AlimentoComida[]
): PlanSemanal {
  const macros = calcularMacrosComida(alimentos);

  const nuevaComida: ComidaPlanificada = {
    id: Date.now().toString(),
    dia,
    nombre,
    horario,
    alimentos,
    macros
  };

  const comidasActualizadas = [...plan.comidas, nuevaComida];
  const macrosDiariosActualizados = recalcularMacrosDiarios(comidasActualizadas);

  return {
    ...plan,
    comidas: comidasActualizadas,
    macrosDiarios: macrosDiariosActualizados
  };
}

/**
 * Calcula los macros totales de una comida
 */
function calcularMacrosComida(alimentos: AlimentoComida[]): ComidaPlanificada['macros'] {
  return alimentos.reduce(
    (acc, alimento) => {
      const factor = alimento.cantidad; // Asumimos que cantidad es un multiplicador
      return {
        calorias: acc.calorias + (alimento.macros.calorias * factor),
        proteinas: acc.proteinas + (alimento.macros.proteinas * factor),
        carbohidratos: acc.carbohidratos + (alimento.macros.carbohidratos * factor),
        grasas: acc.grasas + (alimento.macros.grasas * factor)
      };
    },
    { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 }
  );
}

/**
 * Recalcula los macros diarios del plan completo
 */
function recalcularMacrosDiarios(comidas: ComidaPlanificada[]): PlanSemanal['macrosDiarios'] {
  const macrosDiarios: PlanSemanal['macrosDiarios'] = {};

  // Inicializar todos los días en 0
  DIAS_SEMANA.forEach(dia => {
    macrosDiarios[dia] = {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };
  });

  // Sumar macros de cada comida al día correspondiente
  comidas.forEach(comida => {
    if (macrosDiarios[comida.dia]) {
      macrosDiarios[comida.dia].calorias += comida.macros.calorias;
      macrosDiarios[comida.dia].proteinas += comida.macros.proteinas;
      macrosDiarios[comida.dia].carbohidratos += comida.macros.carbohidratos;
      macrosDiarios[comida.dia].grasas += comida.macros.grasas;
    }
  });

  return macrosDiarios;
}

/**
 * Elimina una comida del plan
 */
export function eliminarComidaPlan(plan: PlanSemanal, comidaId: string): PlanSemanal {
  const comidasActualizadas = plan.comidas.filter(c => c.id !== comidaId);
  const macrosDiariosActualizados = recalcularMacrosDiarios(comidasActualizadas);

  return {
    ...plan,
    comidas: comidasActualizadas,
    macrosDiarios: macrosDiariosActualizados
  };
}

/**
 * Duplica un día completo a otro día
 */
export function duplicarDia(plan: PlanSemanal, diaOrigen: DiaSemana, diaDestino: DiaSemana): PlanSemanal {
  const comidasDia = plan.comidas.filter(c => c.dia === diaOrigen);
  
  const nuevasComidas = comidasDia.map(comida => ({
    ...comida,
    id: `${Date.now()}-${Math.random()}`,
    dia: diaDestino
  }));

  const comidasActualizadas = [...plan.comidas, ...nuevasComidas];
  const macrosDiariosActualizados = recalcularMacrosDiarios(comidasActualizadas);

  return {
    ...plan,
    comidas: comidasActualizadas,
    macrosDiarios: macrosDiariosActualizados
  };
}

/**
 * Obtiene las comidas de un día específico
 */
export function obtenerComidasDia(plan: PlanSemanal, dia: DiaSemana): ComidaPlanificada[] {
  return plan.comidas
    .filter(c => c.dia === dia)
    .sort((a, b) => a.horario.localeCompare(b.horario));
}

/**
 * Calcula el promedio de macros semanal
 */
export function calcularPromedioSemanal(plan: PlanSemanal): {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
} {
  const totales = Object.values(plan.macrosDiarios).reduce(
    (acc, dia) => ({
      calorias: acc.calorias + dia.calorias,
      proteinas: acc.proteinas + dia.proteinas,
      carbohidratos: acc.carbohidratos + dia.carbohidratos,
      grasas: acc.grasas + dia.grasas
    }),
    { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 }
  );

  return {
    calorias: Math.round(totales.calorias / 7),
    proteinas: Math.round(totales.proteinas / 7),
    carbohidratos: Math.round(totales.carbohidratos / 7),
    grasas: Math.round(totales.grasas / 7)
  };
}

/**
 * Genera lista de compra del plan semanal
 */
export function generarListaCompra(plan: PlanSemanal): {
  [categoria: string]: Array<{ nombre: string; cantidad: number; unidad: string }>;
} {
  const listaAgrupada: {
    [alimento: string]: { cantidad: number; unidad: string; categoria: string };
  } = {};

  // Agrupar todos los alimentos
  plan.comidas.forEach(comida => {
    comida.alimentos.forEach(alimento => {
      if (listaAgrupada[alimento.nombre]) {
        listaAgrupada[alimento.nombre].cantidad += alimento.cantidad;
      } else {
        listaAgrupada[alimento.nombre] = {
          cantidad: alimento.cantidad,
          unidad: alimento.unidad,
          categoria: 'General' // Esto debería venir de una base de datos de alimentos
        };
      }
    });
  });

  // Organizar por categoría
  const listaPorCategoria: {
    [categoria: string]: Array<{ nombre: string; cantidad: number; unidad: string }>;
  } = {};

  Object.entries(listaAgrupada).forEach(([nombre, datos]) => {
    if (!listaPorCategoria[datos.categoria]) {
      listaPorCategoria[datos.categoria] = [];
    }
    listaPorCategoria[datos.categoria].push({
      nombre,
      cantidad: datos.cantidad,
      unidad: datos.unidad
    });
  });

  return listaPorCategoria;
}

