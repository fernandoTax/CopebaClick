# Sistema de Solicitudes de Préstamo - COPEBA

Sistema web para gestión de solicitudes de préstamos de Cooperativa COPEBA, R.L.

## Tecnologías

- **Frontend:** React + TypeScript + Vite
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Iconos:** Lucide React

## ⚠️ IMPORTANTE: Logos

**Los archivos de logo NO están incluidos correctamente.**

Los archivos en `public/` son solo placeholders. Debes:

1. Descargar el proyecto a tu máquina
2. Ir a la carpeta `public/`
3. Eliminar los archivos existentes
4. Copiar tus logos reales con estos nombres:
   - `COPEBA 1.png` (logo completo horizontal con texto)
   - `logocentro.png` (logo circular/ícono)

## Instalación Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# ⚠️ Agregar logos manualmente en public/ (ver sección anterior)

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## Variables de Entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── LoanApplicationForm.tsx  # Formulario público de solicitudes
│   ├── AdminLogin.tsx           # Login para administradores
│   └── AdminDashboard.tsx       # Panel de administración
├── data/
│   └── guatemala.ts             # Datos de Guatemala (departamentos/municipios)
├── lib/
│   └── supabase.ts             # Configuración de Supabase
└── App.tsx                      # Componente principal
```

## Base de Datos

### Tablas:
- `loan_applications`: Solicitudes de préstamos
- `admin_users`: Usuarios administradores

### Crear usuario administrador:
1. Crear usuario en Supabase Auth
2. Agregar registro en tabla `admin_users` con el mismo UUID

## Despliegue en Vercel

```bash
# CLI
vercel

# Configurar variables de entorno en Vercel Dashboard
# o mediante CLI:
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

## Características

### Formulario Público
- Captura de datos del solicitante
- Selección de departamento y municipio de Guatemala
- Selección de monto y propósito del préstamo
- Validación de campos

### Panel Administrativo
- Visualización de todas las solicitudes
- Filtros por estado y búsqueda
- Cambio de estado de solicitudes (pendiente, en revisión, aprobado, rechazado)
- Notas internas por solicitud
- Estadísticas en tiempo real

## Seguridad

- Autenticación requerida para acceso administrativo
- Row Level Security (RLS) en Supabase
- Políticas de acceso por rol
- Variables de entorno para credenciales

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
npm run typecheck # Verificar tipos TypeScript
```

## Colores Corporativos

- Verde: `#009900` (Principal)
- Azul: `#011c6b` (Secundario)
- Amarillo: `#fef701` (Acento)

## Licencia

Privado - Cooperativa COPEBA, R.L.
