import type { Service } from "@/lib/site";
import { getServiceImage, getServiceImageAlt, getServiceImageSrcSet } from "@/lib/service-images";
import { cn } from "@/lib/utils";

export function ServiceImage({
  service,
  className,
  priority = false,
  sizes = "(max-width: 767px) calc(100vw - 44px), (max-width: 1023px) calc(50vw - 36px), 400px",
}: {
  service: Service;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const source = getServiceImage(service);
  const needsWordmark = service.slug === "teeth-whitening-cosmetic";

  return (
    <span className="relative block size-full">
      <img
        src={source}
        srcSet={getServiceImageSrcSet(service)}
        sizes={sizes}
        alt={getServiceImageAlt(service)}
        width={1200}
        height={900}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("transition-transform duration-700 ease-out", className)}
      />
      {needsWordmark ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[3.5%] left-[1.5%] rounded-md bg-white/90 px-[2.5%] py-[1.5%] text-left shadow-sm backdrop-blur-[2px]"
        >
          <span className="block font-display text-[clamp(0.75rem,2.2vw,1.5rem)] leading-none tracking-tight text-[#18266f]">
            Weldent<span className="text-accent">.</span>
          </span>
          <span className="mt-0.5 block text-[clamp(0.28rem,0.8vw,0.55rem)] font-semibold uppercase tracking-[0.12em] text-[#18266f]/80">
            Multispeciality Dental
          </span>
        </span>
      ) : null}
    </span>
  );
}
