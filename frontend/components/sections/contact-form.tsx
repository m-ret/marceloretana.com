"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, budget, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 border-b border-border">
        <p className="text-sm uppercase tracking-widest text-fg-muted mb-2">Message Sent</p>
        <p className="text-fg">Got it — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-border py-3 text-fg placeholder:text-fg-muted focus:outline-none focus:border-fg transition-colors text-sm";
  const labelClass = "block text-xs uppercase tracking-widest text-fg-muted mb-2";

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="py-12 border-b border-border">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="budget" className={labelClass}>
          Budget
        </label>
        <select
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          disabled={status === "loading"}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" disabled className="bg-bg text-fg-muted">
            Select a budget range
          </option>
          <option value="$1,000 – $5,000" className="bg-bg">
            $1,000 – $5,000
          </option>
          <option value="$5,000 – $10,000" className="bg-bg">
            $5,000 – $10,000
          </option>
          <option value="$10,000 – $25,000" className="bg-bg">
            $10,000 – $25,000
          </option>
          <option value="$25,000 – $50,000" className="bg-bg">
            $25,000 – $50,000
          </option>
          <option value="$50,000 – $100,000" className="bg-bg">
            $50,000 – $100,000
          </option>
          <option value="$100,000+" className="bg-bg">
            $100,000+
          </option>
        </select>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
          required
          rows={4}
          disabled={status === "loading"}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && <p className="text-sm text-red-500 mb-6">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="text-sm uppercase tracking-widest text-fg hover:text-fg-secondary transition-colors disabled:opacity-40"
      >
        {status === "loading" ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
