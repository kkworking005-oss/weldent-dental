import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type HeroImage = {
  src: string;
  srcSet: string;
  alt: string;
};

export function HeroCarousel({ images }: { images: readonly HeroImage[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % images.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div
      className="relative aspect-4/3 overflow-hidden rounded-2xl bg-primary/5"
      role="region"
      aria-label="Weldent Dental Clinic photographs"
    >
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          srcSet={image.srcSet}
          sizes="(max-width: 1023px) calc(100vw - 40px), 45vw"
          width="1200"
          height="900"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          alt={image.alt}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            index === active ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={index !== active}
        />
      ))}
      <div
        className="absolute inset-x-0 bottom-3 flex justify-center gap-2"
        aria-label="Choose clinic photograph"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show clinic photograph ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={cn(
              "h-2 rounded-full shadow-sm transition-all",
              index === active ? "w-6 bg-white" : "w-2 bg-white/65 hover:bg-white",
            )}
          />
        ))}
      </div>
    </div>
  );
}
