import { useRef, useState } from "react";
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
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-4/3 w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
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
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-lift"
        style={{ left: `${pos}%` }}
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
