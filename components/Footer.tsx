import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/verify", label: "Verify Certificate" },
];

const services = [
  "Web Development",
  "Mobile App Development",
  "IT Consulting",
  "Cloud Services",
  "Digital Marketing",
  "Software Training",
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="ARX Infotech"
                width={40}
                height={40}
                className="w-auto h-10"
              />
              <span className="font-poppins font-bold text-gold-400 text-lg">
                ARX Infotech
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Leading IT services company in Kolkata delivering innovative
              technology solutions for businesses of all sizes.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-8 h-8 bg-white/10 hover:bg-gold-400 hover:text-navy-900 rounded flex items-center justify-center transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-gold-400 mb-4 text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-semibold text-gold-400 mb-4 text-base">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-gold-400 text-sm transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-gold-400 mb-4 text-base">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-gray-300">
                <MapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
                <span>
                  1st Floor, 150, Panchita, Bongaon-Bagdh Rd, Kolkata 743235
                </span>
              </li>
              <li>
                <a
                  href="tel:+918317818107"
                  className="flex gap-3 text-sm text-gray-300 hover:text-gold-400 transition-colors duration-200"
                >
                  <Phone size={16} className="text-gold-400 shrink-0" />
                  +91 8317818107
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@arxinfo.tech"
                  className="flex gap-3 text-sm text-gray-300 hover:text-gold-400 transition-colors duration-200"
                >
                  <Mail size={16} className="text-gold-400 shrink-0" />
                  info@arxinfo.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ARX Infotech. All rights reserved.</p>
          <p>Crafted with care in Kolkata, India</p>
        </div>
      </div>
    </footer>
  );
}

