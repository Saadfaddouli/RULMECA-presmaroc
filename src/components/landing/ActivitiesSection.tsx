import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import padelCourt from "@/assets/padel-court.jpg";
import footballPitch from "@/assets/football-pitch.jpg";
import restaurant from "@/assets/restaurant.jpg";
import ecoleFoot from "@/assets/ecole_foot.jpg";
import padbol from "@/assets/padbol.png";
import activitesSportives from "@/assets/activites_sportives.png";
import activitesProfessionnelles from "@/assets/activites_professionnelles.png";

const activities = [
  {
    image: footballPitch,
    title: "LOCATION FOOT",
    description:
      "Des terrains modernes disponibles à l'heure pour répondre à une forte demande. Une opportunité pour engager directement les utilisateurs.",
  },
  {
    image: padbol,
    title: "LOCATION PADBOL",
    description:
      "Sessions personnalisées pour développer les compétences en padel. Un levier pour promouvoir des marques liées à la performance.",
  },
  {
    image: ecoleFoot,
    title: "ÉCOLE DE FOOT",
    description:
      "Une formation de qualité pour les jeunes talents. Une occasion d'associer votre image à l'avenir du sport local.",
  },
  {
    image: activitesProfessionnelles,
    title: "EVENTS SOCIÉTÉS",
    description:
      "Des abonnements adaptés aux entreprises pour encourager le bien-être et la cohésion d'équipe, tout en renforçant votre visibilité.",
  },
  {
    image: activitesSportives,
    title: "DIVERS ÉVÉNEMENTS",
    description:
      "Organisez des tournois, anniversaires ou journées d'entreprise dans un cadre sportif et dynamique. Une vitrine idéale pour les marques partenaires.",
  },
];

const ActivitiesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute left-0 top-8 w-24 h-24 dots-pattern opacity-30" />
      <div className="absolute right-0 top-8 w-24 h-24 dots-pattern opacity-30" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="section-badge mb-6 inline-block">
            Les activités clés du club
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-muted-foreground max-w-4xl mx-auto mb-12 text-lg border-l-4 border-primary pl-6 text-left md:text-center md:border-l-0 md:pl-0"
        >
          Un éventail d'activités pensé pour fidéliser une clientèle variée,
          allant de la location de terrains et d'événements d'entreprise à des
          sessions de padel et une école de football adaptée à tous les niveaux.
        </motion.p>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                {/* Title Banner */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-primary py-3 px-4">
                  <h3 className="font-display font-bold text-sm text-primary-foreground text-center">
                    {activity.title}
                  </h3>
                </div>
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
