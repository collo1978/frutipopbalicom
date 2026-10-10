import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import desktop from "@/assets/approved-homepage/desktop.svg?raw";
import layers from "@/assets/approved-homepage/layers.json";

const products = [
  ["Mixed Berry", layers["mixed-berry"]], ["Mango", layers.mango],
  ["Strawberry", layers.strawberry], ["Pineapple", layers.pineapple],
  ["Passion Fruit", layers["passion-fruit"]], ["Piña Colada", layers["pina-colada"]],
];
const comments = [["Hey, I’m", "DJ Pop!"], ["Ready to pop?"], ["Pick your", "flavour!"], ["Feeling lucky?", "Go mystery!"]];

export function ApprovedHomeHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let index = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    const pop = (node: Element) => {
      if (reduced.matches) return;
      node.animate([
        { opacity: 0.3, transform: "translateY(2px) scale(.97)" },
        { opacity: 1, transform: "translateY(0) scale(1.015)", offset: 0.7 },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 300, easing: "ease-out" });
    };
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden && !reduced.matches) {
        timer = window.setTimeout(change, index === 3 ? 8500 : 6000);
      }
    };
    const change = () => {
      if (document.hidden || reduced.matches) return;
      index = (index + 1) % comments.length;
      const lines = comments[index] ?? comments[0];
      if (!lines) return;
      ref.current?.querySelectorAll(".comment").forEach((node) => {
        const x = node.getAttribute("data-x") ?? "1016";
        const y = Number(node.getAttribute("data-y") ?? "584");
        node.replaceChildren(...lines.map((line, n) => {
          const span = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          span.setAttribute("x", x);
          span.setAttribute("y", String(lines.length === 1 ? y + 11.5 : y + n * 23));
          span.textContent = line;
          return span;
        }));
        pop(node);
      });
      const mobile = ref.current?.querySelector(".mobile-dj-comment");
      if (mobile) {
        mobile.textContent = lines.join(" ");
        pop(mobile);
      }
      schedule();
    };
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", schedule);
    schedule();
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <section ref={ref} className="approved-hero" aria-labelledby="approved-hero-heading">
      <h1 id="approved-hero-heading" className="sr-only">Fruti Pop Bali — Little pops. Big smiles.</h1>
      <div className="approved-desktop" dangerouslySetInnerHTML={{ __html: desktop }} />
      <div className="approved-mobile">
        <div className="mobile-headline" aria-label="Little pops. Big smiles.">
          <svg viewBox="70 67 500 143" role="img" aria-label="Little pops. Big smiles."><image href={layers.scene} width="1366" height="783.635" /></svg>
        </div>
        <p className="mobile-subheading"><span>6</span> delicious <strong>frozen fruit sorbet pops.</strong><br />Made for <em>Bali’s sunny days.</em></p>
        <div className="mobile-product-stage">
          {products.map(([name, src]) => <div key={name}><img src={src} alt={`Original ${name} Fruti Pop package`} /><p>{name}</p></div>)}
        </div>
        <Button asChild className="home-primary mobile-order"><Link to="/order">ORDER MY POPS →</Link></Button>
        <p className="mobile-trust">Less Sugar <span>|</span> Full of Vitamins <span>|</span> Packed with Fruit</p>
        <div className="mobile-dj">
          <svg viewBox="665 424 185 161" aria-label="DJ Pop, the original Fruti Pop mascot" role="img"><image href={layers.scene} width="1366" height="783.635" /></svg>
          <p className="mobile-dj-comment">Hey, I’m DJ Pop!</p>
        </div>
        <div className="mobile-smiles">
          <img src={layers["football-boy"]} alt="Football player enjoying his Fruti Pop" />
          <img src={layers.family} alt="A family sharing Fruti Pops" />
          <svg viewBox="1070 356 275 229" role="img" aria-label="Three children enjoying Fruti Pops"><image href={layers.scene} width="1366" height="783.635" /></svg>
        </div>
        <div className="mobile-ways"><h2>3 WAYS TO POP!</h2><ul><li>Signature Packs</li><li>Mix Your Own</li><li>Mystery Pack</li></ul></div>
      </div>
    </section>
  );
}