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
// Images Histoire ABILIS (steps)
import firstStepImage from "@/assets/RULMECAASSETS/1firstStep.png";
import step1History from "@/assets/RULMECAASSETS/step1history.png";
import step2History from "@/assets/RULMECAASSETS/step2history.png";
import step3History from "@/assets/RULMECAASSETS/Step3History.png";
import step4History from "@/assets/RULMECAASSETS/Step4History.png";
import step5History from "@/assets/RULMECAASSETS/Step5History.png";

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
    id: "2021",
    year: "2021",
    titleKey: "story.2021.title",
    shortTextKey: "story.2021.short",
    icon: "Car",
    circleColor: "#EAB308",
    image: firstStepImage,
  },
  {
    id: "2022",
    year: "2022",
    titleKey: "story.2022.title",
    shortTextKey: "story.2022.short",
    icon: "Flag",
    circleColor: "#F97316",
    image: step2History,
  },
  {
    id: "2023",
    year: "2023",
    titleKey: "story.2023.title",
    shortTextKey: "story.2023.short",
    icon: "Flag",
    circleColor: "#3B82F6",
    image: step3History,
  },
  {
    id: "bureau",
    year: "",
    titleKey: "story.bureau.title",
    shortTextKey: "story.bureau.short",
    icon: "Building2",
    circleColor: "#EC4899",
    image: step4History,
  },
  {
    id: "2026",
    year: "2026",
    titleKey: "story.2026.title",
    shortTextKey: "story.2026.short",
    icon: "Package",
    circleColor: "#22C55E",
    image: step5History,
  },
  {
    id: "2026-03",
    year: "Mars 2026",
    titleKey: "story.202603.title",
    shortTextKey: "story.202603.short",
    icon: "Factory",
    circleColor: "#b30000",
    image: rulmecaHero,
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

// Répartition par typologie — colonnes type Kanban (Cimenteries, Mines, OCP, Énergie)
export type TypologyKey = "cimenteries" | "mines" | "ocp" | "energie";

export type TypologyClientLogoKey =
  | "ocp"
  | "novacim"
  | "managem"
  | "lafarge"
  | "cimentsDuMaroc"
  | "cimat"
  | "aya"
  | "cmt"
  | "sacem"
  | "ofas"
  | "safiec"
  | "taqa"
  | null;

export type ProspectStatus = "new" | "inProgress" | "done";

export interface TypologyClient {
  id: string;
  nameKey: string;
  logoKey: TypologyClientLogoKey | null;
  cityKey: string;
  prospectStatus: ProspectStatus;
  descriptionKey?: string;
}

export interface TypologyGroup {
  key: TypologyKey;
  labelKey: string;
  clients: TypologyClient[];
}

export const typologyGroups: TypologyGroup[] = [
  {
    key: "cimenteries",
    labelKey: "marketReality.typologyCimenteries",
    clients: [
      { id: "novacim", nameKey: "marketReality.clientNovacim", logoKey: "novacim", cityKey: "marketReality.citySafi", prospectStatus: "inProgress", descriptionKey: "marketReality.prospectNovacim" },
      { id: "lafarge", nameKey: "marketReality.clientLafarge", logoKey: "lafarge", cityKey: "marketReality.cityCasablanca", prospectStatus: "done", descriptionKey: "marketReality.prospectLafarge" },
      { id: "ciments-du-maroc", nameKey: "marketReality.clientCimentsDuMaroc", logoKey: "cimentsDuMaroc", cityKey: "marketReality.cityAgadir", prospectStatus: "inProgress", descriptionKey: "marketReality.prospectCimentsDuMaroc" },
      { id: "cimat", nameKey: "marketReality.clientCimat", logoKey: "cimat", cityKey: "marketReality.citySettat", prospectStatus: "new", descriptionKey: "marketReality.prospectCimat" },
    ],
  },
  {
    key: "mines",
    labelKey: "marketReality.typologyMines",
    clients: [
      { id: "managem", nameKey: "marketReality.clientManagem", logoKey: "managem", cityKey: "marketReality.cityMarrakech", prospectStatus: "done", descriptionKey: "marketReality.prospectManagem" },
      { id: "aya", nameKey: "marketReality.clientAya", logoKey: "aya", cityKey: "marketReality.cityKhouribga", prospectStatus: "inProgress", descriptionKey: "marketReality.prospectAya" },
      { id: "cmt", nameKey: "marketReality.clientCmt", logoKey: "cmt", cityKey: "marketReality.cityElJadida", prospectStatus: "new", descriptionKey: "marketReality.prospectCmt" },
      { id: "sacem", nameKey: "marketReality.clientSacem", logoKey: "sacem", cityKey: "marketReality.cityBenguerir", prospectStatus: "inProgress", descriptionKey: "marketReality.prospectSacem" },
    ],
  },
  {
    key: "ocp",
    labelKey: "marketReality.typologyOcp",
    clients: [
      { id: "ofas", nameKey: "marketReality.clientOfas", logoKey: "ofas", cityKey: "marketReality.cityKhouribga", prospectStatus: "done", descriptionKey: "marketReality.prospectOfas" },
      { id: "ocp", nameKey: "marketReality.clientOcp", logoKey: "ocp", cityKey: "marketReality.cityCasablanca", prospectStatus: "done", descriptionKey: "marketReality.prospectOcp" },
    ],
  },
  {
    key: "energie",
    labelKey: "marketReality.typologyEnergie",
    clients: [
      { id: "safiec", nameKey: "marketReality.clientSafiec", logoKey: "safiec", cityKey: "marketReality.citySafi", prospectStatus: "inProgress", descriptionKey: "marketReality.prospectSafiec" },
      { id: "taqa", nameKey: "marketReality.clientTaqa", logoKey: "taqa", cityKey: "marketReality.cityCasablanca", prospectStatus: "new", descriptionKey: "marketReality.prospectTaqa" },
    ],
  },
];
