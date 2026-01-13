# Checklist de Despliegue

## Antes de Desplegar

### ✅ Archivos del Proyecto
- [ ] Proyecto descargado a tu máquina local
- [ ] `npm install` ejecutado correctamente
- [ ] Logos agregados en `public/`:
  - [ ] `COPEBA 1.png` (logo completo)
  - [ ] `logocentro.png` (logo ícono)

### ✅ Configuración de Supabase
- [ ] Proyecto de Supabase creado
- [ ] Migraciones aplicadas (tabla `loan_applications` y `admin_users`)
- [ ] Variables de entorno configuradas en `.env`:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`

### ✅ Usuario Administrador
- [ ] Usuario creado en Supabase Auth
- [ ] Email: ___________________
- [ ] Password: _________________ (guárdalo en lugar seguro)
- [ ] Usuario agregado a tabla `admin_users`

### ✅ Pruebas Locales
- [ ] `npm run dev` funciona correctamente
- [ ] Los logos aparecen en el formulario
- [ ] Se puede enviar una solicitud de prueba
- [ ] Se puede iniciar sesión en el panel admin
- [ ] Se pueden ver las solicitudes en el dashboard
- [ ] Se puede cambiar el estado de una solicitud

### ✅ Preparación para Despliegue
- [ ] `npm run build` ejecuta sin errores
- [ ] Archivo `.env` NO está incluido en git (verificar `.gitignore`)
- [ ] Código subido a GitHub (opcional pero recomendado)

## Durante el Despliegue en Vercel

### ✅ Configuración en Vercel
- [ ] Cuenta de Vercel creada/iniciada
- [ ] Proyecto importado desde GitHub o desplegado con CLI
- [ ] Variables de entorno configuradas en Vercel:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Despliegue exitoso

## Después del Despliegue

### ✅ Verificación en Producción
- [ ] URL de producción funciona: _____________________
- [ ] Los logos se ven correctamente
- [ ] Formulario permite enviar solicitudes
- [ ] Las solicitudes se guardan en Supabase
- [ ] Panel admin accesible desde "Acceso Administrativo"
- [ ] Inicio de sesión funciona
- [ ] Dashboard muestra las solicitudes
- [ ] Se pueden cambiar estados de solicitudes
- [ ] Se pueden agregar notas

### ✅ Seguridad
- [ ] Las credenciales están solo en Vercel, no en el código
- [ ] El archivo `.env` no está en el repositorio
- [ ] Solo usuarios autorizados tienen acceso al panel admin

## URLs Importantes

- **Aplicación en Producción:** _____________________
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repositorio:** _____________________

## Notas

_____________________________________________________
_____________________________________________________
_____________________________________________________
