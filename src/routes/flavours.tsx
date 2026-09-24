import { createFileRoute, Link } from "@tanstack/react-router";

import { FLAVOURS } from "@/lib/flavours";

export const Route = createFileRoute("/flavours")({
  head: () => ({
    meta: [
      { title: "Flavours — Fruti Pop Bali" },
      {
        name: "description",
        content:
          "Explore Fruti Pop Bali's tropical sorbet pop flavours — mango, dragonfruit, coconut and more. (Draft line-up pending confirmation.)",
      },
      { property: "og:title", content: "Flavours — Fruti Pop Bali" },
      {
        property: "og:description",
        content: "Explore Fruti Pop Bali's tropical sorbet pop flavours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Flavours,
});

function Flavours() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">Our Flavours</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Four fruity favourites, 100g each. Little pops. Big smiles.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FLAVOURS.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className={`flex h-72 items-center justify-center p-4 ${f.color}`}>
              <img src={f.img} alt={`Fruti Pop ${f.name} tube`} loading="lazy" className="h-full w-auto object-contain drop-shadow-lg" />
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">{f.tagline}</p>
              <h2 className="mt-1 text-lg font-semibold">{f.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-12 text-center">
        <p className="text-muted-foreground">Hungry yet? Find your nearest Fruti Pop.</p>
        <Link
          to="/where-to-buy"
          className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-105"
        >
          Where to Buy
        </Link>
      </div>
    </div>
  );
}
