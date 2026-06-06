import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/faq/FaqAccordion";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ARX Infotech's IT services, pricing, timelines, and support.",
};

const faqSections = [
  {
    category: "General",
    items: [
      {
        q: "What services does ARX Infotech offer?",
        a: "ARX Infotech provides end-to-end IT services including web & mobile development, cloud solutions, IT consulting, cybersecurity, digital marketing, and software training.",
      },
      {
        q: "Where is ARX Infotech located?",
        a: "Our office is at 1st Floor, 150, Panchita, Bongaon-Bagdh Rd, Kolkata, West Bengal 743235. We serve clients across India.",
      },
      {
        q: "How long has ARX Infotech been in business?",
        a: "ARX Infotech has been delivering IT solutions for 5+ years, completing 100+ projects for clients across various industries.",
      },
    ],
  },
  {
    category: "Services & Projects",
    items: [
      {
        q: "Do you work with startups or only large enterprises?",
        a: "We work with businesses of all sizes — from early-stage startups to established enterprises. Our solutions are tailored to your scale and budget.",
      },
      {
        q: "How long does a typical web or mobile project take?",
        a: "Timelines vary by complexity. A basic website takes 2–4 weeks; a custom web application 6–12 weeks; a mobile app 8–16 weeks. We provide a detailed timeline after the discovery call.",
      },
      {
        q: "Do you provide post-launch support and maintenance?",
        a: "Yes. All our projects include a 30-day free support period post-launch. We offer ongoing maintenance packages starting from ₹3,000/month.",
      },
      {
        q: "Can you integrate third-party APIs and payment gateways?",
        a: "Absolutely. We regularly integrate payment gateways (Razorpay, PayU), SMS providers, WhatsApp APIs, CRMs, ERPs, and custom third-party APIs.",
      },
    ],
  },
  {
    category: "Pricing & Engagement",
    items: [
      {
        q: "How do you price your services?",
        a: "We offer fixed-price projects for well-defined scopes and time-&-material billing for ongoing work. Get a free consultation and quote — no hidden costs.",
      },
      {
        q: "What is your minimum project budget?",
        a: "Our starter projects begin at ₹15,000. Enterprise solutions and ongoing retainers are priced based on scope.",
      },
      {
        q: "Do you offer EMI or milestone-based payments?",
        a: "Yes, we offer milestone-based payment schedules — typically 30% advance, 40% at mid-delivery, and 30% on final handover.",
      },
    ],
  },
  {
    category: "Support & Security",
    items: [
      {
        q: "Is my data and source code secure with ARX Infotech?",
        a: "Yes. We sign an NDA before any project begins. Your source code and data are never shared with third parties. Final deliverables include full ownership transfer.",
      },
      {
        q: "What is your support availability?",
        a: "Our support team is available 24/7 for critical issues. General support requests are handled within 4 business hours (Mon–Sat, 10 AM – 7 PM IST).",
      },
      {
        q: "Do you provide cloud hosting services?",
        a: "Yes, we offer managed cloud hosting on AWS, DigitalOcean, and shared hosting. Includes setup, SSL, backups, and monitoring.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ARX Infotech's services and how we work."
      />

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="section-subtitle">Got Questions?</p>
            <h2 className="section-title">We Have Answers</h2>
          </div>

          <div
            className="max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaqAccordion sections={faqSections} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
