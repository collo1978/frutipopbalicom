import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FlavourCard, PackSpotlight, WhatsAppButton, btn } from "@/components/site";
import { FLAVOURS } from "@/lib/flavours";
import { COMMUNITY_NAMES } from "@/lib/occasions";
import { P } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fruti Pop Bali — Little pops. Big smiles." },
      { name: "description", content: "Fruity sorbet pops for kids and grown-ups in Bali. Family packs, birthday parties, schools, events and villa pool days." },
      { property: "og:title", content: "Fruti Pop Bali — Little pops. Big smiles." },
      { property: "og:description", content: "Fruity sorbet pops for kids and grown-ups in Bali." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SLIDES = [P.heroCoolerGroup, P.footballKidsKiosk, P.beachGroup];

function Hero() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);
  return (
    <section className="bg-secondary/70" aria-roledescription="carousel" aria-label="Fruti Pop moments">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1fr_1.05fr] md:py-16">
        <div className="order-2 md:order-1">
          <h1 className="text-5xl font-bold leading-[1.05] text-accent md:text-7xl">
            Little pops.<br /><span className="text-primary">Big smiles.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-foreground/80">
            Fruity sorbet pops for kids and grown-ups in Bali — for hot afternoons, pool days and every little celebration.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/flavours" className={btn.grape}>Explore the Pops</Link>
            <Link to="/packs" className={btn.outline}>Order Now</Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
            {SLIDES.map((s, n) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                loading={n === 0 ? "eager" : "lazy"}
                aria-hidden={n !== i}
                className={`aspect-[4/5] w-full object-cover transition-opacity duration-500 max-md:aspect-[4/3] ${n === i ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <button onClick={() => go(i - 1)} aria-label="Previous photo" className="h-10 w-10 rounded-full border-2 border-accent font-bold text-accent">‹</button>
            {SLIDES.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`h-3 rounded-full transition-all ${n === i ? "w-8 bg-accent" : "w-3 bg-accent/30"}`} />
            ))}
            <button onClick={() => go(i + 1)} aria-label="Next photo" className="h-10 w-10 rounded-full border-2 border-accent font-bold text-accent">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const MOMENTS = [
  { t: "Hot afternoon at home", d: "A freezer stocked for when the kids get home.", p: P.heroCoolerPair, to: "/packs" as const },
  { t: "Birthday party treats", d: "The cooler opens — the squeals begin.", p: P.heroCoolerGroup, to: "/occasions/birthday-parties" as const },
  { t: "After football", d: "Final whistle, fruity reward.", p: P.footballBoy, to: "/occasions/schools-sports-clubs" as const },
  { t: "School & community events", d: "A little joy for a big crowd.", p: P.mnm[0]!, to: "/occasions/events" as const },
  { t: "Villa pool days", d: "A cooler of pops, right to your door.", p: P.villaDelivery, to: "/occasions/villas-poolside" as const },
];

function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-accent md:text-4xl">What's your pop moment?</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {MOMENTS.map((m) => (
            <li key={m.t}>
              <Link to={m.to} className="group block h-full overflow-hidden rounded-3xl border bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
                <img src={m.p.src} alt={m.p.alt} loading="lazy" className="aspect-square w-full object-cover transition group-hover:scale-[1.03]" />
                <div className="p-4">
                  <h3 className="font-bold leading-tight">{m.t}</h3>
                  <p className="mt-1 text-sm text-foreground/75">{m.d}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-accent md:text-4xl">Six fruity favourites</h2>
            <Link to="/flavours" className="font-bold text-primary underline underline-offset-4">See all flavours</Link>
          </div>
          <p className="mt-4 inline-flex items-center rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm">
            Made with an average of 65% fruit and less added sugar than regular ice pops.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {FLAVOURS.map((f) => <FlavourCard key={f.name} f={f} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16"><PackSpotlight /></section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 md:grid-cols-2">
        <img src={P.farm.src} alt={P.farm.alt} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">The Fruti Pop Story</p>
          <h2 className="mt-2 text-3xl font-bold text-accent md:text-4xl">It started with a taste of frozen fruit.</h2>
          <p className="mt-4 text-foreground/80">
            Paul was making frozen fruit purée for Bali's bars and hotels when one sample sparked an idea: a fruity pop
            for kids and grown-ups. Now it's all about the smiles.
          </p>
          <Link to="/our-story" className={`${btn.outline} mt-6`}>Read our story</Link>
        </div>
      </section>

      <section className="bg-accent py-16 text-accent-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Real moments around Bali</h2>
          <p className="mt-2 max-w-xl opacity-90">From the Montessori Night Market to the football pitch.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[P.mnm[1]!, P.footballPair, P.mnm[3]!, P.beachCouple].map((p) => (
              <li key={p.src}><img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" /></li>
            ))}
          </ul>
          <p className="mt-8 text-sm opacity-90">
            Enjoyed by school and club communities including {COMMUNITY_NAMES.slice(0, -1).join(", ")} and {COMMUNITY_NAMES.at(-1)}.
          </p>
          <Link to="/occasions" className={`${btn.primary} mt-6`}>Plan your occasion</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-accent md:text-4xl">Want some pops?</h2>
        <p className="mx-auto mt-3 max-w-md text-foreground/80">Ask where to find us, order a pack or tell us about your event.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton>Order on WhatsApp</WhatsAppButton>
          <Link to="/where-to-find-us" className={btn.outline}>Where to find us</Link>
        </div>
      </section>
    </>
  );
}
