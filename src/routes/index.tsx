import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Heart, Leaf } from "lucide-react";
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
  const promises = ["Less Sugar than regular ice blocks.", "Full of Vitamins.", "Locally Sourced Fruit."];
  return (
    <section className="bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 pb-6 pt-4 md:grid md:items-center md:gap-8 md:py-12 lg:py-16 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:py-12 lg:py-16">
        <div className="contents min-w-0 md:block">
          <h1 className="order-1 text-center text-[2.1rem] md:text-left md:text-5xl font-bold leading-[1.02] text-accent md:leading-[1.02] md:text-6xl lg:text-7xl">
            Bali's Fruity<br />Sorbet Ice Blocks.
          </h1>
          <div className="order-2 -mt-2 h-1.5 w-3/5 max-w-sm rounded-full bg-mango md:mt-2 md:h-2 md:w-4/5" />
          <p className="order-3 text-center text-base font-bold text-accent md:hidden">Real fruit. Refreshing flavours.</p>
          <p className="mt-4 hidden max-w-md text-xl font-bold text-accent md:block md:text-2xl">
            Fruit-packed sorbet pops for kids & grown-ups.
          </p>
          <ul className="order-5 grid w-full grid-cols-3 gap-2 md:mt-6">
            {promises.map((promise, index) => (
              <li key={promise} className="text-center text-[11px] font-bold leading-tight text-leaf-foreground sm:text-sm">
                <span className={`mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary/70 md:mb-2 md:h-10 md:w-10 md:border-0 ${index === 1 ? "md:bg-dragonfruit/10" : index === 2 ? "md:bg-mango/25" : "md:bg-leaf"}`}><Check className="h-5 w-5 text-primary md:h-6 md:w-6 md:text-leaf-foreground" strokeWidth={3} /></span>
                {promise}
              </li>
            ))}
          </ul>
          <div className="order-6 md:mt-6">
            <Button asChild size="lg" className="min-h-12 rounded-full px-8 text-base md:min-h-14 md:px-9 md:text-lg font-bold shadow-lg transition-transform hover:-translate-y-0.5"><Link to="/order">Order Now →</Link></Button>
          </div>
        </div>
        <div className="relative order-4 mx-auto w-full max-w-sm pb-1 pt-1 md:order-none md:max-w-2xl md:pb-5 md:pt-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-[6px] border-card bg-muted shadow-lg md:ml-auto md:aspect-[5/4] md:w-[88%] md:rotate-1 md:border-[7px] md:shadow-xl">
            <img src={P.kioskGirl.src} alt={P.kioskGirl.alt} className="h-full w-full object-cover object-center" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 md:mt-0 md:block">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border-[6px] border-card bg-muted shadow-lg md:absolute md:bottom-0 md:left-0 md:w-[47%] md:-rotate-2">
              <img src={P.heroCoolerGroup.src} alt={P.heroCoolerGroup.alt} className="h-full w-full object-cover object-center" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border-[6px] border-card bg-muted shadow-lg md:absolute md:bottom-1 md:right-0 md:w-[45%] md:rotate-2">
              <img src={P.beachGroup.src} alt={P.beachGroup.alt} className="h-full w-full object-cover object-center" />
            </div>
          </div>
          <span aria-hidden="true" className="absolute left-1 top-[34%] h-10 w-8 md:top-[30%] md:h-11 md:w-9 rotate-[-12deg] rounded-[45%] bg-dragonfruit shadow-sm"><Leaf className="absolute -top-3 left-1 h-5 w-7 fill-primary text-primary" /></span>
          <Heart aria-hidden="true" className="absolute right-1 top-[30%] h-10 w-10 md:top-[24%] md:h-12 md:w-12 rotate-12 fill-dragonfruit/10 text-dragonfruit" strokeWidth={3} />
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
