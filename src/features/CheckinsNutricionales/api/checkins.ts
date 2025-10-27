// API para Check-ins Nutricionales

interface Checkin {
  id?: string;
  cliente_id: string;
  cliente_nombre: string;
  fecha: string;
  hora: string;
  tipo_comida: 'desayuno' | 'almuerzo' | 'comida' | 'merienda' | 'cena';
  hambre_antes: number;
  saciedad_despues: number;
  peso: number;
  foto_url?: string;
  notas?: string;
  completado: boolean;
  created_at?: string;
}

// Mock data para desarrollo
const mockCheckins: Checkin[] = [
  {
    id: '1',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-26',
    hora: '08:30:00',
    tipo_comida: 'desayuno',
    hambre_antes: 7,
    saciedad_despues: 8,
    peso: 78.5,
    notas: 'Me sentí bien después del desayuno',
    completado: true,
    created_at: '2025-10-26T08:30:00Z',
  },
  {
    id: '2',
    cliente_id: 'c2',
    cliente_nombre: 'María López',
    fecha: '2025-10-26',
    hora: '09:00:00',
    tipo_comida: 'desayuno',
    hambre_antes: 6,
    saciedad_despues: 7,
    peso: 65.2,
    notas: 'Desayuno saludable, avena con frutas',
    completado: true,
    created_at: '2025-10-26T09:00:00Z',
  },
  {
    id: '3',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    fecha: '2025-10-26',
    hora: '14:00:00',
    tipo_comida: 'comida',
    hambre_antes: 8,
    saciedad_despues: 9,
    peso: 78.5,
    notas: 'Comida completa con proteína y vegetales',
    completado: true,
    created_at: '2025-10-26T14:00:00Z',
  },
];

let checkins = [...mockCheckins];

export async function getCheckins(): Promise<Checkin[]> {
  // Simulación de llamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...checkins]);
    }, 500);
  });
}

export async function getCheckinById(id: string): Promise<Checkin | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const checkin = checkins.find(c => c.id === id);
      resolve(checkin || null);
    }, 300);
  });
}

export async function createCheckin(data: Omit<Checkin, 'id' | 'created_at'>): Promise<Checkin> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCheckin: Checkin = {
        ...data,
        id: `c${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      checkins.unshift(newCheckin);
      resolve(newCheckin);
    }, 300);
  });
}

export async function updateCheckin(id: string, data: Partial<Checkin>): Promise<Checkin | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = checkins.findIndex(c => c.id === id);
      if (index !== -1) {
        checkins[index] = { ...checkins[index], ...data };
        resolve(checkins[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
}

export async function deleteCheckin(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = checkins.findIndex(c => c.id === id);
      if (index !== -1) {
        checkins.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}

// Funciones de adherencia
export async function getAdherencia() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const adherencias = [
        {
          cliente_id: 'c1',
          cliente_nombre: 'Juan Pérez',
          checkins_realizados: 18,
          checkins_esperados: 21,
          porcentaje_adherencia: 85.7,
          ultima_fecha: '2025-10-26',
        },
        {
          cliente_id: 'c2',
          cliente_nombre: 'María López',
          checkins_realizados: 20,
          checkins_esperados: 21,
          porcentaje_adherencia: 95.2,
          ultima_fecha: '2025-10-26',
        },
        {
          cliente_id: 'c3',
          cliente_nombre: 'Carlos Ruiz',
          checkins_realizados: 12,
          checkins_esperados: 21,
          porcentaje_adherencia: 57.1,
          ultima_fecha: '2025-10-25',
        },
      ];
      resolve(adherencias);
    }, 500);
  });
}

// Funciones de tendencias
export async function getTendencias() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tendencias = [
        {
          cliente_id: 'c1',
          cliente_nombre: 'Juan Pérez',
          peso_inicial: 82.0,
          peso_actual: 78.5,
          cambio_peso: -3.5,
          hambre_promedio: 6.8,
          saciedad_promedio: 7.5,
          tendencia_peso: 'bajando' as const,
          alertas: [],
        },
        {
          cliente_id: 'c2',
          cliente_nombre: 'María López',
          peso_inicial: 67.0,
          peso_actual: 65.2,
          cambio_peso: -1.8,
          hambre_promedio: 6.2,
          saciedad_promedio: 7.8,
          tendencia_peso: 'bajando' as const,
          alertas: [],
        },
        {
          cliente_id: 'c3',
          cliente_nombre: 'Carlos Ruiz',
          peso_inicial: 90.0,
          peso_actual: 91.5,
          cambio_peso: 1.5,
          hambre_promedio: 8.5,
          saciedad_promedio: 5.2,
          tendencia_peso: 'subiendo' as const,
          alertas: [
            'Hambre extrema constante - revisar calorías',
            'Baja saciedad después de comer - revisar macros',
            'Adherencia baja (57%) - necesita apoyo',
          ],
        },
      ];
      resolve(tendencias);
    }, 500);
  });
}

// Funciones de feedback
interface Feedback {
  id?: string;
  cliente_id: string;
  cliente_nombre: string;
  entrenador_nombre: string;
  mensaje: string;
  tipo: 'positivo' | 'neutral' | 'alerta';
  fecha: string;
  hora: string;
  leido: boolean;
}

let feedbacks: Feedback[] = [
  {
    id: 'f1',
    cliente_id: 'c1',
    cliente_nombre: 'Juan Pérez',
    entrenador_nombre: 'Dr. Nutrición',
    mensaje: '¡Excelente trabajo esta semana! Tu adherencia ha sido del 95% y se nota en los resultados. Sigue así 💪',
    tipo: 'positivo',
    fecha: '2025-10-25',
    hora: '18:00:00',
    leido: true,
  },
  {
    id: 'f2',
    cliente_id: 'c3',
    cliente_nombre: 'Carlos Ruiz',
    entrenador_nombre: 'Dr. Nutrición',
    mensaje: 'He notado que tu adherencia ha bajado. ¿Hay algún obstáculo? Vamos a ajustar el plan juntos.',
    tipo: 'alerta',
    fecha: '2025-10-26',
    hora: '10:00:00',
    leido: false,
  },
];

export async function getFeedbacks(): Promise<Feedback[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...feedbacks]);
    }, 500);
  });
}

export async function enviarFeedback(data: Omit<Feedback, 'id' | 'leido'>): Promise<Feedback> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFeedback: Feedback = {
        ...data,
        id: `f${Date.now()}`,
        cliente_id: `c${Date.now()}`,
        leido: false,
      };
      feedbacks.unshift(newFeedback);
      resolve(newFeedback);
    }, 300);
  });
}

