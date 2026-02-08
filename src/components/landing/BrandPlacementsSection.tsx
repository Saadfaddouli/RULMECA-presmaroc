import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import entreeclub from "@/assets/entreeclub.png";
import photocall from "@/assets/photocall.png";
import pergola from "@/assets/pergola.png";
import coffreTerrain from "@/assets/coffre_terrain.png";
import terrainBache from "@/assets/terrainbache.png";
import zoneEchauffement from "@/assets/zoneechauffement.png";
import ecoleFoot from "@/assets/ecolefoot.png";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface PlacementInfo {
  type: string;
  count?: string;
  option?: string;
}

interface PlacementCategory {
  id: string;
  image: string;
  pins: {
    id: string;
    x: number;
    y: number;
    placements: PlacementInfo[];
  }[];
}

const categories: PlacementCategory[] = [
  {
    id: "entree",
    image: entreeclub,
    pins: [
      {
        id: "entree-1",
        x: 50,
        y: 50,
        placements: [
          { type: "1 panneau publicitaire SKODA = visibilité accrue, à l'entrée du club" },
        ],
      },
    ],
  },
  {
    id: "photocall",
    image: photocall,
    pins: [
      {
        id: "photocall-1",
        x: 50,
        y: 50,
        placements: [
          { type: "Photocall, dimension : 3×2 — double visibilité menant vers Restaurant et Club" },
        ],
      },
    ],
  },
  {
    id: "pergola",
    image: pergola,
    pins: [
      {
        id: "pergola-1",
        x: 50,
        y: 50,
        placements: [
          { type: "Habillage de la Pergola — Zone animée durant les anniversaires et les événements corporate / Tournois" },
        ],
      },
    ],
  },
  {
    id: "coffre",
    image: coffreTerrain,
    pins: [
      {
        id: "coffre-1",
        x: 50,
        y: 50,
        placements: [
          { type: "Habillage des Box autour des terrains, avec habillage sur poteau (4 terrains)" },
        ],
      },
    ],
  },
  {
    id: "terrainbache",
    image: terrainBache,
    pins: [
      {
        id: "terrainbache-1",
        x: 50,
        y: 50,
        placements: [
          { type: "Jusqu'à 8 bâches par terrain = 32 expositions" },
        ],
      },
    ],
  },
  {
    id: "zoneechauffement",
    image: zoneEchauffement,
    pins: [
      {
        id: "zoneechauffement-1",
        x: 50,
        y: 50,
        placements: [
          { type: "Zone échauffement (Projet en cours) — 3 affichages pour allée entre terrains" },
        ],
      },
    ],
  },
  {
    id: "ecolefoot",
    image: ecoleFoot,
    pins: [
      {
        id: "ecolefoot-1",
        x: 50,
        y: 50,
        placements: [
          { type: "Mention sur tenues officielles des écoliers saison 2026-2027" },
        ],
      },
    ],
  },
];

const BrandPlacementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile avec vérification initiale
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Nettoyer GSAP si on passe en mobile
      if (mobile) {
        const st = ScrollTrigger.getById("horizontal-scroll");
        if (st) st.kill();
      }
    };
    
    // Vérification immédiate
    checkMobile();
    
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      // Nettoyer GSAP au démontage
      const st = ScrollTrigger.getById("horizontal-scroll");
      if (st) st.kill();
    };
  }, []);

  // GSAP ScrollTrigger pour desktop ET mobile - Scroll vertical contrôle horizontal
  useEffect(() => {
    // Attendre que les éléments soient disponibles
    const section = isMobile ? mobileScrollRef.current : scrollSectionRef.current;
    const track = isMobile ? mobileScrollRef.current?.querySelector('.mobile-track') as HTMLElement : trackRef.current;
    
    if (!section || !track) return;

    // Fonction pour calculer et initialiser
    const initScrollTrigger = () => {
      // Nettoyer l'ancien ScrollTrigger s'il existe
      const existingST = ScrollTrigger.getById(`horizontal-scroll-${isMobile ? 'mobile' : 'desktop'}`);
      if (existingST) {
        existingST.kill();
      }

      // Réinitialiser la position du track
      gsap.set(track, { x: 0 });

      // Calculer la largeur totale - chaque slide fait 100vw
      const viewportWidth = window.innerWidth;
      const totalWidth = categories.length * viewportWidth;
      const distanceToScroll = totalWidth - viewportWidth;

      // Vérifier que les éléments sont bien rendus
      if (distanceToScroll <= 0) {
        console.warn("Distance de scroll invalide, réessai...");
        setTimeout(initScrollTrigger, 200);
        return null;
      }

      // Créer l'animation GSAP
      const horizontalScroll = gsap.to(track, {
        x: -distanceToScroll,
        ease: "none",
        scrollTrigger: {
          id: `horizontal-scroll-${isMobile ? 'mobile' : 'desktop'}`,
          trigger: section,
          start: "top top",
          end: () => `+=${distanceToScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              Math.max(0, Math.round(progress * (categories.length - 1))),
              categories.length - 1
            );
            setActiveIndex(newIndex);
          },
        },
      });

      // Rafraîchir ScrollTrigger après un court délai
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return horizontalScroll;
    };

    // Initialiser après un court délai pour s'assurer que le DOM est prêt
    let horizontalScroll: gsap.core.Tween | null = null;
    const timeoutId = setTimeout(() => {
      horizontalScroll = initScrollTrigger();
    }, 150);

    // Rafraîchir sur resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      if (horizontalScroll) {
        horizontalScroll.kill();
      }
      const st = ScrollTrigger.getById(`horizontal-scroll-${isMobile ? 'mobile' : 'desktop'}`);
      if (st) st.kill();
    };
  }, [isMobile]);

  // Téléchargement direct de la photo visible (mobile + desktop)
  const [downloading, setDownloading] = useState(false);
  const handleDownloadCurrentImage = useCallback(async () => {
    const category = categories[activeIndex];
    if (!category?.image) return;
    setDownloading(true);
    try {
      const url = category.image.startsWith("http") ? category.image : new URL(category.image, window.location.origin).href;
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const ext = (category.image.split(".").pop()?.split("?")[0]) || "png";
      const filename = `placement-${category.id}.${ext}`;
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: ouvrir dans un nouvel onglet pour sauvegarde manuelle
      window.open(category.image, "_blank");
    } finally {
      setDownloading(false);
    }
  }, [activeIndex]);

  return (
    <section
      id="placements"
      ref={sectionRef}
      className="bg-background relative overflow-x-hidden overflow-y-visible"
    >
      {/* Header */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="section-badge mb-6 inline-block">
            Visibilité & Branding
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-foreground">
            EMPLACEMENTS <span className="text-primary">PUBLICITAIRES</span>
          </h2>
        </motion.div>
      </div>

      {/* Desktop: GSAP ScrollTrigger avec pinning */}
      <div
        ref={scrollSectionRef}
        className="relative hidden md:block"
        style={{ height: "100vh", minHeight: "100vh" }}
      >
        {/* Track horizontal */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${categories.length * 100}vw` }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4"
              style={{ width: "100vw" }}
            >
                <div className="relative max-w-6xl w-full h-full flex items-center">
                  {/* Image Container */}
                  <div className="relative w-full h-full max-h-[700px] rounded-2xl overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.id}
                      className="w-full h-full object-contain"
                    />

                    {/* Pins */}
                    {category.pins.map((pin, pinIndex) => (
                      <motion.div
                        key={pin.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: pinIndex * 0.2 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      >
                        {/* Small Pin */}
                        <div className="relative">
                          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                          
                          {/* Placement Card - Always Visible, animée au survol */}
                          {pin.placements.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                opacity: { delay: pinIndex * 0.2 + 0.3 },
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                              whileHover={{ scale: 1.05, x: 10 }}
                              className="absolute top-6 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-xl rounded-lg p-4 shadow-xl border border-border min-w-[200px] md:min-w-[280px] cursor-default font-body text-foreground"
                            >
                              <div className="space-y-2">
                                {pin.placements.map((placement, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-col gap-1"
                                  >
                                    <span className="font-body text-sm font-medium text-foreground leading-snug">
                                      {placement.type}
                                    </span>
                                    {placement.option && (
                                      <span className="font-body text-xs text-primary font-medium">
                                        {placement.option}
                                      </span>
                                    )}
                                    {placement.count && (
                                      <span className="font-display font-bold text-sm text-foreground">
                                        {placement.count}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Indicateurs + bouton télécharger (toujours visibles en bas pendant le scroll) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-3 pb-6">
          <div className="flex justify-center gap-2">
            {categories.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleDownloadCurrentImage}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            <Download className="h-4 w-4 shrink-0" />
            {downloading ? "Téléchargement…" : "Télécharger cette photo"}
          </button>
        </div>
      </div>

      {/* Mobile: GSAP ScrollTrigger avec pinning - Scroll vertical contrôle horizontal */}
      <div
        ref={mobileScrollRef}
        className="relative md:hidden"
        style={{ height: "100vh", minHeight: "100vh" }}
      >
        {/* Track horizontal */}
        <div
          className="mobile-track flex h-full"
          style={{ width: `${categories.length * 100}vw` }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4"
              style={{ width: "100vw" }}
            >
              <div className="relative max-w-6xl w-full h-full flex items-center">
                {/* Image Container - Taille réelle sur mobile */}
                <div className="relative w-full h-full max-h-[700px] rounded-2xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.id}
                    className="w-full h-full object-contain"
                    style={{ 
                      maxHeight: '75vh',
                      minHeight: '500px'
                    }}
                  />

                  {/* Pins */}
                  {category.pins.map((pin, pinIndex) => (
                    <motion.div
                      key={pin.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: pinIndex * 0.2 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                      {/* Small Pin */}
                      <div className="relative">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                        
                        {/* Placement Card - Always Visible, animée au survol */}
                        {pin.placements.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              opacity: { delay: pinIndex * 0.2 + 0.3 },
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                            whileHover={{ scale: 1.05, x: 10 }}
                            className="absolute top-6 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-xl rounded-lg p-4 shadow-xl border border-border min-w-[200px] md:min-w-[280px] cursor-default font-body text-foreground"
                          >
                            <div className="space-y-2">
                              {pin.placements.map((placement, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col gap-1"
                                >
                                  <span className="font-body text-sm font-medium text-foreground leading-snug">
                                    {placement.type}
                                  </span>
                                  {placement.option && (
                                    <span className="font-body text-xs text-primary font-medium">
                                      {placement.option}
                                    </span>
                                  )}
                                  {placement.count && (
                                    <span className="font-display font-bold text-sm text-foreground">
                                      {placement.count}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Indicateurs + bouton télécharger (toujours visibles en bas pendant le scroll) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-3 pb-6">
          <div className="flex justify-center gap-2">
            {categories.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleDownloadCurrentImage}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            <Download className="h-4 w-4 shrink-0" />
            {downloading ? "Téléchargement…" : "Télécharger cette photo"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandPlacementsSection;
