import brandDolce from "@/assets/brands/dolce-gabbana.svg";
import brandBareminerals from "@/assets/brands/bareminerals.svg.asset.json";
import brandRimmel from "@/assets/brands/rimmel.svg.asset.json";
import brandSisley from "@/assets/brands/sisley.svg.asset.json";

// Dolce & Gabbana — Skin Science Essentials — user-supplied Knowledge Card Content images
import skinScienceCard1Barrier from "@/assets/skincare/card-1-skin-barrier.png";
import skinScienceCard2TypeVsCondition from "@/assets/skincare/card-2-skin-type-vs-condition.png";
import skinScienceCard3HydrationVsMoisturization from "@/assets/skincare/card-3-hydration-vs-moisturization.png";
import skinScienceCard4Actives from "@/assets/skincare/card-4-actives.png";
import skinScienceCard5LayeringOrder from "@/assets/skincare/card-5-layering-order.png";
import skinScienceCard6TropicalClimate from "@/assets/skincare/card-6-tropical-climate.png";

// Unsplash free photos — verified makeup product photos
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

// Knowledge card images — actual makeup product photos from Unsplash
const c1 = u("1596462502278-27bfdc403348"); // pink/brown makeup brush set
const c2 = u("1542452255191-c85a98f2c5d1"); // red Lancôme lipstick
const c3 = u("1625093525885-282384697917"); // eyeshadow palette flatlay
const c4 = u("1608979048467-6194dabc6a3d"); // makeup brushes on white table
const c5 = u("1571646034647-52e6ea84b28c"); // five assorted lipsticks

// Dolce & Gabbana-only category image override — unbranded glass perfume bottle, warm/golden tones
export const dolceFragranceImage = u("1709662369957-0cbf9f8452fc");

// Dolce & Gabbana — Fresh Skin (Skin Care) images — unbranded, verified stock photography.
// A varied pool so module covers, knowledge-card covers and in-card content images
// don't repeat the same asset the way a single shared image would.
const skinDropper = u("1709662369957-0cbf9f8452fc"); // amber glass dropper bottle, warm light
const skinSilk = u("1617055407123-3d7130c1f940"); // blush pink silk fabric, close-up
const skinCreamFlower = u("1765964492963-b0aa8c172431"); // cream jar, black lid, red flowers on marble
const skinSmallPot = u("1611080541599-8c6dbde6ed28"); // small pink open pot
const skinCactusJar = u("1609097164502-59a1f0f9a66f"); // pink jar, natural daylight
const skinGelPatch = u("1641510261701-d6f508f0b477"); // pink gel patch applied to face
const skinJasmine = u("1649674635709-a08fae8d64fb"); // white jasmine flowers, macro
const skinCoffeeBeans = u("1753837787691-84a06d715d24"); // roasted coffee beans, macro
const skinFaceBrush = u("1761718209835-c8586b7dcac0"); // facial treatment, brush applying cream
const skinOrangeBlossom = u("1649198142387-19f1facee9ba"); // white blossom flowers, macro
const skinCranberries = u("1602522647466-e61534ecd1f2"); // fresh red cranberries, macro
const skinLipGloss = u("1758605456769-7f3d0939f623"); // glossy lips close-up, natural light
const skinLemon = u("1750796987114-dd409dab14e2"); // fresh lemon halves, bright
const skinHoney = u("1718146921295-700b969e7c78"); // golden honey dripping, macro

// Dolce & Gabbana — Fresh Look (Makeup) images — unbranded, verified stock photography.
const mkMint = u("1748792311906-9d0e8f88206c"); // fresh mint leaves, macro
const mkCherry = u("1610523377846-eba487f8f574"); // red cherries, macro
const mkFig = u("1601379760883-1bb497c558f0"); // fig halved, red interior
const mkBergamot = u("1609789518207-b4892e61e411"); // citrus fruit, warm daylight
const mkLips = u("1654374504608-67c4cfe65fca"); // natural mauve lips close-up
const mkBrushApplication = u("1709477542149-f4e0e21d590b"); // brush applying eyeshadow, close-up
const mkRose = u("1579754513330-82d8b8f0e189"); // coral rose macro
const mkDropper = u("1710410815589-dd83514104d0"); // glass dropper bottle
const mkFreckleSkin = u("1637851496668-9310c745c3dc"); // natural skin close-up with makeup
const mkPinkTexture = u("1657624332868-2159deacefa9"); // abstract pink/peach texture
const mkPigmentPot = u("1503236823255-94609f598e71"); // brush picking up pink pigment
const mkFanBrush = u("1616529484837-8bcdf9d1407b"); // rose-gold fan brush, macro
const mkCompactMirror = u("1737016765829-5f8e43b2cbe3"); // open gold compact mirror
const mkBlushApplication = u("1759693164491-01acd5831b09"); // woman applying blush with brush
const mkEyeshadowPalette = u("1533562389935-457b1ae48a39"); // multicolor eyeshadow palette macro

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
  // Optional, additive fields — only populated for the D&G Fresh Skin content.
  // Absent everywhere else, so existing cards render exactly as before.
  learningFocus?: string;
  keyIngredientsLabel?: string;
  contentImage?: string;
  baScript?: string;
  qa?: { q: string; a: string }[];
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

// Builds a module's knowledge cards from plain content, filling in the
// bookkeeping fields (id, index, status, progress) automatically.
// Each card supplies its own cover (`image`) and its own in-content image
// (`contentImage`) so neither repeats the module cover or each other.
type CardInput = {
  title: string;
  image: string;
  contentImage: string;
  learningFocus?: string;
  bullets?: string[];
  keyIngredients?: { name: string; description: string }[];
  keyIngredientsLabel?: string;
  baScript?: string;
  qa?: { q: string; a: string }[];
};

