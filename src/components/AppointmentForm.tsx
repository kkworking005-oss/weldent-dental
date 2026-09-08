import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/kit";
import { clinic, services, doctors } from "@/lib/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
  email: z
    .union([z.string().trim().email("Enter a valid email").max(160), z.literal("")])
    .optional(),
  treatment: z.string().max(80),
  doctor: z.string().max(80),
  preferred_date: z.string().max(20),
  preferred_time: z.string().max(40),
  notes: z.string().trim().max(600).optional(),
});

export const fieldClass =
  "w-full rounded-2xl glass-quiet px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/40";

const times = ["Morning (10:30–12:30)", "Afternoon (12:30–4:30)", "Evening (4:30–9:00)"];

export function AppointmentForm({ className }: { className?: string }) {
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    whatsappURL: string;
    secondsRemaining: number;
  } | null>(null);

  useEffect(() => {
    if (!confirmation) return;
    if (confirmation.secondsRemaining <= 0) {
      window.location.assign(confirmation.whatsappURL);
      return;
    }

    const timer = window.setTimeout(() => {
      setConfirmation((current) =>
        current ? { ...current, secondsRemaining: current.secondsRemaining - 1 } : current,
      );
    }, 1_000);

    return () => window.clearTimeout(timer);
  }, [confirmation]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setBusy(true);
    const d = parsed.data;

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(d),
      });
      const result = (await response.json().catch(() => null)) as {
        success?: unknown;
        id?: unknown;
      } | null;

      if (!response.ok || result?.success !== true || typeof result.id !== "number") {
        throw new Error("The appointment could not be saved");
      }

      // Hand the saved request over to the clinic's WhatsApp with all details prefilled.
      const lines = [
        "*New appointment request*",
        `Name: ${d.name}`,
        `Phone: ${d.phone}`,
        d.email ? `Email: ${d.email}` : null,
        d.treatment ? `Treatment: ${d.treatment}` : null,
        d.doctor ? `Doctor: ${d.doctor}` : null,
        d.preferred_date ? `Preferred date: ${d.preferred_date}` : null,
        d.preferred_time ? `Preferred time: ${d.preferred_time}` : null,
        d.notes ? `Notes: ${d.notes}` : null,
      ].filter(Boolean);
      const whatsappURL = `${clinic.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;

      toast.success("Booking received. Opening WhatsApp in 10 seconds.");
      form.reset();
      setConfirmation({ whatsappURL, secondsRemaining: 10 });
    } catch (error) {
      console.error("Appointment booking failed", error);
      toast.error(
        "We couldn't save your appointment. Please try again — your details are still here.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (confirmation) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "booking-confirmation grid min-h-80 place-items-center text-center",
          className,
        )}
      >
        <div className="w-full max-w-sm">
          <div className="booking-confirmation-icon mx-auto grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift">
            <Check className="size-9" strokeWidth={2.5} />
          </div>
          <h3 className="mt-6 text-3xl">Booking received</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your appointment request has been saved. WhatsApp will open in{" "}
            <strong className="text-foreground">{confirmation.secondsRemaining} seconds</strong> so
            you can send the confirmation message.
          </p>
          <div className="booking-confirmation-progress mt-6 h-1.5 overflow-hidden rounded-full bg-primary/10">
            <span className="block h-full rounded-full bg-primary" />
          </div>
          <Button
            type="button"
            variant="glass"
            className="mt-6"
            onClick={() => window.location.assign(confirmation.whatsappURL)}
          >
            Continue to WhatsApp now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("grid gap-3", className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Full name" className={fieldClass} required />
        <input name="phone" placeholder="Phone number" className={fieldClass} required />
      </div>
      <input name="email" type="email" placeholder="Email (optional)" className={fieldClass} />
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="treatment" className={fieldClass} defaultValue="">
          <option value="">Treatment of interest</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
        <select name="doctor" className={fieldClass} defaultValue="">
          <option value="">Preferred doctor</option>
          {doctors.map((d) => (
            <option key={d.slug} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="preferred_date"
          type="date"
          className={fieldClass}
          aria-label="Preferred date"
        />
        <select name="preferred_time" className={fieldClass} defaultValue="">
          <option value="">Preferred time</option>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="notes"
        rows={3}
        placeholder="Anything we should know?"
        className={fieldClass}
      />
      <Button type="submit" size="lg" disabled={busy} className="mt-1">
        {busy ? "Sending…" : "Request appointment"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Your details are saved and a prefilled WhatsApp message opens so the clinic can confirm your
        slot. For emergencies, please call directly.
      </p>
    </form>
  );
}
