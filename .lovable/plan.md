# MEDITRUST Healthcare Platform

## Plan

- Replace the starter screen with a distinctive, responsive MEDITRUST storefront using the provided company details, teal identity, and healthcare safeguards.
- Add centralized demonstration data and shared client-side state for products, search, cart, wishlist, mock bookings, and editable admin settings.
- Build customer-facing page flows for pharmacy, wellness, product details, cart and simulated checkout, lab tests, demo consultations, articles, account, and company information.
- Add a separate admin sign-in and dashboard with local demo persistence, editable homepage content and products, plus operational sections clearly marked as sample data.
- Validate the primary shopping/admin journeys, mobile layout, route coverage, and preview build; leave payments, real authentication, patient data, and external services disconnected.

## Technical details

- Keep the existing TanStack Start/Vite/React/Tailwind project foundation; do not add routing, state, icon, or backend packages.
- Use TanStack file-based routes and shared route rendering, handwritten SVG icons, semantic Tailwind tokens, and localStorage only for non-sensitive demo state.
- Use unsent forms and clearly labeled mock flows; prescription file previews remain in-memory only.