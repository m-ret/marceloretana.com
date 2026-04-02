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
    { value: "Sitio web nuevo", label: "Sitio web nuevo" },
    { value: "Mejorar sitio actual", label: "Mejorar sitio actual" },
    { value: "Páginas por servicio", label: "Páginas por servicio" },
    { value: "Reservas o consultas", label: "Reservas o consultas" },
    { value: "App o sistema a medida", label: "App o sistema a medida" },
  ],
  en: [
    { value: "New business website", label: "New business website" },
    { value: "Improve current website", label: "Improve current website" },
    { value: "Service pages", label: "Service pages" },
    { value: "Booking or inquiry flow", label: "Booking or inquiry flow" },
    { value: "App or custom system", label: "App or custom system" },
  ],
};

const sharedIndustries: Record<LeadFormLocale, OptionValue[]> = {
  cr: [
    { value: "Construcción o inmobiliario", label: "Construcción o inmobiliario" },
    { value: "Clínica o salud", label: "Clínica o salud" },
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
        businessName: "Empresa o negocio",
        email: "Email",
        phoneOrWhatsApp: "Teléfono o WhatsApp",
        industry: "Industria",
        projectType: "Tipo de proyecto",
        budgetRange: "Presupuesto estimado",
        timeline: "Cuándo le gustaría empezar",
        message: "Qué necesita cotizar",
      },
      placeholders: {
        name: "Su nombre",
        businessName: "Nombre del negocio",
        email: "su@email.com",
        phoneOrWhatsApp: "+506 ...",
        message: "¿Qué vende, qué necesita cotizar y cuál es la meta principal de este proyecto?",
      },
      selects: {
        industryDefault: "Seleccione una industria",
        projectTypeDefault: "Seleccione el tipo de proyecto",
        budgetDefault: "Seleccione un rango",
        timelineDefault: "Seleccione un momento",
      },
      options: {
        industries: sharedIndustries.cr,
        projectTypes: sharedProjectTypes.cr,
        budgetRanges: sharedBudgetRanges.cr,
        timelines: sharedTimelines.cr,
      },
      submit: {
        idle: "Solicitar cotización",
        sending: "Enviando...",
        success: "Enviado",
      },
      messages: {
        helper:
          "Le respondo por email en menos de 24 horas con una recomendación clara y los siguientes pasos.",
        error: "Algo salió mal. Intente de nuevo o escriba por email.",
        success: "Mensaje enviado. Le responderé por email en menos de 24 horas.",
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
      budgetRange: "Estimated budget",
      timeline: "When would you like to start",
      message: "What do you need quoted",
    },
    placeholders: {
      name: "Your name",
      businessName: "Business name",
      email: "your@email.com",
      phoneOrWhatsApp: "+1 ...",
      message:
        "What does the business do, what do you need quoted, and what is the main goal for this project?",
    },
    selects: {
      industryDefault: "Select an industry",
      projectTypeDefault: "Select a project type",
      budgetDefault: "Select a range",
      timelineDefault: "Select a timeframe",
    },
    options: {
      industries: sharedIndustries.en,
      projectTypes: sharedProjectTypes.en,
      budgetRanges: sharedBudgetRanges.en,
      timelines: sharedTimelines.en,
    },
    submit: {
      idle: "Request Quote",
      sending: "Sending...",
      success: "Sent",
    },
    messages: {
      helper: "I reply by email within 24 hours with a clear recommendation and next steps.",
      error: "Something went wrong. Please try again or email me directly.",
      success: "Message sent. I will reply by email within 24 hours.",
    },
  };
}
