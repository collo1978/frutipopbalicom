import { useState, type ReactNode } from "react";
import { CONTACT, ENQUIRY_TYPES, FAMILY_PACK, mailLink, waLink } from "@/lib/site";
import type { Flavour } from "@/lib/flavours";
import type { Photo } from "@/lib/photos";

export const btn = {
  primary:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
  grape:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 font-bold text-accent-foreground shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
  outline:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-accent bg-card px-6 py-2.5 font-bold text-accent transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
};

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

export function WhatsAppButton({ message, children, className = btn.primary }: { message?: string; children: ReactNode; className?: string }) {
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsAppIcon /> {children}
      <span className="sr-only">(opens WhatsApp)</span>
    </a>
  );
}

export function PageHeader({ eyebrow, title, children, photo }: { eyebrow: string; title: string; children?: ReactNode; photo?: Photo }) {
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">{title}</h1>
          <div className="mt-4 max-w-prose text-lg text-foreground/80">{children}</div>
        </div>
        {photo && (
          <img src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
        )}
      </div>
    </section>
  );
}

export function FlavourCard({ f }: { f: Flavour }) {
  return (
    <article className={`flex flex-col items-center rounded-3xl p-5 text-center ${f.tint}`}>
      <div className="flex h-56 w-full items-center justify-center">
        {f.img ? (
          <img src={f.img} alt={`Fruti Pop ${f.name} sorbet pack`} loading="lazy" className="h-full w-auto object-contain drop-shadow-lg" />
        ) : (
          <div className="flex h-48 w-24 items-center justify-center rounded-full border-2 border-dashed border-accent/40 px-2 text-xs font-semibold text-muted-foreground">
            Pack photo coming soon
          </div>
        )}
      </div>
      <h3 className="mt-4 text-xl font-bold text-accent">{f.name}</h3>
      {f.tagline && <p className="text-sm font-semibold text-foreground/70">“{f.tagline}”</p>}
    </article>
  );
}

export function PhotoGrid({ photos, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { photos: Photo[]; cols?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 md:gap-4 ${cols}`}>
      {photos.map((p) => (
        <li key={p.src}>
          <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
        </li>
      ))}
    </ul>
  );
}

export function PackSpotlight({ photo }: { photo?: Photo }) {
  if (photo) {
    return (
      <div className="grid overflow-hidden rounded-3xl bg-accent text-accent-foreground shadow-lg md:grid-cols-[auto_1fr]">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="mx-auto aspect-[3/4] w-full max-w-xs object-cover md:h-[26rem] md:w-[19.5rem] md:max-w-none"
        />
        <div className="flex flex-col justify-center px-6 py-7 sm:px-8 md:py-8">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-mango">Family pack</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">20 POPS. 20 BIG SMILES!</h2>
          <p className="mt-3 font-display text-4xl font-bold text-mango sm:text-5xl">{FAMILY_PACK.price}</p>
          <p className="mt-2 text-base font-semibold opacity-90">Fill the freezer. Bring on the smiles.</p>
          <WhatsAppButton message={`Hi Fruti Pop! I'd like to order a family pack of ${FAMILY_PACK.pops} pops (${FAMILY_PACK.price}).`} className={`${btn.primary} mt-5 self-start`}>
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-center overflow-hidden rounded-3xl bg-accent text-accent-foreground md:grid-cols-[1fr_auto]">
      <div className="p-7 md:p-9">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-mango">Family pack</p>
        <p className="mt-2 font-display text-4xl font-bold md:text-5xl">
          {FAMILY_PACK.pops} pops <span className="text-mango">·</span> {FAMILY_PACK.price}
        </p>
        <p className="mt-3 max-w-lg opacity-90">
          Keep a pack ready for hot afternoons, shared treats and little celebrations.
        </p>
      </div>
      <div className="flex flex-col gap-3 px-7 pb-7 md:px-9 md:pb-0 md:pl-0">
        <WhatsAppButton message={`Hi Fruti Pop! I'd like to order a family pack of ${FAMILY_PACK.pops} pops (${FAMILY_PACK.price}).`} className={btn.primary}>
          Order on WhatsApp
        </WhatsAppButton>
        <a href={mailLink("Family pack enquiry")} className="text-center text-sm font-semibold underline underline-offset-4">
          or enquire by email
        </a>
      </div>
    </div>
  );
}

const field = "mt-1 w-full rounded-xl border border-input bg-card px-3 py-2.5 text-base focus:outline-none focus:ring-4 focus:ring-ring/30";

/** Builds a prefilled WhatsApp message — no data is stored or sent anywhere else. */
export function EnquiryForm({ defaultType = ENQUIRY_TYPES[0] as string }: { defaultType?: string }) {
  const [type, setType] = useState(defaultType);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const message = [
    "Hi Fruti Pop!",
    `Enquiry: ${type}`,
    name && `Name: ${name}`,
    qty && `Pops / guests: ${qty}`,
    date && `Date: ${date}`,
    location && `Location: ${location}`,
    notes && `Notes: ${notes}`,
  ].filter(Boolean).join("\n");

  return (
    <form
      className="grid gap-4 rounded-3xl border bg-card p-6 shadow-sm sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <label className="text-sm font-semibold sm:col-span-2">
        What can we help with?
        <select className={field} value={type} onChange={(e) => setType(e.target.value)}>
          {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">
        Your name
        <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <label className="text-sm font-semibold">
        Number of pops or guests
        <input className={field} value={qty} onChange={(e) => setQty(e.target.value)} inputMode="numeric" />
      </label>
      <label className="text-sm font-semibold">
        Date (if any)
        <input type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label className="text-sm font-semibold">
        Location / area
        <input className={field} value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label className="text-sm font-semibold sm:col-span-2">
        Anything else?
        <textarea rows={3} className={field} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className={btn.primary}><WhatsAppIcon /> Send on WhatsApp</button>
        <a href={mailLink(`Enquiry: ${type}`, message)} className="font-semibold text-accent underline underline-offset-4">
          Send by email instead
        </a>
      </div>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        This opens WhatsApp ({CONTACT.phoneDisplay}) with your message ready to send. Nothing is saved on this website.
      </p>
    </form>
  );
}
