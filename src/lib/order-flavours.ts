import strawberry from "@/assets/order-originals/strawberry-original.png.asset.json";
import lemon from "@/assets/order-originals/lemon-sorbet-original.png.asset.json";
import pineapple from "@/assets/order-originals/pineapple-original.png.asset.json";
import pinaColada from "@/assets/order-originals/pina-colada-original.png.asset.json";
import mango from "@/assets/order-originals/mango-original.png.asset.json";
import passionFruit from "@/assets/order-originals/passion-fruit-original.png.asset.json";
import strawberryArt from "@/assets/flavour-artwork-new/strawberry-sorbet.png.asset.json";
import lemonArt from "@/assets/flavour-artwork-new/lemon-sorbet.png.asset.json";
import pineappleArt from "@/assets/flavour-artwork-new/pineapple-sorbet.png.asset.json";
import pinaColadaArt from "@/assets/flavour-artwork-new/pina-colada-sorbet-improved.png.asset.json";
import mangoArt from "@/assets/flavour-artwork-new/mango-sorbet.png.asset.json";
import passionFruitArt from "@/assets/flavour-artwork-new/passion-fruit-sorbet.png.asset.json";
import { FLAVOURS, type Flavour } from "@/lib/flavours";

const originalImages: Record<string, string> = {
  Strawberry: strawberry.url,
  "Lemon Sorbet": lemon.url,
  Pineapple: pineapple.url,
  "Piña Colada": pinaColada.url,
  Mango: mango.url,
  "Passion Fruit": passionFruit.url,
};

const artworkImages: Record<string, string> = {
  Strawberry: strawberryArt.url,
  "Lemon Sorbet": lemonArt.url,
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
