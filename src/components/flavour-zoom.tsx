import { useRef, useState } from "react";
import type { Flavour } from "@/lib/flavours";

type PopImageProps = {
  f: Flavour;
  active?: boolean;
  onToggle?: () => void;
};

export function ZoomableFlavourImage({ f, active: controlledActive, onToggle }: PopImageProps) {
  const [localActive, setLocalActive] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const active = controlledActive ?? localActive;

  const toggle = () => {
    if (onToggle) onToggle();
    else setLocalActive((value) => !value);
  };

  return (
    <>
      {active && (
        <button
          type="button"
          aria-label="Close the popped flavour"
          onClick={toggle}
          className="fixed inset-0 z-10 cursor-default bg-transparent"
        />
      )}
    <button
      type="button"
      aria-label={`Pop the Fruti Pop ${f.name} pack forward`}
      aria-pressed={active}
      data-active={active ? "true" : "false"}
      onPointerDown={(event) => {
        start.current = { x: event.clientX, y: event.clientY };
        dragged.current = false;
      }}
      onPointerMove={(event) => {
        const first = start.current;
        if (!first) return;
        if (Math.hypot(event.clientX - first.x, event.clientY - first.y) > 8) dragged.current = true;
      }}
      onClick={(event) => {
        if (dragged.current) {
          event.preventDefault();
          return;
        }
        toggle();
      }}
      className="flavour-product-pop relative h-full w-full touch-pan-x overflow-visible rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
    >
      <img
        src={f.img!}
        alt={`Fruti Pop ${f.name} sorbet pack`}
        loading="lazy"
        draggable={false}
        className="flavour-product-pop-img pointer-events-none absolute inset-0 h-full w-full select-none object-contain drop-shadow-lg"
        style={{ objectPosition: "center bottom" }}
      />
    </button>
    </>
  );
}
