import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./hero-section.css";
import "./hero-codepen-card.css";
import "./hero-bg-carousel.css";
import ocpLogo from "@/assets/RULMECAASSETS/OCP_Group.svg";
import logoMenara from "@/assets/RULMECAASSETS/logo-menara-form.svg";
import sonasidLogo from "@/assets/RULMECAASSETS/sonasid-seeklogo.svg";
import novacimLogo from "@/assets/RULMECAASSETS/Novacim_idbS-3iUVT_1.svg";
import jesaLogo from "@/assets/RULMECAASSETS/JESA-vector.ma.svg-vector.ma.svg";
import groupeManagemLogo from "@/assets/RULMECAASSETS/groupe-managem-form.svg";
import { productImages } from "@/data/mock";

/* Accent grid layout (from hero-section.css / doc): horizontal 6,11,16,24,29em; vertical 24,34em + right 24,34em */
const ROW_EMS = [6, 11, 16, 24, 29];

/* Positions et timing des étoiles mini animées (répartition dans la hero) */
const MINI_STAR_POSITIONS: { x: number; y: number; delay: number; duration: number }[] = [
  { x: 12, y: 8, delay: 0, duration: 2200 },
  { x: 88, y: 14, delay: 400, duration: 2600 },
  { x: 22, y: 28, delay: 800, duration: 2400 },
  { x: 76, y: 22, delay: 200, duration: 2800 },
  { x: 8, y: 42, delay: 600, duration: 2000 },
  { x: 94, y: 38, delay: 1000, duration: 2300 },
  { x: 38, y: 12, delay: 300, duration: 2500 },
  { x: 62, y: 48, delay: 500, duration: 2100 },
  { x: 18, y: 52, delay: 700, duration: 2700 },
  { x: 82, y: 58, delay: 150, duration: 2200 },
  { x: 48, y: 32, delay: 900, duration: 2400 },
  { x: 52, y: 72, delay: 350, duration: 2600 },
  { x: 28, y: 68, delay: 550, duration: 2000 },
  { x: 72, y: 18, delay: 750, duration: 2300 },
  { x: 6, y: 78, delay: 250, duration: 2500 },
  { x: 96, y: 82, delay: 650, duration: 2100 },
  { x: 42, y: 62, delay: 450, duration: 2700 },
  { x: 58, y: 8, delay: 850, duration: 2200 },
  { x: 14, y: 92, delay: 150, duration: 2400 },
  { x: 86, y: 88, delay: 950, duration: 2600 },
];
const COL_EMS_LEFT = [24, 34];
const COL_EMS_RIGHT = [24, 34];
const FADE_IN_MS = 500;
const FADE_OUT_MS = 500;
const HOLD_MIN_MS = 2000;
const HOLD_MAX_MS = 5000;
const PARTICLE_SIZE = 1.5;
const PARTICLE_MAX_OPACITY = 0.35;

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const emPx = 16;

    const getSectionRect = (): DOMRect | null => {
      const section = canvas.parentElement;
      return section ? section.getBoundingClientRect() : null;
    };

    const setSize = () => {
      const rect = getSectionRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    /* Precompute grid intersection coordinates (accent lines layout). Section-local coords. */
    const computeGridIntersections = (): { x: number; y: number }[] => {
      const rect = getSectionRect();
      if (!rect) return [];
      const w = rect.width;
      const rowTops = ROW_EMS.map((em) => em * emPx);
      const colLefts = [
        ...COL_EMS_LEFT.map((em) => em * emPx),
        w - COL_EMS_RIGHT[1]! * emPx,
        w - COL_EMS_RIGHT[0]! * emPx,
      ];
      const points: { x: number; y: number }[] = [];
      for (let r = 0; r < rowTops.length; r++) {
        for (let c = 0; c < colLefts.length; c++) {
          points.push({ x: colLefts[c]!, y: rowTops[r]! });
        }
      }
      return points;
    };

    type Phase = "fadeIn" | "hold" | "fadeOut";

    class Particle {
      x: number;
      y: number;
      phase: Phase = "fadeIn";
      phaseStart: number;
      holdDuration: number;
      opacity: number = 0;

      constructor(x: number, y: number, phaseStartOffset: number = 0) {
        this.x = x;
        this.y = y;
        this.phaseStart = Date.now() + phaseStartOffset;
        this.holdDuration =
          HOLD_MIN_MS + Math.random() * (HOLD_MAX_MS - HOLD_MIN_MS);
      }

      update(now: number): void {
        const elapsed = (now - this.phaseStart) / 1000;
        if (this.phase === "fadeIn") {
          const t = Math.min(1, elapsed / (FADE_IN_MS / 1000));
          this.opacity = PARTICLE_MAX_OPACITY * easeInOut(t);
          if (t >= 1) {
            this.phase = "hold";
            this.phaseStart = now;
          }
        } else if (this.phase === "hold") {
          this.opacity = PARTICLE_MAX_OPACITY;
          if (elapsed * 1000 >= this.holdDuration) {
            this.phase = "fadeOut";
            this.phaseStart = now;
          }
        } else {
          const t = Math.min(1, elapsed / (FADE_OUT_MS / 1000));
          this.opacity = PARTICLE_MAX_OPACITY * (1 - easeInOut(t));
          if (t >= 1) {
            this.phase = "fadeIn";
            this.phaseStart = now;
            this.holdDuration =
              HOLD_MIN_MS + Math.random() * (HOLD_MAX_MS - HOLD_MIN_MS);
          }
        }
      }

      draw(): void {
        if (this.opacity <= 0) return;
        ctx.fillStyle = `rgba(140, 40, 40, ${this.opacity})`;
        ctx.fillRect(
          this.x - PARTICLE_SIZE / 2,
          this.y - PARTICLE_SIZE / 2,
          PARTICLE_SIZE,
          PARTICLE_SIZE
        );
      }
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      const points = computeGridIntersections();
      particles = points.map(
        (pt, i) =>
          new Particle(pt.x, pt.y, (i / Math.max(points.length, 1)) * 800)
      );
    };

    const start = () => {
      setSize();
      initParticles();
      animate();
    };
    requestAnimationFrame(() => {
      start();
    });

    const animate = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(now);
        p.draw();
      });
      animRef.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      setSize();
      const points = computeGridIntersections();
      if (points.length === particles.length) {
        points.forEach((pt, i) => {
          particles[i]!.x = pt.x;
          particles[i]!.y = pt.y;
        });
      } else {
        initParticles();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef]);
}

