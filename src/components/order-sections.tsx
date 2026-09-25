import { useRef, useState } from "react";
import { BadgeCheck, Box, Heart, Leaf, Play, Snowflake, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FLAVOURS } from "@/lib/flavours";
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
      <h3 id="testimonial-heading" className="text-2xl font-bold text-accent md:text-3xl">Don't Just Take Our Word for It!</h3>
      <p className="mx-auto mt-2 max-w-xl text-foreground/75">A little pop of happiness, straight from our happy customers!</p>
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
            <h3 className="text-2xl font-bold">Locally Sourced Fruit</h3>
          </div>
          <p className="mt-3 font-bold text-leaf-foreground">Fruit hand-picked from local farms in Bedugul, Bali & East Java.</p>
          <p className="mt-2 text-sm leading-relaxed text-leaf-foreground/85">
            We love working with local farmers to bring you quality fruit, transformed into delicious fruit purées and sorbet ice blocks.
          </p>
        </div>
      </div>
      {showCta && (
        <div className="mt-6 text-center">
          <Button asChild size="lg" className="min-h-12 rounded-full px-8 font-bold">
            <Link to="/order">Order Now →</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export function FlavourCards() {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 md:pb-0">
      {FLAVOURS.map((flavour) => (
        <li key={flavour.name} className={`flex w-[42%] shrink-0 snap-start flex-col items-center rounded-xl p-3 md:w-auto md:min-w-0 text-center ${flavour.tint}`}>
          {flavour.img && <img src={flavour.img} alt={`${flavour.name} Fruti Pop pack`} loading="lazy" className="h-36 w-full object-contain md:h-44" />}
          <h3 className="mt-2 text-base font-bold text-accent">{flavour.name}</h3>
          {flavour.tagline && <p className="text-xs font-semibold text-foreground/70">“{flavour.tagline}”</p>}
        </li>
      ))}
    </ul>
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

export function WhyFrutiPop({ showCta = false, showTestimonial = false }: { showCta?: boolean; showTestimonial?: boolean }) {
  return (
    <section className="bg-background py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-accent md:text-4xl">Why Fruti Pop?</h2>
        <div className="mt-6"><BenefitsStrip /></div>
        {showTestimonial && <CustomerTestimonial />}
        <div className={showTestimonial ? "" : "mt-6"}><FarmStory showCta={showCta} /></div>
      </div>
    </section>
  );
}