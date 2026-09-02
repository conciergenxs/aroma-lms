import { u } from "./modules";

export type GeneralKnowledgeItem = {
  id: string;
  categoryId: string;
  category: string;
  title: string;
  image: string;
  completed: number;
  total: number;
  body: string;
};

export const generalKnowledge: GeneralKnowledgeItem[] = [
  {
    id: "gk-skin-type-vs-condition",
    categoryId: "skin-care",
    category: "SKIN CARE",
    title: "Skin Type vs Skin Condition",
    image: u("1557205465-f3762edea6d3"),
    completed: 0,
    total: 6,
    body: "Skin type (kering, berminyak, kombinasi, normal) itu genetik dan cenderung tetap. Skin condition (dehidrasi, sensitif, berjerawat) itu sementara dan bisa berubah karena cuaca, stres, atau produk yang dipakai. Satu orang bisa punya kulit berminyak tapi dehidrasi di saat bersamaan.",
  },
  {
    id: "gk-layering-order",
    categoryId: "skin-care",
    category: "SKIN CARE",
    title: "Urutan Layering yang Benar",
    image: u("1631214524049-0ebbbe6d81aa"),
    completed: 0,
    total: 6,
    body: "Aturan umum: dari yang paling cair ke paling kental. Cleanser → toner → serum → moisturizer → sunscreen (pagi) atau treatment malam. Produk dengan kandungan aktif (retinol, AHA/BHA) sebaiknya tidak ditumpuk dalam satu waktu tanpa jeda.",
  },
  {
    id: "gk-color-theory",
    categoryId: "makeup",
    category: "MAKEUP",
    title: "Color Theory untuk Undertone",
    image: u("1512496015851-a90fb38ba796"),
    completed: 0,
    total: 6,
    body: "Undertone kulit dibagi tiga: warm (kekuningan/keemasan), cool (kemerahan/kebiruan), dan neutral (campuran keduanya). Cek dari urat nadi pergelangan tangan di bawah cahaya alami — hijau cenderung warm, biru/ungu cenderung cool. Ini menentukan pilihan shade foundation dan blush yang paling natural.",
  },
  {
    id: "gk-brush-vs-sponge",
    categoryId: "makeup",
    category: "MAKEUP",
    title: "Brush vs Sponge untuk Aplikasi",
    image: u("1583241475880-083f84372725"),
    completed: 0,
    total: 6,
    body: "Brush memberi coverage lebih tebal dan presisi, cocok untuk full coverage look. Sponge (terutama yang dilembapkan) memberi hasil lebih natural dan menyatu dengan kulit karena menyerap sedikit kelebihan produk. Kombinasi keduanya sering dipakai BA untuk hasil terbaik.",
  },
  {
    id: "gk-fragrance-notes",
    categoryId: "fragrance",
    category: "FRAGRANCE",
    title: "Fragrance Notes 101",
    image: u("1542452255191-c85a98f2c5d1"),
    completed: 0,
    total: 6,
    body: "Setiap parfum punya tiga lapisan: top note (tercium pertama, menguap dalam 15-30 menit), middle/heart note (inti aroma, muncul setelah top note memudar), dan base note (paling tahan lama, bisa bertahan berjam-jam). Base note-lah yang biasanya jadi 'ciri khas' parfum tersebut.",
  },
  {
    id: "gk-scent-longevity",
    categoryId: "fragrance",
    category: "FRAGRANCE",
    title: "Cara Kerja Ketahanan Aroma",
    image: u("1571646034647-52e6ea84b28c"),
    completed: 0,
    total: 6,
    body: "Konsentrasi parfum menentukan daya tahan: Parfum/Extrait (20-30% konsentrat) paling tahan lama, lalu Eau de Parfum (15-20%), Eau de Toilette (5-15%), dan Eau de Cologne (2-4%) paling ringan. Aplikasi di titik nadi (pergelangan, leher) juga membantu aroma bertahan lebih lama karena area tersebut lebih hangat.",
  },
  {
    id: "gk-self-care-routine",
    categoryId: "wellness",
    category: "WELLNESS",
    title: "Membangun Rutinitas Self-Care",
    image: u("1723150512429-bfa92988d845"),
    completed: 0,
    total: 6,
    body: "Rutinitas wellness yang berkelanjutan lebih baik daripada yang rumit. Mulai dari satu kebiasaan kecil dan konsisten — misalnya 10 menit relaksasi sebelum tidur — baru tambahkan langkah lain setelah itu terasa natural, bukan beban.",
  },
  {
    id: "gk-wellness-storage",
    categoryId: "wellness",
    category: "WELLNESS",
    title: "Tips Penyimpanan Produk Wellness",
    image: u("1631214540553-ff044a3ff1d4"),
    completed: 0,
    total: 6,
    body: "Banyak produk wellness (essential oil, produk dengan bahan aktif alami) sensitif terhadap panas dan cahaya langsung. Simpan di tempat sejuk dan kering, jauh dari jendela, untuk menjaga efektivitasnya lebih lama.",
  },
  {
    id: "gk-hair-porosity",
    categoryId: "hair-care",
    category: "HAIR CARE",
    title: "Dasar-Dasar Porositas Rambut",
    image: u("1583209814683-c023dd293cc6"),
    completed: 0,
    total: 6,
    body: "Porositas menentukan seberapa mudah rambut menyerap dan menahan kelembapan. Rambut low porosity butuh produk yang lebih ringan dan panas untuk membuka kutikula; high porosity menyerap kelembapan cepat tapi juga cepat kehilangannya, jadi butuh sealant seperti oil di akhir rutinitas.",
  },
  {
    id: "gk-heat-protection",
    categoryId: "hair-care",
    category: "HAIR CARE",
    title: "Dasar-Dasar Proteksi Panas",
    image: u("1625093525885-282384697917"),
    completed: 0,
    total: 6,
    body: "Alat styling panas (catokan, hair dryer, curling iron) di atas 180°C bisa merusak protein rambut secara permanen. Heat protectant bekerja dengan membentuk lapisan pelindung sementara di batang rambut — selalu aplikasikan sebelum styling, bukan setelahnya.",
  },
  {
    id: "gk-body-layering",
    categoryId: "body-care",
    category: "BODY CARE",
    title: "Urutan Layering Body Care",
    image: u("1631214524020-7e18db9a8f92"),
    completed: 0,
    total: 6,
    body: "Sama seperti skin care wajah, body care juga punya urutan: exfoliator (saat mandi) → body wash → body lotion/butter saat kulit masih sedikit lembap agar penyerapan lebih maksimal → body oil sebagai sealant di atasnya jika dipakai.",
  },
  {
    id: "gk-exfoliation-frequency",
    categoryId: "body-care",
    category: "BODY CARE",
    title: "Panduan Frekuensi Eksfoliasi",
    image: u("1620464003286-a5b0d79f32c2"),
    completed: 0,
    total: 6,
    body: "Eksfoliasi tubuh idealnya 2-3 kali seminggu, tidak setiap hari — terlalu sering bisa merusak skin barrier. Area dengan kulit lebih tebal (siku, lutut, tumit) boleh lebih sering, sementara area sensitif cukup 1 kali seminggu.",
  },
];

export const getGeneralKnowledgeByCategory = (categoryId: string) =>
  generalKnowledge.filter((g) => g.categoryId === categoryId);