const buildCards = (inputs: CardInput[]): KnowledgeCard[] =>
  inputs.map((c, i) => ({
    id: String(i + 1),
    index: i + 1,
    title: c.title,
    status: "not-started" as ModuleStatus,
    progress: 0,
    image: c.image,
    contentImage: c.contentImage,
    bullets: c.bullets ?? [],
    keyIngredients: c.keyIngredients ?? [],
    keyIngredientsLabel: c.keyIngredientsLabel,
    learningFocus: c.learningFocus,
    baScript: c.baScript,
    qa: c.qa,
  }));

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
  // ── Dolce & Gabbana — Makeup · Fresh Look ──────────────────────────────────
  // Source of truth: NXS × Aroma Abadi Product Knowledge Library, D&G Makeup Fresh Look, v1.0 (July 2026)
  {
    id: "dg-mk-reading-skin", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Reading Your Customer's Skin", image: mkFreckleSkin, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Why the Skin Decides the Base",
        image: mkPigmentPot,
        contentImage: mkMint,
        learningFocus: "The habit this module is trying to build.",
        bullets: [
          "A customer almost never asks for a skin type. She asks for a result — natural, flawless, glowy — and it is the BA's job to translate that into a texture her skin can actually carry.",
          "The same shade of the same product behaves differently on dry and on oily skin. Recommending by shade alone is the most common counter mistake.",
          "Two questions settle most of it: what does her skin do by mid-afternoon, and what does she want to look like. Type first, then finish, then shade.",
          "This module is a working tool, not background reading. It is the one a BA should be able to reach in two taps while a customer is standing in front of her.",
        ],
      },
      {
        title: "Ask: The Six Questions",
        image: mkBlushApplication,
        contentImage: mkBergamot,
        learningFocus: "Opening the conversation without making it an interrogation.",
        bullets: [
          "Customers know more about their skin than they think. Guide them with these, and listen for what they volunteer in between:",
          "Do you know your skin type?",
          "Do you get oily in your T-zone during the day — if so, how quickly and how intensely?",
          "Does your skin feel dry all year, or only in certain seasons?",
          "How does it feel right after cleansing: tight, comfortable, or oily?",
          "Does your makeup fade, separate or go patchy through the day?",
          "Do you experience sensitivity, redness or tightness?",
        ],
        baScript: "Before I show you shades — can I ask how your skin usually behaves by the afternoon? That tells me which of these will actually stay looking good on you.",
      },
      {
        title: "Look: The Six Signals",
        image: mkCherry,
        contentImage: mkRose,
        learningFocus: "Reading the skin yourself, rather than taking her word for it.",
        bullets: [
          "Overall finish — shiny suggests oil production; matte suggests low oil, typical of dry or normal skin; dull often signals dehydration.",
          "Texture — dry patches and flaking point to dry or dehydrated skin; smooth texture indicates balanced hydration and oil.",
          "Pores — barely visible is typical of dry or normal skin; enlarged in the T-zone indicates oily or combination.",
          "Dehydration signs — fine lines, a tight feeling, or makeup sitting on top rather than settling in.",
          "Redness and reactivity — localised redness or skin that flushes quickly needs gentle, soothing formulas.",
          "Makeup behaviour — separating means oil, clinging to patches means dry, fading evenly through the day means dehydrated or combination.",
        ],
      },
      {
        title: "Three Profiles — Balanced, Dry, Oily",
        image: mkLips,
        contentImage: mkPinkTexture,
        learningFocus: "The three a BA meets most often.",
        bullets: [
          "Each profile below is given as cause first, then what to look for:",
          "**BALANCED** — optimal balance of oil and hydration. Soft, smooth, even texture; small refined pores; healthy natural glow; minimal redness; comfortable, neither oily nor tight.",
          "**DRY** — low oil production. Rough, flaky or dull appearance; tight after cleansing; fine lines look more pronounced; easily irritated.",
          "**OILY / CONGESTED** — excess sebum plus a build-up of dead cells. Shine dominant in the T-zone; enlarged or clogged pores; blackheads, whiteheads and breakouts; bumpy texture; makeup slides or oxidises.",
          "Dry skin and dehydrated skin are not the same thing. Dry skin lacks oil; dehydrated skin lacks water — and oily skin is frequently dehydrated. This is why an oily customer can still need the tint rather than a mattifying base.",
        ],
      },
      {
        title: "Three More — Sensitive, Pigmented, Firmness",
        image: mkDropper,
        contentImage: mkCompactMirror,
        learningFocus: "The three that change the recommendation most.",
        bullets: [
          "These can occur alongside any of the first three:",
          "**SENSITIVE / CONGESTED** — weakened barrier plus impurities. Redness and blotchiness; irritation from products or temperature change; itching or stinging; clogged pores; uneven texture and dullness.",
          "**PIGMENTED** — excess melanin from sun, hormones, inflammation or ageing. Dark spots or patches; post-acne marks; uneven tone; dullness in the uneven areas. Can occur with any skin type.",
          "**LACK OF FIRMNESS & ELASTICITY** — reduced collagen and elastin. Sagging at the jawline, cheeks or neck; less bounce; visible fine lines; loss of contour; a thin, fragile feel.",
        ],
        baScript: "That redness you're describing — I'd rather build you something gentle around it than sell you more coverage. Let's start with what calms it down.",
      },
      {
        title: "Undertone, and Skin in This Climate",
        image: mkFanBrush,
        contentImage: mkEyeshadowPalette,
        learningFocus: "The second axis of matching, and what heat and humidity change.",
        bullets: [
          "Skin **TONE** is depth — light, light medium, medium, medium deep, deep, very deep. Skin **UNDERTONE** is the hue beneath it, and it does not change with tanning, redness or irritation.",
          "Four undertones: **WARM** (yellow, golden, peach; green veins; gold jewellery flatters), **COOL** (pink, red, blue; blue or purple veins; silver flatters), **NEUTRAL** (a balanced mix; blue-green veins; both metals work), **OLIVE** (a green or muted grey cast; common in South and Southeast Asian complexions, and the hardest to match — foundations often read too pink, too yellow or too orange).",
          "Five ways to read it: the deep-look method in natural daylight at the jawline or inner forearm; the vein test; the jewellery test; the white paper test; and how the foundation itself behaves — grey or ashy reads cool or olive, orange reads cool or olive, an easy match reads neutral.",
          "Heat and humidity raise oil production, so customers resist anything described as rich or heavy — yet dehydration is common here because of air conditioning and long indoor days. Lead with the light textures and describe the finish, not the richness.",
          "UV exposure is year-round rather than seasonal. Only the Rose Glow Cushion carries SPF in this line, so sun protection is a conversation, not an assumption.",
        ],
      },
    ]),
  },
  {
    id: "dg-mk-complexion-wardrobe", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "The Complexion Wardrobe", image: mkCompactMirror, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "The Wardrobe, Step by Step",
        image: mkPinkTexture,
        contentImage: mkFreckleSkin,
        learningFocus: "The shape of the category before the detail of any product.",
        bullets: [
          "Complexion runs in a fixed order: **PREP** (primer) → **PERFECT** (tint, cushion or foundation) → **CORRECT** (concealer) → **COLOUR** (blush, bronzer) → **SET** (finishing powder) → **LIFT** (highlighter).",
          "Primers are the first step after skincare. They refine texture, control shine or boost radiance, extend wear, and create a smoother surface so the base applies evenly.",
          "The base step is the decision that matters most, and it is a choice of three formats rather than three shades.",
          "Every product after the base is there to add back what coverage takes away: dimension, warmth, light.",
          "Customers think in routines, not in products. Learn the shape of the wardrobe before the detail of any single item.",
        ],
      },
      {
        title: "The Two Primers",
        image: mkBergamot,
        contentImage: mkDropper,
        learningFocus: "One decision, made on skin type alone.",
        bullets: [
          "**BERGAMOT GLOW PRIMER** — the radiance-boosting hydrating primer. Improves texture, tone and luminosity; delivers lasting hydration from encapsulated water particles; preps skin for up to 12 hours of makeup wear. Recommended for normal to dry skin.",
          "**EVERLAST PRIMER** — the long-wear blurring mattifying primer. Minimises the appearance of pores, controls shine, and creates a matte canvas. Recommended for normal, combination and oily skin.",
          "This is a skin-type decision, not a preference. A glow primer on very oily skin will break down by lunchtime; a mattifying primer on dry skin will emphasise flaking.",
          "The Everlast Primer belongs to the Flawless look, but it is the correct pairing for an oily-skinned customer who wants a Fresh Look result — the deck teaches exactly this combination.",
        ],
        baScript: "Two primers, and it comes down to how your skin behaves rather than what you want it to look like. Yours goes shiny by the afternoon, so let's use the blurring one underneath and get the glow from the tint on top.",
      },
      {
        title: "Tint vs Cushion vs Foundation",
        image: mkRose,
        contentImage: mkFig,
        learningFocus: "The three formats, and the customer each one answers.",
        bullets: [
          "**TINT** (Blueberry Nutri-Tint) — the lightest option. Sheer to buildable coverage, glowy finish, 24H hydration. For the customer who wants hydration, glow and an easy everyday face.",
          "**CUSHION** (Rose Glow Cushion) — buildable medium coverage, glossy skin glow, improved skin evenness, and SPF 50 PA++++. For the customer who wants luminosity plus portability and sun protection.",
          "**FOUNDATION** (Everlast Foundation) — full coverage, 3D matte finish, 24H wear, transferproof. For the customer who wants perfected, long-lasting skin.",
          "The wrong question is \"which is best.\" The right one is how much she wants to be seen doing, and how long it has to last.",
          "Only two of the three belong to Fresh Look. The Everlast Foundation sits in the Flawless look, and is included here because a BA cannot explain what a tint is without something to contrast it against.",
        ],
      },
      {
        title: "The Coverage and Finish Map",
        image: mkCherry,
        contentImage: mkFanBrush,
        learningFocus: "Positioning all three bases on two axes.",
        bullets: [
          "Two axes explain the whole complexion wardrobe: coverage runs light to full, finish runs glowy to matte.",
          "Blueberry Nutri-Tint sits light coverage, glowy finish. Rose Glow Cushion sits medium coverage, glossy glow. Everlast Foundation sits full coverage, 3D matte.",
          "Shade range differs sharply and it matters at the counter: the tint carries 30 shades, the foundation 40, the cushion only 6. A deep or unusual undertone may only be matchable in the tint or the foundation.",
          "Best-for skin type also splits: the tint and the cushion are recommended for dry to combination skin, the foundation for combination to oily.",
        ],
      },
      {
        title: "What the Rest of the Wardrobe Does",
        image: mkEyeshadowPalette,
        contentImage: mkBlushApplication,
        learningFocus: "One line per category, in customer-facing language.",
        bullets: [
          "Learn what the category does before which SKU does it:",
          "**CONCEALER** — brightens shadowed areas, lifts features, covers dark circles and redness, and sharpens the edges of a look without adding weight everywhere.",
          "**BLUSH** — puts natural colour back into the skin, brings energy to the face, helps sculpt the cheeks and balances the whole look.",
          "**FINISHING POWDER** — sets creams so they last, controls shine, minimises pores and texture, prevents creasing, and makes everything applied after it blend more easily.",
          "**BRONZER** — warms the overall tone, adds sun-kissed dimension, shapes the face and stops it looking flat after base.",
          "**HIGHLIGHTER** — lifts the complexion by emphasising the high points, wakes tired skin, and balances a matte or structured base.",
        ],
      },
      {
        title: "Cream Before Powder",
        image: mkLips,
        contentImage: mkPigmentPot,
        learningFocus: "The layering rule, and why it is not negotiable.",
        bullets: [
          "All cream and liquid formulas go on first. All powders go on after. Powder under cream lifts, patches and blends unevenly.",
          "In this line that means: primer, then tint or cushion, then the Violet Liquid Blush or Cherry Glaze Bar, and only then the Fig Skin Perfector.",
          "The Fig Skin Perfector is the exception that proves the rule — it can be used as a primer or as a finishing powder, but not in the middle of the cream steps.",
          "A powder blush can be layered over a cream blush to set it and boost brightness. A cream blush over powder will drag.",
          "When a customer says her makeup goes patchy, this rule is the first thing to check before recommending anything new.",
        ],
      },
    ]),
  },
  {
    id: "dg-mk-claims-accurately", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Talking About Claims Accurately", image: mkPinkTexture, completed: 0, total: 5,
    cards: buildCards([
      {
        title: "Three Kinds of Claim",
        image: mkFreckleSkin,
        contentImage: mkCompactMirror,
        learningFocus: "What each figure in this library actually rests on.",
        bullets: [
          "A claim is only usable if the brand has substantiated and approved it. Nothing inferred or estimated is a claim.",
          "**CLINICAL / INSTRUMENTAL** — measured on instruments under controlled conditions. The Oil Lip Plumper's \"clinically proven plumping effect\" is the only one of these in the line, and the deck publishes no figure with it.",
          "**CONSUMER / SELF-ASSESSMENT** — what a test panel reported. \"90% agree lips are instantly visibly plumper\" is this kind.",
          "**PERFORMANCE** — a formula property stated by the brand without a published test: \"24H hydration\", \"12H control shine\", \"8H long-wear\".",
          "Say the figure with its qualifier or do not say the figure. \"90% agree\" without \"in testing\" overstates the evidence, and being precise builds more trust than it costs.",
        ],
      },
      {
        title: "The 'Known For' Rule",
        image: mkRose,
        contentImage: mkCherry,
        learningFocus: "The one wording instruction the brand gives directly.",
        bullets: [
          "The training deck instructs Beauty Advisors to always use the word \"known\" when describing what an Italian ingredient does. This is a brand instruction, not a suggestion.",
          "Correct: \"Italian rose extract, known for its moisturizing and antioxidant properties.\" Incorrect: \"Italian rose extract moisturizes and fights antioxidants.\"",
          "The distinction is real. An ingredient being known for a property is a statement about the ingredient; a product delivering that result is a claim about the product, and needs its own substantiation.",
          "Almost every ingredient in this line is phrased this way in the source material. When a card here drops the qualifier, that is an error to correct, not a shortcut to copy.",
        ],
        baScript: "This one has Italian cherry extract, which is known for its nourishing properties — and vegan collagen to support the skin barrier. The glow you're seeing is the formula; the cherry is what makes it comfortable to wear all day.",
      },
      {
        title: "Language to Avoid",
        image: mkLips,
        contentImage: mkFig,
        learningFocus: "What a cosmetic may never be said to do.",
        bullets: [
          "These are cosmetics, not medicines. They improve the appearance and feel of skin and lips — they do not treat, cure or prevent any condition.",
          "Never diagnose. \"You have rosacea\" is a medical statement a BA is not qualified to make; \"your skin looks reactive today\" is an observation.",
          "Never promise a medical outcome, and never compare a product to a prescription treatment.",
          "Take particular care with the plumping and lifting language in this line. \"Lifting burst of colour\" describes a visual effect; it must not become a claim to lift the face.",
        ],
      },
      {
        title: "When to Refer",
        image: mkDropper,
        contentImage: mkBrushApplication,
        learningFocus: "Situations where no product should be recommended.",
        bullets: [
          "Stop and refer — do not recommend — when a customer mentions any of the following:",
          "A prescription topical in use, such as a retinoid or acne medication.",
          "Broken, bleeding or acutely inflamed skin, or cracked lips.",
          "A suspected medical skin condition, or a mole or lesion that is changing.",
          "A known ingredient allergy, or a history of reaction to similar products.",
          "An active eye infection or recent eye surgery, where mascara and liner are concerned.",
          "Pregnancy or breastfeeding questions about ingredient safety.",
        ],
        baScript: "That's something I'd rather you checked with a professional first — I'd hate to recommend something that works against what you're already using. Come back and see me once you know, and I'll help you build around it.",
      },
      {
        title: "When You Do Not Know",
        image: mkFanBrush,
        contentImage: mkPigmentPot,
        learningFocus: "The rule for ingredient, safety and certification questions.",
        bullets: [
          "Customers ask about fragrance, alcohol, halal status, animal testing, BPOM registration and full ingredient lists. Several of these have no answer anywhere in the training material.",
          "The rule is absolute: if you do not know, do not guess. An invented answer is both a compliance risk and a trust risk.",
          "Correct response — \"That's an important question and I'd rather give you the accurate answer than guess. Let me check for you.\"",
          "Every counter should hold the current approved reference for each product: full ingredient list, registration details, and the brand's official position on testing and certification.",
          "Escalate anything not covered to the counter manager, who routes it to the training lead.",
        ],
      },
    ]),
  },
  {
    id: "dg-mk-bergamot-primer", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Bergamot Glow Primer", image: mkBergamot, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkDropper,
        contentImage: mkFreckleSkin,
        learningFocus: "What it is and where it sits.",
        bullets: [
          "A hydrating primer that preps the skin and enhances glow — the first makeup step after skincare, and the one that decides how everything above it behaves.",
          "It delivers 24H hydration through high-purity hyaluronic acid, and improves the look of skin texture, tone and radiance through Italian Bergamot from Calabria.",
          "It offers high makeup adherence — the deck states up to 12 hours of lasting makeup.",
          "Fragrance-free, which matters more than it sounds: it makes the primer compatible with any base and any fragrance the customer is already wearing.",
          "Its role is foundational. A primer does not change what a customer looks like; it changes how long she looks like it.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkPigmentPot,
        contentImage: mkBrushApplication,
        learningFocus: "Two actives, and the Calabrian sourcing story.",
        bullets: [
          "A sorbet-textured formula built on two hero ingredients:",
          "Remember the F3 rule. Say \"Italian bergamot, known for its antioxidant properties\", not \"Italian bergamot protects your skin.\" The provenance is a genuine differentiator — use it, and phrase it correctly.",
        ],
        keyIngredients: [
          { name: "Italian Bergamot & Sea Water", description: "For improved skin radiance. The bergamot is sourced in Calabria; the sea water carries minerals and is what the sorbet freshness comes from." },
          { name: "High Purity Hyaluronic Acid", description: "For hydration. \"High purity\" means it has been processed to remove impurities, giving a higher concentration of usable active." },
          { name: "Formula credentials", description: "Non-comedogenic · vegan · silicone-free · Clean at Sephora." },
        ],
      },
      {
        title: "The Sorbet Texture",
        image: mkPinkTexture,
        contentImage: mkCompactMirror,
        learningFocus: "The sensory feature, and the story behind it.",
        bullets: [
          "The texture is a sensorial sorbet: it gives a burst of water freshness that lasts, released from captured water particles in the formula.",
          "This is the product's single most demonstrable feature. It cannot be described as effectively as it can be felt.",
          "Mr Gabbana took the reference from Granita Siciliana — the Sicilian crushed-ice dessert. That is a real brand story, not a marketing line, and customers remember it.",
          "In a humid climate the sorbet texture is an advantage: it reads as refreshing rather than as another layer.",
        ],
        baScript: "Feel this on the back of your hand first — it's a sorbet texture, inspired by Sicilian granita. It goes on cold and disappears. That freshness is captured water particles releasing into the skin.",
      },
      {
        title: "Packaging",
        image: mkFanBrush,
        contentImage: mkEyeshadowPalette,
        learningFocus: "Skincare-inspired format, and the two details worth pointing out.",
        bullets: [
          "An aluminium cold-touch tube — the metal keeps the formula cool to the touch, reinforcing the freshness proposition before it is even opened.",
          "Zamac metal cap, with a pointed tip designed to pierce the seal on first use.",
          "An integrated squeezer tool so the tube can be emptied completely.",
          "The whole format is skincare-cream inspired rather than makeup inspired — deliberate, because this line is positioned as makeup with skincare benefits.",
        ],
      },
      {
        title: "Published Results",
        image: mkBlushApplication,
        contentImage: mkLips,
        learningFocus: "The three figures, and exactly how to state them.",
        bullets: [
          "Three figures are published for this product. None of them is labelled clinical or self-assessment in the source material, so each must be spoken as a test result rather than presented as a measurement — see F3.",
        ],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "90% feel instant freshness", description: "Attributed to the sensorial sorbet texture." },
          { name: "86% agree skin looks healthy and supple", description: "Reported in testing." },
          { name: "86% agree skin looks more radiant after 7 days of use", description: "Reported in testing." },
          { name: "24H hydration · up to 12 hours of lasting makeup", description: "Stated performance." },
        ],
        baScript: "It's doing two jobs — hydrating for 24 hours, and gripping your makeup so it lasts up to twelve. In testing, 86% agreed their skin looked more radiant after a week.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkCherry,
        contentImage: mkRose,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "Recommended for normal to dry skin. For oily or combination skin the Everlast Primer is the correct choice — see F2.",
          "Best for customers whose skin looks dull, dehydrated or lacks radiance, and for anyone whose makeup breaks down because the skin underneath is thirsty.",
          "Apply after skincare: a thin layer over clean, hydrated skin, blended in with fingertips, emphasising textured and dry areas. Face and neck if needed.",
          "Three ways in, depending on the customer: the skincare client buys the 24H hydration, the makeup client buys the blurring and the wear, the fashion client buys the Italian heritage.",
        ],
        qa: [
          { q: "Do I really need a primer?", a: "Not always — but if your makeup fades or goes patchy by the afternoon, this is what fixes it. It gives the base something to hold onto." },
          { q: "My skin gets oily. Will this make it worse?", a: "This one is for normal to dry skin. If you get shiny through the day, the Everlast Primer is the better match — it blurs and mattifies instead." },
          { q: "Does it have a fragrance?", a: "No, it is fragrance-free, so it will not compete with whatever perfume you are wearing." },
          { q: "What size is it?", a: "The training material does not publish the size. Check the counter reference before quoting it — I would rather confirm than guess." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-blueberry-tint", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Blueberry Nutri-Tint", image: mkDropper, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkFreckleSkin,
        contentImage: mkPinkTexture,
        learningFocus: "What a tint is, and the customer it wins.",
        bullets: [
          "A hydrating skin tint with a breathable, lightweight water-in-oil emulsion and 24H hydration from glyceryl glucoside.",
          "Coverage is buildable and light — enough to even the skin without covering it. Super-fine pigments give the most natural glowy-looking finish.",
          "A cooling agent in the formula gives an immediate refreshing sensation on application, which lasts through the day.",
          "This is the easiest first purchase in the line. A customer who has never worn base will accept a tint when she will not accept a foundation.",
          "The finish is glow, not matte. Say that plainly — a customer who wants matte should be shown the Everlast Foundation instead.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkPigmentPot,
        contentImage: mkRose,
        learningFocus: "Two actives, one emulsion.",
        bullets: ["A breathable, water-based formula built on two hero ingredients:"],
        keyIngredients: [
          { name: "Glyceryl Glucoside", description: "For hydration. It is a humectant, which is why the hydration claim is 24 hours rather than instant." },
          { name: "Italian Blueberry from Cilento", description: "For improved skin radiance. Rich in antioxidants; the deck attributes the 7-day radiance result to it." },
          { name: "Water-in-oil emulsion", description: "What makes it feel light rather than rich, and what lets skin breathe under it." },
          { name: "Formula credentials", description: "Non-comedogenic · vegan · Clean at Sephora · 30 ml." },
        ],
      },
      {
        title: "Finding the Shade",
        image: mkFanBrush,
        contentImage: mkCompactMirror,
        learningFocus: "Thirty shades, three steps.",
        bullets: [
          "STEP 1 — Find the family shade: Light, Light Medium, Medium Deep, or Deep.",
          "STEP 2 — Zero in on the undertone. The shade codes carry it: N = Neutral, C = Cool (pink), W = Warm (gold).",
          "STEP 3 — Select the shades that blend seamlessly. Swatch two adjacent options on the jawline in daylight, not on the hand.",
          "Thirty shades is the widest range in the Fresh Look line and the reason this product can serve a counter that the six-shade cushion cannot.",
          "Apply with fingertips, a foundation brush or a beauty sponge — all three are correct for this formula.",
          "Refer back to F1 for undertone reading. A shade that goes grey or ashy is a cool or olive customer in a warm shade.",
        ],
      },
      {
        title: "Published Results",
        image: mkBlushApplication,
        contentImage: mkCherry,
        learningFocus: "The four figures, and their status.",
        bullets: [
          "As with the primer, the deck publishes percentages without stating whether they are clinical or consumer self-assessment. State them as test results and no more.",
        ],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "73% found the skin tint breathable", description: "Reported in testing." },
          { name: "80% found skin instantly refreshed", description: "Attributed to the cooling agent." },
          { name: "100% see a seamless makeup effect", description: "Reported in testing." },
          { name: "Improved skin radiance after 7 days of use", description: "Attributed to the blueberry; no figure published." },
          { name: "24H hydration", description: "Stated performance." },
        ],
        baScript: "It hydrates for 24 hours and it is genuinely breathable — 73% of testers said so, and 80% felt their skin was instantly refreshed. That cooling feeling is a real ingredient, not a marketing line.",
      },
      {
        title: "How to Use — PERFECT",
        image: mkBrushApplication,
        contentImage: mkLips,
        learningFocus: "The application gesture, and the pairings.",
        bullets: [
          "Shake well before use.",
          "Squeeze out one to two drops.",
          "Apply the first drop evenly all over with fingertips or a foundation brush — this gives the skin an even base of the skincare benefits.",
          "Apply the second drop only where coverage is needed. Building selectively is what keeps the finish looking like skin.",
          "Wear it with the Bergamot Glow Primer underneath and the Fig Skin Perfector on top. The deck teaches these three as a set — prep, perfect, fix.",
          "Shaking matters. It is a water-in-oil emulsion, and an unshaken bottle applies unevenly.",
        ],
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkEyeshadowPalette,
        contentImage: mkFreckleSkin,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "Best for a natural look on normal to dry skin, and for anyone who says foundation feels heavy or looks like a mask.",
          "The Complexion Refresher positions it for dry skin through to combination.",
          "Three ways in: the makeup enthusiast buys the second-skin blur, the skincare devotee buys the 24H hydration and the 7-day radiance, the trend-focused customer buys the clean-girl glow.",
          "Refer rather than recommend for broken or acutely inflamed skin.",
        ],
        qa: [
          { q: "Will it cover my dark spots?", a: "Not fully — it is a tint, so it evens tone rather than covering. For spot coverage we would add a concealer, or if you want proper coverage the Everlast Foundation is the right product." },
          { q: "Does it have SPF?", a: "The training material is inconsistent on this, so I will not guess. Let me confirm from the official product reference before you rely on it for sun protection." },
          { q: "My skin is oily — can I wear it?", a: "Yes, but expect glow rather than matte. If you want it to stay put, use the Everlast Primer underneath and set with the Fig Skin Perfector." },
          { q: "How do I pick between the 30 shades?", a: "Family first — light, light medium, medium deep or deep. Then your undertone: N is neutral, C is cool, W is warm. We test two on your jawline in daylight." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-rose-cushion", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Rose Glow Cushion", image: mkRose, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkCompactMirror,
        contentImage: mkBergamot,
        learningFocus: "The format, and the SPF that only this product carries.",
        bullets: [
          "A brightening and hydrating bouncy foundation in a cushion format: a lightweight cream held in a mesh, dispensed onto a puff.",
          "Medium buildable coverage with 24H lasting hydration and glow, and improved skin evenness.",
          "SPF 50 PA++++ for APAC excluding Korea; SPF 50+ PA++++ for Korea. This is the only product in the Fresh Look line with sun protection.",
          "Refillable — the outer case is kept and only the inner cushion is replaced, at roughly three quarters of the price.",
          "Two things make it worth its price over the tint: the SPF, and the fact that it travels and touches up without a mirror or a brush.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkFig,
        contentImage: mkPinkTexture,
        learningFocus: "Two actives, and where the rose comes from.",
        bullets: [
          "A brightening, hydrating formula built on two actives:",
          "A customer already using a niacinamide serum will recognise the ingredient. That is a point of connection, not a reason to double up — the serum treats, the cushion is makeup that happens to contain it.",
        ],
        keyIngredients: [
          { name: "Niacinamide", description: "For 24H glow and brightening. The same active that anchors the Re-Birth serum in the skincare line, which makes this an easy cross-category conversation." },
          { name: "Italian Rosa Canina", description: "Known to improve skin evenness and support the skin barrier." },
          { name: "Stated benefits", description: "Hydration · glow · improved skin evenness · brightening." },
        ],
      },
      {
        title: "Packaging & The Applicator",
        image: mkPigmentPot,
        contentImage: mkFanBrush,
        learningFocus: "Fashion-driven format, and an applicator with three engineered features.",
        bullets: [
          "The case carries a nappa leather effect in vegan leather, drawn directly from DG bag codes, with DG logo detailing. It is designed to be seen on a counter or in a bag.",
          "Refillable: the outer case stays, the inner cushion is replaced. Mention this at the point of purchase, not months later.",
          "The applicator is a smooth sponge for easy blendability, in a teardrop shape so it reaches the areas a round puff cannot — around the nose, the inner corner of the eye.",
          "It carries an adherence fabric on the reverse for better grip while applying. Customers notice this; it is a small luxury.",
        ],
      },
      {
        title: "How to Use — PERFECT",
        image: mkBlushApplication,
        contentImage: mkBrushApplication,
        learningFocus: "The pressure technique that controls coverage.",
        bullets: [
          "Tap gently on the mesh to pick up product for medium coverage.",
          "Press and swipe on the mesh for the highest coverage — pressure on the mesh, not on the face, is what controls how much comes out.",
          "Dab onto the face starting from the centre and blending outwards.",
          "Use the tip of the teardrop applicator to reach hard-to-get areas.",
          "Dab, do not drag. A cushion applied with a sweeping motion loses the bounce it is named for.",
          "For a customer who wants light coverage, the answer is a lighter tap on the mesh — not less product on the face.",
        ],
      },
      {
        title: "Six Shades",
        image: mkEyeshadowPalette,
        contentImage: mkLips,
        learningFocus: "The smallest range in the line, and how to work within it.",
        bullets: [
          "Six shades against the tint's thirty is the real constraint on this product. Check the match before selling the story.",
          "The shade codes are matched to the same system used across the liquid formats, so a customer who knows her tint shade has a starting point.",
          "If there is no match, the honest move is the tint or the foundation — not the closest cushion shade.",
        ],
        keyIngredientsLabel: "Shades",
        keyIngredients: [
          { name: "1C · 2N · 3C · 4N · 5W · 6C", description: "Cool, neutral, cool, neutral, warm, cool." },
          { name: "APAC hero shades", description: "These six are selected as regional bestsellers rather than as a full range." },
          { name: "Four of the six are cool or neutral", description: "A strongly warm or olive customer may not find a match here." },
        ],
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkCherry,
        contentImage: mkFreckleSkin,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "Best for a radiant look on normal to dry skin, and for customers who want medium coverage without a matte finish.",
          "The strongest case is portability plus SPF: it is the only product here that lets a customer top up her base and her sun protection at the same time.",
          "Use morning and evening, after primer. In the morning it replaces the separate sunscreen step for the face only.",
          "Refer rather than recommend for broken or acutely inflamed skin.",
        ],
        qa: [
          { q: "Is it really enough sun protection?", a: "SPF 50 PA++++ is a high rating, but only if you apply enough and reapply. If you are outdoors for long stretches, keep using a dedicated sunscreen underneath." },
          { q: "How does the refill work?", a: "You keep the outer case and replace only the inner cushion. The refill is € 49 against € 66 for the full unit — please confirm the IDR refill price at the counter, it is not published in our material." },
          { q: "Why only six shades?", a: "These six are the regional bestsellers rather than the full range. If none of them matches you properly, the Blueberry Nutri-Tint has thirty and I would rather match you correctly than sell you the format." },
          { q: "Will it look shiny on oily skin?", a: "It has a glossy glow finish, so yes on very oily skin. Setting it with the Fig Skin Perfector controls that, or the Everlast Foundation gives you matte instead." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-fig-perfector", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Fig Skin Perfector", image: mkFig, completed: 0, total: 5,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkDropper,
        contentImage: mkCompactMirror,
        learningFocus: "One product, three jobs.",
        bullets: [
          "A sensorial, seamless finishing powder that blurs pores, controls oil and sets makeup — mattify, blur, set.",
          "It leaves a lightweight, undetectable silky veil rather than a visible layer of powder.",
          "Translucent with no white cast on any skin tone, which is why it is sold as a universal shade.",
          "It can be used as a primer or as a finishing powder — unusual, and worth mentioning to a customer who wants fewer products.",
          "No flashback. This matters to anyone who is photographed, and it is a genuine formulation claim rather than a style of words.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkRose,
        contentImage: mkBergamot,
        learningFocus: "Three actives pulling in two directions.",
        bullets: [
          "A translucent formula built on three actives, and the combination is the point:",
          "This is why it is described as comfortable for all skin types. Oily skin gets the sebum control from the fig; dry skin gets the moisture retention from the hyaluronic acid. Most powders can only do one.",
        ],
        keyIngredients: [
          { name: "Italian Fig", description: "Reduces sebum production and increases skin radiance. The oil-control side." },
          { name: "Hyaluronic Acid", description: "Moisture retention and barrier protection. The comfort side, and the reason it does not look dry on dry skin." },
          { name: "Rose Extract", description: "Fights oxidative stress and inflammation, and helps regulate sebum production." },
          { name: "Pore-minimizing seaweed extract", description: "Delivers the blurring effect." },
          { name: "Formula credentials", description: "Non-comedogenic · vegan · Clean at Sephora." },
        ],
      },
      {
        title: "Packaging",
        image: mkPigmentPot,
        contentImage: mkPinkTexture,
        learningFocus: "The compact, and one detail worth showing.",
        bullets: [
          "A Zamac metal lid, giving a weighty pack with a premium, precious feel. The weight is deliberate and customers register it immediately.",
          "The powder surface itself is embossed with a design inspired by the sea — visible only when the compact is opened.",
          "Refillable, so the case is a one-time purchase.",
          "It fits any powder brush and works with a blotting sponge for touch-ups.",
        ],
        baScript: "Open it. The powder is pressed with a design inspired by the sea — it is one of those details you only see because you own it.",
      },
      {
        title: "How to Use — SET",
        image: mkFanBrush,
        contentImage: mkBlushApplication,
        learningFocus: "Two techniques for two different jobs.",
        bullets: [
          "SET — on first use, swirl a powder brush several times on the surface to soften the powder. Tap off the excess, then sweep gently onto the face for a luminous, photo-ready finish.",
          "BLOT — press and roll onto the skin with a powder puff or brush to lock complexion products in place. This is also the technique for targeted areas: the under-eye, around the nose.",
          "Press and roll, do not sweep, when blotting. Sweeping over a cream base lifts it.",
          "Use a kabuki brush for all-over setting, or a powder and highlighter brush for control.",
          "Wear it with the Bergamot Glow Primer and the Blueberry Nutri-Tint — the deck teaches these three as the FRESH complexion routine.",
          "One published figure: 85% see pores visibly minimized.",
        ],
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkEyeshadowPalette,
        contentImage: mkFreckleSkin,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "For all skin types. The pitch changes rather than the product: oily skin buys the sebum control, dry skin buys the moisture retention.",
          "Particularly relevant for visible pores, texture and shine, and for anyone whose makeup breaks down through the day in a humid climate.",
          "A natural first purchase for a customer loyal to another base — a finishing powder displaces nothing she already uses.",
          "Universal shade, so there is no matching risk. That makes it one of the easiest products on the counter to add to a basket.",
        ],
        qa: [
          { q: "Will it make my dry skin look drier?", a: "It contains hyaluronic acid for moisture retention, so it is formulated not to. Use a light hand and focus on the T-zone rather than the whole face." },
          { q: "Will it show up white in photos?", a: "No — it is translucent with no white cast on any skin tone, and it is formulated with no flashback." },
          { q: "Can I use it without foundation?", a: "Yes. It works as a primer as well as a finishing powder, so on a bare-skin day it blurs and controls shine on its own." },
          { q: "How often do I reapply?", a: "Blot as needed through the day — press and roll rather than sweep, so you do not disturb what is underneath." },
        ],
      },
    ]),
  },

  {
    id: "dg-mk-violet-blush", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Violet Liquid Blush", image: mkBlushApplication, completed: 0, total: 4,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkFreckleSkin,
        contentImage: mkPinkTexture,
        learningFocus: "What pH-reactive actually means at the counter.",
        bullets: [
          "A liquid blush that reacts with the skin's own pH to develop a personalised flush — the same product reads slightly differently on different people.",
          "Buildable intensity with a natural glowy finish, and ultra-long wear.",
          "One SKU. There is no shade decision to make, which removes the single biggest hesitation customers have about blush.",
          "Set expectations honestly: the shift is a personalisation, not a transformation. It will not turn violet on the face, and it will not correct an undertone.",
        ],
        baScript: "It goes on violet and turns into your colour — it reacts with your skin. There is only one shade because it becomes a different one on everybody.",
      },
      {
        title: "How It Differs",
        image: mkCherry,
        contentImage: mkEyeshadowPalette,
        learningFocus: "Three blushes in the wardrobe, three different jobs.",
        bullets: [
          "**VIOLET LIQUID BLUSH** — liquid, pH-reactive, natural glowy finish, ultra-long wear. For the customer who does not want to choose.",
          "**CHERRY GLAZE BAR** — cream stick, five chosen shades, three-dimensional glossy glow. For the customer who wants a specific colour and a stronger pop.",
          "**CHEEKS & EYES MATCH** — powder, buildable veil, skin-like finish. For the customer who wants a monochromatic cheek-and-eye look, and for setting a cream blush.",
          "The deck teaches them as a layering sequence rather than as alternatives: cream first, powder over the top to set and boost brightness.",
          "F2 covers the cream-before-powder rule. The Violet Liquid Blush and the Cherry Glaze Bar are both creams, so they go on before the Fig Skin Perfector, never after.",
        ],
      },
      {
        title: "How to Use — COLOUR",
        image: mkFanBrush,
        contentImage: mkDropper,
        learningFocus: "Placement and layering.",
        bullets: [
          "The deck publishes no application gesture for this product. Until one is supplied, use the general cream-blush technique and say so rather than presenting it as brand guidance.",
          "Apply over the tint or cushion, before any powder.",
          "Build in thin layers. A pH-reactive formula develops over a few seconds, so wait before adding more — this is the most common over-application mistake.",
          "At the counter, dispense onto a clean palette or the back of a gloved hand, never directly onto a customer's face.",
        ],
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkCompactMirror,
        contentImage: mkLips,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "For customers who want colour but freeze at a shade wall, and for anyone who has bought a blush that turned out wrong.",
          "The ultra-long wear makes it a strong recommendation for a customer who is out all day in humidity.",
          "Suits all skin tones by design, though the developed result varies — always swatch before selling.",
        ],
        qa: [
          { q: "It looks violet. Will it look violet on me?", a: "No — it develops on contact with your skin into a flush that suits you. Let me swatch it on your hand so you can watch it change." },
          { q: "Will it be the same colour on my friend?", a: "Close, but not identical. It reacts with each person's skin, which is the point of it." },
          { q: "What is in it?", a: "The training material does not publish the ingredient list for this one. Let me get you the official counter reference rather than guess." },
          { q: "Does it stain?", a: "It is a long-wear formula, so remove it with a proper cleanser rather than water alone. I would not describe it as a stain, but do not expect it to wipe off." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-cherry-glaze", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Cherry Glaze Bar", image: mkCherry, completed: 0, total: 7,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkPigmentPot,
        contentImage: mkEyeshadowPalette,
        learningFocus: "The product, and the three words it is built on.",
        bullets: [
          "A glow blush stick — a creamy, glide-on cream blush in a retractable bar format, and the first real pop of colour in the Fresh Look wardrobe.",
          "It exists to take the clean-girl aesthetic the line was built on and give it a flush: more expressive, more playful, still effortless.",
          "The campaign resolves to three words, and they are worth knowing because they describe the payoff precisely.",
          "**FLUSHED** — a natural, healthy rush of colour. **GLAZED** — a dewy, luminous, almost glass-like sheen; this describes the texture. **POPPING** — vibrant, fresh colour that stands out in a modern way; this describes the shade range.",
        ],
      },
      {
        title: "Why Your Customer Will Love It",
        image: mkBlushApplication,
        contentImage: mkFanBrush,
        learningFocus: "Seven reasons, in the brand's own order.",
        bullets: [
          "Three-dimensional glossy glow — a radiant finish that adds depth and enhances the natural face shape rather than sitting flat.",
          "Lifting burst of colour — instantly brightens and lifts the complexion with a healthy flush.",
          "Longwearing, buildable colour — from soft to vibrant, so the customer sets her own intensity.",
          "Five trendy shades that complement each other and work across skin tones.",
          "Easy application — a creamy, glide-on texture that blends with fingers or a brush.",
          "Endless ways to wear it — monochrome looks, sun-kissed glow, a precise pop of colour.",
          "Luxurious, portable packaging — compact, chic, made for touch-ups.",
          "Stated performance — 24H long-lasting glow and hydration · 24H lasting popping colour · sweatproof and waterproof.",
          "The sweatproof and waterproof claim is the one that matters most in this climate. Lead with it.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkRose,
        contentImage: mkBergamot,
        learningFocus: "Two actives, one of them unusual for a blush.",
        bullets: [
          "A skincare-infused cream formula built on two ingredients:",
          "Note the phrasing on the cherry: known for its nourishing properties. The vegan collagen is stated more directly because it is a functional ingredient claim. F3 covers why the difference matters.",
        ],
        keyIngredients: [
          { name: "Vegan Collagen", description: "To support the skin barrier and moisturize. Unusual in a colour product, and the reason the 24H hydration claim sits alongside the 24H colour claim." },
          { name: "Natural Italian Cherry Extract", description: "Known for its nourishing properties." },
          { name: "Stated benefits", description: "Glow · hydration · long-lasting colour." },
        ],
      },
      {
        title: "Packaging",
        image: mkCompactMirror,
        contentImage: mkPinkTexture,
        learningFocus: "Five engineered features, each with a reason.",
        bullets: [
          "Portable shape — fits a small bag or pocket, which is what makes it an anytime touch-up product rather than a morning-only one.",
          "Organic shape, deliberately matched to the Blueberry Nutri-Tint so the two read as a family on a shelf. It is also ergonomic to hold.",
          "Bar shape for precise application — the flat surfaces create clean, controlled lines while the rounded edges support blending.",
          "Retractable system — twist to release exactly the amount wanted. No sharpening, no breakage, no contamination, and less waste.",
          "Shiny gold trim — the signature finish across the line, and what makes it read as an accessory rather than a cosmetic.",
        ],
      },
      {
        title: "Five Shades",
        image: mkLips,
        contentImage: mkFreckleSkin,
        learningFocus: "The colour story, and who each shade is for.",
        bullets: [
          "Three of the five are described as universal. When a customer is undecided, Cheeky Coral is the safest demonstration.",
          "Demure Rose and Whimsical True Berry are the two everyday shades, positioned at opposite ends of the depth range.",
        ],
        keyIngredientsLabel: "Shades",
        keyIngredients: [
          { name: "1 Demure Rose", description: "Soft fresh pink. Fair to medium skin, natural everyday shade — a delicate pink for a subtle flush that mimics fresh skin." },
          { name: "2 Smitten Pink Pop", description: "Universal fuchsia. A lively modern fuchsia that works across all skin tones thanks to a balanced cool-warm pigment mix." },
          { name: "3 Cheeky Coral Pop", description: "Universal coral. A warm, uplifting coral that complements every undertone; the truest universal shade in the five." },
          { name: "4 Sunny Red Pop", description: "Universal red. Clear and vibrant; boosts warmth on fair skin and brings clarity on deeper tones." },
          { name: "5 Whimsical True Berry", description: "Medium to deep skin, natural everyday shade. Adds depth and freshness without appearing heavy." },
        ],
      },
      {
        title: "Three Techniques",
        image: mkBrushApplication,
        contentImage: mkDropper,
        learningFocus: "Including the one that is safe to use on a customer.",
        bullets: [
          "THE EASY STAMP — the retail-friendly method. Twist up the bar. Lightly tap the DG Foundation Brush onto the bar to pick up product. Stamp onto the apples of the cheeks, then swipe upward to create a gradient. Blend the edges with the same brush.",
          "Never tap the brush back onto the bar. That is the cross-contamination rule and it is not optional at a counter.",
          "THE UNDER-EYE BLUSH — stamp a small amount just below the lower lash line, centred. Diffuse outward and slightly downward. Connect into the upper cheek. Soften the edges without dragging.",
          "THE SUNSET BLUSH — apply the deeper shade higher on the cheekbone to create structure, place the lighter shade just above it, then blend upward to keep the lift and soften the transition.",
          "For the customer to use at home the gesture simplifies: twist, stamp and sweep from the apples of the cheeks upward, then blend the edges with fingertips.",
        ],
      },
      {
        title: "Shade & Undertone, and Common Questions",
        image: mkFig,
        contentImage: mkMint,
        learningFocus: "Matching colour to the customer, and ready answers.",
        bullets: [
          "**WARM** undertones — golden, peachy or yellow base. Best in corals and warm reds: Cheeky Coral, Sunny Red.",
          "**COOL** undertones — pink, red or blue hues. Best in pinks and berries: Demure Rose, Smitten Pink, Whimsical Berry.",
          "**OLIVE** undertones — a green or grey cast. Come alive with warm brightening shades: red, terracotta, bronze. Sunny Red is the deck's specific recommendation. Avoid cool pastels, which read dull on olive skin.",
          "**NEUTRAL** undertones — the most versatile. Both warm and cool work, as long as they are not extreme.",
          "Refer back to F1 for reading the undertone in the first place.",
        ],
        qa: [
          { q: "How much is it?", a: "The price is not in our training material yet. Let me confirm it from the counter reference rather than quote you the wrong figure." },
          { q: "Will it slide off in this heat?", a: "It is formulated sweatproof and waterproof, and the colour is stated to last 24 hours. Setting it with the Fig Skin Perfector adds more security if you are out all day." },
          { q: "Can I use it on my lips?", a: "The deck positions it for cheeks. It has not been published as a lip product, so I would not recommend it there without confirming — the Rose Dew Lip Bite is designed for lips and pairs with it." },
          { q: "Which shade suits me?", a: "Let me look at your undertone first. If your veins read green and gold jewellery suits you, we go coral or red. If they read blue and silver suits you, we go pink or berry." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-brow-liner-brush", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Brow and Liner Beauty Brush", image: mkFanBrush, completed: 0, total: 4,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkEyeshadowPalette,
        contentImage: mkCherry,
        learningFocus: "What the Artistry Book actually says.",
        bullets: [
          "A dual-purpose beauty brush for brows and liner, listed as Step 5 of the Fresh Look routine in the Indonesian Artistry Book at IDR 620K.",
          "Tools sell badly when treated as accessories and well when treated as the thing that makes the product work. This one is the difference between a brow pencil that looks drawn and one that looks like hair.",
          "It is also the single most useful item to have on the counter, because it is what a BA reaches for during any brow or liner demonstration.",
          "No further specification is published. Do not describe the bristle type, material or dimensions until the brand supplies them.",
        ],
      },
      {
        title: "How to Use",
        image: mkBrushApplication,
        contentImage: mkPigmentPot,
        learningFocus: "One tool, two gestures.",
        bullets: [
          "The spoolie end — brush the brow hairs in the direction of growth first. This is how the deck teaches brow diagnosis: it reveals the gaps and the areas of uneven density before anything is filled.",
          "After filling, brush through again to soften the product and blend the edges so nothing reads as a drawn line.",
          "The angled end — press rather than drag along the lash line for liner, and use short strokes rather than one continuous line.",
          "For brows, use it to blur the front of the brow, which is where a hard edge is most obvious.",
          "The brow-diagnosis gesture — brush first, then assess — comes from the Makeup Global deck's brow section and applies to any brow product on the counter.",
        ],
      },
      {
        title: "Hygiene & Care",
        image: mkDropper,
        contentImage: mkCompactMirror,
        learningFocus: "Counter practice, and what to tell the customer.",
        bullets: [
          "At the counter: use a clean brush per customer, or sanitise between uses with an approved brush cleaner. A brow brush touches the face and must be treated accordingly.",
          "Never use a counter tester brush on a customer's waterline or lash line.",
          "For the customer at home: wash weekly with a gentle cleanser, reshape while damp, and dry flat with the bristles hanging over an edge so water does not run into the ferrule.",
          "Never dry a brush upright. Water in the ferrule loosens the glue and the bristles shed.",
          "This is authored practice, not brand instruction. Present it as professional advice.",
        ],
      },
      {
        title: "Common Questions",
        image: mkFreckleSkin,
        contentImage: mkPinkTexture,
        learningFocus: "Ready answers, including what is not yet published.",
        qa: [
          { q: "Do I need a special brush, or will any spoolie do?", a: "A spoolie brushes; this one brushes and applies. If you use a brow pencil or a liner, the second end is what stops it looking drawn on." },
          { q: "What are the bristles made of?", a: "That is not published in our training material. Let me check the official product reference for you rather than guess — it matters if you are asking for a vegan reason." },
          { q: "How often should I replace it?", a: "A well-cared-for brush lasts years. Replace it when the bristles splay and no longer hold a shape after washing." },
          { q: "Can I use it with any brand's pencil?", a: "Yes. It is a tool, not a formula — it works with whatever brow or liner product you already own." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-everfull-mascara", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Everfull Hi-Definition Mascara", image: mkBrushApplication, completed: 0, total: 4,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkFanBrush,
        contentImage: mkFreckleSkin,
        learningFocus: "What is actually known, and what is not.",
        bullets: [
          "Listed as Step 6 of the Fresh Look routine in the Indonesian Artistry Book at IDR 660K, as a single SKU.",
          "The name signals definition — separated, distinct lashes — rather than volume. That is consistent with the Fresh Look aesthetic, which is why it appears in this routine rather than the XL.",
          "Beyond the name and the price, nothing is published. No formula, no brush description, no wear claim.",
          "Say what is known and check the rest. A mascara claim invented at the counter is the kind that gets repeated back to a manager.",
        ],
      },
      {
        title: "Hi-Definition vs XL",
        image: mkCompactMirror,
        contentImage: mkPigmentPot,
        learningFocus: "Two mascaras, and which conversation belongs where.",
        bullets: [
          "**EVERFULL HI-DEFINITION** — the Fresh Look lash step, per the Artistry Book. Definition and separation.",
          "**EVERFULL XL** — the Flawless look mascara, detailed in the deck as 36H wear with extreme volume and lift, and available with a refill.",
          "These serve different customers. A customer who wants her lashes to look like lashes wants the Hi-Definition; a customer who wants them to look done wants the XL.",
          "Until the brand confirms, present the XL claims as belonging to the XL only. Do not transfer the 36H figure across.",
          "This is a good example of why the Claim Register exists. A figure published for one SKU is not available for a neighbouring one, however similar the names.",
        ],
      },
      {
        title: "How to Use",
        image: mkEyeshadowPalette,
        contentImage: mkDropper,
        learningFocus: "The gesture, and counter hygiene.",
        bullets: [
          "Wipe the wand on the neck of the tube rather than pumping. Pumping pushes air in and dries the formula.",
          "Start at the root and wiggle side to side, then pull through to the tip. The root is where definition is created.",
          "Build a second coat while the first is still wet. Layering onto a dry coat is what causes clumping and flaking.",
          "For the lower lashes, hold the wand vertically and use the tip.",
          "At the counter: a fresh disposable wand for every customer, every time, with no exceptions and no return to the tube.",
          "Never apply mascara to a customer with an eye infection, recent eye surgery, or contact lens irritation. Refer instead — see F3.",
          "This gesture is authored professional practice, not brand instruction, because none is published.",
        ],
      },
      {
        title: "Common Questions",
        image: mkPinkTexture,
        contentImage: mkBlushApplication,
        learningFocus: "Ready answers, including what is not yet published.",
        qa: [
          { q: "Is it waterproof?", a: "That is not published for this mascara in our training material. Let me confirm from the counter reference — it is the kind of thing you need to be right about." },
          { q: "How long does it last through the day?", a: "No wear time is published for the Hi-Definition version. The XL mascara is tested at 36 hours, but I will not transfer that claim across — let me check." },
          { q: "What is the difference from the other DG mascara?", a: "This one is about definition and separation; the Everfull XL is about volume and lift. Different results, so it depends what you want your lashes to do." },
          { q: "Will it work on my straight lashes?", a: "Curl first, then apply from the root and wiggle upward — that holds the curl better than the formula alone will." },
        ],
      },
    ]),
  },

  {
    id: "dg-mk-lip-overliner", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "My Lip Overliner", image: mkLips, completed: 0, total: 5,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkFanBrush,
        contentImage: mkRose,
        learningFocus: "What it is, and what the name means.",
        bullets: [
          "A precision dual-ended lip liner that defines, sculpts and shapes the lips to create the illusion of a fuller pout.",
          "\"Overliner\" is the technique in the name: it is designed to be taken slightly beyond the natural lip line, not just along it.",
          "Fourteen shades — the widest lip range in this line, and enough to match rather than approximate.",
          "It is also the lowest price point among the lip products, which makes it an easy addition to any lip purchase.",
        ],
      },
      {
        title: "Why It Is Special",
        image: mkPigmentPot,
        contentImage: mkFreckleSkin,
        learningFocus: "Four performance claims, and how to say them.",
        bullets: [
          "None of these carries a published substantiation method in the deck. State them as product performance, which is what they are — see F3.",
          "\"Humidity-proof\" is the claim that lands here. It is the specific reason a lip liner survives a day in this climate when a lipstick alone does not.",
          "\"100% kiss-proof guaranteed\" is strong wording. Use it as the brand states it and do not extend it — it is a claim about transfer, not about the colour lasting through a meal.",
        ],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "8H long-wear", description: "Stated performance." },
          { name: "Life-proof wear", description: "Smudge, humidity and waterproof." },
          { name: "100% kiss-proof guaranteed", description: "Stated performance." },
          { name: "One-stroke bold colour", description: "Stated performance." },
        ],
        baScript: "This is the piece most people skip and then wonder why their lipstick disappears. Eight hours, smudge and humidity proof — it holds the colour in place and stops it bleeding.",
      },
      {
        title: "The Dual-Ended Design",
        image: mkCompactMirror,
        contentImage: mkEyeshadowPalette,
        learningFocus: "A liner and a blender in one object.",
        bullets: [
          "One end is the pencil. The other is a brush, and the deck is specific about its job: it blends and blurs colour to perfection.",
          "This is what separates the product from an ordinary liner. A drawn line reads as makeup; a blurred one reads as lip.",
          "It also means the liner can be worn alone as an all-over lip colour, because the brush is what softens it from a line into a wash.",
          "The design is why the price sits above a standard pencil — the customer is buying two tools.",
        ],
      },
      {
        title: "How to Use — LIPS",
        image: mkBrushApplication,
        contentImage: mkPinkTexture,
        learningFocus: "Three ways to wear it.",
        bullets: [
          "Line the lips, following the natural line or taking it very slightly beyond at the cupid's bow and the centre of the lower lip.",
          "Use the dual-ended brush to perfect and blend the line until no hard edge remains.",
          "Wear it alone as an all-over lip colour — line, then fill in and blend with the brush.",
          "Or wear it under any DG lipstick or lip oil plumper, which is what makes the colour last and stops it travelling.",
          "At the counter, sharpen or wipe the pencil tip between customers and use a disposable applicator for the brush end. Never apply a shared pencil directly to a customer's lips.",
        ],
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkBlushApplication,
        contentImage: mkDropper,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "For customers who want fuller-looking lips without a treatment, and for anyone whose lipstick bleeds or wears off from the centre.",
          "Pairs directly with the Oil Lip Plumper and the Rose Dew Lip Bite — liner first, colour on top.",
          "An easy entry point for a customer loyal to another lipstick brand, since a liner displaces nothing she already owns.",
          "Refer rather than recommend for cracked, broken or bleeding lips.",
        ],
        qa: [
          { q: "Will overlining look obvious?", a: "Not if it is blended. That is what the brush end is for — a hard line looks drawn on, a blurred one just looks like a fuller lip." },
          { q: "Do I need it if I already have lipstick?", a: "You do not need it, but it is what makes lipstick stay where you put it. If yours bleeds or fades from the middle, this is the fix." },
          { q: "Which of the 14 shades do I pick?", a: "Either match your natural lip for an invisible base, or match the lipstick you wear most. Let me swatch both on your hand." },
          { q: "What is in it?", a: "The ingredient list is not published in our training material. Let me get you the official counter reference." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-oil-lip-plumper", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Oil Lip Plumper", image: mkMint, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkFig,
        contentImage: mkCherry,
        learningFocus: "A lip oil that plumps without the sting.",
        bullets: [
          "A nurturing, glossy lip oil that protects, enhances and plumps the lips, bringing out their natural colour. It plumps immediately and without tingling.",
          "The texture is a new generation of jelly oil with a watery finish — juiced and glazed rather than sticky.",
          "24H hydration, from cranberry oil, shea butter and vitamin E.",
          "The original Mint version carries the scent of D&G Light Blue, the house's iconic fragrance. This is a real cross-category hook.",
          "The absence of tingling is the selling point. Most plumping products work by irritating the lip; this one works by hydrating it.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkBergamot,
        contentImage: mkDropper,
        learningFocus: "The actives, and the colour agent that surprises customers.",
        bullets: ["A jelly oil formula built on nourishing oils plus a plumping agent:"],
        keyIngredients: [
          { name: "Italian Sprout and Mint", description: "The painless plumping agent. This is what makes it plump without tingling." },
          { name: "Mediterranean Elixir & Mint", description: "Plumping effect and improved smoothness." },
          { name: "DG Vita E", description: "Lasting protection." },
          { name: "Cranberry oil, shea butter and vitamin E", description: "For soft, smooth and moisturized lips." },
          { name: "pH colour-reviving agent", description: "Adapts to the wearer and enhances the natural lip colour. Present in the Mint version only — the Orange, Watermelon and Coffee shade extensions carry no pH agent." },
          { name: "Formula credentials", description: "Vegan · Clean at Sephora · cooling." },
        ],
      },
      {
        title: "Four Shades",
        image: mkRose,
        contentImage: mkEyeshadowPalette,
        learningFocus: "One original and three extensions, and how they differ.",
        bullets: [
          "The deck frames the three extensions as flavours of an Italian afternoon: refreshing Aperol Spritz, tempting Watermelon Granita, energizing Coffee. It is a good story and customers respond to it.",
          "The important technical difference is the pH agent. Only the Mint adapts to the wearer; the extensions deliver a burst of colour with a glossy finish instead.",
        ],
        keyIngredientsLabel: "Shades",
        keyIngredients: [
          { name: "MINT", description: "The original. Clinically proven plumping effect, pH colour-reviving agent, Light Blue scent. The one to demonstrate." },
          { name: "ORANGE", description: "Italian orange extract, known for its brightening properties. Orange aroma. No pH agent." },
          { name: "WATERMELON", description: "Italian watermelon extract, known for its antioxidant activities. Watermelon aroma. No pH agent." },
          { name: "COFFEE", description: "Italian coffee extract, known to stimulate the skin. Coffee aroma, and the shade sits in the Mocha Mousse family — Pantone's 2025 Colour of the Year." },
        ],
      },
      {
        title: "Packaging & Wow Factors",
        image: mkFanBrush,
        contentImage: mkCompactMirror,
        learningFocus: "The format, and the four things to point out.",
        bullets: [
          "Rounded square shape in frosted glass, consistent with the Violet Liquid Blush and the Rose Dew Lip Bite — the three read as a set.",
          "An XXL lip wand for generous, juicy application, with an angled fluffy brush head.",
          "Skincare-inspired packaging, in line with the rest of the Fresh Look wardrobe.",
          "Four wow factors: non-sticky glossy finish · instant and painless plumping effect · perfect hint of colour · skincare infused.",
        ],
        baScript: "Feel the wand — it is oversized on purpose, so one swipe covers the whole lip. And it is not sticky. That is the thing people do not believe until they try it.",
      },
      {
        title: "Published Results",
        image: mkPigmentPot,
        contentImage: mkFreckleSkin,
        learningFocus: "The figures, and the one clinical claim in the line.",
        bullets: ["This product carries the only clinical claim in the Fresh Look line, and three percentage figures. State each as the deck states it."],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "Clinically proven plumping effect", description: "No figure is published with this claim." },
          { name: "90% agree lips are instantly visibly plumper", description: "Attributed to the Mediterranean elixir." },
          { name: "100% feel smoother lips after 21 days of use", description: "Reported in testing." },
          { name: "100% feel 24H of lasting freshness", description: "Reported in testing." },
          { name: "Stated performance", description: "24H hydration · smooth and refined lips · instant glow finish." },
        ],
        baScript: "The plumping is clinically proven, and 90% of testers saw it immediately. The smoothness result was measured at 21 days, so give it three weeks before you judge that part.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: mkBlushApplication,
        contentImage: mkPinkTexture,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "For dry lips, for anyone who wants gloss without stickiness, and for customers who have tried a plumper before and disliked the sting.",
          "Wear it directly on bare lips, or under or over any lip product for extra dimension, hydration and shine.",
          "Pairs with My Lip Overliner underneath. Pro tip from the deck: cleanse and exfoliate the lips first for the smoothest finish.",
          "Avoid on cracked, broken or bleeding lips; refer instead.",
        ],
        qa: [
          { q: "Is the texture sticky?", a: "No. It is a new-generation jelly oil that glides on with a watery finish rather than a tacky one." },
          { q: "Does it have a scent?", a: "Yes — the Mint version is scented after our iconic Light Blue fragrance. The other three carry orange, watermelon and coffee aromas." },
          { q: "It plumps, so will it tingle?", a: "No. It uses a painless plumping agent, so you feel a refreshing sensation rather than a sting. It plumps with hydration, using shea butter and cranberry oil." },
          { q: "Can I use it at night?", a: "Yes — morning, night, any time your lips want moisture. Many customers use it as an overnight lip treatment." },
        ],
      },
    ]),
  },
  {
    id: "dg-mk-rose-dew-lip-bite", brand: "Dolce & Gabbana", category: "MAKEUP", categoryId: "makeup",
    title: "Rose Dew Lip Bite", image: mkEyeshadowPalette, completed: 0, total: 7,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: mkRose,
        contentImage: mkLips,
        learningFocus: "The product, and the three words it is built on.",
        bullets: [
          "A hydrating glowy lip tint that adds a natural wash of colour with a dewy, just-bitten effect.",
          "It sits in the Fresh Look wardrobe as the lip counterpart to the Cherry Glaze Bar — the two launched together and were designed to be worn together.",
          "The campaign resolves to three words: **FLUSHED** — a soft, healthy touch of colour, effortless and uplifting. **DEWY** — a hydrated, luminous finish; this describes the texture: smooth, moisturizing and lightly glossy without being sticky. **FRESH** — clean, youthful, easy; the mood of the look.",
          "It enhances every skin tone with a soft tint that brings life to the face. That is the pitch, and it is accurate.",
        ],
      },
      {
        title: "Why Your Customer Will Love It",
        image: mkBergamot,
        contentImage: mkFig,
        learningFocus: "Three features, each answering a real objection.",
        bullets: [
          "BUILDABLE HINT OF COLOUR — a soft wash that builds from a no-makeup look to a stronger, popping lip. The finish adapts to any style or occasion.",
          "SEMI-PERMANENT FLUSH THAT LASTS FOR HOURS — it leaves a natural tint that stays put, so the customer is not reapplying through the day.",
          "INSTANT AND LONG-LASTING HYDRATION — a watery, lightweight formula that delivers immediate moisture and keeps lips comfortable.",
          "Stated performance — 24H hydration · non-stick glow · fresh dewy tint.",
          "Each of these answers an objection customers actually raise: tints are too strong, they fade, and they dry the lips out. This one is positioned against all three.",
        ],
      },
      {
        title: "Key Ingredients",
        image: mkDropper,
        contentImage: mkPinkTexture,
        learningFocus: "Two actives, both familiar.",
        bullets: [
          "A watery, lightweight formula built on two ingredients:",
          "Hyaluronic acid also anchors the Bergamot Glow Primer, and rose appears in the Rose Glow Cushion and the Fig Skin Perfector. A customer who has bought into the ingredient story elsewhere in the line will recognise both.",
        ],
        keyIngredients: [
          { name: "Italian Rose Extract", description: "Known for its moisturizing and antioxidant properties." },
          { name: "Hyaluronic Acid", description: "Known for hydration and a plumping effect." },
          { name: "Stated benefits", description: "Hydration · glow · buildable colour." },
        ],
      },
      {
        title: "Packaging",
        image: mkCompactMirror,
        contentImage: mkFanBrush,
        learningFocus: "The applicator is the story here.",
        bullets: [
          "A unique teardrop-shaped flexible flocked applicator with a precise tip and a central reservoir that loads extra product — this is what creates the juicy, 3D lip effect.",
          "Double-lacquered, colour-matched glass, so the bottle shows the shade it holds.",
          "Rounded square shape, in line with the Oil Lip Plumper and the Violet Liquid Blush.",
          "The signature shiny gold band, which is what makes it read as an accessory.",
          "The applicator is worth demonstrating rather than describing. The reservoir is why one pass covers the lip.",
        ],
      },
      {
        title: "Six Shades",
        image: mkBlushApplication,
        contentImage: mkFreckleSkin,
        learningFocus: "The colour story, and who each shade is for.",
        bullets: ["Two nudes at opposite temperatures — Dainty Mauve cool, Dreamy Rosewood warm — is the pairing to know. Which one suits a customer is decided by her undertone, not by preference."],
        keyIngredientsLabel: "Shades",
        keyIngredients: [
          { name: "1 Bubbly Pink", description: "Trendy bunny-tongue shade. A bright, playful pink inspired by the viral look; instant youthfulness. For the K-beauty-inspired customer." },
          { name: "2 Dainty Mauve", description: "Cool nude. Soft and muted, enhances the natural lip. The \"my lips but better\" shade; especially flattering on cool undertones but wearable across all." },
          { name: "3 Fizzy Coral", description: "Unexpected pop. A lively coral with juicy brightness; cheerful without being overpowering." },
          { name: "4 Flirty Red", description: "Iconic colour. A universal red, comfortable and soft, which makes a red lip approachable for daily wear. Works across fair, medium and deep skin." },
          { name: "5 Dreamy Rosewood", description: "Warm nude. Earthy and polished; a nude with more depth. Universally flattering." },
          { name: "6 Quirky Mocha", description: "Hot new colour. A modern mocha brown; reads as a nude on deeper skin and as a statement shade on lighter skin." },
        ],
      },
      {
        title: "Lip Undertones",
        image: mkBrushApplication,
        contentImage: mkCherry,
        learningFocus: "Five reasons the undertone decides the shade.",
        bullets: [
          "HARMONY WITH SKIN UNDERTONES — warm undertones pair with corals, peaches and brick reds; cool undertones with blue or purple bases such as berry and mauve; neutral undertones wear a wide range comfortably.",
          "COLOUR ACCURACY — a shade can look perfect in the bottle and read too orange or too ashy on the lip if the undertone clashes. Matching keeps the colour true.",
          "ENHANCING THE OVERALL LOOK — lip undertone affects how the lip sits with the blush and the eye. A mismatch makes the lips stand out awkwardly instead of harmonising.",
          "IMPACT ON TEETH AND SMILE — cool-undertone, blue-based reds make teeth look whiter; warm undertones can emphasise yellow tones. Worth knowing before recommending a red.",
          "PERSONAL STYLE AND MOOD — a warm nude feels earthy and casual, a cool nude feels chic and polished. Same product category, different signal.",
        ],
      },
      {
        title: "Technique, Pairing & Common Questions",
        image: mkPigmentPot,
        contentImage: mkMint,
        learningFocus: "The ombre gesture, the cross-sell, and ready answers.",
        bullets: [
          "OMBRE LIPS — dab the tint onto the centre of the lips and blend it outward.",
          "Lightly buff the outer edges with the DG Blender Brush to soften the borders.",
          "The result is a gradient that reads as a natural flush rather than an applied colour — which is what \"lip bite\" refers to.",
          "The Cherry Glaze Bar shades were developed to pair with these six. When a customer chooses a lip shade, show her the blush designed to complete it — and the other way round.",
          "If she likes a warm nude lip, the warm blush keeps the whole look balanced. If she wants something bolder, a contrasting pairing still harmonises.",
          "This is the clearest cross-sell in the line, and it is designed rather than improvised.",
        ],
        qa: [
          { q: "How much is it?", a: "The price is not in our training material yet. Let me confirm it from the counter reference rather than quote you the wrong figure." },
          { q: "Will it dry my lips out like other tints?", a: "It is built on hyaluronic acid and Italian rose extract, with 24-hour hydration. It is a tint that behaves like a balm, which is unusual." },
          { q: "How long does it actually last?", a: "It leaves a semi-permanent flush that stays for hours — the gloss softens first, the tint stays. You will not be reapplying every hour." },
          { q: "Which shade goes with the blush I just chose?", a: "They were designed as pairs. Let me show you the matching shade — that is the whole point of launching them together." },
        ],
      },
    ]),
  },

  // ── Dolce & Gabbana — Skin Care · Fresh Skin ───────────────────────────────
  // Source of truth: NXS × Aroma Abadi Product Knowledge Library, D&G Fresh Skin, v4.0 (July 2026)
  {
    id: "dg-skin-science-essentials", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Skin Science Essentials", image: skinHoney, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "The Skin Barrier",
        image: skinGelPatch,
        contentImage: skinScienceCard1Barrier,
        learningFocus: "What the barrier is and why it underpins the whole line.",
        bullets: [
          "The skin's outermost layer behaves like a brick wall: skin cells are the bricks, and lipids — including ceramides — are the mortar holding them together.",
          "When the mortar is intact, water stays in and irritants stay out. When it is depleted, water escapes and skin becomes dry, sensitive and dull.",
          "Almost every concern a customer describes — tightness, flaking, redness, dullness — traces back to a weakened barrier.",
          "This is why the line pairs humectants that attract water with ceramides that rebuild the mortar. Barrier first, results second.",
        ],
      },
      {
        title: "Skin Type vs Skin Condition",
        image: skinSmallPot,
        contentImage: skinScienceCard2TypeVsCondition,
        learningFocus: "The distinction that drives every recommendation.",
        bullets: [
          "Skin TYPE is largely genetic and stable — normal, dry, oily or combination. It describes how much oil the skin produces.",
          "Skin CONDITION is temporary and changeable — dehydrated, sensitized, congested, dull, uneven. It is driven by environment, habits and products.",
          "The critical point: oily skin can be dehydrated at the same time. Oil and water are different things.",
          "A product cannot change a customer's type. It can improve her condition — and that is what the line is recommended against.",
          "**Type (stable)** — how much oil skin produces. Examples: Normal, Dry, Oily, Combination. A product cannot change it, so work with it; it decides which texture suits her.",
          "**Condition (changeable)** — how skin is behaving right now. Examples: Dehydrated, Sensitized, Congested, Dull. This is the target a product can change; it decides which actives she needs.",
        ],
      },
      {
        title: "Hydration vs Moisturization",
        image: skinDropper,
        contentImage: skinScienceCard3HydrationVsMoisturization,
        learningFocus: "Why the essence and the cream are always recommended together.",
        bullets: [
          "**HYDRATION** adds water to the skin. It comes from humectants — hyaluronic acid, glycerin, panthenol — which draw water into the upper layers.",
          "**MOISTURIZATION** seals that water in. It comes from emollients and occlusives — ceramides, butters, oils — which reinforce the barrier.",
          "Hydration without moisturization evaporates. Moisturization without hydration seals in nothing.",
          "In this line the Hydra-Dose essence hydrates and the Glow-Bounce cream seals. That is the mechanism behind recommending them as a pair.",
        ],
      },
      {
        title: "The Actives in This Line",
        image: skinJasmine,
        contentImage: skinScienceCard4Actives,
        learningFocus: "One line per active, in words a customer understands.",
        bullets: ["These are every active that appears across the seven Fresh Skin products. Learn the benefit, not the chemistry."],
        keyIngredientsLabel: "Actives",
        keyIngredients: [
          { name: "Hyaluronic Acid", description: "Humectant — draws and holds water. Say it like this: \"It pulls water into your skin so it looks plumper.\"" },
          { name: "PHA", description: "Gentle exfoliating acid, larger than AHA. Say it like this: \"A very gentle polish — smoother, without the sting.\"" },
          { name: "Niacinamide", description: "Strengthens barrier, evens tone. Say it like this: \"It strengthens your skin and evens out tone.\"" },
          { name: "Vitamin C", description: "Antioxidant, supports radiance. Say it like this: \"It defends against dullness and brightens.\"" },
          { name: "Ceramide", description: "Barrier lipid — prevents water loss. Say it like this: \"It rebuilds the mortar between your skin cells.\"" },
          { name: "Phytoglycogen", description: "Improves texture and appearance. Say it like this: \"It refines how your skin feels and looks.\"" },
          { name: "Caffeine / Coffee", description: "Boosts microcirculation, depuffs. Say it like this: \"It wakes the area up and reduces puffiness.\"" },
          { name: "Adenosine", description: "Supports smoothing and firming. Say it like this: \"It helps soften the look of fine lines.\"" },
          { name: "Pro-Vitamin B5", description: "Humectant, soothing. Say it like this: \"It calms and holds moisture.\"" },
          { name: "Shea Butter", description: "Nourishing emollient. Say it like this: \"It softens and feeds the skin.\"" },
        ],
      },
      {
        title: "Layering Order",
        image: skinFaceBrush,
        contentImage: skinScienceCard5LayeringOrder,
        learningFocus: "The order the products go on, and why.",
        bullets: [
          "Rule of thumb: thinnest to thickest, water-based before oil-based.",
          "Fresh Skin order — Cleanse → Essence (Hydra-Dose) → Serum (Re-Birth) → Moisturizer (Glow-Bounce). Lip and eye treatments slot in before the moisturizer.",
          "In the morning, sunscreen always goes last. This line contains no SPF, so that step comes from elsewhere — worth raising as a care point.",
          "Introduce one new active product at a time, about a week apart, so the customer can tell what is working.",
          "Always suggest a patch test on the inner forearm or jawline before first full-face use.",
        ],
      },
      {
        title: "Skin in a Tropical Climate",
        image: skinOrangeBlossom,
        contentImage: skinScienceCard6TropicalClimate,
        learningFocus: "How local conditions change which textures customers accept.",
        bullets: [
          "Heat and humidity increase oil production, so customers resist anything described as rich or heavy.",
          "Yet dehydration is still common — air conditioning, sun exposure and long indoor days all pull water from the skin.",
          "UV exposure is high year-round rather than seasonal, so daily sun protection is a baseline conversation.",
          "Practical consequence: lead with the essence and serum for their light textures, and describe the cream by its bouncy, fast-absorbing finish rather than by richness.",
        ],
      },
    ]),
  },
  {
    id: "dg-fresh-skin-story", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "The Fresh Skin Story", image: skinSilk, completed: 0, total: 5,
    cards: buildCards([
      {
        title: "The Lingerie of Beauty",
        image: skinCreamFlower,
        contentImage: skinJasmine,
        learningFocus: "The concept, and how to say it naturally.",
        bullets: [
          "Fresh Skin is positioned as \"The Lingerie of Makeup\" — the intimate, essential layer worn closest to the skin, beneath everything else.",
          "Packaging is deliberately fashion-led: lace, corset lacing and silk references, in nude tones with gold trim.",
          "The promise is that skincare is part of getting dressed — the layer that makes everything above it look better.",
          "Use the idea, not the phrase. Customers respond to \"this is the layer your makeup sits on,\" not to marketing language quoted back at them.",
        ],
        baScript: "Think of this as the layer underneath everything — get your skin right first, and your makeup sits better and lasts longer.",
      },
      {
        title: "Ingredient Philosophy",
        image: skinCoffeeBeans,
        contentImage: skinOrangeBlossom,
        learningFocus: "Two worlds in every formula.",
        bullets: [
          "Every formula pairs natural Italian ingredients with hi-tech molecules.",
          "Ingredients are selected for proven efficacy and for relevance to what customers are actually asking for.",
          "This dual story is a real advantage: the Italian sourcing gives provenance and romance, the actives give credibility.",
        ],
        keyIngredients: [
          { name: "Natural Italian", description: "jasmine, Sorrento lemon, orange flower, coffee, cranberry." },
          { name: "Hi-Tech Molecules", description: "hyaluronic acid, niacinamide, ceramide, PHA, adenosine." },
        ],
      },
      {
        title: "Who It Is For",
        image: skinFaceBrush,
        contentImage: skinGelPatch,
        learningFocus: "The target and the three mindsets.",
        bullets: [
          "Core audience: 18–30 years old.",
          "Three mindsets — Makeup & Skincare Addicts, Skintellectuals, and Experience Driven shoppers.",
          "Each mindset opens differently. The Skintellectual wants actives. The Experience Driven customer wants texture. The Addict wants the full routine.",
          "**Skincare Addict** asks \"What's the full routine?\" — start by building the four-step ladder, then go targeted.",
          "**Skintellectual** asks \"What's the active? What's the percentage?\" — lead with actives and substantiated figures.",
          "**Experience Driven** asks \"What does it feel like?\" — put texture on the hand within 30 seconds.",
        ],
      },
      {
        title: "Plumped, Radiant, Revitalized",
        image: skinHoney,
        contentImage: skinLipGloss,
        learningFocus: "The three words that anchor every conversation.",
        bullets: [
          "Three signature results anchor the line: Plumped · Radiant · Revitalized.",
          "Match the customer's own words to one of the three, then talk about the product that owns it — Glow-Bounce for plumped, Hydra-Dose and Re-Birth for radiant, the targeted treatments for revitalized.",
          "Three words are memorable. A list of nine benefits is not.",
        ],
      },
      {
        title: "The Family & The Routine",
        image: skinDropper,
        contentImage: skinCreamFlower,
        learningFocus: "Seven products, one routine.",
        bullets: [
          "Seven products: a cleanser, an essence, a serum, a moisturizer, and three targeted treatments for lips and eyes.",
          "Routine spine: Cleanse → Hydrate → Smooth → Plump, with lip and eye treatments layered in.",
          "Customers think in routines. Learn the shape of the family before the detail of any single product.",
          "Step 1 Cleanse — Glow Refresh Basil Cleanser.",
          "Step 2 Hydrate — Hydra-Dose HA Booster.",
          "Step 3 Smooth (Treat) — Re-Birth Niacinamide Serum.",
          "Step 4 Plump (Seal) — Glow-Bounce Ceramide Cream.",
          "Targeted, lips (Exfoliate · Prime) — Nouri-Lip Berry Scrub, then Nouri-Kiss Petal Lip Patches.",
          "Targeted, eyes (Depuff) — No-Puff Caffeine Eye Patches.",
        ],
      },
    ]),
  },
  {
    id: "dg-claims-accurately", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Talking About Claims Accurately", image: skinCactusJar, completed: 0, total: 4,
    cards: buildCards([
      {
        title: "Two Kinds of Claim",
        image: skinLemon,
        contentImage: skinHoney,
        learningFocus: "Clinical versus consumer, and why the difference matters.",
        bullets: [
          "A claim is only usable if the brand has substantiated and approved it. Nothing inferred or estimated is a claim.",
          "**CLINICAL / INSTRUMENTAL** — measured on instruments under controlled conditions. Example: \"+42% skin hydration, clinical test after 8 weeks.\"",
          "**CONSUMER / SELF-ASSESSMENT** — what a test panel reported. Example: \"100% agree skin looks smoother, self-evaluation after 8 weeks.\"",
          "Always carry the qualifier. \"100% agree\" without \"in a consumer self-assessment\" overstates the evidence.",
          "Being precise about evidence builds trust rather than weakening the sale — customers notice the honesty.",
        ],
      },
      {
        title: "Language to Avoid",
        image: skinSmallPot,
        contentImage: skinDropper,
        learningFocus: "What a cosmetic may never be said to do.",
        bullets: [
          "These are cosmetics, not medicines. They improve the appearance and feel of skin — they do not treat, cure or prevent any condition.",
          "Never diagnose, never promise a medical outcome, never compare a product to a prescription treatment.",
          "Don't say **\"This will cure your acne\"** — that's a therapeutic claim. Say instead: \"This supports a healthier-looking barrier.\"",
          "Don't say **\"It removes wrinkles\"** — it overstates and implies permanence. Say instead: \"It reduces the look of fine lines.\"",
          "Don't say **\"Medical-grade\"** — it implies a regulated medical product. Say instead: \"Clinically tested\", where substantiated.",
          "Don't say **\"You have eczema\"** — diagnosing is outside a BA's scope. Say instead: \"I'd suggest seeing a dermatologist.\"",
          "Don't say **\"Guaranteed for everyone\"** — no cosmetic can guarantee this. Say instead: \"In a clinical test after 8 weeks…\"",
          "Don't say **\"Chemical-free\"** — it's scientifically meaningless. Say instead: \"Formulated without [named ingredient].\"",
        ],
      },
      {
        title: "When to Refer",
        image: skinGelPatch,
        contentImage: skinFaceBrush,
        learningFocus: "Situations where no product should be recommended.",
        bullets: [
          "Stop and refer — do not recommend — when a customer mentions any of the following:",
          "A prescription topical in use, such as a retinoid or acne medication, because layering acids can irritate.",
          "Broken, bleeding or acutely inflamed skin.",
          "A suspected medical skin condition, or a mole or lesion that is changing.",
          "A known ingredient allergy, or a history of reaction to similar products.",
          "Pregnancy or breastfeeding questions about ingredient safety.",
        ],
        baScript: "That's something I'd rather you checked with a professional first — I'd hate to recommend something that works against what you're already using. Come back and see me once you know, and I'll help you build around it.",
      },
      {
        title: "When You Do Not Know",
        image: skinJasmine,
        contentImage: skinCoffeeBeans,
        learningFocus: "The rule for ingredient, safety and certification questions.",
        bullets: [
          "Customers ask about fragrance, alcohol, halal status, animal testing, registration and full ingredient lists.",
          "The rule is absolute: if you do not know, do not guess. An invented answer is both a compliance risk and a trust risk.",
          "Correct response — \"That's an important question and I'd rather give you the accurate answer than guess. Let me check for you.\"",
          "Every counter should hold the current approved reference for each product: full ingredient list, registration details, and the brand's official position on testing and certification.",
          "Escalate anything not covered to the counter manager, who routes it to the training lead.",
        ],
      },
    ]),
  },
  {
    id: "dg-glow-refresh-cleanser", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Glow Refresh Basil Cleanser", image: skinFaceBrush, completed: 0, total: 5,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinSmallPot,
        contentImage: skinCreamFlower,
        learningFocus: "What it is and its role in the routine.",
        bullets: [
          "A serum-touch hydrating cleanser — the first step of the Fresh Skin routine, launched as a new addition to the line.",
          "Presented in the collection's nude-tone pump packaging with gold trim.",
          "The \"serum touch\" descriptor signals the intended experience: cleansing without the tight, stripped feeling that makes customers abandon a cleanser.",
          "Its role is foundational — cleansing determines how well everything applied afterwards absorbs and performs.",
          "Size, price and active ingredients are not published in the training deck — confirm with the brand before advising on these specifics.",
        ],
      },
      {
        title: "Why Cleanse in the Morning",
        image: skinHoney,
        contentImage: skinOrangeBlossom,
        learningFocus: "The morning rationale, specifically.",
        bullets: [
          "Overnight, skin produces oil, sheds dead cells, collects sweat and picks up residue transferred from the pillow.",
          "A morning cleanse removes that buildup so serums and moisturizers absorb properly instead of sitting on top of it.",
          "It also creates a clean surface so sunscreen forms an even film.",
          "This answers the common belief that washing in the morning is unnecessary after washing at night.",
        ],
      },
      {
        title: "Why Cleanse at Night",
        image: skinSilk,
        contentImage: skinCactusJar,
        learningFocus: "The evening rationale, specifically.",
        bullets: [
          "Through the day, skin accumulates dirt, pollution, sweat, sunscreen and makeup.",
          "Left in place, these clog pores, dull the skin, contribute to breakouts and block night-time products from absorbing.",
          "Night is when skin does most of its repair work, so it needs a clean surface to work from.",
          "In a humid, high-pollution urban climate the argument is stronger, not weaker — there is simply more to remove.",
        ],
        baScript: "Night-time is when your skin repairs itself, so it needs a clean surface to work with. This lifts the day off without leaving your skin feeling stripped.",
      },
      {
        title: "Who It Suits",
        image: skinGelPatch,
        contentImage: skinSmallPot,
        learningFocus: "Matching the product to the customer.",
        bullets: [
          "Suits all skin types as a daily first step, morning and evening.",
          "Particularly relevant for customers who say cleansers leave their skin feeling tight — the serum-touch texture addresses exactly that.",
          "A natural first Fresh Skin purchase: changing a cleanser does not disrupt treatment steps a customer already trusts.",
          "Refer rather than recommend if the customer has broken or acutely inflamed skin.",
        ],
      },
      {
        title: "Common Questions",
        image: skinDropper,
        contentImage: skinJasmine,
        learningFocus: "Ready answers to what customers actually ask.",
        qa: [
          { q: "Do I really need to cleanse in the morning if I washed last night?", a: "Yes — skin produces oil, sheds cells and picks up pillow residue overnight. A morning cleanse clears that so your serums absorb and sunscreen sits evenly." },
          { q: "Will it dry my skin out?", a: "It is designed as a hydrating, serum-touch cleanser rather than a stripping one. The intent is cleansing without tightness." },
          { q: "Can I use it to remove makeup?", a: "The deck does not specify makeup-removal performance. Check the official product reference before advising, rather than assuming." },
          { q: "What is in it?", a: "The training deck does not publish the active ingredients. Consult the counter's approved ingredient reference — never estimate." },
        ],
      },
    ]),
  },
  {
    id: "dg-hydra-dose-booster", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Hydra-Dose HA Booster", image: skinDropper, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinCreamFlower,
        contentImage: skinSilk,
        learningFocus: "Function and positioning.",
        bullets: [
          "A hydrating and brightening essence with a soft, lightweight, watery texture.",
          "It penetrates immediately with a refreshing sensation and preps the skin for the steps that follow.",
          "Clinically proven to improve skin-barrier condition and reduce pore visibility after four weeks, while boosting hydration.",
          "Housed in premium glass, fashion-inspired packaging in nude tones with gold trim, with a precise dispenser.",
          "Its job is prep — everything applied after it performs better.",
        ],
      },
      {
        title: "Key Ingredients",
        image: skinJasmine,
        contentImage: skinHoney,
        learningFocus: "Three actives and what each does.",
        bullets: ["A refreshing, lightweight watery formula built on three actives:"],
        keyIngredients: [
          { name: "Italian Jasmine Extract", description: "Brightening effect; reduces the look of dark spots and skin roughness." },
          { name: "Hyaluronic Acid", description: "Draws and holds water for a healthy glow; plumping." },
          { name: "PHA", description: "Pro-Hyaluronic Acid; gentle exfoliation for smooth, regenerated skin." },
          { name: "Stated Benefits", description: "Hydration · Smoothness · Radiance." },
        ],
      },
      {
        title: "How to Use — HYDRATE",
        image: skinFaceBrush,
        contentImage: skinSmallPot,
        learningFocus: "The application gesture.",
        bullets: [
          "Gently shake, then place three to four drops in the palm.",
          "Pat onto the face: forehead and chin first, then the centre of the face.",
          "Finish by lightly tapping fingertips all over the neck and face.",
          "Pat, never rub — the gesture is part of the product experience.",
          "When demonstrating, apply to the back of the customer's hand first so she feels how quickly it absorbs.",
        ],
      },
      {
        title: "Wow Factors & Packaging",
        image: skinCactusJar,
        contentImage: skinCreamFlower,
        learningFocus: "Sensory and design features.",
        bullets: [
          "Lightweight watery formula — the texture answer to \"skincare feels heavy in this weather.\"",
          "Precise dispenser, described as the Splash System.",
          "Refreshing sensation on application — an immediate, demonstrable benefit.",
          "Luxury glass packaging with gold trim.",
          "At 100 ml used a few drops at a time, the bottle lasts — the natural response to a price question.",
        ],
      },
      {
        title: "Proven Results",
        image: skinHoney,
        contentImage: skinLemon,
        learningFocus: "The claims, and exactly how to state them.",
        bullets: ["Each figure must be quoted with its substantiation type, as covered in Talking About Claims Accurately."],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "+42% skin hydration", description: "Clinical test after 8 weeks." },
          { name: "+18% skin radiance increase", description: "Clinical test after 8 weeks." },
          { name: "100% agree skin looks smoother", description: "Consumer self-assessment after 8 weeks." },
          { name: "Improves barrier condition & reduces pore visibility", description: "Clinically proven after 4 weeks." },
        ],
        baScript: "Think of this as your skin's first sip of water — it floods the skin with hydration and brightness so your serum and cream absorb better. In testing, hydration was up 42% after eight weeks.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: skinGelPatch,
        contentImage: skinFaceBrush,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "Best for dullness, visible pores and dehydration — including on oily skin, which is often dehydrated.",
          "Suits all skin types; use morning and evening, layered before the serum.",
          "Always pair with a moisturizer, or the hydration it adds simply evaporates.",
          "Refer rather than recommend for customers on prescription retinoids, since it contains PHA.",
        ],
        qa: [
          { q: "My skin is oily — do I need this?", a: "Possibly yes. Oily skin can still be dehydrated. This adds water without adding oil, in a very light texture." },
          { q: "How many drops should I use?", a: "Three to four, patted in — not rubbed." },
          { q: "Can I use it with my prescription retinoid?", a: "It contains PHA, so check with your prescriber before layering acids. I'd rather you confirmed than risk irritation." },
          { q: "How soon will I see a difference?", a: "Hydration is immediate. The published results — 42% hydration, 18% radiance — were measured in a clinical test after eight weeks." },
        ],
      },
    ]),
  },
  {
    id: "dg-rebirth-serum", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Re-Birth Niacinamide Serum", image: skinLemon, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinDropper,
        contentImage: skinSilk,
        learningFocus: "Its role as the treatment step.",
        bullets: [
          "A soft, lightweight texture that absorbs quickly into the skin.",
          "Its next-generation formula is clinically proven to boost radiance, provide 24-hour hydration and instantly improve skin-barrier condition.",
          "It also improves overall skin appearance after four weeks by reducing the look of fine lines and helping prevent visible signs of aging.",
          "This is the treatment step — the essence preps, the serum works, the cream seals.",
          "At 30 ml it is the most concentrated product in the routine core.",
        ],
      },
      {
        title: "Key Ingredients",
        image: skinCoffeeBeans,
        contentImage: skinJasmine,
        learningFocus: "Three actives and where the lemon comes from.",
        bullets: ["A lightweight, soft, hugging formula that contains:"],
        keyIngredients: [
          { name: "Niacinamide", description: "Strengthens skin and improves its appearance; evens tone and refines texture." },
          { name: "Vitamin C", description: "Antioxidant; supports radiance." },
          { name: "Italian Lemon Peel", description: "Antioxidant, resurfacing and moisture-boosting; sourced in Sorrento, Italy." },
          { name: "Stated Benefits", description: "Hydration · Smoothness · Improved texture · Radiance." },
        ],
      },
      {
        title: "How to Use — SMOOTH",
        image: skinFaceBrush,
        contentImage: skinCreamFlower,
        learningFocus: "The signature lifting gesture.",
        bullets: [
          "Place two to three drops in the palm.",
          "Gently pat onto the face, including the neck.",
          "Position palms under the cheekbones and gently stretch skin and muscle towards the ears — firm yet gentle.",
          "The lifting movement is this product's signature, and what makes the application feel like a treatment rather than a step.",
        ],
      },
      {
        title: "Wow Factors & Packaging",
        image: skinSmallPot,
        contentImage: skinCactusJar,
        learningFocus: "Sensory and design features.",
        bullets: [
          "Lightweight and soft formula — no tackiness, which matters in humid conditions.",
          "Elegant and practical smart hygienic packaging.",
          "Immediate penetration, so it layers cleanly under the moisturizer and under makeup.",
          "The hygienic dispenser keeps the formula from contact with fingers and air — worth raising with hygiene-conscious customers.",
        ],
      },
      {
        title: "Proven Results",
        image: skinHoney,
        contentImage: skinOrangeBlossom,
        learningFocus: "The claims, and the honest timeline.",
        bullets: ["Set expectations honestly: radiance shifts earliest, while texture and fine-line results were measured at four weeks and beyond."],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "+15.5% skin radiance improvement", description: "Clinical test." },
          { name: "100% agree skin looks smoother", description: "Consumer self-assessment." },
          { name: "Improves the skin barrier; provides 24-hour hydration", description: "Clinically proven." },
          { name: "Reduces the look of fine lines", description: "After 4 weeks." },
        ],
        baScript: "This is where the results happen — niacinamide with Italian lemon and vitamin C smooths texture and evens tone. Radiance comes first; the fine-line results were measured at four weeks, so give it a month.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: skinGelPatch,
        contentImage: skinDropper,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "Best for uneven tone, rough texture, dullness and early fine lines.",
          "Niacinamide is generally well tolerated, making this an accessible first treatment product.",
          "Use morning and evening, after the essence and before the cream.",
        ],
        qa: [
          { q: "What is the difference between this and the essence?", a: "The essence preps and hydrates. The serum is the treatment that works on tone, texture and fine lines. They do different jobs, which is why they layer." },
          { q: "Will it irritate sensitive skin?", a: "Niacinamide is generally well tolerated, but patch test on the inner forearm first. If you react to actives easily, start every other day." },
          { q: "How fast will I see results?", a: "Radiance first. The fine-line and texture results were measured at four weeks, so a month is a fair review point." },
          { q: "Why is it more expensive than the essence when the bottle is smaller?", a: "It is the concentrated treatment step. You use two to three drops, so a 30 ml bottle lasts." },
        ],
      },
    ]),
  },
  {
    id: "dg-glow-bounce-cream", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Glow-Bounce Ceramide Cream", image: skinCreamFlower, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinCactusJar,
        contentImage: skinSilk,
        learningFocus: "Two roles in one product.",
        bullets: [
          "An ultra-sensorial texture that provides comfortable all-day wear.",
          "It increases radiance and gives a plumping, bouncy result that makes skin look healthier.",
          "It works seamlessly under makeup, enhancing results and improving how long makeup lasts.",
          "Clinically proven to improve skin elasticity and firmness and to boost hydration immediately.",
          "Encased in iconic, fashion-inspired refillable packaging in nude tones with gold trim.",
          "Two distinct roles: it seals the routine, and it acts as a makeup base.",
        ],
      },
      {
        title: "Key Ingredients",
        image: skinOrangeBlossom,
        contentImage: skinSmallPot,
        learningFocus: "Three actives, and ceramides in context.",
        bullets: [
          "A plumping, refining formula built on three actives:",
          "Link back to Skin Science Essentials: ceramides are the lipid mortar between skin cells, which is exactly why this product seals the routine.",
        ],
        keyIngredients: [
          { name: "Ceramide", description: "Hydrates and strengthens the skin barrier, preventing water loss." },
          { name: "Phytoglycogen", description: "Improves skin texture and appearance." },
          { name: "Italian Orange Flower", description: "Brightens skin, boosts radiance and soothes the epidermis." },
          { name: "Stated Benefits", description: "Hydration · Smoothness · Improved texture · Radiance." },
        ],
      },
      {
        title: "How to Use — PLUMP",
        image: skinFaceBrush,
        contentImage: skinDropper,
        learningFocus: "The outward-glide gesture.",
        bullets: [
          "Take about a fingertip of cream and apply evenly across face and neck.",
          "Glide fingers outward from the centre of the face with steady pressure, starting at the jawline.",
          "Stretch from the corners of the mouth towards the temples.",
          "Smooth the forehead from the centre outwards.",
          "Use light, flowing movements to boost circulation, plump and gently lift.",
        ],
      },
      {
        title: "Wow Factors & The Refill",
        image: skinSmallPot,
        contentImage: skinCactusJar,
        learningFocus: "The format story.",
        bullets: [
          "Ultra-sensorial, bouncy texture — demonstrate it rather than describe it.",
          "Refillable jar: the outer vessel is kept and only the inner pod is replaced.",
          "That carries two separate stories — sustainability for customers who care, and a lower-cost repeat purchase for those weighing price.",
          "Mention the refill at the point of purchase rather than months later.",
          "Works as a makeup-gripping base, improving how long makeup lasts.",
        ],
      },
      {
        title: "Proven Results",
        image: skinHoney,
        contentImage: skinLemon,
        learningFocus: "The claims, including the makeup figure.",
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "+31% immediate hydration boost", description: "Clinical test." },
          { name: "+35% instant improvement of makeup radiance", description: "Clinical test." },
          { name: "100% agree skin looks refined and feels bouncier", description: "Consumer self-assessment." },
          { name: "Improves skin elasticity and firmness", description: "Clinically proven." },
        ],
        baScript: "This is the step that locks everything in — ceramides rebuild your barrier while it plumps. It's tested to improve makeup radiance by 35%, so your base sits better. And the jar is refillable, so next time you only replace the pod.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: skinGelPatch,
        contentImage: skinFaceBrush,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "Best for dryness, dullness and loss of bounce or firmness.",
          "Use morning and evening, last in the skincare order — and before sunscreen in the morning.",
          "In humid conditions, describe the finish rather than the richness: fast-absorbing and bouncy, not heavy.",
        ],
        qa: [
          { q: "Moisturizer always feels heavy in this weather — will this?", a: "Feel it first. The texture is bouncy and fast-absorbing rather than rich, and it is formulated to sit under makeup." },
          { q: "How does the refill work?", a: "You keep the outer jar and replace only the inner pod, so the repeat purchase costs less and there is less packaging." },
          { q: "Can I use it if my skin is oily?", a: "Yes — the barrier still needs sealing. Use a smaller amount and focus on drier areas." },
          { q: "Does it replace sunscreen?", a: "No. There is no SPF in this line, so sunscreen still goes on last in the morning." },
        ],
      },
    ]),
  },
  {
    id: "dg-nouri-lip-scrub", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Nouri-Lip Berry Scrub", image: skinCranberries, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinLipGloss,
        contentImage: skinSmallPot,
        learningFocus: "Its role as lip-colour prep.",
        bullets: [
          "A hydrating scrub that gently buffs and smooths dry, flaky lips while maintaining moisture.",
          "An essential prep step for any lip colour.",
          "A melting, sugar-based formula in iconic nude-and-gold packaging.",
          "It improves the result of every lip colour on the counter, which is what makes it more than an add-on.",
        ],
      },
      {
        title: "Key Ingredients",
        image: skinHoney,
        contentImage: skinLemon,
        learningFocus: "Two actives, opposite jobs.",
        bullets: [
          "A melting sugar-based formula that contains:",
          "The pairing is why lips are not left stripped: cranberry particles exfoliate while shea butter nourishes, and the sugar base melts rather than abrades.",
        ],
        keyIngredients: [
          { name: "Italian Cranberries", description: "Natural exfoliating ingredient." },
          { name: "Shea Butter", description: "Nourishing and moisturizing properties." },
          { name: "Stated Benefits", description: "Hydration · Smoothness · Improved lip texture." },
        ],
      },
      {
        title: "How to Use — EXFOLIATE",
        image: skinFaceBrush,
        contentImage: skinSilk,
        learningFocus: "The gesture, and counter hygiene.",
        bullets: [
          "Gently rub the lips and the area around them.",
          "Pinch the lips softly, moving from the inside towards the corners.",
          "Remove the scrub, then massage with two fingers, sliding outward on each side.",
          "Recommend once or twice a week, or immediately before a bold lip look.",
          "At the counter: dispense with a clean spatula and never apply directly from the pot to a customer's lips.",
        ],
      },
      {
        title: "Wow Factors & Format",
        image: skinSmallPot,
        contentImage: skinDropper,
        learningFocus: "Why the format matters.",
        bullets: [
          "Luxury and cute format — small, pocketable and giftable.",
          "Melty texture that dissolves as you massage rather than scratching.",
          "Easy application, no tool required.",
          "Tested to be the ideal match for makeup application.",
          "The lowest price point in the line, which makes it an easy gift and an easy addition to any basket.",
        ],
      },
      {
        title: "Proven Results",
        image: skinCreamFlower,
        contentImage: skinLipGloss,
        learningFocus: "The claims and their substantiation.",
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "100% feel smoother lips", description: "Consumer self-assessment." },
          { name: "100% agree lips are moisturized", description: "Consumer self-assessment." },
          { name: "Improves lip makeup results", description: "Consumer self-assessment." },
        ],
        baScript: "Before any lipstick, this melts away the flakes and softens — so your colour goes on smooth and lasts. Scrub first, then the lip patches, and your lips are ready for anything.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: skinGelPatch,
        contentImage: skinSmallPot,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "For anyone with dry or flaky lips, and for anyone who wears lip colour.",
          "Pairs directly with the Nouri-Kiss Petal Lip Patches — scrub first, then patch, then colour.",
          "Avoid on cracked, broken or bleeding lips; refer instead.",
        ],
        qa: [
          { q: "How often should I use it?", a: "Once or twice a week, or right before a bold lip look." },
          { q: "Will it sting?", a: "It is a sugar-based melting scrub with shea butter, so it is designed to smooth without stripping. Avoid it if your lips are cracked or broken." },
          { q: "Can I eat it?", a: "It is a cosmetic product, not a food. Wipe it away after massaging rather than licking it off." },
          { q: "What do I use after it?", a: "The Nouri-Kiss Petal Lip Patches to nourish and prep, then your lip colour." },
        ],
      },
    ]),
  },
  {
    id: "dg-nouri-kiss-patches", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "Nouri-Kiss Petal Lip Patches", image: skinLipGloss, completed: 0, total: 5,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinGelPatch,
        contentImage: skinCreamFlower,
        learningFocus: "What it is and its place in the lip ritual.",
        bullets: [
          "An elevated addition to the Fresh Skin lip routine — presented as the new must-have for kissable, juicy lips.",
          "Gel pads that deeply nourish, beautify and prep the lips.",
          "Housed in a nude-pink DG monogram tin case containing five sachets.",
          "Designed as the beauty accessory to match the No-Puff Caffeine Eye Patches.",
          "It follows the scrub and precedes lip colour.",
          "Only one slide in the training deck covers this product, so no dedicated price or claim is published yet — confirm with the brand before publishing.",
        ],
      },
      {
        title: "Key Ingredients",
        image: skinHoney,
        contentImage: skinDropper,
        learningFocus: "Two actives and what each does.",
        bullets: ["Two targeted actives drive the gel formula:"],
        keyIngredients: [
          { name: "Adenosine", description: "Known for its soothing properties." },
          { name: "Pro-Vitamin B5", description: "A humectant, known for its hydrating properties." },
          { name: "Stated Benefits", description: "Smoothing · Soothing · Hydration." },
        ],
      },
      {
        title: "Packaging & The Matched Set",
        image: skinSmallPot,
        contentImage: skinGelPatch,
        learningFocus: "The tin, and why it is designed that way.",
        bullets: [
          "A nude-pink DG monogram tin case — reusable, recognisable and designed to be seen.",
          "Five individually sealed sachets keep each pair fresh and hygienic.",
          "Deliberately matched to the eye patches, so owning one invites owning the other.",
          "The tins photograph well, which matters to the 18–30 audience.",
          "Counter hygiene: single-use patches are never reused or shared, and a fresh sachet is opened for every demonstration.",
        ],
      },
      {
        title: "Who It Suits",
        image: skinFaceBrush,
        contentImage: skinLemon,
        learningFocus: "Matching the product to the customer.",
        bullets: [
          "For dry lips, for anyone prepping before lip colour, or as a short self-care moment.",
          "Sits naturally after the Nouri-Lip Berry Scrub — exfoliate, then nourish and prep.",
          "An easy entry point for a customer loyal to another skincare brand, since a targeted treatment displaces nothing she already uses.",
          "Avoid on broken or cracked lips; refer instead.",
        ],
        baScript: "Scrub first, then patch — that's the full lip ritual. And the tin matches our eye patches, so together they make a beautiful set or gift.",
      },
      {
        title: "Common Questions",
        image: skinJasmine,
        contentImage: skinCoffeeBeans,
        learningFocus: "Ready answers, including what is not yet published.",
        qa: [
          { q: "How many are in a tin?", a: "Five sachets, each containing one pair of patches." },
          { q: "How long do I leave them on?", a: "The deck does not publish a wear time for the lip patches. Check the pack instructions or the counter reference — do not assume the eye patch timing." },
          { q: "How much is it?", a: "Confirm from the official counter reference before quoting. The training material does not publish a price." },
          { q: "Can I reuse a patch?", a: "No — they are single use. That is also why each pair is individually sealed." },
        ],
      },
    ]),
  },
  {
    id: "dg-no-puff-eye-patches", brand: "Dolce & Gabbana", category: "SKIN CARE", categoryId: "skin-care",
    title: "No-Puff Caffeine Eye Patches", image: skinGelPatch, completed: 0, total: 6,
    cards: buildCards([
      {
        title: "Meet the Product",
        image: skinLipGloss,
        contentImage: skinSmallPot,
        learningFocus: "The product and its result window.",
        bullets: [
          "Under-eye patches that minimise the appearance of puffiness and dark circles in tired-looking eyes in just 15 minutes.",
          "Water-drop-shaped gel pads carrying a bold DG monogram pattern drawn from the house codes.",
          "One reusable tin case contains five sachets, each holding one pair.",
          "The 15-minute window is the proposition — the fastest visible result in the line, and the easiest product to demonstrate.",
        ],
      },
      {
        title: "Key Ingredients",
        image: skinCoffeeBeans,
        contentImage: skinHoney,
        learningFocus: "Two actives, and why caffeine works.",
        bullets: [
          "The gel patches are powered by two targeted actives:",
          "In customer language: caffeine boosts microcirculation, which helps move the fluid that causes puffiness — it wakes the area up.",
        ],
        keyIngredients: [
          { name: "Italian Coffee Extract", description: "Boosts microcirculation, depuffs and counters fatigue; antioxidant activity." },
          { name: "Adenosine", description: "Supports revitalising, firming and anti-wrinkle activity." },
          { name: "Stated Benefits", description: "Depuffed eyes · Brightening · Refreshed skin." },
        ],
      },
      {
        title: "How to Use — DEPUFF",
        image: skinFaceBrush,
        contentImage: skinDropper,
        learningFocus: "Placement, timing and hygiene.",
        bullets: [
          "Place the patches under the eyes, close to the lower lash line — placement matters more than customers expect.",
          "Move around the eye area with gentle, precise movements.",
          "After application, gently create small waves with the fingers, working from the inside outwards.",
          "Leave on for approximately 15 minutes.",
          "At the counter: open a fresh sealed sachet, sanitise hands, ask permission before applying, and never reuse or share a patch.",
        ],
      },
      {
        title: "Wow Factors & The Tin",
        image: skinSmallPot,
        contentImage: skinCreamFlower,
        learningFocus: "Format advantages.",
        bullets: [
          "Fashionable and highly shareable — the monogram pattern is identifiable in a photograph.",
          "An endearing reusable tin case that customers keep.",
          "Easy application, requiring no tools.",
          "The formula is held inside the gel itself, so there is no leaking — a practical advantage over serum-soaked patches.",
          "The tin matches the lip patch tin as a set.",
        ],
      },
      {
        title: "Proven Results",
        image: skinHoney,
        contentImage: skinLemon,
        learningFocus: "The claims, all self-assessed.",
        bullets: ["All three figures are self-assessed, so attribute them to users rather than presenting them as instrument measurements."],
        keyIngredientsLabel: "Proven Results",
        keyIngredients: [
          { name: "96% notice immediate awakening results", description: "Consumer self-assessment." },
          { name: "94% agree the eye contour looks brighter", description: "Consumer self-assessment." },
          { name: "92% see the eye area is depuffed", description: "Consumer self-assessment." },
        ],
        baScript: "Fifteen minutes and your eyes look rested — the caffeine depuffs and the adenosine smooths. In testing, 96% of users noticed an immediate awakening effect. And you keep the tin.",
      },
      {
        title: "Who It Suits & Common Questions",
        image: skinSilk,
        contentImage: skinFaceBrush,
        learningFocus: "Matching to customers, and ready answers.",
        bullets: [
          "For tired-looking eyes, puffiness and the appearance of dark circles — before an event, after travel, or following a short night.",
          "Pairs with the Nouri-Kiss Petal Lip Patches as a matched set.",
          "Avoid on broken skin or near an active eye infection; refer instead.",
        ],
        qa: [
          { q: "How long do I leave them on?", a: "About 15 minutes." },
          { q: "Can I reuse a pair?", a: "No — the patches are single use. The tin, though, is designed to be kept." },
          { q: "Will they remove my dark circles permanently?", a: "No. They reduce the appearance of puffiness and dark circles in tired-looking eyes; the effect is temporary and cosmetic." },
          { q: "Do they leak like other eye masks?", a: "The formula is held inside the gel itself, so there is no dripping during wear." },
        ],
      },
    ]),
  },
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
  { id: "dolce", name: "Dolce & Gabbana", count: dolceModules.length, image: u("1542452255191-c85a98f2c5d1"), logo: brandDolce },
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
