import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Copy, Dices, Eye, Minus, PartyPopper, Plus, RefreshCw, X } from "lucide-react";
import { SwipeRow } from "@/components/order-sections";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FLAVOURS } from "@/lib/flavours";
import { ORDER_FLAVOURS, type OrderFlavour } from "@/lib/order-flavours";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export type PackKey = "family" | "jumbo";

const PACKS = {
  family: { name: "Family Pack", limit: 10, price: "Rp250,000" },
  jumbo: { name: "Jumbo Pack", limit: 20, price: "Rp485,000" },
} as const;

const flavourEmoji: Record<string, string> = {
  Strawberry: "🍓",
  Mango: "🥭",
  Pineapple: "🍍",
  "Piña Colada": "🥥",
  "Passion Fruit": "💜",
  Soursop: "💚",
};

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name is too long."),
  phone: z.string().trim().regex(/^\+?[0-9][0-9\s()-]{6,20}$/, "Enter a valid phone number with country code."),
  address: z.string().trim().min(8, "Enter your delivery address.").max(400, "Address is too long."),
  maps: z.union([
    z.literal(""),
    z.string().trim().url("Paste a valid Google Maps link.").max(500).refine((value) => {
      const hostname = new URL(value).hostname.toLowerCase();
      return hostname === "maps.app.goo.gl" || hostname === "goo.gl" || hostname === "maps.google.com" || hostname.endsWith(".google.com");
    }, "Paste a valid Google Maps link."),
  ]),
  time: z.string().min(1, "Choose a delivery time."),
  payment: z.enum(["Bank Transfer", "Cash on Delivery"], { required_error: "Choose a payment method." }),
  notes: z.string().max(800, "Notes are too long."),
});

const BALI_TIME_ZONE = "Asia/Makassar";
const TIME_OPTIONS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function baliToday() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: BALI_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function baliCurrentTime() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: BALI_TIME_ZONE, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

