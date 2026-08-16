# Burger Shop — Nuxt 3 Restaurant Frontend

A fully client-side Nuxt 3 ordering experience for a fictional burger & pizza restaurant. There is **no backend, no API, and no database** — every account, cart, order, and favorite lives entirely in the browser's `localStorage`.

## Tech stack

- **Nuxt 3** with the Vue 3 Composition API
- **Tailwind CSS** (via `@nuxtjs/tailwindcss`) with a custom design system — colors, type scale, and a signature "kitchen ticket" component style
- No external UI library, state manager, or backend dependency

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

### Feedback & confirmation

Every meaningful action (adding to cart, placing an order, saving a profile change, signing out, etc.) surfaces a toast notification via `composables/useToast.ts` and `components/ToastStack.vue`. Destructive or hard-to-undo actions — signing out, removing a saved photo — go through a confirmation dialog via `composables/useConfirm.ts` and `components/ConfirmModal.vue` before anything happens.

## Project structure

```
components/     Navbar, Footer, MenuCard, CartDrawer, StarRating, PromoBar,
                ToastStack, ConfirmModal
composables/    useAuth, useCart, useOrders, useFavorites, useFoodImages,
                useToast, useConfirm — all state is localStorage-backed
                where it needs to persist
data/menu.ts    Menu items across Burgers, Pizza, Sides, and Drinks
middleware/     auth.global.ts — the signup/login gate
pages/          index (menu), signup, login, checkout, orders, favorites,
                profile, about, careers, contact, locations, press,
                privacy, terms
layouts/        default.vue
public/images/  Custom SVG illustrations used across the site
assets/css/     Tailwind entry point and design tokens
```

## Build for production

```bash
npm run build
node .output/server/index.mjs
```