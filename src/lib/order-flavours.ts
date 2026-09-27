import strawberry from "@/assets/order-originals/strawberry-original.png.asset.json";
import soursop from "@/assets/order-originals/soursop-original.png.asset.json";
import pineapple from "@/assets/order-originals/pineapple-original.png.asset.json";
import pinaColada from "@/assets/order-originals/pina-colada-original.png.asset.json";
import mango from "@/assets/order-originals/mango-original.png.asset.json";
import passionFruit from "@/assets/order-originals/passion-fruit-original.png.asset.json";
import strawberryArt from "@/assets/flavour-artwork/strawberry-art.jpg.asset.json";
import soursopArt from "@/assets/flavour-artwork/soursop-art.png.asset.json";
import pineappleArt from "@/assets/flavour-artwork/pineapple-art.png.asset.json";
import pinaColadaArt from "@/assets/flavour-artwork/pina-colada-art.jpg.asset.json";
import mangoArt from "@/assets/flavour-artwork/mango-art.jpg.asset.json";
import passionFruitArt from "@/assets/flavour-artwork/passion-fruit-art.jpg.asset.json";
import { FLAVOURS, type Flavour } from "@/lib/flavours";

const originalImages: Record<string, string> = {
  Strawberry: strawberry.url,
  Soursop: soursop.url,
  Pineapple: pineapple.url,
  "Piña Colada": pinaColada.url,
  Mango: mango.url,
  "Passion Fruit": passionFruit.url,
};

const artworkImages: Record<string, string> = {
  Strawberry: strawberryArt.url,
  Soursop: soursopArt.url,
  Pineapple: pineappleArt.url,
  "Piña Colada": pinaColadaArt.url,
  Mango: mangoArt.url,
  "Passion Fruit": passionFruitArt.url,
};

export type OrderFlavour = Flavour & { art: string };

export const ORDER_FLAVOURS: OrderFlavour[] = FLAVOURS.map((flavour) => ({
  ...flavour,
  img: originalImages[flavour.name] ?? flavour.img,
  art: artworkImages[flavour.name] ?? "",
}));
