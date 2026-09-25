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
import { CONTACT, SNOWWAVE, waLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/order", label: "Order" },
  { to: "/our-story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

const FOOTER_NAV = NAV;

const linkCls = "rounded-full px-3 py-2 text-sm font-bold text-foreground/80 transition-colors hover:bg-secondary hover:text-accent";
const activeCls = { className: "bg-secondary text-accent" };

const SOCIAL = [
  { href: "https://www.instagram.com/frutipop_bali", label: "Fruti Pop Bali on Instagram", brand: "instagram" },
  { href: "https://www.facebook.com/profile.php?id=61589503270373", label: "Fruti Pop Bali on Facebook", brand: "facebook" },
] as const;

function SocialBrandIcon({ brand, className = "h-6 w-6" }: { brand: "instagram" | "facebook"; className?: string }) {
  if (brand === "instagram") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
        <defs>
          <linearGradient id="instagram-gradient" x1="3" y1="29" x2="29" y2="3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600" />
            <stop offset="0.45" stopColor="#FF0169" />
            <stop offset="1" stopColor="#D300C5" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#instagram-gradient)" />
        <rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="white" strokeWidth="2.2" />
        <circle cx="16" cy="16" r="3.8" fill="none" stroke="white" strokeWidth="2.2" />
        <circle cx="22" cy="10.4" r="1.35" fill="white" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="16" fill="#1877F2" />
      <path fill="white" d="M18.4 27V17.1h3.3l.5-3.9h-3.8v-2.5c0-1.1.3-1.9 1.9-1.9h2V5.3c-.4 0-1.6-.2-3-.2-3 0-5.1 1.9-5.1 5.3v2.9h-3.4v3.9h3.4V27h4.2Z" />
    </svg>
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
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className={linkCls} activeProps={activeCls}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {SOCIAL.map(({ href, label, brand }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105 sm:h-10 sm:w-10"><SocialBrandIcon brand={brand} className="h-6 w-6" /></a>
            ))}
          </div>
          <Button asChild className="min-h-10 rounded-full px-3 font-bold sm:px-4"><Link to="/order" onClick={() => setOpen(false)}>Order Now</Link></Button>
          <Button type="button" variant="outline" size="icon" className="h-10 w-10 rounded-full lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
            <span aria-hidden className="text-xl">{open ? "✕" : "☰"}</span>
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[80vh] overflow-y-auto border-t bg-coconut px-4 pb-4 lg:hidden">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} className="block rounded-xl px-3 py-3 font-bold" activeProps={activeCls}>{item.label}</Link>
          ))}
          <div className="mt-2 flex gap-3 border-t px-3 pt-4">
            {SOCIAL.map(({ href, label, brand }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary"><SocialBrandIcon brand={brand} className="h-7 w-7" /></a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-palm text-accent-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="Fruti Pop" className="h-14 w-auto" />
          <p className="mt-3 text-sm opacity-90">Fruit-packed sorbet pops for kids & grown-ups.</p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=61589503270373"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fruti Pop Bali on Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-foreground/10 transition-colors hover:bg-accent-foreground/20"
            >
              <SocialBrandIcon brand="facebook" className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/frutipop_bali"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fruti Pop Bali on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-foreground/10 transition-colors hover:bg-accent-foreground/20"
            >
              <SocialBrandIcon brand="instagram" className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-mango">Explore</p>
          <ul className="mt-2 space-y-1 text-sm">
            {FOOTER_NAV.map((i) => <li key={i.to}><Link to={i.to} className="opacity-90 hover:underline">{i.label}</Link></li>)}
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
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full"
          >
            Try again
          </Button>
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
      { title: "Fruti Pop Bali | Tropical Fruit Sorbet Pops" },
      {
        name: "description",
        content:
          "Fruti Pop Bali makes bright, real-fruit sorbet pops in Bali. Family packs, parties, schools, events and villas.",
      },
      { property: "og:title", content: "Fruti Pop Bali | Tropical Fruit Sorbet Pops" },
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
