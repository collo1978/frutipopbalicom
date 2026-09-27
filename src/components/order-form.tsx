import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Copy, Minus, PartyPopper, Plus, RefreshCw } from "lucide-react";
import { BestSellerBadge, MysteryPopIdle, SeeThePopButton, SwipeRow, TubeViewer } from "@/components/order-sections";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  family: { name: "Family Pack", limit: 10, price: "Rp250,000", amount: 250000 },
  jumbo: { name: "Jumbo Pack", limit: 20, price: "Rp485,000", amount: 485000 },
} as const;

/** Normal price for one extra Pop. Not yet confirmed by Fruti Pop: set a number (e.g. 25000) to enable extra charges. */
const EXTRA_POP_PRICE: number | null = null;
const rupiah = (n: number) => `Rp${n.toLocaleString("en-US")}`;

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

export function OrderForm({ initialPack, openMystery = false }: { initialPack: PackKey | undefined; openMystery?: boolean | undefined }) {
  const [packKey, setPackKey] = useState<PackKey | undefined>(initialPack);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => Object.fromEntries(FLAVOURS.map((f) => [f.name, 0])));
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

  const total = useMemo(() => Object.values(quantities).reduce((sum, value) => sum + value, 0), [quantities]);
  // Best pricing: a Family Pack reaching 20 Pops automatically becomes a Jumbo Pack (and reverts below 20).
  const effectiveKey: PackKey | undefined = packKey === "family" && total >= PACKS.jumbo.limit ? "jumbo" : packKey;
  const pack = effectiveKey ? PACKS[effectiveKey] : undefined;
  const extraTotal = pack ? Math.max(0, total - pack.limit) : 0;
  const complete = Boolean(pack && total >= pack.limit);
  const extraCharge = EXTRA_POP_PRICE != null ? extraTotal * EXTRA_POP_PRICE : null;
  const orderTotal = pack ? (extraTotal === 0 ? pack.price : extraCharge != null ? rupiah(pack.amount + extraCharge) : `${pack.price} + ${extraTotal} extra ${extraTotal === 1 ? "Pop" : "Pops"} (price to be confirmed)`) : "";
  const extraChargeLabel = extraCharge != null ? rupiah(extraCharge) : "Price to be confirmed";

  const [upgradeNotice, setUpgradeNotice] = useState(false);
  const prevKey = useRef(effectiveKey);
  useEffect(() => {
    if (packKey === "family" && prevKey.current === "family" && effectiveKey === "jumbo") {
      setUpgradeNotice(true);
      const t = window.setTimeout(() => setUpgradeNotice(false), 4500);
      prevKey.current = effectiveKey;
      return () => window.clearTimeout(t);
    }
    if (effectiveKey !== "jumbo") setUpgradeNotice(false);
    prevKey.current = effectiveKey;
    return undefined;
  }, [effectiveKey, packKey]);

  useEffect(() => {
    setPackKey(initialPack);
  }, [initialPack]);

  const choosePack = (next: PackKey) => {
    setPackKey(next);
    setErrors((current) => ({ ...current, pack: "", quantities: "" }));
  };

  const changeQuantity = (flavour: string, amount: number) => {
    if (!pack) {
      setErrors((current) => ({ ...current, pack: "Choose a pack first." }));
      return;
    }
    const currentValue = quantities[flavour] ?? 0;
    if (amount < 0 && currentValue === 0) return;
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

    const packLines = FLAVOURS.filter((f) => (quantities[f.name] ?? 0) > 0).map((flavour) => `${flavourEmoji[flavour.name]} ${flavour.name} Sorbet: ${quantities[flavour.name]} pcs`);
    const message = [
      "Hi Fruti Pop 👋",
      "",
      "I'd like to place an order:",
      "",
      `Pack: ${pack.name}`,
      "",
      ...packLines,
      "",
      `📦 Total Order: ${total} pcs`,
      `💰 ${pack.name} (${pack.limit} Pops): ${pack.price}`,
      ...(extraTotal ? [`➕ ${extraTotal} Extra ${extraTotal === 1 ? "Pop" : "Pops"}: ${extraChargeLabel}`] : []),
      `🧾 Total: ${orderTotal}`,
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
  const [choiceOpen, setChoiceOpen] = useState(false);
  const previousTotal = useRef(total);
  useEffect(() => {
    if (pack && previousTotal.current < pack.limit && total >= pack.limit) setChoiceOpen(true);
    previousTotal.current = total;
  }, [pack, total]);
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
  useEffect(() => {
    mounted.current = true;
    if (initialPack && !openMystery) {
      const t = window.setTimeout(() => flavourRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, []);

  const mysteryRef = useRef<HTMLDivElement>(null);
  const mysteryHandled = useRef(false);
  const [mysteryHighlight, setMysteryHighlight] = useState(false);
  useEffect(() => {
    if (!showFlavours || !openMystery || mysteryHandled.current) return;
    mysteryHandled.current = true;
    window.setTimeout(() => {
      mysteryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setMysteryHighlight(true);
      window.setTimeout(() => setMysteryHighlight(false), 3500);
    }, 350);
  }, [showFlavours, openMystery]);

  const [viewTube, setViewTube] = useState<OrderFlavour | null>(null);
  const remaining = pack ? Math.max(0, pack.limit - total) : 0;
  const goDelivery = () => {
    setChoiceOpen(false);
    if (reached.delivery) scrollTo(deliveryRef.current);
    else setReached((r) => ({ ...r, delivery: true }));
  };
  const goFlavours = () => { setChoiceOpen(false); window.setTimeout(() => flavourRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250); };
  const goMystery = () => {
    setChoiceOpen(false);
    window.setTimeout(() => {
      mysteryRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      setMysteryHighlight(true);
      window.setTimeout(() => setMysteryHighlight(false), 3000);
    }, 250);
  };

  const fieldError = (key: string) => errors[key] ? <p className="mt-1 text-sm font-semibold text-destructive">{errors[key]}</p> : null;
  const legend = "scroll-mt-24 font-display text-3xl font-extrabold text-accent md:text-4xl";

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
          <div ref={trackerSentinel} aria-hidden="true" className="h-px" />
          <div className={cn("sticky z-40 mt-3 rounded-xl border border-primary/20 bg-leaf/95 shadow-md backdrop-blur transition-all duration-200", stuck ? "px-2.5 py-1.5 sm:px-4 sm:py-2" : "px-3 py-2.5 sm:px-4 sm:py-3", complete && "ring-2 ring-primary/30")} style={{ top: headerH }} aria-live="polite">
            <p className={cn("font-bold leading-tight text-accent", stuck ? "text-xs sm:text-sm" : "text-sm sm:text-base")}>
              {extraTotal > 0
                ? <>Your {pack.name} · {total} Pops · <span className="text-primary">Pack complete ✓</span></>
                : <>Your {pack.name} · {total}/{pack.limit} · {complete ? <span className="text-primary">Pack full! 🎉</span> : <span>{remaining} to go!</span>}</>}
            </p>
            {total > 0 && (
              <ul aria-label="Flavours in your pack" className={cn("flex flex-wrap items-center gap-x-3 gap-y-0.5", stuck ? "mt-0.5" : "mt-1.5")}>
                {ORDER_FLAVOURS.filter((flavour) => (quantities[flavour.name] ?? 0) > 0).map((flavour) => (
                  <li key={flavour.name} title={flavour.name} aria-label={`${flavour.name} × ${quantities[flavour.name]}`} className="flex items-center gap-0.5 text-xs font-extrabold text-accent sm:text-sm">
                    <FruitIcon name={flavour.name} className={cn("shrink-0", stuck ? "h-5 w-5 sm:h-6 sm:w-6" : "h-6 w-6 sm:h-7 sm:w-7")} />
                    <span>×{quantities[flavour.name]}</span>
                  </li>
                ))}
              </ul>
            )}
            <progress value={Math.min(total, pack.limit)} max={pack.limit} aria-label="Pack completion" className={cn("order-progress w-full overflow-hidden rounded-full", stuck ? "mt-1 h-1" : "mt-1.5 h-1.5 sm:h-2")} />
            {upgradeNotice && (
              <p role="status" className="order-step-reveal mt-1.5 text-xs font-bold text-primary sm:text-sm">🎉 You've unlocked the Jumbo Pack! <span className="font-semibold text-leaf-foreground">We've automatically applied the better 20-Pop price.</span></p>
            )}
          </div>
          <div className="mt-3" style={{ scrollMarginTop: headerH + 90 }}>
            <SwipeRow count={ORDER_FLAVOURS.length + 1} label="Pick your flavours" tightTop desktopClass="md:grid md:grid-cols-3 md:gap-5 xl:grid-cols-4" itemClass="w-[64%] md:w-auto">
              {[
                ...ORDER_FLAVOURS.map((flavour) => {
                  const quantity = quantities[flavour.name] ?? 0;
                  return (
                    <div key={flavour.name} className={`flavour-pop relative flex h-full flex-col overflow-hidden rounded-3xl ${flavour.tint}`}>
                      <div className="flex h-8 items-center justify-center pt-1.5 md:h-10 md:pt-2">
                        {flavour.name === "Strawberry" && <BestSellerBadge />}
                      </div>
                      {flavour.art && (
                        <img src={flavour.art} alt={`Original Fruti Pop ${flavour.name} sorbet artwork`} loading="lazy" draggable={false} className="aspect-[2/3] w-full select-none object-cover" />
                      )}
                      <div className="flex flex-1 flex-col items-center px-2 pb-3 pt-2 text-center md:px-3 md:pb-4 md:pt-3">
                        <h3 className="font-display text-lg font-extrabold text-accent md:text-2xl">{flavour.name}</h3>
                        <div className="mt-auto flex items-center gap-1.5 pt-2 md:gap-2 md:pt-3">
                          <Button type="button" variant="secondary" size="icon" onClick={() => changeQuantity(flavour.name, -1)} disabled={quantity === 0} aria-label={`Remove one ${flavour.name}`} className="h-10 w-10 rounded-full"><Minus /></Button>
                          <output aria-label={`${flavour.name} quantity`} className="w-7 text-center text-lg font-bold">{quantity}</output>
                          <Button type="button" size="icon" onClick={() => changeQuantity(flavour.name, 1)} aria-label={`Add one ${flavour.name}`} className="h-10 w-10 rounded-full"><Plus /></Button>
                          <span aria-hidden="true" className="mx-1 h-7 w-px bg-accent/25" />
                          <SeeThePopButton name={flavour.name} onClick={() => setViewTube(flavour)} />
                        </div>
                      </div>
                    </div>
                  );
                }),
                <div key="mystery" ref={mysteryRef} className={cn("h-full rounded-3xl transition-shadow duration-300", mysteryHighlight && "ring-4 ring-primary ring-offset-4 ring-offset-card")}>
                  <MysteryPop onAdd={(n) => changeQuantity(n, 1)} />
                </div>,
              ]}
            </SwipeRow>
          </div>
          {total > 0 && (
            <div className="mt-4 rounded-xl bg-leaf p-4 text-sm text-leaf-foreground">
              <p className="font-bold text-accent">Your selection</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-accent">{FLAVOURS.filter((f) => (quantities[f.name] ?? 0) > 0).map((f) => <li key={f.name} className="rounded-md bg-card px-2 py-1">{f.name} × {quantities[f.name]}</li>)}</ul>
              <dl className="mt-3 grid gap-1">
                <div className="flex justify-between gap-3"><dt>{pack.name} · {pack.limit} Pops</dt><dd className="font-bold">{pack.price}</dd></div>
                {extraTotal > 0 && <div className="flex justify-between gap-3"><dt>+ {extraTotal} Extra {extraTotal === 1 ? "Pop" : "Pops"}</dt><dd className="font-bold">{extraChargeLabel}</dd></div>}
                <div className="flex justify-between gap-3 border-t border-accent/15 pt-1"><dt>Total Pops</dt><dd className="font-bold">{total}</dd></div>
                <div className="flex justify-between gap-3"><dt className="font-bold">Total</dt><dd className="text-right font-bold text-accent">{complete ? orderTotal : `${remaining} more to complete your pack`}</dd></div>
              </dl>
            </div>
          )}
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
              <div className="flex justify-between gap-3"><dt>Pack</dt><dd className="font-bold">{pack ? `${pack.name} · ${pack.limit} Pops` : "Not selected"}</dd></div>
              <div className="flex justify-between gap-3"><dt>Pack price</dt><dd className="font-bold">{pack?.price ?? "Not selected"}</dd></div>
              {extraTotal > 0 && <div className="flex justify-between gap-3"><dt>{extraTotal} Extra {extraTotal === 1 ? "Pop" : "Pops"}</dt><dd className="font-bold">{extraChargeLabel}</dd></div>}
              <div className="flex justify-between gap-3"><dt>Total pops</dt><dd className="font-bold">{total}</dd></div>
              <div className="flex justify-between gap-3"><dt>Payment</dt><dd className="font-bold">{payment ?? "Not selected"}</dd></div>
              <div className="flex justify-between gap-3"><dt className="font-bold">Total</dt><dd className="text-right font-bold text-accent">{orderTotal}</dd></div>
            </dl>
            <div className="mt-3">
              <p className="text-xs font-bold uppercase text-muted-foreground">Flavours</p>
              <ul className="mt-1 flex flex-wrap gap-2 text-xs font-bold text-accent">{FLAVOURS.filter((f) => (quantities[f.name] ?? 0) > 0).map((f) => <li key={f.name} className="rounded-md bg-secondary px-2 py-1">{f.name} × {quantities[f.name]}</li>)}</ul>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Delivery fee and final total confirmed on WhatsApp.</p>
            {Object.values(errors).some(Boolean) && <p className="mt-3 text-sm font-semibold text-destructive">Please check the highlighted details above.</p>}
            <Button type="submit" size="lg" className="mt-5 min-h-12 w-full rounded-full text-base font-bold">Send Order on WhatsApp</Button>
          </section>
        </div>
      )}

      <TubeViewer tube={viewTube} onClose={() => setViewTube(null)} />
      <Dialog open={choiceOpen} onOpenChange={setChoiceOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-3xl bg-card p-6 text-center">
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="font-display text-2xl font-extrabold text-accent">Your pack is full! 🎉</DialogTitle>
            <DialogDescription className="font-semibold">Ready to check out, or fancy adding a few more Pops?</DialogDescription>
          </DialogHeader>
          <div className="mt-2 grid gap-2.5">
            <Button type="button" size="lg" onClick={goDelivery} className="min-h-12 rounded-full text-base font-bold">Continue to Delivery →</Button>
            <Button type="button" size="lg" variant="outline" onClick={goFlavours} className="min-h-12 rounded-full text-base font-bold">Add More Flavours →</Button>
            <Button type="button" size="lg" variant="secondary" onClick={goMystery} className="min-h-12 rounded-full text-base font-bold">🎲 Pick a Mystery Pop →</Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}

function MysteryPop({ onAdd }: { onAdd: (name: string) => void }) {
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
    <div className="flavour-pop relative flex h-full min-h-[19rem] flex-col items-center overflow-hidden rounded-3xl bg-pastel-lavender px-2 pb-3 pt-3 md:min-h-[26rem] md:pb-4 md:pt-4 text-center">
      {phase === "idle" && (
        <MysteryPopIdle action={<Button type="button" size="sm" onClick={shuffle} className="cta-pop cta-pop-sm whitespace-nowrap rounded-full">PICK MY POP</Button>} />
      )}
      {phase === "shuffling" && (
        <div className="flex flex-1 flex-col items-center justify-center">
          {flavour.art && <img src={flavour.art} alt="" className="mystery-shuffle-img max-h-64 md:max-h-80 w-auto max-w-full select-none rounded-2xl object-contain opacity-80" draggable={false} />}
          <h3 className="mt-3 font-display text-lg font-extrabold text-accent">Shuffling...</h3>
        </div>
      )}
      {phase === "result" && (
        <>
          <div className="mystery-reveal flex flex-1 flex-col items-center justify-center">
            {flavour.art && <img src={flavour.art} alt={`Fruti Pop ${flavour.name} flavour artwork`} loading="lazy" draggable={false} className="max-h-64 w-auto max-w-full select-none rounded-2xl object-contain shadow-md md:max-h-96" />}
            <h3 className="mt-3 flex items-center gap-1.5 font-display text-lg font-extrabold text-accent" aria-live="polite"><PartyPopper className="h-5 w-5" aria-hidden="true" /> It's {flavour.name}!</h3>
            {flavour.tagline && <p className="text-xs font-semibold text-foreground/70">{flavour.tagline}</p>}
          </div>
          <div className="mt-auto flex w-full flex-col gap-2 pt-2">
            <Button type="button" size="sm" onClick={() => onAdd(flavour.name)} className="h-auto min-h-9 whitespace-normal rounded-full">+ Add {flavour.name} to My Pack</Button>
            <Button type="button" size="sm" variant="outline" onClick={shuffle} className="rounded-full"><RefreshCw /> Pick Again</Button>
          </div>
        </>
      )}
    </div>
  );
}
