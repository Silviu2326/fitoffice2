# Configuración de Supabase

Para que la aplicación funcione correctamente, necesitas configurar las variables de entorno de Supabase.

## Pasos para configurar Supabase:

1. **Crear un proyecto en Supabase:**
   - Ve a [https://supabase.com](https://supabase.com)
   - Crea una cuenta o inicia sesión
   - Crea un nuevo proyecto

2. **Obtener las credenciales:**
   - En el dashboard de tu proyecto, ve a Settings > API
   - Copia la "Project URL" y la "anon public" key

3. **Crear archivo .env:**
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

4. **Reiniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Nota importante:
- El archivo `.env` debe estar en la raíz del proyecto (mismo nivel que `package.json`)
- No subas el archivo `.env` a control de versiones (ya está en `.gitignore`)
- Las variables deben comenzar con `VITE_` para que Vite las reconozca

## Solución temporal:
Si no tienes un proyecto de Supabase configurado, la aplicación usará valores por defecto y mostrará advertencias en la consola del navegador.
