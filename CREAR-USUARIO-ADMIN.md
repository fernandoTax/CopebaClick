# 🔐 CREAR USUARIO ADMINISTRADOR

## Por qué no puedes entrar

**El problema es simple:** No hay ningún usuario administrador creado en el sistema.

La base de datos está perfectamente configurada y funcionando, pero necesitas crear manualmente el primer usuario administrador.

---

## Solución Rápida - Pasos Exactos

### 1️⃣ Abrir Supabase Dashboard

1. Ve a: https://supabase.com/dashboard
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto de COPEBA

---

### 2️⃣ Crear Usuario en Authentication

1. En el menú lateral izquierdo, haz clic en **"Authentication"**
2. Haz clic en **"Users"**
3. Verás una lista vacía (porque no hay usuarios aún)
4. Haz clic en el botón verde **"Add user"** (esquina superior derecha)
5. Aparecerá un modal, selecciona **"Create new user"**
6. Completa el formulario:
   - **Email:** `admin@copeba.com` (o el que prefieras)
   - **Password:** Elige una contraseña segura (ej: `Copeba2024!`)
   - **✓ IMPORTANTE:** Marca la casilla **"Auto Confirm User"**
   - Deja los demás campos vacíos
7. Haz clic en **"Create user"**

---

### 3️⃣ Copiar el User UID

**¡IMPORTANTE!** Necesitas copiar el ID del usuario que acabas de crear:

1. En la lista de usuarios, verás el usuario que creaste
2. Haz clic en el usuario para ver sus detalles
3. En la sección de información, verás **"UID"** o **"User UID"**
4. Es algo como: `123e4567-e89b-12d3-a456-426614174000`
5. **Copia este UID completo** (lo necesitarás en el siguiente paso)

---

### 4️⃣ Agregar Usuario a tabla admin_users

1. En el menú lateral izquierdo, haz clic en **"Table Editor"**
2. En la lista de tablas, selecciona **"admin_users"**
3. La tabla estará vacía (sin filas)
4. Haz clic en **"Insert"** → **"Insert row"**
5. Completa los campos:
   - **id:** Pega el UID que copiaste en el paso anterior
   - **email:** `admin@copeba.com` (el mismo email que usaste)
   - **full_name:** `Administrador COPEBA` (o tu nombre completo)
   - **created_at:** Se llena automáticamente
6. Haz clic en **"Save"**

---

### 5️⃣ Probar el Login

1. Ve a tu aplicación
2. Haz clic en **"Acceso Administrativo"**
3. Ingresa:
   - **Email:** `admin@copeba.com`
   - **Password:** La contraseña que creaste
4. Haz clic en **"Iniciar Sesión"**

**¡Deberías poder entrar ahora!**

---

## ⚠️ Problemas Comunes

### "No tiene permisos de administrador"

**Causa:** El UUID en `admin_users` no coincide con el del usuario en `auth.users`

**Solución:**
1. Ve a Authentication → Users
2. Copia exactamente el UID del usuario
3. Ve a Table Editor → admin_users
4. Edita el registro y pega el UID correcto

---

### "Invalid login credentials"

**Causa:** Email o contraseña incorrectos

**Solución:**
1. Verifica que estés usando el email correcto
2. Si olvidaste la contraseña:
   - Ve a Authentication → Users
   - Haz clic en el usuario
   - Haz clic en "Reset Password"
   - Establece una nueva contraseña

---

### "No aparece la tabla admin_users"

**Causa:** Puede que estés viendo el esquema incorrecto

**Solución:**
1. En Table Editor, verifica arriba que diga **"Schema: public"**
2. Si no aparece, actualiza la página (F5)
3. Deberías ver dos tablas:
   - `admin_users`
   - `loan_applications`

---

## ✅ Verificación Completa

Una vez que hayas creado el usuario, verifica:

### En Authentication → Users:
```
Email: admin@copeba.com
Confirmed: Yes
Last Sign In: (debería aparecer cuando inicies sesión)
```

### En Table Editor → admin_users:
```
id: [el mismo UUID del usuario en auth]
email: admin@copeba.com
full_name: Administrador COPEBA
created_at: [fecha actual]
```

---

## 🔒 Crear Más Administradores

Para agregar más usuarios administradores en el futuro:

1. Repite todo el proceso desde el paso 1
2. Usa un email diferente para cada administrador
3. Asegúrate de agregar cada usuario a la tabla `admin_users`

**IMPORTANTE:** Solo los usuarios que estén en la tabla `admin_users` podrán acceder al panel administrativo.

---

## Estado del Sistema

### ✅ Lo que YA funciona:
- Base de datos creada y configurada
- Tablas `loan_applications` y `admin_users` creadas
- Políticas de seguridad (RLS) configuradas
- Formulario público funcionando
- Sistema de login funcionando
- Panel administrativo funcionando

### ❌ Lo que FALTA:
- Crear el primer usuario administrador (esta guía)

---

## Resumen Visual

```
1. Supabase Dashboard
   ↓
2. Authentication → Users → Add User
   ↓
3. Crear usuario con email y password
   ↓
4. Copiar el User UID
   ↓
5. Table Editor → admin_users → Insert Row
   ↓
6. Pegar UID, email, y nombre
   ↓
7. ¡Listo! Ya puedes iniciar sesión
```

---

## Necesitas Ayuda?

Si después de seguir estos pasos aún no puedes entrar:

1. Verifica que el proyecto de Supabase en el que estás trabajando sea el correcto
2. Verifica las variables de entorno en tu `.env`:
   - `VITE_SUPABASE_URL` debe coincidir con la URL de tu proyecto
   - `VITE_SUPABASE_ANON_KEY` debe ser la clave anon de tu proyecto
3. Abre la consola del navegador (F12) y revisa si hay errores
4. Envía un screenshot de los errores que veas
