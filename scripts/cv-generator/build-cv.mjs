import { execSync } from "node:child_process";
import { writeFileSync, unlinkSync, copyFileSync } from "node:fs";

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  @page {
    size: letter;
    margin: 10mm 15mm 10mm 15mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1a202c;
    background: #ffffff;
    font-size: 9.15pt;
    line-height: 1.35;
    -webkit-font-smoothing: antialiased;
  }
  header {
    border-bottom: 2px solid #1a365d;
    padding-bottom: 5px;
    margin-bottom: 7px;
  }
  .header-name {
    font-size: 21pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    line-height: 1.05;
  }
  .header-title {
    font-size: 11pt;
    font-weight: 600;
    color: #1e3a8a;
    margin-top: 3px;
    margin-bottom: 4px;
  }
  .header-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 3px 9px;
    font-size: 8.5pt;
    color: #475569;
  }
  .header-contact a {
    color: #1e3a8a;
    text-decoration: none;
    font-weight: 500;
  }
  .header-contact a:hover {
    text-decoration: underline;
  }
  .dot {
    color: #94a3b8;
  }
  section {
    margin-bottom: 7px;
  }
  h2 {
    font-size: 9.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  p.summary {
    font-size: 8.75pt;
    color: #334155;
    text-align: justify;
    line-height: 1.34;
  }
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2px;
    font-size: 8.5pt;
  }
  .skills-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 6px;
    line-height: 1.3;
  }
  .skills-label {
    font-weight: 700;
    color: #1e293b;
  }
  .skills-val {
    color: #334155;
  }
  .job {
    margin-bottom: 6px;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  .job-title {
    font-size: 9.25pt;
    font-weight: 700;
    color: #0f172a;
  }
  .job-company {
    font-weight: 600;
    color: #1e3a8a;
  }
  .job-dates {
    font-size: 8pt;
    font-weight: 600;
    color: #64748b;
    white-space: nowrap;
  }
  ul.job-bullets {
    list-style: none;
    padding-left: 0;
  }
  ul.job-bullets li {
    position: relative;
    padding-left: 11px;
    font-size: 8.5pt;
    color: #334155;
    margin-bottom: 2px;
    line-height: 1.32;
    text-align: justify;
  }
  ul.job-bullets li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #1e3a8a;
    font-size: 9pt;
  }
  ul.job-bullets li strong {
    color: #0f172a;
  }
  .project-title {
    font-size: 9.25pt;
    font-weight: 700;
    color: #0f172a;
  }
  .project-link {
    font-size: 8.5pt;
    color: #1e3a8a;
    text-decoration: none;
    font-weight: 600;
  }
  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.75pt;
  }
  .edu-degree {
    font-weight: 700;
    color: #0f172a;
  }
  .edu-school {
    color: #1e3a8a;
    font-weight: 600;
  }
  .edu-detail {
    font-size: 8pt;
    color: #475569;
    margin-top: 1px;
  }
</style>
</head>
<body>

<header>
  <h1 class="header-name">Max Hess</h1>
  <div class="header-title">Ingeniero de Software Fullstack</div>
  <div class="header-contact">
    <span>Santiago, Chile</span>
    <span class="dot">·</span>
    <span><a href="mailto:ma.hessalvarez@gmail.com">ma.hessalvarez@gmail.com</a></span>
    <span class="dot">·</span>
    <span>+56 9 7341 1965</span>
    <span class="dot">·</span>
    <span><a href="https://maxhess-portafolio.web.app" target="_blank">maxhess-portafolio.web.app</a></span>
    <span class="dot">·</span>
    <span><a href="https://linkedin.com/in/max-felipe-hess-alvarez-37414b1bb" target="_blank">linkedin.com/in/max-felipe-hess-alvarez-37414b1bb</a></span>
    <span class="dot">·</span>
    <span><a href="https://github.com/maxhess22" target="_blank">github.com/maxhess22</a></span>
  </div>
</header>

<section>
  <h2>Resumen Profesional</h2>
  <p class="summary">
    Ingeniero de Software Fullstack con más de 3 años de experiencia en desarrollo, modernización y soporte de aplicaciones web de misión crítica en producción. Especializado en front-end reactivo (Vue, React, SPAs) y back-end escalable (Go, PHP, Laravel, APIs RESTful), con modelado y optimización de datos en MySQL, migración masiva de datos (ETL) y despliegues cloud en Google Cloud Platform (GCP). Destaco por ownership de punta a punta: desde el levantamiento de requerimientos y definición de hitos hasta el despliegue continuo, soporte L2/L3 y automatización de flujos de trabajo.
  </p>
</section>

<section>
  <h2>Habilidades Técnicas</h2>
  <div class="skills-grid">
    <div class="skills-row">
      <span class="skills-label">Lenguajes:</span>
      <span class="skills-val">Go, PHP, JavaScript (ES6+), TypeScript, Python, SQL</span>
    </div>
    <div class="skills-row">
      <span class="skills-label">Front-end:</span>
      <span class="skills-val">Vue, React, Vite, Tailwind CSS, SvelteKit, SPAs, HTML5, CSS3</span>
    </div>
    <div class="skills-row">
      <span class="skills-label">Back-end & APIs:</span>
      <span class="skills-val">Go (APIs RESTful), PHP, Laravel, Arquitectura MVC, Autenticación JWT, Integración de sistemas</span>
    </div>
    <div class="skills-row">
      <span class="skills-label">Bases de datos & ETL:</span>
      <span class="skills-val">MySQL, modelado y optimización relacional, Pentaho Data Integration (PDI)</span>
    </div>
    <div class="skills-row">
      <span class="skills-label">Cloud & DevOps:</span>
      <span class="skills-val">Google Cloud Platform (GCP), Microsoft Azure, Firebase Hosting, Git, GitHub Actions (CI/CD)</span>
    </div>
    <div class="skills-row">
      <span class="skills-label">Prácticas & Liderazgo:</span>
      <span class="skills-val">Ingeniería de requerimientos end-to-end, mentoría técnica, soporte L2/L3, análisis de causa raíz</span>
    </div>
  </div>
