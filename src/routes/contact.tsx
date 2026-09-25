import { createFileRoute } from "@tanstack/react-router";
import aprilPhoto from "@/assets/5.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site";
import { CONTACT, mailLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Fruti Pop Bali" },
      { name: "description", content: "WhatsApp, call or email Fruti Pop Bali about family packs, parties, schools, events and villas." },
      { property: "og:title", content: "Contact | Fruti Pop Bali" },
      { property: "og:description", content: "Get in touch with Fruti Pop Bali on WhatsApp, phone or email." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const whatsappHref = "https://wa.me/6287841480116?text=Hi%20Fruti%20Pop!%20I%27d%20like%20to%20order%20some%20pops.";

  return (
    <section className="bg-hero-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 py-10 md:grid-cols-[1fr_0.9fr] md:gap-12 md:py-14">
        <div className="max-w-xl text-left">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold leading-none text-accent md:text-6xl">Say hello!</h1>
          <p className="mt-5 text-lg font-semibold leading-relaxed text-foreground md:text-xl">WhatsApp is the fastest way to reach us.</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="cta-pop rounded-full shadow-md">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp Us <span className="cta-arrow" aria-hidden="true">→</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-accent bg-card font-display text-lg font-bold text-accent">
              <a href={CONTACT.phoneHref}>Call {CONTACT.phoneDisplay}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-accent bg-card font-display text-lg font-bold text-accent">
              <a href={mailLink("Hello Fruti Pop")}>Email Us</a>
            </Button>
          </div>

          <div className="mt-8 rounded-3xl bg-card p-5 shadow-sm">
            <h2 className="font-display text-2xl font-extrabold text-accent">Business address</h2>
            <address className="mt-3 text-base not-italic leading-relaxed text-foreground md:text-lg">
              {CONTACT.address}
            </address>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">(Office, not a walk-in shop)</p>
          </div>
        </div>

        <img
          src={aprilPhoto.url}
          alt="April smiling and holding two Fruti Pop sorbet pops"
          className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-lg md:max-w-none"
        />
      </div>
    </section>
  );
}
