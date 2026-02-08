import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import footballPitch from "@/assets/football-pitch.jpg";
import restaurant from "@/assets/restaurant.jpg";

const ClubPresentation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const facilities = [
    {
      image: restaurant,
      title: "Restaurant & Terrasse",
      number: "2",
      label: "Buvette + Restaurant",
    },
    {
      image: footballPitch,
      title: "Terrains de Foot",
      number: "4",
      label: "Terrains Foot",
    },
    {
      image: "https://static.wixstatic.com/media/c4f0f9_d6f116fe250b410bbd7bc36ab422d95e~mv2.png",
      title: "Terrains de Padel",
      number: "8",
      label: "Terrains Padel",
    },
  ];

  return (
    <section id="club" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-block">
            Présentation du Club
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-6">
            LA RÉFÉRENCE SPORTIVE
            <br />
            <span className="text-primary">BORD DE MER</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-3xl mx-auto">
            Idéalement situé en bord de mer à Ain Diab, Atlantique Club est
            l'adresse incontournable pour les amateurs de padel et de football.
            Ce lieu unique combine sport, détente et convivialité dans un cadre
            exceptionnel.
          </p>
        </motion.div>

        {/* Decorative dots */}
        <div className="absolute right-0 top-0 w-32 h-32 dots-pattern opacity-30" />

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg card-hover"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-atlantique-dark via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end gap-3">
                  <span className="font-display font-black text-6xl md:text-7xl text-primary-foreground leading-none">
                    {facility.number}
                  </span>
                  <span className="font-display font-bold text-sm md:text-base text-primary-foreground/90 uppercase tracking-wider pb-2">
                    {facility.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Since 2015 Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          <div className="flex-shrink-0">
            <div className="text-primary font-body text-lg">Depuis</div>
            <div className="font-display font-black text-7xl md:text-8xl text-primary">
              2015
            </div>
          </div>
          <div className="h-px md:h-24 w-full md:w-px bg-border" />
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Le club accueille des événements sportifs variés et propose des
            infrastructures modernes adaptées à tous les niveaux. Avec une
            ambiance chaleureuse et une programmation riche, Atlantique Club est
            le rendez-vous des familles, des sportifs et des amoureux des
            loisirs actifs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubPresentation;
