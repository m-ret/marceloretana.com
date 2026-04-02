import { z } from "zod";

export type LeadFormLocale = "en" | "cr";

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

export const leadFormSchema = z.object({
  name: z.string().trim().min(2),
  businessName: optionalText,
  email: z.string().trim().email(),
  phoneOrWhatsApp: optionalText,
  industry: optionalText,
  projectType: z.string().trim().min(2),
  budgetRange: optionalText,
  timeline: optionalText,
  message: z.string().trim().min(20),
  locale: z.enum(["en", "cr"]),
  sourcePage: z.string().trim().min(1),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

type OptionValue = {
  value: string;
  label: string;
};

type LeadFormCopy = {
  labels: {
    name: string;
    businessName: string;
    email: string;
    phoneOrWhatsApp: string;
    industry: string;
    projectType: string;
    budgetRange: string;
    timeline: string;
    message: string;
  };
  placeholders: {
    name: string;
    businessName: string;
    email: string;
    phoneOrWhatsApp: string;
    message: string;
  };
  selects: {
    industryDefault: string;
    projectTypeDefault: string;
    budgetDefault: string;
    timelineDefault: string;
  };
  options: {
    industries: OptionValue[];
    projectTypes: OptionValue[];
    budgetRanges: OptionValue[];
    timelines: OptionValue[];
  };
  submit: {
    idle: string;
    sending: string;
    success: string;
  };
  messages: {
    helper: string;
    error: string;
    success: string;
  };
};

const sharedProjectTypes: Record<LeadFormLocale, OptionValue[]> = {
  cr: [
    { value: "Primera pagina web", label: "Primera pagina web" },
    { value: "Rediseno de sitio web", label: "Rediseno de sitio web" },
    { value: "Paginas por servicio con SEO", label: "Paginas por servicio con SEO" },
    { value: "Sitio con reservas o consultas", label: "Sitio con reservas o consultas" },
    { value: "App o solucion a medida", label: "App o solucion a medida" },
  ],
  en: [
    { value: "First business website", label: "First business website" },
    { value: "Website redesign", label: "Website redesign" },
    { value: "SEO service pages", label: "SEO service pages" },
    { value: "Booking or inquiry website", label: "Booking or inquiry website" },
    { value: "App or custom workflow", label: "App or custom workflow" },
  ],
};

const sharedIndustries: Record<LeadFormLocale, OptionValue[]> = {
  cr: [
    { value: "Construccion o inmobiliario", label: "Construccion o inmobiliario" },
    { value: "Clinica o salud", label: "Clinica o salud" },
    { value: "Servicios generales", label: "Servicios generales" },
    { value: "Turismo u hospitalidad", label: "Turismo u hospitalidad" },
    { value: "Otro", label: "Otro" },
  ],
  en: [
    { value: "Real estate or construction", label: "Real estate or construction" },
    { value: "Clinic or healthcare", label: "Clinic or healthcare" },
    { value: "General services", label: "General services" },
    { value: "Tourism or hospitality", label: "Tourism or hospitality" },
    { value: "Other", label: "Other" },
  ],
};

const sharedBudgetRanges: Record<LeadFormLocale, OptionValue[]> = {
  cr: [
    { value: "Menos de $3k", label: "Menos de $3k" },
    { value: "$3k-$7k", label: "$3k-$7k" },
    { value: "$7k-$15k", label: "$7k-$15k" },
    { value: "$15k+", label: "$15k+" },
  ],
  en: [
    { value: "Under $3k", label: "Under $3k" },
    { value: "$3k-$7k", label: "$3k-$7k" },
    { value: "$7k-$15k", label: "$7k-$15k" },
    { value: "$15k+", label: "$15k+" },
  ],
};

const sharedTimelines: Record<LeadFormLocale, OptionValue[]> = {
  cr: [
    { value: "Lo antes posible", label: "Lo antes posible" },
    { value: "Este mes", label: "Este mes" },
    { value: "En 1-2 meses", label: "En 1-2 meses" },
    { value: "Solo estoy explorando", label: "Solo estoy explorando" },
  ],
  en: [
    { value: "As soon as possible", label: "As soon as possible" },
    { value: "This month", label: "This month" },
    { value: "In 1-2 months", label: "In 1-2 months" },
    { value: "Just exploring", label: "Just exploring" },
  ],
};

export function getLeadFormCopy(locale: LeadFormLocale): LeadFormCopy {
  if (locale === "cr") {
    return {
      labels: {
        name: "Nombre",
        businessName: "Negocio",
        email: "Email",
        phoneOrWhatsApp: "Telefono o WhatsApp",
        industry: "Industria",
        projectType: "Tipo de proyecto",
        budgetRange: "Presupuesto",
        timeline: "Tiempo ideal",
        message: "Cuenteme que necesita",
      },
      placeholders: {
        name: "Su nombre",
        businessName: "Nombre del negocio",
        email: "su@email.com",
        phoneOrWhatsApp: "+506 ...",
        message: "Que vende, que necesita y que le gustaria mejorar primero?",
      },
      selects: {
        industryDefault: "Seleccione una industria",
        projectTypeDefault: "Seleccione un proyecto",
        budgetDefault: "Seleccione un presupuesto",
        timelineDefault: "Seleccione un tiempo",
      },
      options: {
        industries: sharedIndustries.cr,
        projectTypes: sharedProjectTypes.cr,
        budgetRanges: sharedBudgetRanges.cr,
        timelines: sharedTimelines.cr,
      },
      submit: {
        idle: "Solicitar cotizacion",
        sending: "Enviando...",
        success: "Enviado",
      },
      messages: {
        helper: "Respuesta por email en menos de 24 horas. WhatsApp queda como canal secundario.",
        error: "Algo salio mal. Intente de nuevo o escriba por email.",
        success: "Mensaje enviado. Le respondere por email en menos de 24 horas.",
      },
    };
  }

  return {
    labels: {
      name: "Name",
      businessName: "Business name",
      email: "Email",
      phoneOrWhatsApp: "Phone or WhatsApp",
      industry: "Industry",
      projectType: "Project type",
      budgetRange: "Budget range",
      timeline: "Timeline",
      message: "Tell me what you need",
    },
    placeholders: {
      name: "Your name",
      businessName: "Business name",
      email: "your@email.com",
      phoneOrWhatsApp: "+1 ...",
      message: "What does the business do, what do you need built, and what should improve first?",
    },
    selects: {
      industryDefault: "Select an industry",
      projectTypeDefault: "Select a project type",
      budgetDefault: "Select a budget range",
      timelineDefault: "Select a timeline",
    },
    options: {
      industries: sharedIndustries.en,
      projectTypes: sharedProjectTypes.en,
      budgetRanges: sharedBudgetRanges.en,
      timelines: sharedTimelines.en,
    },
    submit: {
      idle: "Request a Quote",
      sending: "Sending...",
      success: "Sent",
    },
    messages: {
      helper: "Reply by email within 24 hours. Form first keeps follow-up cleaner than WhatsApp.",
      error: "Something went wrong. Please try again or email me directly.",
      success: "Message sent. I will reply by email within 24 hours.",
    },
  };
}
