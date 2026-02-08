export interface Target {
  id: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  segment: "Mines" | "Carrières" | "Cimenteries";
  potentialScore: number; // 0-100
  status: "prospect" | "essai" | "validation" | "déploiement";
  chapterId?: string;
}

export interface Action {
  id: string;
  segment: "Mines" | "Carrières" | "Cimenteries";
  type: "marketing" | "commercial";
  title: string;
  budgetMAD: number;
  city: string;
  deliverables: string[];
  kpis: string[];
  status: "planifié" | "en cours" | "terminé";
  chapterId: string;
  owner?: string;
}

export interface Chapter {
  id: string;
  title: string;
  keyTargets: string[]; // target IDs
  keyActions: string[]; // action IDs
}

export const targets: Target[] = [
  // Mines
  {
    id: "target-1",
    name: "MANAGEM - Guemassa",
    city: "Marrakech",
    region: "Marrakech-Safi",
    lat: 31.6295,
    lng: -7.9811,
    segment: "Mines",
    potentialScore: 95,
    status: "validation",
    chapterId: "chapter-1",
  },
  {
    id: "target-2",
    name: "MANAGEM - Draa Lasfar",
    city: "El Jadida",
    region: "Casablanca-Settat",
    lat: 33.2316,
    lng: -8.5004,
    segment: "Mines",
    potentialScore: 88,
    status: "essai",
    chapterId: "chapter-1",
  },
  {
    id: "target-3",
    name: "OCP - Khouribga",
    city: "Khouribga",
    region: "Béni Mellal-Khénifra",
    lat: 32.8847,
    lng: -6.9061,
    segment: "Mines",
    potentialScore: 92,
    status: "déploiement",
    chapterId: "chapter-1",
  },
  {
    id: "target-4",
    name: "OCP - Benguerir",
    city: "Benguerir",
    region: "Marrakech-Safi",
    lat: 32.2306,
    lng: -7.9514,
    segment: "Mines",
    potentialScore: 90,
    status: "validation",
    chapterId: "chapter-1",
  },
  // Carrières
  {
    id: "target-5",
    name: "Carrière Tanger",
    city: "Tanger",
    region: "Tanger-Tétouan-Al Hoceïma",
    lat: 35.7595,
    lng: -5.8340,
    segment: "Carrières",
    potentialScore: 75,
    status: "prospect",
    chapterId: "chapter-2",
  },
  {
    id: "target-6",
    name: "Carrière Casablanca",
    city: "Casablanca",
    region: "Casablanca-Settat",
    lat: 33.5731,
    lng: -7.5898,
    segment: "Carrières",
    potentialScore: 82,
    status: "essai",
    chapterId: "chapter-2",
  },
  {
    id: "target-7",
    name: "Carrière Agadir",
    city: "Agadir",
    region: "Souss-Massa",
    lat: 30.4278,
    lng: -9.5981,
    segment: "Carrières",
    potentialScore: 70,
    status: "prospect",
    chapterId: "chapter-2",
  },
  // Cimenteries
  {
    id: "target-8",
    name: "Cimenterie Lafarge - Bouskoura",
    city: "Casablanca",
    region: "Casablanca-Settat",
    lat: 33.4569,
    lng: -7.6484,
    segment: "Cimenteries",
    potentialScore: 85,
    status: "validation",
    chapterId: "chapter-3",
  },
  {
    id: "target-9",
    name: "Cimenterie CIMAT - Fès",
    city: "Fès",
    region: "Fès-Meknès",
    lat: 34.0331,
    lng: -5.0003,
    segment: "Cimenteries",
    potentialScore: 80,
    status: "essai",
    chapterId: "chapter-3",
  },
  {
    id: "target-10",
    name: "Cimenterie ASMENT - Temara",
    city: "Rabat",
    region: "Rabat-Salé-Kénitra",
    lat: 33.9716,
    lng: -6.8498,
    segment: "Cimenteries",
    potentialScore: 78,
    status: "prospect",
    chapterId: "chapter-3",
  },
];

