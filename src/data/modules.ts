import knowledge1 from "@/assets/knowledge-1.jpg";
import knowledge2 from "@/assets/knowledge-2.jpg";
import knowledge3 from "@/assets/knowledge-3.jpg";
import knowledge4 from "@/assets/knowledge-4.jpg";
import knowledge5 from "@/assets/knowledge-5.jpg";
import brandDolce from "@/assets/brands/dolce-gabbana.png.asset.json";
import brandBareminerals from "@/assets/brands/bareminerals.svg.asset.json";
import brandRimmel from "@/assets/brands/rimmel.svg.asset.json";
import brandSisley from "@/assets/brands/sisley.svg.asset.json";

// Unsplash free photos — unique per module
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

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

const categoryNameMap: Record<string, string> = {
  "skin-care": "SKIN CARE",
  "makeup": "MAKEUP",
  "fragrance": "FRAGRANCE",
  "wellness": "WELLNESS",
  "hair-care": "HAIR CARE",
  "body-care": "BODY CARE",
};

// ── Laura Mercier ─────────────────────────────────────────────────────────────
const lauraModules: Module[] = [
  { id: "translucent-loose-setting-powder", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Translucent Loose Setting Powder", image: u("1522335789203-4a1bf2f804e8"), completed: 3, total: 5, cards: baseCards() },
  { id: "blush-colour-infusion", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Blush Colour Infusion", image: u("1596462502278-27bfdc403348"), completed: 2, total: 4, cards: baseCards().slice(0, 4) },
  { id: "real-flawless-foundation", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Real Flawless Foundation", image: u("1571019613454-1cb2f99b2d8b"), completed: 0, total: 5, cards: baseCards() },
  { id: "tinted-moisturizer", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Tinted Moisturizer Natural Skin", image: u("1556228578-8c89e6adf883"), completed: 1, total: 5, cards: baseCards() },
  { id: "caviar-hydra-lipstick", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Caviar Hydra-Crème Lipstick", image: u("1599305445671-ac291c95aaa9"), completed: 1, total: 7, cards: baseCards() },
  { id: "real-flawless-feather-matte", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Real Flawless Feather Matte", image: u("1631729371254-42c2892f0e6e"), completed: 0, total: 4, cards: baseCards().slice(0, 4) },
  { id: "lm-silk-creme-lip", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Silk Crème Lip Hydrator", image: u("1616683993950-52001a7d6b22"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-velvet-matte-lip", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Velvet Matte Lip Crayon", image: u("1542704792-e70b63e5180f"), completed: 2, total: 5, cards: baseCards() },
  { id: "lm-caviar-stick-eye", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Caviar Stick Eye Colour", image: u("1598440947619-2c35fc9aa181"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-pure-canvas-primer", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Pure Canvas Primer Hydrating", image: u("1620916566398-39f1143ab7be"), completed: 4, total: 5, cards: baseCards() },
  { id: "lm-smooth-finish-fluide", brand: "Laura Mercier", category: "SKIN CARE", categoryId: "skin-care", title: "Smooth Finish Flawless Fluide", image: u("1583241800698-e8ab01c57b97"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-translucent-pressed", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Translucent Pressed Setting", image: u("1487412947147-5cebf100d293"), completed: 1, total: 5, cards: baseCards() },
  { id: "lm-rouge-essentiel", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Rouge Essentiel Lipstick", image: u("1512496015851-a90fb38ba796"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-secret-concealer", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Secret Concealer Soft", image: u("1571781926291-c477e8c9b16f"), completed: 3, total: 5, cards: baseCards() },
  { id: "lm-loose-highlighter", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Loose Highlighter Powder", image: u("1601455262397-9c6af36b5e57"), completed: 0, total: 5, cards: baseCards() },
  { id: "lm-eye-art-caviar", brand: "Laura Mercier", category: "MAKEUP", categoryId: "makeup", title: "Eye Art Caviar Palette", image: u("1583241475880-083f84372725"), completed: 2, total: 5, cards: baseCards() },
];

// ── Dolce & Gabbana ───────────────────────────────────────────────────────────
const dolceModules: Module[] = [
  { id: "dg-the-only-one", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "The Only One Eau de Parfum", image: u("1615529328331-f8917597711f"), completed: 5, total: 5, cards: baseCards() },
  { id: "dg-light-blue", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "Light Blue Summer Vibes", image: u("1541185934-01b600ea069c"), completed: 2, total: 5, cards: baseCards() },
  { id: "dg-the-one-rose", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "The One Rose EDP", image: u("1587017539504-67cfbddac569"), completed: 0, total: 5, cards: baseCards() },
  { id: "dg-intenso", brand: "Dolce & Gabbana", category: "FRAGRANCE", categoryId: "fragrance", title: "Intenso Pour Homme", image: u("1523293182086-7651a899d37f"), completed: 3, total: 5, cards: baseCards() },
  { id: "dg-perfect-foundation", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Perfect Luminous Liquid Foundation", image: u("1614267157481-ca2a9a86e456"), completed: 0, total: 5, cards: baseCards() },
  { id: "dg-passioneyes-mascara", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Passioneyes Mascara Volume", image: u("1512207736890-6ffed8a84e8d"), completed: 1, total: 5, cards: baseCards() },
  { id: "dg-intenseyes-liner", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Intenseyes Precise Liner", image: u("1503236823255-94d40b9c81a0"), completed: 0, total: 5, cards: baseCards() },
  { id: "dg-shinissimo-gloss", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup", title: "Dolce Shinissimo Lip Gloss", image: u("1625093523429-ac0be7b3a18c"), completed: 2, total: 5, cards: baseCards() },
];

// ── bareMinerals ──────────────────────────────────────────────────────────────
const bareModules: Module[] = [
  { id: "bm-original-foundation", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "Original Loose Powder Foundation", image: u("1607604276583-eef5d076aa5f"), completed: 5, total: 5, cards: baseCards() },
  { id: "bm-barepro-foundation", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "BarePro Performance Wear Foundation", image: u("1631214524107-7a9a793a8fa7"), completed: 0, total: 5, cards: baseCards() },
  { id: "bm-gen-nude-lipstick", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "Gen Nude Butter Lipstick", image: u("1617450365226-9218895060b5"), completed: 3, total: 5, cards: baseCards() },
  { id: "bm-mineral-veil", brand: "bareMinerals", category: "MAKEUP", categoryId: "makeup", title: "Mineral Veil Finishing Powder", image: u("1629059291663-4f12e6a35b4d"), completed: 0, total: 5, cards: baseCards() },
  { id: "bm-complexion-rescue", brand: "bareMinerals", category: "SKIN CARE", categoryId: "skin-care", title: "Complexion Rescue Tinted Moisturizer", image: u("1612817288484-6f916006741a"), completed: 2, total: 5, cards: baseCards() },
  { id: "bm-eye-gel", brand: "bareMinerals", category: "SKIN CARE", categoryId: "skin-care", title: "Skinlongevity Vital Power Eye Gel", image: u("1620916297397-a4a5402a3c6c"), completed: 0, total: 5, cards: baseCards() },
  { id: "bm-ageless-cream", brand: "bareMinerals", category: "SKIN CARE", categoryId: "skin-care", title: "Ageless Phyto-Retinol Face Cream", image: u("1556228578-8c89e6adf883").replace("8c89e6adf883", "6adf2a0a99c4"), completed: 1, total: 5, cards: baseCards() },
  { id: "bm-purifying-mask", brand: "bareMinerals", category: "WELLNESS", categoryId: "wellness", title: "Purifying Face Mask", image: u("1570194065650-d99fb4bedf0a"), completed: 0, total: 5, cards: baseCards() },
];

// ── Rimmel ────────────────────────────────────────────────────────────────────
const rimmelModules: Module[] = [
  { id: "rm-stay-matte", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Stay Matte Pressed Powder", image: u("1522712999-00429afb845d"), completed: 5, total: 5, cards: baseCards() },
  { id: "rm-lasting-finish-lip", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Lasting Finish Lipstick", image: u("1607637668-2f7a0f77e6d1"), completed: 0, total: 5, cards: baseCards() },
  { id: "rm-scandalEyes", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "ScandalEyes Mascara", image: u("1526413232644-8a40f03cc03b"), completed: 2, total: 5, cards: baseCards() },
  { id: "rm-brow-mascara", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Wonder'full Eyebrow Mascara", image: u("1576091160399-112ba8d25d1d"), completed: 0, total: 5, cards: baseCards() },
  { id: "rm-kind-free", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Kind & Free Foundation", image: u("1631214499191-2e9cba17fc60"), completed: 1, total: 5, cards: baseCards() },
  { id: "rm-lasting-finish-fdn", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Lasting Finish Foundation", image: u("1541710430735-5d52f7c01f90"), completed: 0, total: 5, cards: baseCards() },
  { id: "rm-fix-go-brow", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Fix & Go Brow Gel", image: u("1588776813700-fd5e3ee68e1d"), completed: 3, total: 5, cards: baseCards() },
  { id: "rm-moisture-renew", brand: "Rimmel", category: "MAKEUP", categoryId: "makeup", title: "Moisture Renew Lip Colour", image: u("1625093523429-ac0be7b3a18c").replace("ac0be7b3a18c", "a7c7d3b44d1e"), completed: 0, total: 5, cards: baseCards() },
];

// ── Sisley ────────────────────────────────────────────────────────────────────
const sisleyModules: Module[] = [
  { id: "sy-black-rose-mask", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Black Rose Cream Mask", image: u("1598452963314-b09f397a5c48"), completed: 5, total: 5, cards: baseCards() },
  { id: "sy-hydra-global", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Hydra-Global Intense Anti-Aging", image: u("1611080626919-7cf5a9dbab12"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-eye-integral", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "L'Intégral Anti-Âge Eye", image: u("1614267157481-ca2a9a86e456").replace("ca2a9a86e456", "b3e7b2c9d4f8"), completed: 3, total: 5, cards: baseCards() },
  { id: "sy-phyto-blanc", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Phyto-Blanc Lightening Essence", image: u("1570194065650-d99fb4bedf0a").replace("d99fb4bedf0a", "c7b4e9d3a2f1"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-sislya-integral", brand: "Sisley", category: "SKIN CARE", categoryId: "skin-care", title: "Sisleÿa L'Intégral Anti-Âge", image: u("1556228578-8c89e6adf883"), completed: 2, total: 5, cards: baseCards() },
  { id: "sy-hair-serum", brand: "Sisley", category: "HAIR CARE", categoryId: "hair-care", title: "Hair Rituel Revitalizing Serum", image: u("1522337360788-8b13dee7a37e"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-hair-shampoo", brand: "Sisley", category: "HAIR CARE", categoryId: "hair-care", title: "Hair Rituel Fortifying Shampoo", image: u("1535585209827-a15fcdbc4c2d"), completed: 4, total: 5, cards: baseCards() },
  { id: "sy-body-scrub", brand: "Sisley", category: "BODY CARE", categoryId: "body-care", title: "Energizing Body Scrub", image: u("1570172619644-dfd03ed5d881"), completed: 0, total: 5, cards: baseCards() },
  { id: "sy-body-milk", brand: "Sisley", category: "BODY CARE", categoryId: "body-care", title: "Confort Extreme Body Milk", image: u("1610705267928-b59cd5b6c4cf"), completed: 1, total: 5, cards: baseCards() },
  { id: "sy-relaxing-serum", brand: "Sisley", category: "WELLNESS", categoryId: "wellness", title: "Phyto-Aromatic Relaxing Serum", image: u("1638438849928-ae14e63c58c8"), completed: 0, total: 5, cards: baseCards() },
];

export const modules: Module[] = [
  ...lauraModules,
  ...dolceModules,
  ...bareModules,
  ...rimmelModules,
  ...sisleyModules,
];

export const brands = [
  { id: "dolce", name: "Dolce & Gabbana", count: dolceModules.length, image: u("1523293182086-7651a899d37f"), logo: brandDolce.url },
  { id: "baremin", name: "bareMinerals", count: bareModules.length, image: u("1607604276583-eef5d076aa5f"), logo: brandBareminerals.url },
  { id: "rimmel", name: "Rimmel", count: rimmelModules.length, image: u("1522712999-00429afb845d"), logo: brandRimmel.url },
  { id: "sisley", name: "Sisley", count: sisleyModules.length, image: u("1598452963314-b09f397a5c48"), logo: brandSisley.url },
];

export const categories = [
  { id: "skin-care", name: "Skin Care", count: modules.filter(m => m.categoryId === "skin-care").length, image: u("1620916566398-39f1143ab7be") },
  { id: "makeup", name: "Makeup", count: modules.filter(m => m.categoryId === "makeup").length, image: u("1596462502278-27bfdc403348") },
  { id: "fragrance", name: "Fragrance", count: modules.filter(m => m.categoryId === "fragrance").length, image: u("1615529328331-f8917597711f") },
  { id: "wellness", name: "Wellness", count: modules.filter(m => m.categoryId === "wellness").length, image: u("1638438849928-ae14e63c58c8") },
  { id: "hair-care", name: "Hair Care", count: modules.filter(m => m.categoryId === "hair-care").length, image: u("1522337360788-8b13dee7a37e") },
  { id: "body-care", name: "Body Care", count: modules.filter(m => m.categoryId === "body-care").length, image: u("1570172619644-dfd03ed5d881") },
];

export const getModule = (id: string) => modules.find((m) => m.id === id);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getModulesByCategory = (id: string) => modules.filter((m) => m.categoryId === id);
export const getModulesByBrand = (brand: string) => modules.filter((m) => m.brand.toLowerCase() === brand.toLowerCase());
