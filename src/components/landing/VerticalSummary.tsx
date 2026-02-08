import { useEffect, useState } from "react";
import { chapters } from "@/data/mock";
import { useTranslation } from "react-i18next";

interface VerticalSummaryProps {
  activeChapterId?: string;
  onChapterClick?: (chapterId: string) => void;
}

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

const VerticalSummary = ({ activeChapterId, onChapterClick }: VerticalSummaryProps) => {
  const [activeId, setActiveId] = useState<string | undefined>(activeChapterId);
  const { t } = useTranslation();

  useEffect(() => {
    setActiveId(activeChapterId);
  }, [activeChapterId]);

  const handleClick = (chapterId: string) => {
    setActiveId(chapterId);
    onChapterClick?.(chapterId);
    const element = document.querySelector(`[data-chapter-id="${chapterId}"]`);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="annuaire-section fixed left-0 top-0 bottom-0 w-[220px] z-40">
      <nav className="h-full overflow-y-auto py-8 px-4" aria-label="Chapitres">
        <ul className="space-y-0 list-none p-0 m-0">
          {chapters.map((chapter, index) => {
            const isActive = activeId === chapter.id;
            const key = chapterKeys[chapter.id];
            const title = key ? t(`chapters.${key}.title`) : chapter.title;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => handleClick(chapter.id)}
                  className={`annuaire-item w-full text-left relative block border-l-2 transition-colors ${
                    isActive
                      ? "border-[#b30000] bg-[#b30000]/[0.06] text-[#0B1220]"
                      : "border-transparent text-[#6B7280] hover:text-[#1F2937] hover:bg-[#b30000]/[0.03]"
                  }`}
                >
                  <span className="flex items-center gap-2.5 py-2 px-3">
                    <span
                      className={`text-xs font-semibold tabular-nums shrink-0 ${
                        isActive ? "text-[#b30000]" : "text-[#b30000]/70"
                      }`}
                      style={{ minWidth: "18px" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium leading-tight truncate">
                      {title}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default VerticalSummary;
