import { createFileRoute, Link } from "@tanstack/react-router";

import baliStall from "@/assets/bali-stall.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Fruti Pop Bali" },
      {
        name: "description",
        content:
          "The story behind Fruti Pop Bali: real tropical fruit sorbet pops made on the island. (Draft — details pending verification.)",
      },
      { property: "og:title", content: "About Us — Fruti Pop Bali" },
      {
        property: "og:description",
        content: "The story behind Fruti Pop Bali's real-fruit sorbet pops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const VALUES = [
  { emoji: "🍍", title: "Fruit first", text: "Simple recipes built around ripe tropical fruit." },
  { emoji: "🌊", title: "Island made", text: "Produced in Bali, inspired by its markets and beaches." },
  { emoji: "💛", title: "Joy for everyone", text: "Dairy-free, vegan-friendly pops the whole family can enjoy." },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">About Fruti Pop</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fruti Pop is a Bali fruit sorbet pop brand with one simple idea: take the
          island's best fruit, freeze it with love, and hand it over with a smile.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-muted-foreground/40 bg-muted p-4 text-sm text-muted-foreground">
        <strong>Draft note:</strong> Our founding story, team names, dates and
        certifications are intentionally left out until the Fruti Pop team
        provides verified details. No invented people or claims are presented
        here.
      </div>

      <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
        <img
          src={baliStall}
          alt="Placeholder image of a tropical Bali stall (replace with real Fruti Pop photo)"
          width={1280}
          height={960}
          loading="lazy"
          className="w-full rounded-3xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">What we stand for</h2>
          <div className="mt-4 space-y-4">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-3 rounded-2xl border bg-card p-4 shadow-sm">
                <span className="text-2xl" aria-hidden>{v.emoji}</span>
                <div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Placeholder photo — replace with a genuine Fruti Pop team or kitchen image.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-3xl bg-palm p-8 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold">Want to stock or taste Fruti Pop?</h2>
        <p className="mt-2 opacity-90">We'd love to hear from you.</p>
        <Link
          to="/contact"
          className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-105"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
