import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EnquiryForm, btn } from "@/components/site";
import { P } from "@/lib/photos";
import { FAMILY_PACK } from "@/lib/site";
import birthdayParty from "@/assets/birthday-pool-party.png.asset.json";
import eventBoy from "@/assets/event-boy-two-pops.jpg.asset.json";

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

  const showEnquiry = (type?: string) => {
    if (type) setEnquiryType(type);
    window.history.replaceState(null, "", "#enquiry");
    window.requestAnimationFrame(() => {
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const stories = [
    {
      id: "birthday-parties",
      label: "Birthday Parties",
      headline: "The moment the cooler opens.",
      description: "Cake is great. But nothing gets a squeal quite like a cooler full of bright, fruity pops on a hot Bali afternoon.",
      cta: "Plan Your Party →",
      type: "Birthday party",
      photo: { src: birthdayParty.url, alt: "Excited children around a cooler full of Fruti Pops at a poolside party" },
      position: "object-cover object-[50%_58%]",
    },
    {
      id: "schools-sports-clubs",
      label: "Schools & Sports Clubs",
      headline: "The final whistle. The first pop.",
      description: "After all the running, cheering and playing, there's nothing quite like a cold, fruity reward. Big smiles for the whole team.",
      cta: "Treat Your Team →",
      type: "School or sports club",
      photo: P.footballPair,
      position: "object-cover object-top",
    },
    {
      id: "events",
      label: "Events",
      headline: "A little pop. A lot of happy faces.",
      description: "From community gatherings to big celebrations, bring a burst of fruity fun that gets everyone smiling.",
      cta: "Plan Your Event →",
      type: "Event",
      photo: { src: eventBoy.url, alt: "A smiling boy holding two Fruti Pops at an event" },
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
      position: "object-cover object-center",
    },
  ] as const;

  return (
    <>
      <section className="bg-background">
        <h1 className="pt-5 text-center font-display text-2xl font-bold text-accent md:pt-6 md:text-3xl">
          Good times start with a pop.
        </h1>
        <div className="mx-auto grid max-w-[100rem] gap-x-9 gap-y-5 px-4 py-4 lg:grid-cols-2 lg:py-5 xl:px-6">
          {stories.map((story) => (
            <article key={story.id} id={story.id} className="scroll-mt-20 grid items-center gap-4 sm:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-5">
              <img
                src={story.photo.src}
                alt={story.photo.alt}
                loading={story.id === "birthday-parties" ? "eager" : "lazy"}
                className={`aspect-[1.28/1] h-full max-h-[18rem] min-h-0 w-full rounded-3xl ${story.position}`}
              />
              <div className="min-w-0 py-2">
                <h2 className="text-3xl font-bold leading-[1.02] text-accent xl:text-4xl">{story.label}</h2>
                <p className="mt-2 font-display text-base font-bold leading-snug text-accent xl:text-lg">{story.headline}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75 xl:text-base">{story.description}</p>
                <a href="#enquiry" onClick={(event) => { event.preventDefault(); showEnquiry(story.type); }} className={`${btn.primary} mt-4 px-5`}>
                  {story.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-accent py-8 text-accent-foreground md:py-10">
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 md:grid-cols-[1.05fr_0.95fr] md:gap-9">
          <img src={P.heroCoolerPair.src} alt={P.heroCoolerPair.alt} loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-[15rem] md:max-w-[17rem] rounded-3xl object-cover object-center shadow-lg" />
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-mango">Family Pack</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">10 POPS. 10 BIG SMILES!</h2>
            <p className="mt-3 font-display text-4xl font-bold text-mango">{FAMILY_PACK.price}</p>
            <p className="mt-2 text-lg font-semibold">Fill the freezer. Bring on the smiles.</p>
            <a href="#enquiry" onClick={(event) => { event.preventDefault(); showEnquiry(); }} className={`${btn.primary} mt-5`}>Get Your Party Pops →</a>
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
