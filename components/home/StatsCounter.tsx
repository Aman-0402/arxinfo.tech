"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { Users, FolderOpen, Calendar, Headphones } from "lucide-react";

const stats = [
  { icon: Users, target: 50, suffix: "+", label: "Happy Clients", delay: 0 },
  { icon: FolderOpen, target: 100, suffix: "+", label: "Projects Delivered", delay: 0.2 },
  { icon: Calendar, target: 5, suffix: "+", label: "Years Experience", delay: 0.4 },
  { icon: Headphones, target: 24, suffix: "/7", label: "Support Available", delay: 0.6 },
];

function Counter({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      delay,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) ref.current.textContent = Math.round(value) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, target, suffix, delay]);

  return (
    <span ref={ref} className="font-poppins font-bold text-4xl md:text-5xl text-white">
      0{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, target, suffix, label, delay }) => (
            <div key={label} className="text-center" data-reveal="fade-up">
              <div className="w-14 h-14 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon size={26} className="text-gold-400" />
              </div>
              <Counter target={target} suffix={suffix} delay={delay} />
              <p className="text-gray-300 font-poppins mt-2 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
