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

  return (
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
  );
}
