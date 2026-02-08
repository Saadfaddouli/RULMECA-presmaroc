import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Car, Package, Factory, Building2, Flag, type LucideIcon } from "lucide-react";
import { abilisStorySteps } from "@/data/mock";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Car,
  Package,
  Factory,
  Building2,
  Flag,
};

const AbilisStorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const section = sectionRef.current;
    const rightCol = rightColRef.current;
    const track = trackRef.current;

    if (!section || !rightCol || !track) return;

    const initScrollTrigger = () => {
      const existingST = ScrollTrigger.getById("abilis-story-horizontal-scroll");
      if (existingST) existingST.kill();

      gsap.set(track, { x: 0 });

      const rightColWidth = rightCol.offsetWidth;
      const distanceToScroll = (abilisStorySteps.length - 1) * rightColWidth;

      if (distanceToScroll <= 0) {
        setTimeout(initScrollTrigger, 200);
        return;
      }

      const horizontalScroll = gsap.to(track, {
        x: -distanceToScroll,
        ease: "none",
        scrollTrigger: {
          id: "abilis-story-horizontal-scroll",
          trigger: section,
          start: "top top",
          end: () => `+=${distanceToScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              Math.max(0, Math.round(progress * (abilisStorySteps.length - 1))),
              abilisStorySteps.length - 1
            );
            setActiveIndex(newIndex);
          },
        },
      });

      setTimeout(() => ScrollTrigger.refresh(), 100);
      return horizontalScroll;
    };

    const scrollTrigger = initScrollTrigger();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollTrigger) scrollTrigger.kill();
      window.removeEventListener("resize", handleResize);
      const st = ScrollTrigger.getById("abilis-story-horizontal-scroll");
      if (st) st.kill();
    };
  }, []);

  return (
    <section
      id="histoire-abilis"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#F7F8FA]"
      aria-label={t("story.sectionLabel", "Histoire ABILIS")}
    >
      <div className="absolute inset-0 flex">
        {/* Colonne gauche : titre + intro (inspiration Travel guide) */}
        <div className="w-[36%] min-w-0 flex flex-col justify-center pl-10 lg:pl-16 pr-6 lg:pr-10">
          <span className="section-badge mb-3 inline-block text-xs font-medium uppercase tracking-wider text-[hsl(var(--rulmeca-muted))]">
            {t("story.badge", "Notre parcours")}
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[hsl(var(--rulmeca-text))] tracking-tight">
            {t("story.mainTitle", "Histoire")}
          </h2>
          <p className="mt-1 text-lg lg:text-xl font-medium text-[hsl(var(--rulmeca-text))] border-b-2 border-[#b30000]/30 pb-1 inline-block w-fit">
            {t("story.subtitle", "ABILIS")}
          </p>
          <p className="mt-6 text-sm lg:text-base text-[hsl(var(--rulmeca-muted))] leading-relaxed max-w-md">
            {t("story.intro", "De nos débuts automobile à la représentation RULMECA au Maroc.")}
          </p>
        </div>

        {/* Colonne droite : track horizontal (scroll vertical = avance horizontale) */}
        <div ref={rightColRef} className="flex-1 overflow-hidden pl-2">
          <div
            ref={trackRef}
            className="flex h-full"
            style={{ width: `${abilisStorySteps.length * 100}%` }}
          >
            {abilisStorySteps.map((step, index) => {
              const Icon = iconMap[step.icon] ?? Building2;
              return (
                <div
                  key={step.id}
                  className="flex-shrink-0 h-full flex items-center justify-center px-2 lg:px-4"
                  style={{ width: `${100 / abilisStorySteps.length}%` }}
                >
                  <div className="relative w-full h-[85%] max-h-[720px] rounded-[2rem] overflow-hidden bg-white shadow-lg border border-[hsl(var(--rulmeca-border))]">
                    <img
                      src={step.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex flex-col items-start gap-3">
                      {step.year && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                          {step.year}
                        </span>
                      )}
                      <h3 className="text-lg lg:text-xl font-semibold text-white drop-shadow-sm">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-white/90 leading-snug line-clamp-2">
                        {t(step.shortTextKey)}
                      </p>
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full text-white shrink-0 mt-1"
                        style={{ backgroundColor: step.circleColor }}
                        aria-hidden
                      >
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicateurs (dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {abilisStorySteps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-[#b30000]"
                : "w-1.5 bg-[hsl(var(--rulmeca-border))]"
            }`}
            aria-hidden
          />
        ))}
      </div>
    </section>
  );
};

export default AbilisStorySection;
