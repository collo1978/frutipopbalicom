import { createFileRoute, Link } from "@tanstack/react-router";
import { btn } from "@/components/site";
import { P } from "@/lib/photos";
import { SNOWWAVE } from "@/lib/site";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | Fruti Pop Bali" },
      { name: "description", content: "How a frozen fruit purée sample turned into Fruti Pop, fruity sorbet pops for kids and grown-ups in Bali. Meet Paul and the team." },
      { property: "og:title", content: "Our Story | Fruti Pop Bali" },
      { property: "og:description", content: "From frozen fruit purée to Fruti Pop. Meet Paul and the team." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/our-story" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
  }),
  component: OurStory,
});

function OurStory() {
  return (
    <>
      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">The Fruti Pop Story</p>
            <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">It started with a taste.</h1>
            <p className="mt-4 text-lg text-foreground/80">
              Before there was Fruti Pop, there was fruit. Lots of it. Paul was making frozen fruit purée samples for
              bars, beach clubs and hotels around Bali.
            </p>
          </div>
          <img src={P.paul.src} alt={P.paul.alt} className="mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl object-cover shadow-xl" />
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-lg leading-relaxed text-foreground/85">
        <p>
          One day, tasting one of those frozen samples, Paul had a simple thought: <em>this would make a brilliant pop.</em>{" "}
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
        <img src={P.farm.src} alt={P.farm.alt} loading="lazy" className="aspect-[16/9] w-full rounded-3xl object-cover" />
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">Paul among the strawberries. Fruit is where it all begins.</figcaption>
      </figure>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold text-accent">The people behind the pops</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-foreground/80">A small, cheerful team who love seeing those big smiles.</p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {P.team.map((t) => (
            <li key={t.src}><img src={t.src} alt={t.alt} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" /></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold text-accent">Our sister business: Snowwave Bali</h2>
          <p className="mt-2 text-foreground/80">
            The frozen fruit and fruit purée side of the story lives on at Snowwave Bali. {SNOWWAVE.blurb}.
          </p>
          <a href={SNOWWAVE.url} target="_blank" rel="noopener noreferrer" className={`${btn.outline} mt-5`}>
            Visit Snowwave Bali ↗<span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link to="/flavours" className={btn.primary}>Meet the flavours</Link>
      </div>
    </>
  );
}
