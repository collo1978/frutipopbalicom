import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FlavourCard, PackSpotlight, WhatsAppButton, btn } from "@/components/site";
import { FLAVOURS } from "@/lib/flavours";
import { COMMUNITY_NAMES } from "@/lib/occasions";
import { P } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fruti Pop Bali | Little pops. Big smiles." },
      { name: "description", content: "Fruity sorbet pops for kids and grown-ups in Bali. Family packs, birthday parties, schools, events and villa pool days." },
      { property: "og:title", content: "Fruti Pop Bali | Little pops. Big smiles." },
      { property: "og:description", content: "Fruity sorbet pops for kids and grown-ups in Bali." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SLIDES = [
  { photo: P.heroCoolerGroup, fit: "object-cover object-center" },
  { photo: P.footballKidsKiosk, fit: "object-cover object-center" },
  { photo: P.beachCouple, fit: "object-cover object-center" },
];

function Hero() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);
  return (
    <section className="bg-secondary/70" aria-roledescription="carousel" aria-label="Fruti Pop moments">
      <div className="mx-auto grid max-w-6xl items-center gap-5 px-4 py-6 md:h-[calc(100svh-4.0625rem)] md:min-h-[26rem] md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:py-5">
        <div className="min-w-0">
          <h1 className="text-5xl font-bold leading-[1.02] text-accent md:text-6xl lg:text-7xl">
            Little pops.<br /><span className="text-primary">Big smiles.</span>
          </h1>
          <p className="mt-3 max-w-md text-base text-foreground/80 md:text-lg">
            Fruity sorbet pops for kids and grown-ups in Bali. Perfect for hot afternoons, pool days and every little celebration.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/flavours" className={btn.grape}>Explore the Pops</Link>
            <Link to="/packs" className={btn.outline}>Order Now</Link>
          </div>
        </div>
        <div className="min-w-0">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[17rem] overflow-hidden rounded-3xl bg-primary/10 shadow-xl sm:max-w-xs md:h-[min(60vh,30rem)] md:w-[calc(min(60vh,30rem)*0.75)] md:max-w-none">
            {SLIDES.map(({ photo, fit }, n) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading={n === 0 ? "eager" : "lazy"}
                aria-hidden={n !== i}
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${fit} ${n === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button onClick={() => go(i - 1)} aria-label="Previous photo" className="h-9 w-9 rounded-full border-2 border-accent font-bold text-accent">‹</button>
            {SLIDES.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`h-3 rounded-full transition-all ${n === i ? "w-8 bg-accent" : "w-3 bg-accent/30"}`} />
            ))}
            <button onClick={() => go(i + 1)} aria-label="Next photo" className="h-9 w-9 rounded-full border-2 border-accent font-bold text-accent">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const MOMENTS = [
  { t: "Hot afternoon cool-down", d: "A cold pop when the Bali sun is high.", p: P.eventStrawHat, to: "/packs" as const },
  { t: "Birthday party treats", d: "A colourful treat for the celebration.", p: P.kioskGirl, to: "/occasions/birthday-parties" as const },
  { t: "After football", d: "Final whistle, fruity reward.", p: P.footballPair, to: "/occasions/schools-sports-clubs" as const },
  { t: "School & community events", d: "A little joy for a big crowd.", p: P.mnm[0]!, to: "/occasions/events" as const },
  { t: "Villa pool days", d: "A cooler of pops, right to your door.", p: P.villaDelivery, to: "/occasions/villas-poolside" as const },
];

function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <h2 className="text-3xl font-bold text-accent md:text-4xl">What's your pop moment?</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {MOMENTS.map((m) => (
            <li key={m.t}>
              <Link to={m.to} className="group block h-full overflow-hidden rounded-3xl border bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
                <img src={m.p.src} alt={m.p.alt} loading="lazy" className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                <div className="p-4">
                  <h3 className="font-bold leading-tight">{m.t}</h3>
                  <p className="mt-1 text-sm text-foreground/75">{m.d}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-muted py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
            <h2 className="text-3xl font-bold text-accent md:text-4xl">Six fruity favourites</h2>
            <div className="relative isolate overflow-hidden rounded-3xl bg-accent px-5 py-4 text-accent-foreground shadow-lg md:px-7">
              <span aria-hidden="true" className="absolute -right-5 -top-7 -z-10 h-24 w-24 rounded-full bg-mango" />
              <span aria-hidden="true" className="absolute bottom-2 right-14 -z-10 h-8 w-8 rounded-full bg-dragonfruit" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <strong className="shrink-0 font-display text-4xl font-bold leading-none text-mango sm:text-5xl">65% FRUIT</strong>
                <p className="max-w-xs text-sm font-bold leading-snug sm:text-base">Less added sugar than regular ice pops.</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {FLAVOURS.map((f) => <FlavourCard key={f.name} f={f} />)}
          </div>
        </div>
      </section>

      <section className="bg-primary/10 py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4"><PackSpotlight photo={P.heroCoolerPair} /></div>
      </section>

      <section className="bg-secondary/45 py-12 md:py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 md:grid-cols-2">
          <img src={P.farm.src} alt={P.farm.alt} loading="lazy" className="aspect-[16/10] w-full rounded-3xl object-cover" />
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">The Fruti Pop Story</p>
            <h2 className="mt-2 text-3xl font-bold text-accent md:text-4xl">One frozen fruit sample sparked a much bigger smile.</h2>
            <p className="mt-3 text-foreground/80">
              Paul was making frozen fruit purée for Bali's bars and hotels when he saw the possibility of a fruity frozen pop for kids and grown-ups.
            </p>
            <Link to="/our-story" className={`${btn.outline} mt-5`}>Read our story</Link>
          </div>
        </div>
      </section>

      <section className="bg-accent py-12 text-accent-foreground md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Real moments around Bali</h2>
          <p className="mt-2 max-w-xl opacity-90">Every photo holds a real moment, from a school market to the football pitch and the beach.</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { p: P.mnm[1]!, caption: "First bite at the Montessori Night Market" },
              { p: P.footballPair, caption: "Cooling down after football" },
              { p: P.mnm[3]!, caption: "Choosing a favourite at the market" },
              { p: P.beachGroup, caption: "A cool treat by the Bali beach" },
            ].map(({ p, caption }) => (
              <li key={p.src}>
                <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
                <p className="mt-2 text-sm font-semibold leading-snug">{caption}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm opacity-90">
            Enjoyed by school and club communities including {COMMUNITY_NAMES.slice(0, -1).join(", ")} and {COMMUNITY_NAMES.at(-1)}.
          </p>
          <Link to="/occasions" className={`${btn.primary} mt-5`}>Plan your occasion</Link>
        </div>
      </section>

      <section className="bg-mango/25 py-12 text-center md:py-14">
        <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-accent md:text-4xl">Want some pops?</h2>
        <p className="mx-auto mt-3 max-w-md text-foreground/80">Ask where to find us, order a pack or tell us about your event.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton>Order on WhatsApp</WhatsAppButton>
          <Link to="/where-to-find-us" className={btn.outline}>Where to find us</Link>
        </div>
        </div>
      </section>
    </>
  );
}
