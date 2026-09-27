import { createFileRoute, Link } from "@tanstack/react-router";
import heroDesktop from "@/assets/hero-desktop-wide-september.png.asset.json";
import heroMobile from "@/assets/hero-mobile-oct.png.asset.json";
import popStarsDesktop from "@/assets/pop-stars-desktop.png.asset.json";
import popStarsMobile from "@/assets/pop-stars-mobile.png.asset.json";
import birthdayParty from "@/assets/birthday-pool-party.png.asset.json";
import eventBoy from "@/assets/event-boy-two-pops.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { FlavourDiscovery, SwipeRow, WhyFrutiPop } from "@/components/order-sections";
import { WhatsAppIcon } from "@/components/site";
import { COMMUNITY_NAMES } from "@/lib/occasions";
import { P } from "@/lib/photos";
import { waLink } from "@/lib/site";

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

const cta = "cta-pop rounded-full shadow-md";
const A = () => <span className="cta-arrow" aria-hidden="true">→</span>;

function Hero() {
  const alt = "Bali's Fruity Sorbet Ice Blocks. Refreshing flavours and a little pop of happiness.";
  return (
    <section className="overflow-x-clip bg-hero-cream">
      <div className="flex flex-col items-center px-2 pb-3 pt-2 md:px-4 md:pb-4 md:pt-1">
        <picture className="flex w-full items-center justify-center">
          <source media="(min-width: 768px)" srcSet={heroDesktop.url} width={1672} height={941} />
          <img src={heroMobile.url} alt={alt} width={1024} height={1536} className="mx-auto h-auto max-h-[calc(100svh-12rem)] w-auto max-w-full object-contain md:h-[calc(100svh-9rem)] md:max-h-[58rem] md:w-full md:max-w-[1672px]" />
        </picture>
        <div className="-mt-5 flex w-full flex-col items-center gap-2.5 md:mt-0 md:gap-3">
          <Button asChild size="lg" className={`${cta} w-[calc(100%-1rem)] max-w-md md:w-auto md:px-12 md:text-lg`}>
            <Link to="/order">Order My Pops <A /></Link>
          </Button>
          <p className="text-center text-xs font-semibold text-foreground/65 sm:text-sm">Less Sugar • Full of Vitamins • Packed with Fruit</p>
        </div>
      </div>
    </section>
  );
}

const MOMENTS = [
  { t: "Birthday Parties", h: "The moment the cooler opens.", d: "Nothing gets a squeal quite like a cooler full of bright, fruity pops on a hot Bali afternoon.", cta: "Order Birthday Pops", p: { src: birthdayParty.url, alt: "Excited children around a cooler full of Fruti Pops at a poolside party" }, pos: "object-[50%_58%]" },
  { t: "Schools & Sports Clubs", h: "The final whistle. The first pop.", d: "After all the running and cheering, a cold, fruity reward. Big smiles for the whole team.", cta: "Pop the Whole Team", p: P.footballPair, pos: "object-top" },
  { t: "Events", h: "A little pop. A lot of happy faces.", d: "From community gatherings to big celebrations, a burst of fruity fun that gets everyone smiling.", cta: "Make My Event Pop", p: { src: eventBoy.url, alt: "A smiling boy holding two Fruti Pops at an event" }, pos: "object-center" },
  { t: "Villas & Poolside", h: "Sun's out. Pops out.", d: "Poolside laughs, sunny afternoons and a freezer full of fruity pops.", cta: "Fill My Freezer", p: P.villaDelivery, pos: "object-center" },
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
      <Button asChild size="lg" className={`mt-5 ${cta}`}><Link to="/order" search={{ pack }}>Fill My Freezer <A /></Link></Button>
    </article>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <section id="flavours" className="scroll-mt-20 bg-hero-cream py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="fruti-section-heading">Our Flavours</h2>
          <p className="mt-2 text-lg font-semibold text-foreground/80 md:text-2xl">Six fruity favourites. Which one takes your fancy?</p>
          <div className="mt-3 text-left md:mt-10"><FlavourDiscovery /></div>
          <Button asChild size="lg" className={`mt-6 ${cta}`}><Link to="/order">Order My Flavours <A /></Link></Button>
        </div>
      </section>

      <section id="packs" className="scroll-mt-20 bg-secondary/55 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="fruti-section-heading text-center">Packs</h2>
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
            <h2 className="fruti-section-heading">Make Your Special Moments POP!</h2>
            <p className="mt-2 text-foreground/80">From sunny afternoons to special celebrations, there's always a reason to pop!</p>
          </div>
          <div className="mt-6">
            <SwipeRow count={MOMENTS.length} label="Pop moments" desktopClass="md:grid md:grid-cols-2 md:gap-5 md:pt-0 lg:grid-cols-4">
              {MOMENTS.map((m) => (
                <article key={m.t} className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
                  <img src={m.p.src} alt={m.p.alt} loading="lazy" className={`aspect-[4/3.4] w-full object-cover ${m.pos}`} />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-sm font-bold text-primary">{m.t}</p>
                    <h3 className="mt-1 text-lg font-bold leading-tight text-accent">{m.h}</h3>
                    <p className="mt-1 flex-1 text-sm text-foreground/75">{m.d}</p>
                    <Button asChild className="cta-pop cta-pop-sm mt-4 w-full rounded-full bg-primary text-primary-foreground">
                      <Link to="/order">{m.cta} <A /></Link>
                    </Button>
                  </div>
                </article>
              ))}
            </SwipeRow>
          </div>
        </div>
      </section>

      <section id="pop-stars" className="scroll-mt-20 bg-hero-cream pb-10 pt-2 md:pb-12 md:pt-3">
        <div className="mx-auto max-w-7xl px-4">
          <picture>
            <source media="(min-width: 768px)" srcSet={popStarsDesktop.url} width={1774} height={887} />
            <img src={popStarsMobile.url} alt={`Our POP Stars. Schools, clubs and communities sharing fruity fun across Bali, including ${COMMUNITY_NAMES.join(", ")}.`} loading="lazy" width={1024} height={1536} className="mx-auto h-auto w-full max-w-4xl" />
          </picture>
          <div className="mt-4 flex justify-center md:mt-5">
            <Button asChild size="lg" className="cta-pop rounded-full bg-accent px-6 text-accent-foreground shadow-md">
              <a href={waLink("Hi! I'd love to know more about Fruti Pop 😊")} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Chat With Us on WhatsApp <A />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
