import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { proofImages } from "@/data/mock";

gsap.registerPlugin(ScrollTrigger);

const ProofsCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const initScrollTrigger = () => {
      const existingST = ScrollTrigger.getById("proofs-horizontal-scroll");
      if (existingST) existingST.kill();

      gsap.set(track, { x: 0 });

      const viewportWidth = window.innerWidth;
      const totalWidth = proofImages.length * viewportWidth;
      const distanceToScroll = totalWidth - viewportWidth;

      if (distanceToScroll <= 0) {
        setTimeout(initScrollTrigger, 200);
        return;
      }

      const horizontalScroll = gsap.to(track, {
        x: -distanceToScroll,
        ease: "none",
        scrollTrigger: {
          id: "proofs-horizontal-scroll",
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
              Math.max(0, Math.round(progress * (proofImages.length - 1))),
              proofImages.length - 1
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
      const st = ScrollTrigger.getById("proofs-horizontal-scroll");
      if (st) st.kill();
    };
  }, []);

  const proofTitles = [
    "Assemblage Local",
    "Transport & Logistique",
    "Solutions Sécurité",
    "Infrastructure",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white"
    >
      <div className="absolute top-16 left-0 right-0 z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="section-badge mb-4 inline-block">Preuves d'Exécution</span>
          <h2 className="text-rulmeca-text mb-4">Moyens & Capacités</h2>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${proofImages.length * 100}vw` }}
      >
        {proofImages.map((image, index) => (
          <div
            key={index}
            className="w-screen h-full flex items-center justify-center px-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-5xl"
            >
              <div className="bg-white border border-rulmeca-border p-8">
                <div className="relative h-[60vh] border border-rulmeca-border overflow-hidden mb-6">
                  <img
                    src={image}
                    alt={proofTitles[index] || `Preuve ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-rulmeca-text text-center">
                  {proofTitles[index] || `Preuve ${index + 1}`}
                </h3>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Indicateurs minimalistes */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {proofImages.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-rulmeca-red"
                : "w-1 bg-rulmeca-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProofsCarousel;
