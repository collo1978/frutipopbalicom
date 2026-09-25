# Fruti Pop homepage and order journey

## Goal
Make ordering the clearest action from the first screen, while keeping the existing brand, genuine imagery, exploration pages, social links, and unpublished status.

## Homepage
- Replace the yellow carousel hero with the supplied white, split-layout direction.
- Use the requested headline and subheadline, yellow underline, three framed genuine customer photos, and only the small heart and strawberry accents.
- Add the three compact trust indicators and a green **Order Now →** link to `/order`.
- Remove the carousel, controls, and dots.
- Reorder the page to: hero, Our Flavours, Choose Your Pack, Why Fruti Pop plus farm story, then the existing Pop Moments section.
- Build one simple six-flavour product composition from the genuine supplied pack photographs, without replacing or altering the packaging.
- Add Family and Jumbo cards. Their links open `/order?pack=family` and `/order?pack=jumbo` so the chosen pack is preselected.
- Keep the existing five Pop Moment cards and Occasions link, and remove the older duplicated homepage bands that no longer belong in the requested journey.

## Dedicated order page
- Create `/order` with route-specific title, description, social metadata, and the order form at the top.
- Use a prominent, responsive form with four clear stages: pack, flavours, delivery, and payment.
- Require a pack before flavour selection. Enforce exactly 10 Family pops or 20 Jumbo pops, preserve valid quantities when switching packs, cap every increment at the current pack limit, and show a live total and progress state.
- Validate all required details in the browser before opening WhatsApp: name, international phone number, delivery address, optional valid Google Maps URL, Bali delivery date/time, payment method, and notes length.
- Use an interactive date picker that blocks past dates. Time choices will be validated against Bali local time for same-day requests.
- Show the supplied Mandiri details only for bank transfer, with a copy control. Show the supplied QRIS holding message until the official QR code is provided. Cash on Delivery shows no bank details.
- Add a complete order summary and one final **Send Order on WhatsApp** action. It will open the existing verified Fruti Pop number with the requested order, delivery, payment, price, and optional notes format.
- Keep delivery fees uncalculated and state that they and the final total are confirmed on WhatsApp.

## Supporting order-page content
- Reuse the six genuine product cards and their existing taglines below the form.
- Add the five compact benefit items and the genuine farm photograph with the supplied sourcing copy.
- Keep these sections visually secondary to the order form.

## Shared navigation and legacy journey
- Change the header Order Now control to a plain green `/order` link with no WhatsApp icon.
- Connect all homepage shopping actions to `/order`; WhatsApp will open only from the completed order form on these new shopping paths.
- Keep direct contact and occasion enquiry WhatsApp actions elsewhere, because they are support/enquiry paths rather than homepage shopping CTAs.
- Replace the current **Fill the Freezer** navigation destination with **Order Now** at `/order`.
- Preserve `/packs` as a compatibility redirect to `/order?pack=family` so old links continue to work.

## Responsive and accessibility checks
- Match the supplied desktop and mobile composition while using only genuine existing photos.
- Verify desktop at 1280px and mobile at 390px: no overflow, collage crops preserve faces and products, controls remain easy to tap, and text fits.
- Exercise both preselection links, pack switching, quantity limits, incomplete submission errors, valid WhatsApp message generation, bank-number copy, date/time restrictions, and mobile navigation.
- Confirm every content route retains unique metadata and the preview remains unpublished.

## Technical details
- Add focused reusable sections for the photo collage, benefit strip, pack cards, product line-up, farm story, and order form rather than duplicating markup.
- Use the existing semantic colour tokens and design-system controls, extending tokens only where the supplied pastel accents need a named role.
- Keep all order data in page state. No checkout, online payment capture, database, account system, delivery-fee calculation, or QR code will be added.
- Update the lean roadmap before implementation and clear completed work after verification.
