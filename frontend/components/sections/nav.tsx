"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed Nav -- no full-width background */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 pointer-events-none">
        <div className="flex items-center justify-between">
          {/* Glass pill: logo + theme toggle */}
          <div className="nav-glass pointer-events-auto flex items-center gap-1 rounded-full px-4 py-2">
            <Link href="/" className="text-2xl md:text-3xl tracking-tight">
              <span className="font-medium text-white">M</span>
              <span className="font-light text-white/40">/</span>
              <span className="font-bold text-white">R</span>
            </Link>
            <div className="w-px h-5 bg-white/15 mx-2" />
            <ThemeToggle className="text-white" />
          </div>

          {/* Hamburger -- standalone, no container */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto nav-glass flex flex-col gap-1.5 p-3 rounded-full group"
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-white group-hover:bg-white/70 transition-colors" />
            <span className="w-6 h-0.5 bg-white group-hover:bg-white/70 transition-colors" />
            <span className="w-6 h-0.5 bg-white group-hover:bg-white/70 transition-colors" />
          </button>
        </div>
      </nav>

      {/* Full screen menu overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-bg transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full px-6 md:px-12 lg:px-16 py-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-fg text-2xl md:text-3xl tracking-tight"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-medium">M</span>
                <span className="font-light text-fg-muted">/</span>
                <span className="font-bold">R</span>
              </Link>
              <ThemeToggle />
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-fg hover:text-fg-secondary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col md:flex-row md:items-start pt-24 md:pt-32">
            {/* Get in Touch section */}
            <div className="md:w-1/2 mb-16 md:mb-0">
              <p className="text-sm uppercase tracking-widest text-fg mb-2">Get in Touch</p>
              <p className="text-fg-muted text-sm mb-6">
                Need a website, app, or MVP? Let&apos;s talk.
              </p>
              <a
                href="mailto:info@gexpsoftware.com"
                className="text-xl md:text-2xl text-fg hover:text-fg-secondary transition-colors"
              >
                info@gexpsoftware.com &rarr;
              </a>
            </div>

            {/* Menu links */}
            <div className="md:w-1/2 md:pl-16">
              <nav className="space-y-2">
                {menuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl md:text-4xl text-fg hover:text-fg-secondary transition-colors border-b border-border pb-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-6 flex flex-wrap gap-8 text-sm text-fg-muted">
            <div>
              <p className="text-fg mb-1">Puerto Jim&eacute;nez, Costa Rica</p>
            </div>
            <div>
              <p className="text-fg mb-1">info@gexpsoftware.com</p>
            </div>
            <div className="ml-auto">
              <p>&copy; {new Date().getFullYear()} Marcelo Retana</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
