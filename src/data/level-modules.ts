// Brand-level and category-level "overview" modules — same Module/KnowledgeCard shape as the
// SKU-level modules in ./modules.ts, but scoped to a whole brand or a whole category instead of
// one specific product. See src/routes/_authenticated.category.$categoryId.tsx and
// src/routes/_authenticated.modules.index.tsx for where these surface (a featured hero section
// above the regular SKU grid), and src/components/LevelModuleCard.tsx for how they're rendered.
//
// Deliberately does NOT import anything (not even the `u` helper) from ./modules — modules.ts
// imports `levelModules` (a value) from this file, so an import back the other way would create a
// circular runtime dependency and throw "Cannot access 'u' before initialization" at load time.
// Types are imported with `import type`, which is erased at build and creates no runtime edge.
import type { Module, KnowledgeCard, ModuleStatus } from "./modules";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

type LevelCardInput = {
  title: string;
  image: string;
  contentImage?: string;
  learningFocus?: string;
  bullets: string[];
  keyIngredients?: { name: string; description: string }[];
  keyIngredientsLabel?: string;
  baScript?: string;
  qa?: { q: string; a: string }[];
};

const buildLevelCards = (inputs: LevelCardInput[]): KnowledgeCard[] =>
  inputs.map((c, i) => ({
    id: String(i + 1),
    index: i + 1,
    title: c.title,
    status: "not-started" as ModuleStatus,
    progress: 0,
    image: c.image,
    contentImage: c.contentImage,
    bullets: c.bullets,
    keyIngredients: c.keyIngredients ?? [],
    keyIngredientsLabel: c.keyIngredientsLabel,
    learningFocus: c.learningFocus,
    baScript: c.baScript,
    qa: c.qa,
  }));

