import beautyProducts from "@/assets/beauty-products.jpg";
import categorySkincare from "@/assets/category-skincare.jpg";
import categoryMakeup from "@/assets/category-makeup.jpg";
import brandBlue from "@/assets/brand-blue.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productBlush from "@/assets/product-blush.jpg";
import productFoundation from "@/assets/product-foundation.jpg";
import productTinted from "@/assets/product-tinted.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productMatte from "@/assets/product-matte.jpg";
import knowledge1 from "@/assets/knowledge-1.jpg";
import knowledge2 from "@/assets/knowledge-2.jpg";
import knowledge3 from "@/assets/knowledge-3.jpg";
import knowledge4 from "@/assets/knowledge-4.jpg";
import knowledge5 from "@/assets/knowledge-5.jpg";
import brandDolce from "@/assets/brands/dolce-gabbana.png.asset.json";
import brandBareminerals from "@/assets/brands/bareminerals.svg.asset.json";
import brandRimmel from "@/assets/brands/rimmel.svg.asset.json";
import brandSisley from "@/assets/brands/sisley.svg.asset.json";

export type ModuleStatus = "not-started" | "in-progress" | "completed";

export type KnowledgeCard = {
  id: string;
  index: number;
  title: string;
  status: ModuleStatus;
  progress: number;
  image: string;
  bullets: string[];
  keyIngredients: { name: string; description: string }[];
};

export type Module = {
  id: string;
  brand: string;
  category: string;
  categoryId: string;
  title: string;
  image: string;
  completed: number;
  total: number;
  cards: KnowledgeCard[];
};

const cardImages = [knowledge1, knowledge2, knowledge3, knowledge4, knowledge5];

const baseCards = (): KnowledgeCard[] => [
  {
    id: "1", index: 1, title: "Setting Ringan & Kontrol Minyak",
    status: "not-started", progress: 0, image: cardImages[0],
    bullets: [
      "Mengunci makeup tanpa terasa berat",
      "Menyerap minyak berlebih untuk mengurangi kilap",
      "Tidak mengubah warna foundation",
    ],
    keyIngredients: [
      { name: "Talc", description: "menyerap minyak & bantu setting makeup" },
      { name: "Nylon-12", description: "memberi efek halus & oil control" },
    ],
  },
  {
    id: "2", index: 2, title: "Tekstur Halus & Formula Ringan",
    status: "completed", progress: 100, image: cardImages[1],
    bullets: [
      "Formula super halus, hampir tidak terasa di kulit",
      "Ringan dan breathable sepanjang hari",
      "Cocok untuk touch-up berulang",
    ],
    keyIngredients: [
      { name: "Silica", description: "memberi efek soft-focus pada kulit" },
      { name: "Mica", description: "menambah cahaya alami yang halus" },
    ],
  },
  {
    id: "3", index: 3, title: "Tahan Lama & Anti Kilap",
    status: "completed", progress: 100, image: cardImages[2],
    bullets: [
      "Menahan makeup hingga 24 jam",
      "Bebas kilap di area T-zone",
      "Hasil akhir matte yang natural",
    ],
    keyIngredients: [
      { name: "Polymer Blend", description: "memberi daya tahan lama" },
      { name: "Kaolin Clay", description: "kontrol kilap sepanjang hari" },
    ],
  },
  {
    id: "4", index: 4, title: "Hasil Soft Matte & Blur Effect",
    status: "in-progress", progress: 50, image: cardImages[3],
    bullets: [
      "Memberi hasil soft matte yang flattering",
      "Mengaburkan pori dan tekstur kulit",
      "Cocok dipakai sebelum touch-up",
    ],
    keyIngredients: [
      { name: "Boron Nitride", description: "blur effect halus" },
      { name: "Silica Beads", description: "menghaluskan tekstur kulit" },
    ],
  },
  {
    id: "5", index: 5, title: "Cocok untuk Kulit Normal–Berminyak",
    status: "completed", progress: 100, image: cardImages[4],
    bullets: [
      "Ideal untuk kulit normal hingga berminyak",
      "Tidak menyumbat pori",
      "Dapat dipakai sebagai setting atau touch-up",
    ],
    keyIngredients: [
      { name: "Zinc Oxide", description: "menenangkan kulit berminyak" },
      { name: "Rice Powder", description: "menyerap minyak alami" },
    ],
  },
];

const productImagePool = [
  productPowder, productBlush, productFoundation, productTinted, productLipstick, productMatte,
  beautyProducts, categoryMakeup, categorySkincare, brandBlue,
];

const categoryNameMap: Record<string, string> = {
  "skin-care": "SKIN CARE",
  "makeup": "MAKEUP",
  "fragrance": "FRAGRANCE",
  "wellness": "WELLNESS",
  "hair-care": "HAIR CARE",
  "body-care": "BODY CARE",
};

