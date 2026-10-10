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
const showcasePositions = [
  [40.03990377123266, 300.256038647343, 70.04821178120618, 321.7028985507246],
  [143.7700729083311, 291.1823671497585, 70.45743872440057, 330.77657004830917],
  [251.67195937788927, 283.75845410628017, 74.07154018141952, 338.2004830917874],
  [369.07299743021736, 289.5326086956522, 70.23564765164257, 332.42632850241546],
  [487.1820456168095, 297.7814009661836, 68.28325176155016, 324.17753623188406],
  [584.9377147751713, 300.256038647343, 70.74292793758013, 321.7028985507246],
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
        <svg className="mobile-original-showcase" viewBox="0 50 680 696" role="img" aria-label="Little pops. Big smiles. 6 delicious frozen fruit sorbet pops. Made for Bali’s sunny days. Mixed Berry, Mango, Strawberry, Pineapple, Passion Fruit and Piña Colada together on the original illuminated fruit-and-ice display.">
          <defs><clipPath id="mobile-showcase-scene"><path d="M0 50H680V695H662V746H0Z" /></clipPath></defs>
          <image href={layers.scene} x="0" y="0" width="1366" height="783.635265700483" clipPath="url(#mobile-showcase-scene)" />
          {products.map(([name, src], i) => {
            const position = showcasePositions[i];
            if (!position) return null;
            const [x, y, width, height] = position;
            return <image key={name} href={src} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid meet" />;
          })}
        </svg>
        <div className="mobile-dj">
           <svg viewBox="668 430 180 155" aria-label="DJ Pop, the original Fruti Pop mascot" role="img">
             <defs><clipPath id="mobile-dj-silhouette"><path d="M692 443 Q715 430 748 437 L754 458 Q776 462 778 480 L774 497 Q790 501 802 513 Q817 515 824 530 L823 543 L837 563 Q842 576 836 576 L816 554 Q807 554 797 542 L792 524 L771 516 L775 553 L776 563 Q783 567 780 575 Q769 582 747 577 L738 570 L733 565 L727 570 Q707 581 693 578 Q681 577 687 565 L689 557 L686 528 Q676 528 675 516 L681 499 Q674 488 676 475 Q677 461 688 457 Z" /></clipPath></defs>
             <image href={layers.scene} width="1366" height="783.635" clipPath="url(#mobile-dj-silhouette)" />
           </svg>
          <p className="mobile-dj-comment">Hey, I’m DJ Pop!</p>
        </div>
         <Button asChild className="mobile-order"><Link to="/order" aria-label="Order My Pops"><svg viewBox="684.6497584541063 584.0144927536232 537.8212560386473 100.63526570048309" aria-hidden="true"><defs><clipPath id="mobile-original-button"><rect x="684.6497584541063" y="584.0144927536232" width="537.8212560386473" height="100.63526570048309" rx="40.25410628019324" /></clipPath></defs><image href={layers["button-scene"]} width="1366" height="783.635265700483" clipPath="url(#mobile-original-button)" /></svg></Link></Button>
         <div className="mobile-trust">
           {[[665, "Less Sugar"], [837, "Full of Vitamins"], [1041, "Packed with Fruit"]].map(([x, label]) => <div key={label}><svg viewBox={`${x} 701 48 48`} aria-hidden="true"><image href={layers.scene} width="1366" height="783.635" /></svg><span>{label}</span></div>)}
         </div>
        <div className="mobile-smiles">
          <img src={layers["football-boy"]} alt="Football player enjoying his Fruti Pop" />
          <img src={layers.family} alt="A family sharing Fruti Pops" />
          <svg viewBox="1070 356 275 229" role="img" aria-label="Three children enjoying Fruti Pops"><image href={layers.scene} width="1366" height="783.635" /></svg>
        </div>
         <div className="mobile-ways"><h2><img src={layers["three-ways"]} alt="3 WAYS TO POP!" /></h2><ul><li>Signature Packs</li><li>Mix Your Own</li><li>Mystery Pack</li></ul></div>
      </div>
    </section>
  );
}