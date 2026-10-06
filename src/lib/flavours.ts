import strawberry from "@/assets/strawberry-pop-card.webp.asset.json";
import lemon from "@/assets/order-originals/lemon-sorbet-transparent.png.asset.json";
import pineapple from "@/assets/pineapple-pop-card.webp.asset.json";
import pinaColada from "@/assets/pina-colada-pop-card.webp.asset.json";
import mango from "@/assets/mango-pop-card.webp.asset.json";
import passionFruit from "@/assets/passion-fruit-pop-card.webp.asset.json";
import mixedBerry from "@/assets/order-originals/mixed-berry-sorbet-original.jpeg.asset.json";

// Seven flavours confirmed by the owner. Taglines are printed on the genuine packaging.
export type Flavour = { name: string; tagline?: string; img: string | null; tint: string };

export const FLAVOURS: Flavour[] = [
  { name: "Strawberry", tagline: "Super Fresh.", img: strawberry.url, tint: "bg-dragonfruit/12" },
  { name: "Lemon Sorbet", tagline: "Super Fresh", img: lemon.url, tint: "bg-mango/25" },
  { name: "Pineapple", tagline: "Golden Bite.", img: pineapple.url, tint: "bg-mango/30" },
  { name: "Piña Colada", tagline: "Perfection.", img: pinaColada.url, tint: "bg-secondary" },
  { name: "Mango", tagline: "So Smooth.", img: mango.url, tint: "bg-mango/20" },
  { name: "Passion Fruit", tagline: "Sour Punch.", img: passionFruit.url, tint: "bg-accent/10" },
  { name: "Mixed Berry Sorbet", tagline: "Super Fresh.", img: mixedBerry.url, tint: "bg-dragonfruit/12" },
];