// ── Laura Mercier ────────────────────────────────────────────────────────────
const lauraBase: Module[] = [
  { id: "translucent-loose-setting-powder", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Translucent Loose Setting Powder", image: productPowder, completed: 3, total: 5, cards: baseCards() },
  { id: "blush-colour-infusion", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Blush Colour Infusion", image: productBlush, completed: 2, total: 4, cards: baseCards().slice(0, 4) },
  { id: "real-flawless-foundation", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Real Flawless Foundation", image: productFoundation, completed: 0, total: 5, cards: baseCards() },
  { id: "tinted-moisturizer", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Tinted Moisturizer Natural Skin", image: productTinted, completed: 1, total: 5, cards: baseCards() },
  { id: "caviar-hydra-lipstick", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Caviar Hydra-Crème Lipstick", image: productLipstick, completed: 1, total: 7, cards: baseCards() },
  { id: "real-flawless-feather-matte", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Real Flawless Feather Matte", image: productMatte, completed: 0, total: 4, cards: baseCards().slice(0, 4) },
];

const lauraExtra: { t: string; c: string }[] = [
  { t: "Silk Crème Lip Hydrator", c: "makeup" },
  { t: "Velvet Matte Lip Crayon", c: "makeup" },
  { t: "Caviar Stick Eye Colour", c: "makeup" },
  { t: "Pure Canvas Primer Hydrating", c: "skin-care" },
  { t: "Smooth Finish Flawless Fluide", c: "skin-care" },
  { t: "Translucent Pressed Setting", c: "makeup" },
  { t: "Rouge Essentiel Lipstick", c: "makeup" },
  { t: "Secret Concealer Soft", c: "makeup" },
  { t: "Loose Highlighter Powder", c: "makeup" },
  { t: "Eye Art Caviar Palette", c: "makeup" },
];

const lauraFiller: Module[] = lauraExtra.map((x, i) => ({
  id: `lm-module-${i + 7}`,
  brand: "Laura Mercier",
  category: categoryNameMap[x.c],
  categoryId: x.c,
  title: x.t,
  image: productImagePool[i % productImagePool.length],
  completed: (i * 2) % 5,
  total: 5,
  cards: baseCards(),
}));

// ── Dolce & Gabbana ──────────────────────────────────────────────────────────
const dolceModules: { t: string; c: string; img: string }[] = [
  { t: "The Only One Eau de Parfum", c: "fragrance", img: beautyProducts },
  { t: "Light Blue Summer Vibes", c: "fragrance", img: brandBlue },
  { t: "The One Rose EDP", c: "fragrance", img: categorySkincare },
  { t: "Intenso Pour Homme", c: "fragrance", img: categoryMakeup },
  { t: "Perfect Luminous Liquid Foundation", c: "makeup", img: productFoundation },
  { t: "Passioneyes Mascara Volume", c: "makeup", img: productBlush },
  { t: "Intenseyes Precise Liner", c: "makeup", img: productMatte },
  { t: "Dolce Shinissimo Lip Gloss", c: "makeup", img: productLipstick },
];

const dolceFiller: Module[] = dolceModules.map((x, i) => ({
  id: `dg-module-${i + 1}`,
  brand: "Dolce & Gabbana",
  category: categoryNameMap[x.c],
  categoryId: x.c,
  title: x.t,
  image: x.img,
  completed: i % 3 === 0 ? 5 : i % 3 === 1 ? 2 : 0,
  total: 5,
  cards: baseCards(),
}));

// ── bareMinerals ─────────────────────────────────────────────────────────────
const bareMineralsModules: { t: string; c: string; img: string }[] = [
  { t: "Original Loose Powder Foundation", c: "makeup", img: productPowder },
  { t: "BarePro Performance Wear Foundation", c: "makeup", img: productFoundation },
  { t: "Gen Nude Butter Lipstick", c: "makeup", img: productLipstick },
  { t: "Mineral Veil Finishing Powder", c: "makeup", img: productMatte },
  { t: "Complexion Rescue Tinted Moisturizer", c: "skin-care", img: productTinted },
  { t: "Skinlongevity Vital Power Eye Gel", c: "skin-care", img: categorySkincare },
  { t: "Ageless Phyto-Retinol Face Cream", c: "skin-care", img: beautyProducts },
  { t: "Purifying Face Mask", c: "wellness", img: categoryMakeup },
];

const bareFiller: Module[] = bareMineralsModules.map((x, i) => ({
  id: `bm-module-${i + 1}`,
  brand: "bareMinerals",
  category: categoryNameMap[x.c],
  categoryId: x.c,
  title: x.t,
  image: x.img,
  completed: i % 4 === 0 ? 5 : i % 4 === 1 ? 3 : 0,
  total: 5,
  cards: baseCards(),
}));

// ── Rimmel ───────────────────────────────────────────────────────────────────
const rimmelModules: { t: string; c: string; img: string }[] = [
  { t: "Stay Matte Pressed Powder", c: "makeup", img: productPowder },
  { t: "Lasting Finish Lipstick", c: "makeup", img: productLipstick },
  { t: "ScandalEyes Mascara", c: "makeup", img: productBlush },
  { t: "Wonder'full Eyebrow Mascara", c: "makeup", img: productMatte },
  { t: "Kind & Free Foundation", c: "makeup", img: productFoundation },
  { t: "Lasting Finish Foundation", c: "makeup", img: categoryMakeup },
  { t: "Fix & Go Brow Gel", c: "makeup", img: brandBlue },
  { t: "Moisture Renew Lip Colour", c: "makeup", img: beautyProducts },
];

const rimmelFiller: Module[] = rimmelModules.map((x, i) => ({
  id: `rm-module-${i + 1}`,
  brand: "Rimmel",
  category: categoryNameMap[x.c],
  categoryId: x.c,
  title: x.t,
  image: x.img,
  completed: i % 3 === 0 ? 5 : 0,
  total: 5,
  cards: baseCards(),
}));

// ── Sisley ───────────────────────────────────────────────────────────────────
const sisleyModules: { t: string; c: string; img: string }[] = [
  { t: "Black Rose Cream Mask", c: "skin-care", img: categorySkincare },
  { t: "Hydra-Global Intense Anti-Aging", c: "skin-care", img: beautyProducts },
  { t: "L'Intégral Anti-Âge Eye", c: "skin-care", img: productTinted },
  { t: "Phyto-Blanc Lightening Essence", c: "skin-care", img: categoryMakeup },
  { t: "Sisleÿa L'Intégral Anti-Âge", c: "skin-care", img: brandBlue },
  { t: "Hair Rituel Revitalizing Serum", c: "hair-care", img: productBlush },
  { t: "Hair Rituel Fortifying Shampoo", c: "hair-care", img: productMatte },
  { t: "Energizing Body Scrub", c: "body-care", img: productPowder },
  { t: "Confort Extreme Body Milk", c: "body-care", img: productFoundation },
  { t: "Phyto-Aromatic Relaxing Serum", c: "wellness", img: categorySkincare },
];

const sisleyFiller: Module[] = sisleyModules.map((x, i) => ({
  id: `sy-module-${i + 1}`,
  brand: "Sisley",
  category: categoryNameMap[x.c],
  categoryId: x.c,
  title: x.t,
  image: x.img,
  completed: i % 5 === 0 ? 5 : i % 5 === 2 ? 3 : 0,
  total: 5,
  cards: baseCards(),
}));

export const modules: Module[] = [
  ...lauraBase,
  ...lauraFiller,
  ...dolceFiller,
  ...bareFiller,
  ...rimmelFiller,
  ...sisleyFiller,
];

export const brands = [
  { id: "dolce", name: "Dolce & Gabbana", count: dolceFiller.length, image: brandBlue, logo: brandDolce.url },
  { id: "baremin", name: "bareMinerals", count: bareFiller.length, image: beautyProducts, logo: brandBareminerals.url },
  { id: "rimmel", name: "Rimmel", count: rimmelFiller.length, image: categoryMakeup, logo: brandRimmel.url },
  { id: "sisley", name: "Sisley", count: sisleyFiller.length, image: categorySkincare, logo: brandSisley.url },
];

export const categories = [
  { id: "skin-care", name: "Skin Care", count: modules.filter(m => m.categoryId === "skin-care").length, image: categorySkincare },
  { id: "makeup", name: "Makeup", count: modules.filter(m => m.categoryId === "makeup").length, image: categoryMakeup },
  { id: "fragrance", name: "Fragrance", count: modules.filter(m => m.categoryId === "fragrance").length, image: beautyProducts },
  { id: "wellness", name: "Wellness", count: modules.filter(m => m.categoryId === "wellness").length, image: productPowder },
  { id: "hair-care", name: "Hair Care", count: modules.filter(m => m.categoryId === "hair-care").length, image: brandBlue },
  { id: "body-care", name: "Body Care", count: modules.filter(m => m.categoryId === "body-care").length, image: productBlush },
];

export const getModule = (id: string) => modules.find((m) => m.id === id);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getModulesByCategory = (id: string) => modules.filter((m) => m.categoryId === id);
export const getModulesByBrand = (brand: string) => modules.filter((m) => m.brand.toLowerCase() === brand.toLowerCase());
