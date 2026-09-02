export type GeneralKnowledgeItem = {
  id: string;
  categoryId: string;
  title: string;
  body: string;
};

export const generalKnowledge: GeneralKnowledgeItem[] = [
  {
    id: "gk-skin-type-vs-condition",
    categoryId: "skin-care",
    title: "Skin Type vs Skin Condition",
    body: "Skin type (kering, berminyak, kombinasi, normal) itu genetik dan cenderung tetap. Skin condition (dehidrasi, sensitif, berjerawat) itu sementara dan bisa berubah karena cuaca, stres, atau produk yang dipakai. Satu orang bisa punya kulit berminyak tapi dehidrasi di saat bersamaan.",
  },
  {
    id: "gk-layering-order",
    categoryId: "skin-care",
    title: "Urutan Layering yang Benar",
    body: "Aturan umum: dari yang paling cair ke paling kental. Cleanser → toner → serum → moisturizer → sunscreen (pagi) atau treatment malam. Produk dengan kandungan aktif (retinol, AHA/BHA) sebaiknya tidak ditumpuk dalam satu waktu tanpa jeda.",
  },
  {
    id: "gk-color-theory",
    categoryId: "makeup",
    title: "Color Theory untuk Undertone",
    body: "Undertone kulit dibagi tiga: warm (kekuningan/keemasan), cool (kemerahan/kebiruan), dan neutral (campuran keduanya). Cek dari urat nadi pergelangan tangan di bawah cahaya alami — hijau cenderung warm, biru/ungu cenderung cool. Ini menentukan pilihan shade foundation dan blush yang paling natural.",
  },
  {
    id: "gk-brush-vs-sponge",
    categoryId: "makeup",
    title: "Brush vs Sponge untuk Aplikasi",
    body: "Brush memberi coverage lebih tebal dan presisi, cocok untuk full coverage look. Sponge (terutama yang dilembapkan) memberi hasil lebih natural dan menyatu dengan kulit karena menyerap sedikit kelebihan produk. Kombinasi keduanya sering dipakai BA untuk hasil terbaik.",
  },
  {
    id: "gk-fragrance-notes",
    categoryId: "fragrance",
    title: "Fragrance Notes 101",
    body: "Setiap parfum punya tiga lapisan: top note (tercium pertama, menguap dalam 15-30 menit), middle/heart note (inti aroma, muncul setelah top note memudar), dan base note (paling tahan lama, bisa bertahan berjam-jam). Base note-lah yang biasanya jadi 'ciri khas' parfum tersebut.",
  },
  {
    id: "gk-scent-longevity",
    categoryId: "fragrance",
    title: "Cara Kerja Ketahanan Aroma",
    body: "Konsentrasi parfum menentukan daya tahan: Parfum/Extrait (20-30% konsentrat) paling tahan lama, lalu Eau de Parfum (15-20%), Eau de Toilette (5-15%), dan Eau de Cologne (2-4%) paling ringan. Aplikasi di titik nadi (pergelangan, leher) juga membantu aroma bertahan lebih lama karena area tersebut lebih hangat.",
  },
  {
    id: "gk-self-care-routine",
    categoryId: "wellness",
    title: "Membangun Rutinitas Self-Care",
    body: "Rutinitas wellness yang berkelanjutan lebih baik daripada yang rumit. Mulai dari satu kebiasaan kecil dan konsisten — misalnya 10 menit relaksasi sebelum tidur — baru tambahkan langkah lain setelah itu terasa natural, bukan beban.",
  },
  {
    id: "gk-wellness-storage",
    categoryId: "wellness",
    title: "Tips Penyimpanan Produk Wellness",
    body: "Banyak produk wellness (essential oil, produk dengan bahan aktif alami) sensitif terhadap panas dan cahaya langsung. Simpan di tempat sejuk dan kering, jauh dari jendela, untuk menjaga efektivitasnya lebih lama.",
  },
  {
    id: "gk-hair-porosity",
    categoryId: "hair-care",
    title: "Dasar-Dasar Porositas Rambut",
    body: "Porositas menentukan seberapa mudah rambut menyerap dan menahan kelembapan. Rambut low porosity butuh produk yang lebih ringan dan panas untuk membuka kutikula; high porosity menyerap kelembapan cepat tapi juga cepat kehilangannya, jadi butuh sealant seperti oil di akhir rutinitas.",
  },
  {
    id: "gk-heat-protection",
    categoryId: "hair-care",
    title: "Dasar-Dasar Proteksi Panas",
    body: "Alat styling panas (catokan, hair dryer, curling iron) di atas 180°C bisa merusak protein rambut secara permanen. Heat protectant bekerja dengan membentuk lapisan pelindung sementara di batang rambut — selalu aplikasikan sebelum styling, bukan setelahnya.",
  },
  {
    id: "gk-body-layering",
    categoryId: "body-care",
    title: "Urutan Layering Body Care",
    body: "Sama seperti skin care wajah, body care juga punya urutan: exfoliator (saat mandi) → body wash → body lotion/butter saat kulit masih sedikit lembap agar penyerapan lebih maksimal → body oil sebagai sealant di atasnya jika dipakai.",
  },
  {
    id: "gk-exfoliation-frequency",
    categoryId: "body-care",
    title: "Panduan Frekuensi Eksfoliasi",
    body: "Eksfoliasi tubuh idealnya 2-3 kali seminggu, tidak setiap hari — terlalu sering bisa merusak skin barrier. Area dengan kulit lebih tebal (siku, lutut, tumit) boleh lebih sering, sementara area sensitif cukup 1 kali seminggu.",
  },
];

export const getGeneralKnowledgeByCategory = (categoryId: string) =>
  generalKnowledge.filter((g) => g.categoryId === categoryId);
