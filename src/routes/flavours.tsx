import { createFileRoute } from "@tanstack/react-router";
import { FlavourCard, PackSpotlight, WhatsAppButton } from "@/components/site";
import { FLAVOURS } from "@/lib/flavours";

export const Route = createFileRoute("/flavours")({
  head: () => ({
    meta: [
      { title: "Flavours — Fruti Pop Bali" },
      { name: "description", content: "Strawberry, Soursop, Pineapple, Piña Colada, Mango and Passion Fruit — meet the Fruti Pop fruit sorbet line-up." },
      { property: "og:title", content: "Flavours — Fruti Pop Bali" },
      { property: "og:description", content: "Six fruity sorbet pops: Strawberry, Soursop, Pineapple, Piña Colada, Mango and Passion Fruit." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/flavours" },
    ],
    links: [{ rel: "canonical", href: "/flavours" }],
  }),
  component: FlavoursPage,
});

function FlavoursPage() {
  return (
    <>
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center md:py-16">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Flavours</p>
          <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">Which one's your favourite?</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
            Six fruity sorbet pops, each in its own bright 100g tube. Kids pick by colour — grown-ups usually want two.
          </p>
          <p className="mx-auto mt-4 inline-block rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm">
            Made with an average of 65% fruit and less added sugar than regular ice pops.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3">
          {FLAVOURS.map((f) => <FlavourCard key={f.name} f={f} />)}
        </div>
        <div className="mt-10 text-center">
          <WhatsAppButton message="Hi Fruti Pop! Which flavours do you have available right now?">Ask what's available</WhatsAppButton>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-6"><PackSpotlight /></section>
    </>
  );
}
