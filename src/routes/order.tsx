import { createFileRoute } from "@tanstack/react-router";
import { OrderForm, type PackKey } from "@/components/order-form";
import { FlavourCards, WhyFrutiPop } from "@/components/order-sections";

type OrderSearch = { pack?: PackKey };

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => {
    if (search["pack"] === "family" || search["pack"] === "jumbo") return { pack: search["pack"] };
    return {};
  },
  head: () => ({
    meta: [
      { title: "Order Fruti Pops | Fruti Pop Bali" },
      { name: "description", content: "Choose a Fruti Pop pack, mix your six favourite flavours, add delivery details and send your order on WhatsApp." },
      { property: "og:title", content: "Order Fruti Pops | Fruti Pop Bali" },
      { property: "og:description", content: "Build a Family Pack or Jumbo Pack and send your completed Fruti Pop order on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { pack } = Route.useSearch();
  return (
    <>
      <section className="bg-coconut py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold text-accent md:text-5xl">Order Your Fruti Pops</h1>
          <p className="mt-2 max-w-2xl text-foreground/80">Choose your pack, mix and match your favourite flavours, and get them delivered!</p>
          <div className="mt-6"><OrderForm initialPack={pack} /></div>
        </div>
      </section>

      <section className="bg-muted py-12 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-accent md:text-4xl">Our Flavours</h2>
          <p className="mt-2 text-foreground/80">Six fruity sorbet pops, each in its own bright 100g tube.</p>
          <div className="mt-6"><FlavourCards /></div>
        </div>
      </section>

      <WhyFrutiPop />
    </>
  );
}