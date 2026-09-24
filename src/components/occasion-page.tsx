import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { EnquiryForm, PageHeader, PhotoGrid, WhatsAppButton, btn } from "@/components/site";
import { OCCASIONS, type Occasion } from "@/lib/occasions";

export function occasionHead(o: Occasion) {
  const title = `${o.label} — Fruti Pop Bali`;
  return {
    meta: [
      { title },
      { name: "description", content: o.intro },
      { property: "og:title", content: title },
      { property: "og:description", content: o.intro },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/occasions/${o.slug}` },
    ],
    links: [{ rel: "canonical", href: `/occasions/${o.slug}` }],
  };
}

export function OccasionPage({ o, children }: { o: Occasion; children?: ReactNode }) {
  const others = OCCASIONS.filter((x) => x.slug !== o.slug);
  return (
    <>
      <PageHeader eyebrow={o.label} title={o.hook} photo={o.cover}>
        <p>{o.intro}</p>
        <div className="mt-6">
          <WhatsAppButton message={`Hi Fruti Pop! I'm asking about pops for: ${o.enquiryType}.`}>Ask about your {o.label.toLowerCase()}</WhatsAppButton>
        </div>
      </PageHeader>

      {children}

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold text-accent">Moments like these</h2>
        <div className="mt-6"><PhotoGrid photos={o.gallery} /></div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-3xl font-bold text-accent">Tell us about your day</h2>
          <p className="mt-3 text-foreground/80">Send a few details and we'll get back to you on WhatsApp:</p>
          <ul className="mt-4 space-y-2">
            {o.tips.map((t) => (
              <li key={t} className="flex gap-2"><span aria-hidden className="text-primary">●</span>{t}</li>
            ))}
          </ul>
        </div>
        <EnquiryForm defaultType={o.enquiryType} />
      </section>

      <nav aria-label="Other occasions" className="mx-auto max-w-6xl px-4 pb-6">
        <h2 className="text-xl font-bold">More occasions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {others.map((x) => (
            <Link key={x.slug} to={`/occasions/${x.slug}`} className={btn.outline}>{x.label}</Link>
          ))}
        </div>
      </nav>
    </>
  );
}
