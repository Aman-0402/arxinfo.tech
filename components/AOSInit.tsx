"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute("data-aos-delay") || "0", 10);
            setTimeout(() => el.classList.add("aos-animate"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
