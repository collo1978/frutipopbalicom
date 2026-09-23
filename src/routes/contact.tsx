import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fruti Pop Bali" },
      {
        name: "description",
        content:
          "Get in touch with Fruti Pop Bali about stockists, events and wholesale. Verified contact details are pending.",
      },
      { property: "og:title", content: "Contact — Fruti Pop Bali" },
      {
        property: "og:description",
        content: "Get in touch with Fruti Pop Bali.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Questions, wholesale enquiries or just want to say hi? Drop us a
            message.
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-muted-foreground/40 bg-muted p-4 text-sm text-muted-foreground">
            <strong>Setup pending:</strong> verified email address, phone number
            and social media links haven't been provided yet, so we've left them
            out rather than invent any. They'll be added here once confirmed.
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span aria-hidden>📧</span>
              <span className="text-muted-foreground">Email — pending verification</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>📱</span>
              <span className="text-muted-foreground">Phone / WhatsApp — pending verification</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>📸</span>
              <span className="text-muted-foreground">Instagram — pending verification</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>📍</span>
              <span className="text-muted-foreground">Bali, Indonesia</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <span className="text-5xl" aria-hidden>🍧</span>
              <h2 className="mt-4 text-xl font-bold">Thanks for reaching out!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This is a draft form — messages aren't delivered yet. A verified
                inbox will be connected before launch.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 rounded-full border-2 border-primary px-5 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="text-sm font-semibold">Name</label>
                <input
                  id="name"
                  required
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="topic" className="text-sm font-semibold">Topic</label>
                <select
                  id="topic"
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>General question</option>
                  <option>Wholesale / stocking Fruti Pop</option>
                  <option>Events & catering</option>
                  <option>Press</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
              >
                Send Message
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Draft form — delivery pending verified inbox.
              </p>
            </form>
          )}
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Looking for stockists instead? <Link to="/where-to-buy" className="font-semibold text-primary underline">Where to Buy</Link>
      </p>
    </div>
  );
}
