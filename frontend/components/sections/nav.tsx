"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-6 bg-bg">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-fg text-2xl md:text-3xl tracking-tight">
            <span className="font-medium">M</span>
            <span className="font-light text-fg-muted">/</span>
            <span className="font-bold">R</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Hamburger button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex flex-col gap-1.5 p-2 group"
              aria-label="Open menu"
            >
              <span className="w-8 h-0.5 bg-fg group-hover:bg-fg-secondary transition-colors" />
              <span className="w-8 h-0.5 bg-fg group-hover:bg-fg-secondary transition-colors" />
              <span className="w-8 h-0.5 bg-fg group-hover:bg-fg-secondary transition-colors" />
            </button>
          </div>
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
            <Link
              href="/"
              className="text-fg text-2xl md:text-3xl tracking-tight"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-medium">M</span>
              <span className="font-light text-fg-muted">/</span>
              <span className="font-bold">R</span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />

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
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col md:flex-row md:items-start pt-24 md:pt-32">
            {/* Get in Touch section */}
            <div className="md:w-1/2 mb-16 md:mb-0">
              <p className="text-sm uppercase tracking-widest text-fg mb-2">Get in Touch</p>
              <p className="text-fg-muted text-sm mb-6">Have a project in mind? Let&apos;s talk.</p>
              <a
                href="mailto:info@gexpsoftware.com"
                className="text-xl md:text-2xl text-fg hover:text-fg-secondary transition-colors"
              >
                info@gexpsoftware.com →
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
              <p className="text-fg mb-1">Puerto Jiménez, Costa Rica</p>
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
