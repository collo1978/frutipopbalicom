import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site";
import { OCCASIONS } from "@/lib/occasions";
import { P } from "@/lib/photos";

export const Route = createFileRoute("/occasions/")({
  head: () => ({
    meta: [
      { title: "Occasions | Fruti Pop Bali" },
      { name: "description", content: "Birthday parties, schools and sports clubs, events and villa pool days. Find the Fruti Pop moment for you." },
      { property: "og:title", content: "Occasions | Fruti Pop Bali" },
      { property: "og:description", content: "Birthday parties, schools, events and villa pool days with Fruti Pop." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/occasions" },
    ],
    links: [{ rel: "canonical", href: "/occasions" }],
  }),
  component: OccasionsIndex,
});

function OccasionsIndex() {
  return (
    <>
      <PageHeader eyebrow="Occasions" title="Every moment is better with a pop." photo={P.beachGroup}>
        <p>Pick your occasion and tell us a little about it.</p>
      </PageHeader>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2">
        {OCCASIONS.map((o) => (
          <Link key={o.slug} to={`/occasions/${o.slug}`} className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
            <img src={o.cover.src} alt={o.cover.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition group-hover:scale-[1.02]" />
            <div className="p-5">
              <h2 className="text-2xl font-bold text-accent">{o.label}</h2>
              <p className="mt-1 text-foreground/80">{o.hook}</p>
              <span className="mt-3 inline-block font-bold text-primary">Explore →</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
