# Script de Usuarios de Ejemplo

Este script te permite crear usuarios de ejemplo en tu proyecto de Supabase de forma automática.

## Instalación

1. **Instala las dependencias del script**:
   ```bash
   cd scripts
   npm install
   ```

2. **Configura las variables de entorno** (opcional):
   ```bash
   # En la raíz del proyecto, crea un archivo .env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_aqui
   ```

## Uso

### Opción 1: Con variables de entorno
```bash
cd scripts
npm run create-users
```

### Opción 2: Pasando credenciales como argumentos
```bash
cd scripts
node create-example-users.js https://tu-proyecto.supabase.co tu_clave_aqui
```

### Opción 3: Desde la raíz del proyecto
```bash
npm run create-users-with-env
```

## Usuarios que se crean

El script creará estos usuarios de ejemplo:

| Email | Password | Rol |
|-------|----------|-----|
| trainer@fitoffice.com | password123 | Entrenadora Principal |
| carlos@fitoffice.com | password123 | Entrenador de Fuerza |
| ana@fitoffice.com | password123 | Nutricionista Deportiva |
| admin@fitoffice.com | admin123 | Administrador |

## Qué hace el script

1. **Crea usuarios de autenticación** en Supabase Auth
2. **Crea perfiles de trainer** en la tabla `trainers`
3. **Muestra las credenciales** para que puedas hacer login
4. **Maneja errores** si los usuarios ya existen

## Solución de problemas

### Error: "Faltan las credenciales"
- Verifica que las variables de entorno estén configuradas
- O pasa las credenciales como argumentos

### Error: "Usuario ya existe"
- Es normal si ya creaste el usuario antes
- El script continúa con el siguiente usuario

### Error: "No se puede conectar a Supabase"
- Verifica que la URL y la clave sean correctas
- Asegúrate de que tu proyecto de Supabase esté activo

## Notas importantes

- ⚠️ **Cambia las contraseñas** antes de usar en producción
- 🔒 **Los usuarios se crean con email confirmado** automáticamente
- 🗑️ **Puedes eliminar los usuarios** desde el dashboard de Supabase
- 📧 **Los emails son ficticios** - no recibirás correos reales

## Verificar que funciona

Después de ejecutar el script:

1. Ve al dashboard de Supabase > Authentication > Users
2. Verifica que los usuarios aparezcan en la lista
3. Ve a Database > Tables > trainers
4. Confirma que los perfiles se crearon correctamente
5. Prueba hacer login en la aplicación con las credenciales
