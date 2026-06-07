export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-navy-900 pt-36 pb-20 overflow-hidden flex items-center justify-center text-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        suppressHydrationWarning
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy-900/75" />
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
