"use client";

import { useState } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  source: "google" | "clutch";
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Their approach created a mutually beneficial relationship that resembled a unified team. Their proactivity and creativity stood out.",
    author: "Don Hayley, CPA",
    role: "Founder",
    company: "Mavrix AI",
    source: "clutch",
    rating: 5,
  },
  {
    quote: "Their speed and ability to adapt to changes are top-notch. They over-delivered, and operated like an extension of our team.",
    author: "Clay McIlrath",
    role: "Founder",
    company: "Unicorn",
    source: "clutch",
    rating: 5,
  },
  {
    quote: "The page turned out spectacular; it honestly exceeded my expectations. Their attention and step-by-step explanation was incredible.",
    author: "Leonel Chinchilla",
    role: "Business Owner",
    source: "google",
    rating: 5,
  },
  {
    quote: "We were pleased with their service and the results. Their ability to plan an entire design process impressed us.",
    author: "Andrew Bailey",
    role: "Co-Founder",
    company: "Avodah Transformations",
    source: "clutch",
    rating: 5,
  },
  {
    quote: "An extremely professional team. They supported us every step of the way to achieve the website we dreamed of.",
    author: "Stefany Ramírez",
    role: "Business Owner",
    source: "google",
    rating: 5,
  },
  {
    quote: "Top-quality service with the utmost professionalism. 100% recommended.",
    author: "Francisco Elizondo",
    role: "Business Owner",
    source: "google",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-[var(--color-bg-tertiary)]">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-16">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium">
              Testimonials
            </h2>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-fg)] leading-tight">
              What clients say.
            </p>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                5.0 on Clutch
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                5.0 on Google
              </div>
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="mb-12">
          <div className="bg-[var(--color-bg-secondary)] p-8 md:p-12 relative">
            <div className="absolute top-8 right-8 md:top-12 md:right-12">
              <span className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                {testimonials[activeIndex].source === "clutch" ? "Clutch" : "Google"}
              </span>
            </div>
            <StarRating rating={testimonials[activeIndex].rating} />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--color-fg)] leading-relaxed mt-6 mb-8">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </blockquote>
            <div>
              <p className="text-[var(--color-fg)] font-medium">
                {testimonials[activeIndex].author}
              </p>
              <p className="text-[var(--color-fg-muted)]">
                {testimonials[activeIndex].role}
                {testimonials[activeIndex].company && (
                  <>, {testimonials[activeIndex].company}</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-4 text-left transition-all ${
                activeIndex === index
                  ? "bg-yellow-400 text-black"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-fg)]"
              }`}
            >
              <p className="text-xs font-medium truncate">
                {testimonial.author.split(",")[0]}
              </p>
              <p className="text-xs opacity-60 truncate">
                {testimonial.company || testimonial.role}
              </p>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-[var(--color-border)]">
          <div>
            <p className="text-4xl md:text-5xl font-light text-[var(--color-fg)]">5.0</p>
            <p className="text-[var(--color-fg-muted)] text-sm mt-2">Clutch Rating</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-light text-[var(--color-fg)]">5.0</p>
            <p className="text-[var(--color-fg-muted)] text-sm mt-2">Google Rating</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-light text-[var(--color-fg)]">100%</p>
            <p className="text-[var(--color-fg-muted)] text-sm mt-2">Client Satisfaction</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-light text-[var(--color-fg)]">50+</p>
            <p className="text-[var(--color-fg-muted)] text-sm mt-2">Projects Delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
