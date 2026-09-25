import { useEffect, useRef, useState, type ReactNode } from "react";
import strawberryArt from "@/assets/benefits/strawberry.png";
import sugarArt from "@/assets/benefits/sugar.png";
import iceArt from "@/assets/benefits/ice.png";
import leafArt from "@/assets/benefits/leaf.png";
import mangoArt from "@/assets/benefits/mango.png";
import popsArt from "@/assets/benefits/pops.png";
import { BadgeCheck, Box, Heart, Leaf, Play, Snowflake, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FLAVOURS } from "@/lib/flavours";
import { P } from "@/lib/photos";
import { Button } from "@/components/ui/button";
import { ZoomableFlavourImage } from "@/components/flavour-zoom";
import farmFields from "@/assets/farm-fields.jpg.asset.json";
import testimonialVideo from "@/assets/customer-testimonial.mp4.asset.json";
import testimonialPoster from "@/assets/customer-testimonial-poster.jpg.asset.json";

const benefits = [
  { label: "Healthy Choice", icon: Heart, tone: "bg-dragonfruit/10 text-dragonfruit" },
  { label: "Low Sugar", icon: Box, tone: "bg-leaf text-leaf-foreground" },
  { label: "Super Refreshing", icon: Snowflake, tone: "bg-secondary text-accent" },
  { label: "Vegan & Dairy Free", icon: Leaf, tone: "bg-primary/10 text-primary" },
  { label: "Full of Vitamins", icon: Sun, tone: "bg-mango/25 text-accent" },
] as const;

