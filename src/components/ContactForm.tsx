import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/kit";
import { fieldClass } from "@/components/AppointmentForm";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Enter a valid email").max(160).or(z.literal("")),
  reason: z.string().max(80),
  message: z.string().trim().min(4, "Please add a short message").max(1000),
});

const reasons = ["General enquiry", "Treatment costs", "Second opinion", "Feedback", "Careers"];

export function ContactForm() {
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(
      Object.fromEntries(new FormData(form)) as Record<string, string>,
    );
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    const d = parsed.data;
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    toast.success("Thank you — we'll be in touch soon.");
    form.reset();
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Full name" className={fieldClass} required />
        <input name="phone" placeholder="Phone number" className={fieldClass} required />
      </div>
      <input name="email" type="email" placeholder="Email (optional)" className={fieldClass} />
      <select name="reason" className={fieldClass} defaultValue="">
        <option value="">Reason for contact</option>
        {reasons.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <textarea name="message" rows={5} placeholder="Your message" className={fieldClass} required />
      <Button type="submit" size="lg" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
