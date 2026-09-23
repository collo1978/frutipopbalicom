import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/where-to-buy")({
  head: () => ({
    meta: [
      { title: "Where to Buy — Fruti Pop Bali" },
      {
        name: "description",
        content:
          "Find Fruti Pop Bali sorbet pops near you. Stockist list and delivery links are pending verified business details.",
      },
      { property: "og:title", content: "Where to Buy — Fruti Pop Bali" },
      {
        property: "og:description",
        content: "Find Fruti Pop Bali sorbet pops near you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhereToBuy,
});

function WhereToBuy() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">Where to Buy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fruti Pop is on its way to freezers around Bali. This page will list our
          verified stockists and delivery options.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-muted-foreground/40 bg-muted p-4 text-sm text-muted-foreground">
        <strong>Setup pending:</strong> No stockist addresses, delivery apps or
        ordering links have been verified yet, so none are shown. Once the Fruti
        Pop team confirms locations and partners, they'll appear here.
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <span className="text-3xl" aria-hidden>📍</span>
          <h2 className="mt-3 text-lg font-semibold">Stockists</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cafés, beach clubs and shops carrying Fruti Pop — coming soon with a
            searchable map once addresses are confirmed.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <span className="text-3xl" aria-hidden>🛵</span>
          <h2 className="mt-3 text-lg font-semibold">Delivery</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Online ordering buttons (e.g. local delivery apps) are disabled until
            verified links are provided — no fake external links here.
          </p>
          <button
            type="button"
            disabled
            className="mt-3 cursor-not-allowed rounded-full bg-muted px-4 py-2 text-sm font-bold text-muted-foreground"
            title="Ordering link pending verification"
          >
            Order online — setup pending
          </button>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <span className="text-3xl" aria-hidden>🎉</span>
          <h2 className="mt-3 text-lg font-semibold">Events & wholesale</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Planning an event or want to stock Fruti Pop? Reach out and we'll sort
            you out.
          </p>
          <Link
            to="/contact"
            className="mt-3 inline-block rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