export function BenefitsStrip() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {benefits.map(({ label, icon: Icon, tone }) => (
        <li key={label} className={`flex min-h-24 flex-col items-center justify-center rounded-xl px-3 py-4 text-center ${tone}`}>
          <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={2.4} />
          <span className="mt-2 text-sm font-bold text-accent">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function CustomerTestimonial() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play();
  };

  return (
    <section aria-labelledby="testimonial-heading" className="py-10 text-center md:py-12">
      <h3 id="testimonial-heading" className="fruti-section-heading">Don't Just Take Our Word for It!</h3>
      <p className="mx-auto mt-2 max-w-xl text-foreground/75">Real smiles. Real fruity happiness.</p>
      <div className="relative mx-auto mt-6 aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-muted shadow-sm">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={testimonialPoster.url}
          aria-label="Child sharing their reaction to a Fruti Pop"
          className="h-full w-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={testimonialVideo.url} type="video/mp4" />
          Your browser does not support video playback.
        </video>
        {!isPlaying && (
          <Button
            type="button"
            size="icon"
            onClick={playVideo}
            aria-label="Play customer testimonial"
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
          >
            <Play aria-hidden="true" className="h-7 w-7 fill-current" />
          </Button>
        )}
      </div>
    </section>
  );
}

export function FarmStory({ showCta = false }: { showCta?: boolean }) {
  return (
    <div>
      <div className="grid overflow-hidden rounded-2xl bg-leaf md:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
        <img src={farmFields.url} alt="Fruit-growing fields in Bali" loading="lazy" className="aspect-[16/9] h-full w-full object-cover" />
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="flex items-center gap-2 text-leaf-foreground">
            <BadgeCheck aria-hidden="true" className="h-7 w-7" />
            <h3 className="font-display text-3xl font-extrabold leading-none">Locally Sourced Fruit</h3>
          </div>
          <p className="mt-3 font-bold text-leaf-foreground">Fruit hand-picked from local farms in Bedugul, Bali & East Java.</p>
          <p className="mt-2 text-sm leading-relaxed text-leaf-foreground/85">
            We love working with local farmers to bring you quality fruit, transformed into delicious fruit purées and sorbet ice blocks.
          </p>
        </div>
      </div>
      {showCta && (
        <div className="mt-6 text-center">
          <Button asChild size="lg" className="cta-pop rounded-full shadow-md">
            <Link to="/order">Order Now <span className="cta-arrow" aria-hidden="true">→</span></Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export function FlavourCards() {
  const [activeFlavour, setActiveFlavour] = useState<string | null>(null);
  return (
    <SwipeRow count={FLAVOURS.length} label="Order page flavours" desktopClass="md:grid md:grid-cols-6 md:gap-4 md:py-3" itemClass="w-[78%]">
      {FLAVOURS.map((flavour) => (
        <div key={flavour.name} className={`flavour-pop relative flex h-full flex-col items-center rounded-3xl px-3 pb-4 pt-4 text-center ${flavour.tint}`}>
          <div className="relative h-72 w-full md:h-56 lg:h-72">
            {flavour.img && <ZoomableFlavourImage f={flavour} active={activeFlavour === flavour.name} onToggle={() => setActiveFlavour((current) => current === flavour.name ? null : flavour.name)} />}
          </div>
          <h3 className="mt-2 font-display text-lg font-extrabold text-accent">{flavour.name}</h3>
          {flavour.tagline && <p className="text-xs font-semibold text-foreground/70">“{flavour.tagline}”</p>}
        </div>
      ))}
    </SwipeRow>
  );
}

export function ProductLineup() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card px-3 py-6 shadow-sm sm:px-6">
      <div className="grid grid-cols-6 items-end gap-1 sm:gap-3">
        {FLAVOURS.map((flavour) => (
          <div key={flavour.name} className="min-w-0 text-center">
            {flavour.img && <img src={flavour.img} alt={`${flavour.name} Fruti Pop`} className="mx-auto h-36 w-full object-contain sm:h-52 lg:h-64" />}
            <p className="mt-2 hidden text-xs font-bold text-accent sm:block">{flavour.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const BENEFIT_CARDS = [
  { t: "Fruity Goodness!", d: "A deliciously fruity treat.", img: strawberryArt, bg: "bg-pastel-pink" },
  { t: "Less Sugar!", d: "Less sugar than regular ice blocks.", img: sugarArt, bg: "bg-pastel-green" },
  { t: "Cool Down!", d: "A refreshing escape from the Bali heat.", img: iceArt, bg: "bg-pastel-blue" },
  { t: "Plant-Powered!", d: "Vegan & dairy free.", img: leafArt, bg: "bg-pastel-sage" },
  { t: "Vitamin Goodness!", d: "Fruity flavour with vitamins.", img: mangoArt, bg: "bg-pastel-yellow" },
  { t: "Big Smiles!", d: "Loved by kids and grown-ups alike.", img: popsArt, bg: "bg-pastel-lavender" },
] as const;

export function BenefitCards() {
  return (
    <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-3 md:gap-5">
      {BENEFIT_CARDS.map((b) => (
        <li
          key={b.t}
          tabIndex={0}
          className={`group relative flex h-full flex-col items-center overflow-hidden rounded-3xl px-3 pb-4 pt-3 text-center outline-none transition duration-200 ease-out focus-visible:ring-4 focus-visible:ring-ring/30 motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-md motion-safe:active:scale-[0.97] md:px-6 md:pb-6 ${b.bg}`}
        >
          <span aria-hidden="true" className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-card/40" />
          <span aria-hidden="true" className="absolute -bottom-5 -left-5 h-14 w-14 rounded-full bg-card/30" />
          <img src={b.img} alt="" width={816} height={816} loading="lazy" className="relative h-24 w-24 object-contain transition-transform duration-200 ease-out motion-safe:group-hover:rotate-[-4deg] motion-safe:group-hover:scale-110 motion-safe:group-active:rotate-[4deg] md:h-36 md:w-36" />
          <h3 className="relative mt-1 font-display text-lg font-extrabold leading-tight text-accent md:text-2xl">{b.t}</h3>
          <p className="relative mt-1 text-sm leading-snug text-foreground/80 md:text-base">{b.d}</p>
        </li>
      ))}
    </ul>
  );
}

/** Mobile swipe row with snap and pagination dots. On md+ children are laid out by `desktopClass`. */
export function SwipeRow({ children, count, label, desktopClass, itemClass = "w-[80%]" }: { children: ReactNode[]; count: number; label: string; desktopClass: string; itemClass?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 12;
      setActive(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);
  const go = (i: number) => {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft - 16, behavior: "smooth" });
  };
  return (
    <div>
      <ul ref={ref} aria-label={label} className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 ${desktopClass}`}>
        {children.map((c, i) => (
          <li key={i} className={`${itemClass} shrink-0 snap-start md:w-auto md:min-w-0`}>{c}</li>
        ))}
      </ul>
      <div className="mt-3 flex justify-center gap-1.5 md:hidden">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" aria-label={`Show item ${i + 1}`} aria-current={i === active} onClick={() => go(i)} className={`h-2 rounded-full transition-all ${i === active ? "w-5 bg-accent" : "w-2 bg-accent/25"}`} />
        ))}
      </div>
    </div>
  );
}

export function FlavourCarousel() {
  const [activeFlavour, setActiveFlavour] = useState<string | null>(null);
  return (
    <SwipeRow count={FLAVOURS.length} label="Our flavours" desktopClass="md:grid md:grid-cols-6 md:gap-4 md:py-3" itemClass="w-[78%]">
      {FLAVOURS.map((f) => (
        <div key={f.name} className={`flavour-pop relative flex h-full flex-col items-center rounded-3xl px-3 pb-4 pt-4 ${f.tint}`}>
          <div className="relative h-72 w-full md:h-56 lg:h-72">
            {f.img && <ZoomableFlavourImage f={f} active={activeFlavour === f.name} onToggle={() => setActiveFlavour((current) => current === f.name ? null : f.name)} />}
          </div>
          <h3 className="mt-2 font-display text-lg font-extrabold text-accent">{f.name}</h3>
        </div>
      ))}
    </SwipeRow>
  );
}

export function WhyFrutiPop({ showCta = false, showTestimonial = false }: { showCta?: boolean; showTestimonial?: boolean }) {
  return (
    <section className="bg-background py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="fruti-section-heading">Why Fruti Pop?</h2>
          <p className="mt-2 text-foreground/80">A little goodness in every pop!</p>
        </div>
        <div className="mt-6"><BenefitCards /></div>
        {showTestimonial && <CustomerTestimonial />}
        <div className={showTestimonial ? "" : "mt-8"}><FarmStory showCta={showCta} /></div>
      </div>
    </section>
  );
}
