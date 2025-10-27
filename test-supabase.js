// Script simple para probar Supabase y crear usuario
import { createClient } from '@supabase/supabase-js';

// Valores de ejemplo - reemplaza con los tuyos
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your_supabase_anon_key_here';

console.log('🔍 Probando conexión con Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Probar conexión básica
    const { data, error } = await supabase.from('trainers').select('count').limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error.message);
      return false;
    }
    
    console.log('✅ Conexión exitosa con Supabase');
    return true;
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    return false;
  }
}

async function createTestUser() {
  try {
    console.log('👤 Creando usuario de prueba...');
    
    const { data, error } = await supabase.auth.signUp({
      email: 'test@fitoffice.com',
      password: 'test123456',
    });

    if (error) {
      console.error('❌ Error creando usuario:', error.message);
      return;
    }

    if (data.user) {
      console.log('✅ Usuario creado:', data.user.email);
      console.log('ID:', data.user.id);
      
      // Crear perfil de trainer
      const { error: profileError } = await supabase
        .from('trainers')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: 'Usuario de Prueba'
        });

      if (profileError) {
        console.error('❌ Error creando perfil:', profileError.message);
      } else {
        console.log('✅ Perfil de trainer creado');
      }
    }
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

// Ejecutar pruebas
async function main() {
  const connected = await testConnection();
  
  if (connected) {
    await createTestUser();
  } else {
    console.log('❌ No se puede continuar sin conexión a Supabase');
    console.log('📝 Instrucciones:');
    console.log('1. Ve a https://supabase.com/dashboard');
    console.log('2. Crea un proyecto o selecciona uno existente');
    console.log('3. Ve a Settings > API');
    console.log('4. Copia la Project URL y anon public key');
    console.log('5. Actualiza las variables en este script');
  }
}

main();
