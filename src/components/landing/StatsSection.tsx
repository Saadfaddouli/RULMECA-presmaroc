import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = "", prefix = "", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

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
    <span ref={ref} className="stat-number">
      {prefix}{count}{suffix}
    </span>
  );
};

const stats = [
  { value: 400, prefix: "+", suffix: "", label: "sportifs/jour" },
  { value: 2000, prefix: "+", suffix: "", label: "Séances Padel / mois" },
  { value: 90, prefix: "+", suffix: "", label: "événements /an" },
  { value: 70, prefix: "+", suffix: "%", label: "d'occupation des terrains" },
  { value: 200, prefix: "+", suffix: "", label: "jeunes talents inscrits par an" },
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute left-0 top-0 w-48 h-48 dots-pattern opacity-20" />
      <div className="absolute right-0 bottom-0 w-48 h-48 dots-pattern opacity-20" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-block">
            Traffic et chiffres clés
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground">
            UN LIEU <span className="text-primary">INCONTOURNABLE</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-2xl shadow-sm border border-border"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <Counter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <p className="font-body text-muted-foreground mt-2 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-ocean-gradient rounded-3xl p-8 md:p-12 text-primary-foreground text-center"
        >
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
            8 Terrains de Padel
          </h3>
          <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto">
            À l'occasion de ses 9 ans, Atlantique Club inaugure la construction
            de 3 nouveaux terrains de padel, portant ainsi son parc à 8 terrains
            au total. Un investissement stratégique pour offrir une expérience
            de jeu unique à ses membres.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
