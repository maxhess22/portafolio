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
  value:
    "Llevo software a producción, del requerimiento al despliegue, y me quedo cuando la gente ya lo está usando.",
  portrait: {
    src: "/img/perfil.jpg",
    width: 720,
    height: 720,
    alt: "Retrato de Max Hess al aire libre, con un suéter claro.",
  },
  nav: [
    { href: "/#historia", id: "historia", label: "Historia" },
    { href: "/#experiencia", id: "experiencia", label: "Experiencia" },
    { href: "/#proyectos", id: "proyectos", label: "Proyectos" },
    { href: "/#tecnologias", id: "tecnologias", label: "Tecnologías" },
    { href: "/#contacto", id: "contacto", label: "Contacto" },
  ],
  story: {
    paragraphs: [
      "Desde chico tuve curiosidad por cómo funciona la tecnología. Me encantaban los computadores y los videojuegos, y quería entender cómo funcionaban.",
      "En octavo básico formateé mi primer computador. Abrí el problema, seguí lo que iba descubriendo y la máquina volvió a partir. Ahí se me quedó la maña.",
      "Estudié Ingeniería Informática en Duoc UC, entre 2020 y 2024. Ahí puse esa curiosidad en calidad de software, modelos de datos y desarrollo.",
    ],
    quote:
      "Me apasiona la inteligencia artificial porque ahora tenemos todo el conocimiento en la palma de la mano.",
    after: [
      "Con eso aprendo más rápido y contrasto mejor lo que estoy construyendo. El criterio de qué problema vale la pena resolver sigue siendo mío.",
      "Juego ajedrez. Me gusta pensar la jugada que viene, no solo la que tengo enfrente.",
      "En el trabajo me pasa lo mismo con el software: me importa llegar a producción y quedarme cuando alguien ya lo está usando. Por eso NEXTFLOW, mi propia plataforma, es el proyecto del que más orgulloso estoy. Con él ese oficio también puede generar ingresos.",
    ],
    facts: [
      {
        label: "Formación",
        value: "Ingeniería Informática, Duoc UC, 2020–2024",
      },
      {
        label: "Especialidad",
        value: "Calidad de software, modelos de datos y desarrollo de software",
      },
      { label: "Idioma", value: "Español nativo · inglés intermedio" },
      { label: "Fuera del editor", value: "Ajedrez" },
    ],
  },
  experienceIntro:
    "Tres lugares donde el software ya lo usa alguien: la municipalidad, el hospital y un estudio.",
  experience: [
    {
      role: "Ingeniero de Software",
      org: "Corporación Municipal de Fomento de La Florida (Cofodep)",
      start: "2026-02",
      startLabel: "Febrero 2026",
      endLabel: "Actualidad",
      current: true,
      points: [
        "Lideré la modernización de plataformas legacy en PHP, entre ellas Tarjeta Vecino, Casa Emprender y Coraje. Los flujos críticos pasaron a aplicaciones SPA con APIs RESTful en Go y autenticación JWT.",
        "Migré la infraestructura y los despliegues a Google Cloud Platform, y llevé la negociación técnica y la implementación de los requerimientos de punta a punta.",
        "Limpié, mapeé y migré datos legacy en MySQL con Pentaho Data Integration, cuidando las conexiones y la integridad de las transacciones en los despliegues nuevos.",
        "Mentoricé a un desarrollador en práctica durante tres meses: armé su plan de capacitación y lo dejé trabajando con autonomía.",
      ],
    },
    {
      role: "Ingeniero de Software",
      org: "Hospital San Juan de Dios",
      start: "2023-07",
      end: "2025-11",
      startLabel: "Julio 2023",
      endLabel: "Noviembre 2025",
      current: false,
      points: [
        "Di soporte L2 y L3 en producción a cada software que lancé: atendí a quienes lo usaban, resolví el incidente y busqué la causa raíz.",
        "Rediseñé el flujo de solicitudes de ambulancia. La operación bajó de 9 clics a 1, y los coordinadores respondieron en menos tiempo.",
        "Desarrollé y mantuve plataformas web en arquitectura MVC, con JavaScript y MySQL, para el día a día del personal médico.",
        "Llevé el ciclo de ingeniería de requerimientos de punta a punta, dentro de la red interna del hospital: necesidades clínicas y administrativas, entregas iterativas y despliegue.",
      ],
    },
    {
      role: "Desarrollador Web",
      org: "Arcadius Entertainment",
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
    eyebrow: "Producto propio",
    name: "NEXTFLOW",
    summary:
      "Plataforma SaaS para tiendas. Es el producto del que más orgulloso estoy, porque con él puedo generar ingresos.",
    points: [
      "Clientes, inventario y pedidos.",
      "Rutas de despacho con mapa de cobertura.",
      "Planes de suscripción.",
      "Panel de administración.",
      "Lorenzo, un guía con voz que enseña a usar la plataforma.",
    ],
    stack: ["React", "Vite", "Firebase Hosting", "PHP"],
    note: "El front está hecho con React y Vite, publicado en Firebase Hosting. La API está en PHP.",
    todo: {
      label: "Demo pública",
      url: "https://TODO-confirmar-url-de-nextflow",
    },
  },
  projects: [
    {
      name: "UI Lab Fase Cero",
      summary:
        "Sistema de diseño con tokens semánticos, primitivas de interfaz y reglas para que un agente de IA programe pantallas consistentes. Está hecho con SvelteKit y Tailwind.",
      stack: ["SvelteKit", "Tailwind"],
      todo: {
        label: "Demo",
        url: "https://TODO-confirmar-url-de-ui-lab",
      },
    },
    {
      name: "Biblioteca de Ajedrez",
      summary:
        "Sitio estático de ajedrez construido con el contrato Fase Cero v2: los mismos tokens y componentes, para que la interfaz se mantenga coherente.",
      stack: ["Pug", "Fase Cero v2"],
      todo: {
        label: "Demo",
        url: "https://TODO-confirmar-url-de-biblioteca-ajedrez",
      },
    },
  ],
  municipal: {
    name: "Sistemas municipales",
    summary:
      "En la Corporación Municipal de Fomento de La Florida modernicé tres sistemas comunitarios. Salieron de PHP legacy hacia aplicaciones SPA, con APIs RESTful en Go y autenticación JWT.",
    note: "Sin enlace público. Son sistemas de la corporación.",
    items: [
      {
        name: "Tarjeta Vecino",
        summary:
          "Credencial de beneficios para residentes de La Florida, con convenios y descuentos en la comuna.",
      },
      {
        name: "Casa Emprender",
        summary:
          "Espacio de la corporación para emprender: capacitación, mentorías y trabajo.",
      },
      {
        name: "Coraje",
        summary: "Registro e identificación de mascotas de la comuna.",
      },
    ],
  },
  techIntro: "Agrupadas por oficio. AWS está en aprendizaje.",
  technologies: [
    {
      name: "Lenguajes",
      items: ["Go", "PHP", "Python", "JavaScript"],
    },
    {
      name: "Interfaz",
      items: ["React", "SvelteKit", "Tailwind"],
    },
    {
      name: "Datos",
      items: ["MySQL"],
    },
    {
      name: "Nube",
      items: [
        { label: "GCP" },
        { label: "Azure" },
        { label: "AWS", note: "en aprendizaje" },
        { label: "Firebase" },
      ],
    },
    {
      name: "Herramientas",
      items: ["Git", "GitHub Actions", "Pentaho"],
    },
  ],
  contactIntro:
    "Si estás armando un equipo o quieres hablar de un sistema en producción, escríbeme.",
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
