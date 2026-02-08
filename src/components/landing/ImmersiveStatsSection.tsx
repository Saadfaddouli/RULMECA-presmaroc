import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};
import aerialView from "@/assets/aerial-view.png";
import padelCourt from "@/assets/padel-court.jpg";
import restaurant from "@/assets/restaurant.jpg";
import footballPitch from "@/assets/football-pitch.jpg";
import hover2 from "@/assets/hover2.png";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isInView: boolean;
}

const Counter = ({ end, suffix = "", prefix = "", duration = 2.5, isInView }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span className="stat-number-large">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

interface StatBlockProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  image: string;
  index: number;
  direction: "left" | "right";
}

const StatBlock = ({ value, prefix, suffix, label, description, image, index, direction }: StatBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  /* Sur mobile : amount plus bas (0.15) pour déclencher l'animation dès le scroll dans le bloc */
  const isInView = useInView(ref, {
    once: true,
    amount: isMobile ? 0.15 : 0.5,
  });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === "left" ? [-100, 0, 100] : [100, 0, -100]
  );

  /* Déplacement du chiffre vers la droite (centre) au scroll */
  const counterX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    direction === "left" ? [0, 24, 24, 0] : [0, -24, -24, 0]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  /* Agrandir le fond sans zone blanche */
  const bgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.05, 1.1, 1.1, 1.05]);

  return (
    <div
      ref={ref}
      className="h-[140vh] relative flex items-center justify-center sticky top-0"
    >
      {/* Background Image with Parallax - agrandi sans zone blanche */}
      <motion.div
        style={{
          x: direction === "left" ? x : undefined,
          scale: bgScale,
        }}
        className="absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-4"
      >
        <div className={`flex flex-col ${direction === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}>
          {/* Stat Content */}
          <motion.div
            style={{ x: direction === "right" ? x : undefined }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="section-badge text-xs md:text-sm">
                Chiffre Clé #{index + 1}
              </span>
            </motion.div>

            <motion.div
              style={{ x: counterX }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <Counter
                end={value}
                prefix={prefix}
                suffix={suffix}
                isInView={isInView}
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-display font-bold text-2xl md:text-4xl text-foreground mb-4"
            >
              {label}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-body text-muted-foreground text-lg md:text-xl max-w-lg"
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={isInView ? { opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 hidden md:flex justify-center"
          >
            <div className="relative group">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700 scale-105"
                />
                {/* Overlay ballon au hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden
                >
                  <img
                    src="https://static.wixstatic.com/media/c4f0f9_d6c4f0ef3b524929942aa03fee31b0ce~mv2.png"
                    alt=""
                    className="w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-ocean-gradient rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/c4f0f9_d6c4f0ef3b524929942aa03fee31b0ce~mv2.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <span className="relative font-display font-black text-3xl text-primary-foreground drop-shadow-md">
                  {prefix}{value > 100 ? Math.floor(value / 100) + "K+" : value + suffix}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const stats = [
  {
    value: 450,
    prefix: "+",
    suffix: "",
    label: "Sportifs par jour",
    description: "Une communauté active et engagée qui fréquente le club quotidiennement pour le padel, le football et les activités fitness.",
    image: aerialView,
    direction: "left" as const,
  },
  {
    value: 20,
    prefix: "+",
    suffix: "",
    label: "Tournois Corporate RAMADAN",
    description: "Période estivale pour les adeptes du challenge sportif en équipes, le club reste animé jusqu'a une heure du matin",
    image: padelCourt,
    direction: "right" as const,
  },
  {
    value: 500,
    prefix: "+",
    suffix: "",
    label: "Visiteurs du restaurant",
    description: "Restaurant animé toute la journée avec vue imprenable sur la mosquée Hassan II. Un trafic restaurantation qui double et diversifie les typologies de clientèle, entre amateurs du sport et visiteurs décontractés.",
    image: restaurant,
    direction: "left" as const,
  },
  {
    value: 72,
    prefix: "",
    suffix: "%",
    label: "Taux d'occupation",
    description: "Nos terrains affichent un taux d'occupation exceptionnel, garantissant une visibilité maximale pour vos placements.",
    image: footballPitch,
    direction: "right" as const,
  },
];

const ImmersiveStatsSection = () => {
  const terrainsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: terrainsRef,
    offset: ["start end", "end start"],
  });
  /* Parallax sur le bloc 8 Terrains (mobile + desktop) */
  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "-15%", "5%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.4, 0.4, 0.3]);

  return (
    <section className="relative">
      {/* Header */}
      <div className="h-screen flex items-center justify-center bg-secondary/30 sticky top-0">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-badge mb-8 inline-block"
          >
            Traffic & Chiffres Clés
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-foreground"
          >
            UN LIEU{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-ocean-gradient">
              INCONTOURNABLE
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-muted-foreground text-xl mt-6 max-w-2xl mx-auto"
          >
            Découvrez l'impact et la portée d'Atlantique Club à travers nos chiffres clés
          </motion.p>
          
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm font-medium">Scrollez pour découvrir</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-2"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stat Blocks */}
      {stats.map((stat, index) => (
        <StatBlock key={stat.label} {...stat} index={index} />
      ))}

      {/* 8 Terrains Feature - Parallax scroll (mobile + desktop) */}
      <div
        ref={terrainsRef}
        className="h-screen flex items-center justify-center sticky top-0 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hover2})`,
            y: bgY,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-background/40"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </section>
  );
};

export default ImmersiveStatsSection;
