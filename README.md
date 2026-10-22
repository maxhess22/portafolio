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

- `src/` — plantillas Pug, estilos, contenido y el script del tema.
- `public/` — foto, favicon, CV y `robots.txt`.
- `dist/` — salida de la construcción. No se versiona.

## Diseño

El criterio es el de Fase Cero, aplicado aquí porque `maxhess22/biblioteca-ajedrez` y `maxhess22/ui-lab-fase-cero` son privados.

- Los tokens semánticos viven en `src/styles/tokens.scss` (color, espacio, tipo, radios). El tema claro y el oscuro solo cambian esos tokens.
- Los componentes (`src/styles/components.scss` y los mixins de `src/partials/mixins.pug`) consumen tokens. No llevan colores ni medidas sueltas.
- El texto editable está en `src/data/site.js`.

El sitio arranca en el tema del sistema. El botón del encabezado lo cambia y guarda la preferencia en `localStorage`.

## Firebase Hosting

El proyecto de Firebase todavía no existe. El id `TODO-firebase-project-id` es un placeholder.

1. Crea un proyecto en [Firebase console](https://console.firebase.google.com/) y activa Hosting.
2. Reemplaza `TODO-firebase-project-id` en `.firebaserc` y en `.github/workflows/firebase-hosting.yml` (`projectId`).
3. Crea una cuenta de servicio con permiso para desplegar Hosting. La forma más directa es, en tu máquina, `firebase init hosting:github` dentro de este repo: el asistente crea la cuenta y el secreto. También puedes crear la clave JSON a mano en Google Cloud, con un rol que permita administrar Firebase Hosting.
4. En GitHub, en Settings → Secrets and variables → Actions, crea el secreto `FIREBASE_SERVICE_ACCOUNT_<ID>`. El sufijo es el id del proyecto en mayúsculas, con cada carácter que no sea letra o número convertido en `_`. Mientras siga el placeholder, el secreto se llama `FIREBASE_SERVICE_ACCOUNT_TODO_FIREBASE_PROJECT_ID` y su valor es el JSON completo de la cuenta de servicio.
5. Si cambias el id del proyecto, cambia también el nombre del secreto y la referencia `secrets.FIREBASE_SERVICE_ACCOUNT_...` del workflow.
6. Cada push a `main` instala dependencias, corre `npm run check` y despliega el canal **live** con `FirebaseExtended/action-hosting-deploy`.

`firebase.json` publica `dist/`, usa `cleanUrls` y define caché corta para HTML, de una hora para CSS y JS, y más larga para imágenes, fuentes y el PDF.

No hay ningún deploy hecho desde este rediseño. Hasta que el secreto y el id real existan, el workflow de `main` va a fallar: es el comportamiento esperado.

## GitHub Pages

Hasta ahora el sitio se publicaba desde la raíz del repositorio en GitHub Pages (`maxhess22.github.io/portafolio`). Este rediseño ya no deja un `index.html` en la raíz: la salida está en `dist/` y el canal de publicación es Firebase Hosting. Al fusionar, GitHub Pages deja de mostrar el portafolio nuevo hasta que Firebase esté configurado.

## Pendiente para Max

- Confirmar la URL pública de NEXTFLOW y reemplazar `https://TODO-confirmar-url-de-nextflow` en `src/data/site.js`.
- Confirmar las demos de UI Lab Fase Cero y Biblioteca de Ajedrez. Los repos son privados; los placeholders son `https://TODO-confirmar-url-de-ui-lab` y `https://TODO-confirmar-url-de-biblioteca-ajedrez`.
- Crear el proyecto de Firebase, reemplazar `TODO-firebase-project-id` y cargar el secreto.
- El PDF de `public/cv/CV_Max_Hess_Fullstack.pdf` es el currículum adjunto. El sitio no muestra el teléfono en ninguna página. Si quieres un PDF sin teléfono, reemplaza ese archivo.
