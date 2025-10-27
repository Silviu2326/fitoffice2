import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here';

// Verificar que las variables de entorno estén configuradas
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Variables de entorno de Supabase no configuradas. Usando valores por defecto.');
  console.warn('Por favor, crea un archivo .env con las siguientes variables:');
  console.warn('VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.warn('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
