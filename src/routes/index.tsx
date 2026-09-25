import { createFileRoute, Link } from "@tanstack/react-router";
import heroDesktop from "@/assets/hero-desktop-final.png.asset.json";
import heroMobile from "@/assets/hero-mobile-final.png.asset.json";
import { Button } from "@/components/ui/button";
import { ProductLineup, WhyFrutiPop } from "@/components/order-sections";
import { COMMUNITY_NAMES } from "@/lib/occasions";
import { P } from "@/lib/photos";
import { btn } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fruti Pop Bali | Little pops. Big smiles." },
      { name: "description", content: "Fruit-packed sorbet pops for kids & grown-ups. Order mixed Family and Jumbo Packs for delivery in Bali." },
      { property: "og:title", content: "Fruti Pop Bali | Little pops. Big smiles." },
      { property: "og:description", content: "Fruit-packed sorbet pops for kids & grown-ups." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Hero() {
  const alt = "Fruti Pop. Bali's Fruity Sorbet Ice Blocks. Real fruit. Refreshing flavours. Less sugar than regular ice blocks, full of vitamins, locally sourced fruit.";
  return (
    <section className="bg-hero-cream">
      <div className="mx-auto max-w-none px-3 pb-6 pt-1 md:px-4 md:pb-4 md:pt-1">
        <div className="md:mx-auto md:w-fit">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop.url} width={1933} height={718} />
          <img src={heroMobile.url} alt={alt} width={1024} height={1536} className="mx-auto h-auto w-full max-w-[min(28rem,calc((100svh-150px)*0.667))] md:w-[min(94vw,calc((100svh-150px)*2.69))] md:max-w-none" />
        </picture>
        <div className="mt-2 flex justify-center md:mt-1 md:w-[44%]">
          <Button asChild size="lg" className="min-h-12 rounded-full px-8 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5 md:min-h-14 md:px-9 md:text-lg"><Link to="/order">Order Now →</Link></Button>
        </div>
        </div>
      </div>
    </section>
  );
}

const MOMENTS = [
  { t: "Hot afternoon cool-down", d: "A cold pop when the Bali sun is high.", p: P.eventStrawHat, hash: "villas-poolside" },
  { t: "Birthday party treats", d: "A colourful treat for the celebration.", p: P.kioskGirl, hash: "birthday-parties" },
  { t: "After football", d: "Final whistle, fruity reward.", p: P.footballPair, hash: "schools-sports-clubs" },
  { t: "School & community events", d: "A little joy for a big crowd.", p: P.mnm[0]!, hash: "events" },
  { t: "Villa pool days", d: "A cooler of pops, right to your door.", p: P.villaDelivery, hash: "villas-poolside" },
];

function Home() {
  return (
    <>
      <Hero />

      <section className="bg-muted py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-accent md:text-4xl">Our Flavours</h2>
          <p className="mt-2 text-foreground/80">Six fruity favourites. Which ones take your fancy?</p>
          <div className="mt-6"><ProductLineup /></div>
          <Button asChild size="lg" className="mt-6 min-h-12 rounded-full px-8 font-bold"><Link to="/order">Order Now →</Link></Button>
        </div>
      </section>

      <section className="bg-secondary/55 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold text-accent md:text-4xl">Choose Your Pack</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <p className="font-bold text-primary">Family Pack</p><h3 className="mt-1 text-3xl font-bold text-accent">10 Pops</h3><p className="mt-2 text-2xl font-bold">Rp250,000</p><p className="mt-2 text-foreground/75">Mix & match your favourite flavours.</p>
              <Button asChild size="lg" className="mt-5 min-h-12 rounded-full px-8 font-bold"><Link to="/order" search={{ pack: "family" }}>Order Now →</Link></Button>
            </article>
            <article className="relative rounded-2xl border bg-card p-6 text-center shadow-sm">
              <span className="absolute right-3 top-3 rounded-md bg-mango px-2 py-1 text-xs font-bold text-accent">Save Rp15,000!</span>
              <p className="font-bold text-primary">Jumbo Pack</p><h3 className="mt-1 text-3xl font-bold text-accent">20 Pops</h3><p className="mt-2 text-2xl font-bold">Rp485,000</p><p className="mt-2 text-foreground/75">Mix & match your favourite flavours.</p>
              <Button asChild size="lg" className="mt-5 min-h-12 rounded-full px-8 font-bold"><Link to="/order" search={{ pack: "jumbo" }}>Order Now →</Link></Button>
            </article>
          </div>
        </div>
      </section>

      <WhyFrutiPop showCta />

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <h2 className="text-3xl font-bold text-accent md:text-4xl">What's your pop moment?</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {MOMENTS.map((m) => (
            <li key={m.t}>
              <Link to="/occasions" hash={m.hash} className="group block h-full overflow-hidden rounded-2xl border bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
                <img src={m.p.src} alt={m.p.alt} loading="lazy" className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                <div className="p-4"><h3 className="font-bold leading-tight">{m.t}</h3><p className="mt-1 text-sm text-foreground/75">{m.d}</p></div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center"><Link to="/occasions" className={btn.primary}>Explore All Occasions →</Link></div>
        <p className="mt-6 text-center text-sm text-muted-foreground">Enjoyed by school and club communities including {COMMUNITY_NAMES.slice(0, -1).join(", ")} and {COMMUNITY_NAMES.at(-1)}.</p>
      </section>

      <section className="bg-accent py-12 text-accent-foreground md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <div><h2 className="text-3xl font-bold md:text-4xl">Ready to build your pack?</h2><p className="mt-2 opacity-90">Choose your size, mix your flavours and send your order when you are ready.</p></div>
            <Button asChild size="lg" className="min-h-12 rounded-full bg-primary px-8 font-bold text-primary-foreground"><Link to="/order">Order Now →</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
