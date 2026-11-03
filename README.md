# Portafolio de Max Hess

Sitio estático del portafolio de Max Hess, ingeniero de software fullstack. El contenido está en español (Chile) y la publicación prevista es Firebase Hosting.

## Requisitos

Node.js 20 o superior.

## Comandos

```bash
npm install
npm run dev
npm run preview
npm run build
```

- `npm run dev` construye el sitio, observa cambios en `src/` y `public/`, y lo sirve en [http://localhost:4173](http://localhost:4173).
- `npm run preview` construye una vez y sirve `dist/` en el mismo puerto.
- `npm run build` genera la carpeta `dist/`, que es la que publica Firebase Hosting.
- `npm run check` construye y revisa que el contenido obligatorio esté, y que los proyectos viejos no vuelvan.

El puerto se puede cambiar con la variable `PORT`.

## Estructura

- `src/` — plantillas Pug, estilos, contenido y el menú.
- `public/` — foto, favicon, CV y `robots.txt`.
- `dist/` — salida de la construcción. No se versiona.

## Diseño

La navegación principal es el explorador de archivos, sin navbar duplicado. Incluye perfil, biografía, foto, experiencia, proyectos, la carpeta `skills` con `frontend.ts`, `backend.go` y `deploy.yml`, y contacto. La cabecera muestra nombre, cargo y el selector EN/ES. Inglés es la versión inicial (`/`); español está en `/es/`. El idioma se cambia conservando el archivo abierto. Los nombres de archivo usan inglés en ambos idiomas.

La terminal opera sobre esos mismos archivos: `ls [ruta]`, `cd [carpeta]`, `pwd`, `cat archivo`, `nano archivo`, `help`, `clear` y `exit` (cerrar la terminal). Incluye historial con flechas y autocompletado con Tab de comandos y rutas por nivel, con opciones cuando hay varias coincidencias y solo carpetas para `cd`. Shift+Tab permite salir del campo. `nano` abre un lector de solo lectura con salida por botón, Escape o Ctrl+X. No ejecuta comandos del sistema ni modifica archivos.

Las traducciones se mantienen en `src/data/translations.js`, preservando el contenido editorial en español. El build genera las dos versiones estáticas, con `lang`, metadatos y enlaces de idioma. Los documentos comparten los tokens `--editor-padding` y `--editor-gap`.

El editor principal usa un árbol de archivos de `portafolio/`: `perfil.ts`, `sobre-mi.md`, `max.jpg` y las carpetas `experiencia/` y `proyectos/`, con un archivo por empresa o proyecto. El árbol queda a la izquierda en escritorio y se abre desde «Explorar archivos» en móvil. La cabecera muestra la ruta del archivo abierto y el menú abre directamente cada contenido.

La paleta, la tipografía y la composición salen del portafolio de 2023 y están escritas como tokens en `src/styles/tokens.scss`. Los componentes solo consumen esos tokens.

- Fondo `#172c3f`, franjas y tarjetas `#4f6378`. El negro `#0a151f` queda solo en el menú y el pie. Las subtarjetas usan un slate más oscuro, `#3f5366`, con un borde suave. El acento es el blanco hueso `#eae4d8`.
- Texto blanco y whitesmoke. El acento es el blanco hueso `#eae4d8`. El hover de los botones usa ese hueso con texto oscuro, para que el contraste se sostenga.
- Títulos en Lucida Sans y texto en Verdana, con una escala fluida (`clamp`) y el párrafo en unas 60 a 75 caracteres. La monoespaciada queda solo en las etiquetas cortas y en el cargo del hero.
- En escritorio la lectura sigue un eje izquierdo y cierra a la derecha: el texto principal va a la izquierda; la foto, la ficha de formación, las fechas y las tarjetas secundarias van a la derecha. Los llamados a la acción quedan al final de ese recorrido. En móvil todo es una columna, alineada a la izquierda.
- La foto del hero es cuadrada, de unos 320 px, con esquinas de 16 px, borde claro y sombra para separarla del navy.
- Las tarjetas de proyecto usan el mismo radio, el mismo fondo y los mismos botones con borde claro.
- El stack principal muestra logos oficiales de Devicon (MIT, `src/icons/LICENSE-devicon.txt`) y contexto de uso real. Las tecnologías complementarias aparecen como una lista editorial, con menos peso visual.
- El pie tiene el fondo más oscuro y las esquinas superiores redondeadas.

No hay tema claro. Ese diseño era una sola paleta oscura, y un interruptor de tema la partía. El texto editable está en `src/data/site.js`.

## Firebase Hosting

El proyecto de Firebase es `maxhess-portafolio` (`https://maxhess-portafolio.web.app`).

1. La configuración está vinculada en `.firebaserc` y en `.github/workflows/firebase-hosting.yml` (`projectId: maxhess-portafolio`).
2. Para el despliegue manual desde tu máquina: `npm run build && firebase deploy --only hosting`.
3. Para el despliegue continuo mediante GitHub Actions:
   - En GitHub, en Settings → Secrets and variables → Actions, crea el secreto `FIREBASE_SERVICE_ACCOUNT_MAXHESS_PORTAFOLIO`.
   - Su valor es el JSON de la cuenta de servicio de Google Cloud con permisos de Firebase Hosting.
4. Cada push a `main` instala dependencias, corre `npm run check` y despliega el canal **live** con `FirebaseExtended/action-hosting-deploy`.

`firebase.json` publica `dist/`, usa `cleanUrls` y define caché corta para HTML, de una hora para CSS y JS, y más larga para imágenes, fuentes y el PDF.

No hay ningún deploy hecho desde este rediseño. Hasta que el secreto y el id real existan, el workflow de `main` va a fallar: es el comportamiento esperado.

## GitHub Pages

Hasta ahora el sitio se publicaba desde la raíz del repositorio en GitHub Pages (`maxhess22.github.io/portafolio`). Este rediseño ya no deja un `index.html` en la raíz: la salida está en `dist/` y el canal de publicación es Firebase Hosting. Al fusionar, GitHub Pages deja de mostrar el portafolio nuevo hasta que Firebase esté configurado.

## Pendiente para Max

- Confirmar las demos de UI Lab Fase Cero y Biblioteca de Ajedrez. Los repos son privados; los placeholders son `https://TODO-confirmar-url-de-ui-lab` y `https://TODO-confirmar-url-de-biblioteca-ajedrez`.
- Crear el proyecto de Firebase, reemplazar `TODO-firebase-project-id` y cargar el secreto.
- El PDF de `public/cv/CV_Max_Hess_Fullstack.pdf` es el currículum adjunto. El sitio no muestra el teléfono en ninguna página. Si quieres un PDF sin teléfono, reemplaza ese archivo.
