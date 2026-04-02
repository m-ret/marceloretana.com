"use client";

import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { getLeadFormCopy, type LeadFormData, type LeadFormLocale } from "@/lib/lead-form";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type ContactFormProps = {
  locale?: LeadFormLocale;
  sourcePage?: string;
  className?: string;
  header?: {
    eyebrow: string;
    title: string;
    description: string;
    notes?: string[];
    notesTitle?: string;
  };
};

const inputClass =
  "min-h-14 w-full border border-border bg-bg-secondary px-4 py-4 text-base text-fg placeholder:text-fg-muted focus:outline-none focus:border-fg transition-colors";

const textareaClass = `${inputClass} min-h-[180px] resize-none`;

const labelClass = "block text-[11px] uppercase tracking-[0.2em] text-fg-muted mb-3";

const selectClass = `${inputClass} cursor-pointer`;

function formDefaults(locale: LeadFormLocale, sourcePage: string): LeadFormData {
  return {
    name: "",
    businessName: "",
    email: "",
    phoneOrWhatsApp: "",
    industry: "",
    projectType: "",
    budgetRange: "",
    timeline: "",
    message: "",
    locale,
    sourcePage,
  };
}

export function ContactForm({ locale = "en", sourcePage, className, header }: ContactFormProps) {
  const copy = getLeadFormCopy(locale);
  const pathname = usePathname();
  const resolvedSourcePage = sourcePage ?? pathname ?? "/";
  const [form, setForm] = useState<LeadFormData>(formDefaults(locale, resolvedSourcePage));
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const idPrefix = useId().replace(/:/g, "");

  const updateField = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          sourcePage: resolvedSourcePage,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || copy.messages.error);
      }

      setStatus("success");
      setForm(formDefaults(locale, resolvedSourcePage));
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : copy.messages.error);
    }
  }

  if (status === "success") {
    return (
      <div className={cn("border-t border-border pt-8 md:pt-10", className)}>
        <p className="text-sm uppercase tracking-widest text-fg-muted mb-2">
          {copy.submit.success}
        </p>
        <p className="max-w-2xl text-fg-secondary">{copy.messages.success}</p>
      </div>
    );
  }

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className={cn("border-t border-border pt-8 md:pt-10", className)}
    >
      {header ? (
        <div className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">
              {header.eyebrow}
            </p>
            <h2 className="mb-4 max-w-2xl text-3xl font-light leading-[1.02] tracking-tight md:text-5xl">
              {header.title}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-fg-secondary md:text-xl">
              {header.description}
            </p>
          </div>

          <div className="lg:pt-12">
            <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
              {header.notesTitle ?? (locale === "cr" ? "Qué recibe" : "What you get")}
            </p>
            <ul className="space-y-4">
              {(header.notes?.length ? header.notes : [copy.messages.helper]).map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-fg" />
                  <span className="text-sm leading-relaxed text-fg-secondary">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mb-10">
          <p className="max-w-2xl text-base text-fg-muted">{copy.messages.helper}</p>
        </div>
      )}

      <fieldset className="mb-8">
        <legend className="mb-5 text-[11px] uppercase tracking-[0.24em] text-fg-muted">
          {locale === "cr" ? "Contacto" : "Contact"}
        </legend>
        <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-name`} className={labelClass}>
              {copy.labels.name}
            </label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={copy.placeholders.name}
              required
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${idPrefix}-email`} className={labelClass}>
              {copy.labels.email}
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={copy.placeholders.email}
              required
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${idPrefix}-business`} className={labelClass}>
              {copy.labels.businessName}
            </label>
            <input
              id={`${idPrefix}-business`}
              type="text"
              value={form.businessName ?? ""}
              onChange={(event) => updateField("businessName", event.target.value)}
              placeholder={copy.placeholders.businessName}
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
              {copy.labels.phoneOrWhatsApp}
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="text"
              value={form.phoneOrWhatsApp ?? ""}
              onChange={(event) => updateField("phoneOrWhatsApp", event.target.value)}
              placeholder={copy.placeholders.phoneOrWhatsApp}
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-5 text-[11px] uppercase tracking-[0.24em] text-fg-muted">
          {locale === "cr" ? "Proyecto" : "Project"}
        </legend>
        <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-industry`} className={labelClass}>
              {copy.labels.industry}
            </label>
            <select
              id={`${idPrefix}-industry`}
              value={form.industry ?? ""}
              onChange={(event) => updateField("industry", event.target.value)}
              disabled={status === "loading"}
              className={selectClass}
            >
              <option value="" className="bg-bg text-fg-muted">
                {copy.selects.industryDefault}
              </option>
              {copy.options.industries.map((option) => (
                <option key={option.value} value={option.value} className="bg-bg text-fg">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-project`} className={labelClass}>
              {copy.labels.projectType}
            </label>
            <select
              id={`${idPrefix}-project`}
              value={form.projectType}
              onChange={(event) => updateField("projectType", event.target.value)}
              required
              disabled={status === "loading"}
              className={selectClass}
            >
              <option value="" className="bg-bg text-fg-muted">
                {copy.selects.projectTypeDefault}
              </option>
              {copy.options.projectTypes.map((option) => (
                <option key={option.value} value={option.value} className="bg-bg text-fg">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-budget`} className={labelClass}>
              {copy.labels.budgetRange}
            </label>
            <select
              id={`${idPrefix}-budget`}
              value={form.budgetRange ?? ""}
              onChange={(event) => updateField("budgetRange", event.target.value)}
              disabled={status === "loading"}
              className={selectClass}
            >
              <option value="" className="bg-bg text-fg-muted">
                {copy.selects.budgetDefault}
              </option>
              {copy.options.budgetRanges.map((option) => (
                <option key={option.value} value={option.value} className="bg-bg text-fg">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-timeline`} className={labelClass}>
              {copy.labels.timeline}
            </label>
            <select
              id={`${idPrefix}-timeline`}
              value={form.timeline ?? ""}
              onChange={(event) => updateField("timeline", event.target.value)}
              disabled={status === "loading"}
              className={selectClass}
            >
              <option value="" className="bg-bg text-fg-muted">
                {copy.selects.timelineDefault}
              </option>
              {copy.options.timelines.map((option) => (
                <option key={option.value} value={option.value} className="bg-bg text-fg">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <div className="mb-8">
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          {copy.labels.message}
        </label>
        <textarea
          id={`${idPrefix}-message`}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={copy.placeholders.message}
          required
          disabled={status === "loading"}
          className={textareaClass}
        />
      </div>

      {status === "error" ? (
        <p className="mb-6 text-sm text-red-400" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <div className="flex flex-col gap-5 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-14 items-center justify-center gap-3 border border-fg bg-fg px-6 text-sm uppercase tracking-[0.18em] text-bg transition-colors hover:bg-bg hover:text-fg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{status === "loading" ? copy.submit.sending : copy.submit.idle}</span>
          <span aria-hidden="true">→</span>
        </button>

        <p className="max-w-md text-sm leading-relaxed text-fg-muted">{copy.messages.helper}</p>
      </div>
    </form>
  );
}
