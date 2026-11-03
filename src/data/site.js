export const site = {
  name: "Max Hess",
  role: "Ingeniero de Software Fullstack",
  location: "Santiago, Chile",
  email: "ma.hessalvarez@gmail.com",
  linkedin: "https://www.linkedin.com/in/max-felipe-hess-alvarez-37414b1bb/",
  github: "https://github.com/maxhess22",
  cvPath: "/cv/CV_Max_Hess_Fullstack.pdf",
  cvFilename: "CV_Max_Hess_Fullstack.pdf",
  description:
    "Portafolio de Max Hess, ingeniero de software fullstack en Santiago. Sistemas en producción, plataformas municipales y NEXTFLOW.",
  portrait: {
    src: "/img/perfil.jpg",
    width: 720,
    height: 720,
    alt: "Retrato de Max Hess sonriendo, con camisa blanca y corbata negra.",
  },
  nav: [
    { href: "/#sobre-mi", id: "sobre-mi", label: "Sobre mí" },
    { href: "/#experiencia", id: "experiencia", label: "Experiencia" },
    { href: "/#proyectos", id: "proyectos", label: "Proyectos" },
    { href: "/#tecnologias", id: "tecnologias", label: "Tecnologías" },
    { href: "/#contacto", id: "contacto", label: "Contacto" },
  ],
  story: {
    paragraphs: [
      "Soy ingeniero de software fullstack, enfocado en optimizar procesos y resolver problemas que aporten valor al negocio. Me involucro en las conversaciones con clientes y usuarios para entender sus necesidades, definir requerimientos y comunicar qué es viable, qué limitaciones existen y qué alternativas podemos construir en equipo.",
      "Soy autodidacta y mantengo un aprendizaje constante: investigo, pregunto y reconozco cuando necesito profundizar antes de proponer una solución. Integro inteligencia artificial en mi trabajo con criterio, revisando sus resultados y manteniendo la responsabilidad sobre las decisiones técnicas.",
      "Fuera del desarrollo, mi principal pasatiempo es el ajedrez. Disfruto estudiar libros y entrenar, con la intención de construir una práctica diaria y disciplinada.",
    ],

  },
  experienceIntro:
    "Tres lugares donde el software ya lo usa alguien: la municipalidad, el hospital y un estudio.",
  experience: [
    {
      id: "experiencia-cofodep",
      role: "Ingeniero de Software",
      org: "Corporación Municipal de Fomento de La Florida (Cofodep)",
      shortName: "Cofodep",
      file: "cofodep.md",
      summary: "Creo proyectos de innovación de punta a punta, modernizo plataformas comunitarias y automatizo flujos de trabajo.",
      highlights: [
        "Creación de nuevos proyectos de innovación de punta a punta y definición de hitos.",
        "De PHP legacy a aplicaciones SPA con APIs en Go y despliegues en Google Cloud.",
        "Automatización de procesos, estandarización del flujo de trabajo y documentación técnica.",
        "Encargado de un desarrollador en práctica durante 3 meses: formación en buenas prácticas y flujo de trabajo hasta ser un desarrollador funcional.",
      ],
      start: "2026-02",
      startLabel: "Febrero 2026",
      endLabel: "Actualidad",
      current: true,
      points: [
        "Participé activamente en la creación de nuevos proyectos de innovación de punta a punta, definiendo hitos, requerimientos y entregas junto a las áreas de la corporación.",
        "Lideré la modernización de plataformas legacy en PHP, entre ellas Tarjeta Vecino, Casa Emprender, Coraje y TeCuidoApp. Los flujos críticos pasaron a aplicaciones SPA con APIs RESTful en Go y autenticación JWT.",
        "Automaticé procesos y estandaricé el flujo de trabajo de desarrollo, elaborando documentación técnica y operativa para el equipo.",
        "Migré la infraestructura y los despliegues a Google Cloud Platform, y llevé la negociación técnica y la implementación de los requerimientos de punta a punta.",
        "Limpié, mapeé y migré datos legacy en MySQL con Pentaho Data Integration, cuidando las conexiones y la integridad de las transacciones en los despliegues nuevos.",
        "Fui encargado de un desarrollador en práctica durante tres meses: estructuré su formación en buenas prácticas y flujo de trabajo hasta consolidarlo como un desarrollador funcional y autónomo.",
      ],
    },
    {
      role: "Ingeniero de Software",
      org: "Hospital San Juan de Dios",
      shortName: "Hospital San Juan de Dios",
      file: "hospital.md",
      summary: "Desarrollo y soporte de sistemas clínicos y administrativos, en contacto directo con el personal médico.",
      highlights: ["De 9 clics a 1 para solicitar una ambulancia.", "Funcionalidades a medida para Ambulatorio y Hospitalizados.", "Resolución y seguimiento de incidentes L2 y L3."],
      start: "2023-07",
      end: "2025-11",
      startLabel: "Julio 2023",
      endLabel: "Noviembre 2025",
      current: false,
      points: [
        "Di soporte L2 y L3 a Ambulatorio, Hospitalizados y Movilización: recibí llamadas y atendí directamente a médicos y usuarios, resolviendo incidentes y buscando su causa raíz.",
        "Rediseñé el flujo de solicitudes de ambulancia. La operación bajó de 9 clics a 1, y los coordinadores respondieron en menos tiempo.",
        "Desarrollé funcionalidades a medida y colaboré en mejoras de Ambulatorio y Hospitalizados, respondiendo a solicitudes del personal médico con Laravel, JavaScript y MySQL.",
        "Llevé el ciclo de ingeniería de requerimientos de punta a punta, dentro de la red interna del hospital: necesidades clínicas y administrativas, entregas iterativas y despliegue.",
      ],
    },
    {
      role: "Desarrollador Web",
      org: "Arcadius Entertainment",
      shortName: "Arcadius",
      file: "arcadius.md",
      summary: "Desarrollo de plataformas web e infraestructura para un estudio de entretenimiento.",
      highlights: ["Integración de WordPress y React.", "Administración de servicios en Microsoft Azure."],
      start: "2023-01",
      end: "2023-05",
      startLabel: "Enero 2023",
      endLabel: "Mayo 2023",
      current: false,
      points: [
        "Desarrollé plataformas web integrando WordPress y React.",
        "Administré y configuré servicios de infraestructura en Microsoft Azure.",
      ],
    },
  ],
  projectsIntro: "Lo que estoy construyendo ahora, y los sistemas que dejé en producción.",
  featured: {
    id: "proyecto-nextflow",
    folder: "nextflow",
    eyebrow: "Producto propio",
    name: "NEXTFLOW",
    summary:
      "Plataforma SaaS para gestionar tiendas, pedidos y despachos desde un solo lugar.",
    points: [
      "Clientes, inventario y pedidos.",
      "Rutas de despacho con mapa de cobertura.",
      "Planes de suscripción.",
      "Panel de administración.",
      "Lorenzo, un guía con voz que enseña a usar la plataforma.",
    ],
    stack: ["React", "Vite", "Firebase Hosting", "PHP"],
    note: "El front está hecho con React y Vite, publicado en Firebase Hosting. La API está en PHP.",
    link: {
      label: "Visitar nextflow.cl",
      url: "https://nextflow.cl",
    },
  },
  projects: [
    {
      id: "proyecto-hospital",
      folder: "hospital-san-juan-de-dios",
      eyebrow: "Experiencia profesional · Salud",
      name: "Hospital San Juan de Dios",
      summary:
        "Desarrollo a medida y soporte directo al personal médico en sistemas clínicos y administrativos.",
      result: {
        before: "9",
        after: "1",
        label: "clic para solicitar una ambulancia",
      },
      items: [
        {
          name: "Movilización",
          summary: "Renovación completa del sistema, optimización de solicitudes de ambulancia y soporte a usuarios.",
        },
        {
          name: "Ambulatorio y Hospitalizados",
          summary: "Desarrollo y colaboración en funcionalidades a medida, según solicitudes de los usuarios, y documentación técnica.",
        },
        {
          name: "Clima Laboral",
          summary: "Cambios y documentación del sistema.",
        },
      ],
      stack: ["Laravel", "JavaScript", "MySQL"],
      architecture: "Frontend (JS) ──> Backend MVC (Laravel) ──> MySQL (Red interna)",
      note: "Sistemas internos del hospital.",
      support: "Soporte a Ambulatorio, Hospitalizados y Movilización: atención telefónica y directa a médicos y usuarios, resolución de incidentes y seguimiento de solicitudes.",
    },
    {
      id: "proyecto-ajedrez",
      folder: "biblioteca-ajedrez",
      eyebrow: "Proyecto personal",
      name: "Biblioteca de Ajedrez",
      summary:
        "Recursos de estudio y entrenamiento para seguir mejorando en ajedrez.",
      points: [
        "Guías de estudio y libros digitalizados de ajedrez.",
        "Entrenamientos para jugar ajedrez a la ciega.",
        "Más recursos para aprender y practicar.",
      ],
      stack: ["Pug"],
      link: {
        label: "Ver la biblioteca",
        url: "https://biblioteca-ajedrez-mh.web.app/",
      },
    },
  ],
  municipal: {
    id: "proyecto-municipal",
    folder: "sistemas-municipales",
    eyebrow: "Experiencia profesional · La Florida",
    name: "Sistemas municipales",
    summary:
      "Creación y modernización de plataformas comunitarias: de PHP legacy a aplicaciones SPA con APIs en Go.",
    stack: ["Vue", "Go", "MySQL"],
    architecture: "SPA (Vue) ──JWT──> API REST (Go) ──> MySQL (ETL Pentaho · GCP)",
    note: "Sin enlace público en los demás sistemas internos de la corporación.",
    support: "Creación de nuevos proyectos de innovación de punta a punta con definición de hitos, automatización y documentación del flujo de trabajo, y formación durante 3 meses de un desarrollador en práctica en buenas prácticas hasta convertirlo en un desarrollador funcional.",
    items: [
      {
        name: "TeCuidoApp",
        link: {
          label: "tecuidoapp.fomentolf.cl",
          url: "https://tecuidoapp.fomentolf.cl/",
        },
        summary:
          "Identificación y localización de adultos mayores o personas con condiciones cognitivas mediante colgantes NFC/QR.",
      },
      {
        name: "Tarjeta Vecino",
        summary:
          "Beneficios y descuentos para residentes.",
      },
      {
        name: "Casa Emprender",
        summary:
          "Capacitación y apoyo al emprendimiento.",
      },
      {
        name: "Coraje",
        summary: "Registro e identificación de mascotas.",
      },
    ],
  },
  technologies: [
    {
      name: "Producto e interfaz",
      tab: { label: "frontend.ts", lang: "TS" },
      description: "Experiencias web para las personas que usan el sistema cada día.",
      case: { label: "Ver NEXTFLOW", href: "#proyecto-nextflow" },
      primary: [
        { label: "Vue", context: "SPAs municipales" },
        { label: "React", context: "NEXTFLOW" },
      ],
      secondary: ["JavaScript", "SvelteKit", "Tailwind", "Bootstrap", "jQuery", "DataTables", "WordPress"],
    },
    {
      name: "Servicios y datos",
      tab: { label: "backend.go", lang: "GO" },
      description: "APIs, reglas de negocio y datos que sostienen la operación.",
      case: { label: "Ver sistemas municipales", href: "#proyecto-municipal" },
      primary: [
        { label: "Go", context: "APIs municipales" },
        { label: "Laravel", context: "Hospital San Juan de Dios" },
      ],
      secondary: ["MySQL", "Python", "Slim", "Django", "FastAPI", "Gin", "Pentaho"],
    },
    {
      name: "Entrega y operación",
      tab: { label: "deploy.yml", lang: "YML" },
      description: "Infraestructura, despliegues y herramientas para mantener el software funcionando.",
      case: { label: "Ver experiencia en Cofodep", href: "#experiencia-cofodep" },
      primary: [
        { label: "GCP", context: "Infraestructura" },
        { label: "Firebase", context: "Hosting NEXTFLOW" },
        { label: "GitHub Actions", context: "Automatización" },
      ],
      secondary: ["Azure", "Git"],
      learning: "AWS",
    },
  ],
  contactIntro:
    "Conversemos sobre los desafíos del proyecto y cómo puedo aportar.",
};

export function jsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    sameAs: [site.linkedin, site.github],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Duoc UC",
    },
  }).replace(/</g, "\\u003c");
}
