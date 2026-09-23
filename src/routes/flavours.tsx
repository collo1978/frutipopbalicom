import { createFileRoute, Link } from "@tanstack/react-router";

import flavoursGrid from "@/assets/flavours-grid.jpg";

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

// Placeholder line-up: flavour names and availability pending confirmation.
const FLAVOURS = [
  { name: "Sunny Mango", color: "bg-mango", emoji: "🥭", note: "Sweet, ripe mango — Bali's favourite." },
  { name: "Dragonfruit Bright", color: "bg-dragonfruit", emoji: "🐉", note: "Electric pink and gently sweet." },
  { name: "Creamy Coconut", color: "bg-coconut", emoji: "🥥", note: "Smooth island coconut, dairy-free." },
  { name: "Passionfruit Zing", color: "bg-secondary", emoji: "🌟", note: "Tangy and tropical with real seeds." },
  { name: "Watermelon Splash", color: "bg-accent", emoji: "🍉", note: "Light, juicy and super refreshing." },
];

function Flavours() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">Our Flavours</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A colourful line-up of real-fruit sorbet pops. Names, recipes and
          availability are placeholders pending confirmation from the Fruti Pop team.
        </p>
      </div>

      <img
        src={flavoursGrid}
        alt="Placeholder flat lay of assorted fruit popsicles (replace with real Fruti Pop flavour photography)"
        width={1280}
        height={960}
        loading="lazy"
        className="mt-8 w-full rounded-3xl shadow-lg"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Placeholder photo — replace with genuine Fruti Pop flavour images.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLAVOURS.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className={`flex h-24 items-center justify-center text-4xl ${f.color}`}>
              <span aria-hidden>{f.emoji}</span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{f.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
              <span className="mt-3 inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                Name pending confirmation
              </span>
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
