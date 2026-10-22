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

La paleta, la tipografía y la composición salen del portafolio de 2023 y están escritas como tokens en `src/styles/tokens.scss`. Los componentes solo consumen esos tokens.

- Fondo `#172c3f`, franjas y tarjetas `#4f6378`. El negro `#0a151f` queda solo en el menú y el pie. Las subtarjetas usan un slate más oscuro, `#3f5366`, con un borde suave. El acento es el blanco hueso `#eae4d8`.
- Texto blanco y whitesmoke. El acento es el blanco hueso `#eae4d8`. El hover de los botones usa ese hueso con texto oscuro, para que el contraste se sostenga.
- Títulos en Lucida Sans y texto en Verdana, con una escala fluida (`clamp`) y el párrafo en unas 60 a 75 caracteres. La monoespaciada queda solo en las etiquetas cortas y en el cargo del hero.
- En escritorio la lectura sigue un eje izquierdo y cierra a la derecha: el texto principal va a la izquierda; la foto, la ficha de formación, las fechas y las tarjetas secundarias van a la derecha. Los llamados a la acción quedan al final de ese recorrido. En móvil todo es una columna, alineada a la izquierda.
- La foto del hero es cuadrada, de unos 320 px, con esquinas de 16 px, borde claro y sombra para separarla del navy.
- Las tarjetas de proyecto usan el mismo radio, el mismo fondo y los mismos botones con borde claro.
- El pie tiene el fondo más oscuro y las esquinas superiores redondeadas.

No hay tema claro. Ese diseño era una sola paleta oscura, y un interruptor de tema la partía. El texto editable está en `src/data/site.js`.

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

- Confirmar las demos de UI Lab Fase Cero y Biblioteca de Ajedrez. Los repos son privados; los placeholders son `https://TODO-confirmar-url-de-ui-lab` y `https://TODO-confirmar-url-de-biblioteca-ajedrez`.
- Crear el proyecto de Firebase, reemplazar `TODO-firebase-project-id` y cargar el secreto.
- El PDF de `public/cv/CV_Max_Hess_Fullstack.pdf` es el currículum adjunto. El sitio no muestra el teléfono en ninguna página. Si quieres un PDF sin teléfono, reemplaza ese archivo.
