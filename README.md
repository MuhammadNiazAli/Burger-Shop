# Burger Shop — Nuxt 3 Restaurant Frontend

A fully client-side Nuxt 3 ordering experience for a fictional burger & pizza restaurant, with a "kitchen ticket" design language, scroll-driven motion, and polished micro-interactions throughout. There is **no backend, no API, and no database** — every account, cart, order, and favorite lives entirely in the browser's `localStorage`.

## Tech stack

- **Nuxt 3** with the Vue 3 Composition API
- **Tailwind CSS** (via `@nuxtjs/tailwindcss`) with a custom design system — colors, type scale, and a signature "kitchen ticket" component style
- **[@vueuse/motion](https://motion.vueuse.org/)** — scroll-triggered reveals and staggered entrance animations (hero, trust bar, testimonials, "why us" strip)
- **[vue-sonner](https://vue-sonner.vercel.app/)** — toast notifications, themed to match the paper/ticket aesthetic
- No external state manager or backend dependency

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## How it works

### Authentication gate

The first visit redirects straight to `/signup`. No other route is reachable until an account exists. This gate is enforced by `middleware/auth.global.ts`, which re-checks every navigation — including direct URL entry, refreshes, and browser back/forward — so a protected route never flashes into view unauthenticated. Once a session exists, `/login` and `/signup` themselves become unreachable until the person signs out.

- **Sign up** (`pages/signup.vue`) creates an account in `localStorage` under `cc_users` and starts a session immediately.
- **Log in** (`pages/login.vue`) validates against the saved accounts and starts a new session.
- **Sign out** is available from the navbar (desktop and mobile) and the profile page, and always asks for confirmation before clearing the session key `cc_session`.

> This is a demo authentication gate only. Passwords are stored in plain text with no encryption. A production app needs a real backend with hashed credentials and server-side session handling.

### Ordering flow

- **Menu** (`pages/index.vue`) — browse by category, search, and sort by popularity, rating, or price, backed by `data/menu.ts`.
- **Cart** (`composables/useCart.ts`, `components/CartDrawer.vue`) — add, adjust quantity, and remove items from a slide-out drawer.
- **Checkout** (`pages/checkout.vue`) — collect a delivery address and payment method, then place the order.
- **Order history** (`pages/orders.vue`, `composables/useOrders.ts`) — past orders with a live, time-based delivery status tracker and one-tap reorder.
- **Favorites** (`pages/favorites.vue`, `composables/useFavorites.ts`) — save items from any menu card for quick access later.
- **Profile** (`pages/profile.vue`) — update name, avatar, and password.

### Live menu photography

`composables/useFoodImages.ts` fetches real food photos at runtime from two free, keyless public APIs — [Foodish](https://foodish-api.com) for burgers/pizza/sides and [TheCocktailDB](https://www.thecocktaildb.com) for drinks — and caches the result per item in `localStorage` so each item keeps the same photo across visits.

### Motion & micro-interactions

- **Scroll-triggered reveals** — the homepage hero, trust bar, "why us" strip, and testimonials fade/slide into view via `@vueuse/motion` (`v-motion`, `v-motion-slide-visible-once-bottom`, `v-motion-fade-visible-once`), instead of animating once on page load regardless of scroll position.
- **Count-up stats** — the trust-bar numbers (rating, orders served, kitchen time, locations) animate up from zero the moment they scroll into view, via `composables/useMicroFx.ts` (`useCountUp`).
- **Ripple feedback** — every `.btn-primary` / `.btn-outline` button gets a pointer-position ripple on click, applied globally via `plugins/ripple.client.ts` (no per-page wiring needed).
- **Card tilt & shine** — `components/MenuCard.vue` tilts subtly toward the cursor and sweeps a light shine across the product photo on hover.
- **Magnetic CTA** — the hero "View the menu" button nudges toward the cursor (`useMagnetic` in `useMicroFx.ts`).
- **Cart badge pop** — the navbar cart count pops with a spring animation whenever it changes.
- All animations respect `prefers-reduced-motion`.

### Feedback & confirmation

Every meaningful action (adding to cart, placing an order, saving a profile change, signing out, etc.) surfaces a toast notification via `composables/useToast.ts`, rendered by `vue-sonner`'s `<Toaster />` (mounted in `app.vue`) and themed in `assets/css/main.css` to read as a kitchen ticket rather than a stock toast. Destructive or hard-to-undo actions — signing out, removing a saved photo — go through a confirmation dialog via `composables/useConfirm.ts` and `components/ConfirmModal.vue` before anything happens.

## Project structure

```
components/     Navbar, Footer, MenuCard, CartDrawer, StarRating, PromoBar,
                ConfirmModal
composables/    useAuth, useCart, useOrders, useFavorites, useFoodImages,
                useToast, useConfirm, useMicroFx (ripple, magnetic hover,
                count-up) — all state is localStorage-backed where it
                needs to persist
data/menu.ts    Menu items across Burgers, Pizza, Sides, and Drinks
middleware/     auth.global.ts — the signup/login gate
plugins/        ripple.client.ts — global button ripple effect
pages/          index (menu), signup, login, checkout, orders, favorites,
                profile, about, careers, contact, locations, press,
                privacy, terms
layouts/        default.vue
public/images/  Custom SVG illustrations used across the site
assets/css/     Tailwind entry point, design tokens, and micro-interaction
                utility classes (ripple, tilt, shine, glow, toast theming)
```

## Build for production

```bash
npm run build
node .output/server/index.mjs
```