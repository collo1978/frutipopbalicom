import { createFileRoute, Link } from "@tanstack/react-router";
import heroDesktop from "@/assets/hero-desktop-extra-wide.png.asset.json";
import heroMobile from "@/assets/hero-mobile-oct.png.asset.json";
import popStarsDesktop from "@/assets/pop-stars-desktop.png.asset.json";
import popStarsMobile from "@/assets/pop-stars-mobile.png.asset.json";
import birthdayParty from "@/assets/birthday-pool-party.png.asset.json";
import eventBoy from "@/assets/event-boy-two-pops.jpg.asset.json";
import heroWoman from "@/assets/photos/customer-moments/event-woman-straw-hat.png";
import heroKids from "@/assets/photos/customer-moments/hero-kids-cooler-pair.png";
import heroFootball from "@/assets/photos/customer-moments/schools-football-boy-yellow.png";
import frutiLogo from "@/assets/fruti-pop-logo.png.asset.json";
import heroHeadline from "@/assets/balis-fruti-pop-sticker.png.asset.json";
import heroSplashLeft from "@/assets/splashes/hero-splash-left.png.asset.json";
import heroFruitSplash from "@/assets/hero-fruit-splash.png.asset.json";
import heroSplashRight from "@/assets/splashes/hero-splash-right.png.asset.json";
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
      {
        name: "description",
        content:
          "Fruit-packed sorbet pops for kids & grown-ups. Order mixed Family and Jumbo Packs for delivery in Bali.",
      },
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
const A = () => (
  <span className="cta-arrow" aria-hidden="true">
    →
  </span>
);