export const actions: Action[] = [
  // Marketing Actions
  {
    id: "action-1",
    segment: "Mines",
    type: "marketing",
    title: "Gadgets & Branding Terrain",
    budgetMAD: 45000,
    city: "Marrakech",
    deliverables: ["Kits sécurité RULMECA", "Banners site", "Vêtements équipe"],
    kpis: ["Visibilité 100% équipe", "Branding 12 mois"],
    status: "en cours",
    chapterId: "chapter-4",
    owner: "Marketing",
  },
  {
    id: "action-2",
    segment: "Mines",
    type: "marketing",
    title: "Échantillons & Démonstrations",
    budgetMAD: 120000,
    city: "Khouribga",
    deliverables: ["Kit démo complet", "Tests comparatifs", "Rapport ROI"],
    kpis: ["3 sites équipés test", "ROI > 15%"],
    status: "planifié",
    chapterId: "chapter-4",
    owner: "Technique",
  },
  {
    id: "action-3",
    segment: "Carrières",
    type: "marketing",
    title: "Workshops Maintenance/Sécurité",
    budgetMAD: 35000,
    city: "Tanger",
    deliverables: ["Formation équipes", "Manuels techniques", "Support 6 mois"],
    kpis: ["20+ participants", "Satisfaction > 90%"],
    status: "planifié",
    chapterId: "chapter-4",
    owner: "Formation",
  },
  {
    id: "action-4",
    segment: "Cimenteries",
    type: "marketing",
    title: "Tests Comparatifs + Rapports ROI",
    budgetMAD: 85000,
    city: "Casablanca",
    deliverables: ["Benchmark performance", "Analyse coûts", "Recommandations"],
    kpis: ["Réduction pannes 30%", "ROI 18 mois"],
    status: "en cours",
    chapterId: "chapter-4",
    owner: "Technique",
  },
  // Commercial Actions
  {
    id: "action-5",
    segment: "Mines",
    type: "commercial",
    title: "Visite Prospection MANAGEM",
    budgetMAD: 15000,
    city: "Marrakech",
    deliverables: ["Audit site", "Proposition technique", "Devis"],
    kpis: ["Pipeline: 2M MAD", "Délai réponse < 48h"],
    status: "terminé",
    chapterId: "chapter-5",
    owner: "Commercial",
  },
  {
    id: "action-6",
    segment: "Mines",
    type: "commercial",
    title: "Suivi Essai OCP Khouribga",
    budgetMAD: 25000,
    city: "Khouribga",
    deliverables: ["Monitoring performance", "Rapport mensuel", "Optimisation"],
    kpis: ["Uptime > 98%", "Validation client"],
    status: "en cours",
    chapterId: "chapter-5",
    owner: "Commercial",
  },
  {
    id: "action-7",
    segment: "Carrières",
    type: "commercial",
    title: "Déploiement Carrière Casablanca",
    budgetMAD: 180000,
    city: "Casablanca",
    deliverables: ["Installation complète", "Formation", "Garantie 24 mois"],
    kpis: ["3 lignes équipées", "Livraison < 30 jours"],
    status: "planifié",
    chapterId: "chapter-5",
    owner: "Projet",
  },
  {
    id: "action-8",
    segment: "Cimenteries",
    type: "commercial",
    title: "Visite CIMAT Fès",
    budgetMAD: 12000,
    city: "Fès",
    deliverables: ["Présentation produits", "Audit besoins", "Proposition"],
    kpis: ["Pipeline: 1.5M MAD", "Décision Q2"],
    status: "terminé",
    chapterId: "chapter-5",
    owner: "Commercial",
  },
];

// Ordre narratif obligatoire : deck exécutif implantation bureau
export const chapters: Chapter[] = [
  { id: "chapter-1", title: "Vision & Cadre", keyTargets: [], keyActions: [] },
  { id: "chapter-2", title: "Marché & Opportunité", keyTargets: ["target-1", "target-3", "target-5"], keyActions: [] },
  { id: "chapter-3", title: "Structuration locale", keyTargets: ["target-1", "target-6", "target-8"], keyActions: ["action-1", "action-5"] },
  { id: "chapter-4", title: "Couverture territoriale", keyTargets: ["target-1", "target-2", "target-3", "target-4", "target-5", "target-6", "target-7", "target-8", "target-9", "target-10"], keyActions: [] },
  { id: "chapter-5", title: "Plan marketing", keyTargets: ["target-8", "target-9"], keyActions: ["action-1", "action-2", "action-3", "action-4"] },
  { id: "chapter-6", title: "Plan commercial terrain", keyTargets: ["target-1", "target-3", "target-6", "target-9"], keyActions: ["action-5", "action-6", "action-7", "action-8"] },
  { id: "chapter-7", title: "Organisation & moyens", keyTargets: [], keyActions: [] },
  { id: "chapter-8", title: "Feuille de route", keyTargets: [], keyActions: ["action-1", "action-2", "action-3", "action-4", "action-5", "action-6", "action-7", "action-8"] },
  { id: "chapter-9", title: "Engagement & investissement", keyTargets: [], keyActions: [] },
];

// Images produits (à utiliser dans les carrousels)
import rulmecaHero from "@/assets/RULMECAASSETS/RULMECAHERO.png";
import homeBulk from "@/assets/RULMECAASSETS/HOME_BULK.jpeg";
import siteOCP from "@/assets/RULMECAASSETS/SITEOCP.jpeg";
import siteMinier from "@/assets/RULMECAASSETS/SITEMINIER.jpeg";
import siteCarriere from "@/assets/RULMECAASSETS/SITECARRIERE.jpeg";
import siteManagem from "@/assets/RULMECAASSETS/SITEMANAGEM.jpeg";

