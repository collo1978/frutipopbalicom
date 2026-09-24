import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logo from "@/assets/fruti-pop-logo.png.asset.json";
import { WhatsAppIcon } from "@/components/site";
import { OCCASIONS } from "@/lib/occasions";
import { CONTACT, SNOWWAVE, waLink } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/flavours", label: "Flavours" },
  { to: "/packs", label: "Packs & Orders" },
  { to: "/occasions", label: "Occasions" },
  { to: "/where-to-find-us", label: "Where to Find Us" },
  { to: "/our-story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

const linkCls = "rounded-full px-3 py-2 text-sm font-bold text-foreground/80 transition-colors hover:bg-secondary hover:text-accent";
const activeCls = { className: "bg-secondary text-accent" };

function OccasionsMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <div className="flex items-center">
        <Link to="/occasions" className={linkCls} activeProps={activeCls}>Occasions</Link>
        <button aria-label="Show occasions" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)} className="-ml-2 rounded-full px-1.5 py-2 text-xs text-accent">▾</button>
      </div>
      {open && (
        <ul className="absolute left-0 top-full z-50 w-60 rounded-2xl border bg-card p-2 shadow-xl">
          {OCCASIONS.map((o) => (
            <li key={o.slug}>
              <Link to={`/occasions/${o.slug}`} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-secondary" activeProps={activeCls}>{o.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-coconut/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Fruti Pop Bali home">
          <img src={logo.url} alt="Fruti Pop" className="h-12 w-auto" />
        </Link>
        <nav aria-label="Main" className="hidden items-center lg:flex">
          {NAV.map((item) =>
            item.to === "/occasions" ? <OccasionsMenu key={item.to} /> : (
              <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className={linkCls} activeProps={activeCls}>{item.label}</Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow">
            <WhatsAppIcon className="h-4 w-4" /> Order<span className="sr-only"> on WhatsApp</span>
          </a>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
            <span aria-hidden className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[80vh] overflow-y-auto border-t bg-coconut px-4 pb-4 lg:hidden">
          {NAV.map((item) => (
            <div key={item.to}>
              <Link to={item.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} className="block rounded-xl px-3 py-3 font-bold" activeProps={activeCls}>{item.label}</Link>
              {item.to === "/occasions" && OCCASIONS.map((o) => (
                <Link key={o.slug} to={`/occasions/${o.slug}`} onClick={() => setOpen(false)} className="block rounded-xl py-2 pl-8 text-sm font-semibold text-foreground/80" activeProps={activeCls}>{o.label}</Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 bg-palm text-accent-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="Fruti Pop" className="h-14 w-auto" />
          <p className="mt-3 text-sm opacity-90">Little pops. Big smiles. Fruity sorbet pops in Bali.</p>
        </div>
        <div>
          <p className="font-display font-semibold text-mango">Explore</p>
          <ul className="mt-2 space-y-1 text-sm">
            {NAV.map((i) => <li key={i.to}><Link to={i.to} className="opacity-90 hover:underline">{i.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-mango">Get in touch</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp {CONTACT.phoneDisplay}</a></li>
            <li><a href={CONTACT.phoneHref} className="hover:underline">Call us</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-mango">Sister business</p>
          <a href={SNOWWAVE.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm hover:underline">
            {SNOWWAVE.label} {SNOWWAVE.blurb} ↗
          </a>
        </div>
      </div>
      <p className="border-t border-accent-foreground/20 py-4 text-center text-xs opacity-80">© {new Date().getFullYear()} Fruti Pop Bali</p>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fruti Pop Bali — Tropical Fruit Sorbet Pops" },
      {
        name: "description",
        content:
          "Fruti Pop Bali makes bright, real-fruit sorbet pops in Bali. Family packs, parties, schools, events and villas.",
      },
      { property: "og:title", content: "Fruti Pop Bali — Tropical Fruit Sorbet Pops" },
      {
        property: "og:description",
        content:
          "Real tropical fruit sorbet pops made in Bali. Explore flavours and find where to buy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
