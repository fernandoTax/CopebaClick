# Instrucciones de Instalación y Despliegue

## 1. Descargar el Proyecto a tu Máquina Local

### Opción A: Descargar como ZIP desde Bolt.new
1. Descarga el proyecto desde Bolt.new (botón de descarga)
2. Descomprime el archivo ZIP en tu computadora
3. Abre una terminal en la carpeta del proyecto

### Opción B: Si tienes el código en GitHub
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

## 2. Configurar el Proyecto Localmente

### Paso 1: Instalar Node.js
- Descarga e instala Node.js desde: https://nodejs.org/
- Versión recomendada: 18.x o superior
- Verifica la instalación:
```bash
node --version
npm --version
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Agregar los Logos
**IMPORTANTE:** Los archivos de logo NO están incluidos correctamente. Debes:

1. Ir a la carpeta `public/` del proyecto
2. Borrar los archivos actuales:
   - `COPEBA 1.png`
   - `logocentro.png`
3. Copiar tus logos reales con los mismos nombres:
   - `COPEBA 1.png` (logo completo con texto)
   - `logocentro.png` (logo solo el ícono/símbolo)

### Paso 4: Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

**Para obtener estos valores:**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a Settings → API
4. Copia:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`

### Paso 5: Crear Usuario Administrador
1. En Supabase Dashboard → Authentication → Users
2. Clic en "Add User"
3. Crea un usuario:
   - Email: `admin@copeba.com`
   - Password: (tu contraseña segura)
4. Copia el User UID generado
5. Ve a Table Editor → admin_users → Insert row
6. Inserta:
   - id: (el UUID copiado)
   - email: `admin@copeba.com`
   - full_name: `Administrador COPEBA`

### Paso 6: Ejecutar el Proyecto Localmente
```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

## 3. Subir a Vercel

### Opción A: Despliegue desde GitHub (Recomendado)

#### 1. Subir el código a GitHub
```bash
# Inicializar repositorio si no existe
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Proyecto COPEBA inicial"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir el código
git push -u origin main
```

**IMPORTANTE:** Antes de hacer push, asegúrate de que el archivo `.env` está en `.gitignore` para no subir las credenciales.

#### 2. Conectar con Vercel
1. Ve a https://vercel.com
2. Crea una cuenta o inicia sesión
3. Clic en "Add New..." → "Project"
4. Importa tu repositorio de GitHub
5. Configura las variables de entorno:
   - Clic en "Environment Variables"
   - Agrega:
     - `VITE_SUPABASE_URL`: tu URL de Supabase
     - `VITE_SUPABASE_ANON_KEY`: tu clave anónima
6. Clic en "Deploy"

### Opción B: Despliegue Directo (Sin GitHub)

#### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

#### 2. Hacer Login en Vercel
```bash
vercel login
```

#### 3. Desplegar
```bash
vercel
```

Sigue las instrucciones en pantalla:
- Preguntará si quieres crear un nuevo proyecto → Yes
- Preguntará el nombre del proyecto → (tu elección)
- Preguntará la configuración → Acepta los valores por defecto

#### 4. Configurar Variables de Entorno en Vercel
```bash
vercel env add VITE_SUPABASE_URL
# Pega tu URL cuando lo pida

vercel env add VITE_SUPABASE_ANON_KEY
# Pega tu clave cuando lo pida
```

#### 5. Redesplegar con las Variables
```bash
vercel --prod
```

## 4. Verificación Final

Una vez desplegado en Vercel:

1. Abre la URL que Vercel te proporciona
2. Verifica que los logos aparecen correctamente
3. Prueba el formulario de préstamos
4. Accede al panel administrativo con tu usuario creado
5. Verifica que puedes ver las solicitudes

## Problemas Comunes

### Los logos no aparecen
- Asegúrate de que los archivos `.png` están en la carpeta `public/`
- Los nombres deben ser exactos: `COPEBA 1.png` y `logocentro.png`
- Verifica que son archivos de imagen reales, no archivos de texto

### Error de conexión a Supabase
- Verifica que las variables de entorno están correctas
- Asegúrate de que la URL no tiene espacios ni caracteres extras
- Verifica que copiaste la clave "anon/public" y no la "service_role"

### No puedo entrar al panel admin
- Verifica que creaste el usuario en Supabase Auth
- Verifica que agregaste el registro en la tabla `admin_users`
- El `id` en `admin_users` debe coincidir exactamente con el User UID

## Contacto y Soporte

Si tienes problemas:
1. Revisa los logs en la consola del navegador (F12)
2. Verifica los logs de Vercel en su dashboard
3. Revisa los logs de Supabase en su dashboard
