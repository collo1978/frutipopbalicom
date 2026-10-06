import { createFileRoute } from "@tanstack/react-router";
import { OrderForm, type PackKey } from "@/components/order-form";
import { WhyFrutiPop } from "@/components/order-sections";

type OrderSearch = { pack?: PackKey; mystery?: boolean };

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => {
    const result: OrderSearch = {};
    if (search["pack"] === "family" || search["pack"] === "jumbo") result.pack = search["pack"];
    if (search["mystery"]) result.mystery = true;
    return result;
  },
  head: () => ({
    meta: [
      { title: "Order Fruti Pops | Fruti Pop Bali" },
      { name: "description", content: "Choose a Fruti Pop pack, mix your seven favourite flavours, add delivery details and send your order on WhatsApp." },
      { property: "og:title", content: "Order Fruti Pops | Fruti Pop Bali" },
      { property: "og:description", content: "Build a Family Pack or Jumbo Pack and send your completed Fruti Pop order on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { pack, mystery } = Route.useSearch();
  return (
    <>
      <section className="bg-muted py-3 md:py-4">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="sr-only">Order Your Fruti Pops</h1>
          <div className="mx-auto max-w-6xl"><OrderForm initialPack={pack} openMystery={mystery} /></div>
        </div>
      </section>

      <WhyFrutiPop />
    </>
  );
}