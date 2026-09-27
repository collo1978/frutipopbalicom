# Lemon Sorbet and order completion update

## What will change
- Replace the homepage desktop and mobile hero artwork with the two supplied approved files, preserving their original proportions.
- Replace Soursop everywhere with **Lemon Sorbet** and **Super Fresh**, using the supplied Lemon product image in homepage cards, Order cards, product viewing, Mystery Pop, summaries, and messages.
- Replace the tracker’s Soursop illustration with a clear custom lemon illustration and remove every Soursop reference and asset from the current site.
- Change the Our Story heading to “It started with a taste and a journey beyond.” and bold “That idea became Fruti Pop.”
- After “Add More Flavours”, keep a compact **Finish Order →** action inside the completed pack tracker. It will remain available while extras are added and open Delivery Details directly.
- Preserve automatic best pricing: Family at 10, Jumbo at 20, then Rp30,000 per Pop above 20.

## Verification
- Test mobile and desktop hero rendering.
- Test Lemon in both carousels, Mystery Pop, tracker, selection summary, and ordering message data.
- Test that adding or removing Pops does not shift the flavour card, and that Finish Order stays available after choosing Add More.
- Test 20 and 21 Pops to confirm Jumbo pricing and extras.
- Confirm no Soursop reference remains and the preview stays unpublished.

## Technical details
- Store the supplied media through the project asset system without re-encoding it.
- Keep the existing shared Mystery Pop component and flavour data flow so homepage and Order remain consistent.
