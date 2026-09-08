import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { clinic } from "@/lib/site-core";
import { useBooking } from "@/components/BookingContext";

export function MobileActionBar() {
  const booking = useBooking();
  return (
    <div className="mobile-action-safe fixed inset-x-0 bottom-0 z-90 p-3 md:hidden">
      <div className="grid grid-cols-3 gap-1.5 rounded-pill glass p-1.5 shadow-lift">
        <a
          href={clinic.phoneHref}
          className="flex items-center justify-center gap-1.5 rounded-pill px-3 py-2.5 text-xs font-medium"
        >
          <Phone className="size-4 text-primary" /> Call
        </a>
        <a
          href={clinic.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-pill px-3 py-2.5 text-xs font-medium"
        >
          <MessageCircle className="size-4 text-primary" /> WhatsApp
        </a>
        <button
          onClick={booking.open}
          className="flex items-center justify-center gap-1.5 rounded-pill bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground"
        >
          <CalendarDays className="size-4" /> Book
        </button>
      </div>
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={clinic.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-24 z-90 hidden size-14 place-items-center rounded-pill glass shadow-lift transition hover:-translate-y-1 md:bottom-8 md:grid"
    >
      <MessageCircle className="size-6 text-primary" />
    </a>
  );
}
