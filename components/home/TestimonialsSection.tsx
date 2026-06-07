"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    stars: 5,
    text: "ARX Infotech transformed our infrastructure. Downtime dropped and performance improved dramatically. Highly professional team.",
    name: "Ellen Downing",
    company: "Wrode Co.",
    delay: 0,
  },
  {
    stars: 4.5,
    text: "Outstanding security audit and quick remediation suggestions. They identified vulnerabilities we didn't even know existed.",
    name: "Douglas Galveston",
    company: "Sitwell Financial",
    delay: 100,
  },
  {
    stars: 4,
    text: "Their team is proactive and always available. A fantastic technology partner — they feel like an extension of our own team.",
    name: "Kian Graham",
    company: "Henlow Express",
    delay: 200,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={
            i <= Math.floor(rating)
              ? "fill-gold-400 text-gold-400"
              : i - 0.5 === rating
              ? "fill-gold-400/50 text-gold-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14" data-reveal="fade-up">
          <p className="text-gold-400 font-semibold font-poppins text-sm uppercase tracking-wider mb-3">
            Client Reviews
          </p>
          <h2 className="section-title mb-4">What Our Clients Say</h2>
          <p className="section-subtitle">
            Trusted by clients across India for reliable IT solutions and services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ stars, text, name, company, delay }) => (
            <div
              key={name}
              data-reveal="fade-up"
              data-reveal-delay={delay}
              className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <StarRating rating={stars} />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                &ldquo;{text}&rdquo;
              </p>
              <div>
                <p className="font-poppins font-bold text-navy-900 dark:text-white text-sm">
                  {name}
                </p>
                <p className="text-gold-400 text-xs font-semibold mt-0.5">
                  {company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
