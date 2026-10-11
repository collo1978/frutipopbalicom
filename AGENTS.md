<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Homepage and Order flavour cards share the latest supplied 2:3 artwork in consistent edge-to-edge frames without per-flavour inset styling.
- Homepage and Order Mystery Pop use one configurable game component so their shuffle and reveal behaviour stay consistent.
- The homepage desktop uses the supplied DesktopHomeHero module and its scoped stylesheet, while mobile retains its separate original-scene composition; this isolates approved desktop replacements from mobile and ordering. Retain all previous original source artwork.
- At desktop widths, proportionally fit the entire approved hero composition to the viewport using the measured header and full SVG overflow bounds; this keeps the platform, character, CTA and trust visible without modifying artwork or shared header sizing.
- Homepage styling is scoped to the homepage shell, so shared order components and non-homepage routes retain their existing presentation and logic.
- Mobile hero crops and mascot masking reference the original local scene through SVG viewBoxes and clip paths, leaving source pixels and the approved desktop SVG unchanged.
- The mobile headline, subheading and six-product showcase share one proportional SVG window using the exact desktop scene and product coordinates; this preserves the original fruit, ice, platform and nameplates without recreating them.
