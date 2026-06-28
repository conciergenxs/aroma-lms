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
  title: string;
  image: string;
  completed: number;
  total: number;
  cards: KnowledgeCard[];
};

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;
const face = (seed: string) => `https://picsum.photos/seed/${seed}/900/1100`;

const baseCards = (modSeed: string): KnowledgeCard[] => [
  {
    id: "1", index: 1, title: "Setting Ringan & Kontrol Minyak",
    status: "not-started", progress: 0, image: face(`${modSeed}-c1`),
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
    status: "completed", progress: 100, image: face(`${modSeed}-c2`),
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
    status: "completed", progress: 100, image: face(`${modSeed}-c3`),
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
    status: "in-progress", progress: 50, image: face(`${modSeed}-c4`),
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
    status: "completed", progress: 100, image: face(`${modSeed}-c5`),
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

export const modules: Module[] = [
  { id: "translucent-loose-setting-powder", brand: "Laura Mercier", category: "MAKEUP", title: "Translucent Loose Setting Powder", image: img("powder"), completed: 3, total: 5, cards: baseCards("powder") },
  { id: "blush-colour-infusion", brand: "Laura Mercier", category: "MAKEUP", title: "Blush Colour Infusion", image: img("blush"), completed: 2, total: 4, cards: baseCards("blush").slice(0, 4) },
  { id: "real-flawless-foundation", brand: "Laura Mercier", category: "MAKEUP", title: "Real Flawless Foundation", image: img("foundation"), completed: 0, total: 5, cards: baseCards("foundation") },
  { id: "tinted-moisturizer", brand: "Laura Mercier", category: "MAKEUP", title: "Tinted Moisturizer Natural Skin", image: img("tinted"), completed: 1, total: 5, cards: baseCards("tinted") },
  { id: "caviar-hydra-lipstick", brand: "Laura Mercier", category: "MAKEUP", title: "Caviar Hydra-Crème Lipstick 42g", image: img("lipstick"), completed: 1, total: 7, cards: baseCards("lipstick") },
  { id: "real-flawless-feather-matte", brand: "Laura Mercier", category: "MAKEUP", title: "Real Flawless Feather Matte Powder", image: img("matte"), completed: 0, total: 4, cards: baseCards("matte").slice(0, 4) },
];

export const brands = [
  { id: "dolce", name: "DOLCE & GABBANA", count: 57, image: img("dg") },
  { id: "baremin", name: "bareMinerals", count: 64, image: img("bm") },
  { id: "tomford", name: "TOM FORD", count: 48, image: img("tf") },
  { id: "ysl", name: "YSL BEAUTY", count: 39, image: img("ysl") },
];

export const categories = [
  { id: "skin-care", name: "Skin Care", count: 32, image: img("skincare") },
  { id: "makeup", name: "Makeup", count: 45, image: img("makeupcat") },
  { id: "fragrance", name: "Fragrance", count: 26, image: img("fragrance") },
  { id: "wellness", name: "Wellness", count: 20, image: img("wellness") },
  { id: "hair-care", name: "Hair Care", count: 30, image: img("haircare") },
  { id: "body-care", name: "Body Care", count: 26, image: img("bodycare") },
];

export const getModule = (id: string) => modules.find((m) => m.id === id);
