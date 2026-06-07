"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let timerId: ReturnType<typeof setTimeout>;

    const rafId = requestAnimationFrame(() => {
      timerId = setTimeout(() => {
        const all = Array.from(document.querySelectorAll<HTMLElement>("[data-arx]"));

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                const delay = parseInt(el.getAttribute("data-arx-delay") || "0", 10);
                setTimeout(() => el.classList.add("arx-in"), delay);
                observer!.unobserve(el);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
        );

        all.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("arx-in");
          } else {
            observer!.observe(el);
          }
        });

        // js-ready added after in-viewport elements already have arx-in → no flash
        document.body.classList.add("js-ready");
      }, 50);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
