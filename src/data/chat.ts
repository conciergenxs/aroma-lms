import productFoundation from "@/assets/product-foundation.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productBlush from "@/assets/product-blush.jpg";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
};

export type ChatSession = {
  id: string;
  title: string;
  product?: { name: string; brand: string; image: string };
  lastTime: string;
  messages: ChatMessage[];
};

export const chatSessions: ChatSession[] = [
  {
    id: "general",
    title: "Aroma BA-Helper Chat",
    lastTime: "Now",
    messages: [
      {
        id: "g1", role: "assistant", time: "08.00",
        text: "Halo! Aku **Aroma Abadi BA-Helper**. Tanyakan apa saja seputar produk, tips beauty, atau training kamu di sini ✨",
      },
    ],
  },
  {
    id: "real-flawless-foundation",
    title: "Real Flawless Foundation",
    product: {
      name: "Real Flawless Foundation",
      brand: "LAURA MERCIER",
      image: productFoundation,
    },
    lastTime: "08.15",
    messages: [
      {
        id: "m1", role: "user", time: "08.15",
        text: "Aku mau lebih ngerti soal **Real Flawless Foundation** deh.\n\nSebenarnya coverage sama finish-nya itu kayak gimana sih?",
      },
      {
        id: "m2", role: "assistant", time: "08.15",
        text: "Untuk **Real Flawless Foundation**:\n- **Coverage:** medium dan bisa di-build sesuai kebutuhan.\n- **Finish:** natural, dengan efek skin-like (menyatu dengan kulit)\n\nJadi hasilnya tetap terlihat seperti kulit asli, bukan full matte atau terlalu dewy.",
      },
    ],
  },
  {
    id: "translucent-loose-setting-powder",
    title: "Translucent Loose Setting Powder",
    product: {
      name: "Translucent Loose Setting Powder",
      brand: "LAURA MERCIER",
      image: productPowder,
    },
    lastTime: "Yesterday",
    messages: [
      { id: "m1", role: "user", time: "14.22", text: "Kapan paling tepat pakai setting powder ini?" },
      { id: "m2", role: "assistant", time: "14.22", text: "Pakai setelah foundation/concealer. Tap-tap dengan puff atau brush besar, fokus di area berminyak." },
    ],
  },
  {
    id: "blush-colour-infusion",
    title: "Blush Colour Infusion",
    product: {
      name: "Blush Colour Infusion",
      brand: "LAURA MERCIER",
      image: productBlush,
    },
    lastTime: "2 days ago",
    messages: [
      { id: "m1", role: "user", time: "10.05", text: "Rekomendasi shade buat undertone warm dong" },
      { id: "m2", role: "assistant", time: "10.05", text: "Shade Ginger atau Chai cocok banget buat warm undertone. Hasilnya glowy natural." },
    ],
  },
];

export const getSession = (id: string) => chatSessions.find((s) => s.id === id);
