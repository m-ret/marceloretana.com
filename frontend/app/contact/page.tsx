"use client";

import dynamic from "next/dynamic";
import { ContactForm } from "@/components/sections/contact-form";
import { MarqueeStrip } from "@/components/ui/marquee-strip";

const ContactCanvas = dynamic(
  () => import("@/components/three/contact-canvas").then((m) => m.ContactCanvas),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* WebGL canvas — fixed, clipped to this section */}
      <section className="relative bg-black min-h-[60vh]" style={{ clipPath: "inset(0)" }}>
        <div className="fixed inset-0 pointer-events-none">
          <ContactCanvas />
        </div>

        {/* Text content over the canvas */}
        <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-40 pb-20 max-w-3xl">
          <p
            className="animate-hero-fade-up text-white/50 text-sm uppercase tracking-[0.3em] mb-6"
            style={{ animationDelay: "0.2s" }}
          >
            Let&apos;s Talk
          </p>
          <h1
            className="animate-hero-fade-up text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-6"
            style={{ animationDelay: "0.4s" }}
          >
            Start a project.
            <br />
            <span className="text-white/70">Get a quote.</span>
          </h1>
          <p
            className="animate-hero-fade-up text-lg text-white/50 max-w-xl"
            style={{ animationDelay: "0.65s" }}
          >
            I build websites, apps, and MVPs. Tell me what you&apos;re working on and I&apos;ll get
            back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form section — theme-aware */}
      <section className="relative z-10 bg-bg px-6 md:px-12 lg:px-16 pb-32">
        <div className="max-w-3xl">
          <ContactForm />

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-8 text-sm text-fg-muted">
            <div>
              <p className="text-fg-muted uppercase tracking-widest text-xs mb-2">Email</p>
              <a href="mailto:info@gexpsoftware.com" className="hover:text-fg transition-colors">
                info@gexpsoftware.com
              </a>
            </div>
            <div>
              <p className="text-fg-muted uppercase tracking-widest text-xs mb-2">Book a call</p>
              <a
                href="https://cal.com/marcelo-retana"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors"
              >
                cal.com/marcelo-retana →
              </a>
            </div>
            <div>
              <p className="text-fg-muted uppercase tracking-widest text-xs mb-2">Location</p>
              <p>Puerto Jiménez, Costa Rica</p>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />
    </main>
  );
}
