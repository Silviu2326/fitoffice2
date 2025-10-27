#!/usr/bin/env node

/**
 * Script para crear usuarios de ejemplo en Supabase
 * 
 * Uso: node scripts/create-example-users.js
 * 
 * Requisitos:
 * - Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY configuradas
 * - O pasar las credenciales como argumentos
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.argv[2];
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan las credenciales de Supabase');
  console.log('Uso: node scripts/create-example-users.js <SUPABASE_URL> <SUPABASE_KEY>');
  console.log('O configura las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const exampleUsers = [
  {
    email: 'trainer@fitoffice.com',
    password: 'password123',
    full_name: 'María González',
    role: 'Entrenadora Principal'
  },
  {
    email: 'carlos@fitoffice.com',
    password: 'password123',
    full_name: 'Carlos Rodríguez',
    role: 'Entrenador de Fuerza'
  },
  {
    email: 'ana@fitoffice.com',
    password: 'password123',
    full_name: 'Ana Martínez',
    role: 'Nutricionista Deportiva'
  },
  {
    email: 'admin@fitoffice.com',
    password: 'admin123',
    full_name: 'Admin FitOffice',
    role: 'Administrador'
  }
];

async function createExampleUsers() {
  console.log('🚀 Creando usuarios de ejemplo...\n');

  for (const user of exampleUsers) {
    try {
      console.log(`📧 Creando usuario: ${user.email}`);
      
      // Crear usuario de autenticación
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (authError) {
        console.error(`❌ Error creando usuario ${user.email}:`, authError.message);
        continue;
      }

      if (authData.user) {
        console.log(`✅ Usuario de auth creado: ${authData.user.id}`);
        
        // Crear perfil de trainer
        const { error: profileError } = await supabase
          .from('trainers')
          .insert({
            id: authData.user.id,
            email: user.email,
            full_name: user.full_name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error(`❌ Error creando perfil para ${user.email}:`, profileError.message);
        } else {
          console.log(`✅ Perfil creado para ${user.full_name}`);
        }
      }

      console.log(''); // Línea en blanco para separar

    } catch (error) {
      console.error(`❌ Error inesperado con ${user.email}:`, error);
    }
  }

  console.log('🎉 Proceso completado!');
  console.log('\n📋 Credenciales de prueba:');
  console.log('┌─────────────────────────┬──────────────┬─────────────────────┐');
  console.log('│ Email                   │ Password     │ Rol                │');
  console.log('├─────────────────────────┼──────────────┼─────────────────────┤');
  
  exampleUsers.forEach(user => {
    console.log(`│ ${user.email.padEnd(23)} │ ${user.password.padEnd(12)} │ ${user.role.padEnd(19)} │`);
  });
  
  console.log('└─────────────────────────┴──────────────┴─────────────────────┘');
  console.log('\n⚠️  Recuerda cambiar las contraseñas en producción!');
}

// Ejecutar el script
createExampleUsers().catch(console.error);
