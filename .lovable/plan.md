# Fix Lemon, Mystery Pop, and Finish Order

## Changes
- Make the homepage Lemon card use the same product artwork source and image treatment as the working Order card, without changing the Order card.
- Make the full-pack Mystery Pop action close the popup, reveal the persistent Finish Order action, and scroll the flavour carousel and page to the Mystery Pop card on desktop and mobile.
- Keep Finish Order available whenever the active order has at least 10 Pops, including after normal or Mystery Pop additions and after the automatic Jumbo upgrade.

## QA
- Test the homepage, shared navigation, route links, pack links, flavour and Mystery Pop carousels, image viewer, and responsive layouts on desktop and mobile.
- Test Family and Jumbo selection, every flavour +/− control, completion popup choices, Mystery Pop additions, extras pricing, automatic 20-Pop Jumbo pricing, Finish Order, delivery validation, payment selection, and WhatsApp submission opening.
- Check for unexpected movement, overlap, missing controls, console/runtime errors, and broken requests.

## Technical details
- Keep the existing pack pricing formulas and Order-page Lemon card unchanged.
- Use stable state derived from total quantity for Finish Order availability rather than relying on only one popup choice.
- Verify the central journey with Playwright at desktop and mobile sizes after the preview rebuilds.