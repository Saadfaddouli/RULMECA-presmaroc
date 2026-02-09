import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const RULMECA_LOGO_URL =
  "https://rulmecacorp.com/wp-content/uploads/2023/01/Rulmeca-logo-Horiz-payoff-newsletter-masthead.jpg";

const logoFontFamily = "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "it" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-rulmeca-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto pl-6 pr-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo ABILIS INDUSTRIE — à l'extrême gauche, en rouge */}
          <a
            href="#"
            className="flex items-baseline gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 text-rulmeca-red hover:opacity-90"
            style={{
              fontFamily: logoFontFamily,
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: "0.05em",
              lineHeight: 1.25,
            }}
          >
            <span className="uppercase">Abilis</span>
            <span
              className="uppercase font-semibold opacity-90"
              style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}
            >
              Industrie
            </span>
          </a>

          {/* Logo RULMECA — à l'opposé d'ABILIS (droite) + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="flex items-center shrink-0"
              aria-label="RULMECA"
            >
              <img
                src={RULMECA_LOGO_URL}
                alt="RULMECA"
                className="h-8 w-auto max-h-9 object-contain [mix-blend-mode:darken]"
              />
            </a>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-medium transition-all text-rulmeca-muted hover:text-rulmeca-text border border-rulmeca-border rounded-md hover:bg-rulmeca-alt"
            >
              {i18n.language === "fr" ? "FR" : "IT"}
            </button>
          </div>

          {/* Mobile : logo RULMECA + bouton menu */}
          <div className="flex md:hidden items-center gap-2">
            <a href="#" className="flex items-center shrink-0" aria-label="RULMECA">
              <img
                src={RULMECA_LOGO_URL}
                alt="RULMECA"
                className="h-7 w-auto max-h-8 object-contain [mix-blend-mode:darken]"
              />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-rulmeca-text"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="py-4 space-y-4">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Langue: {i18n.language === "fr" ? "FR" : "IT"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
