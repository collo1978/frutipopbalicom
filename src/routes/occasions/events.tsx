import { createFileRoute } from "@tanstack/react-router";
import { OccasionPage, occasionHead } from "@/components/occasion-page";
import { getOccasion } from "@/lib/occasions";
import { P } from "@/lib/photos";

const o = getOccasion("events");

export const Route = createFileRoute("/occasions/events")({
  head: () => occasionHead(o),
  component: EventsPage,
});

function EventsPage() {
  const [serving, boy, toddlers, girlMenu, girl, stall] = P.mnm;
  return (
    <OccasionPage o={o}>
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-mango">Real event</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Montessori Night Market, Bali</h2>
          <p className="mt-3 max-w-2xl opacity-90">
            Paul and the team ran the Fruti Pop stall at the Montessori Night Market. These photos are from that
            evening — kids choosing their flavour, first bites, and families gathered around the freezer.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {[serving, boy, toddlers, girlMenu, girl, stall].map((p, i) => (
              <img
                key={p!.src}
                src={p!.src}
                alt={p!.alt}
                loading="lazy"
                className={`h-full w-full rounded-2xl object-cover ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </OccasionPage>
  );
}
