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
- The homepage uses the approved SVG with externalized exact image layers and React-managed comments on desktop, plus an independently arranged mobile composition; retain all previous original source artwork.
- Homepage styling is scoped to the homepage shell, so shared order components and non-homepage routes retain their existing presentation and logic.
