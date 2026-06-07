"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // setTimeout(fn, 0) = macrotask queue → guaranteed after React hydration completes.
    // Runs on every pathname change so navigated pages animate correctly.
    const timer = setTimeout(() => {
      const all = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

      // Pre-animate elements already in viewport (prevents flash from hidden → visible)
      all.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("reveal-animate");
        }
      });

      // Enable CSS hiding — in-viewport elements already have reveal-animate
      document.body.classList.add("js-ready");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
              setTimeout(() => el.classList.add("reveal-animate"), delay);
              observer!.unobserve(el);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
      );

      all.forEach((el) => {
        if (!el.classList.contains("reveal-animate")) observer!.observe(el);
      });
    }, 0);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
