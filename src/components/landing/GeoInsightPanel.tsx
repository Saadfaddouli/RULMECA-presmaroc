import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Target } from "@/data/mock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Database, CheckCircle, Truck, TrendingUp } from "lucide-react";
import { useMemo } from "react";

const chartConfig = {
  potentiel: {
    label: "Potentiel",
    color: "hsl(var(--rulmeca-red))",
  },
  mois: {
    label: "Mois",
    color: "hsl(var(--rulmeca-muted))",
  },
} satisfies ChartConfig;

interface GeoInsightPanelProps {
  filteredTargets: Target[];
  selectedTarget: Target | null;
}

function GeoInsightPanel({ filteredTargets, selectedTarget }: GeoInsightPanelProps) {
  const { t } = useTranslation();

  const kpis = useMemo(() => {
    const sitesActifs = filteredTargets.length;
    const enValidation = filteredTargets.filter(
      (tgt) => tgt.status === "validation"
    ).length;
    const enDeploiement = filteredTargets.filter(
      (tgt) => tgt.status === "déploiement"
    ).length;
    const potentielMoyen =
      filteredTargets.length > 0
        ? Math.round(
            filteredTargets.reduce((s, tgt) => s + tgt.potentialScore, 0) /
              filteredTargets.length
          )
        : 0;

    return [
      {
        key: "sitesActifs",
        labelKey: "geo.kpi.sitesActifs",
        value: String(sitesActifs).padStart(2, "0"),
        icon: Database,
      },
      {
        key: "enValidation",
        labelKey: "geo.kpi.enValidation",
        value: String(enValidation).padStart(2, "0"),
        icon: CheckCircle,
      },
      {
        key: "enDeploiement",
        labelKey: "geo.kpi.enDeploiement",
        value: String(enDeploiement).padStart(2, "0"),
        icon: Truck,
      },
      {
        key: "potentielMoyen",
        labelKey: "geo.kpi.potentielMoyen",
        value: String(potentielMoyen),
        icon: TrendingUp,
      },
    ];
  }, [filteredTargets]);

  const pipelineData = useMemo(() => {
    const phases = ["prospect", "essai", "validation", "déploiement"] as const;
    const statusKey = (s: string) =>
      s === "déploiement" ? "deploiement" : s;
    return phases.map((phase) => ({
      mois: t(`geo.status.${statusKey(phase)}`),
      potentiel: filteredTargets.filter((tgt) => tgt.status === phase).length,
    }));
  }, [filteredTargets, t]);

  return (
    <aside
      className="w-[340px] flex-shrink-0 flex flex-col bg-white border-l border-[hsl(var(--rulmeca-border))] rounded-r-xl overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="p-4 border-b border-[hsl(var(--rulmeca-border))]">
        <h2 className="text-xs font-semibold text-[hsl(var(--rulmeca-muted))] uppercase tracking-wider">
          {t("geo.title")}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <Card
              key={kpi.key}
              className="border-[hsl(var(--rulmeca-border))] rounded-xl shadow-[var(--shadow-soft)]"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <kpi.icon className="w-4 h-4 text-[hsl(var(--rulmeca-muted))]" />
                  <span className="text-xs font-medium text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide">
                    {t(kpi.labelKey)}
                  </span>
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--rulmeca-red))]">
                  {kpi.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Site detail block */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            {selectedTarget ? (
              <motion.div
                key={selectedTarget.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-xl border border-[hsl(var(--rulmeca-border))] bg-white p-4 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-xs font-semibold text-[hsl(var(--rulmeca-muted))] uppercase tracking-wider mb-1">
                  {t("geo.insight.siteDetail")}
                </h3>
                <div className="text-lg font-bold text-[hsl(var(--rulmeca-text))] mb-3">
                  {selectedTarget.name}
                </div>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide">
                      {t("geo.insight.city")}
                    </dt>
                    <dd className="font-medium text-[hsl(var(--rulmeca-text))]">
                      {selectedTarget.city}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide">
                      {t("geo.insight.segment")}
                    </dt>
                    <dd className="font-medium text-[hsl(var(--rulmeca-text))]">
                      {selectedTarget.segment}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide">
                      {t("geo.insight.status")}
                    </dt>
                    <dd className="font-medium text-[hsl(var(--rulmeca-text))]">
                      {t(
                      `geo.status.${
                        selectedTarget.status === "déploiement"
                          ? "deploiement"
                          : selectedTarget.status
                      }`
                    )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide mb-1">
                      {t("geo.insight.scorePotentiel")}
                    </dt>
                    <dd className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-[hsl(var(--rulmeca-alt))] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-[hsl(var(--rulmeca-red))]"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedTarget.potentialScore}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[hsl(var(--rulmeca-red))] w-8">
                        {selectedTarget.potentialScore}/100
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[hsl(var(--rulmeca-muted))] uppercase tracking-wide">
                      {t("geo.insight.nextAction")}
                    </dt>
                    <dd className="text-sm text-[hsl(var(--rulmeca-text))]">
                      {selectedTarget.status === "prospect"
                        ? "Prospection prévue"
                        : selectedTarget.status === "essai"
                          ? "Suivi essai en cours"
                          : selectedTarget.status === "validation"
                            ? "Validation client"
                            : "Déploiement actif"}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-dashed border-[hsl(var(--rulmeca-border))] bg-[hsl(var(--rulmeca-alt))]/50 p-8 flex items-center justify-center min-h-[200px]"
              >
                <p className="text-sm text-[hsl(var(--rulmeca-muted))] text-center">
                  Sélectionnez un site sur la carte pour afficher les détails.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mini pipeline chart */}
        <div className="rounded-xl border border-[hsl(var(--rulmeca-border))] bg-white p-4 shadow-[var(--shadow-soft)]">
          <h3 className="text-xs font-semibold text-[hsl(var(--rulmeca-muted))] uppercase tracking-wider mb-3">
            Pipeline par phase
          </h3>
          <ChartContainer config={chartConfig} className="h-[140px] w-full">
            <LineChart data={pipelineData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-[hsl(var(--rulmeca-border))]"
              />
              <XAxis
                dataKey="mois"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--rulmeca-muted))", fontSize: 10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--rulmeca-muted))", fontSize: 10 }}
                width={20}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="potentiel"
                stroke="hsl(var(--rulmeca-red))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--rulmeca-red))", r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </aside>
  );
}

export default GeoInsightPanel;
