# ⚠️ PROBLEMA CON LOS LOGOS - SOLUCIÓN

## El Problema

Los archivos de logo en la carpeta `public/` **NO son imágenes reales**. Son archivos de texto que contienen "[DUMMY FILE CONTENT]".

Cuando ejecutes la aplicación, verás que las imágenes no aparecen porque el sistema de Bolt.new no puede transferir archivos binarios (imágenes PNG/JPG) directamente.

## La Solución

Debes **reemplazar manualmente** los archivos después de descargar el proyecto.

### Paso a Paso:

#### 1. Descarga el proyecto desde Bolt.new
   - Haz clic en el botón de descarga
   - Descomprime el archivo ZIP en tu computadora

#### 2. Ubica tus archivos de logo originales
   Necesitas dos archivos:
   - **Logo completo** (el que incluye texto "COOPERATIVA COPEBA, R.L." y el lema)
   - **Logo ícono** (solo el símbolo circular con la C y la mano)

#### 3. Reemplaza los archivos en la carpeta `public/`
   ```bash
   cd [ruta-del-proyecto]/public/

   # Elimina los placeholders
   rm "COPEBA 1.png"
   rm "logocentro.png"

   # Copia tus logos reales
   cp /ruta/a/tu/logo-completo.png "COPEBA 1.png"
   cp /ruta/a/tu/logo-icono.png "logocentro.png"
   ```

   **IMPORTANTE:** Los nombres deben ser exactamente:
   - `COPEBA 1.png` (con espacio entre COPEBA y 1)
   - `logocentro.png` (todo en minúsculas, sin espacios)

#### 4. Verifica que sean archivos reales
   ```bash
   # En Linux/Mac:
   file "COPEBA 1.png"
   # Debe decir: PNG image data...

   ls -lh *.png
   # Los archivos deben tener más de 20 bytes (ej: 50K, 100K, etc.)
   ```

#### 5. Ejecuta el proyecto
   ```bash
   npm run dev
   ```

   Ahora deberías ver los logos correctamente.

## Dónde se Usan los Logos

### `COPEBA 1.png` (Logo completo)
Se usa en:
- Formulario de solicitud de préstamo (header)

### `logocentro.png` (Logo ícono)
Se usa en:
- Panel de administración (header)
- Página de login administrativo (header)
- Favicon del sitio (pestaña del navegador)

## Características Técnicas Recomendadas

### Para `COPEBA 1.png`:
- Formato: PNG con fondo transparente
- Dimensiones recomendadas: 800x300px o similar (horizontal)
- Peso: Menos de 200KB

### Para `logocentro.png`:
- Formato: PNG con fondo transparente
- Dimensiones recomendadas: 500x500px (cuadrado)
- Peso: Menos de 100KB

## Verificación Visual

Después de reemplazar los archivos:

1. Abre http://localhost:5173
2. Verifica que el logo completo aparece en el formulario
3. Haz clic en "Acceso Administrativo"
4. Verifica que el logo ícono aparece en el login
5. Verifica que el favicon en la pestaña del navegador es correcto

## Despliegue en Vercel

Cuando subas el proyecto a Vercel, los logos que hayas colocado en `public/` se subirán automáticamente y funcionarán correctamente en producción.

```bash
# Verifica que los logos están antes de desplegar
ls -lh public/*.png

# Los archivos deben ser reales, no de 20 bytes
```

## Preguntas Frecuentes

**P: ¿Por qué los logos no se incluyeron correctamente?**

R: Bolt.new es un editor en línea que no puede manejar archivos binarios (imágenes). Solo puede trabajar con archivos de texto (código).

**P: ¿Puedo usar otros formatos de imagen?**

R: Sí, pero debes actualizar las extensiones en el código. PNG es recomendado por su soporte de transparencia.

**P: ¿Puedo cambiar los nombres de los archivos?**

R: Sí, pero debes actualizar las referencias en:
- `src/components/LoanApplicationForm.tsx`
- `src/components/AdminLogin.tsx`
- `src/components/AdminDashboard.tsx`
- `index.html` (favicon)

**P: Los logos aparecen muy grandes/pequeños**

R: Puedes ajustar el tamaño en el código CSS. Busca las clases que contienen `h-20`, `h-12`, `h-24`, etc. y ajusta el número.

## Ayuda Adicional

Si después de seguir estos pasos los logos aún no aparecen:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Recarga la página
4. Busca los archivos PNG
5. Si aparece error 404, verifica los nombres de archivo
6. Si aparece error de formato, verifica que sean imágenes PNG válidas
