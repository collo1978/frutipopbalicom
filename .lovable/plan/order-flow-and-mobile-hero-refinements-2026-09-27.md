# Order flow and mobile hero refinements

## Changes
- Adjust only the Order-page Mystery Pop artwork on mobile: reduce the question mark slightly and move it lower so it stays clear of the prompt text; keep desktop and homepage Mystery Pop unchanged.
- Show Payment Method permanently inside the Delivery Details stage as soon as the customer enters checkout, independent of required-field completion.
- Keep validation on final submission, and show the order summary plus a clearly labelled `Confirm Order on WhatsApp` action after a payment method is selected.
- Improve desktop hover states for the two pack selectors so the card background becomes purple and every label, price, count, selection marker, and saving badge remains high-contrast.
- Increase only the mobile hero’s bottom space after the trust line so the Flavours heading begins below the initial viewport; preserve desktop hero sizing and mobile artwork size.

## Verification
- Test the homepage at mobile and desktop sizes, confirming the initial mobile viewport ends cleanly after the trust line.
- Test Family and Jumbo pack selection, flavour plus/minus controls, Mystery Pop layout and reveal, full-pack modal choices, extras pricing, Family-to-Jumbo upgrade, persistent Finish Order access, Delivery Details, always-visible payment options, validation, and final WhatsApp order action.
- Check desktop pack-card hover contrast and confirm no unexpected scrolling, overlaps, console errors, or broken layout at common mobile and desktop widths.

## Technical details
- Simplify checkout visibility state so Payment renders with Delivery rather than depending on delivery-field validity.
- Keep the existing schema validation and pricing logic unchanged; only the presentation and progression visibility change.
- Use responsive utility classes so Mystery Pop and hero spacing adjustments apply below the desktop breakpoint only.
