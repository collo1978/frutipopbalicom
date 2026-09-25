import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, Copy, Minus, Plus } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FLAVOURS } from "@/lib/flavours";
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
  maps: z.union([z.literal(""), z.string().trim().url("Paste a valid Google Maps link.").max(500)]),
  time: z.string().min(1, "Choose a delivery time."),
  payment: z.enum(["QRIS Payment", "Bank Transfer", "Cash on Delivery"], { required_error: "Choose a payment method." }),
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
  const complete = Boolean(pack && total === pack.limit);

  const choosePack = (next: PackKey) => {
    const nextLimit = PACKS[next].limit;
    setPackKey(next);
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
    setQuantities((current) => {
      const currentValue = current[flavour] ?? 0;
      const nextValue = Math.max(0, currentValue + amount);
      const currentTotal = Object.values(current).reduce((sum, value) => sum + value, 0);
      if (amount > 0 && currentTotal >= pack.limit) return current;
      return { ...current, [flavour]: nextValue };
    });
    setErrors((current) => ({ ...current, quantities: "" }));
  };

  const selectedDate = date ? format(date, "yyyy-MM-dd") : "";
  const isPastDate = (candidate: Date) => format(candidate, "yyyy-MM-dd") < baliToday();
  const timeIsPast = selectedDate === baliToday() && time && time <= baliCurrentTime();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!pack) nextErrors["pack"] = "Choose a pack.";
    if (!pack || total !== pack.limit) nextErrors["quantities"] = pack ? `Choose exactly ${pack.limit} pops.` : "Choose a pack first.";
    if (!date) nextErrors["date"] = "Choose a delivery date.";
    if (date && isPastDate(date)) nextErrors["date"] = "Choose today or a future date.";
    if (timeIsPast) nextErrors["time"] = "Choose a future time in Bali.";

    const details = detailsSchema.safeParse({ name, phone, address, maps, time, payment, notes });
    if (!details.success) {
      for (const issue of details.error.issues) nextErrors[String(issue.path[0])] = issue.message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !pack || !date || !payment) return;

    const lines = FLAVOURS.map((flavour) => {
      const quantity = quantities[flavour.name] ?? 0;
      return quantity > 0 ? `${flavourEmoji[flavour.name]} ${flavour.name} Sorbet: ${quantity} pcs` : "";
    }).filter(Boolean);
    const message = [
      "Hi Fruti Pop 👋",
      "",
      "I'd like to place an order:",
      "",
      `Pack: ${pack.name}`,
      "",
      ...lines,
      "",
      `📦 Total Order: ${total} pcs`,
      `💰 Pack Price: ${pack.price}`,
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

  const fieldError = (key: string) => errors[key] ? <p className="mt-1 text-sm font-semibold text-destructive">{errors[key]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border bg-card p-4 shadow-lg sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <fieldset>
            <legend className="text-xl font-bold text-accent">1. Choose Your Pack *</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(Object.keys(PACKS) as PackKey[]).map((key) => {
                const option = PACKS[key];
                const selected = packKey === key;
                return (
                  <Button key={key} type="button" variant="outline" onClick={() => choosePack(key)} className={cn("relative h-auto min-h-28 justify-start rounded-xl p-4 text-left whitespace-normal", selected && "border-primary bg-leaf ring-2 ring-primary/20")}>
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

          <fieldset className="mt-7" disabled={!pack}>
            <legend className="text-xl font-bold text-accent">2. Pick Your Flavours</legend>
            <p className="mt-1 text-sm text-muted-foreground">Mix and match any combination to fill your pack.</p>
            <div className={cn("mt-4 space-y-2", !pack && "opacity-50")}>
              {FLAVOURS.map((flavour) => {
                const quantity = quantities[flavour.name] ?? 0;
                return (
                  <div key={flavour.name} className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-3 rounded-lg px-2 py-1.5">
                    <div className="flex min-w-0 items-center gap-2">
                      {flavour.img && <img src={flavour.img} alt="" className="h-10 w-7 shrink-0 object-contain" />}
                      <span className="truncate font-bold text-accent">{flavour.name}</span>
                    </div>
                    <Button type="button" variant="secondary" size="icon" onClick={() => changeQuantity(flavour.name, -1)} disabled={!pack || quantity === 0} aria-label={`Remove one ${flavour.name}`} className="h-10 w-10 rounded-full"><Minus /></Button>
                    <output aria-label={`${flavour.name} quantity`} className="w-7 text-center font-bold">{quantity}</output>
                    <Button type="button" size="icon" onClick={() => changeQuantity(flavour.name, 1)} disabled={!pack || total >= pack.limit} aria-label={`Add one ${flavour.name}`} className="h-10 w-10 rounded-full"><Plus /></Button>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl bg-leaf p-4">
              <div className="flex items-center justify-between gap-4 font-bold text-accent"><span>Total Pops Selected</span><span>{total} / {pack?.limit ?? 0}</span></div>
              <progress value={total} max={pack?.limit ?? 1} aria-label="Pack completion" className="order-progress mt-2 h-3 w-full overflow-hidden rounded-full" />
              {complete && <p className="mt-3 flex items-center gap-2 font-bold text-primary"><Check className="h-5 w-5" /> Your pack is complete! 🎉</p>}
            </div>
            {fieldError("quantities")}
          </fieldset>
        </div>

        <div className="min-w-0">
          <fieldset>
            <legend className="text-xl font-bold text-accent">3. Delivery Details</legend>
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
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-xl font-bold text-accent">4. Payment Method</legend>
            <RadioGroup value={payment ?? ""} onValueChange={setPayment} className="mt-3">
              {["QRIS Payment", "Bank Transfer", "Cash on Delivery"].map((method) => <label key={method} className="flex cursor-pointer items-center gap-3 text-sm font-semibold"><RadioGroupItem value={method} />{method}</label>)}
            </RadioGroup>
            {fieldError("payment")}
            {payment === "QRIS Payment" && <p className="mt-3 rounded-lg bg-leaf p-3 text-sm font-semibold text-leaf-foreground">QRIS payment details will be shared on WhatsApp.</p>}
            {payment === "Bank Transfer" && (
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-leaf p-3 text-sm text-leaf-foreground">
                <p><strong>Bank: Mandiri</strong><br />Account Name: Nuansa Fruit Bali<br /><span className="font-bold">Account Number: 1750004760129</span></p>
                <Button type="button" variant="outline" size="sm" onClick={async () => { await navigator.clipboard.writeText("1750004760129"); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }}><Copy />{copied ? "Copied" : "Copy"}</Button>
              </div>
            )}
          </fieldset>

          <label className="mt-5 block text-sm font-bold">Additional Notes (optional)<Textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={800} rows={3} placeholder="Delivery instructions or special requests" className="mt-1" />{fieldError("notes")}</label>
        </div>
      </div>

      <section className="mt-8 rounded-xl border bg-muted p-5" aria-labelledby="order-summary-heading">
        <h2 id="order-summary-heading" className="text-xl font-bold text-accent">Order Summary</h2>
        <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-3"><dt>Selected pack</dt><dd className="font-bold">{pack?.name ?? "Not selected"}</dd></div>
          <div className="flex justify-between gap-3"><dt>Pack price</dt><dd className="font-bold">{pack?.price ?? "Not selected"}</dd></div>
          <div className="flex justify-between gap-3"><dt>Total pops</dt><dd className="font-bold">{total}</dd></div>
          <div className="flex justify-between gap-3"><dt>Payment</dt><dd className="font-bold">{payment ?? "Not selected"}</dd></div>
        </dl>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-accent">{FLAVOURS.filter((f) => (quantities[f.name] ?? 0) > 0).map((f) => <li key={f.name} className="rounded-md bg-secondary px-2 py-1">{f.name} × {quantities[f.name]}</li>)}</ul>
        <p className="mt-3 text-sm text-muted-foreground">Delivery fee and final total confirmed on WhatsApp.</p>
        <Button type="submit" size="lg" className="mt-5 min-h-12 w-full rounded-full text-base font-bold">Send Order on WhatsApp</Button>
      </section>
    </form>
  );
}