import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

const AppointmentForm = lazy(() =>
  import("@/components/AppointmentForm").then((module) => ({ default: module.AppointmentForm })),
);

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const BookingCtx = createContext<Ctx>({ open: () => {}, close: () => {}, isOpen: false });

export const useBooking = () => useContext(BookingCtx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
  const isBookingRoute = normalizedPath === "/book";
  const [isOpen, setOpen] = useState(isBookingRoute);
  const wasBookingRoute = useRef(isBookingRoute);

  useEffect(() => {
    if (isBookingRoute && !wasBookingRoute.current) setOpen(true);
    if (!isBookingRoute && wasBookingRoute.current) setOpen(false);
    wasBookingRoute.current = isBookingRoute;
  }, [isBookingRoute]);

  function close() {
    setOpen(false);
    if (isBookingRoute) void navigate({ to: "/", replace: true });
  }

  return (
    <BookingCtx.Provider value={{ isOpen, open: () => setOpen(true), close }}>
      {children}
      {isOpen ? (
        <div className="fixed inset-0 z-100 flex items-end justify-center p-3 md:items-center md:p-6">
          <button
            type="button"
            aria-label="Close booking"
            onClick={close}
            className="absolute inset-0 bg-primary/25 backdrop-blur-md"
          />
          <div className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl glass p-6 shadow-lift md:p-8 animate-fade-up">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 grid size-9 place-items-center rounded-pill glass-quiet text-foreground/70 transition hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
              Book an appointment
            </p>
            <h3 className="mt-2 text-3xl">Reserve your chair</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us a little and we will confirm your slot by phone.
            </p>
            <div className="mt-6">
              <Suspense
                fallback={
                  <div
                    className="h-56 animate-pulse rounded-2xl bg-white/45"
                    aria-label="Loading booking form"
                  />
                }
              >
                <AppointmentForm />
              </Suspense>
            </div>
          </div>
        </div>
      ) : null}
    </BookingCtx.Provider>
  );
}
