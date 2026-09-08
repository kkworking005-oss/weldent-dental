import { useEffect, useRef, useState } from "react";
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
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const source = getServiceImage(service);

  useEffect(() => {
    setLoaded(false);
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, [source]);

  return (
    <img
      ref={imageRef}
      src={source}
      srcSet={getServiceImageSrcSet(service)}
      sizes={sizes}
      alt={getServiceImageAlt(service)}
      width={1200}
      height={900}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      className={cn(
        "opacity-0 transition-[opacity,transform] duration-700 ease-out",
        loaded && "opacity-100",
        className,
      )}
    />
  );
}
