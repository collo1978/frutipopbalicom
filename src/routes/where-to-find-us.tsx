import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, WhatsAppButton, btn } from "@/components/site";
import { P } from "@/lib/photos";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/where-to-find-us")({
  head: () => ({
    meta: [
      { title: "Where to Find Us | Fruti Pop Bali" },
      { name: "description", content: "Ask where Fruti Pop is sold near you, order a family pack, or arrange pops for your event or villa." },
      { property: "og:title", content: "Where to Find Us | Fruti Pop Bali" },
      { property: "og:description", content: "Find Fruti Pop near you, order packs, or arrange event and villa pops." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/where-to-find-us" },
    ],
    links: [{ rel: "canonical", href: "/where-to-find-us" }],
  }),
  component: FindUs,
});

function FindUs() {
  const paths = [
    { t: "Where can I buy one?", d: "Ask us where Fruti Pop is available near you right now.", msg: "Hi Fruti Pop! Where can I buy Fruti Pops near me? I'm in:" },
    { t: "Order a family pack", d: "10 pops for Rp250,000, arranged with you directly.", link: "/order" as const },
    { t: "Events & villas", d: "Parties, schools, markets or pool days? Tell us the plan.", link: "/occasions" as const },
  ];
  return (
    <>
      <PageHeader eyebrow="Where to Find Us" title="Looking for a pop?" photo={P.kioskGirl}>
        <p>Where Fruti Pop is sold changes as we pop up around Bali, so the quickest way to find one is to ask us.</p>
      </PageHeader>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-3">
        {paths.map((p) => (
          <div key={p.t} className="flex flex-col rounded-3xl border bg-card p-6">
            <h2 className="text-2xl font-bold text-accent">{p.t}</h2>
            <p className="mt-2 flex-1 text-foreground/80">{p.d}</p>
            <div className="mt-5">
              {p.link ? <Link to={p.link} className={btn.outline}>Find out more</Link> : <WhatsAppButton message={p.msg}>Ask on WhatsApp</WhatsAppButton>}
            </div>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-secondary/60 p-8">
          <h2 className="text-2xl font-bold text-accent">Business contact</h2>
          <address className="mt-3 not-italic text-foreground/85">{CONTACT.address}</address>
          <p className="mt-2 text-sm text-muted-foreground">This is our business address, not a walk-in shop, so please message us before visiting.</p>
          <p className="mt-4 font-semibold">
            <a href={CONTACT.phoneHref} className="text-accent underline underline-offset-4">{CONTACT.phoneDisplay}</a>{" · "}
            <a href={`mailto:${CONTACT.email}`} className="text-accent underline underline-offset-4">{CONTACT.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
