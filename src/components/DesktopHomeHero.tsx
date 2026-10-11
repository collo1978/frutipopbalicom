import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import layers from '@/assets/approved-homepage/layers.json';

const COMMENTS = ["Hey, I’m DJ Pop!", 'Ready to pop?', 'Pick your flavour!', 'Feeling lucky? Go mystery!'];
const PRODUCTS = [
  ['Mixed Berry', layers['mixed-berry'], 40.03990377123266, 300.256038647343, 70.04821178120618, 321.7028985507246],
  ['Mango', layers.mango, 143.7700729083311, 291.1823671497585, 70.45743872440057, 330.77657004830917],
  ['Strawberry', layers.strawberry, 251.67195937788927, 283.75845410628017, 74.07154018141952, 338.2004830917874],
  ['Pineapple', layers.pineapple, 369.07299743021736, 289.5326086956522, 70.23564765164257, 332.42632850241546],
  ['Passion Fruit', layers['passion-fruit'], 487.1820456168095, 297.7814009661836, 68.28325176155016, 324.17753623188406],
  ['Piña Colada', layers['pina-colada'], 584.9377147751713, 300.256038647343, 70.74292793758013, 321.7028985507246],
] as const;
const DJ_MASK = 'M692 443 Q715 430 748 437 L754 458 Q776 462 778 480 L774 497 Q790 501 802 513 Q817 515 824 530 L823 543 L837 563 Q842 576 836 576 L816 554 Q807 554 797 542 L792 524 L771 516 L775 553 L776 563 Q783 567 780 575 Q769 582 747 577 L738 570 L733 565 L727 570 Q707 581 693 578 Q681 577 687 565 L689 557 L686 528 Q676 528 675 516 L681 499 Q674 488 676 475 Q677 461 688 457 Z';

function SceneCrop({ box, className, label, stretch = false, slice = false }: { box: string; className?: string; label?: string; stretch?: boolean; slice?: boolean }) {
  return <svg viewBox={box} className={className} preserveAspectRatio={stretch ? 'none' : slice ? 'xMidYMid slice' : 'xMidYMid meet'} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}><use href="#fp-original-scene" /></svg>;
}

export function DesktopHomeHero() {
  const [comment, setComment] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    const layout = scene?.querySelector<HTMLElement>('.fp-layout');
    if (!scene || !layout) return;
    const desktop = window.matchMedia('(min-width: 1200px)');
    let frame = 0;
    let scale = 1;
    const fit = () => {
      if (!desktop.matches) {
        scene.style.removeProperty('--fp-fit-height');
        scene.style.removeProperty('--fp-fit-scale');
        scene.style.removeProperty('--fp-fit-left');
        scale = 1;
        return;
      }
      // Measure the fixed approved composition, then scale every part together.
      const origin = layout.getBoundingClientRect().top;
      let paintedHeight = layout.offsetHeight;
      layout.querySelectorAll<SVGElement | HTMLElement>(
        '.fp-standalone-platform, .fp-dj-art, .fp-speech, .fp-order, .fp-trust, .fp-photo'
      ).forEach(node => {
        paintedHeight = Math.max(paintedHeight,
          (node.getBoundingClientRect().bottom - origin) / scale);
      });
      const naturalHeight = Math.ceil(paintedHeight + 12);
      const widthScale = Math.min(scene.clientWidth, 1600) / 1366;
      const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
      const available = Math.max(0, window.innerHeight - sceneTop);
      // Fit the entire composition below the actual header, including SVG glow overflow.
      // The CTA and trust strip remain inside the first hero screen at every desktop width.
      const heightScale = Math.max(1, available - 8) / naturalHeight;
      const nextScale = Math.min(widthScale, heightScale);
      scene.style.setProperty('--fp-fit-scale', String(nextScale));
      scene.style.setProperty('--fp-fit-left', `${(scene.clientWidth - 1366 * nextScale) / 2}px`);
      scene.style.setProperty('--fp-fit-height', `${Math.max(1, available)}px`);
      scale = nextScale;
    };
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(fit);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(scene);
    observer.observe(layout);
    const header = scene.closest('.home-shell')?.querySelector('header');
    if (header) observer.observe(header);
    scene.addEventListener('load', schedule, true);
    window.addEventListener('resize', schedule);
    desktop.addEventListener('change', schedule);
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      scene.removeEventListener('load', schedule, true);
      window.removeEventListener('resize', schedule);
      desktop.removeEventListener('change', schedule);
    };
  }, []);
  useEffect(() => {
    let timer: number | undefined;
    
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => { setComment(i => (i + 1) % COMMENTS.length); schedule(); }, 6000);
    };
    document.addEventListener('visibilitychange', schedule);

    schedule();
    return () => { window.clearTimeout(timer); document.removeEventListener('visibilitychange', schedule); };
  }, []);
  return (