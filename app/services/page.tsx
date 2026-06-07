import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Briefcase,
  Cloud,
  TrendingUp,
  GraduationCap,
  Code,
  Shield,
  Database,
  Settings,
  Server,
  Laptop2,
  CheckCircle2,
  Check,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/home/CTASection";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ARX Infotech provides managed IT services, cloud migration, custom software development, cybersecurity, digital marketing, and software training.",
};

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  globe: Globe,
  smartphone: Smartphone,
  briefcase: Briefcase,
  cloud: Cloud,
  trending: TrendingUp,
  graduation: GraduationCap,
  code: Code,
  shield: Shield,
  database: Database,
  settings: Settings,
};

const infraItems = [
  "Server Monitoring & Management",
  "Network Setup & Optimisation",
  "Backup & Disaster Recovery",
  "System Performance Tuning",
];

const devItems = [
  "Web Application Development",
  "Workflow Automation Systems",
  "UI/UX Design & Prototyping",
  "REST & GraphQL API Development",
];

const pricingPlans = [
  {
    name: "Starter",
    tagline: "For startups & small businesses",
    price: "₹15,000",
    period: "onwards",
    highlight: false,
    features: [
      "Business website (up to 5 pages)",
      "Basic IT support (email)",
      "Monthly performance report",
      "SSL & security setup",
      "1 month free maintenance",
    ],
  },
  {
    name: "Professional",
    tagline: "For growing businesses",
    price: "₹75,000",
    period: "onwards",
    highlight: true,
    features: [
      "Custom web / mobile application",
      "Cloud deployment & setup",
      "Security audit & hardening",
      "Priority support (phone + email)",
      "3 months free maintenance",
      "Performance analytics dashboard",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For large organizations",
    price: "Custom",
    period: "quote",
    highlight: false,
    features: [
      "Full IT infrastructure management",
      "Dedicated development team",
      "24/7 priority support",
      "Multi-cloud architecture",
      "Compliance & security consulting",
      "Long-term SLA agreement",
    ],
  },
];

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="End-to-end IT services, custom software development, cloud solutions, and academic automation platforms."
      />

      {/* All Service Cards — DB driven */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-14" suppressHydrationWarning data-arx="fade-up">
            <p className="text-gold-400 font-semibold font-poppins text-sm uppercase tracking-wider mb-3">
              What We Offer
            </p>
            <h2 className="section-title mb-4">All Service Categories</h2>
            <p className="section-subtitle">
              Our expertise covers complete IT support and digital transformation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = ICON_MAP[s.icon] ?? Briefcase;
              return (
                <div
                  key={s.id}
                  suppressHydrationWarning data-arx="fade-up"
                  data-arx-delay={i * 50}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-transparent hover:border-gold-400/30 transition-all duration-300"
                >
                  <div className="relative h-48 bg-navy-900 overflow-hidden">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                    <div className="absolute bottom-4 left-5 w-12 h-12 bg-gold-400 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon size={22} className="text-navy-900" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins font-bold text-lg text-navy-900 dark:text-white mb-2">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-14" suppressHydrationWarning data-arx="fade-up">
            <p className="text-gold-400 font-semibold font-poppins text-sm uppercase tracking-wider mb-3">
              In Detail
            </p>
            <h2 className="section-title mb-4">What We Deliver</h2>
            <p className="section-subtitle">
              Professional solutions designed for business growth and digital efficiency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div suppressHydrationWarning data-arx="fade-right" className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center">
                  <Server size={20} className="text-gold-400" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-navy-900 dark:text-white">
                  IT Infrastructure & Support
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                We manage IT infrastructure, servers, network monitoring, backups, troubleshooting,
                and performance optimisation for businesses of all sizes.
              </p>
              <ul className="space-y-3">
                {infraItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <CheckCircle2 size={17} className="text-gold-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div suppressHydrationWarning data-arx="fade-left" data-arx-delay="100" className="bg-navy-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center">
                  <Laptop2 size={20} className="text-gold-400" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-white">
                  Development & Automation
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Custom digital solutions that automate workflows, improve productivity, and enhance
                customer experience through modern technology.
              </p>
              <ul className="space-y-3">
                {devItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle2 size={17} className="text-gold-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-14" suppressHydrationWarning data-arx="fade-up">
            <p className="text-gold-400 font-semibold font-poppins text-sm uppercase tracking-wider mb-3">
              Packages
            </p>
            <h2 className="section-title mb-4">Service Pricing</h2>
            <p className="section-subtitle">
              Flexible packages for every stage of business growth. All plans include a free initial consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map(({ name, tagline, price, period, highlight, features }, i) => (
              <div
                key={name}
                suppressHydrationWarning data-arx="fade-up"
                data-arx-delay={i * 100}
                className={`rounded-2xl p-8 ${
                  highlight
                    ? "bg-navy-900 text-white shadow-2xl ring-2 ring-gold-400 scale-105"
                    : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
                }`}
              >
                {highlight && (
                  <div className="text-xs font-bold font-poppins text-navy-900 bg-gold-400 px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-poppins font-bold text-2xl mb-1 ${highlight ? "text-white" : "text-navy-900 dark:text-white"}`}>
                  {name}
                </h3>
                <p className={`text-sm mb-6 ${highlight ? "text-gray-300" : "text-gray-500 dark:text-gray-400"}`}>
                  {tagline}
                </p>
                <div className="mb-6">
                  <span className={`font-poppins font-bold text-3xl ${highlight ? "text-gold-400" : "text-navy-900 dark:text-white"}`}>
                    {price}
                  </span>
                  <span className={`text-sm ml-1 ${highlight ? "text-gray-300" : "text-gray-500"}`}>
                    /{period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${highlight ? "text-gray-200" : "text-gray-600 dark:text-gray-300"}`}>
                      <Check size={15} className="text-gold-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded font-bold font-poppins text-sm transition-colors duration-200 ${
                    highlight
                      ? "bg-gold-400 hover:bg-gold-500 text-navy-900"
                      : "border-2 border-navy-900 dark:border-gold-400 text-navy-900 dark:text-gold-400 hover:bg-navy-900 hover:text-white dark:hover:bg-gold-400 dark:hover:text-navy-900"
                  }`}
                >
                  Get Quote <ArrowRight size={14} className="inline ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
