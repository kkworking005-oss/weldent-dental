import { createFileRoute } from "@tanstack/react-router";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Dental Appointment | Weldent Dental Bengaluru" },
      {
        name: "description",
        content:
          "Request a dental appointment at Weldent Multispeciality Dental Clinic in Kalena Agrahara, Bengaluru.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: canonicalLinks("/book"),
  }),
  component: BookingRoute,
});

function BookingRoute() {
  return <div className="min-h-[55vh]" aria-hidden="true" />;
}
