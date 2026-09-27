import { useEffect, useRef, useState, type ReactNode } from "react";
import strawberryArt from "@/assets/benefits/strawberry.png";
import sugarArt from "@/assets/benefits/sugar.png";
import iceArt from "@/assets/benefits/ice.png";
import leafArt from "@/assets/benefits/leaf.png";
import mangoArt from "@/assets/benefits/mango.png";
import popsArt from "@/assets/benefits/pops.png";
import { BadgeCheck, Box, Heart, Leaf, PartyPopper, Play, RefreshCw, Search, Snowflake, Star, Sun, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FLAVOURS } from "@/lib/flavours";
import { ORDER_FLAVOURS } from "@/lib/order-flavours";
import { P } from "@/lib/photos";
import { Button } from "@/components/ui/button";
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

/** Shared Best Seller badge: sits in the card UI above the artwork, never over it. */
export function BestSellerBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex -rotate-2 items-center gap-1.5 whitespace-nowrap rounded-full bg-mango px-4 py-1.5 font-display text-sm font-extrabold text-accent shadow-md md:px-5 md:py-2 md:text-base ${className}`}>
      <Star aria-hidden="true" className="h-4 w-4 fill-current md:h-[1.125rem] md:w-[1.125rem]" /> BEST SELLER
    </span>
  );
}

/** Shared Mystery POP card anatomy. The action remains a real page control. */
export function MysteryPopIdle({ action, homepage = false }: { action: ReactNode; homepage?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center text-center">
      <div className={`flex w-full items-center justify-center px-2 ${homepage ? "h-10 pt-1 md:h-16 md:pt-2" : "h-8 pt-1.5 md:h-10 md:pt-2"}`}>
        <h3 className="font-display text-2xl font-black uppercase leading-none text-accent md:text-3xl">Mystery POP</h3>
      </div>
      <div className={`relative w-full overflow-hidden ${homepage ? "h-[21.5rem] md:aspect-[2/3] md:h-auto" : "aspect-[2/3]"}`}>
        <p className="absolute left-0 right-0 top-2 z-20 text-sm font-bold text-foreground/75 md:top-3 md:text-base">Can't decide on a flavour?</p>
        <img src={strawberryArt} alt="" aria-hidden="true" className="absolute -bottom-2 -left-[13%] w-[73%] -rotate-12 object-contain drop-shadow-md md:-bottom-3 md:-left-[11%] md:w-[70%]" />
        <img src={mangoArt} alt="" aria-hidden="true" className="absolute -bottom-3 -right-[14%] w-[73%] rotate-12 object-contain drop-shadow-md md:-bottom-4 md:-right-[12%] md:w-[70%]" />
        <span aria-hidden="true" className="absolute left-1/2 top-[39%] z-10 flex h-56 w-44 -translate-x-1/2 -translate-y-1/2 rotate-3 items-center justify-center font-display text-[19rem] font-black leading-none text-accent drop-shadow-md md:top-[40%] md:h-64 md:w-48 md:text-[22rem]">?</span>
        <img src={popsArt} alt="" aria-hidden="true" className="absolute -bottom-1 left-1/2 z-20 w-[50%] -translate-x-1/2 object-contain drop-shadow-md md:w-[47%]" />
      </div>
      <div className={`flex w-full flex-1 items-center justify-center px-3 text-center ${homepage ? "pb-3 pt-1 md:pb-4 md:pt-2" : "pb-3 pt-2 md:px-3 md:pb-4 md:pt-3"}`}>{action}</div>
    </div>
  );
}

type MysteryPopGameProps = {
  onAdd?: (name: string) => void;
  homepage?: boolean;
};

/** One Mystery POP game shared by the homepage discovery and Order picker. */
export function MysteryPopGame({ onAdd, homepage = false }: MysteryPopGameProps) {
  const [phase, setPhase] = useState<"idle" | "shuffling" | "result">("idle");
  const [index, setIndex] = useState(0);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const shuffle = () => {
    if (phase === "shuffling") return;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setPhase("shuffling");
    const final = Math.floor(Math.random() * ORDER_FLAVOURS.length);
    const steps = 12;
    let delay = 0;
    for (let step = 0; step < steps; step += 1) {
      delay += 70 + step * 12;
      const nextIndex = step === steps - 1 ? final : (final + step + 1) % ORDER_FLAVOURS.length;
      timers.current.push(window.setTimeout(() => setIndex(nextIndex), delay));
    }
    timers.current.push(window.setTimeout(() => setPhase("result"), delay + 120));
  };

  const flavour = ORDER_FLAVOURS[index];
  if (!flavour) return null;

  return (
    <div className="flavour-pop relative flex h-full flex-col items-center overflow-visible rounded-3xl bg-pastel-lavender text-center">
      {phase === "idle" && (
        <MysteryPopIdle homepage={homepage} action={
          <div className="relative">
            <span aria-hidden="true" className="absolute -right-10 -top-9 z-20 flex h-14 w-14 rotate-12 items-center justify-center bg-mango px-1.5 text-center font-display text-[9px] font-black leading-[0.9] text-accent shadow-md [clip-path:polygon(50%_0%,61%_23%,82%_10%,79%_36%,100%_43%,78%_56%,91%_78%,64%_74%,57%_100%,45%_77%,22%_91%,25%_64%,0%_55%,23%_43%,8%_21%,36%_26%)] md:-right-14 md:-top-11 md:h-16 md:w-16 md:text-[10px]">
              LET THE KIDS PRESS!
            </span>
            <Button type="button" size="sm" onClick={shuffle} className="cta-pop cta-pop-sm whitespace-nowrap rounded-full px-5 font-extrabold md:px-6">PICK MY POP</Button>
          </div>
        } />
      )}
      {phase === "shuffling" && (
        <div className="flex min-h-[26rem] flex-1 flex-col items-center justify-center px-2 py-4">
          {flavour.art && <img src={flavour.art} alt="" className="mystery-shuffle-img max-h-64 w-auto max-w-full select-none rounded-2xl object-contain opacity-80 md:max-h-80" draggable={false} />}
          <h3 className="mt-3 font-display text-lg font-extrabold text-accent">Shuffling...</h3>
        </div>
      )}
      {phase === "result" && (
        <>
          <div className="mystery-reveal flex min-h-[20rem] flex-1 flex-col items-center justify-center px-2 pt-3">
            {flavour.art && <img src={flavour.art} alt={`Fruti Pop ${flavour.name} flavour artwork`} loading="lazy" draggable={false} className="max-h-64 w-auto max-w-full select-none rounded-2xl object-contain shadow-md md:max-h-96" />}
            <h3 className="mt-3 flex items-center gap-1.5 font-display text-lg font-extrabold text-accent" aria-live="polite"><PartyPopper className="h-5 w-5" aria-hidden="true" /> It's {flavour.name}!</h3>
            {flavour.tagline && <p className="text-xs font-semibold text-foreground/70">{flavour.tagline}</p>}
          </div>
          <div className="mt-auto flex w-full flex-col gap-2 px-3 pb-3 pt-2 md:px-4 md:pb-4">
            {homepage ? (
              <Button asChild type="button" size="sm" className="h-auto min-h-9 whitespace-normal rounded-full">
                <Link to="/order">Order This Flavour →</Link>
              </Button>
            ) : (
              <Button type="button" size="sm" onClick={() => onAdd?.(flavour.name)} className="h-auto min-h-9 whitespace-normal rounded-full">+ Add {flavour.name} to My Pack</Button>
            )}
            <Button type="button" size="sm" variant="outline" onClick={shuffle} className="rounded-full"><RefreshCw /> Pick Again</Button>
          </div>
        </>
      )}
    </div>
  );
}

/** Small magnifying-glass control that opens the real product tube. Ordering controls never trigger it. */
export function SeeThePopButton({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <span className="group relative inline-flex">
      <button type="button" onClick={onClick} aria-label={`See the actual Fruti Pop ${name} tube`} className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-accent shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
        <Search aria-hidden="true" className="h-5 w-5" />
      </button>
      <span aria-hidden="true" className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent px-2 py-1 font-display text-[11px] font-bold text-accent-foreground opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100">See the Pop</span>
    </span>
  );
}

/** Clean enlarged viewer for the real high-resolution product tube. */
export function TubeViewer({ tube, onClose }: { tube: { name: string; img: string | null } | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!tube) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 30);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [tube, onClose]);
  if (!tube) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={`The real Fruti Pop ${tube.name} tube`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative" onClick={(event) => event.stopPropagation()}>
        <div className="flex flex-col items-center">
          {tube.img && <img src={tube.img} alt={`The real Fruti Pop ${tube.name} sorbet tube`} className="max-h-[76vh] w-auto max-w-[84vw] rounded-2xl bg-white object-contain shadow-2xl" />}
          <p className="mt-3 text-center text-sm font-bold text-white">{tube.name} · 100g tube</p>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close tube preview" className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/** Homepage Our Flavours: large original artwork cards with a 🔍 tube peek and a Mystery POP teaser. */
export function FlavourDiscovery({ desktopEndcap }: { desktopEndcap?: ReactNode }) {
  const [viewTube, setViewTube] = useState<string | null>(null);
  const tube = ORDER_FLAVOURS.find((f) => f.name === viewTube) ?? null;
  return (
    <>
      <SwipeRow count={ORDER_FLAVOURS.length + 1} label="Our flavours" desktopClass="md:grid md:auto-rows-fr md:grid-cols-4 md:gap-x-5 md:gap-y-4" itemClass="w-[84%]" tightTop desktopEndcap={desktopEndcap}>
        {[
          ...ORDER_FLAVOURS.map((flavour) => (
            <div key={flavour.name} className={`flavour-pop relative flex h-full flex-col overflow-hidden rounded-3xl ${flavour.tint}`}>
              <div className="flex h-10 items-center justify-center pt-1 md:h-16 md:pt-2">
                {flavour.name === "Strawberry" && <BestSellerBadge className="px-3 py-1 text-xs md:px-5 md:py-2 md:text-base [&_svg]:h-3.5 [&_svg]:w-3.5 md:[&_svg]:h-[1.125rem] md:[&_svg]:w-[1.125rem]" />}
              </div>
              {flavour.art && <img src={flavour.art} alt={`Original Fruti Pop ${flavour.name} sorbet artwork`} loading="lazy" draggable={false} className={`h-[21.5rem] w-full select-none md:aspect-[2/3] md:h-auto ${flavour.name === "Piña Colada" ? "object-contain p-3 md:p-4" : "object-contain md:object-cover"}`} />}
              <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-1 text-center md:pb-4 md:pt-2">
                <h3 className="font-display text-lg font-extrabold text-accent md:text-2xl">{flavour.name}</h3>
                <div className="mt-auto pt-2 md:pt-3"><SeeThePopButton name={flavour.name} onClick={() => setViewTube(flavour.name)} /></div>
              </div>
            </div>
          )),
          <div key="mystery" className="h-full"><MysteryPopGame homepage /></div>,
        ]}
      </SwipeRow>
      <TubeViewer tube={tube} onClose={() => setViewTube(null)} />
    </>
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
export function SwipeRow({ children, count, label, desktopClass, itemClass = "w-[80%]", tightTop = false, desktopEndcap }: { children: ReactNode[]; count: number; label: string; desktopClass: string; itemClass?: string; tightTop?: boolean; desktopEndcap?: ReactNode }) {
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
      <ul ref={ref} aria-label={label} className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 ${tightTop ? "pt-1 pb-4" : "pt-16 pb-6 -mt-10"} [scrollbar-width:none] md:mx-0 md:mt-0 md:pb-1 md:overflow-visible md:px-0 ${desktopClass}`}>
        {children.map((c, i) => (
          <li key={i} className={`${itemClass} shrink-0 snap-start md:h-full md:w-auto md:min-w-0`}>{c}</li>
        ))}
        {desktopEndcap && <li className="hidden min-h-full items-center justify-center md:flex">{desktopEndcap}</li>}
      </ul>
      <div className="mt-3 flex justify-center gap-1.5 md:hidden">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" aria-label={`Show item ${i + 1}`} aria-current={i === active} onClick={() => go(i)} className={`h-2 rounded-full transition-all ${i === active ? "w-5 bg-accent" : "w-2 bg-accent/25"}`} />
        ))}
      </div>
    </div>
  );
}


export function WhyFrutiPop({ showCta = false, showTestimonial = false }: { showCta?: boolean; showTestimonial?: boolean }) {
  return (
    <section className="bg-background py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="fruti-section-heading">Why Fruti Pop?</h2>
          <p className="mt-1.5 text-base font-medium text-foreground/70 md:text-lg">A little goodness in every pop!</p>
        </div>
        <div className="mt-4 md:mt-5"><BenefitCards /></div>
        {showTestimonial && <CustomerTestimonial />}
        <div className={showTestimonial ? "" : "mt-8"}><FarmStory showCta={showCta} /></div>
      </div>
    </section>
  );
}
