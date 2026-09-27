# Stable pack tracker and homepage flavour play

## What will change
- Give the mobile pack tracker a stable reserved height that fits all six flavour icons and counts, in both its normal and sticky states.
- Keep the tracker status, fruit counts, and progress bar updating without shifting the flavour carousel, page scroll, or active card.
- Make homepage Mystery Pop run the same shuffle and large flavour reveal in place, then show an **Order This Flavour →** button linking to the Order page.
- Enlarge the real flavour artwork inside homepage cards by about 15–20% without materially increasing card height or removing the next-card swipe preview.
- Add a small rotated Fruti Pop starburst beside the Mystery Pop action reading **LET THE KIDS PRESS!**, with a slight edge overlap on mobile.

## Technical details
- Reuse one shared Mystery Pop interaction component with configurable result action so the homepage and Order page keep matching animation and reveal behaviour.
- Reserve fixed mobile tracker dimensions and compact the six flavour labels into a stable grid; preserve desktop sizing appropriately.
- Use mobile-only and desktop-scaled image sizing in the homepage discovery cards; Order-page flavour cards remain unchanged.
- Verify at phone and desktop sizes by adding and removing several flavours, swiping cards, running Mystery Pop, and clicking its order action.
