import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Globe,
} from "lucide-react";
import logoAtlantique from "@/assets/logoatlantique.avif";
import backgroundBas from "@/assets/background_bas.png";

const ContactFooter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    pack: "",
    message: "",
  });

  // Load selected pack from sessionStorage on mount
  useEffect(() => {
    const selectedPack = sessionStorage.getItem("selectedPack");
    if (selectedPack) {
      const packNames: { [key: string]: string } = {
        pack1: "Pack 1",
        pack2: "Pack 2",
        pack3: "Pack 3",
      };
      setFormData((prev) => ({
        ...prev,
        pack: packNames[selectedPack] || "",
      }));
      // Clear sessionStorage after reading
      sessionStorage.removeItem("selectedPack");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert(
      "Merci pour votre demande de partenariat ! Nous vous recontacterons dans les plus brefs délais pour finaliser votre adhésion."
    );
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      pack: "",
      message: "",
    });
  };

  return (
    <footer id="contact" className="text-white relative overflow-hidden">
      <div
        className="relative z-10 min-h-screen bg-cover bg-center bg-no-repeat pt-20 pb-12"
        style={{ backgroundImage: `url(${backgroundBas})` }}
      >
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-block bg-white/20 text-white border-white/40">
            Demande de Partenariat
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl mb-4 text-white">
            CONFIRMEZ VOTRE <span className="text-sky-300">PARTENARIAT</span>
          </h2>
          <p className="font-body text-white/80 text-lg max-w-2xl mx-auto">
            Remplissez ce formulaire pour confirmer votre demande de partenariat.
            Notre équipe vous recontactera pour finaliser les modalités de votre
            adhésion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Nom complet <span className="text-sky-300">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                  placeholder="Votre nom complet"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Email professionnel <span className="text-sky-300">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                  placeholder="contact@entreprise.ma"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Entreprise <span className="text-sky-300">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                  placeholder="Nom de votre entreprise"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Téléphone <span className="text-sky-300">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                  placeholder="+212 6XX XXX XXX"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Pack sélectionné <span className="text-sky-300">*</span>
              </label>
              <select
                value={formData.pack}
                onChange={(e) =>
                  setFormData({ ...formData, pack: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                required
              >
                <option value="">Sélectionnez un pack</option>
                <option value="Pack 1">Pack 1 - 60 000 DH/HT</option>
                <option value="Pack 2">Pack 2 - 250 000 DH/HT</option>
                <option value="Pack 3">Pack 3 - 350 000 DH/HT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Message complémentaire
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors resize-none"
                placeholder="Informations complémentaires ou questions spécifiques..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-ocean-gradient text-primary-foreground font-display font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Confirmer ma demande de partenariat
              <Send className="w-5 h-5" />
            </button>
            <p className="text-xs text-white/60 text-center mt-2">
              En soumettant ce formulaire, vous confirmez votre intérêt pour
              devenir partenaire de l'Atlantique Club.
            </p>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl mb-6 text-white">
                Informations
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:direction@atlantiqueclub.ma"
                  className="flex items-center gap-4 text-white/90 hover:text-sky-300 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>direction@atlantiqueclub.ma</span>
                </a>
                <div className="flex items-center gap-4 text-white/90">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Mme Ibtissam</p>
                    <a
                      href="tel:+212666625218"
                      className="hover:text-sky-300 transition-colors"
                    >
                      +212 666 62 52 18
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white/90">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>
                    Boulevard de la Corniche
                    <br />
                    Ain Diab, Casablanca, Maroc
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl mb-6 text-white">
                Suivez-nous
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="https://www.instagram.com/atlantiqueclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-full hover:bg-sky-400/50 transition-colors text-white"
                  aria-label="Instagram Atlantique Club"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.atlantiqueclub.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/90 hover:text-sky-300 transition-colors"
                >
                  <span className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-full">
                    <Globe className="w-5 h-5" />
                  </span>
                  <span>www.atlantiqueclub.ma</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logoAtlantique}
                alt="Atlantique Club"
                className="h-10 w-auto opacity-90"
              />
              <p className="text-sm text-white/70">
                © 2025 Atlantique Club. Tous droits réservés.
              </p>
            </div>
            <p className="text-sm text-white/70">
              Présentation Pack Sponsoring - Destinataire: SKODA Partenaires{" "}
              <span className="text-white font-semibold">
                ŠKODA
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