function Hero() {
  return (
    <section className="overflow-hidden bg-hero-cream">
      {/* 1. Added explicit desktop padding bottom to keep the CTA text inside the layout section */}
      <div className="relative mx-auto flex max-w-[1920px] flex-col items-center px-3 pt-6 pb-12 md:px-6 md:pt-12 md:pb-20">
        {/* 2. The main headline logo remains relative so it naturally defines the top layout boundary */}
        <img
          src={heroHeadline.url}
          alt="Bali's Fruti Pop Sorbet Ice Blocks — Real fruit. Real smiles."
          className="relative z-40 -mb-4 w-[330px] drop-shadow-sm md:-mb-16 md:w-[620px] md:h-auto"
        />

        {/* 3. Image Container: Clean fixed layout height avoids layout overlap or section breakage */}
        <div className="relative h-[340px] w-full max-w-[1400px] md:h-[480px] md:w-[90vw] md:max-w-[1440px]">
          {/* Desktop fruit treatment */}
          <img
            src={heroSplashLeft.url}
            alt=""
            className="pointer-events-none absolute left-[-22%] top-[-12%] z-[5] w-[55%] object-contain md:left-[-5%] md:top-[12%] md:w-[28%] md:-rotate-6"
          />
          <img
            src={heroSplashRight.url}
            alt=""
            className="pointer-events-none absolute right-[-12%] top-[-12%] z-[5] w-[55%] object-contain md:right-[-5%] md:top-[10%] md:w-[28%] md:rotate-6"
          />
          <img
            src={heroFruitSplash.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-15%] z-[4] hidden w-[66%] -translate-x-1/2 object-contain opacity-95 md:block"
          />
          <img
            src={heroSplashLeft.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-[-5%] left-[10%] z-[6] hidden w-[17%] -scale-y-100 rotate-[19deg] object-contain md:block"
          />
          <img
            src={heroSplashRight.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-[-5%] right-[10%] z-[6] hidden w-[19%] -scale-y-100 -rotate-[11deg] object-contain md:block"
          />

          {/* 4. Beautifully balanced photo card coordinates below the headline sticker */}
          <img
            src={heroKids}
            alt="Kids enjoying Fruti Pop"
            className="absolute bottom-0 left-[-3%] z-10 w-[49%] max-w-[560px] -rotate-2 rounded-[1.5rem] frame-pop-left md:bottom-[20px] md:left-[22%] md:z-20 md:h-[80%] md:rounded-[1.75rem] md:w-auto md:max-w-none md:-rotate-6"
          />

          <img
            src={heroFootball}
            alt="Young football player enjoying Fruti Pop"
            className="absolute bottom-0 left-1/2 z-30 h-[86%] w-auto -translate-x-1/2 rounded-[1.5rem] frame-pop-center md:bottom-[0px] md:z-30 md:h-[85%] md:rounded-[1.75rem]"
          />

          <img
            src={heroWoman}
            alt="Enjoying Fruti Pop"
            className="absolute bottom-0 right-[-3%] z-20 w-[49%] max-w-[560px] rotate-2 rounded-[1.5rem] frame-pop-right md:bottom-[30px] md:right-[22%] md:z-20 md:h-[80%] md:rounded-[1.75rem] md:w-auto md:max-w-none md:rotate-6"
          />
        </div>

        {/* 5. Safe layout container pushes the CTA and benefits items below the cards */}
        <div className="relative z-50 mt-8 flex w-full flex-col items-center gap-3">
          <Button
            asChild
            size="lg"
            className={`${cta} w-[calc(100%-1rem)] max-w-md md:w-auto md:min-w-[17rem] md:px-14 md:text-lg`}
          >
            <Link to="/order">
              Order My Pops <A />
            </Link>
          </Button>

          <p className="text-center text-xs font-semibold text-foreground/65 sm:text-sm">
            Less Sugar • Full of Vitamins • Packed with Fruit
          </p>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <section id="flavours" className="overflow-x-clip scroll-mt-20 bg-hero-cream pb-5 pt-10 md:py-14">
        <div className="mx-auto max-w-7xl px-2 text-center md:px-4">
          <h2 className="fruti-flavours-heading flex justify-center overflow-hidden">
            <span className="inline-block shrink-0 origin-center scale-x-[0.82] whitespace-nowrap min-[360px]:scale-x-90 md:scale-x-100">
              Flavours That Make You{" "}
              <span className="font-black text-dragonfruit text-[1.12em] leading-none">POP!</span>
            </span>
          </h2>
          <div className="mt-3 text-left md:mt-8">
            <FlavourDiscovery
              desktopEndcap={
                <Button
                  asChild
                  size="lg"
                  className={`${cta} w-full !whitespace-nowrap px-3 text-base lg:px-5 lg:text-lg`}
                >
                  <Link to="/order">
                    Order My Flavours <A />
                  </Link>
                </Button>
              }
            />
          </div>
          <Button asChild size="lg" className={`mt-3 ${cta} md:hidden`}>
            <Link to="/order">
              Order My Flavours <A />
            </Link>
          </Button>
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
            <h2 className="fruti-section-heading">
              Make Your Special Moments <span className="text-dragonfruit">POP!</span>
            </h2>
            <p className="mt-2 text-foreground/80">
              From sunny afternoons to special celebrations, there's always a reason to pop!
            </p>
          </div>
          <div className="mt-6">
            <SwipeRow
              count={MOMENTS.length}
              label="Pop moments"
              desktopClass="md:grid md:grid-cols-2 md:gap-5 md:pt-0 lg:grid-cols-4"
            >
              {MOMENTS.map((m) => (
                <article key={m.t} className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
                  <img
                    src={m.p.src}
                    alt={m.p.alt}
                    loading="lazy"
                    className={`aspect-[4/3.4] w-full object-cover ${m.pos}`}
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-sm font-bold text-primary">{m.t}</p>
                    <h3 className="mt-1 text-lg font-bold leading-tight text-accent">{m.h}</h3>
                    <p className="mt-1 flex-1 text-sm text-foreground/75">{m.d}</p>
                    <Button
                      asChild
                      className="cta-pop cta-pop-sm mt-4 w-full rounded-full bg-primary text-primary-foreground"
                    >
                      <Link to="/order">
                        {m.cta} <A />
                      </Link>
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
            <img
              src={popStarsMobile.url}
              alt={`Our POP Stars. Schools, clubs and communities sharing fruity fun across Bali, including ${COMMUNITY_NAMES.join(", ")}.`}
              loading="lazy"
              width={1024}
              height={1536}
              className="mx-auto h-auto w-full max-w-4xl"
            />
          </picture>
          <div className="mt-4 flex justify-center md:mt-5">
            <Button asChild size="lg" className="cta-pop rounded-full bg-accent px-6 text-accent-foreground shadow-md">
              <a
                href={waLink("Hi! I'd love to know more about Fruti Pop 😊")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Chat With Us on WhatsApp <A />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
function PackCard({ name, qty, price, pack }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold text-foreground">{name}</h3>
      <p className="text-sm font-medium text-foreground/60 mt-1">{qty}</p>
      <span className="text-2xl font-black text-primary mt-4">{price}</span>
      <Button asChild className={`${cta} mt-6 px-8`}>
        <Link to={`/order?pack=${pack}`}>Select Pack</Link>
      </Button>
    </div>
  );
}
