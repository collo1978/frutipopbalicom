import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm, PackSpotlight, btn } from "@/components/site";
import { OCCASIONS } from "@/lib/occasions";
import { CONTACT, mailLink } from "@/lib/site";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Packs & Orders | Fruti Pop Bali" },
      { name: "description", content: "Order a Fruti Pop family pack of 20 pops for Rp250,000, or enquire about parties, schools, events and villas via WhatsApp." },
      { property: "og:title", content: "Packs & Orders | Fruti Pop Bali" },
      { property: "og:description", content: "20 pops for Rp250,000. Order or enquire on WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/packs" },
    ],
    links: [{ rel: "canonical", href: "/packs" }],
  }),
  component: PacksPage,
});

function PacksPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Packs & Orders</p>
        <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">Fill the freezer. Keep the smiles coming.</h1>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8"><PackSpotlight /></section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-bold text-accent">How ordering works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Message us", "Send your enquiry on WhatsApp, by phone or by email."],
            ["We confirm the details", "We'll reply to confirm your order and arrange everything with you."],
            ["Pops arrive, smiles follow", "Open the freezer (or the cooler) and enjoy."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-3xl border bg-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mango font-display text-lg font-bold text-accent">{i + 1}</span>
              <h3 className="mt-3 text-xl font-bold">{t}</h3>
              <p className="mt-1 text-foreground/80">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">There's no online checkout. Every order is confirmed personally by our team.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-bold text-accent">Planning something bigger?</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {OCCASIONS.map((o) => <Link key={o.slug} to="/occasions" hash={o.slug} className={btn.outline}>{o.label}</Link>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-3xl font-bold text-accent">Send an enquiry</h2>
          <p className="mt-3 text-foreground/80">Fill in what you know and we'll take it from there.</p>
          <ul className="mt-4 space-y-2 font-semibold">
            <li><a className="text-accent underline underline-offset-4" href={CONTACT.phoneHref}>Call {CONTACT.phoneDisplay}</a></li>
            <li><a className="text-accent underline underline-offset-4" href={mailLink("Fruti Pop order enquiry")}>{CONTACT.email}</a></li>
          </ul>
        </div>
        <EnquiryForm />
      </section>
    </>
  );
}
