# Piña Colada artwork and mobile section spacing

## Changes
- Upload the supplied 1024 × 1536 Piña Colada artwork and use it as the shared Piña Colada card image everywhere.
- Remove the Piña Colada-only inset padding so it fills the same 2:3 frame edge-to-edge as the other five flavours while preserving its aspect ratio.
- Keep card dimensions, labels, footer controls, zoom interaction, and order behaviour unchanged.
- Add mobile-only space between the hero trust line and the Flavours section without changing the enlarged one-line heading or desktop spacing.

## Verification
- Check homepage and Order cards on mobile and desktop for matching dimensions, edge-to-edge artwork, alignment, and working zoom controls.
- Confirm the mobile hero has a clear visual break before the Flavours heading, with the heading still one line and POP! still pink.
- Confirm the preview builds without errors.

## Technical details
- Store the uploaded image as a Lovable CDN asset pointer and update the shared Piña Colada artwork mapping.
- Remove only the Piña Colada conditional padding classes from the homepage and Order card images.
