"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
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

  // GSAP text animation
  useEffect(() => {
    let ctx: gsap.Context | undefined;

    async function animate() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      ctx = gsap.context(() => {
        // Reveal the content wrapper (hidden to prevent FOUC before GSAP loads)
        gsap.set(".hero-content", { visibility: "visible" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-canvas-wrap", { opacity: 0, duration: 0.6 }, 0);
        tl.from(".hero-label", { y: 24, opacity: 0, duration: 0.5 }, 0.3);
        tl.from(".hero-line", { y: "100%", opacity: 0, duration: 0.6, stagger: 0.12 }, 0.5);
        tl.from(".hero-subtitle", { y: 16, opacity: 0, duration: 0.6 }, 1.2);
        tl.from(".hero-scroll", { opacity: 0, duration: 0.5 }, 1.6);
      }, sectionRef);
    }

    animate();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ clipPath: "inset(0)" }}>
      {/* Fixed canvas -- stays viewport-sized, clipped to section bounds by clip-path */}
      <div className="hero-canvas-wrap fixed inset-0 pointer-events-none">
        {isDesktop && isVisible ? (
          <HeroCanvas />
        ) : (
          <div className="hero-mobile-gradient absolute inset-0" />
        )}
      </div>

      {/* Content scrolls naturally on top -- hidden until GSAP reveals */}
      <div className="hero-content relative z-10" style={{ visibility: "hidden" }}>
        {/* Hero headline (viewport height) */}
        <div className="flex h-screen flex-col justify-center px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl">
            <p className="hero-label text-white/70 text-sm md:text-base uppercase tracking-[0.3em] mb-6">
              About
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.1] tracking-tight mb-8">
              <span className="hero-line inline-block">I build modern websites</span>
              <br />
              <span className="hero-line inline-block">and apps that convert</span>
              <br />
              <span className="hero-line inline-block">visitors into customers.</span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl">
              Full-stack development with Next.js. SEO-optimized, fast, and built for lead
              generation.
              <br className="hidden md:block" />
              <span className="md:ml-0"> Websites, apps, ecommerce, and MVPs — shipped fast.</span>
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Scroll</span>
            <div className="scroll-indicator-line" />
          </div>
        </div>

        {/* Profile card + contact -- scrolls up over the 3D scene */}
        <div className="px-6 md:px-12 lg:px-16 pb-24 pt-16">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Image */}
            <div className="relative w-full md:w-80 h-96 md:h-[520px] flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpeg"
                alt="Marcelo Retana"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Info panel */}
            <div className="bg-yellow-400 p-8 md:p-10 flex flex-col justify-between md:w-80">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-black mb-2">Marcelo Retana</h2>
                <p className="text-black/70 text-sm mb-6">Founder &amp; Software Engineer</p>
                <p className="text-black/80 leading-relaxed mb-4">
                  Full-stack developer with 10+ years of experience building high-converting
                  websites, apps, and MVPs. Performance-first, SEO-optimized, and designed for lead
                  generation.
                </p>
                <p className="text-black/80 leading-relaxed text-sm">
                  Modern tech stack. Clean architecture. Based in Costa Rica, delivering worldwide.
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
                Get in Touch
              </p>
              <a
                href="mailto:info@gexpsoftware.com"
                className="text-xl md:text-2xl text-white/70 hover:text-white transition-colors mb-6"
              >
                info@gexpsoftware.com
              </a>
              <div className="flex flex-col gap-3">
                <a
                  href="https://cal.com/marcelo-retana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/70 transition-colors"
                >
                  <span>Book a Call</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href="/marcelo-retana-resume.pdf"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-white/70 transition-colors"
                >
                  <span>Download Resume</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
