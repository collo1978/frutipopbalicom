import { useEffect, useRef, useState } from "react";
import type { Flavour } from "@/lib/flavours";

/**
 * Product image with two zoom modes:
 * - Desktop (fine pointer): hovering magnifies the pack under the cursor.
 * - Touch: tapping opens a fullscreen viewer with pinch to zoom and pan.
 * The surrounding card layout is untouched: the trigger keeps the exact
 * same box the plain <img> used before.
 */
export function ZoomableFlavourImage({ f }: { f: Flavour }) {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("50% 40%");
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`Zoom in on the Fruti Pop ${f.name} pack`}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
        }}
        className="relative h-full w-full cursor-zoom-in overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
      >
        <img
          src={f.img!}
          alt={`Fruti Pop ${f.name} sorbet pack`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain drop-shadow-lg transition-transform duration-200 ease-out motion-reduce:transition-none"
          style={{ transform: hovered ? "scale(2.4)" : "scale(1)", transformOrigin: origin }}
        />
        <span className="pointer-events-none absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-card/80 text-accent shadow-sm" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8M11 8.5v5M8.5 11h5" />
          </svg>
        </span>
        <span className="sr-only">Tap to open a larger view, or hover to magnify.</span>
      </button>
      {open && <FlavourLightbox f={f} onClose={() => setOpen(false)} />}
    </>
  );
}

/** Fullscreen viewer with pinch-to-zoom (touch), double-tap zoom, and drag to pan. */
function FlavourLightbox({ f, onClose }: { f: Flavour; onClose: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const view = useRef({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ startDist: 0, startScale: 1, startX: 0, startY: 0, lastTap: 0 });

  const apply = () => {
    const el = imgRef.current;
    if (el) el.style.transform = `translate(${view.current.x}px, ${view.current.y}px) scale(${view.current.scale})`;
  };

  const clampView = () => {
    const v = view.current;
    v.scale = Math.min(5, Math.max(1, v.scale));
    if (v.scale === 1) { v.x = 0; v.y = 0; return; }
    const surface = surfaceRef.current;
    const img = imgRef.current;
    if (!surface || !img) return;
    const maxX = Math.max(0, (img.clientWidth * v.scale - surface.clientWidth) / 2);
    const maxY = Math.max(0, (img.clientHeight * v.scale - surface.clientHeight) / 2);
    v.x = Math.min(maxX, Math.max(-maxX, v.x));
    v.y = Math.min(maxY, Math.max(-maxY, v.y));
  };

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const dist = () => {
      const pts = [...pointers.current.values()];
      const a = pts[0];
      const b = pts[1];
      return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      surface.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const g = gesture.current;
      if (pointers.current.size === 2) {
        g.startDist = dist();
        g.startScale = view.current.scale;
      } else if (pointers.current.size === 1) {
        g.startX = e.clientX - view.current.x;
        g.startY = e.clientY - view.current.y;
        // Double tap toggles zoom
        const now = Date.now();
        if (now - g.lastTap < 300) {
          view.current.scale = view.current.scale > 1 ? 1 : 2.5;
          clampView();
          apply();
        }
        g.lastTap = now;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const g = gesture.current;
      const v = view.current;
      if (pointers.current.size === 2 && g.startDist > 0) {
        v.scale = g.startScale * (dist() / g.startDist);
      } else if (pointers.current.size === 1 && v.scale > 1) {
        v.x = e.clientX - g.startX;
        v.y = e.clientY - g.startY;
      } else {
        return;
      }
      clampView();
      apply();
    };

    const onPointerUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size === 1) {
        const pt = [...pointers.current.values()][0];
        if (pt) {
          gesture.current.startX = pt.x - view.current.x;
          gesture.current.startY = pt.y - view.current.y;
        }
      }
      if (view.current.scale < 1.05) {
        view.current.scale = 1;
        clampView();
        apply();
      }
    };

    // Wheel zoom for desktop users who open the viewer with a click
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
      view.current.scale *= Math.exp(-dy * 0.002);
      clampView();
      apply();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    surface.addEventListener("pointerdown", onPointerDown);
    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerup", onPointerUp);
    surface.addEventListener("pointercancel", onPointerUp);
    surface.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", onPointerUp);
      surface.removeEventListener("pointercancel", onPointerUp);
      surface.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fruti Pop ${f.name} pack, enlarged view`}
      className="fixed inset-0 z-50 flex flex-col bg-foreground/85 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-primary-foreground">
        <p className="font-display text-lg font-semibold">{f.name}{f.tagline ? ` · ${f.tagline}` : ""}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enlarged view"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-2xl leading-none transition hover:bg-card/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
        >
          ×
        </button>
      </div>
      <div
        ref={surfaceRef}
        className="relative flex min-h-0 flex-1 touch-none items-center justify-center overflow-hidden"
      >
        <img
          ref={imgRef}
          src={f.img!}
          alt={`Fruti Pop ${f.name} sorbet pack, enlarged`}
          draggable={false}
          className="max-h-full max-w-full select-none object-contain will-change-transform"
        />
      </div>
      <p className="px-4 pb-4 text-center text-sm text-primary-foreground/80">
        Pinch to zoom, drag to move, double tap to zoom in or out.
      </p>
    </div>
  );
}
