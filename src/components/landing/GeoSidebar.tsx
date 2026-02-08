import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Layers,
  Activity,
  MapPin,
  Flag,
  type LucideIcon,
} from "lucide-react";

const SEGMENTS = ["Mines", "Carrières", "Cimenteries"] as const;
const STATUTS = ["prospect", "essai", "validation", "déploiement"] as const;

export type GeoFilterKey = "segment" | "statut" | "region" | "phase";

export interface GeoSidebarFilters {
  segment: string | null;
  statut: string | null;
  region: string | null;
  phase: string | null;
}

interface GeoSidebarProps {
  filters: GeoSidebarFilters;
  onFilterChange: (key: GeoFilterKey, value: string | null) => void;
  regions: string[];
}

const sectionConfig: {
  key: GeoFilterKey;
  labelKey: string;
  icon: LucideIcon;
  options: readonly string[] | string[];
  getFilterValue: (f: GeoSidebarFilters) => string | null;
}[] = [
  {
    key: "segment",
    labelKey: "geo.filters.segment",
    icon: Layers,
    options: SEGMENTS,
    getFilterValue: (f) => f.segment,
  },
  {
    key: "statut",
    labelKey: "geo.filters.status",
    icon: Activity,
    options: STATUTS,
    getFilterValue: (f) => f.statut,
  },
  {
    key: "region",
    labelKey: "geo.filters.region",
    icon: MapPin,
    options: [], // rempli dynamiquement
    getFilterValue: (f) => f.region,
  },
  {
    key: "phase",
    labelKey: "geo.sidebar.phaseImplantation",
    icon: Flag,
    options: STATUTS,
    getFilterValue: (f) => f.phase,
  },
];

function GeoSidebar({ filters, onFilterChange, regions }: GeoSidebarProps) {
  const { t } = useTranslation();

  return (
    <aside
      className="w-[220px] flex-shrink-0 flex flex-col bg-white border-r border-[hsl(var(--rulmeca-border))] rounded-l-xl"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="p-4 border-b border-[hsl(var(--rulmeca-border))]">
        <h2 className="text-xs font-semibold text-[hsl(var(--rulmeca-muted))] uppercase tracking-wider">
          {t("geo.sidebar.navigation")}
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        {sectionConfig.map((section) => {
          const options =
            section.key === "region" ? regions : section.options;
          const currentValue = section.getFilterValue(filters);

          return (
            <div key={section.key} className="mb-6">
              <div className="flex items-center gap-2 px-4 mb-2">
                <section.icon className="w-4 h-4 text-[hsl(var(--rulmeca-muted))]" />
                <span className="text-xs font-medium text-[hsl(var(--rulmeca-muted))] uppercase tracking-wider">
                  {t(section.labelKey)}
                </span>
              </div>
              <ul className="space-y-0.5">
                <li>
                  <button
                    type="button"
                    onClick={() => onFilterChange(section.key, null)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition-colors rounded-r-lg border-l-2 border-transparent ${
                      currentValue === null
                        ? "bg-[hsl(var(--rulmeca-alt))] text-[hsl(var(--rulmeca-red))] border-[hsl(var(--rulmeca-red))]"
                        : "text-[hsl(var(--rulmeca-text))] hover:bg-[hsl(var(--rulmeca-alt))]"
                    }`}
                  >
                    {t("geo.sidebar.all")}
                  </button>
                </li>
                {options.map((opt) => {
                  const isActive = currentValue === opt;
                  const statusI18nKey =
                    opt === "déploiement" ? "deploiement" : opt;
                  const label =
                    section.key === "statut" || section.key === "phase"
                      ? t(`geo.status.${statusI18nKey}`)
                      : opt;

                  return (
                    <li key={opt}>
                      <motion.button
                        type="button"
                        onClick={() =>
                          onFilterChange(
                            section.key,
                            isActive ? null : opt
                          )
                        }
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition-colors rounded-r-lg border-l-2 border-transparent ${
                          isActive
                            ? "bg-[hsl(var(--rulmeca-alt))] text-[hsl(var(--rulmeca-red))] border-[hsl(var(--rulmeca-red))]"
                            : "text-[hsl(var(--rulmeca-text))] hover:bg-[hsl(var(--rulmeca-alt))]"
                        }`}
                      >
                        {label}
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default GeoSidebar;