const CAROUSEL_ITEMS = productImages;
const CAROUSEL_AUTO_MS = 5000;

function getCarouselPositionClass(index: number, current: number, total: number): string {
  const offset = (index - current + total) % total;
  if (offset === 0) return "hero-bg-carousel-center";
  if (offset === 1) return "hero-bg-carousel-right-1";
  if (offset === 2) return "hero-bg-carousel-right-2";
  if (offset === total - 1) return "hero-bg-carousel-left-1";
  if (offset === total - 2) return "hero-bg-carousel-left-2";
  return "hero-bg-carousel-hidden";
}

const HeroSection = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const [bgCarouselIndex, setBgCarouselIndex] = useState(0);
  const [bgCarouselAnimating, setBgCarouselAnimating] = useState(false);
  useParticles(canvasRef);

  const updateBgCarousel = (newIndex: number) => {
    if (bgCarouselAnimating) return;
    setBgCarouselAnimating(true);
    setBgCarouselIndex((newIndex + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    setTimeout(() => setBgCarouselAnimating(false), 800);
  };

  /* Carrousel arrière-plan : rotation automatique */
  useEffect(() => {
    const id = setInterval(() => {
      setBgCarouselIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, CAROUSEL_AUTO_MS);
    return () => clearInterval(id);
  }, []);

  /* JS CodePen card : tilt au survol (telle quelle) */
  useEffect(() => {
    const ct = cardWrapRef.current?.querySelector<HTMLElement>(".container");
    if (!ct) return;
    let animationFrame: number;
    let easingActive = false;
    const easeOutQuad = (t: number) => t * (2 - t);
    const animateEasing = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      duration: number
    ) => {
      const startTime = performance.now();
      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentX = startX + (endX - startX) * easedProgress;
        const currentY = startY + (endY - startY) * easedProgress;
        ct.style.setProperty("--xv", String(currentX));
        ct.style.setProperty("--yv", String(currentY));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          easingActive = false;
        }
      };
      easingActive = true;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(animate);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (easingActive) return;
      const rect = ct.getBoundingClientRect();
      const se = 42;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * se;
      const rotateY = (x / rect.width - 0.5) * se;
      const currentX =
        parseFloat(getComputedStyle(ct).getPropertyValue("--xv")) || 0;
      const currentY =
        parseFloat(getComputedStyle(ct).getPropertyValue("--yv")) || 0;
      animateEasing(currentX, currentY, rotateX, rotateY, 100);
    };
    const onMouseLeave = () => {
      const currentX =
        parseFloat(getComputedStyle(ct).getPropertyValue("--xv")) || 0;
      const currentY =
        parseFloat(getComputedStyle(ct).getPropertyValue("--yv")) || 0;
      animateEasing(currentX, currentY, 0, 0, 200);
    };
    ct.addEventListener("mousemove", onMouseMove);
    ct.addEventListener("mouseleave", onMouseLeave);
    return () => {
      ct.removeEventListener("mousemove", onMouseMove);
      ct.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="hero-section-wrap relative h-screen min-h-[100vh] w-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="hero-canvas h-full w-full block"
        aria-hidden
      />

      <div className="accent-lines">
        <div>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* Carrousel horizontal en arrière-plan (format paysage, scrollable comme l’original) */}
      <div className="hero-bg-carousel-wrap" role="region" aria-label={t("hero.carouselLabel", "Carrousel visuel")}>
        <button
          type="button"
          className="hero-bg-carousel-nav hero-bg-carousel-nav-left"
          aria-label={t("hero.carouselPrev", "Précédent")}
          onClick={() => updateBgCarousel(bgCarouselIndex - 1)}
        >
          ‹
        </button>
        <div className="hero-bg-carousel-track">
          {CAROUSEL_ITEMS.map((src, i) => (
            <button
              type="button"
              key={i}
              className={`hero-bg-carousel-card ${getCarouselPositionClass(i, bgCarouselIndex, CAROUSEL_ITEMS.length)}`}
              data-index={i}
              onClick={() => updateBgCarousel(i)}
              aria-label={t("hero.carouselGoTo", { index: i + 1, total: CAROUSEL_ITEMS.length }, "Image {{index}} sur {{total}}")}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="hero-bg-carousel-nav hero-bg-carousel-nav-right"
          aria-label={t("hero.carouselNext", "Suivant")}
          onClick={() => updateBgCarousel(bgCarouselIndex + 1)}
        >
          ›
        </button>
        <div className="hero-bg-carousel-dots">
          {CAROUSEL_ITEMS.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`hero-bg-carousel-dot ${i === bgCarouselIndex ? "active" : ""}`}
              aria-label={t("hero.carouselGoTo", { index: i + 1, total: CAROUSEL_ITEMS.length }, "Image {{index}} sur {{total}}")}
              onClick={() => updateBgCarousel(i)}
              aria-current={i === bgCarouselIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Étoiles lumineuses à toutes les intersections (4 colonnes × 5 lignes) */}
      <div className="hero-grid-stars" aria-hidden>
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="hero-grid-star" />
        ))}
      </div>

      {/* Étoiles mini animées (twinkle) réparties dans la hero */}
      <div className="hero-mini-stars" aria-hidden>
        {MINI_STAR_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className="hero-mini-star"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${pos.delay}ms`,
              animationDuration: `${pos.duration}ms`,
            }}
          />
        ))}
      </div>

      <div className="heroSubP">
        <p>{t("hero.line")}</p>
      </div>

      <div className="hero">
        <div className="heroT">
          <h2>{t("hero.mainTitle")}</h2>
          <h2>{t("hero.mainTitle")}</h2>
        </div>
      </div>

      <p className="heroP">{t("hero.subtitle")}</p>

      {/* Card CodePen telle quelle (HTML/CSS/JS du doc) */}
      <div className="hero-codepen-card" ref={cardWrapRef}>
        <div className="container">
          <div className="vortex">
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501 297.81">
              <ellipse cx="251.32" cy="130.01" rx="248.36" ry="125.82" fill="none" stroke="#b30000" strokeMiterLimit={10} strokeWidth={2} />
              <ellipse cx="251.73" cy="150.5" rx="160.66" ry="81.39" fill="none" stroke="#b30000" strokeMiterLimit={10} strokeWidth={1.6} />
              <ellipse cx="251.43" cy="186.57" rx="107.6" ry="54.51" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m123.45,22.63c52.05,62.7,97.93,131.45,114.34,213.52.41,2.05,1.23,5.33,1.23,5.33,4.92,18.85,7.79,35.66,10.88,54.9" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m248.86,4.6c2.05,97.95,6.15,194.67,9.31,291.95" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m35.75,67.71c6.15,2.05,11.89,5.33,17.62,8.61,21.31,13.11,40.16,24.59,59.84,40.16,33.61,26.23,56.97,49.59,82.38,84.02,2.46,3.28,6.97,10.25,8.61,13.52,18.03,26.23,31.15,52.46,37.22,82.46" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m5.42,127.55c19.35,2.86,38.36,7.77,56.78,14.33,18.57,6.62,36.53,14.92,53.8,24.41,17.83,9.79,34.96,20.69,50.32,34.09,13.95,12.16,26.41,26.36,36.86,41.65,10.26,14.99,18.58,31.3,24.51,48.48.74,2.15,1.45,4.31,2.11,6.49" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m33.29,190.66c47.95-12.7,102.05-4.51,143.85,27.46,27.05,20.49,45.9,47.54,56.53,78.63" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m137.39,241.48c11.89-12.7,29.1-22.54,46.31-19.26,36.07,5.74,50.82,43.44,61.11,73.93" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m458.7,61.16c-46.31,23.36-84.84,58.61-119.26,98.77-10.66,13.11-18.85,25.41-27.05,39.34-17.21,31.15-31.15,63.11-36.91,98.23" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m495.58,115.25c-42.21,8.61-80.74,25.82-117.62,52.05-31.97,22.13-58.2,46.72-75.41,81.15-.82.82-2.05,3.69-2.87,4.51-8.2,14.75-13.52,28.28-18.2,44.71" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m479.19,180.01c-18.21-1.09-36.54-.34-54.6,2.23-18.1,2.57-35.95,6.98-53.15,13.19-17.54,6.34-34.66,14.39-49.94,25.16-12.74,8.98-24.38,19.6-34.01,31.88-9.22,11.75-16.53,25.03-21.02,39.3-.57,1.8-1.09,3.61-1.56,5.44" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m384.93,236.57c-14.34-13.52-34.84-25-55.33-16.8-31.97,13.11-50,45.9-60.17,77.81" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="3.37" cy="127.14" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <path d="m378.37,21.81c-33.2,38.93-57.79,84.02-77.46,131.56-18.85,45.9-31.15,94.26-36.16,143.74" fill="none" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="36.16" cy="67.3" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="33.7" cy="191.07" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="136.16" cy="242.71" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="384.52" cy="236.16" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="479.6" cy="180.42" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="497.63" cy="114.84" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="459.11" cy="60.75" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="377.96" cy="22.22" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="249.27" cy="3.37" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
              <circle cx="123.04" cy="22.22" r="2.87" fill="#b30000" stroke="#b30000" strokeMiterLimit={10} />
            </svg>
          </div>
          <div className="mist" />
          <div className="orbs">
            <div className="orb">
              <div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" />
              <img src={ocpLogo} alt="OCP Group" className="orb-logo-asset" />
            </div>
            <div className="orb">
              <div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" />
              <img src={logoMenara} alt="Menara" className="orb-logo-asset" />
            </div>
            <div className="orb">
              <div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" />
              <img src={sonasidLogo} alt="Sonasid" className="orb-logo-asset" />
            </div>
            <div className="orb">
              <div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" />
              <img src={novacimLogo} alt="Novacim" className="orb-logo-asset" />
            </div>
            <div className="orb">
              <div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" />
              <img src={jesaLogo} alt="JESA" className="orb-logo-asset" />
            </div>
            <div className="orb">
              <div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" /><div className="dot" />
              <img src={groupeManagemLogo} alt="Groupe Managem" className="orb-logo-asset" />
            </div>
            <div className="hide-orb" />
          </div>
          <div className="tilt" />
        </div>
      </div>

      <div className="hero-spacer" />
    </section>
  );
};

export default HeroSection;
