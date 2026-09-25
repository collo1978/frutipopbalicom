import { createFileRoute, Link } from "@tanstack/react-router";
import heroDesktop from "@/assets/hero-desktop-v3.png.asset.json";
import heroMobile from "@/assets/hero-mobile-final.png.asset.json";
import birthdayParty from "@/assets/birthday-pool-party.png.asset.json";
import eventBoy from "@/assets/event-boy-two-pops.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { FlavourCarousel, SwipeRow, WhyFrutiPop } from "@/components/order-sections";
import { WhatsAppButton } from "@/components/site";
import { COMMUNITY_NAMES } from "@/lib/occasions";
import { P } from "@/lib/photos";
import { CONTACT } from "@/lib/site";

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

const cta = "min-h-12 rounded-full px-10 text-base font-bold shadow-md transition-transform motion-safe:hover:-translate-y-0.5 md:min-h-14 md:px-12 md:text-lg";

function Hero() {
  const alt = "Bali's Fruity Sorbet Ice Blocks. Six refreshing flavours. A little pop of happiness. Less sugar than regular ice blocks, full of vitamins, packed with fruit.";
  return (
    <section className="bg-hero-cream">
      <div className="mx-auto px-3 pb-6 pt-1 md:px-4 md:pb-5 md:pt-2">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop.url} width={1918} height={820} />
          <img src={heroMobile.url} alt={alt} width={1024} height={1536} className="mx-auto h-auto w-full max-w-[min(28rem,calc((100svh-150px)*0.667))] md:w-[min(94vw,calc((100svh-160px)*2.34))] md:max-w-none" />
        </picture>
        <div className="mt-2 flex justify-center md:mt-1">
          <Button asChild size="lg" className={cta}><Link to="/order">Order My Pops →</Link></Button>
        </div>
      </div>
    </section>
  );
}

const MOMENTS = [
  { t: "Birthday Parties", h: "The moment the cooler opens.", d: "Nothing gets a squeal quite like a cooler full of bright, fruity pops on a hot Bali afternoon.", p: { src: birthdayParty.url, alt: "Excited children around a cooler full of Fruti Pops at a poolside party" }, pos: "object-[50%_58%]" },
  { t: "Schools & Sports Clubs", h: "The final whistle. The first pop.", d: "After all the running and cheering, a cold, fruity reward. Big smiles for the whole team.", p: P.footballPair, pos: "object-top" },
  { t: "Events", h: "A little pop. A lot of happy faces.", d: "From community gatherings to big celebrations, a burst of fruity fun that gets everyone smiling.", p: { src: eventBoy.url, alt: "A smiling boy holding two Fruti Pops at an event" }, pos: "object-center" },
  { t: "Villas & Poolside", h: "Sun's out. Pops out.", d: "Poolside laughs, sunny afternoons and a freezer full of fruity pops.", p: P.villaDelivery, pos: "object-center" },
];

function PackCard({ name, qty, price, pack, badge }: { name: string; qty: string; price: string; pack: "family" | "jumbo"; badge?: string }) {
  return (
    <article className="relative flex flex-col items-center rounded-3xl border bg-card p-6 pt-8 text-center shadow-sm">
      {badge && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-dragonfruit px-5 py-1.5 font-display text-base font-bold text-accent-foreground shadow-md md:text-lg">{badge}</span>
      )}
      <p className="font-bold text-primary">{name}</p>
      <h3 className="mt-1 text-4xl font-bold text-accent">{qty}</h3>
      <p className="mt-2 text-2xl font-bold">{price}</p>
      <p className="mt-2 text-foreground/75">Mix & match your favourite flavours.</p>
      <Button asChild size="lg" className={`mt-5 ${cta}`}><Link to="/order" search={{ pack }}>Fill My Freezer →</Link></Button>
    </article>
  );
}

function Home() {
  const toPacks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("packs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <Hero />

      <section id="flavours" className="scroll-mt-20 bg-hero-cream py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold text-accent md:text-4xl">Our Flavours</h2>
          <p className="mt-2 text-foreground/80">Six fruity favourites. Which ones take your fancy?</p>
          <div className="mt-6 text-left"><FlavourCarousel /></div>
          <Button asChild size="lg" className={`mt-6 ${cta}`}><a href="#packs" onClick={toPacks}>Order My Flavours →</a></Button>
        </div>
      </section>

      <section id="packs" className="scroll-mt-20 bg-secondary/55 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold text-accent md:text-4xl">Packs</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-5">
            <PackCard name="Family Pack" qty="10 Pops" price="Rp250,000" pack="family" />
            <PackCard name="Jumbo Pack" qty="20 Pops" price="Rp485,000" pack="jumbo" badge="Save Rp15,000!" />
          </div>
        </div>
      </section>

      <WhyFrutiPop showCta showTestimonial />

      <section id="pop-moments" className="scroll-mt-20 bg-hero-cream py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-accent md:text-4xl">What's Your Pop Moment?</h2>
            <p className="mt-2 text-foreground/80">From sunny afternoons to special celebrations, there's always a reason to pop!</p>
          </div>
          <div className="mt-6">
            <SwipeRow count={MOMENTS.length} label="Pop moments" desktopClass="md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {MOMENTS.map((m) => (
                <article key={m.t} className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
                  <img src={m.p.src} alt={m.p.alt} loading="lazy" className={`aspect-[4/3.4] w-full object-cover ${m.pos}`} />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-sm font-bold text-primary">{m.t}</p>
                    <h3 className="mt-1 text-lg font-bold leading-tight text-accent">{m.h}</h3>
                    <p className="mt-1 flex-1 text-sm text-foreground/75">{m.d}</p>
                    <Link to="/order" className="mt-3 text-sm font-bold text-primary hover:underline">Order pops →</Link>
                  </div>
                </article>
              ))}
            </SwipeRow>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">Enjoyed by school and club communities including {COMMUNITY_NAMES.slice(0, -1).join(", ")} and {COMMUNITY_NAMES.at(-1)}.</p>
        </div>
      </section>

      <section id="where-to-find-us" className="scroll-mt-20 bg-background py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold text-accent md:text-4xl">Where to Find Us</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-3xl bg-pastel-green p-6">
              <h3 className="text-xl font-bold text-accent">Where can I buy one?</h3>
              <p className="mt-2 flex-1 text-foreground/80">Where Fruti Pop is sold changes as we pop up around Bali, so the quickest way to find one is to ask us.</p>
              <div className="mt-4"><WhatsAppButton message="Hi Fruti Pop! Where can I buy Fruti Pops near me? I'm in:">Ask on WhatsApp</WhatsAppButton></div>
            </div>
            <div className="rounded-3xl bg-pastel-lavender p-6">
              <h3 className="text-xl font-bold text-accent">Business contact</h3>
              <address className="mt-2 not-italic text-foreground/85">{CONTACT.address}</address>
              <p className="mt-2 text-sm text-muted-foreground">This is our business address, not a walk-in shop, so please message us before visiting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent py-12 text-accent-foreground md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to Fill Your Freezer?</h2>
          <p className="mt-2 opacity-90">Six refreshing flavours. Pick your favourites and keep the good times popping!</p>
          <Button asChild size="lg" className={`mt-6 ${cta}`}><Link to="/order">Fill My Freezer →</Link></Button>
        </div>
      </section>
    </>
  );
}
