import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { targets, actions, chapters, Chapter, Target } from "@/data/mock";
import { useTranslation } from "react-i18next";
import GeoSidebar, {
  type GeoSidebarFilters,
  type GeoFilterKey,
} from "./GeoSidebar";
import GeoDashboard from "./GeoDashboard";
import GeoInsightPanel from "./GeoInsightPanel";

gsap.registerPlugin(ScrollTrigger);

const chapterKeys: Record<string, string> = {
  "chapter-1": "visionCadre",
  "chapter-2": "marcheOpportunite",
  "chapter-3": "structurationLocale",
  "chapter-4": "couvertureTerritoriale",
  "chapter-5": "planMarketing",
  "chapter-6": "planCommercialTerrain",
  "chapter-7": "organisationMoyens",
  "chapter-8": "feuilleRoute",
  "chapter-9": "engagementInvestissement",
};

interface GeoSectionProps {
  onActiveChapterChange?: (chapterId: string | undefined) => void;
}

const GeoSection = ({ onActiveChapterChange }: GeoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapBlockRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | undefined>(
    undefined
  );
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [filters, setFilters] = useState<GeoSidebarFilters>({
    segment: null,
    statut: null,
    region: null,
    phase: null,
  });
  const { t } = useTranslation();

  const regions = useMemo(
    () => [...new Set(targets.map((tgt) => tgt.region))].sort(),
    []
  );

  const filteredTargets = useMemo(() => {
    let list = activeChapterId
      ? targets.filter((tgt) => tgt.chapterId === activeChapterId)
      : [...targets];
    if (list.length === 0) list = [...targets];
    if (filters.segment)
      list = list.filter((tgt) => tgt.segment === filters.segment);
    if (filters.statut)
      list = list.filter((tgt) => tgt.status === filters.statut);
    if (filters.region)
      list = list.filter((tgt) => tgt.region === filters.region);
    if (filters.phase)
      list = list.filter((tgt) => tgt.status === filters.phase);
    return list;
  }, [activeChapterId, filters]);

  const handleFilterChange = useCallback((key: GeoFilterKey, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    onActiveChapterChange?.(activeChapterId);
  }, [activeChapterId, onActiveChapterChange]);

  useEffect(() => {
    if (!sectionRef.current || !mapBlockRef.current || !rightColumnRef.current)
      return;
    const section = sectionRef.current;
    const mapBlock = mapBlockRef.current;
    const rightColumn = rightColumnRef.current;
    const rightContentHeight = rightColumn.scrollHeight;
    const viewportHeight = window.innerHeight;
    const mapBlockHeight = mapBlock.offsetHeight || viewportHeight * 0.8;

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () =>
        `+=${rightContentHeight - viewportHeight + mapBlockHeight}`,
      pin: mapBlock,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const chapterIndex = Math.min(
          Math.floor(progress * chapters.length),
          chapters.length - 1
        );
        const activeChapter = chapters[chapterIndex];
        if (activeChapter && activeChapter.id !== activeChapterId) {
          setActiveChapterId(activeChapter.id);
        }
      },
    });

    chapters.forEach((chapter) => {
      const chapterElement = rightColumn.querySelector(
        `[data-chapter-id="${chapter.id}"]`
      );
      if (chapterElement) {
        ScrollTrigger.create({
          trigger: chapterElement,
          start: "top 25%",
          end: "bottom 25%",
          onEnter: () => setActiveChapterId(chapter.id),
          onEnterBack: () => setActiveChapterId(chapter.id),
        });
      }
    });

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section || st.vars.trigger === rightColumn)
          st.kill();
      });
    };
  }, [activeChapterId]);

  return (
    <section
      id="geo-section"
      ref={sectionRef}
      className="relative min-h-screen"
      style={{ background: "#F7F8FA" }}
    >
      {/* Module dashboard immersif — 3 colonnes, full-width, soft shadow */}
      <div
        ref={mapBlockRef}
        className="w-full min-h-[85vh] flex rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
          background: "#fff",
        }}
      >
        <GeoSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          regions={regions}
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-4 py-3 border-b border-[hsl(var(--rulmeca-border))] flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-[hsl(var(--rulmeca-text))] tracking-tight">
                {t("geo.map.serversActive")} — Maroc
              </h2>
              <p className="text-xs text-[hsl(var(--rulmeca-muted))] mt-0.5">
                {t("geo.map.geolocationSubtitle")}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filteredTargets.length} sites
            </span>
          </div>
          <div className="flex-1 min-h-0 relative">
            <GeoDashboard
              filteredTargets={filteredTargets}
              selectedTargetId={selectedTarget?.id ?? null}
              onTargetClick={setSelectedTarget}
            />
          </div>
        </div>
        <GeoInsightPanel
          filteredTargets={filteredTargets}
          selectedTarget={selectedTarget}
        />
      </div>

      {/* Contenu chapitres — sous le module */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div ref={rightColumnRef} className="space-y-28 pb-28">
          {chapters.map((chapter, index) => (
            <ChapterContent
              key={chapter.id}
              chapter={chapter}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ChapterContentProps {
  chapter: Chapter;
  index: number;
}

const ChapterContent = ({ chapter, index }: ChapterContentProps) => {
  const { t } = useTranslation();
  const key = chapterKeys[chapter.id];
  const title = key ? t(`chapters.${key}.title`) : chapter.title;
  const subtitle = key ? t(`chapters.${key}.subtitle`) : "";

  return (
    <div
      data-chapter-id={chapter.id}
      className="bg-white rounded-xl p-8 shadow-[var(--shadow-soft)] border border-[hsl(var(--rulmeca-border))]"
    >
      <div className="mb-10">
        <span className="section-badge mb-3 inline-block">
          Chapitre {index + 1}
        </span>
        <h2 className="text-2xl font-semibold text-[hsl(var(--rulmeca-text))] mb-3 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-[hsl(var(--rulmeca-muted))] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-6">
        {chapter.id === "chapter-1" && <VisionCadreContent />}
        {chapter.id === "chapter-2" && <MarcheOpportuniteContent />}
        {chapter.id === "chapter-3" && <StructurationLocaleContent />}
        {chapter.id === "chapter-4" && <CouvertureTerritorialeContent />}
        {chapter.id === "chapter-5" && <MarketingContent />}
        {chapter.id === "chapter-6" && <CommercialContent />}
        {chapter.id === "chapter-7" && <OrganisationMoyensContent />}
        {chapter.id === "chapter-8" && <FeuilleRouteContent />}
        {chapter.id === "chapter-9" && <EngagementInvestissementContent />}
      </div>
    </div>
  );
};

const VisionCadreContent = () => (
  <div className="space-y-6">
    <p className="text-[hsl(var(--rulmeca-text))] text-base leading-relaxed">
      Vision et cadre de structuration du bureau RULMECA au Maroc. Mission
      locale, ambition territoriale et cadre de gouvernance pour une
      implantation durable.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
        <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2 uppercase tracking-wide">
          Vision
        </h3>
        <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
          Représentation structurée et capacité d&apos;exécution long terme sur
          le territoire.
        </p>
      </div>
      <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
        <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2 uppercase tracking-wide">
          Cadre
        </h3>
        <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
          Gouvernance et planification territoriale alignées avec les objectifs
          fournisseur.
        </p>
      </div>
    </div>
  </div>
);

const MarcheOpportuniteContent = () => {
  const segments = ["Mines", "Carrières", "Cimenteries"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {segments.map((segment) => (
        <div
          key={segment}
          className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl"
        >
          <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
            {segment}
          </h3>
          <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
            Marché et opportunités identifiées pour le segment. Cibles
            stratégiques et potentiel.
          </p>
        </div>
      ))}
    </div>
  );
};

const StructurationLocaleContent = () => (
  <div className="space-y-6">
    <p className="text-[hsl(var(--rulmeca-text))] text-base leading-relaxed">
      Structuration locale : organisation, ancrage territorial et capacité
      d&apos;exécution.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
        <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
          Positionnement
        </h3>
        <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
          Présence dans les principales régions industrielles du Maroc.
        </p>
      </div>
      <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
        <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
          Engagement
        </h3>
        <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
          Équipe dédiée et ressources pour un déploiement structuré.
        </p>
      </div>
    </div>
  </div>
);

const CouvertureTerritorialeContent = () => (
  <p className="text-[hsl(var(--rulmeca-muted))] text-base leading-relaxed">
    La carte et le panneau de données présentent les sites stratégiques,
    segments actifs, statut et phase d&apos;implantation sur le territoire.
  </p>
);

const MarketingContent = () => {
  const marketingActions = actions.filter((a) => a.type === "marketing");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {marketingActions.map((action) => (
        <div
          key={action.id}
          className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))]">
              {action.title}
            </h3>
            <span className="text-xs text-[hsl(var(--rulmeca-muted))]">
              {action.city}
            </span>
          </div>
          <ul className="text-sm text-[hsl(var(--rulmeca-muted))] space-y-1">
            {action.deliverables.slice(0, 3).map((d, i) => (
              <li key={i}>· {d}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const CommercialContent = () => {
  const commercialActions = actions.filter((a) => a.type === "commercial");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {commercialActions.map((action) => (
        <div
          key={action.id}
          className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))]">
              {action.title}
            </h3>
            <span className="text-xs border border-[hsl(var(--rulmeca-border))] px-2 py-0.5 rounded-lg text-[hsl(var(--rulmeca-muted))]">
              {action.status}
            </span>
          </div>
          <p className="text-sm text-[hsl(var(--rulmeca-muted))]">
            {action.city} · {action.segment}
          </p>
        </div>
      ))}
    </div>
  );
};

const OrganisationMoyensContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
      <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
        Équipe
      </h3>
      <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
        Équipe technique et commerciale dédiée, formée aux produits RULMECA.
      </p>
    </div>
    <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
      <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
        Logistique
      </h3>
      <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
        Stock local et capacité de livraison sur le territoire.
      </p>
    </div>
    <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
      <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
        Disponibilité
      </h3>
      <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
        Support technique et intervention rapide.
      </p>
    </div>
    <div className="border border-[hsl(var(--rulmeca-border))] p-5 rounded-xl">
      <h3 className="text-sm font-semibold text-[hsl(var(--rulmeca-text))] mb-2">
        Délais
      </h3>
      <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
        Respect des engagements et suivi des projets.
      </p>
    </div>
  </div>
);

const FeuilleRouteContent = () => {
  const filteredActions = actions.slice(0, 6);
  return (
    <div className="space-y-6">
      <p className="text-sm text-[hsl(var(--rulmeca-muted))] leading-relaxed">
        Jalons et calendrier d&apos;exécution des actions structurantes.
      </p>
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <div
            key={action.id}
            className="flex justify-between items-center border-b border-[hsl(var(--rulmeca-border))] pb-3"
          >
            <div>
              <div className="text-sm font-medium text-[hsl(var(--rulmeca-text))]">
                {action.title}
              </div>
              <div className="text-xs text-[hsl(var(--rulmeca-muted))]">
                {action.city} · {action.segment}
              </div>
            </div>
            <span className="text-xs text-[hsl(var(--rulmeca-muted))]">
              {action.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EngagementInvestissementContent = () => {
  const totalBudget = actions.reduce((sum, a) => sum + a.budgetMAD, 0);
  return (
    <div className="space-y-6">
      <p className="text-base text-[hsl(var(--rulmeca-muted))] leading-relaxed">
        Engagement financier et budget dédié à l&apos;implantation et au
        déploiement territorial.
      </p>
      <div className="border border-[hsl(var(--rulmeca-border))] p-6 rounded-xl">
        <div className="text-xs font-medium text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide mb-2">
          Budget total dédié (MAD)
        </div>
        <div className="text-3xl font-bold text-[hsl(var(--rulmeca-red))]">
          {(totalBudget / 1000).toFixed(0)} K
        </div>
        <p className="text-sm text-[hsl(var(--rulmeca-muted))] mt-2">
          Répartition sur les actions marketing et commerciales terrain,
          formation et déploiement.
        </p>
      </div>
    </div>
  );
};

export default GeoSection;
