import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm, WhatsAppIcon, btn } from "@/components/site";
import { OCCASIONS } from "@/lib/occasions";
import { CONTACT, FAMILY_PACK, mailLink, waLink } from "@/lib/site";
import freezer from "@/assets/family-pack-freezer-home.png.asset.json";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Fill the Freezer | Fruti Pop Bali" },
      { name: "description", content: "Order a Fruti Pop family pack of 10 pops for Rp250,000, or enquire about parties, schools, events and villas via WhatsApp." },
      { property: "og:title", content: "Fill the Freezer | Fruti Pop Bali" },
      { property: "og:description", content: "10 pops for Rp250,000. Order or enquire on WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/packs" },
    ],
    links: [{ rel: "canonical", href: "/packs" }],
  }),
  component: PacksPage,
});

const FAMILY_MSG = "Hi Fruti Pop! I'd like to order the Family Pack of 10 pops for Rp250,000. Could you please help me with my order?";

function PacksPage() {
  const email = mailLink("Family Pack enquiry", FAMILY_MSG);
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <h1 className="sr-only">Fill the Freezer: Family Pack, 10 pops for Rp250,000</h1>
        <div className="grid overflow-hidden rounded-3xl bg-accent text-accent-foreground shadow-lg md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="min-w-0 aspect-[1128/845] overflow-hidden md:aspect-auto md:min-h-[27rem]">
            <img src={freezer.url} alt="A mum and two children opening a freezer at home full of Fruti Pops." className="h-full w-full object-cover object-left" />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-9">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-mango">Family Pack</p>
            <p className="mt-1 font-display text-3xl font-bold">10 POPS. 10 BIG SMILES!</p>
            <p className="mt-1 font-display text-4xl font-bold text-mango">{FAMILY_PACK.price}</p>
            <p className="mt-2 text-lg">Fill the freezer. Bring on the smiles.</p>
            <a href={waLink(FAMILY_MSG)} target="_blank" rel="noopener noreferrer" className={`${btn.primary} mt-4`}><WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp →</a>
            <a href={email} className="mt-3 block font-semibold underline underline-offset-4">or enquire by email</a>
          </div>
        </div>
      </section>

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
