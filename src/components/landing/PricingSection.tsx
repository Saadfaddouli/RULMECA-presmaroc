import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star } from "lucide-react";

const packages = [
  {
    name: "Pack 1",
    price: "60 000",
    currency: "DH",
    period: "/HT",
    description: "Visibilité essentielle au cœur du club",
    features: [
      "1 mois de stationnement et exposition de véhicule ŠKODA",
      "Habillage photocall passage Atlantique (double trafic)",
      "Habillage panneaux d'entrée du club (visibilité maximale)",
    ],
    featured: false,
    badge: "Durée : 1 mois",
    id: "pack1",
  },
  {
    name: "Pack 2",
    price: "250 000",
    currency: "DH",
    period: "/HT",
    description: "Pack 1 + Branding complet des infrastructures sportives",
    features: [
      "Tous les avantages du Pack 1",
      "Habillage branding 4 terrains 7x7",
      "32 affiches (pose bâches ou panneaux sandwich)",
      "Habillage 4 boxes coffres vestiaires au pont d'entrée des terrains de foot",
      "Habillage bordure Pergola",
    ],
    featured: true,
    badge: "Durée : 1 an",
    id: "pack2",
  },
  {
    name: "Pack 3",
    price: "350 000",
    currency: "DH",
    period: "/HT",
    description: "Partenariat premium avec sponsoring officiel",
    features: [
      "Tous les avantages des Packs 1 et 2",
      "Sponsor officiel de l'école de foot (4 ans à 14 ans)",
      "Maillots brandés avec logo ŠKODA",
      "Chasubles de match utilisées quotidiennement par toutes les équipes locataires des terrains",
    ],
    featured: false,
    premium: true,
    badge: "Premium = 1 An",
    id: "pack3",
  },
];

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSponsorClick = (packId: string) => {
    // Store selected pack in sessionStorage
    sessionStorage.setItem("selectedPack", packId);
    // Scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-block">
            Packs Sponsoring
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4">
            CHOISISSEZ VOTRE <span className="text-primary">PACK</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Des solutions de sponsoring sur mesure pour maximiser votre visibilité
            et votre impact auprès de notre communauté sportive.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 card-hover overflow-visible ${
                pkg.premium
                  ? "premium-nautical border-2 border-[#00A651]/40 shadow-2xl scale-105 z-10"
                  : pkg.featured
                  ? "pricing-featured text-primary-foreground scale-105 z-10"
                  : "bg-card border border-border z-20"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-sm font-bold shadow-lg ${
                      pkg.premium
                        ? "bg-gradient-to-r from-[#00A651] to-[#0B3B2E] text-white"
                        : pkg.featured
                        ? "bg-primary-foreground text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`font-display font-bold text-xl mb-2 ${
                    pkg.premium
                      ? "text-white"
                      : pkg.featured
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    pkg.premium
                      ? "text-white/90"
                      : pkg.featured
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {pkg.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`font-display font-black text-4xl md:text-5xl ${
                      pkg.premium
                        ? "text-white"
                        : pkg.featured
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className={`text-lg ${
                      pkg.premium
                        ? "text-white/90"
                        : pkg.featured
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {pkg.currency}
                  </span>
                </div>
                <span
                  className={`text-sm ${
                    pkg.premium
                      ? "text-white/80"
                      : pkg.featured
                      ? "text-primary-foreground/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {pkg.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8 overflow-visible">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 overflow-visible">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 flex-none ${
                        pkg.premium
                          ? "text-white"
                          : pkg.featured
                          ? "text-primary-foreground"
                          : "text-primary"
                      }`}
                    />
                    <span
                      className={`text-sm flex-1 ${
                        pkg.premium
                          ? "text-white"
                          : pkg.featured
                          ? "text-primary-foreground/90"
                          : "text-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSponsorClick(pkg.id)}
                className={`block w-full text-center py-4 rounded-xl font-display font-bold transition-all duration-300 hover:scale-105 ${!pkg.featured ? "relative z-20" : ""} ${
                  pkg.premium
                    ? "bg-gradient-to-r from-[#00A651] to-[#0B3B2E] text-white hover:shadow-xl hover:shadow-[#00A651]/30"
                    : pkg.featured
                    ? "bg-primary-foreground text-primary hover:shadow-lg"
                    : "bg-ocean-gradient text-primary-foreground hover:shadow-lg"
                }`}
              >
                DEVENIR SPONSOR
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
