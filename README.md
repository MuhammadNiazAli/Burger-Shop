# Char & Crust — Nuxt 3 Restaurant Frontend (No Backend)

Ye ek pura frontend-only Nuxt 3 project hai. Koi backend / API / database nahi hai —
signup aur login dono **localStorage** mein save hote hain, sirf browser ke andar.

## Kaise chalayen (How to run)

```bash
npm install
npm run dev
```

Phir browser mein kholain: `http://localhost:3000`

## Kaise kaam karta hai (How it works)

- **Pehli baar site kholenge** to seedha `/signup` page par redirect ho jayenge —
  jab tak signup nahi karte, koi aur page (menu, about, orders) access nahi ho sakta.
  Ye gate `middleware/auth.global.ts` mein hai.
- **Signup** (`pages/signup.vue`) → naya account `localStorage` (`cc_users`) mein
  save hota hai aur turant login ho jata hai.
- **Login** (`pages/login.vue`) → pehle se bane account se dobara login.
- **Sign out** navbar ke button se — session (`cc_session`) clear ho jata hai.
- **Menu / Cart / Orders** sab kuch bhi `localStorage` use karta hai
  (`composables/useAuth.ts`, `useCart.ts`, `useOrders.ts`).

> Note: Ye sirf ek demo/frontend gate hai — password plaintext localStorage mein
> save hota hai, koi encryption ya real security nahi hai. Real product ke liye
> proper backend + hashed passwords zaroori hain.

## Project structure

```
components/     Navbar, Footer, MenuCard (ticket-style), CartDrawer
composables/    useAuth, useCart, useOrders — sab localStorage-backed
data/menu.ts    Menu items (Burgers, Pizza, Sides, Drinks)
middleware/     auth.global.ts — signup/login gate
pages/          signup.vue, login.vue, index.vue (menu), about.vue, orders.vue
layouts/        default.vue
assets/css/     Tailwind + design tokens
```

## Build for production

```bash
npm run build
node .output/server/index.mjs
```
