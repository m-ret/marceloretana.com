export type CaseProof = {
  id: string;
  title: string;
  sector: string;
  audience: "es" | "en" | "both";
  href?: string;
  summary: string;
  highlights: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
    source: "Google" | "Clutch";
  };
};

const caseProofs: CaseProof[] = [
  {
    id: "nature-escapes",
    title: "Nature Escapes",
    sector: "Turismo y hospitalidad",
    audience: "both",
    summary:
      "Trabajo para una marca de hospitalidad en Costa Rica donde la primera impresión visual y la sensación de confianza afectan cada consulta.",
    highlights: [
      "Presentación más clara del negocio y de la experiencia ofrecida.",
      "Estructura pensada para que una persona interesada encuentre contexto antes de escribir.",
    ],
    quote: {
      text: "They supported us every step of the way to achieve the website we dreamed of.",
      author: "Stefany Ramírez",
      role: "Business Owner",
      source: "Google",
    },
  },
  {
    id: "vista3-architects",
    title: "Vista3 Architects",
    sector: "Arquitectura y construcción",
    audience: "both",
    href: "https://vista3architects.com",
    summary:
      "Ejemplo útil para negocios de alto valor que necesitan proyectar criterio, confianza y una presencia más sólida antes de la primera conversación.",
    highlights: [
      "Trabajo orientado a presentación profesional de servicios y proyectos.",
      "Enfoque en credibilidad visual, claridad de oferta y mejor percepción del negocio.",
    ],
  },
  {
    id: "dr-bahia-ballena",
    title: "Dr Bahía Ballena",
    sector: "Salud y clínica",
    audience: "both",
    summary:
      "Caso relevante para salud: la web tiene que transmitir confianza rápido, explicar servicios sin ruido y dejar claro cómo dar el siguiente paso.",
    highlights: [
      "Presencia profesional más clara para un negocio donde la confianza importa desde el inicio.",
      "Mejor estructura para servicios, contexto y contacto.",
    ],
    quote: {
      text: "Top-quality service with the utmost professionalism. 100% recommended.",
      author: "Francisco Elizondo",
      role: "Business Owner",
      source: "Google",
    },
  },
  {
    id: "unicorn",
    title: "Unicorn",
    sector: "Producto y software",
    audience: "en",
    summary:
      "Useful proof for English-speaking buyers who care less about agency theater and more about speed, adaptability, and senior execution.",
    highlights: [
      "Founder-led delivery without heavy agency layers.",
      "Execution model built to adapt quickly when scope changes.",
    ],
    quote: {
      text: "Their speed and ability to adapt to changes are top-notch.",
      author: "Clay McIlrath",
      role: "Founder",
      source: "Clutch",
    },
  },
  {
    id: "avodah",
    title: "Avodah Transformations",
    sector: "Service business",
    audience: "en",
    summary:
      "A good match for foreign-owned service businesses that want a site and delivery process that feels organized, not improvised.",
    highlights: [
      "Strong planning and design process, not just build-and-disappear execution.",
      "Relevant for buyers comparing low-end local options against a more structured partner.",
    ],
    quote: {
      text: "Their ability to plan an entire design process impressed us.",
      author: "Andrew Bailey",
      role: "Co-Founder",
      source: "Clutch",
    },
  },
  {
    id: "gexp",
    title: "GEXP Software",
    sector: "Servicio y captación digital",
    audience: "both",
    href: "https://gexpsoftware.com/cr",
    summary:
      "Internal proof from a live Costa Rica service machine built around search intent, clearer trust signals, and form-first lead capture.",
    highlights: [
      "Spanish and English service lanes built around different buyer language.",
      "Lead capture structured around email-first quotes instead of pure WhatsApp chaos.",
    ],
  },
];

const caseProofsById = new Map(caseProofs.map((proof) => [proof.id, proof]));

export function getCaseProofs(ids?: string[]) {
  if (!ids?.length) return [];

  return ids
    .map((id) => caseProofsById.get(id))
    .filter((proof): proof is CaseProof => Boolean(proof));
}
