import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import brandingCourts from "@/assets/branding-courts.png";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: "vitre",
    x: 25,
    y: 55,
    title: "Stickers sur Vitres",
    description:
      "Plus de 45 places d'exposition de marque répartis sur les 8 terrains de padel. Visibilité maximale pendant les matchs.",
  },
  {
    id: "sol",
    x: 50,
    y: 75,
    title: "Bandes sur Sols",
    description:
      "Bandes de sponsoring sur les terrains de padel et football. Visible sur toutes les photos et vidéos des matchs.",
  },
  {
    id: "filet",
    x: 75,
    y: 45,
    title: "Banderoles & Filets",
    description:
      "Espace publicitaire premium sur les filets et structures des terrains. Impact visuel garanti.",
  },
  {
    id: "entree",
    x: 15,
    y: 30,
    title: "Signalétique Entrée",
    description:
      "Présence de votre marque dès l'accueil des visiteurs. +400 passages quotidiens.",
  },
];

const SponsorHotspots = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <section id="placements" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-block">
            Visibilité et Branding
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
            EMPLACEMENTS <span className="text-primary">PUBLICITAIRES</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Cliquez sur les points pour découvrir les différents emplacements
            disponibles pour votre marque.
          </p>
        </motion.div>

        {/* Interactive Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={brandingCourts}
            alt="Terrains de padel avec emplacements sponsors"
            className="w-full h-auto"
          />

          {/* Hotspots */}
          {hotspots.map((hotspot, index) => (
            <motion.button
              key={hotspot.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              onClick={() => setActiveHotspot(hotspot)}
              className="absolute w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <span className="hotspot w-full h-full flex items-center justify-center">
                <span className="relative z-10 w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full border-2 border-primary-foreground shadow-lg group-hover:scale-125 transition-transform" />
              </span>
            </motion.button>
          ))}

          {/* Info Modal */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-card/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-border"
              >
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {activeHotspot.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {activeHotspot.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Placement Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          {[
            "Vitres des terrains",
            "Bandes sur sols",
            "Chasubles & Maillots",
            "Photocall événements",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center p-4 bg-secondary rounded-xl"
            >
              <span className="font-display font-semibold text-sm text-secondary-foreground">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorHotspots;
