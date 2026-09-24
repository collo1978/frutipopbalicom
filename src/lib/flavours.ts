import strawberry from "@/assets/strawberry-pop.webp.asset.json";
import soursop from "@/assets/soursop-pop.png.asset.json";
import pineapple from "@/assets/pineapple-pop.png.asset.json";
import pinaColada from "@/assets/pina-colada-pop.png.asset.json";

// Six flavours confirmed by the owner. Taglines are printed on the genuine packaging.
// Mango and Passion Fruit product photos have not been supplied yet (img: null).
export type Flavour = { name: string; tagline?: string; img: string | null; tint: string };

export const FLAVOURS: Flavour[] = [
  { name: "Strawberry", tagline: "Super Fresh.", img: strawberry.url, tint: "bg-dragonfruit/12" },
  { name: "Soursop", tagline: "Tropical Taste.", img: soursop.url, tint: "bg-primary/12" },
  { name: "Pineapple", tagline: "Golden Bite.", img: pineapple.url, tint: "bg-mango/30" },
  { name: "Piña Colada", tagline: "Perfection.", img: pinaColada.url, tint: "bg-secondary" },
  { name: "Mango", img: null, tint: "bg-mango/20" },
  { name: "Passion Fruit", img: null, tint: "bg-accent/10" },
];