</section>

<section>
  <h2>Experiencia Profesional</h2>

  <div class="job">
    <div class="job-header">
      <div>
        <span class="job-title">Ingeniero de Software</span> · <span class="job-company">Corporación Municipal de Fomento de La Florida (Cofodep)</span>
      </div>
      <span class="job-dates">Febrero 2026 – Actualidad</span>
    </div>
    <ul class="job-bullets">
      <li><strong>Proyectos de Innovación:</strong> Lideré activamente la creación de proyectos de innovación de punta a punta, coordinando con áreas de negocio la definición de hitos, requerimientos y entregas técnicas iterativas.</li>
      <li><strong>Modernización Arquitectónica:</strong> Migré plataformas comunitarias legacy en PHP (Tarjeta Vecino, Casa Emprender, Coraje y <a href="https://tecuidoapp.fomentolf.cl/" target="_blank" style="color:#1e3a8a;text-decoration:none;font-weight:600;">TeCuidoApp</a>) hacia arquitecturas SPA desacopladas en Vue con APIs RESTful en Go y autenticación JWT.</li>
      <li><strong>Cloud & Migración de Datos:</strong> Gestioné la migración de infraestructura hacia GCP y ejecuté la limpieza, modelado y migración masiva de bases de datos relacionales en MySQL con Pentaho Data Integration (PDI).</li>
      <li><strong>Liderazgo & Formación Técnica:</strong> Encargado de la mentoría de un desarrollador en práctica durante 3 meses, estructurando su plan en buenas prácticas y estandarización del flujo de trabajo hasta lograr su plena autonomía.</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <div>
        <span class="job-title">Ingeniero de Software</span> · <span class="job-company">Hospital San Juan de Dios</span>
      </div>
      <span class="job-dates">Julio 2023 – Noviembre 2025</span>
    </div>
    <ul class="job-bullets">
      <li><strong>Optimización de Impacto:</strong> Rediseñé el flujo crítico de solicitudes de ambulancias en el sistema de Movilización, reduciendo la operación de 9 clics a 1 único clic y disminuyendo drásticamente el tiempo de respuesta del servicio.</li>
      <li><strong>Desarrollo Clínico:</strong> Desarrollé y mantuve plataformas internas bajo arquitectura MVC utilizando Laravel, JavaScript y MySQL, implementando módulos a medida para los servicios de Ambulatorio y Hospitalizados.</li>
      <li><strong>Soporte L2/L3 en Producción:</strong> Atendí directamente incidentes de usuarios y personal médico, diagnosticando problemas en tiempo real y realizando análisis de causa raíz para soluciones definitivas.</li>
      <li><strong>Ownership End-to-End:</strong> Gestioné el ciclo completo de requerimientos dentro de la red hospitalaria, liderando iteraciones ágiles y múltiples versiones en producción.</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <div>
        <span class="job-title">Desarrollador Web</span> · <span class="job-company">Arcadius Entertainment</span>
      </div>
      <span class="job-dates">Enero 2023 – Mayo 2023</span>
    </div>
    <ul class="job-bullets">
      <li>Desarrollé plataformas web integrando WordPress con componentes interactivos en React.</li>
      <li>Administré y configuré servicios de infraestructura cloud en Microsoft Azure.</li>
    </ul>
  </div>
</section>

<section>
  <h2>Proyectos Destacados</h2>
  <div class="job">
    <div class="job-header">
      <div>
        <span class="project-title">NEXTFLOW</span> · <a class="project-link" href="https://nextflow.cl" target="_blank">nextflow.cl ↗</a>
      </div>
      <span class="job-dates">SaaS en Producción</span>
    </div>
    <ul class="job-bullets">
      <li>Plataforma SaaS para gestión comercial, inventario, pedidos y rutas de despacho con mapas de cobertura. Desarrollada con frontend SPA en React y Vite (Firebase Hosting), backend en PHP con APIs RESTful y panel de administración.</li>
    </ul>
  </div>
</section>

<section>
  <h2>Educación & Idiomas</h2>
  <div class="edu-row">
    <div>
      <span class="edu-degree">Ingeniería Informática</span> · <span class="edu-school">DUOC UC, Santiago, Chile</span>
    </div>
    <span class="job-dates">2020 – 2024</span>
  </div>
  <div class="edu-detail">
    Especialidad en calidad de software, análisis y modelado de datos, y arquitectura de desarrollo.
  </div>
  <div class="edu-detail" style="margin-top: 2px;">
    <strong>Idiomas:</strong> Español (Nativo) · Inglés (Intermedio - lectura y documentación técnica).
  </div>
</section>

</body>
</html>
`;

const tempHtml = "/tmp/cv_max_hess.html";
const outPdf = "/Applications/MAMP/htdocs/portafolio/public/cv/CV_Max_Hess_Fullstack.pdf";
const outPdfCopy = "/Applications/MAMP/htdocs/portafolio/public/cv/CV_Max_Hess_Fullstack_Revisado.pdf";

writeFileSync(tempHtml, htmlContent, "utf8");

const cmd = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --print-to-pdf="${outPdf}" --no-pdf-header-footer "${tempHtml}"`;
execSync(cmd);
copyFileSync(outPdf, outPdfCopy);
unlinkSync(tempHtml);

console.log("PDF generado exitosamente en:", outPdf);
