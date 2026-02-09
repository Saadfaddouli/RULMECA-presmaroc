import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { marketRealityTimelineSteps, typologyGroups } from "@/data/mock";
import type { MarketRealityTimelineStep, TypologyGroup as TypologyGroupType, TypologyClientLogoKey } from "@/data/mock";
import rulmecaSymbol from "@/assets/RULMECAASSETS/symbol.svg";
import handshakeImage from "@/assets/RULMECAASSETS/handshake.png";
import moyensHumainsImg from "@/assets/RULMECAASSETS/moyenshumains.png";
import moyensLogistiquesImg from "@/assets/RULMECAASSETS/moyenslogistiques.png";
import moyensDigitauxImg from "@/assets/RULMECAASSETS/moyensdigitaux.png";
// Logos typologie depuis RULMECAASSETS/LOGOS
import logoOcp from "@/assets/RULMECAASSETS/LOGOS/OCP.jpeg";
import logoNovacim from "@/assets/RULMECAASSETS/LOGOS/novacim.jpeg";
import logoManagem from "@/assets/RULMECAASSETS/LOGOS/MANAGEM.jpeg";
import logoLafarge from "@/assets/RULMECAASSETS/LOGOS/lafarge.jpeg";
import logoCimentsDuMaroc from "@/assets/RULMECAASSETS/LOGOS/cimentsdumaroc.jpeg";
import logoCimat from "@/assets/RULMECAASSETS/LOGOS/cimat.jpeg";
import logoAya from "@/assets/RULMECAASSETS/LOGOS/ayagold&silver.jpeg";
import logoCmt from "@/assets/RULMECAASSETS/LOGOS/cmt.jpeg";
import logoSacem from "@/assets/RULMECAASSETS/LOGOS/SACEM.jpeg";
import logoOfas from "@/assets/RULMECAASSETS/LOGOS/OFAS.jpeg";
import logoSafiec from "@/assets/RULMECAASSETS/LOGOS/SAFIEC.jpeg";
import logoTaqa from "@/assets/RULMECAASSETS/LOGOS/TAQA.jpeg";
import "./market-reality-section.css";

const logoFontFamily = "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif";

const TIMELINE_STEPS = [
  { stepKey: "processStep1" as const, labelKey: "marketReality.processStep1", defaultLabel: "Commande ABILIS auprès de RULMECA", logos: ["abilis", "rulmeca"] as const },
  { stepKey: "processStep2" as const, labelKey: "marketReality.processStep2", defaultLabel: "Régularisation rapide des achats", logos: ["centralEurope"] as const },
  { stepKey: "processStep3" as const, labelKey: "marketReality.processStep3", defaultLabel: "Douane, TVA & frais d'import pris en charge", logos: ["abilis"] as const },
  { stepKey: "processStep4" as const, labelKey: "marketReality.processStep4", defaultLabel: "Livraison sécurisée au Maroc", logos: ["rulmeca"] as const },
];

const TYPOLOGY_CLIENT_LOGOS: Record<NonNullable<TypologyClientLogoKey>, string> = {
  ocp: logoOcp,
  novacim: logoNovacim,
  managem: logoManagem,
  lafarge: logoLafarge,
  cimentsDuMaroc: logoCimentsDuMaroc,
  cimat: logoCimat,
  aya: logoAya,
  cmt: logoCmt,
  sacem: logoSacem,
  ofas: logoOfas,
  safiec: logoSafiec,
  taqa: logoTaqa,
};

