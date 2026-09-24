import { createFileRoute, Link } from "@tanstack/react-router";

import heroPops from "@/assets/hero-pops.jpg";
import baliStall from "@/assets/bali-stall.jpg";
import { FLAVOURS } from "@/lib/flavours";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fruti Pop Bali — Tropical Fruit Sorbet Pops" },
      {
        name: "description",
        content:
          "Bright, real-fruit sorbet pops handmade in Bali. Discover Fruti Pop flavours, find where to buy, and taste the island.",
      },
      { property: "og:title", content: "Fruti Pop Bali — Tropical Fruit Sorbet Pops" },
      {
        property: "og:description",
        content: "Bright, real-fruit sorbet pops handmade in Bali. Taste the island.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const HIGHLIGHTS = [
  {
    emoji: "🥭",
    title: "Real fruit, nothing fake",
    text: "Every pop starts with ripe tropical fruit — no artificial colours or flavour syrups.",
  },
  {
    emoji: "🌴",
    title: "Made in Bali",
    text: "Crafted on the island in small batches, inspired by Bali's markets and beaches.",
  },
  {
    emoji: "😊",
    title: "Family friendly",
    text: "Naturally dairy-free and vegan, so everyone at the table can grab a pop.",
  },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            Made with real tropical fruit
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Sunshine you can taste, <span className="text-primary">one pop at a time.</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Fruti Pop turns Bali's freshest mangoes, dragonfruit and coconuts into
            joyful sorbet pops — bright, refreshing and made for sharing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/flavours"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-105"
            >
              Explore Flavours
            </Link>
            <Link
              to="/where-to-buy"
              className="rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Where to Buy
            </Link>
          </div>
          <p className="mt-6 rounded-xl border border-dashed border-muted-foreground/40 bg-muted px-3 py-2 text-xs text-muted-foreground">
            Placeholder photo — replace with genuine Fruti Pop product photography.
          </p>
        </div>
        <div className="relative">
          <img
            src={heroPops}
            alt="Placeholder image of colourful tropical fruit pops (replace with real Fruti Pop photo)"
            width={1280}
            height={960}
            className="w-full rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-coconut py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Why everyone loves a Fruti Pop</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <span className="text-3xl" aria-hidden>{h.emoji}</span>
                <h3 className="mt-3 text-lg font-semibold">{h.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavour teaser */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div className="grid grid-cols-4 items-end gap-2 rounded-3xl bg-coconut p-4 shadow-lg">
          {FLAVOURS.map((f) => (
            <img key={f.name} src={f.img} alt={`Fruti Pop ${f.name}`} loading="lazy" className="h-56 w-full object-contain md:h-72" />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Four fruity favourites</h2>
          <p className="mt-3 text-muted-foreground">
            Strawberry, Soursop, Pineapple and Pina Colada — there's a pop for every mood.
          </p>
          <Link
            to="/flavours"
            className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-md transition-transform hover:scale-105"
          >
            See All Flavours
          </Link>
        </div>
      </section>

      {/* Story teaser */}
      <section className="bg-secondary/60 py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold md:text-3xl">Born on the island of smiles</h2>
            <p className="mt-3 text-muted-foreground">
              Fruti Pop is a Bali original. Our full story — founders, dates and
              milestones — will be added once verified by the team.
            </p>
            <Link
              to="/about"
              className="mt-5 inline-block rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Read Our Story
            </Link>
          </div>
          <img
            src={baliStall}
            alt="Placeholder image of a tropical Bali stall (replace with real Fruti Pop location photo)"
            width={1280}
            height={960}
            loading="lazy"
            className="order-1 w-full rounded-3xl shadow-lg md:order-2"
          />
        </div>
      </section>
    </div>
  );
}
