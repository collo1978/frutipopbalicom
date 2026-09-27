# Mobile flavour carousel and live pack dashboard

## Scope
- Reduce only the homepage mobile flavour cards by roughly one third while preserving full artwork proportions, the Strawberry BEST SELLER badge, and 15–20% of the next card as a swipe cue.
- Leave the homepage desktop layout and all Order-page flavour cards unchanged.
- Upgrade the sticky Order-page tracker into a compact live “My Pack” view showing only selected flavours and their quantities.
- Automatically open the existing “Your pack is full! 🎉” modal when Family reaches 10 Pops or Jumbo reaches 20 Pops, without requiring Continue.

## Implementation
- Add homepage-specific mobile sizing hooks to the flavour carousel rather than changing shared Order-page card styles.
- Use each flavour’s existing artwork as a small thumbnail in the tracker, with accessible names and instant quantity updates.
- Keep the status line and progress bar compact, remove the tracker’s Continue button, and retain the existing three modal choices.
- Trigger the modal only when the total crosses from below the active pack limit to full, so closing it to add more flavours does not immediately reopen it.
- Preserve the current Family-to-Jumbo automatic upgrade behavior and trigger completion correctly at each active threshold.

## Verification
- Check homepage at 390px and 430px: heading/copy, one full card, and 15–20% of the next card are visible; artwork is uncropped and the badge remains legible.
- Check desktop homepage and mobile/desktop Order pages for unchanged card sizing.
- Test Family 9→10 and Jumbo 19→20 automatic modal opening, all three modal actions, live add/remove quantities, sticky behavior, and progress states.
- Confirm the preview builds cleanly with no runtime or console errors. Keep the site unpublished.
