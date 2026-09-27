import strawberry from "@/assets/order-originals/strawberry-original.png.asset.json";
import soursop from "@/assets/order-originals/soursop-original.png.asset.json";
import pineapple from "@/assets/order-originals/pineapple-original.png.asset.json";
import pinaColada from "@/assets/order-originals/pina-colada-original.png.asset.json";
import mango from "@/assets/order-originals/mango-original.png.asset.json";
import passionFruit from "@/assets/order-originals/passion-fruit-original.png.asset.json";
import { FLAVOURS, type Flavour } from "@/lib/flavours";

const originalImages: Record<string, string> = {
  Strawberry: strawberry.url,
  Soursop: soursop.url,
  Pineapple: pineapple.url,
  "Piña Colada": pinaColada.url,
  Mango: mango.url,
  "Passion Fruit": passionFruit.url,
};

export const ORDER_FLAVOURS: Flavour[] = FLAVOURS.map((flavour) => ({
  ...flavour,
  img: originalImages[flavour.name] ?? flavour.img,
}));