export function OrderForm({ initialPack }: { initialPack: PackKey | undefined }) {
  const [packKey, setPackKey] = useState<PackKey | undefined>(initialPack);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => Object.fromEntries(FLAVOURS.map((f) => [f.name, 0])));
  const [extraQuantities, setExtraQuantities] = useState<Record<string, number>>(() => Object.fromEntries(FLAVOURS.map((f) => [f.name, 0])));
  const [extrasEnabled, setExtrasEnabled] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+62");
  const [address, setAddress] = useState("");
  const [maps, setMaps] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState<string>();
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const pack = packKey ? PACKS[packKey] : undefined;
  const total = useMemo(() => Object.values(quantities).reduce((sum, value) => sum + value, 0), [quantities]);
  const extraTotal = useMemo(() => Object.values(extraQuantities).reduce((sum, value) => sum + value, 0), [extraQuantities]);
  const complete = Boolean(pack && total >= pack.limit);

  useEffect(() => {
    setPackKey(initialPack);
  }, [initialPack]);

  const choosePack = (next: PackKey) => {
    const nextLimit = PACKS[next].limit;
    setPackKey(next);
    setExtrasEnabled(false);
    setExtraQuantities(Object.fromEntries(FLAVOURS.map((flavour) => [flavour.name, 0])));
    setErrors((current) => ({ ...current, pack: "", quantities: "" }));
    if (total <= nextLimit) return;
    let remaining = nextLimit;
    setQuantities(Object.fromEntries(FLAVOURS.map((flavour) => {
      const kept = Math.min(quantities[flavour.name] ?? 0, remaining);
      remaining -= kept;
      return [flavour.name, kept];
    })));
  };

  const changeQuantity = (flavour: string, amount: number) => {
    if (!pack) {
      setErrors((current) => ({ ...current, pack: "Choose a pack first." }));
      return;
    }
    const currentValue = quantities[flavour] ?? 0;
    if (amount < 0 && currentValue === 0) return;
    if (amount > 0 && total >= pack.limit && !extrasEnabled) return;
    if (amount > 0 && total >= pack.limit) {
      setExtraQuantities((current) => ({ ...current, [flavour]: (current[flavour] ?? 0) + 1 }));
    } else if (amount < 0 && (extraQuantities[flavour] ?? 0) > 0) {
      setExtraQuantities((current) => ({ ...current, [flavour]: Math.max(0, (current[flavour] ?? 0) - 1) }));
    }
    setQuantities((current) => ({ ...current, [flavour]: Math.max(0, (current[flavour] ?? 0) + amount) }));
    setErrors((current) => ({ ...current, quantities: "" }));
  };

  const selectedDate = date ? format(date, "yyyy-MM-dd") : "";
  const isPastDate = (candidate: Date) => format(candidate, "yyyy-MM-dd") < baliToday();
  const timeIsPast = selectedDate === baliToday() && time && time <= baliCurrentTime();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!pack) nextErrors["pack"] = "Choose a pack.";
    if (!pack || total < pack.limit) nextErrors["quantities"] = pack ? `Choose at least ${pack.limit} pops.` : "Choose a pack first.";
    if (!date) nextErrors["date"] = "Choose a delivery date.";
    if (date && isPastDate(date)) nextErrors["date"] = "Choose today or a future date.";
    if (timeIsPast) nextErrors["time"] = "Choose a future time in Bali.";

    const details = detailsSchema.safeParse({ name, phone, address, maps, time, payment, notes });
    if (!details.success) {
      for (const issue of details.error.issues) nextErrors[String(issue.path[0])] = issue.message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !pack || !date || !payment) return;

    const packLines = FLAVOURS.map((flavour) => {
      const packQuantity = (quantities[flavour.name] ?? 0) - (extraQuantities[flavour.name] ?? 0);
      return `${flavourEmoji[flavour.name]} ${flavour.name} Sorbet: ${packQuantity} pcs`;
    });
    const extraLines = FLAVOURS
      .filter((flavour) => (extraQuantities[flavour.name] ?? 0) > 0)
      .map((flavour) => `${flavourEmoji[flavour.name]} ${flavour.name} Sorbet: ${extraQuantities[flavour.name]} extra`);
    const message = [
      "Hi Fruti Pop 👋",
      "",
      "I'd like to place an order:",
      "",
      `Pack: ${pack.name}`,
      "",
      ...packLines,
      ...(extraLines.length ? ["", "Extra Pops (price to be confirmed):", ...extraLines] : []),
      "",
      `📦 Total Order: ${total} pcs`,
      `💰 Pack Price: ${pack.price}`,
      ...(extraLines.length ? ["Extra Pop Price: To be confirmed"] : []),
      "",
      "Delivery Details:",
      "",
      `👤 Name: ${name.trim()}`,
      `📍 Address: ${address.trim()}`,
      `🗺️ Google Maps: ${maps.trim() || "Not provided"}`,
      `📱 Phone Number: ${phone.trim()}`,
      `📅 Preferred Date: ${format(date, "dd MMMM yyyy")}`,
      `🕒 Preferred Time: ${time} Bali time`,
      `💳 Payment Method: ${payment}`,
      "",
      `Additional Notes: ${notes.trim() || "None"}`,
      "",
      "Thank you!",
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  const deliveryValid = Boolean(
    detailsSchema.pick({ name: true, phone: true, address: true, maps: true, time: true }).safeParse({ name, phone, address, maps, time }).success
    && date && !isPastDate(date) && !timeIsPast,
  );
  const [reached, setReached] = useState({ delivery: false, payment: false });
  useEffect(() => {
    if (complete && !reached.delivery) setReached((r) => ({ ...r, delivery: true }));
  }, [complete, reached.delivery]);
  useEffect(() => {
    if (deliveryValid && reached.delivery && !reached.payment) setReached((r) => ({ ...r, payment: true }));
  }, [deliveryValid, reached.delivery, reached.payment]);
  const showFlavours = Boolean(pack);
  const showDelivery = showFlavours && reached.delivery;
  const showPayment = showDelivery && reached.payment;

  const flavourRef = useRef<HTMLFieldSetElement>(null);
  const deliveryRef = useRef<HTMLFieldSetElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const scrollTo = (el: HTMLElement | null) => {
    if (!mounted.current || !el) return;
    window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  useEffect(() => { if (showFlavours) scrollTo(flavourRef.current); }, [showFlavours]);
  useEffect(() => { if (showDelivery) scrollTo(deliveryRef.current); }, [showDelivery]);
  useEffect(() => { if (showPayment) scrollTo(paymentRef.current); }, [showPayment]);
  useEffect(() => { mounted.current = true; }, []);

  const [viewTube, setViewTube] = useState<OrderFlavour | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!viewTube) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setViewTube(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 30);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [viewTube]);
  const remaining = pack ? Math.max(0, pack.limit - total) : 0;
  const full = Boolean(pack && total >= pack.limit);

  const fieldError = (key: string) => errors[key] ? <p className="mt-1 text-sm font-semibold text-destructive">{errors[key]}</p> : null;
  const legend = "scroll-mt-24 font-display text-2xl font-extrabold text-accent md:text-3xl";

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <fieldset className="min-w-0 rounded-2xl border bg-card p-4 shadow-lg sm:p-6">
        <legend className="sr-only">1. Choose Your Pack</legend>
        <h2 className={legend} aria-hidden="true">1. Choose Your Pack</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(Object.keys(PACKS) as PackKey[]).map((key) => {
            const option = PACKS[key];
            const selected = packKey === key;
            return (
              <Button key={key} type="button" variant="outline" aria-pressed={selected} onClick={() => choosePack(key)} className={cn("relative h-auto min-h-28 justify-start rounded-xl p-4 text-left whitespace-normal", selected && "border-primary bg-leaf ring-2 ring-primary/20")}>
                <span className={cn("mr-2 h-5 w-5 shrink-0 rounded-full border-2 border-primary", selected && "border-[6px]")} />
                <span>
                  <span className="block font-bold text-foreground">{option.name}</span>
                  <span className="block text-sm text-muted-foreground">{option.limit} Pops</span>
                  <span className="block text-lg font-bold text-accent">{option.price}</span>
                </span>
                {key === "jumbo" && <span className="absolute right-2 top-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">Save Rp15,000!</span>}
              </Button>
            );
          })}
        </div>
        {fieldError("pack")}
      </fieldset>

      {showFlavours && pack && (
        <fieldset ref={flavourRef} className="min-w-0 order-step-reveal scroll-mt-24 rounded-2xl border bg-card p-4 shadow-lg sm:p-6">
          <legend className="sr-only">2. Pick Your Flavours</legend>
          <h2 className={legend} aria-hidden="true">2. Pick Your Flavours</h2>
          <p className="fruti-hint mt-1">See the Pop to meet the real tube!</p>
          <div className="mt-2">
            <SwipeRow count={ORDER_FLAVOURS.length + 1} label="Pick your flavours" tightTop desktopClass="md:grid md:grid-cols-4 md:gap-4 xl:grid-cols-7" itemClass="w-[78%]">
              {[
                ...ORDER_FLAVOURS.map((flavour) => {
                  const quantity = quantities[flavour.name] ?? 0;
                  return (
                    <div key={flavour.name} className={`flavour-pop relative flex h-full flex-col overflow-hidden rounded-3xl ${flavour.tint}`}>
                      <div className="relative w-full">
                        {flavour.art && (
                          <img src={flavour.art} alt={`Original Fruti Pop ${flavour.name} sorbet artwork`} loading="lazy" draggable={false} className="mx-auto aspect-[2/3] w-full max-w-[240px] select-none object-cover" />
                        )}
                        <button type="button" onClick={() => setViewTube(flavour)} aria-label={`See the actual Fruti Pop ${flavour.name} tube`} className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-accent shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" /> See the Pop
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-2 text-center">
                        <h3 className="font-display text-lg font-extrabold text-accent">{flavour.name}</h3>
                        <div className="mt-auto flex items-center gap-2 pt-2">
                          <Button type="button" variant="secondary" size="icon" onClick={() => changeQuantity(flavour.name, -1)} disabled={quantity === 0} aria-label={`Remove one ${flavour.name}`} className="h-10 w-10 rounded-full"><Minus /></Button>
                          <output aria-label={`${flavour.name} quantity`} className="w-7 text-center text-lg font-bold">{quantity}</output>
                          <Button type="button" size="icon" onClick={() => changeQuantity(flavour.name, 1)} disabled={full && !extrasEnabled} aria-label={`Add one ${flavour.name}`} className="h-10 w-10 rounded-full"><Plus /></Button>
                        </div>
                      </div>
                    </div>
                  );
                }),
                <MysteryPop key="mystery" full={full} extrasEnabled={extrasEnabled} onAdd={(n) => changeQuantity(n, 1)} />,
              ]}
            </SwipeRow>
          </div>
          <div className="mt-4 rounded-xl bg-leaf p-4" aria-live="polite">
            <p className="font-bold text-accent">
              {extraTotal > 0
                ? <>{pack.name} · {pack.limit} Pops + {extraTotal} {extraTotal === 1 ? "Extra" : "Extras"}</>
                : <>Your {pack.name} · {total} / {pack.limit} Pops {complete ? <span className="text-primary">· Complete!</span> : <span>· {remaining} more to go!</span>}</>}
            </p>
            <progress value={Math.min(total, pack.limit)} max={pack.limit} aria-label="Pack completion" className="order-progress mt-2 h-3 w-full overflow-hidden rounded-full" />
            {complete && (
              <div className="mt-3">
                <p className="flex items-center gap-2 font-bold text-primary" aria-label="Your pack is full!"><PartyPopper className="h-5 w-5" /> Your pack is full!</p>
                {!extrasEnabled ? (
                  <>
                    <p className="mt-1 text-sm font-semibold text-leaf-foreground">Want a few more? Add extra pops to your order.</p>
                    <Button type="button" size="sm" onClick={() => setExtrasEnabled(true)} className="mt-3 rounded-full"><Plus /> Add Extra Pops</Button>
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-sm font-semibold text-leaf-foreground">Extra pops are open. Add as many as you like.</p>
                    <p className="mt-1 text-sm font-semibold text-accent">One more? Let Mystery POP choose it.</p>
                  </>
                )}
              </div>
            )}
          </div>
          {fieldError("quantities")}
        </fieldset>
      )}

      {showDelivery && (
        <fieldset ref={deliveryRef} className="min-w-0 order-step-reveal scroll-mt-24 rounded-2xl border bg-card p-4 shadow-lg sm:p-6">
          <legend className="sr-only">3. Delivery Details</legend>
          <h2 className={legend} aria-hidden="true">3. Delivery Details</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">Your Name *<Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoComplete="name" className="mt-1 h-11" />{fieldError("name")}</label>
            <label className="text-sm font-bold">Phone Number *<Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={22} autoComplete="tel" className="mt-1 h-11" />{fieldError("phone")}</label>
            <label className="text-sm font-bold sm:col-span-2">Delivery Address *<Textarea value={address} onChange={(e) => setAddress(e.target.value)} maxLength={400} rows={3} placeholder="Villa, hotel, street and area" className="mt-1" />{fieldError("address")}</label>
            <label className="text-sm font-bold sm:col-span-2">Google Maps Location<Input type="url" value={maps} onChange={(e) => setMaps(e.target.value)} maxLength={500} placeholder="Paste your Google Maps link" className="mt-1 h-11" />{fieldError("maps")}</label>
            <div className="text-sm font-bold">
              Preferred Delivery Date *
              <Popover>
                <PopoverTrigger asChild><Button type="button" variant="outline" className={cn("mt-1 h-11 w-full justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon />{date ? format(date, "PPP") : "Select date"}</Button></PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={date} onSelect={setDate} disabled={isPastDate} className="pointer-events-auto p-3" /></PopoverContent>
              </Popover>
              {fieldError("date")}
            </div>
            <label className="text-sm font-bold">Preferred Delivery Time *
              <select value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring md:text-sm">
                <option value="">Select time</option>
                {TIME_OPTIONS.map((option) => <option key={option} value={option} disabled={selectedDate === baliToday() && option <= baliCurrentTime()}>{option}</option>)}
              </select>
              {fieldError("time")}
            </label>
            <label className="text-sm font-bold sm:col-span-2">Additional Notes (optional)<Textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={800} rows={3} placeholder="Delivery instructions or special requests" className="mt-1" />{fieldError("notes")}</label>
          </div>
          {!showPayment && <p className="mt-3 text-sm text-muted-foreground">Fill in the required details (*) to choose how you'd like to pay.</p>}
        </fieldset>
      )}

      {showPayment && (
        <div ref={paymentRef} className="order-step-reveal scroll-mt-24 space-y-6">
          <fieldset className="min-w-0 rounded-2xl border bg-card p-4 shadow-lg sm:p-6">
            <legend className="sr-only">4. Payment Method</legend>
            <h2 className={legend} aria-hidden="true">4. Payment Method</h2>
            <RadioGroup value={payment ?? ""} onValueChange={setPayment} className="mt-3">
              {["Bank Transfer", "Cash on Delivery"].map((method) => <label key={method} className="flex cursor-pointer items-center gap-3 text-sm font-semibold"><RadioGroupItem value={method} />{method}</label>)}
            </RadioGroup>
            {fieldError("payment")}
            {payment === "Bank Transfer" && (
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-leaf p-3 text-sm text-leaf-foreground">
                <p><strong>Bank: Mandiri</strong><br />Account Name: Nuansa Fruit Bali<br /><span className="font-bold">Account Number: 1750004760129</span></p>
                <Button type="button" variant="outline" size="sm" onClick={async () => { await navigator.clipboard.writeText("1750004760129"); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }}><Copy />{copied ? "Copied" : "Copy"}</Button>
              </div>
            )}
          </fieldset>

          <section className="rounded-2xl border bg-muted p-5 shadow-lg" aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading" className="text-xl font-bold text-accent">Order Summary</h2>
            <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3"><dt>Selected pack</dt><dd className="font-bold">{pack?.name ?? "Not selected"}</dd></div>
              <div className="flex justify-between gap-3"><dt>Pack price</dt><dd className="font-bold">{pack?.price ?? "Not selected"}</dd></div>
              <div className="flex justify-between gap-3"><dt>Total pops</dt><dd className="font-bold">{total}</dd></div>
              <div className="flex justify-between gap-3"><dt>Payment</dt><dd className="font-bold">{payment ?? "Not selected"}</dd></div>
            </dl>
            <div className="mt-3">
              <p className="text-xs font-bold uppercase text-muted-foreground">Pack flavours</p>
              <ul className="mt-1 flex flex-wrap gap-2 text-xs font-bold text-accent">{FLAVOURS.filter((f) => (quantities[f.name] ?? 0) - (extraQuantities[f.name] ?? 0) > 0).map((f) => <li key={f.name} className="rounded-md bg-secondary px-2 py-1">{f.name} × {(quantities[f.name] ?? 0) - (extraQuantities[f.name] ?? 0)}</li>)}</ul>
            </div>
            {extraTotal > 0 && (
              <div className="mt-3 rounded-lg bg-leaf p-3">
                <p className="text-xs font-bold uppercase text-leaf-foreground">Extra pops · Price to be confirmed</p>
                <ul className="mt-1 flex flex-wrap gap-2 text-xs font-bold text-accent">{FLAVOURS.filter((f) => (extraQuantities[f.name] ?? 0) > 0).map((f) => <li key={f.name} className="rounded-md bg-card px-2 py-1">{f.name} × {extraQuantities[f.name]}</li>)}</ul>
              </div>
            )}
            <p className="mt-3 text-sm text-muted-foreground">Delivery fee and final total confirmed on WhatsApp.</p>
            {Object.values(errors).some(Boolean) && <p className="mt-3 text-sm font-semibold text-destructive">Please check the highlighted details above.</p>}
            <Button type="submit" size="lg" className="mt-5 min-h-12 w-full rounded-full text-base font-bold">Send Order on WhatsApp</Button>
          </section>
        </div>
      )}

      {viewTube && (
        <div role="dialog" aria-modal="true" aria-label={`The real Fruti Pop ${viewTube.name} tube`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={() => setViewTube(null)}>
          <div className="relative" onClick={(event) => event.stopPropagation()}>
            <div className="flex flex-col items-center">
              {viewTube.img && <img src={viewTube.img} alt={`The real Fruti Pop ${viewTube.name} sorbet tube`} className="max-h-[76vh] w-auto max-w-[84vw] rounded-2xl bg-white object-contain shadow-2xl" />}
              <p className="mt-3 text-center text-sm font-bold text-white">{viewTube.name} · 100g tube</p>
            </div>
            <button ref={closeRef} type="button" onClick={() => setViewTube(null)} aria-label="Close tube preview" className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function MysteryPop({ full, extrasEnabled, onAdd }: { full: boolean; extrasEnabled: boolean; onAdd: (name: string) => void }) {
  const [phase, setPhase] = useState<"idle" | "shuffling" | "result">("idle");
  const [index, setIndex] = useState(0);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const shuffle = () => {
    if (phase === "shuffling") return;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setPhase("shuffling");
    const final = Math.floor(Math.random() * ORDER_FLAVOURS.length);
    const steps = 12;
    let delay = 0;
    for (let i = 0; i < steps; i++) {
      delay += 70 + i * 12;
      const idx = i === steps - 1 ? final : (final + i + 1) % ORDER_FLAVOURS.length;
      timers.current.push(window.setTimeout(() => setIndex(idx), delay));
    }
    timers.current.push(window.setTimeout(() => setPhase("result"), delay + 120));
  };

  const flavour = ORDER_FLAVOURS[index];
  if (!flavour) return null;
  return (
    <div className="flavour-pop relative flex h-full flex-col items-center rounded-3xl bg-accent/15 px-3 pb-4 pt-4 text-center">
      <div className="relative h-64 w-full md:h-52">
        {phase === "idle" && (
          <button type="button" onClick={shuffle} aria-label="Reveal a Mystery POP flavour" className="flex h-full w-full items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40">
            <span aria-hidden="true" className="flex h-32 w-32 items-center justify-center rounded-full bg-accent font-display text-7xl font-extrabold text-accent-foreground shadow-lg transition-transform hover:scale-110 hover:rotate-6 md:h-28 md:w-28">?</span>
          </button>
        )}
        {phase === "shuffling" && flavour.img && (
          <img src={flavour.img} alt="" className="mystery-shuffle-img absolute inset-0 h-full w-full object-contain opacity-80" />
        )}
        {phase === "result" && (
          <div className="mystery-reveal absolute inset-0 flex items-center justify-center overflow-hidden">
            {flavour.img && <img src={flavour.img} alt={`Fruti Pop ${flavour.name} sorbet pack`} className="h-full w-full object-contain" />}
          </div>
        )}
      </div>
      <h3 className="mt-2 font-display text-lg font-extrabold text-accent" aria-live="polite">
        {phase === "result" ? `It's ${flavour.name}!` : phase === "shuffling" ? "Shuffling..." : "Mystery POP"}
      </h3>
      {phase !== "result" ? (
        <>
          <p className="text-xs font-semibold text-foreground/70">Can't decide? Let fate pick!</p>
          <Button type="button" size="sm" onClick={shuffle} disabled={phase === "shuffling"} className="mt-auto rounded-full">Tap to reveal</Button>
        </>
      ) : (
        <div className="mt-auto flex w-full flex-col gap-2 pt-2">
          <Button type="button" size="sm" onClick={() => onAdd(flavour.name)} disabled={full && !extrasEnabled} className="h-auto min-h-9 whitespace-normal rounded-full">+ Add {flavour.name} to My Pack</Button>
          <Button type="button" size="sm" variant="outline" onClick={shuffle} className="rounded-full"><RefreshCw /> Pick Again</Button>
        </div>
      )}
    </div>
  );
}
