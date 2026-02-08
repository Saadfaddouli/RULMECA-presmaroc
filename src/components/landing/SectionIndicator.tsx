import { useEffect, useState, useRef } from "react";
import { chapters } from "@/data/mock";
import { useTranslation } from "react-i18next";

interface SectionIndicatorProps {
  activeChapterId?: string;
  onChapterClick?: (chapterId: string) => void;
  onActiveChapterChange?: (chapterId: string | undefined) => void;
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

const SectionIndicator = ({
  activeChapterId,
  onChapterClick,
  onActiveChapterChange,
}: SectionIndicatorProps) => {
  const [activeId, setActiveId] = useState<string | undefined>(activeChapterId);
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setActiveId(activeChapterId);
  }, [activeChapterId]);

  // Scroll spy : met à jour l’item actif au scroll via IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll("[data-chapter-id]");
    if (elements.length === 0) return;

    const visible = new Map<Element, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).getAttribute("data-chapter-id");
          if (!id) return;
          if (entry.isIntersecting) {
            visible.set(entry.target, entry.intersectionRatio);
          } else {
            visible.delete(entry.target);
          }
        });

        if (visible.size === 0) return;
        let best: { id: string; ratio: number } | null = null;
        visible.forEach((ratio, el) => {
          const id = (el as HTMLElement).getAttribute("data-chapter-id");
          if (id && (best === null || ratio > best.ratio))
            best = { id, ratio };
        });
        if (best) {
          setActiveId(best.id);
          onActiveChapterChange?.(best.id);
        }
      },
      {
        root: null,
        rootMargin: "-5% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [onActiveChapterChange]);

  const handleClick = (chapterId: string) => {
    setActiveId(chapterId);
    onChapterClick?.(chapterId);
    onActiveChapterChange?.(chapterId);
    const element = document.querySelector(`[data-chapter-id="${chapterId}"]`);
    if (element)
      element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="section-indicator fixed right-6 top-1/2 z-40 -translate-y-1/2"
      aria-label="Chapitres"
    >
      <ul className="section-indicator-list flex flex-col gap-1 border-l-2 border-[#b30000]/20 pl-4">
        {chapters.map((chapter, index) => {
          const isActive = activeId === chapter.id;
          const key = chapterKeys[chapter.id];
          const title = key ? t(`chapters.${key}.title`) : chapter.title;
          return (
            <li key={chapter.id} className="section-item">
              <button
                type="button"
                onClick={() => handleClick(chapter.id)}
                data-active={isActive ? "true" : undefined}
                className={`
                  relative block w-full text-right transition-all duration-300 ease-out
                  ${isActive ? "opacity-100" : "opacity-70 hover:opacity-90"}
                `}
              >
                <span className="inline-flex items-center justify-end gap-2">
                  <span
                    className={`
                      tabular-nums shrink-0 transition-all duration-300
                      ${isActive ? "text-[#b30000] font-bold text-sm" : "text-[#6B7280] text-xs opacity-70"}
                    `}
                    style={{ minWidth: "18px" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`
                      max-w-[140px] truncate text-right transition-all duration-300
                      ${isActive ? "font-bold text-[#0B1220] text-sm" : "font-normal text-[#6B7280] text-xs opacity-80"}
                    `}
                  >
                    {title}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionIndicator;