export const productImages = [
  rulmecaHero,
  homeBulk,
  siteOCP,
  siteMinier,
  siteCarriere,
  siteManagem,
];

// Images preuves
import bgLocalAssembly from "@/assets/RULMECAASSETS/bg-local-assembly.jpeg";
import transportMarchandise from "@/assets/RULMECAASSETS/TRANSPORTMARCHANDISE.jpeg";
import safetyProblems from "@/assets/RULMECAASSETS/how-to-solve-conveyor-drive-safety-problems-header.jpeg";
import ogImage from "@/assets/RULMECAASSETS/ogimage.jpeg";
import contrefaconImg from "@/assets/RULMECAASSETS/contrefaçon.png";
import trahisonConfianceImg from "@/assets/RULMECAASSETS/trahisonconfiance.png";
import blocagePortImg from "@/assets/RULMECAASSETS/blocageport.png";
import qualiteLocalImg from "@/assets/RULMECAASSETS/qualitelocal.png";

export const proofImages = [
  bgLocalAssembly,
  transportMarchandise,
  safetyProblems,
  ogImage,
];

// Étapes Histoire ABILIS — carousel full-page (scroll vertical → horizontal)
export interface AbilisStoryStep {
  id: string;
  year: string;
  titleKey: string;
  shortTextKey: string;
  icon: string; // lucide icon name
  circleColor: string; // Tailwind class or hex
  image: string;
}

export const abilisStorySteps: AbilisStoryStep[] = [
  {
    id: "2019",
    year: "2019",
    titleKey: "story.2019.title",
    shortTextKey: "story.2019.short",
    icon: "Car",
    circleColor: "#EAB308",
    image: rulmecaHero,
  },
  {
    id: "2024",
    year: "2024",
    titleKey: "story.2024.title",
    shortTextKey: "story.2024.short",
    icon: "Package",
    circleColor: "#F97316",
    image: homeBulk,
  },
  {
    id: "2026",
    year: "2026",
    titleKey: "story.2026.title",
    shortTextKey: "story.2026.short",
    icon: "Factory",
    circleColor: "#3B82F6",
    image: siteMinier,
  },
  {
    id: "bureau",
    year: "",
    titleKey: "story.bureau.title",
    shortTextKey: "story.bureau.short",
    icon: "Building2",
    circleColor: "#EC4899",
    image: siteCarriere,
  },
  {
    id: "2026-03",
    year: "2026-03",
    titleKey: "story.202603.title",
    shortTextKey: "story.202603.short",
    icon: "Flag",
    circleColor: "#22C55E",
    image: ogImage,
  },
];

// Section Réalité du marché marocain — timeline verticale (thèmes = défis / troubles du marché)
export interface MarketRealityTimelineStep {
  id: string;
  themeTitleKey: string;
  leftTextKey: string;
  rightTextKey: string;
  imageLeft: string;
  imageRight: string;
  /** Libellés des pastilles alerte / confetti sur l’image */
  alertLabels?: string[];
}

export const marketRealityTimelineSteps: MarketRealityTimelineStep[] = [
  {
    id: "contrefacon",
    themeTitleKey: "marketReality.timeline.contrefacon.theme",
    leftTextKey: "marketReality.timeline.contrefacon.left",
    rightTextKey: "marketReality.timeline.contrefacon.right",
    imageLeft: contrefaconImg,
    imageRight: contrefaconImg,
    alertLabels: ["Conformité", "Origine", "Alerte"],
  },
  {
    id: "trahison-confiance",
    themeTitleKey: "marketReality.timeline.trahisonConfiance.theme",
    leftTextKey: "marketReality.timeline.trahisonConfiance.left",
    rightTextKey: "marketReality.timeline.trahisonConfiance.right",
    imageLeft: trahisonConfianceImg,
    imageRight: trahisonConfianceImg,
    alertLabels: ["Engagements", "Paiements", "Risque"],
  },
  {
    id: "blocages-logistiques",
    themeTitleKey: "marketReality.timeline.blocagesLogistiques.theme",
    leftTextKey: "marketReality.timeline.blocagesLogistiques.left",
    rightTextKey: "marketReality.timeline.blocagesLogistiques.right",
    imageLeft: blocagePortImg,
    imageRight: blocagePortImg,
    alertLabels: ["Port", "Douane", "Blocage"],
  },
  {
    id: "production-locale",
    themeTitleKey: "marketReality.timeline.productionLocale.theme",
    leftTextKey: "marketReality.timeline.productionLocale.left",
    rightTextKey: "marketReality.timeline.productionLocale.right",
    imageLeft: qualiteLocalImg,
    imageRight: qualiteLocalImg,
    alertLabels: ["Qualité", "Standards", "Endurance"],
  },
];
