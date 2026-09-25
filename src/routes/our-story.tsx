import { createFileRoute } from "@tanstack/react-router";
import { P } from "@/lib/photos";
import farmFields from "@/assets/farm-fields.jpg.asset.json";
import aprilPhoto from "@/assets/5.jpg.asset.json";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | Fruti Pop Bali" },
      { name: "description", content: "How a frozen fruit purée sample turned into Fruti Pop, fruity sorbet pops for kids and grown-ups in Bali. Meet April and the team." },
      { property: "og:title", content: "Our Story | Fruti Pop Bali" },
      { property: "og:description", content: "From frozen fruit purée to Fruti Pop. Meet April and the team." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/our-story" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
  }),
  component: OurStory,
});

function OurStory() {
  return (
    <>
      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:py-16">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">The Fruti Pop Story</p>
            <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">It started with a taste.</h1>
            <p className="mt-4 text-lg text-foreground/80">
              Before there was Fruti Pop, there was fruit. Lots of it. April was making frozen fruit purée samples for
              bars, beach clubs and hotels around Bali.
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-lg leading-relaxed text-foreground/85">
        <p>
          One day, tasting one of those frozen samples, April had a simple thought: <em>this would make a brilliant pop.</em>{" "}
          Something fruity and frozen that kids would love, and that grown-ups would secretly want one of too.
        </p>
        <p>That idea became Fruti Pop.</p>
        <p>
          Today, Fruti Pop turns up where Bali's best little moments happen: birthday parties by the pool, the end of
          football training, school fun days, night markets and lazy villa afternoons. The part we love most isn't the
          pop itself. It's the face someone makes when they get one.
        </p>
      </article>

      <figure className="mx-auto max-w-5xl px-4">
        <img src={farmFields.url} alt="Fruit-growing fields in Bali" loading="lazy" className="aspect-[16/9] w-full rounded-3xl object-cover" />
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">Fruit is where it all begins.</figcaption>
      </figure>

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-14">
        <h2 className="text-center text-3xl font-bold text-accent">The people behind the pops</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-foreground/80">A small, cheerful team who love seeing those big smiles.</p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {P.team.map((t) => (
            <li key={t.src}><img src={t.src} alt={t.alt} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" /></li>
          ))}
        </ul>
      </section>

    </>
  );
}
