import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EnquiryForm, btn } from "@/components/site";
import { P } from "@/lib/photos";
import { FAMILY_PACK } from "@/lib/site";

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
  const [enquiryType, setEnquiryType] = useState("Something else");

  const stories = [
    {
      id: "birthday-parties",
      label: "Birthday Parties",
      headline: "The moment the cooler opens.",
      description: "Cake is great. But nothing gets a squeal quite like a cooler full of bright, fruity pops on a hot Bali afternoon.",
      cta: "Plan Your Party →",
      type: "Birthday party",
      photo: P.heroCoolerGroup,
      band: "bg-secondary/55",
      imageFirst: false,
      position: "object-cover object-center",
    },
    {
      id: "schools-sports-clubs",
      label: "Schools & Sports Clubs",
      headline: "The final whistle. The first pop.",
      description: "After all the running, cheering and playing, there's nothing quite like a cold, fruity reward. Big smiles for the whole team.",
      cta: "Treat Your Team →",
      type: "School or sports club",
      photo: P.footballKidsKiosk,
      band: "bg-background",
      imageFirst: true,
      position: "object-cover object-center",
    },
    {
      id: "events",
      label: "Events",
      headline: "A little pop. A lot of happy faces.",
      description: "From community gatherings to big celebrations, bring a burst of fruity fun that gets everyone smiling.",
      cta: "Plan Your Event →",
      type: "Event",
      photo: P.mnm[0]!,
      band: "bg-mango/20",
      imageFirst: false,
      position: "object-cover object-center",
    },
    {
      id: "villas-poolside",
      label: "Villas & Poolside",
      headline: "Sun's out. Pops out.",
      description: "Poolside laughs, sunny afternoons and a freezer full of fruity pops. The little things that make a Bali holiday even sweeter.",
      cta: "Stock Your Freezer →",
      type: "Villa or poolside",
      photo: P.villaDelivery,
      band: "bg-primary/10",
      imageFirst: true,
      position: "object-cover object-center",
    },
  ] as const;

  return (
    <>
      <header className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center md:py-12">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Occasions</p>
          <h1 className="mt-2 text-4xl font-bold text-accent md:text-5xl">Every moment is better with a pop.</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-foreground/80">Find your moment, then tell us what would make the day feel special.</p>
        </div>
      </header>

      {stories.map((story) => (
        <section key={story.id} id={story.id} className={`scroll-mt-20 ${story.band}`}>
          <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 py-10 md:grid-cols-2 md:gap-12 md:py-14">
            <div className={story.imageFirst ? "md:order-2" : undefined}>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">{story.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-accent md:text-4xl">{story.headline}</h2>
              <p className="mt-3 max-w-lg text-lg leading-relaxed text-foreground/80">{story.description}</p>
              <a href="#enquiry" onClick={() => setEnquiryType(story.type)} className={`${btn.primary} mt-5`}>
                {story.cta}
              </a>
            </div>
            <img
              src={story.photo.src}
              alt={story.photo.alt}
              loading="lazy"
              className={`aspect-square w-full rounded-3xl shadow-lg ${story.position} ${story.imageFirst ? "md:order-1" : undefined}`}
            />
          </div>
        </section>
      ))}

      <section className="bg-accent py-10 text-accent-foreground md:py-12">
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 md:grid-cols-[1.05fr_0.95fr] md:gap-9">
          <img src={P.heroCoolerPair.src} alt={P.heroCoolerPair.alt} loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-3xl object-cover object-center shadow-lg" />
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-mango">Family Pack</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">20 POPS. 20 BIG SMILES!</h2>
            <p className="mt-3 font-display text-4xl font-bold text-mango">{FAMILY_PACK.price}</p>
            <p className="mt-2 text-lg font-semibold">Fill the freezer. Bring on the smiles.</p>
            <a href="#enquiry" className={`${btn.primary} mt-5`}>Get Your Party Pops →</a>
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-20 bg-background">
        <div className="mx-auto grid max-w-6xl gap-7 px-4 py-12 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-14">
          <div>
            <h2 className="text-3xl font-bold text-accent md:text-4xl">Tell us about your day</h2>
            <p className="mt-3 text-lg text-foreground/80">Send a few details and we'll get back to you on WhatsApp.</p>
          </div>
          <EnquiryForm
            defaultType={enquiryType}
            typeOptions={["Birthday party", "School or sports club", "Event", "Villa or poolside", "Something else"]}
            quantityLabel="How many pops would you like?"
          />
        </div>
      </section>
    </>
  );
}
