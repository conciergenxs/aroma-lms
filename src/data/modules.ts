import brandDolce from "@/assets/brands/dolce-gabbana.png.asset.json";
import brandBareminerals from "@/assets/brands/bareminerals.svg.asset.json";
import brandRimmel from "@/assets/brands/rimmel.svg.asset.json";
import brandSisley from "@/assets/brands/sisley.svg.asset.json";

// Unsplash free photos — verified makeup product photos
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

// Knowledge card images — actual makeup product photos from Unsplash
const c1 = u("1596462502278-27bfdc403348"); // pink/brown makeup brush set
const c2 = u("1542452255191-c85a98f2c5d1"); // red Lancôme lipstick
const c3 = u("1625093525885-282384697917"); // eyeshadow palette flatlay
const c4 = u("1608979048467-6194dabc6a3d"); // makeup brushes on white table
const c5 = u("1571646034647-52e6ea84b28c"); // five assorted lipsticks

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

const baseCards = (): KnowledgeCard[] => [
  {
    id: "1", index: 1, title: "Setting Ringan & Kontrol Minyak",
    status: "not-started", progress: 0, image: c1,
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
    status: "completed", progress: 100, image: c2,
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
    status: "completed", progress: 100, image: c3,
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
    status: "in-progress", progress: 50, image: c4,
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
    status: "completed", progress: 100, image: c5,
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

// ── Laura Mercier ─────────────────────────────────────────────────────────────
const lauraModules: Module[] = [
  { id: "translucent-loose-setting-powder", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Translucent Loose Setting Powder", image: u("1625093742435-6fa192b6fb10"), completed: 3, total: 5, cards: baseCards() },
  { id: "blush-colour-infusion", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Blush Colour Infusion", image: u("1631214499500-2e34edcaccfe"), completed: 2, total: 4, cards: baseCards().slice(0, 4) },
  { id: "real-flawless-foundation", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Real Flawless Foundation", image: u("1679623100266-db82be84f5f3"), completed: 0, total: 5, cards: baseCards() },
  { id: "tinted-moisturizer", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Tinted Moisturizer Natural Skin", image: u("1557205465-f3762edea6d3"), completed: 1, total: 5, cards: baseCards() },
  { id: "caviar-hydra-lipstick", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Caviar Hydra-Crème Lipstick", image: u("1617422275558-e5f616302690"), completed: 1, total: 7, cards: baseCards() },
  { id: "real-flawless-feather-matte", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Real Flawless Feather Matte", image: u("1583209814683-c023dd293cc6"), completed: 0, total: 4, cards: baseCards().slice(0, 4) },
  { id: "lm-silk-creme-lip", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Silk Crème Lip Hydrator", image: u("1586495777744-4413f21062fa"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-velvet-matte-lip", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Velvet Matte Lip Crayon", image: u("1619352520578-8fefbfa2f904"), completed: 2, total: 5, cards: baseCards() },
  { id: "lm-caviar-stick-eye", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Caviar Stick Eye Colour", image: u("1583241475880-083f84372725"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-pure-canvas-primer", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Pure Canvas Primer Hydrating", image: u("1631214524049-0ebbbe6d81aa"), completed: 4, total: 5, cards: baseCards() },
  { id: "lm-smooth-finish-fluide", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Smooth Finish Flawless Fluide", image: u("1631214524020-7e18db9a8f92"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-translucent-pressed", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Translucent Pressed Setting", image: u("1620464003286-a5b0d79f32c2"), completed: 1, total: 5, cards: baseCards() },
  { id: "lm-rouge-essentiel", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Rouge Essentiel Lipstick", image: u("1626895872564-b691b6877b83"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-secret-concealer", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Secret Concealer Soft", image: u("1723150512429-bfa92988d845"), completed: 3, total: 5, cards: baseCards() },
  { id: "lm-loose-highlighter", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Loose Highlighter Powder", image: u("1631214540553-ff044a3ff1d4"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-eye-art-caviar", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Eye Art Caviar Palette", image: u("1512496015851-a90fb38ba796"), completed: 2, total: 5, cards: baseCards() },
];

// ── Dolce & Gabbana ───────────────────────────────────────────────────────────
const dolceModules: Module[] = [
  { id: "dg-the-only-one", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "The Only One Eau de Parfum", image: u("1542452255191-c85a98f2c5d1"), completed: 5, total: 5, cards: baseCards() },
  { id: "dg-light-blue", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "Light Blue Summer Vibes", image: u("1571646034647-52e6ea84b28c"), completed: 2, total: 5, cards: baseCards() },
  { id: "dg-the-one-rose", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "The One Rose EDP", image: u("1596462502278-27bfdc403348"), completed: 0, total: 5, cards: baseCards() },
  { id: "dg-intenso", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "Intenso Pour Homme", image: u("1608979048467-6194dabc6a3d"), completed: 3, total: 5, cards: baseCards() },
  { id: "dg-perfect-foundation", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Perfect Luminous Liquid Foundation", image: u("1625093742435-6fa192b6fb10"), completed: 0, total: 5, cards: baseCards() },
  { id: "dg-passioneyes-mascara", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Passioneyes Mascara Volume", image: u("1631214499500-2e34edcaccfe"), completed: 1, total: 5, cards: baseCards() },
  { id: "dg-intenseyes-liner", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Intenseyes Precise Liner", image: u("1617422275558-e5f616302690"), completed: 0, total: 5, cards: baseCards() },
  { id: "dg-shinissimo-gloss", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Dolce Shinissimo Lip Gloss", image: u("1625093525885-282384697917"), completed: 2, total: 5, cards: baseCards() },
];

// ── bareMinerals ──────────────────────────────────────────────────────────────
const bareModules: Module[] = [
  { id: "bm-original-foundation", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "Original Loose Powder Foundation", image: u("1679623100266-db82be84f5f3"), completed: 5, total: 5, cards: baseCards() },
  { id: "bm-barepro-foundation", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "BarePro Performance Wear Foundation", image: u("1583209814683-c023dd293cc6"), completed: 0, total: 5, cards: baseCards() },
  { id: "bm-gen-nude-lipstick", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "Gen Nude Butter Lipstick", image: u("1586495777744-4413f21062fa"), completed: 3, total: 5, cards: baseCards() },
  { id: "bm-mineral-veil", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "Mineral Veil Finishing Powder", image: u("1619352520578-8fefbfa2f904"), completed: 0, total: 5, cards: baseCards() },
  { id: "bm-complexion-rescue", brand: "bareMinerals", category: "SKIN CARE", categoryId: "skin-care", title: "Complexion Rescue Tinted Moisturizer", image: u("1557205465-f3762edea6d3"), completed: 2, total: 5, cards: baseCards() },
  { id: "bm-eye-gel", brand: "bareMinerals", category: "SKIN CARE", categoryId: "skin-care", title: "Skinlongevity Vital Power Eye Gel", image: u("1631214524020-7e18db9a8f92"), completed: 0, total: 5, cards: baseCards() },
  { id: "bm-ageless-cream", brand: "bareMinerals", category: "SKIN CARE", categoryId: "skin-care", title: "Ageless Phyto-Retinol Face Cream", image: u("1631214524049-0ebbbe6d81aa"), completed: 1, total: 5, cards: baseCards() },
  { id: "bm-purifying-mask", brand: "bareMinerals", category: "WELLNESS", categoryId: "wellness", title: "Purifying Face Mask", image: u("1723150512429-bfa92988d845"), completed: 0, total: 5, cards: baseCards() },
];

// ── Rimmel ────────────────────────────────────────────────────────────────────
const rimmelModules: Module[] = [
  { id: "rm-stay-matte", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Stay Matte Pressed Powder", image: u("1620464003286-a5b0d79f32c2"), completed: 5, total: 5, cards: baseCards() },
  { id: "rm-lasting-finish-lip", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Lasting Finish Lipstick", image: u("1626895872564-b691b6877b83"), completed: 0, total: 5, cards: baseCards() },
  { id: "rm-scandalEyes", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "ScandalEyes Mascara", image: u("1583241475880-083f84372725"), completed: 2, total: 5, cards: baseCards() },
  { id: "rm-brow-mascara", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Wonder'full Eyebrow Mascara", image: u("1631214540553-ff044a3ff1d4"), completed: 0, total: 5, cards: baseCards() },
  { id: "rm-kind-free", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Kind & Free Foundation", image: u("1512496015851-a90fb38ba796"), completed: 1, total: 5, cards: baseCards() },
  { id: "rm-lasting-finish-fdn", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Lasting Finish Foundation", image: u("1542452255191-c85a98f2c5d1"), completed: 0, total: 5, cards: baseCards() },
  { id: "rm-fix-go-brow", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Fix & Go Brow Gel", image: u("1596462502278-27bfdc403348"), completed: 3, total: 5, cards: baseCards() },
  { id: "rm-moisture-renew", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Moisture Renew Lip Colour", image: u("1617422275558-e5f616302690"), completed: 0, total: 5, cards: baseCards() },
];

// ── Sisley ────────────────────────────────────────────────────────────────────
const sisleyModules: Module[] = [
  { id: "sy-black-rose-mask", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Black Rose Cream Mask", image: u("1608979048467-6194dabc6a3d"), completed: 5, total: 5, cards: baseCards() },
  { id: "sy-hydra-global", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Hydra-Global Intense Anti-Aging", image: u("1679623100266-db82be84f5f3"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-eye-integral", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "L'Intégral Anti-Âge Eye", image: u("1631214499500-2e34edcaccfe"), completed: 3, total: 5, cards: baseCards() },
  { id: "sy-phyto-blanc", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Phyto-Blanc Lightening Essence", image: u("1557205465-f3762edea6d3"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-sislya-integral", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Sisleÿa L'Intégral Anti-Âge", image: u("1723150512429-bfa92988d845"), completed: 2, total: 5, cards: baseCards() },
  { id: "sy-hair-serum", brand: "Sisley", category: "HAIR CARE", categoryId: "hair-care", title: "Hair Rituel Revitalizing Serum", image: u("1583209814683-c023dd293cc6"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-hair-shampoo", brand: "Sisley", category: "HAIR CARE", categoryId: "hair-care", title: "Hair Rituel Fortifying Shampoo", image: u("1625093525885-282384697917"), completed: 4, total: 5, cards: baseCards() },
  { id: "sy-body-scrub", brand: "Sisley", category: "BODY CARE", categoryId: "body-care", title: "Energizing Body Scrub", image: u("1631214524020-7e18db9a8f92"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-body-milk", brand: "Sisley", category: "BODY CARE", categoryId: "body-care", title: "Confort Extreme Body Milk", image: u("1620464003286-a5b0d79f32c2"), completed: 1, total: 5, cards: baseCards() },
  { id: "sy-relaxing-serum", brand: "Sisley", category: "WELLNESS", categoryId: "wellness", title: "Phyto-Aromatic Relaxing Serum", image: u("1631214540553-ff044a3ff1d4"), completed: 0, total: 5, cards: baseCards() },
];

export const modules: Module[] = [
  ...lauraModules,
  ...dolceModules,
  ...bareModules,
  ...rimmelModules,
  ...sisleyModules,
];

export const brands = [
  { id: "dolce", name: "Dolce & Gabbana", count: dolceModules.length, image: u("1542452255191-c85a98f2c5d1"), logo: brandDolce.url },
  { id: "baremin", name: "bareMinerals", count: bareModules.length, image: u("1679623100266-db82be84f5f3"), logo: brandBareminerals.url },
  { id: "rimmel", name: "Rimmel", count: rimmelModules.length, image: u("1625093742435-6fa192b6fb10"), logo: brandRimmel.url },
  { id: "sisley", name: "Sisley", count: sisleyModules.length, image: u("1608979048467-6194dabc6a3d"), logo: brandSisley.url },
];

export const categories = [
  { id: "skin-care", name: "Skin Care", count: modules.filter(m => m.categoryId === "skin-care").length, image: u("1557205465-f3762edea6d3") },
  { id: "makeup", name: "Makeup", count: modules.filter(m => m.categoryId === "makeup").length, image: u("1596462502278-27bfdc403348") },
  { id: "fragrance", name: "Fragrance", count: modules.filter(m => m.categoryId === "fragrance").length, image: u("1617422275558-e5f616302690") },
  { id: "wellness", name: "Wellness", count: modules.filter(m => m.categoryId === "wellness").length, image: u("1723150512429-bfa92988d845") },
  { id: "hair-care", name: "Hair Care", count: modules.filter(m => m.categoryId === "hair-care").length, image: u("1631214524049-0ebbbe6d81aa") },
  { id: "body-care", name: "Body Care", count: modules.filter(m => m.categoryId === "body-care").length, image: u("1631214524020-7e18db9a8f92") },
];

export const getModule = (id: string) => modules.find((m) => m.id === id);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getModulesByCategory = (id: string) => modules.filter((m) => m.categoryId === id);
export const getModulesByBrand = (brand: string) => modules.filter((m) => m.brand.toLowerCase() === brand.toLowerCase());