function TimelineWithLoop({
  t,
  logoFontFamily,
  rulmecaSymbol,
}: {
  t: (key: string, fallback?: string) => string;
  logoFontFamily: string;
  rulmecaSymbol: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { amount: 0.25, margin: "-50px 0px -50px 0px" });
  const [playKey, setPlayKey] = useState(0);
  const prevInViewRef = useRef(false);

  useEffect(() => {
    if (inView && !prevInViewRef.current) {
      setPlayKey((k) => k + 1);
    }
    prevInViewRef.current = inView;
  }, [inView]);

  return (
    <div ref={wrapperRef} className="market-reality-ambition_center">
      <motion.p
        className="market-reality-ambition_process-title"
        style={{ fontFamily: logoFontFamily, fontWeight: 700 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {t("marketReality.processTitle", "Processus d'achat régularisé")}
      </motion.p>
      <ul className="market-reality-process-timeline" key={playKey}>
        {TIMELINE_STEPS.map((item, index) => (
          <motion.li
            key={`${item.stepKey}-${playKey}`}
            className="market-reality-process-timeline_item"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <article className="market-reality-process-card">
              <span className="market-reality-process-card_num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="market-reality-process-card_logos">
                {item.logos.includes("rulmeca") && (
                  <span className="process-logo process-logo--rulmeca" title="RULMECA">
                    <img src={rulmecaSymbol} alt="" />
                  </span>
                )}
                {item.logos.includes("abilis") && (
                  <span className="process-logo process-logo--abilis" title="ABILIS Industrie">
                    <span style={{ fontFamily: logoFontFamily, fontWeight: 800 }}>ABILIS</span>
                    <span style={{ fontFamily: logoFontFamily, fontWeight: 600, fontSize: "0.8em" }}> Industrie</span>
                  </span>
                )}
                {item.logos.includes("centralEurope") && (
                  <span className="process-logo process-logo--central-europe" title="Central d'achat en Europe">
                    <span style={{ fontFamily: logoFontFamily, fontWeight: 700, fontSize: "0.85em" }}>Central d'achat en Europe</span>
                  </span>
                )}
              </div>
              <p className="market-reality-process-card_label">{t(item.labelKey, item.defaultLabel)}</p>
            </article>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

type BioYearStepProps = {
  step: MarketRealityTimelineStep;
  index: number;
  stepRef: (el: HTMLDivElement | null) => void;
};

const CardContent = ({ step, isLeft }: { step: MarketRealityTimelineStep; isLeft: boolean }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="market-reality-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
        rotateY: isLeft ? -4 : 4,
        z: 14,
        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 24px 56px -16px rgba(0,0,0,0.14)",
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ transformStyle: "preserve-3d" }}
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
          {carteAGauche ? <CardContent step={step} isLeft /> : null}
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
          {!carteAGauche ? <CardContent step={step} isLeft={false} /> : null}
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
      {/* Intro — 80vh avec animation texte + tags secteurs */}
      <div className="market-reality-intro px-4 py-16 md:py-24">
        <div className="market-reality-intro_bubble-wrap">
          <span className="section-number-bubble" aria-hidden>2</span>
        </div>
        <div className="mx-auto max-w-[900px] text-center">
          <span className="section-badge mb-3 inline-block text-xs font-medium uppercase tracking-wider text-[hsl(var(--rulmeca-muted))]">
            {t("marketReality.badge", "Marché & positionnement")}
          </span>
          <motion.h2
            className="market-reality-title text-3xl font-bold tracking-tight text-[hsl(var(--rulmeca-text))] md:text-4xl lg:text-5xl"
            style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em", lineHeight: 1.25 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("marketReality.title", "Réalité du marché marocain")}
          </motion.h2>
          <motion.div
            className="market-reality-intro_tags mt-6 flex flex-wrap justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              hidden: {},
            }}
          >
            {[
              t("marketReality.sectorMining", "Secteur minier & carrière"),
              t("marketReality.sectorBTP", "Secteur BTP"),
              t("marketReality.sectorCimenterie", "Secteur cimenterie"),
            ].map((label, i) => (
              <motion.span
                key={label}
                className="market-reality-intro_tag"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 12 },
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
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

      {/* Bloc final : gauche BTA, centre process (bulle 1 supprimée) */}
      <div className="market-reality-ambition">
        <div className="market-reality-ambition_message">
          <p className="text-center text-lg font-semibold text-[hsl(var(--rulmeca-text))] md:text-xl">
            {t("marketReality.ambition", "ABILIS Industrie : votre partenaire structurant sur le marché marocain.")}
          </p>
        </div>

        <div className="market-reality-ambition_grid">
          {/* Gauche : Central d'achat en Europe */}
          <div className="market-reality-ambition_left">
            <div className="market-reality-ambition_bta">
              <div className="market-reality-ambition_bta-logo" aria-hidden style={{ fontFamily: logoFontFamily, fontWeight: 700 }}>
                Central d'achat en Europe
              </div>
              <h3
                className="market-reality-ambition_bta-title"
                style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em" }}
              >
                {t("marketReality.centralEuropeTitle", "Central d'achat en Europe")}
              </h3>
              <p className="market-reality-ambition_bta-text">
                {t("marketReality.btaShort", "Partenariat avec le bureau central d'approvisionnement en France. Achats d'ABILIS Industrie régularisés auprès de RULMECA.")}
              </p>
            </div>
          </div>

          {/* Centre : timeline verticale animée (stagger + loop au retour dans la section) */}
          <TimelineWithLoop t={t} logoFontFamily={logoFontFamily} rulmecaSymbol={rulmecaSymbol} />
        </div>

        {/* Image poignée de main après la grille, pleine largeur */}
        <div className="market-reality-ambition_handshake">
          <img src={handshakeImage} alt="" className="market-reality-ambition_handshake-img" />
        </div>
      </div>

      {/* Section Moyens humains et logistiques — bulle 3 (même style que intro) */}
      <div className="market-reality-moyens px-4">
        <div className="market-reality-moyens_bubble-wrap">
          <span className="section-number-bubble" aria-hidden>3</span>
        </div>
        <div className="mx-auto max-w-[900px] text-center">
          <span className="section-badge mb-3 inline-block text-xs font-medium uppercase tracking-wider text-[hsl(var(--rulmeca-muted))]">
            {t("marketReality.moyensBadge", "Moyens")}
          </span>
          <h2
            className="market-reality-title text-3xl font-bold tracking-tight text-[hsl(var(--rulmeca-text))] md:text-4xl lg:text-5xl"
            style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em", lineHeight: 1.25 }}
          >
            {t("marketReality.moyensHumainsTitle", "Moyens humains et logistiques")}
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--rulmeca-muted))] md:text-xl">
            {t("marketReality.moyensHumainsIntro", "Équipe, logistique et capacités pour représenter la marque sur le terrain.")}
          </p>
        </div>
      </div>

      {/* Galerie 3 MOYENS — style hero_codepen_idea, fond blanc */}
      <div className="market-reality-gallery-wrap bg-white">
        <div className="market-reality-gallery container">
          <div
            className="market-reality-gallery-box box box-1"
            style={{ ["--img" as string]: `url(${moyensHumainsImg})` }}
            data-text={t("marketReality.galleryHumains", "Moyens humains")}
          />
          <div
            className="market-reality-gallery-box box box-2"
            style={{ ["--img" as string]: `url(${moyensLogistiquesImg})` }}
            data-text={t("marketReality.galleryLogistiques", "Moyens logistiques")}
          />
          <div
            className="market-reality-gallery-box box box-3"
            style={{ ["--img" as string]: `url(${moyensDigitauxImg})` }}
            data-text={t("marketReality.galleryDigitaux", "Moyens digitaux")}
          />
        </div>
      </div>

      {/* Répartition par typologie — Kanban prospections clients & villes (style vif) */}
      <div className="typology-wrap flex flex-col w-full overflow-auto text-gray-700 bg-gradient-to-tr from-red-50 via-white to-red-50 border-t border-[hsl(var(--rulmeca-border))]">
        <div className="typology-screen">
          <div className="typology-header center">
            <div className="typology-meta">
              <span className="typology-projectLabel grey">{t("marketReality.categoriesTitle", "Répartition par typologie")}</span>
              <span className="typology-projectValue">{t("marketReality.categoriesSubtitle", "Prospections clients et leurs villes.")}</span>
            </div>
          </div>
          <div className="typology-content">
            {typologyGroups.map((group: TypologyGroupType) => (
              <div key={group.key} className="typology-phase">
                <div className="typology-phaseHeader center">
                  <span className="typology-phaseTitle">{t(group.labelKey)}</span>
                  <span className="typology-phaseCount">{group.clients.length}</span>
                </div>
                <div className="typology-phaseContent">
                  {group.clients.map((client) => (
                    <motion.div
                      key={client.id}
                      className="typology-task"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{
                        scale: 1.04,
                        y: -4,
                        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 24px 56px -16px rgba(0,0,0,0.14)",
                        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="typology-taskCategory">{t(group.labelKey)}</div>
                      <div className="typology-taskHeader center">
                        {client.logoKey ? (
                          <div className="typology-taskLogo">
                            <img src={TYPOLOGY_CLIENT_LOGOS[client.logoKey]} alt="" loading="lazy" />
                          </div>
                        ) : (
                          <span className="typology-char">{t(client.nameKey).charAt(0)}</span>
                        )}
                        <h4 className="typology-taskTitle">{t(client.nameKey)}</h4>
                      </div>
                      <div className="typology-taskMeta grey">{t(client.cityKey)}</div>
                      {client.descriptionKey && (
                        <div className="typology-taskDescription">{t(client.descriptionKey)}</div>
                      )}
                      <div className="typology-taskInfo center">
                        <div className="typology-infoTab">
                          <span className="typology-infoTabHeader grey">Statut</span>
                          <span className={`typology-badge typology-badge--${client.prospectStatus}`}>
                            {client.prospectStatus === "new" && t("marketReality.prospectNew", "Nouveau")}
                            {client.prospectStatus === "inProgress" && t("marketReality.prospectInProgress", "En cours")}
                            {client.prospectStatus === "done" && t("marketReality.prospectDone", "Conclu")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketRealitySection;
