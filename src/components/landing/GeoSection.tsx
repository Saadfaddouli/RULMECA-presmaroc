import { useTranslation } from "react-i18next";
import ProductImagesStrip from "./ProductImagesStrip";

const logoFontFamily = "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif";

interface GeoSectionProps {
  onActiveChapterChange?: (chapterId: string | undefined) => void;
}

const GeoSection = ({ onActiveChapterChange }: GeoSectionProps) => {
  const { t } = useTranslation();

  return (
    <section
      id="geo-section"
      className="relative min-h-screen"
      style={{ background: "#F7F8FA" }}
    >
      {/* Fiche Potentiel client par an */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[hsl(var(--rulmeca-border))] p-6 md:p-8">
          <span className="section-badge mb-3 inline-block text-xs font-medium uppercase tracking-wider text-[hsl(var(--rulmeca-muted))]">
            {t("geo.potentielBadge", "Potentiel")}
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-[hsl(var(--rulmeca-text))] tracking-tight mb-4"
            style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em" }}
          >
            {t("geo.potentielClientParAn", "Potentiel client par an")}
          </h2>
          <p className="text-[hsl(var(--rulmeca-muted))] text-base leading-relaxed mb-6">
            {t("geo.potentielIntro", "Synthèse du potentiel adressable sur le territoire marocain par typologie et par année.")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { yearKey: "geo.year2024", valueKey: "geo.potentiel2024", value: "K MAD" },
              { yearKey: "geo.year2025", valueKey: "geo.potentiel2025", value: "K MAD" },
              { yearKey: "geo.year2026", valueKey: "geo.potentiel2026", value: "K MAD" },
              { yearKey: "geo.yearCible", valueKey: "geo.potentielCible", value: "K MAD" },
            ].map((item) => (
              <div
                key={item.yearKey}
                className="border border-[hsl(var(--rulmeca-border))] rounded-xl p-4 text-center"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--rulmeca-muted))] mb-1">
                  {t(item.yearKey)}
                </div>
                <div className="text-xl font-bold text-[hsl(var(--rulmeca-red))]" style={{ fontFamily: logoFontFamily }}>
                  {t(item.valueKey)}
                </div>
                <div className="text-xs text-[hsl(var(--rulmeca-muted))] mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5 — Portefeuille produits (style hero_codepen_idea) */}
      <div className="pt-4 pb-0">
        <div className="px-4 text-center mb-6">
          <span className="section-number-bubble" aria-hidden>5</span>
          <span className="section-badge mt-3 inline-block text-xs font-medium uppercase tracking-wider text-[hsl(var(--rulmeca-muted))]">
            {t("geo.portefeuilleProduitsBadge", "Produits")}
          </span>
          <h2
            className="market-reality-title text-3xl font-bold tracking-tight text-[hsl(var(--rulmeca-text))] mt-2"
            style={{ fontFamily: logoFontFamily, fontWeight: 800, letterSpacing: "0.05em", lineHeight: 1.25 }}
          >
            {t("geo.portefeuilleProduitsTitle", "Portefeuille produits")}
          </h2>
          <p className="mt-2 text-base text-[hsl(var(--rulmeca-muted))] max-w-xl mx-auto">
            {t("geo.portefeuilleProduitsIntro", "Gamme RULMECA : rouleaux, supports, bandes et équipements pour convoyeurs.")}
          </p>
        </div>
        <ProductImagesStrip />
      </div>
    </section>
  );
};

export default GeoSection;
