"use client";

import Link from "next/link";
import {
  Globe,
  Smartphone,
  Briefcase,
  Cloud,
  TrendingUp,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites, web apps, portals, and e-commerce platforms built with modern frameworks for speed, SEO, and scalability.",
    delay: 0,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Cross-platform Android & iOS apps with intuitive UX, payment integration, and real-time capabilities.",
    delay: 50,
  },
  {
    icon: Briefcase,
    title: "IT Consulting",
    description:
      "Strategic IT advisory, infrastructure planning, system audits, and technology roadmap design for business transformation.",
    delay: 100,
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description:
      "AWS, Azure & GCP cloud migration, architecture design, DevOps pipelines, and managed cloud operations.",
    delay: 150,
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "SEO, Google Ads, social media marketing, and analytics-driven campaigns to grow your online presence.",
    delay: 200,
  },
  {
    icon: GraduationCap,
    title: "Software Training",
    description:
      "Corporate IT training, developer bootcamps, cloud certification prep, and academic technology programmes.",
    delay: 250,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-gold-400 font-semibold font-poppins text-sm uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="section-title mb-4">Our Core Services</h2>
          <p className="section-subtitle">
            Complete IT and digital transformation solutions for businesses of
            all sizes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map(({ icon: Icon, title, description, delay }) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={delay}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm hover:shadow-lg border border-transparent hover:border-gold-400/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold-400/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-400 transition-colors duration-300">
                <Icon
                  size={22}
                  className="text-gold-400 group-hover:text-navy-900 transition-colors duration-300"
                />
              </div>
              <h3 className="font-poppins font-bold text-lg text-navy-900 dark:text-white mb-3">
                {title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center" data-aos="fade-up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 dark:bg-gold-400 dark:hover:bg-gold-500 dark:text-navy-900 text-white font-bold font-poppins rounded transition-colors duration-200"
          >
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