export const levelModules: Module[] = [
  // ── Category-level (brand: "PT Aroma Abadi") ─────────────────────────────────
  {
    id: "cat-skin-care-overview",
    brand: "PT Aroma Abadi",
    category: "SKIN CARE",
    categoryId: "skin-care",
    level: "category",
    title: "Dasar-Dasar Perawatan Kulit",
    image: u("1631214524049-0ebbbe6d81aa"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Jenis vs Kondisi Kulit",
        image: u("1557205465-f3762edea6d3"),
        learningFocus: "Perbedaan mendasar yang menentukan rekomendasi produk apapun, di kategori apapun.",
        bullets: [
          "Jenis kulit (skin type) bersifat genetik dan cenderung tetap — normal, kering, berminyak, atau kombinasi. Ini menggambarkan seberapa banyak minyak yang diproduksi kulit secara alami.",
          "Kondisi kulit (skin condition) bersifat sementara dan bisa berubah — dehidrasi, sensitif, berjerawat/kongesti, kusam. Dipicu oleh cuaca, stres, hormon, atau produk yang dipakai.",
          "Kulit berminyak tetap bisa dehidrasi di saat bersamaan — minyak dan air adalah dua hal berbeda, jadi jangan asumsikan kulit berminyak tidak butuh hidrasi.",
          "Produk tidak bisa mengubah jenis kulit customer, tapi bisa memperbaiki kondisinya — inilah dasar dari rekomendasi produk yang tepat sasaran, bukan sekadar 'cocok untuk kulit berminyak'.",
          "Dua pertanyaan cepat untuk memetakan keduanya: 'Kulit Ibu/Kakak biasanya seperti apa setiap hari?' (jenis), lalu 'Bagaimana kondisinya belakangan ini?' (kondisi).",
        ],
        keyIngredientsLabel: "Bahan Aktif Umum per Kondisi",
        keyIngredients: [
          { name: "Hyaluronic Acid", description: "humektan yang menarik air ke kulit — cocok untuk kondisi dehidrasi, di jenis kulit apapun" },
          { name: "Niacinamide", description: "menyeimbangkan produksi minyak dan memperkuat skin barrier — cocok untuk kondisi kongesti dan kusam" },
          { name: "Ceramide", description: "memperkuat lapisan pelindung kulit — membantu kondisi sensitif dan barrier yang lemah" },
        ],
      },
      {
        title: "Membaca Undertone Kulit",
        image: u("1617055407123-3d7130c1f940"),
        learningFocus: "Skill praktis untuk membantu customer menemukan shade yang paling natural.",
        bullets: [
          "Undertone berbeda dari warna kulit (skin tone). Warna kulit bisa berubah karena matahari atau musim, tapi undertone tetap sama seumur hidup.",
          "Tiga undertone utama: warm (kekuningan/keemasan), cool (kemerahan/kebiruan), dan neutral (campuran keduanya). Ada juga olive — kecoklatan kehijauan, cukup umum di kulit Asia Tenggara dan sering paling sulit di-matching.",
          "Vein test: lihat urat nadi di pergelangan tangan pada cahaya alami. Urat kehijauan cenderung warm, urat kebiruan/keunguan cenderung cool, campuran keduanya cenderung neutral.",
          "Jewelry test: emas biasanya lebih menyatu di kulit warm undertone, perak lebih menyatu di kulit cool undertone; kalau keduanya sama-sama cocok, biasanya neutral.",
          "Cara tercepat mengonfirmasi di lapangan: swatch satu shade foundation di garis rahang, bukan di punggung tangan — kalau warnanya jadi abu-abu atau oranye, berarti shade-nya belum tepat undertone.",
        ],
        keyIngredients: [],
        baScript: "Boleh saya lihat urat nadi di pergelangan tangan Kakak sebentar di bawah cahaya alami? Ini bantu saya carikan shade yang paling menyatu dengan kulit Kakak.",
      },
      {
        title: "Urutan Layering yang Benar",
        image: u("1765964492963-b0aa8c172431"),
        learningFocus: "Urutan aplikasi yang memaksimalkan penyerapan setiap produk dalam rutinitas.",
        bullets: [
          "Aturan umum: dari tekstur paling cair ke paling kental, dan dari yang berbasis air sebelum yang berbasis minyak.",
          "Urutan dasar pagi: cleanser → toner/essence → serum → moisturizer → sunscreen. Sunscreen selalu jadi langkah terakhir, tidak pernah ditumpuk di bawah produk lain.",
          "Urutan dasar malam: cleanser → toner/essence → serum/treatment aktif → moisturizer. Tanpa sunscreen, tapi bisa diganti produk yang lebih kaya untuk membantu repair semalaman.",
          "Produk dengan bahan aktif kuat (retinol, AHA/BHA) sebaiknya tidak ditumpuk dalam satu waktu tanpa jeda — bisa memicu iritasi. Perkenalkan satu aktif baru dulu, beri jarak sekitar satu minggu sebelum menambah yang lain.",
          "Selalu sarankan patch test di lengan bagian dalam atau garis rahang sebelum pemakaian pertama di seluruh wajah, terutama untuk produk dengan aktif baru.",
        ],
        keyIngredientsLabel: "Aktif yang Perlu Diperhatikan Urutannya",
        keyIngredients: [
          { name: "Retinol", description: "aktif malam yang kuat — jangan dicampur langsung dengan AHA/BHA di waktu yang sama" },
          { name: "AHA/BHA", description: "eksfolian kimia — beri jeda dengan aktif kuat lain agar kulit tidak over-exfoliate" },
          { name: "Ceramide", description: "biasanya jadi step terakhir (moisturizer) untuk mengunci semua layer yang sudah diaplikasikan" },
        ],
      },
      {
        title: "Kulit di Iklim Tropis",
        image: u("1761718209835-c8586b7dcac0"),
        learningFocus: "Bagaimana cuaca panas dan lembap mengubah preferensi tekstur dan kebutuhan kulit customer.",
        bullets: [
          "Panas dan kelembapan tinggi meningkatkan produksi minyak, jadi banyak customer menghindari produk yang terdengar 'kaya' atau 'berat'.",
          "Meski begitu, dehidrasi tetap umum terjadi — AC, paparan matahari, dan aktivitas indoor yang lama tetap menarik air keluar dari kulit.",
          "Paparan UV di iklim tropis tinggi sepanjang tahun, bukan musiman — jadi sunscreen dan reapply setiap 2-3 jam adalah percakapan wajib, bukan opsional.",
          "Konsekuensi praktis: tawarkan tekstur ringan (gel, essence, lotion) lebih dulu, dan jelaskan produk dari sisi hasil akhirnya (cepat menyerap, tidak lengket) daripada dari kekayaan formulanya.",
          "Untuk area yang tetap butuh nutrisi lebih (misalnya pipi yang kering), sarankan layering tipis-tipis daripada satu produk kaya untuk seluruh wajah.",
        ],
        keyIngredientsLabel: "Tekstur Ringan untuk Iklim Tropis",
        keyIngredients: [
          { name: "Glycerin", description: "humektan ringan, mudah menyerap tanpa terasa lengket — cocok untuk cuaca lembap" },
          { name: "Niacinamide", description: "membantu kontrol minyak sekaligus menjaga hidrasi, cocok untuk kulit berminyak yang tetap butuh nutrisi" },
          { name: "SPF (Broad Spectrum)", description: "wajib di iklim tropis; ingatkan reapply setiap 2-3 jam terutama untuk customer dengan aktivitas outdoor" },
        ],
      },
      {
        title: "Kapan Harus Merujuk ke Profesional",
        image: u("1718146921295-700b969e7c78"),
        learningFocus: "Mengenali batas kewenangan BA dan tanda-tanda yang perlu dirujuk ke dokter kulit.",
        bullets: [
          "Peran BA adalah edukasi produk dan mencocokkan kebutuhan, bukan mendiagnosis kondisi kulit — penting untuk mengenali kapan sebuah keluhan sudah di luar itu.",
          "Tanda yang perlu dirujuk: jerawat kistik yang meradang parah, ruam yang tidak kunjung membaik, reaksi alergi (bengkak, gatal parah, kemerahan menyebar cepat), atau tahi lalat yang berubah bentuk/warna.",
          "Kalau customer sedang dalam perawatan dokter kulit (misalnya resep retinoid atau obat jerawat), tanyakan dulu apakah produk baru ini sudah dikonfirmasi aman dipakai bersamaan sebelum merekomendasikan.",
          "Merujuk bukan berarti kehilangan penjualan — sampaikan dengan hangat, dan tetap tawarkan yang aman dipakai sekarang (misalnya gentle cleanser) sambil menyarankan konsultasi untuk masalah utamanya.",
          "Catat keluhan berulang dari customer yang sama kalau memungkinkan, supaya BA lain di konter juga tahu riwayatnya saat customer itu datang lagi.",
        ],
        keyIngredients: [],
        baScript: "Untuk kemerahan yang Ibu ceritakan ini, saya sarankan coba konsultasi dulu ke dokter kulit ya, supaya penyebabnya jelas. Sambil itu, saya bisa bantu carikan pembersih yang lembut dan aman dipakai duluan.",
        qa: [
          { q: "Customer bilang sedang pakai retinol resep dokter, boleh saya tetap tawarkan produk eksfoliasi lain?", a: "Sebaiknya tidak digabung dulu tanpa konfirmasi dokter — retinol dan eksfolian kimia (AHA/BHA) yang dipakai bersamaan bisa memicu iritasi berat. Arahkan ke produk yang menenangkan/menghidrasi saja, dan sarankan dia tanya ke dokternya soal kombinasi produk." },
        ],
      },
    ]),
  },
  {
    id: "cat-makeup-overview",
    brand: "PT Aroma Abadi",
    category: "MAKEUP",
    categoryId: "makeup",
    level: "category",
    title: "Dasar-Dasar Makeup untuk BA",
    image: u("1596462502278-27bfdc403348"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Color Theory & Undertone",
        image: u("1512496015851-a90fb38ba796"),
        learningFocus: "Menentukan shade yang tepat dimulai dari membaca undertone, bukan menebak dari kemasan.",
        bullets: [
          "Undertone kulit terbagi tiga: **warm** (kekuningan/keemasan), **cool** (kemerahan/kebiruan), dan **neutral** (campuran keduanya) — ini berbeda dari skin tone (kedalaman warna kulit: terang, medium, gelap).",
          "Cara cepat membaca undertone: lihat urat nadi di pergelangan tangan pada cahaya alami — kehijauan cenderung warm, kebiruan/keunguan cenderung cool, campuran keduanya cenderung neutral.",
          "Cek juga reaksi terhadap perhiasan: emas biasanya lebih flattering untuk warm, silver lebih flattering untuk cool, dan keduanya sama-sama cocok untuk neutral.",
          "Shade dengan undertone yang salah akan terlihat abu-abu atau 'mengambang' di kulit meskipun kedalamannya (light/medium/deep) sudah pas — undertone menentukan kecocokan, bukan hanya tone.",
          "Selalu swatch di rahang atau leher, bukan di punggung tangan — warna kulit di kedua area itu sering berbeda cukup jauh.",
        ],
        keyIngredientsLabel: "Istilah Kunci",
        keyIngredients: [
          { name: "Warm Undertone", description: "rona dasar kulit kekuningan/keemasan, paling cocok dengan shade berbasis yellow/gold" },
          { name: "Cool Undertone", description: "rona dasar kulit kemerahan/kebiruan, paling cocok dengan shade berbasis pink/red" },
        ],
        baScript: "Coba lihat urat nadi di pergelangan tangan Kakak di cahaya ini — kelihatan agak kehijauan, jadi kita coba dulu yang basisnya golden ya, biasanya lebih menyatu.",
      },
      {
        title: "Brush vs Sponge",
        image: u("1583241475880-083f84372725"),
        learningFocus: "Memilih alat aplikasi berdasarkan hasil akhir yang diinginkan customer, bukan kebiasaan BA.",
        bullets: [
          "Brush (kuas) memberi coverage yang lebih tebal dan presisi karena bulunya memindahkan produk secara maksimal ke kulit — cocok untuk full coverage atau area detail seperti concealer di bawah mata.",
          "Sponge (terutama yang dilembapkan dulu) menyerap sedikit kelebihan produk saat dipakai, sehingga hasilnya lebih tipis dan menyatu alami dengan kulit — cocok untuk hasil 'skin-like'.",
          "Teknik stippling (menepuk-nepuk, bukan menggosok) dengan sponge basah adalah cara tercepat mengubah hasil foundation dari 'bertekstur' menjadi 'menyatu' tanpa menambah produk.",
          "Kombinasi keduanya sering paling efektif: brush untuk meratakan awal secara cepat, sponge untuk membaurkan tepi dan meredam kelebihan coverage.",
          "Kebersihan alat memengaruhi hasil — brush dan sponge yang kotor menimbun minyak dan bakteri, yang bisa membuat makeup cepat pudar dan memicu breakout.",
        ],
        keyIngredientsLabel: "Istilah Kunci",
        keyIngredients: [
          { name: "Brush Padat (Kabuki)", description: "cocok untuk foundation/powder full coverage, memindahkan produk secara maksimal" },
          { name: "Sponge Lembap (Damp)", description: "cocok untuk hasil natural, menyerap kelebihan produk saat aplikasi" },
        ],
      },
      {
        title: "Coverage & Finish: Bahasa yang Sama",
        image: u("1657624332868-2159deacefa9"),
        learningFocus: "Menyamakan istilah dengan customer supaya rekomendasi produk tidak meleset dari ekspektasi.",
        bullets: [
          "Coverage (daya tutup) punya tiga tingkat: **sheer** (tipis, masih terlihat kulit asli), **medium** (menutup sebagian besar noda/kemerahan), dan **full** (menutup total, termasuk hiperpigmentasi berat).",
          "Finish (hasil akhir) punya tiga arah utama: **matte** (tanpa kilap, cocok kulit berminyak), **dewy/glowy** (berkilau alami, cocok kulit kering–normal), dan **satin/natural** (di antara keduanya, paling universal).",
          "Coverage dan finish adalah dua sumbu yang terpisah — produk medium coverage bisa saja dewy finish atau matte finish, jadi jangan asumsikan keduanya selalu berbanding lurus.",
          "Saat customer bilang 'natural', gali lebih lanjut: maksudnya bisa 'tetap terlihat seperti kulit' (soal coverage) atau 'tidak terasa kaku' (soal finish) — dua hal berbeda yang butuh rekomendasi berbeda.",
          "Gunakan istilah yang sama dengan yang dipakai customer, lalu terjemahkan ke bahasa produk — ini yang membuat rekomendasi terasa didengar, bukan didikte.",
        ],
        keyIngredientsLabel: "Istilah Kunci",
        keyIngredients: [
          { name: "Sheer Coverage", description: "daya tutup ringan, hasil akhir masih menampakkan warna kulit asli" },
          { name: "Full Coverage", description: "daya tutup maksimal, mampu menyamarkan noda dan hiperpigmentasi berat" },
        ],
      },
      {
        title: "Urutan Layering: Cream Dulu, Baru Powder",
        image: u("1608979048467-6194dabc6a3d"),
        learningFocus: "Satu aturan yang menyelesaikan sebagian besar keluhan 'makeup belang/menggumpal'.",
        bullets: [
          "Aturan dasar layering makeup: semua produk berbahan dasar cream/liquid dipakai lebih dulu, baru produk powder di atasnya — bukan sebaliknya.",
          "Urutan yang benar: primer → base (tint/cushion/foundation) → concealer (cream) → blush/bronzer cream (bila dipakai) → setting powder → blush/bronzer powder (bila dipakai) → highlighter.",
          "Powder yang dipakai sebelum cream akan membuat produk cream di atasnya menggumpal dan sulit menyatu — ini penyebab paling umum keluhan 'makeup patchy' di siang hari.",
          "Produk powder boleh dilapis di atas produk cream sejenis untuk mengunci dan menambah intensitas warna (misalnya blush powder di atas blush cream), tapi cream di atas powder akan menarik dan merusak lapisan di bawahnya.",
          "Saat customer mengeluh makeup-nya sering belang, ini pertanyaan pertama yang perlu dicek sebelum merekomendasikan produk baru.",
        ],
        keyIngredientsLabel: "Istilah Kunci",
        keyIngredients: [
          { name: "Formula Cream/Liquid", description: "selalu diaplikasikan lebih dulu, sebelum produk berbasis powder" },
          { name: "Formula Powder", description: "diaplikasikan setelah semua langkah cream selesai, untuk mengunci hasil" },
        ],
      },
      {
        title: "Bicara Klaim dengan Akurat",
        image: u("1637851496668-9310c745c3dc"),
        learningFocus: "Menjaga kepercayaan customer dengan cara bicara yang jujur soal apa yang bisa dan tidak bisa dilakukan produk.",
        bullets: [
          "Klaim hanya boleh disampaikan jika sudah disetujui/didukung data dari brand — jangan menambah, melebih-lebihkan, atau menebak klaim yang belum pernah dibaca di materi resmi.",
          "Bedakan tiga jenis klaim: **klinis/instrumen** (diukur dengan alat pada kondisi terkontrol), **konsumen/self-assessment** (hasil survei panel pengguna, biasanya berupa persentase), dan **performa** (sifat formula yang dinyatakan brand tanpa angka pengujian, misalnya 'tahan 24 jam').",
          "Produk kosmetik bukan obat — hindari kata-kata yang terdengar medis seperti 'menyembuhkan', 'mengobati', atau 'mencegah kondisi kulit tertentu'; gunakan bahasa yang menggambarkan tampilan dan rasa di kulit.",
          "Jangan pernah mendiagnosis kondisi kulit customer (misalnya menyebut nama penyakit kulit) — cukup deskripsikan apa yang terlihat, dan arahkan ke profesional bila ragu.",
          "Kalau tidak tahu jawabannya (soal kandungan, sertifikasi halal, uji hewan, dan sejenisnya), jangan menebak — sampaikan akan dicek dan dikonfirmasi ulang; jawaban asal-asalan lebih merugikan daripada jujur belum tahu.",
        ],
        keyIngredientsLabel: "Istilah Kunci",
        keyIngredients: [
          { name: "Klaim Performa", description: "sifat formula yang dinyatakan brand tanpa nomor uji publik, mis. 'tahan 24 jam'" },
          { name: "Klaim Konsumen", description: "hasil survei panel pengguna, selalu disampaikan bersama kualifikasinya, mis. 'dalam pengujian'" },
        ],
        baScript: "Produk ini diformulasikan untuk tahan hingga 8 jam berdasarkan hasil uji internal brand — kalau nanti kondisinya beda karena cuaca atau jenis kulit Kakak, boleh balik lagi ya, kita sesuaikan lagi.",
      },
    ]),
  },
  {
    id: "cat-fragrance-overview",
    brand: "PT Aroma Abadi",
    category: "FRAGRANCE",
    categoryId: "fragrance",
    level: "category",
    title: "Dasar-Dasar Fragrance",
    image: u("1709662369957-0cbf9f8452fc"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Tiga Lapisan Aroma: Top, Middle, Base Note",
        image: u("1542452255191-c85a98f2c5d1"),
        learningFocus: "Memahami struktur aroma yang berubah dari waktu ke waktu, bukan aroma tunggal yang statis.",
        bullets: [
          "Setiap parfum tersusun dari tiga lapisan aroma yang muncul secara bertahap, bukan sekaligus — inilah sebabnya aroma di kulit customer terasa berbeda dari aroma yang tercium langsung dari botol atau tester.",
          "Top note tercium pertama kali, biasanya ringan dan segar (citrus, herbal, aromatik), tapi cepat menguap dalam 15-30 menit pertama — fungsinya memberi kesan awal yang menarik perhatian saat disemprotkan.",
          "Middle/heart note muncul setelah top note memudar, biasanya floral atau spicy, dan menjadi \"jiwa\" aroma yang bertahan 2-4 jam berikutnya — inilah karakter aroma yang paling lama dikenali orang lain.",
          "Base note adalah lapisan paling dasar dan paling tahan lama (woody, musk, amber, vanilla), menempel di kulit hingga berjam-jam dan sering menjadi ciri khas yang paling diingat dari sebuah parfum.",
          "Saat customer mencium tester langsung dari udara atau kertas, mereka baru mencium campuran top dan sedikit middle note — sarankan selalu untuk mengaplikasikan ke kulit dan menunggu beberapa menit sebelum memutuskan, supaya base note ikut tercium.",
        ],
        keyIngredientsLabel: "Contoh Keluarga Aroma per Lapisan",
        keyIngredients: [
          { name: "Citrus (Top)", description: "bergamot, lemon, jeruk — segar dan mudah dikenali di semprotan pertama" },
          { name: "Floral (Middle)", description: "melati, mawar, iris — inti aroma yang muncul setelah top note memudar" },
          { name: "Woody / Musk (Base)", description: "sandalwood, cedar, musk — lapisan paling tahan lama, jadi ciri khas parfum" },
        ],
        baScript: "Coba semprotkan ke pergelangan tangan Ibu, lalu kita tunggu beberapa menit — aroma yang tercium sekarang akan berubah, dan yang bertahan paling lama justru baru muncul nanti.",
      },
      {
        title: "Konsentrasi Parfum & Daya Tahan",
        image: u("1571646034647-52e6ea84b28c"),
        learningFocus: "Menjelaskan perbedaan Parfum, EDP, EDT, dan EDC dengan bahasa yang mudah dipahami customer.",
        bullets: [
          "Konsentrasi parfum menentukan seberapa lama aroma bertahan di kulit dan seberapa kuat proyeksinya (jarak orang lain bisa mencium aroma tersebut) — makin tinggi persentase konsentrat aroma, makin pekat dan tahan lama hasilnya.",
          "Parfum / Extrait de Parfum (20-30% konsentrat) paling pekat dan tahan lama, bisa 8 jam lebih, tapi biasanya paling mahal karena bahan baku aromanya jauh lebih banyak.",
          "Eau de Parfum / EDP (15-20% konsentrat) adalah titik tengah yang paling umum dijual — tahan sekitar 6-8 jam, cocok untuk penggunaan sehari-hari maupun acara khusus.",
          "Eau de Toilette / EDT (5-15% konsentrat) lebih ringan dan segar, tahan sekitar 3-5 jam, sering jadi pilihan untuk cuaca panas atau pemakaian di jam kerja.",
          "Eau de Cologne / EDC (2-4% konsentrat) paling ringan dan tahan paling singkat (1-2 jam), cocok untuk penyegaran cepat, bukan aroma yang diharapkan bertahan seharian.",
          "Konsentrasi tinggi bukan berarti lebih baik — EDT yang disukai customer bisa jadi pilihan yang lebih tepat daripada EDP yang terasa terlalu kuat untuk seleranya. Tanyakan dulu preferensi kekuatan aroma sebelum merekomendasikan berdasarkan konsentrasi saja.",
        ],
        keyIngredients: [],
        qa: [
          { q: "EDP dan EDT itu apa bedanya?", a: "Bedanya di persentase konsentrat aroma. EDP lebih pekat dan tahan lebih lama (6-8 jam), EDT lebih ringan dan segar (3-5 jam) — pilih berdasarkan berapa lama Ibu ingin aromanya bertahan dan seberapa kuat proyeksinya." },
          { q: "Kalau aromanya cepat hilang, apa produknya jelek?", a: "Belum tentu — bisa juga karena jenis kulit (kulit kering menahan aroma lebih singkat dibanding kulit berminyak) atau titik aplikasi yang kurang tepat. Coba aplikasikan di titik nadi yang lebih hangat seperti leher atau pergelangan tangan." },
        ],
      },
      {
        title: "Titik Aplikasi yang Tepat",
        image: u("1596462502278-27bfdc403348"),
        learningFocus: "Mengajarkan cara mengaplikasikan parfum agar aromanya bertahan maksimal sepanjang hari.",
        bullets: [
          "Aplikasikan parfum di titik nadi (pulse points) — area di mana pembuluh darah paling dekat ke permukaan kulit, sehingga panas tubuh membantu aroma menguap secara bertahap sepanjang hari.",
          "Titik nadi utama: pergelangan tangan, di belakang telinga, sisi leher, lekuk siku bagian dalam, dan di belakang lutut untuk aroma yang lebih menyebar saat bergerak.",
          "Semprotkan dari jarak sekitar 15-20 cm dari kulit, jangan terlalu dekat, supaya aroma tersebar merata dan tidak menumpuk hanya di satu titik.",
          "Jangan menggosokkan pergelangan tangan setelah menyemprot — gesekan menghasilkan panas yang memecah struktur molekul aroma dan justru mempercepat top note menguap, membuat parfum terasa lebih cepat hilang.",
          "Aplikasikan parfum setelah mandi, saat kulit masih sedikit lembap — kelembapan alami kulit membantu aroma menempel lebih lama dibanding kulit yang benar-benar kering.",
          "Rambut dan pakaian juga bisa menahan aroma lebih lama dari kulit, tapi hati-hati menyemprot langsung ke kain karena beberapa parfum bisa meninggalkan noda pada bahan tertentu.",
        ],
        keyIngredients: [],
        baScript: "Coba jangan digosok ya setelah disemprot — cukup dibiarkan kering sendiri, supaya aromanya keluar sesuai urutannya dan nggak cepat hilang.",
      },
      {
        title: "Menyimpan Parfum dengan Benar",
        image: u("1608979048467-6194dabc6a3d"),
        learningFocus: "Edukasi penyimpanan agar customer tidak kecewa saat aroma berubah sebelum parfum habis.",
        bullets: [
          "Simpan parfum di tempat sejuk, kering, dan gelap — jauhkan dari sinar matahari langsung dan sumber panas seperti dekat jendela, kamar mandi, atau dashboard mobil.",
          "Paparan panas dan cahaya UV berulang bisa memecah senyawa aromatik dalam parfum, membuat aroma berubah (biasanya jadi lebih tajam atau apek) dan warnanya menggelap lebih cepat dari seharusnya.",
          "Hindari menyimpan parfum di kamar mandi meski terlihat praktis — perubahan suhu dan kelembapan yang naik-turun akibat air panas mempercepat oksidasi aroma.",
          "Simpan botol dalam posisi berdiri dan tertutup rapat setelah dipakai, untuk meminimalkan kontak dengan udara (oksidasi) yang bisa mengubah komposisi aroma dari waktu ke waktu.",
          "Parfum yang disimpan dengan benar umumnya tetap baik kualitasnya selama 3-5 tahun setelah dibuka; jika aroma terasa berubah drastis atau warnanya sudah sangat gelap, itu tanda sudah waktunya diganti.",
        ],
        keyIngredients: [],
      },
      {
        title: "Membaca Preferensi Aroma Customer",
        image: u("1709662369957-0cbf9f8452fc"),
        learningFocus: "Kerangka percakapan untuk menemukan parfum yang tepat tanpa membuat customer bingung oleh terlalu banyak pilihan.",
        bullets: [
          "Customer jarang bisa menjelaskan aroma yang mereka suka dengan istilah teknis (citrus, chypre, oriental) — tugas BA adalah menerjemahkan preferensi mereka ke dalam keluarga aroma yang tepat lewat pertanyaan sederhana.",
          "Mulai dengan pertanyaan terbuka: \"Biasanya suka parfum yang segar atau yang hangat?\", \"Untuk dipakai sehari-hari atau acara khusus?\", \"Ada parfum yang selama ini disukai — boleh diceritakan aromanya seperti apa?\"",
          "Empat keluarga aroma besar sebagai kerangka: Fresh/Citrus (segar, ringan, cocok siang hari dan cuaca panas), Floral (feminin, romantis, serbaguna), Oriental/Spicy (hangat, pekat, cocok malam hari atau cuaca dingin), dan Woody (maskulin, earthy, tahan lama).",
          "Jangan biarkan customer mencium lebih dari 3 aroma berturut-turut dalam satu sesi — indra penciuman cepat lelah (\"nose fatigue\") dan setelah itu semua parfum mulai tercium mirip. Tawarkan jeda dengan mencium pergelangan tangan sendiri atau kertas kopi.",
          "Selalu uji di kulit, bukan hanya di kertas tester — reaksi kimiawi parfum dengan pH kulit tiap orang berbeda, sehingga parfum yang sama bisa tercium berbeda di dua orang yang berlainan.",
        ],
        keyIngredients: [],
        qa: [
          { q: "Kok parfum yang saya coba di toko lain aromanya beda waktu saya pakai sendiri?", a: "Wajar — aroma parfum bereaksi dengan pH dan suhu kulit masing-masing orang, jadi hasil akhirnya bisa sedikit berbeda. Coba dulu di kulit Ibu sendiri, jangan hanya berpatokan pada aroma di kertas tester atau di kulit orang lain." },
          { q: "Kenapa setelah mencium beberapa parfum semuanya jadi tercium sama?", a: "Itu namanya nose fatigue — indra penciuman lelah setelah mencium beberapa aroma berturut-turut. Sebaiknya coba maksimal 2-3 aroma per sesi, dengan jeda mencium pergelangan tangan sendiri di antaranya." },
        ],
      },
    ]),
  },
  {
    id: "cat-wellness-overview",
    brand: "PT Aroma Abadi",
    category: "WELLNESS",
    categoryId: "wellness",
    level: "category",
    title: "Dasar-Dasar Wellness",
    image: u("1723150512429-bfa92988d845"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Membangun Rutinitas yang Berkelanjutan",
        image: u("1723150512429-bfa92988d845"),
        learningFocus: "Kenapa rutinitas yang sederhana lebih bertahan lama daripada yang rumit.",
        bullets: [
          "Rutinitas wellness yang bertahan lama dibangun dari kebiasaan kecil, bukan langkah yang rumit sekaligus — mulai dari satu ritual, misalnya 10 menit relaksasi sebelum tidur, baru tambahkan langkah lain setelah itu terasa natural, bukan beban.",
          "**Konsistensi mengalahkan kompleksitas** — customer yang mencoba enam langkah baru sekaligus biasanya berhenti dalam seminggu; customer yang mulai dari satu kebiasaan kecil biasanya bertahan berbulan-bulan.",
          "Kaitkan rutinitas baru dengan momen yang sudah ada di keseharian customer (setelah sikat gigi, sebelum tidur) supaya lebih mudah menempel sebagai kebiasaan, bukan sebagai tugas tambahan.",
          "Rutinitas wellness tidak harus dijalani setiap hari untuk terasa bermanfaat — beberapa produk (mask, body scrub, relaxing serum) memang dirancang untuk dipakai 1-2 kali seminggu, bukan harian.",
          "Saat merekomendasikan, tanyakan dulu rutinitas yang sudah dijalani customer, lalu tawarkan produk yang melengkapi kebiasaan itu — bukan menggantikannya dari nol.",
        ],
        keyIngredients: [],
      },
      {
        title: "Penyimpanan Produk Wellness",
        image: u("1631214540553-ff044a3ff1d4"),
        learningFocus: "Mengapa produk wellness lebih sensitif terhadap cara penyimpanan dibanding kategori lain.",
        bullets: [
          "Banyak produk wellness — essential oil, aromatic serum, produk dengan bahan aktif alami — sensitif terhadap panas dan cahaya matahari langsung, yang bisa mempercepat oksidasi dan menurunkan efektivitas maupun aromanya.",
          "Simpan di tempat sejuk dan kering, jauh dari jendela atau kamar mandi yang lembap; suhu ruang yang stabil lebih baik daripada suhu yang naik-turun sepanjang hari.",
          "Kemasan gelap (amber atau opaque) pada banyak produk wellness bukan sekadar estetika — itu memang didesain untuk memperlambat degradasi akibat cahaya, jadi ingatkan customer untuk tidak memindahkan produk ke wadah bening.",
          "Produk dengan wewangian alami (bukan sintetis) umumnya punya masa pakai optimal yang lebih pendek setelah dibuka — sampaikan ini sebagai bagian dari cara pakai yang wajar, bukan sebagai kekurangan produk.",
        ],
        keyIngredientsLabel: "Bahan yang Perlu Perhatian Ekstra",
        keyIngredients: [
          { name: "Essential Oil", description: "mudah teroksidasi bila terpapar panas dan cahaya langsung; selalu simpan tertutup rapat di tempat sejuk." },
          { name: "Bahan Aktif Alami (ekstrak tumbuhan)", description: "cenderung kurang stabil dibanding bahan sintetis — kualitas aroma dan tekstur bisa berubah bila disimpan sembarangan." },
        ],
      },
      {
        title: "Wellness sebagai Bagian dari Selling",
        image: u("1631214524020-7e18db9a8f92"),
        learningFocus: "Memposisikan wellness sebagai nilai tambah dari rutinitas customer, bukan kategori terpisah yang dijual sendiri.",
        bullets: [
          "Wellness paling mudah terjual saat dikaitkan dengan momen, bukan dijual sebagai kategori berdiri sendiri — misalnya menawarkan relaxing serum setelah customer bercerita soal minggu yang melelahkan.",
          "Gunakan bahasa manfaat rasa (relaksasi, ritual, jeda sejenak) alih-alih klaim medis atau berlebihan — wellness menjual pengalaman, bukan janji penyembuhan.",
          "Wellness cocok jadi cross-sell alami dari kategori lain: customer yang membeli skin care atau body care sering terbuka pada produk yang melengkapi rutinitas mereka jadi sebuah 'ritual', bukan sekadar daftar belanja.",
          "Hindari memaksakan wellness ke semua customer — tawarkan sebagai pilihan tambahan, bukan produk wajib, karena kebutuhan self-care sangat personal dan berbeda-beda.",
        ],
        keyIngredients: [],
        baScript: "Kelihatannya minggu ini padat ya, Kak. Banyak customer yang menutup rutinitas malamnya dengan produk relaxing seperti ini — bukan buat menyembuhkan apa-apa, tapi buat kasih jeda sejenak sebelum tidur. Mau saya bantu coba?",
      },
      {
        title: "Mendengarkan Kebutuhan Customer",
        image: u("1620464003286-a5b0d79f32c2"),
        learningFocus: "Mengapa bertanya dulu menghasilkan rekomendasi yang lebih tepat daripada langsung menawarkan produk.",
        bullets: [
          "Mulai dari pertanyaan terbuka (\"Biasanya waktu luang dipakai buat apa?\", \"Ada bagian rutinitas yang terasa kurang?\") daripada langsung menawarkan produk — ini membantu BA memahami kebutuhan sebenarnya, bukan menebak.",
          "Dengarkan kata kunci yang disebut customer sendiri — 'susah tidur', 'kulit kusam karena stres', 'butuh me-time' — dan kaitkan rekomendasi langsung ke kata-kata itu, bukan ke fitur produk.",
          "Wellness sangat personal: yang cocok untuk satu customer belum tentu cocok untuk yang lain, jadi hindari rekomendasi 'satu produk untuk semua orang'.",
          "**Diam sejenak setelah bertanya** juga bagian dari mendengarkan — beri customer ruang untuk menjawab dengan jujur, jangan buru-buru mengisi keheningan dengan tawaran produk lain.",
        ],
        keyIngredients: [],
        baScript: "Boleh tahu, akhir-akhir ini bagian mana dari keseharian Kakak yang paling terasa melelahkan? Biar saya bisa bantu carikan yang paling pas, bukan cuma yang paling laku.",
      },
      {
        title: "Kapan Merujuk ke Profesional",
        image: u("1631214499500-2e34edcaccfe"),
        learningFocus: "Batas peran BA, dan kapan sebaiknya mengarahkan customer ke bantuan profesional.",
        bullets: [
          "BA bukan tenaga medis atau terapis — produk wellness membantu rutinitas self-care, tapi tidak menggantikan penanganan profesional untuk kondisi seperti insomnia kronis, kecemasan berat, atau masalah kulit yang tidak kunjung membaik.",
          "Kalau customer menyebut gejala yang terdengar medis (reaksi alergi, iritasi yang tidak kunjung reda, gangguan tidur berbulan-bulan), sampaikan dengan sopan bahwa ini sebaiknya dikonsultasikan ke dokter atau profesional terkait, bukan diselesaikan lewat produk konter.",
          "Merujuk bukan berarti gagal menjual — customer yang merasa didengar dan diarahkan dengan jujur cenderung lebih percaya dan kembali lagi ke konter.",
          "Hindari membuat klaim bahwa produk bisa 'menyembuhkan' atau 'mengatasi' kondisi tertentu; gunakan bahasa 'membantu mendukung rutinitas' yang lebih akurat dan aman.",
        ],
        keyIngredients: [],
        qa: [
          { q: "Kalau customer bilang susah tidur, boleh langsung tawarkan produk wellness?", a: "Boleh, sebagai bagian dari rutinitas relaksasi — tapi sampaikan itu membantu menciptakan suasana tenang sebelum tidur, bukan obat. Kalau susah tidurnya sudah berlangsung lama atau berat, sarankan bicara ke dokter." },
          { q: "Apa tandanya sebuah pertanyaan customer sudah di luar peran BA?", a: "Begitu pertanyaannya soal diagnosis, dosis, atau kondisi medis spesifik (misalnya \"apakah saya kena insomnia?\"), itu tandanya untuk merujuk, bukan menjawab sendiri." },
        ],
      },
    ]),
  },
  {
    id: "cat-hair-care-overview",
    brand: "PT Aroma Abadi",
    category: "HAIR CARE",
    categoryId: "hair-care",
    level: "category",
    title: "Dasar-Dasar Hair Care",
    image: u("1583209814683-c023dd293cc6"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Dasar-Dasar Porositas Rambut",
        image: u("1583209814683-c023dd293cc6"),
        bullets: [
          "Porositas adalah seberapa mudah kutikula rambut menyerap dan menahan kelembapan — bukan soal rambut tebal atau tipis",
          "Rambut low porosity: kutikula rapat dan sulit ditembus produk, cepat terasa berat kalau formulanya terlalu kaya — butuh produk ringan dan sedikit bantuan panas agar kutikula terbuka",
          "Rambut high porosity: kutikula terbuka (sering akibat proses kimia atau panas berulang), cepat menyerap kelembapan tapi juga cepat kehilangannya — butuh sealant seperti oil di langkah terakhir",
          "Cara cepat membaca porositas tanpa alat: tanyakan berapa lama rambut kering setelah keramas dan apakah produk sering terasa 'numpuk' — jawabannya sudah cukup jadi petunjuk",
        ],
        keyIngredients: [
          { name: "Hydrolyzed Keratin", description: "mengisi celah kutikula pada rambut high porosity agar lebih kuat" },
          { name: "Argan Oil", description: "sealant alami yang mengunci kelembapan di lapisan terluar rambut" },
        ],
      },
      {
        title: "Proteksi Panas Sebelum Styling",
        image: u("1625093525885-282384697917"),
        bullets: [
          "Alat styling panas seperti catokan, hair dryer, dan curling iron di atas 180°C bisa merusak ikatan protein rambut secara permanen",
          "Heat protectant bekerja dengan membentuk lapisan pelindung sementara di batang rambut yang menahan sebagian panas sebelum mencapai kutikula",
          "Selalu aplikasikan heat protectant sebelum styling, bukan sesudah — produk ini adalah penghalang, bukan pemulih kerusakan yang sudah terjadi",
          "Semakin sering customer styling dengan panas, semakin penting mengingatkan mereka memakai heat protectant setiap kali, bukan hanya sesekali",
        ],
        keyIngredients: [
          { name: "Dimethicone", description: "membentuk lapisan pelindung tahan panas di batang rambut" },
          { name: "Panthenol (Pro-Vitamin B5)", description: "melembapkan & memperkuat rambut yang sering terpapar panas" },
        ],
      },
      {
        title: "Membaca Kebutuhan Rambut Customer",
        image: u("1631214524049-0ebbbe6d81aa"),
        bullets: [
          "Mulai dari observasi, bukan asumsi: perhatikan tekstur, kilap, dan kondisi ujung rambut saat customer datang ke konter",
          "Tanyakan rutinitas nyata — berapa kali keramas per minggu, apakah rambut pernah diwarnai atau diluruskan, dan seberapa sering styling panas dipakai",
          "Bedakan keluhan 'rambut kering' karena kurang kelembapan dengan 'rambut rusak' karena kerusakan struktural — solusi keduanya tidak sama",
          "Sesuaikan rekomendasi dengan tujuan customer, bukan hanya kondisi rambutnya — ada yang ingin volume, ada yang ingin kilap, ada yang ingin rambut lebih mudah diatur",
        ],
        keyIngredients: [],
      },
      {
        title: "Urutan Produk Hair Care",
        image: u("1617055407123-3d7130c1f940"),
        bullets: [
          "Urutan dasar: shampoo (membersihkan kulit kepala) → conditioner (melembutkan & menutup kutikula) → treatment/mask 1-2x seminggu → leave-in atau serum sebagai penutup",
          "Conditioner selalu diaplikasikan dari tengah batang rambut ke ujung, hindari kulit kepala agar rambut tidak cepat lepek",
          "Hair oil atau serum adalah langkah terakhir sebagai sealant — dipakai di rambut lembap atau kering tergantung formulanya",
          "Untuk rambut yang diwarnai, sisipkan produk color-protection di posisi shampoo agar warna tidak cepat pudar",
        ],
        keyIngredients: [
          { name: "Cetrimonium Chloride", description: "conditioning agent yang menutup kutikula rambut setelah keramas" },
          { name: "Cetearyl Alcohol", description: "melembutkan rambut & memudahkan penyisiran tanpa membuatnya berat" },
        ],
      },
      {
        title: "Kesalahan Umum di Konter Hair Care",
        image: u("1718146921295-700b969e7c78"),
        bullets: [
          "Merekomendasikan produk anti-frizz saat masalah sebenarnya adalah kurang kelembapan — dua kondisi ini butuh pendekatan yang berbeda",
          "Menyarankan hair mask setiap hari — pemakaian berlebihan justru bisa membuat rambut terasa berat dan lepek",
          "Melewatkan pertanyaan soal proses kimia terakhir (pewarnaan, smoothing, keriting) padahal ini menentukan produk apa yang aman dipakai",
          "Menjanjikan hasil instan untuk masalah yang butuh waktu, seperti rambut rontok atau kerusakan berat — bangun ekspektasi yang realistis sejak awal",
        ],
        keyIngredients: [],
      },
    ]),
  },
  {
    id: "cat-body-care-overview",
    brand: "PT Aroma Abadi",
    category: "BODY CARE",
    categoryId: "body-care",
    level: "category",
    title: "Dasar-Dasar Body Care",
    image: u("1631214524020-7e18db9a8f92"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Urutan Layering Body Care",
        image: u("1631214524020-7e18db9a8f92"),
        bullets: [
          "Mulai dari produk paling ringan ke paling kental -- body wash, lalu body lotion/cream, baru body oil di lapisan paling akhir",
          "Aplikasikan lotion/cream saat kulit masih sedikit lembap sehabis mandi, bukan setelah benar-benar kering, agar hidrasi lebih terkunci",
          "Body oil bukan pengganti moisturizer -- fungsinya menyegel kelembapan yang sudah diserap, jadi selalu dipakai setelah lotion/cream",
          "Produk treatment khusus (serum pencerah, produk anti-selulit) diaplikasikan sebelum lotion/cream agar bahan aktifnya menyerap lebih dulu",
        ],
        keyIngredients: [
          { name: "Glycerin", description: "humektan yang menarik air ke kulit, paling efektif di tahap awal layering" },
          { name: "Shea Butter", description: "emolien kaya yang mengunci kelembapan di lapisan paling akhir" },
        ],
      },
      {
        title: "Frekuensi Eksfoliasi yang Tepat",
        image: u("1620464003286-a5b0d79f32c2"),
        bullets: [
          "Kulit badan boleh dieksfoliasi lebih sering dari wajah karena lapisan kulitnya lebih tebal -- umumnya 2-3 kali seminggu",
          "Kulit sensitif atau kering sebaiknya cukup 1 kali seminggu supaya skin barrier tidak terganggu",
          "Physical scrub lebih cocok untuk area kasar seperti siku dan lutut; chemical exfoliant (AHA/BHA) lebih rata untuk area luas seperti punggung",
          "Jangan rekomendasikan eksfoliasi untuk kulit yang sedang iritasi, terbakar matahari, atau baru saja dicukur",
        ],
        keyIngredients: [
          { name: "Glycolic Acid (AHA)", description: "mengangkat sel kulit mati secara kimiawi, cocok untuk area tubuh yang luas" },
          { name: "Sugar/Walnut Shell Granules", description: "butiran scrub fisik untuk area yang lebih kasar seperti siku dan tumit" },
        ],
      },
      {
        title: "Area Sensitif vs Area Kulit Tebal",
        image: u("1611080541599-8c6dbde6ed28"),
        bullets: [
          "Area kulit tebal seperti siku, lutut, dan tumit menoleransi tekstur lebih kaya dan eksfoliasi yang lebih agresif",
          "Area sensitif seperti leher, dada, dan lipatan tubuh butuh formula fragrance-free dan bebas butiran scrub kasar",
          "Kenali tanda kulit sensitif dari cerita customer -- kemerahan, gatal, atau perih saat coba produk baru -- lalu arahkan ke varian fragrance-free",
          "Untuk penggelapan di siku/lutut, edukasikan bahwa itu penumpukan sel kulit mati akibat gesekan, bukan pigmentasi permanen, supaya ekspektasi customer realistis",
        ],
        keyIngredients: [
          { name: "Urea", description: "melembutkan area kulit sangat tebal seperti tumit dan siku" },
          { name: "Colloidal Oatmeal", description: "menenangkan area sensitif yang mudah iritasi" },
        ],
      },
      {
        title: "Body Oil sebagai Sealant",
        image: u("1750796987114-dd409dab14e2"),
        bullets: [
          "Body oil bukan sumber hidrasi utama -- fungsinya menyegel kelembapan yang sudah diserap kulit dari lotion/cream sebelumnya",
          "Paling efektif diaplikasikan di kulit yang masih sedikit lembap, sekitar 1-2 menit setelah lotion, bukan di kulit yang sudah kering",
          "Paling relevan untuk kulit sangat kering atau cuaca dingin/ruangan ber-AC; untuk kulit berminyak, cukup pakai tipis di area yang benar-benar butuh",
          "Jelaskan ke customer bahwa rasa lengket sesaat itu normal dan akan meresap sempurna dalam beberapa menit, bukan tanda produk berlebihan",
        ],
        keyIngredients: [
          { name: "Squalane", description: "oil ringan yang menyerupai sebum alami kulit sehingga tidak terasa lengket" },
          { name: "Jojoba Oil", description: "membentuk lapisan pelindung di permukaan kulit tanpa menyumbat pori" },
        ],
      },
      {
        title: "Rekomendasi Berdasarkan Musim/Iklim",
        image: u("1649198142387-19f1facee9ba"),
        bullets: [
          "Di iklim tropis dan lembap, rekomendasikan tekstur lotion atau gel yang ringan dan cepat meresap, bukan body butter yang berat",
          "Saat cuaca kering atau customer banyak beraktivitas di ruangan ber-AC, kulit kehilangan kelembapan lebih cepat sehingga body butter/oil jadi lebih relevan",
          "Untuk cuaca panas dan lembap, prioritaskan produk non-lengket dan cepat menyerap supaya customer nyaman dipakai seharian di bawah pakaian",
          "Selalu tanyakan rutinitas harian customer -- lebih banyak indoor ber-AC atau outdoor -- sebelum merekomendasikan tekstur produk yang tepat",
        ],
        keyIngredients: [
          { name: "Aloe Vera", description: "menghidrasi ringan dan menyejukkan kulit di cuaca panas atau lembap" },
          { name: "Ceramide", description: "memperkuat skin barrier saat kulit sering terpapar AC atau udara kering" },
        ],
      },
    ]),
  },

  // ── Brand-level ────────────────────────────────────────────────────────────
  {
    id: "brand-dolce-overview",
    brand: "Dolce & Gabbana",
    category: "BRAND",
    categoryId: "brand-overview",
    level: "brand",
    title: "Mengenal Dolce & Gabbana Beauty",
    image: u("1542452255191-c85a98f2c5d1"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Heritage: Dari Sisilia ke Konter",
        image: u("1709662369957-0cbf9f8452fc"),
        learningFocus: "Cerita asal brand, dan cara mengubahnya jadi pembuka percakapan di konter.",
        bullets: [
          "Dolce & Gabbana lahir dari kolaborasi dua desainer Italia, Domenico Dolce dan Stefano Gabbana, dengan akar yang sangat kuat di Sisilia — pulau yang jadi sumber hampir semua bahasa visual dan sensorial lini beauty-nya.",
          "Heritage ini bukan sekadar cerita, ia hadir literal di dalam produk: Bergamot Glow Primer memakai bergamot asli dari Calabria, dan teksturnya sengaja dibuat menyerupai granita — sorbet dingin khas Sisilia yang meleleh begitu menyentuh kulit.",
          "Bagi BA, mengetahui asal-usul ini penting karena itulah alasan tekstur, wangi, dan packaging D&G terasa berbeda dari brand beauty lain — dan bisa jadi pembuka obrolan yang natural, bukan sekadar trivia sejarah.",
          "Gunakan cerita ini di awal percakapan, terutama untuk customer yang menyukai heritage brand fashion — bukan hanya disimpan sebagai penutup di akhir penjualan.",
        ],
        keyIngredients: [],
        baScript: "Bergamotnya ini asli dari Calabria, Italia — makanya teksturnya seperti granita, sorbet khas Sisilia. Dingin di kulit, lalu meresap perlahan.",
      },
      {
        title: "Positioning: Mewah, Ekspresif, Personal",
        image: u("1579754513330-82d8b8f0e189"),
        learningFocus: "Memahami posisi D&G dibanding brand luxury lain, agar BA menjualnya dengan bahasa yang tepat.",
        bullets: [
          "D&G Beauty diposisikan sebagai luxury yang ekspresif dan personal — bukan luxury yang kaku atau senyap, tapi yang berani tampil lewat warna, wangi, dan tekstur yang benar-benar terasa di kulit.",
          "Line skin care-nya, Fresh Skin, bahkan diposisikan sebagai lapisan paling intim dan esensial — bagian yang dipakai paling dekat dengan kulit, sebelum makeup atau apa pun di atasnya.",
          "Karena posisinya ekspresif, D&G paling cocok untuk customer yang ingin tampil lebih hidup dan percaya diri, bukan yang mencari hasil paling netral atau paling minimal.",
          "Untuk BA, ini berarti jangan membuka percakapan dengan bahasa yang terlalu teknis — mulai dari bagaimana produk terasa dan bagaimana ia membuat customer tampil, baru masuk ke detail formula.",
        ],
        keyIngredients: [],
      },
      {
        title: "Peta Portofolio: Fragrance, Makeup, Skin Care",
        image: u("1608979048467-6194dabc6a3d"),
        learningFocus: "Bentuk keseluruhan portofolio, sebelum masuk ke detail satu produk.",
        bullets: [
          "Portofolio D&G Beauty di konter terbagi tiga: Fragrance (The Only One, Light Blue, The One Rose, Intenso Pour Homme), Makeup di bawah nama Fresh Look, dan Skin Care di bawah nama Fresh Skin.",
          "Fresh Look menata makeup dalam urutan complexion wardrobe yang tetap: Prep (primer) → Perfect (tint/cushion) → Correct (concealer) → Colour (blush/bronzer) → Set (finishing powder) → Lift (highlighter).",
          "Fresh Skin menyasar audiens yang lebih muda (18–30 tahun) dengan tiga mindset customer: Skincare Addict yang ingin rutinitas lengkap, Skintellectual yang ingin tahu persentase active, dan Experience Driven yang ingin merasakan tekstur lebih dulu.",
          "Menguasai peta ini membuat BA bisa mengarahkan customer lintas kategori — misalnya dari fragrance ke makeup — tanpa terasa memaksa, karena semua lini berbagi bahasa brand yang sama.",
        ],
        keyIngredients: [],
      },
      {
        title: "Bahasa Brand: Bagaimana BA Bicara D&G",
        image: u("1657624332868-2159deacefa9"),
        learningFocus: "Kalimat dan klaim yang aman dipakai di konter, mengikuti aturan F3.",
        bullets: [
          "D&G punya aturan F3 untuk klaim: sebutkan fakta dan asal-usulnya (\"bergamot Italia dari Calabria, dikenal karena sifat antioksidannya\"), jangan diubah jadi janji medis (\"melindungi kulit Anda\").",
          "Gunakan idenya, bukan mengutip copy marketing mentah-mentah — misalnya katakan \"ini lapisan dasar sebelum makeup Anda\" ketimbang mengucapkan tagline resminya langsung ke customer.",
          "Ceritakan tekstur dan pengalaman sensorial dulu (dingin seperti granita, wangi bergamot segar) sebelum masuk ke daftar kandungan — D&G adalah brand yang dijual lewat rasa, bukan lewat spesifikasi.",
          "Konsisten pakai nama resmi tiap lini — Fresh Look untuk makeup, Fresh Skin untuk skin care — supaya customer belajar mengenali portofolio brand, bukan cuma satu produk yang dibeli hari itu.",
        ],
        keyIngredients: [],
        qa: [
          { q: "Kenapa harus sebut asal bahan seperti 'Calabria' atau 'Sisilia'? Apa itu penting buat customer?", a: "Provenance ini bagian dari cerita luxury D&G — bukan sekadar detail geografis, tapi alasan kenapa tekstur dan wanginya terasa khas. Tapi selalu gandengkan dengan manfaat konkret, jangan berhenti di nama tempat saja." },
          { q: "Boleh nggak saya bilang produk D&G 'menyembuhkan' atau 'menghilangkan' masalah kulit?", a: "Tidak. Ikuti aturan F3 — sebut fakta dan sifatnya (misalnya 'dikenal karena sifat antioksidan'), jangan mengubahnya jadi klaim medis atau janji hasil pasti." },
        ],
      },
      {
        title: "Customer Ideal D&G Beauty",
        image: u("1596462502278-27bfdc403348"),
        learningFocus: "Mengenali siapa yang paling cocok didekati dengan cerita D&G, dan kapan mengganti pendekatan.",
        bullets: [
          "Customer ideal D&G adalah yang mencari pengalaman luxury yang terasa personal dan ekspresif — bukan yang hanya membandingkan harga per mL atau per gram dengan brand lain.",
          "Untuk Fragrance dan Fresh Look, sasarannya lebih luas dan matang; untuk Fresh Skin, sasarannya lebih muda (18–30 tahun) dan sudah cukup melek skincare untuk menghargai kombinasi bahan alami Italia dan molekul hi-tech.",
          "Customer yang merespons cerita asal (Sisilia, Calabria, granita) biasanya juga terbuka pada produk lintas kategori — ini titik masuk yang baik untuk cross-sell dari fragrance ke makeup atau skin care.",
          "Kalau customer justru ingin hasil cepat dan praktis tanpa peduli cerita heritage, geser fokus ke manfaat fungsional (tahan lama, kontrol minyak, hidrasi 24 jam) — heritage tetap benar, tapi bukan hook yang tepat untuk semua orang.",
        ],
        keyIngredients: [],
      },
    ]),
  },
  {
    id: "brand-baremin-overview",
    brand: "bareMinerals",
    category: "BRAND",
    categoryId: "brand-overview",
    level: "brand",
    title: "Mengenal bareMinerals",
    image: u("1679623100266-db82be84f5f3"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Heritage: Mineral, Bukan Sekadar Makeup",
        image: u("1679623100266-db82be84f5f3"),
        learningFocus: "Kenapa cerita mineral ini penting buat BA, bukan cuma sejarah brand.",
        bullets: [
          "Lahir tahun 1976, bareMinerals adalah salah satu pelopor kategori mineral makeup — jauh sebelum istilah \"clean beauty\" jadi tren.",
          "Formula intinya dibangun dari mineral alami yang dihaluskan, bukan sekadar pigmen yang dicampur ke basis konvensional — filosofi inilah yang membedakannya dari brand makeup pada umumnya.",
          "Pendekatan bebas talc, paraben, pewangi sintetis, dan minyak ini awalnya lahir dari kebutuhan pasien pasca-prosedur kulit yang butuh makeup seringan mungkin.",
          "Untuk BA: cerita ini bukan nostalgia brand, tapi alasan konkret kenapa dermatologist dan customer berkulit sensitif sering diarahkan ke bareMinerals.",
        ],
        keyIngredientsLabel: "Mineral Inti",
        keyIngredients: [
          { name: "Mica", description: "memberi kilau alami tanpa terasa berat di kulit" },
          { name: "Titanium Dioxide", description: "mineral pelindung yang juga membantu coverage lembut" },
          { name: "Zinc Oxide", description: "menenangkan kulit sekaligus memberi perlindungan ringan" },
        ],
      },
      {
        title: "Positioning: Clean, Simple, Skin-First",
        image: u("1586495777744-4413f21062fa"),
        learningFocus: "Membedakan bareMinerals dari brand makeup yang color-first.",
        bullets: [
          "bareMinerals memposisikan diri di persimpangan skincare dan makeup — \"makeup yang baik untuk kulit\", bukan makeup yang harus ditoleransi kulit.",
          "Klaim \"skin-first\" bukan slogan kosong: tekstur diformulasikan agar breathable, minim menyumbat pori, dan nyaman dipakai seharian — termasuk oleh kulit berjerawat atau baru pulih dari treatment.",
          "Dibanding brand makeup yang bicara shade dan finish lebih dulu, bareMinerals lebih dulu bicara kondisi kulit customer — pendekatan konsultatif yang perlu dibawa BA ke lantai konter.",
          "Simplicity juga berarti ritual lebih singkat: produk multi-fungsi (coverage sekaligus perawatan) dibanding rutinitas berlapis-lapis.",
        ],
        keyIngredients: [],
      },
      {
        title: "Peta Portofolio Produk",
        image: u("1619352520578-8fefbfa2f904"),
        learningFocus: "Peta cepat lini produk supaya BA tidak buta arah di rak.",
        bullets: [
          "Base & coverage: Original Loose Powder Foundation — mineral pertama dan paling ikonik — dan BarePro Performance Wear Foundation untuk versi liquid, daily wear.",
          "Skin care crossover: Complexion Rescue Tinted Moisturizer, Skinlongevity Vital Power Eye Gel, dan Ageless Phyto-Retinol Face Cream menunjukkan portofolio tidak berhenti di makeup.",
          "Finishing & perawatan pendukung: Mineral Veil Finishing Powder untuk setting tanpa mengubah warna, plus Purifying Face Mask untuk ritual tambahan.",
          "Warna & bibir: Gen Nude Butter Lipstick — perluasan brand ke arah warna, tetap dengan formula yang nyaman dan skin-friendly.",
          "Satu benang merah di semua lini: setiap produk harus lolos filter \"baik untuk kulit\" sebelum masuk portofolio.",
        ],
        keyIngredients: [],
      },
      {
        title: "Bahasa Brand: Bagaimana BA Bicara bareMinerals",
        image: u("1631214524020-7e18db9a8f92"),
        learningFocus: "Kalimat pembuka dan framing yang konsisten dengan positioning brand.",
        bullets: [
          "Mulai dari kulit, bukan dari produk: tanyakan kondisi kulit customer dulu (sensitif, berjerawat, pasca-treatment) sebelum menawarkan warna atau finish.",
          "Gunakan bahasa yang jujur dan tidak berlebihan — sampaikan formula bebas talc/paraben/pewangi sintetis sebagai fakta, bukan janji ajaib atau klaim medis yang tidak bisa dibuktikan.",
          "Framing yang lebih kuat: \"makeup yang kulit kamu nggak perlu ditoleransi\" — dibanding sekadar \"makeup yang ringan\".",
          "Dorong sampling dan touch test di tangan customer — tekstur mineral yang halus adalah pengalaman fisik yang lebih meyakinkan daripada penjelasan verbal saja.",
        ],
        keyIngredients: [],
        baScript: "Coba rasakan teksturnya di tangan dulu — ini mineral yang dihaluskan, bukan bedak biasa. Nggak ada talc, paraben, atau pewangi sintetis di dalamnya, jadi ini yang biasa saya rekomendasikan untuk kulit yang gampang bereaksi.",
      },
      {
        title: "Customer Ideal bareMinerals",
        image: u("1631214524049-0ebbbe6d81aa"),
        learningFocus: "Mengenali customer yang paling cocok didekati dengan cerita mineral ini.",
        bullets: [
          "Kulit sensitif, reaktif, atau baru pulih dari prosedur (facial, chemical peel, laser) yang butuh coverage tanpa risiko iritasi.",
          "Customer yang mencari \"no-makeup makeup look\" — hasil natural dan breathable, bukan hasil akhir heavy-coverage.",
          "Mereka yang sudah terbiasa membaca label skincare dan menerapkan standar yang sama ke produk makeup.",
          "Customer loyal skincare-first yang menganggap rutinitas makeup sebagai perpanjangan dari rutinitas perawatan kulit, bukan hal terpisah.",
        ],
        keyIngredients: [],
        qa: [
          { q: "Apakah bareMinerals aman untuk kulit yang baru selesai facial atau chemical peel?", a: "Formulanya minim iritan (bebas talc, paraben, pewangi sintetis, dan minyak) sehingga sering direkomendasikan untuk kulit yang sedang dalam masa pemulihan — tapi tetap sarankan patch test dan konfirmasi ke dokter kulit customer bila baru menjalani prosedur invasif." },
        ],
      },
    ]),
  },
  {
    id: "brand-rimmel-overview",
    brand: "Rimmel",
    category: "BRAND",
    categoryId: "brand-overview",
    level: "brand",
    title: "Mengenal Rimmel London",
    image: u("1620464003286-a5b0d79f32c2"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Heritage: London, Aksesibel, Playful",
        image: u("1626895872564-b691b6877b83"),
        contentImage: u("1637851496668-9310c745c3dc"),
        learningFocus: "Dari mana Rimmel berasal, dan kenapa namanya identik dengan mascara.",
        bullets: [
          "Rimmel didirikan tahun 1834 oleh Eugène Rimmel, parfumer asal Prancis yang membangun rumah kecantikannya di London — sejak awal, brand ini berakar Prancis tapi berjiwa London.",
          "Namanya begitu melekat dengan mascara sampai kata \"rimmel\" jadi kata sehari-hari untuk maskara di beberapa bahasa (Prancis, Portugis, Turki) — cerita ini bagus dipakai saat menjelaskan kenapa Rimmel kuat di kategori mata.",
          "Tagline \"Get The London Look\" merangkum posisinya: bukan satu tampilan yang \"benar\", tapi gaya personal yang berani dan mudah dipadupadankan, khas jalanan London.",
          "Rimmel kini bagian dari Coty, tapi tetap dijalankan sebagai brand mass-market yang lincah — cepat merilis tren warna, bukan brand warisan yang kaku.",
        ],
        keyIngredients: [],
      },
      {
        title: "Positioning: Sehari-hari, Berani, Terjangkau",
        image: u("1583241475880-083f84372725"),
        contentImage: u("1503236823255-94609f598e71"),
        learningFocus: "Di mana Rimmel duduk dibanding brand lain di konter, dan bahasa yang cocok untuknya.",
        bullets: [
          "Rimmel bermain di segmen mass beauty / high-street — harga terjangkau, distribusi luas, bukan brand prestige seperti Dolce & Gabbana atau Sisley di rak sebelah.",
          "Pesan brand-nya adalah \"berani coba\": customer didorong bereksperimen dengan warna dan tekstur tanpa takut rugi kalau ternyata tidak cocok — repeat purchase justru datang dari keberanian mencoba varian baru.",
          "Rimmel pernah digandeng wajah-wajah seperti Kate Moss, Cara Delevingne, dan Rita Ora — bukan untuk kesan mewah, tapi untuk kesan gaya jalanan yang stylish dan approachable.",
          "Saat menjual Rimmel, hindari bahasa \"mewah\" atau \"eksklusif\" — itu bahasa brand lain. Bahasa Rimmel adalah percaya diri, playful, dan gampang dipakai siapa saja.",
        ],
        keyIngredients: [],
      },
      {
        title: "Peta Portofolio Produk",
        image: u("1631214540553-ff044a3ff1d4"),
        contentImage: u("1608979048467-6194dabc6a3d"),
        learningFocus: "Kategori utama Rimmel, dan ke mana sub-lini Kind & Free ditawarkan.",
        bullets: [
          "Mata: ScandalEyes Mascara dan lini eyeliner — kategori inti Rimmel sejak awal, tempat brand ini paling identik.",
          "Wajah: Stay Matte Pressed Powder untuk kontrol minyak harian, dan Lasting Finish Foundation untuk coverage tahan lama dengan harga terjangkau.",
          "Bibir: Lasting Finish Lipstick dan Moisture Renew Lip Colour — dua kutub berbeda, satu mengejar daya tahan, satu mengejar hidrasi.",
          "Alis: Wonder'full Eyebrow Mascara dan Fix & Go Brow Gel, menjawab tren alis natural-defined.",
          "Kind & Free adalah sub-lini yang lebih \"bersih\" — vegan, dengan kemasan yang memakai lebih sedikit material — cocok ditawarkan ke customer yang mulai peduli formula tapi belum siap pindah ke harga premium.",
        ],
        keyIngredientsLabel: "Filosofi Formula Kind & Free",
        keyIngredients: [
          { name: "Formula Vegan", description: "seluruh lini Kind & Free diformulasikan tanpa bahan turunan hewani" },
          { name: "Kemasan Lebih Ringan", description: "menggunakan lebih sedikit plastik dibanding kemasan Rimmel standar" },
        ],
        baScript: "Kalau customer suka coba warna tapi juga mulai baca label, saya arahkan ke Kind & Free — sama gampang dipakainya, tapi formulanya vegan dan kemasannya lebih ringan.",
      },
      {
        title: "Bahasa Brand: Bagaimana BA Bicara Rimmel",
        image: u("1512496015851-a90fb38ba796"),
        contentImage: u("1533562389935-457b1ae48a39"),
        learningFocus: "Nada bicara yang tepat untuk Rimmel, dan batas klaim yang tetap harus dijaga.",
        bullets: [
          "Gunakan bahasa yang santai dan percaya diri, bukan bahasa teknis-klinis — Rimmel dijual dengan energi, bukan dengan daftar kandungan panjang.",
          "Fokus ke hasil yang bisa langsung dirasakan customer hari itu juga: warna yang pop, tahan seharian, gampang dibersihkan — bukan klaim jangka panjang seperti anti-aging.",
          "Tetap disiplin soal klaim: sebutkan angka hanya kalau memang tertulis di kemasan/materi resmi (misalnya \"tahan hingga 24 jam\", bukan \"tahan seharian penuh\" kalau tidak tertulis) — brand terjangkau tetap harus akurat, bukan alasan untuk melebih-lebihkan.",
          "Posisikan Rimmel sebagai pintu masuk yang aman untuk bereksperimen — kalimat seperti \"kalau warnanya nggak cocok, ini bukan investasi besar, coba aja dulu\" sangat sesuai dengan positioning brand.",
        ],
        keyIngredients: [],
      },
      {
        title: "Customer Ideal Rimmel",
        image: u("1542452255191-c85a98f2c5d1"),
        contentImage: u("1759693164491-01acd5831b09"),
        learningFocus: "Siapa yang paling pas ditawari Rimmel, dan siapa yang sebaiknya diarahkan ke brand lain.",
        bullets: [
          "Pembeli makeup pemula atau anak muda yang baru mulai membangun koleksi — Rimmel sering jadi brand makeup pertama seseorang.",
          "Customer dengan budget terbatas tapi ingin tetap ikut tren warna terbaru — mereka datang untuk koleksi warna, bukan satu produk hero.",
          "Customer lintas-brand: seseorang yang belanja skincare di konter Sisley atau bareMinerals tetap bisa jadi pembeli Rimmel untuk color makeup sehari-hari — jangan anggap dua transaksi ini saling meniadakan.",
          "Kurang cocok untuk customer yang secara eksplisit mencari positioning prestige/luxury — untuk mereka, arahkan ke Dolce & Gabbana atau Sisley, bukan dipaksakan ke Rimmel.",
        ],
        keyIngredients: [],
        qa: [
          { q: "Kenapa Rimmel jauh lebih murah dari D&G atau Sisley?", a: "Karena positioning-nya memang beda — Rimmel itu mass beauty/high-street, D&G dan Sisley itu prestige. Harga lebih terjangkau bukan berarti kualitas rendah, formulanya tetap diuji dan aman dipakai harian." },
          { q: "Apakah Rimmel aman untuk kulit sensitif?", a: "Tidak ada klaim khusus hipoalergenik di seluruh lini, jadi untuk customer dengan kulit sangat sensitif tetap sarankan patch test dulu — sama seperti brand manapun tanpa klaim tersebut." },
          { q: "Rimmel itu brand Inggris atau Prancis?", a: "Dua-duanya dalam arti tertentu — didirikan oleh parfumer Prancis, Eugène Rimmel, tapi dibangun dan besar di London, dan sekarang identik dengan gaya kota itu." },
        ],
      },
    ]),
  },
  {
    id: "brand-sisley-overview",
    brand: "Sisley",
    category: "BRAND",
    categoryId: "brand-overview",
    level: "brand",
    title: "Mengenal Sisley Paris",
    image: u("1608979048467-6194dabc6a3d"),
    completed: 0,
    total: 5,
    cards: buildLevelCards([
      {
        title: "Heritage: Phyto-Cosmetology dari Paris",
        image: u("1679623100266-db82be84f5f3"),
        learningFocus: "Dari mana klaim 'ilmiah dan botani' Sisley berasal, sebelum bicara produk.",
        bullets: [
          "Sisley didirikan tahun 1976 di Paris oleh keluarga d'Ornano, pelopor konsep \"phyto-cosmetology\" — kosmetik berbasis tumbuhan yang diracik dengan presisi klinis, bukan sekadar produk \"natural\" pada umumnya.",
          "Filosofi pendirinya menyatukan dua dunia yang sering dianggap bertentangan: ekstrak botani pilihan dan riset ilmiah mendalam. Semua produk diformulasikan dan diproduksi sendiri di laboratorium Sisley di Prancis, tidak dikontrakkan ke pihak ketiga.",
          "Nama \"Sisley\" diambil dari Alfred Sisley, pelukis impresionis kesukaan sang pendiri — jejak sensibilitas seni Prancis ini terasa di setiap kemasan dan pengalaman produk, bukan cuma di formulanya.",
          "Hingga sekarang brand tetap independen dan dikelola keluarga pendirinya sendiri, menjaga standar kualitas dan kerahasiaan formula yang jadi bagian dari daya tarik eksklusivitasnya — bukan brand yang berpindah tangan ke grup kosmetik besar.",
        ],
        keyIngredients: [],
      },
      {
        title: "Positioning: Luxury, Botanical, Klinis",
        image: u("1631214499500-2e34edcaccfe"),
        learningFocus: "Dua kata kunci yang harus selalu jalan berdampingan saat menjual Sisley.",
        bullets: [
          "Sisley diposisikan sebagai luxury skincare tertinggi di kategorinya — harga premium sepadan dengan konsentrasi bahan aktif botani yang tinggi dan hasil riset klinis yang benar-benar dipublikasikan, bukan klaim kosong.",
          "Dua kata kunci yang membedakan Sisley dari brand \"natural\" lain: botanical (bahan dari tumbuhan) dan klinis (diuji dan dibuktikan secara ilmiah) — bukan salah satu, tapi keduanya sekaligus, di setiap produk.",
          "Sisley tidak bicara \"kembali ke alam\" secara longgar. Setiap ekstrak disebut spesifik dengan nama dan fungsinya — misalnya Black Rose Extract untuk dukungan kolagen, bukan sekadar \"ekstrak mawar\".",
          "BA perlu menghindari bahasa diskon-sentris saat menjual Sisley. Customer datang untuk investasi jangka panjang pada kulitnya, bukan mencari produk termurah di rak — nada bicara yang tepat adalah meyakinkan dan berbasis hasil, bukan promo.",
        ],
        keyIngredients: [
          { name: "Black Rose Extract", description: "ekstrak mawar hitam andalan lini anti-aging Sisley, dikenal mendukung produksi kolagen dan elastisitas kulit" },
          { name: "Tropical Resins Complex", description: "kombinasi resin tropis yang menjadi tanda tangan riset klinis Sisley untuk memperkuat fungsi barrier kulit" },
        ],
      },
      {
        title: "Peta Portofolio: Skin Care, Hair, Body, Wellness",
        image: u("1583209814683-c023dd293cc6"),
        learningFocus: "Bentuk keseluruhan portofolio, supaya BA bisa menawarkan rutinitas — bukan cuma satu produk.",
        bullets: [
          "Skin Care adalah inti bisnis Sisley — mencakup anti-aging (lini Sisleÿa dan Black Rose), perawatan area mata, serta perawatan dasar seperti pembersih dan serum.",
          "Hair Care adalah perluasan filosofi phyto-cosmetology ke rambut dan kulit kepala, dengan pendekatan formulasi yang sama: ekstrak botani dipadukan riset klinis, bukan lini terpisah dengan standar berbeda.",
          "Body Care melengkapi rutinitas dengan body cream dan sun care, tetap memakai standar formulasi premium yang sama dengan skin care wajah.",
          "Sisley juga memiliki lini fragrance dan wellness (seperti Eau de Campagne dan Eau du Soir) — pengingat bagi BA bahwa brand ini bukan cuma tentang wajah, tapi gaya hidup menyeluruh yang mewah.",
          "Portofolio yang luas ini berarti satu customer loyal bisa jadi pembeli lintas kategori. BA yang memahami peta ini bisa menawarkan rutinitas lengkap, bukan berhenti di satu produk saja.",
        ],
        keyIngredients: [],
      },
      {
        title: "Bahasa Brand: Bagaimana BA Bicara Sisley",
        image: u("1557205465-f3762edea6d3"),
        learningFocus: "Nada bicara yang tepat: presisi dan elegan, bukan spiritual dan bukan laboratorium yang dingin.",
        bullets: [
          "Gunakan istilah presisi: sebut nama ekstrak dan mekanismenya (misalnya \"Black Rose extract yang mendukung produksi kolagen\"), bukan klaim umum seperti \"bikin kulit awet muda\".",
          "Sisley selalu tentang kombinasi alam dan sains. Hindari bahasa yang terlalu \"spiritual\" (aura, energi) di satu sisi, atau terlalu teknis-laboratorium yang dingin di sisi lain — nada yang tepat adalah elegan dan meyakinkan.",
          "Jangan menjual berdasarkan diskon atau paket hemat sebagai daya tarik utama. Nilai jual Sisley adalah keahlian formulasi dan hasil; harga adalah konsekuensi logis dari itu, bukan sesuatu yang perlu diminta maaf.",
          "Tekstur dan sensori produk adalah bagian dari cerita brand — ajak customer merasakan dulu (uji di punggung tangan), baru jelaskan kandungannya. Pengalaman mendahului klaim.",
        ],
        keyIngredients: [],
        baScript: "Coba dulu teksturnya di punggung tangan — ini bukan krim biasa, formulanya memakai ekstrak mawar hitam yang dirawat khusus untuk mendukung kolagen kulit Ibu. Sisley selalu begitu: apa yang terasa selalu punya alasan ilmiahnya.",
        qa: [
          { q: "Customer bertanya kenapa harga Sisley jauh lebih mahal dari brand lain di rak yang sama.", a: "Jawab dengan fakta, bukan pembelaan: Sisley memformulasikan dan memproduksi sendiri semua produknya di Prancis dengan konsentrasi bahan aktif botani yang tinggi, dan setiap klaim didukung riset klinis yang dipublikasikan — itu yang dibayar, bukan sekadar nama brand." },
        ],
      },
      {
        title: "Customer Ideal Sisley",
        image: u("1723150512429-bfa92988d845"),
        learningFocus: "Siapa yang paling cocok didekati dengan Sisley, dan pendekatan konsultasi seperti apa yang mereka hargai.",
        bullets: [
          "Umumnya wanita usia 30-an ke atas yang sudah punya rutinitas skincare mapan dan mencari peningkatan hasil, bukan pemula yang baru mengenal skincare dari nol.",
          "Loyal terhadap kualitas dan hasil jangka panjang, bersedia berinvestasi lebih besar untuk formula yang teruji, dan menghargai proses konsultasi yang personal di konter — bukan customer yang terburu-buru mencari produk tercepat.",
          "Tertarik pada cerita di balik produk (heritage, riset, bahan) sama besarnya dengan hasil yang dijanjikan. BA yang bisa bercerita dengan percaya diri akan membangun kepercayaan lebih cepat daripada sekadar mendemokan tekstur.",
          "Sering datang dengan concern spesifik — garis halus, kekencangan, area mata. Pendekatan konsultatif satu-per-satu jauh lebih efektif untuk mereka daripada pitch produk generik.",
        ],
        keyIngredients: [],
      },
    ]),
  },
];
