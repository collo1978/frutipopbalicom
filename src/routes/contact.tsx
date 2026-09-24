import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm, WhatsAppButton, btn } from "@/components/site";
import { CONTACT, mailLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fruti Pop Bali" },
      { name: "description", content: "WhatsApp, call or email Fruti Pop Bali about family packs, parties, schools, events and villas." },
      { property: "og:title", content: "Contact — Fruti Pop Bali" },
      { property: "og:description", content: "Get in touch with Fruti Pop Bali on WhatsApp, phone or email." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">Say hello!</h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/80">WhatsApp is the fastest way to reach us.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton>WhatsApp us</WhatsAppButton>
            <a href={CONTACT.phoneHref} className={btn.outline}>Call {CONTACT.phoneDisplay}</a>
            <a href={mailLink("Hello Fruti Pop")} className={btn.outline}>Email us</a>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-accent">Enquiries</h2>
          <p className="text-foreground/80">Family packs, birthday parties, schools & sports clubs, events or villa pool days — choose one and send us the details.</p>
          <dl className="space-y-3 text-sm">
            <div><dt className="font-bold">Email</dt><dd><a className="text-accent underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            <div><dt className="font-bold">Phone / WhatsApp</dt><dd><a className="text-accent underline" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></dd></div>
            <div><dt className="font-bold">Business address</dt><dd>{CONTACT.address}<br /><span className="text-muted-foreground">(office — not a walk-in shop)</span></dd></div>
          </dl>
        </div>
        <EnquiryForm />
      </section>
    </>
  );
}
