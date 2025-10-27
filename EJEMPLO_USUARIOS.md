# Crear Usuarios de Ejemplo

## Opción 1: Crear usuarios directamente en Supabase Dashboard

### Pasos:

1. **Ve a tu proyecto de Supabase Dashboard**
   - Abre [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Selecciona tu proyecto

2. **Navega a Authentication > Users**
   - Haz clic en "Add user"
   - Completa los campos:
     - **Email**: `trainer@fitoffice.com`
     - **Password**: `password123` (o la que prefieras)
     - **Email Confirm**: ✅ (marcado)

3. **Copia el UUID del usuario creado**
   - En la lista de usuarios, copia el UUID que aparece
   - Ejemplo: `550e8400-e29b-41d4-a716-446655440000`

4. **Ejecuta la migración de datos de ejemplo**
   ```bash
   npx supabase db reset
   ```

## Opción 2: Usar el script SQL directamente

### Si ya tienes usuarios creados:

1. **Ejecuta la migración**:
   ```bash
   npx supabase db push
   ```

2. **O ejecuta el SQL directamente** en el SQL Editor de Supabase:
   ```sql
   -- Reemplaza los UUIDs con los reales de tus usuarios
   INSERT INTO trainers (id, email, full_name, created_at, updated_at) 
   VALUES (
     'TU_UUID_AQUI', -- Reemplaza con el UUID real del usuario
     'trainer@fitoffice.com',
     'María González',
     now(),
     now()
   );
   ```

## Opción 3: Crear usuarios programáticamente

### Usando el cliente de Supabase:

```typescript
import { supabase } from './src/lib/supabase';

// Crear usuario de autenticación
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: 'trainer@fitoffice.com',
  password: 'password123',
});

if (authData.user) {
  // Crear perfil de trainer
  const { error: profileError } = await supabase
    .from('trainers')
    .insert({
      id: authData.user.id,
      email: 'trainer@fitoffice.com',
      full_name: 'María González'
    });
}
```

## Usuarios de Ejemplo Incluidos

La migración incluye estos usuarios de ejemplo:

1. **María González** (`trainer@fitoffice.com`)
   - Entrenadora principal
   - Especializada en fitness funcional

2. **Carlos Rodríguez** (`carlos@fitoffice.com`)
   - Entrenador de fuerza
   - Experto en levantamiento de pesas

3. **Ana Martínez** (`ana@fitoffice.com`)
   - Nutricionista deportiva
   - Especializada en dietas para atletas

## Credenciales de Prueba

- **Email**: `trainer@fitoffice.com`
- **Password**: `password123`

## Notas Importantes

- ⚠️ **Cambia las contraseñas** en producción
- 🔒 **Los UUIDs deben coincidir** con los usuarios de auth.users
- 📧 **Confirma los emails** en el dashboard de Supabase
- 🗑️ **Elimina usuarios de prueba** antes de ir a producción

## Verificar que funciona

Después de crear los usuarios, puedes verificar que todo funciona:

1. **Inicia sesión** con las credenciales
2. **Verifica el perfil** en la aplicación
3. **Comprueba los datos** en la tabla `trainers`
