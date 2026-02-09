import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./hero-section.css";
import siteMinierImage from "@/assets/RULMECAASSETS/SITEMINIER.jpeg";

/* Texte du ruban animé en boucle (répété pour l'animation infinie) */
const HeroSection = () => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const tapeLoop = t("hero.tapeLoop");

  /* Découpage des mots en caractères pour l’effet hover (comme hero_codepen_idea.md) */
  useEffect(() => {
    const container = titleContainerRef.current;
    if (!container) return;
    const words = container.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const text = word.innerText;
      word.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.classList.add("char");
        span.innerText = char;
        word.appendChild(span);
      });
    });
  }, [i18n.language]);

  const welcomeImageUrl =
    "https://cdn.bergamonews.it/photogallery_new/images/2016/05/marzio-zirafa-540498.jpg";
  const italyFlagUrl =
    "https://static.vecteezy.com/system/resources/previews/051/691/102/non_2x/italy-country-round-flag-free-png.png";

  return (
    <section
      id="hero-section"
      className="hero-section-wrap hero-codepen-style relative h-screen min-h-[100vh] w-full overflow-hidden"
      style={{
        backgroundImage: `url(${siteMinierImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-section-bg-overlay" aria-hidden />
      <div className="hero">
        <div className="hero-title-container" ref={titleContainerRef}>
          <p className="hero-title-subtitle">{t("hero.titleSubtitle")}</p>
          <h1>
            <div className="word">{t("hero.titleAbilis")}</div>
            <br />
            <div className="word">{t("hero.titleIndustrie")}</div>
          </h1>
          <p className="hero-department">{t("hero.department")}</p>
        </div>

        {/* Card bienvenue — uniquement dans la hero, non sticky */}
        <div className="hero-welcome-card">
          <p className="hero-welcome-card__welcome">{t("hero.welcome")}</p>
          <img
            src={welcomeImageUrl}
            alt="Marzio Zirafa"
            className="hero-welcome-card__image"
          />
          <div className="hero-welcome-card__name-row">
            <img
              src={italyFlagUrl}
              alt="Italie"
              className="hero-welcome-card__flag"
            />
            <p className="hero-welcome-card__title">Marzio Zirafa</p>
          </div>
          <p className="hero-welcome-card__date">10/02/2026</p>
        </div>

        <div className="tape-wrapper">
          <div className="tape-text" aria-hidden>
            {tapeLoop.repeat(4)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
