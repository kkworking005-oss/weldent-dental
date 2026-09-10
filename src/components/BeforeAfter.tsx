import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function BeforeAfter({
  before,
  after,
  alt,
  beforeSrcSet,
  afterSrcSet,
  beforeImageClassName,
  afterImageClassName,
}: {
  before: string;
  after: string;
  alt: string;
  beforeSrcSet?: string;
  afterSrcSet?: string;
  beforeImageClassName?: string | undefined;
  afterImageClassName?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(52);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    positionRef.current = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const position = positionRef.current;
      if (beforeRef.current) {
        beforeRef.current.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      }
      if (handleRef.current) handleRef.current.style.left = `${position}%`;
      frameRef.current = null;
    });
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-4/3 w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
    >
      <img
        src={after}
        srcSet={afterSrcSet}
        sizes="(max-width: 767px) calc(100vw - 64px), 556px"
        alt={`${alt} — after`}
        loading="lazy"
        decoding="async"
        width={768}
        height={576}
        className={cn("absolute inset-0 size-full object-cover", afterImageClassName)}
      />
      <div
        ref={beforeRef}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "inset(0 48% 0 0)" }}
      >
        <img
          src={before}
          srcSet={beforeSrcSet}
          sizes="(max-width: 767px) calc(100vw - 64px), 556px"
          alt={`${alt} — before`}
          loading="lazy"
          decoding="async"
          width={768}
          height={576}
          className={cn("absolute inset-0 size-full object-cover", beforeImageClassName)}
        />
      </div>
      <div
        ref={handleRef}
        className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-lift"
        style={{ left: "52%" }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill glass text-[0.6rem] font-semibold uppercase tracking-widest text-primary">
          drag
        </span>
      </div>
      <span className="pointer-events-none absolute bottom-3 left-3 rounded-pill glass-quiet px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 bottom-3 rounded-pill glass-quiet px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest">
        After
      </span>
    </div>
  );
}
