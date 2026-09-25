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
      <section className="bg-muted py-4 md:py-5">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="fruti-section-heading">Order Your Fruti Pops</h1>
          <p className="fruti-hint mt-2">
            <span className="md:hidden">Swipe to explore. Tap to POP!</span>
            <span className="hidden md:inline">Hover to make them POP!</span>
          </p>
          <div className="mt-3"><FlavourCards /></div>
          <h2 className="fruti-form-heading mx-auto max-w-6xl mt-6">Order Form</h2>
          <div className="mx-auto mt-3 max-w-6xl"><OrderForm initialPack={pack} /></div>
        </div>
      </section>

      <WhyFrutiPop />
    </>
  );
}