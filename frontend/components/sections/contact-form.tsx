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
};

const inputClass =
  "w-full bg-transparent border-b border-border py-4 md:py-5 text-base text-fg placeholder:text-fg-muted focus:outline-none focus:border-fg transition-colors";

const labelClass = "block text-xs uppercase tracking-[0.28em] text-fg-muted mb-3";

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

export function ContactForm({ locale = "en", sourcePage, className }: ContactFormProps) {
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
      <div className={cn("py-12 border-b border-border", className)}>
        <p className="text-sm uppercase tracking-widest text-fg-muted mb-2">
          {copy.submit.success}
        </p>
        <p className="text-fg">{copy.messages.success}</p>
      </div>
    );
  }

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className={cn("py-12 border-b border-border", className)}
    >
      <p className="text-base text-fg-muted mb-10 max-w-2xl">{copy.messages.helper}</p>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
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
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
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

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
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
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
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
          rows={6}
          disabled={status === "loading"}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" ? <p className="text-sm text-red-500 mb-6">{errorMsg}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="text-sm md:text-base uppercase tracking-[0.24em] text-fg hover:text-fg-secondary transition-colors disabled:opacity-40"
      >
        {status === "loading" ? copy.submit.sending : `${copy.submit.idle} →`}
      </button>
    </form>
  );
}
