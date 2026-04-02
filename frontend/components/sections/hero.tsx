"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause canvas when hero section is out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ clipPath: "inset(0)" }}>
      {/* Fixed canvas -- stays viewport-sized, clipped to section bounds by clip-path */}
      <div className="hero-canvas-wrap fixed inset-0 pointer-events-none">
        {isVisible && <HeroCanvas />}
      </div>

      {/* Content scrolls naturally on top -- CSS animations, no JS dependency */}
      <div className="hero-content relative z-10">
        {/* Hero headline (viewport height) */}
        <div className="flex min-h-screen flex-col justify-center px-6 pb-12 pt-28 md:px-12 md:pt-32 lg:px-16 lg:pt-36">
          <div className="max-w-4xl xl:max-w-[58rem]">
            <p className="hero-label mb-5 text-xs uppercase tracking-[0.28em] text-white/70 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] md:text-sm">
              Costa Rica Websites and Apps
            </p>

            <h1 className="mb-6 max-w-[14ch] text-[clamp(3rem,7vw,5.75rem)] font-light leading-[0.98] tracking-[-0.04em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              <span className="inline-block">Websites and apps</span>
              <br />
              <span className="inline-block">that help Costa Rica businesses</span>
              <br />
              <span className="inline-block">look serious and convert better.</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-white/68 [text-shadow:0_2px_16px_rgba(0,0,0,0.8)] md:text-lg lg:text-xl">
              Founder-led execution by Marcelo Retana for Costa Rica businesses and foreign-owned
              teams that need a better website, a clearer offer, and a cleaner quote process.
              <br className="hidden md:block" />
              <span className="md:ml-0">
                Two clear lanes, Spanish for local buyers and English for foreign-owned businesses.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
              <Link
                href="/cr"
                className="inline-flex min-h-12 items-center gap-2 border border-white/20 bg-white px-4 text-[11px] uppercase tracking-[0.24em] text-black transition-colors hover:bg-yellow-400 md:px-5 md:text-sm"
              >
                <span>Para negocios en Costa Rica</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/costa-rica"
                className="inline-flex min-h-12 items-center gap-2 border border-white/20 px-4 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:border-white/60 hover:bg-white/8 md:px-5 md:text-sm"
              >
                <span>For foreign-owned businesses</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
            <span className="text-white/40 text-xs uppercase tracking-[0.2em] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
              Scroll
            </span>
            <div className="scroll-indicator-line" />
          </div>
        </div>

        {/* Profile card + contact -- scrolls up over the 3D scene */}
        <div className="px-6 md:px-12 lg:px-16 pb-24 pt-16">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Image */}
            <div className="relative w-full md:w-80 h-96 md:h-[520px] flex-shrink-0">
              <Image
                src="/profile.jpeg"
                alt="Marcelo Retana"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>

            {/* Info panel */}
            <div className="bg-yellow-400 p-8 md:p-10 flex flex-col justify-between md:w-80">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-black mb-2">Marcelo Retana</h2>
                <p className="text-black/70 text-sm mb-6">Founder, GEXP Software</p>
                <p className="text-black/80 leading-relaxed mb-4">
                  Senior developer based in Costa Rica. I help businesses go from invisible,
                  outdated, or improvised to a website that feels credible and easier to buy from.
                </p>
                <p className="text-black/80 leading-relaxed text-sm">
                  Local context, direct communication, and a commercial process that starts with a
                  clear form instead of a messy thread.
                </p>
              </div>
              <div className="mt-8 space-y-2 text-sm">
                <a
                  href="https://gexpsoftware.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
                >
                  GEXP Software &rarr;
                </a>
                <a
                  href="https://inflafest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
                >
                  Inflafest Costa Rica &rarr;
                </a>
                <a
                  href="https://ticoguides.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
                >
                  TicoGuides &rarr;
                </a>
                <a
                  href="https://goeasy.chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
                >
                  GoEasy Chat &rarr;
                </a>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="flex flex-col justify-end p-8 md:p-10 md:pl-16">
              <p className="text-lg md:text-xl uppercase tracking-widest text-white font-medium mb-4">
                Start in the Right Lane
              </p>
              <p className="max-w-sm text-white/70 mb-6">
                Pick the commercial path that matches your business, then request a quote with the
                right context.
              </p>
              <div className="flex flex-col gap-4">
                <Link
                  href="/cr"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/70 transition-colors"
                >
                  <span>Spanish Costa Rica Services</span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/costa-rica"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/70 transition-colors"
                >
                  <span>English Costa Rica Services</span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                >
                  <span>Request a Quote</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
