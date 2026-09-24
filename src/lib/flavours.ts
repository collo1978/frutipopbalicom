import strawberry from "@/assets/strawberry-pop.webp.asset.json";
import soursop from "@/assets/soursop-pop.png.asset.json";
import pineapple from "@/assets/pineapple-pop.png.asset.json";
import pinaColada from "@/assets/pina-colada-pop.png.asset.json";

// Flavours confirmed from genuine Fruti Pop packaging photos.
export const FLAVOURS = [
  { name: "Strawberry Sorbet", tagline: "Super Fresh.", img: strawberry.url, color: "bg-dragonfruit/15", note: "Strawberry smiles all around! 🍓" },
  { name: "Soursop Sorbet", tagline: "Tropical Taste.", img: soursop.url, color: "bg-palm/15", note: "A little taste of the tropics. 🌿" },
  { name: "Pineapple Sorbet", tagline: "Golden Bite.", img: pineapple.url, color: "bg-mango/25", note: "Sunshine in every bite! 🍍" },
  { name: "Pina Colada Sorbet", tagline: "Perfection.", img: pinaColada.url, color: "bg-secondary", note: "Island holiday vibes. 🥥" },
];
