"use client";

const clients = [
  "RetailMax India",
  "HealthCare Plus",
  "FinServe Cooperative",
  "ManufacturePro Ltd",
  "Sunshine Group",
  "TechVenture Corp",
  "Digital Edge Ltd",
  "CloudFirst Inc",
  "SmartBiz Solutions",
  "InnoSoft Labs",
];

export default function ClientsMarquee() {
  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900 overflow-hidden border-y border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 mb-8 text-center" data-aos="fade-up">
        <p className="text-gray-400 text-sm font-poppins uppercase tracking-widest">
          Trusted by businesses across India
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center h-12 px-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <span className="font-poppins font-semibold text-sm text-gray-500 dark:text-gray-400">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
