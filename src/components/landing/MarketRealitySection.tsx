import { useCallback, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { marketRealityTimelineSteps } from "@/data/mock";
import type { MarketRealityTimelineStep } from "@/data/mock";
import "./market-reality-section.css";

const logoFontFamily = "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif";

type BioYearStepProps = {
  step: MarketRealityTimelineStep;
  index: number;
  stepRef: (el: HTMLDivElement | null) => void;
};

const CardContent = ({ step }: { step: MarketRealityTimelineStep }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="market-reality-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="market-reality-card_media">
        <img src={step.imageLeft} alt="" className="market-reality-card_img" />
        <div className="market-reality-card_overlay" aria-hidden />
        <div className="market-reality-card_texture" aria-hidden />
        <div className="market-reality-card_tags">
          {(step.alertLabels ?? ["Alerte"]).map((label, i) => (
            <motion.span
              key={i}
              className="market-reality-tag"
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
                delay: 0.06 * i,
              }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="market-reality-card_text">
        <div className="market-reality-card_block market-reality-card_block--context">
          <p>{t(step.leftTextKey)}</p>
        </div>
        <div className="market-reality-card_block market-reality-card_block--message">
          <p>{t(step.rightTextKey)}</p>
        </div>
      </div>
    </motion.div>
  );
};

const BioYearStep = ({ step, index, stepRef }: BioYearStepProps) => {
  const { t } = useTranslation();
  // Alternance : 1re carte GAUCHE, 2e DROITE, 3e GAUCHE, 4e DROITE.
  const carteAGauche = index % 2 === 0;
  return (
    <div ref={stepRef} className="bioYear" style={{ direction: "ltr" }}>
      {/* 1re cellule table = à GAUCHE à l'écran : on y met la carte pour index 0, 2 */}
      <div className="bioYear_slot bioYear_slot--left" data-col="gauche">
        <div className="bioYear_slot-inner bioYear_slot-inner--left">
          {carteAGauche ? <CardContent step={step} /> : null}
        </div>
      </div>
      {/* 2e cellule = centre (tag) */}
      <div className="bioYear_rail">
        <div className="bioLine_segment" aria-hidden />
        <motion.span
          className="bioYear_tag"
          style={{
            fontFamily: logoFontFamily,
            fontWeight: 800,
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
            lineHeight: 1.25,
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {t(step.themeTitleKey)}
        </motion.span>
      </div>
      {/* 3e cellule table = à DROITE à l'écran : on y met la carte pour index 1, 3 */}
      <div className="bioYear_slot bioYear_slot--right" data-col="droite">
        <div className="bioYear_slot-inner bioYear_slot-inner--right">
          {!carteAGauche ? <CardContent step={step} /> : null}
        </div>
      </div>
    </div>
  );
};

const MarketRealitySection = () => {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const steps = stepRefs.current.filter(Boolean);
    if (steps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("activeSection");
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 }
    );

    steps.forEach((el) => el && observer.observe(el));
    return () => {
      steps.forEach((el) => el && observer.unobserve(el));
    };
  }, [marketRealityTimelineSteps.length]);

  return (
    <section
      id="realite-marche-positionnement"
      className="market-reality-section bg-white"
      aria-label={t("marketReality.sectionLabel", "Réalité du marché marocain")}
    >
      {/* Intro */}
      <div className="market-reality-intro px-4 py-16 md:py-24">
        <div className="mx-auto max-w-[900px]">
          <span className="section-badge mb-3 inline-block text-xs font-medium uppercase tracking-wider text-[hsl(var(--rulmeca-muted))]">
            {t("marketReality.badge", "Marché & positionnement")}
          </span>
          <h2
            className="market-reality-title text-3xl font-bold tracking-tight text-[hsl(var(--rulmeca-text))] md:text-4xl lg:text-5xl"
            style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em", lineHeight: 1.25 }}
          >
            {t("marketReality.title", "Réalité du marché marocain")}
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--rulmeca-muted))] md:text-xl">
            {t("marketReality.intro", "Défis et troubles du marché que RULMECA contourne — le fournisseur s'y reconnaît et a besoin d'un partenaire de confiance.")}
          </p>
        </div>
      </div>

      {/* Timeline : rail gauche (trait + bulles) | cartes droite */}
      <div ref={timelineRef} className="timeline_body mx-auto w-full overflow-visible px-4 pb-32 md:px-8">
        <div className="bioLine relative mx-auto max-w-[1200px]">
          {marketRealityTimelineSteps.map((step, index) => (
            <BioYearStep
              key={step.id}
              step={step}
              index={index}
              stepRef={(el) => {
                stepRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Bloc final ABILIS Industrie — pleine hauteur, carreaux, keypad */}
      <div className="market-reality-ambition">
        <div className="market-reality-ambition_message">
          <p className="text-center text-lg font-semibold text-[hsl(var(--rulmeca-text))] md:text-xl">
            {t("marketReality.ambition", "ABILIS Industrie : votre partenaire structurant sur le marché marocain.")}
          </p>
          <p
            className="mt-2 text-center text-2xl font-bold tracking-tight text-[hsl(var(--rulmeca-red))] md:text-3xl"
            style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em" }}
          >
            ABILIS Industrie
          </p>
        </div>
        <div className="keypad">
          <div className="keypad__base">
            <img src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86" alt="" />
          </div>
          <button type="button" className="key keypad__single keypad__single--left" data-key="one">
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">QUOTE</span>
                <img src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" alt="" />
              </span>
            </span>
          </button>
          <button type="button" className="key keypad__single" data-key="two">
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">Import</span>
                <img src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" alt="" />
              </span>
            </span>
          </button>
          <button type="button" className="key keypad__double" data-key="three">
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">IMPORT RULMECA</span>
                <img src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86" alt="" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketRealitySection;
