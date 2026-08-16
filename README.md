# Burger Shop. Nuxt 3 Restaurant Frontend. No Backend.

This is a fully frontend Nuxt 3 project. There is no backend API or database. Signup and login are both saved in localStorage inside the browser.

## How to run

```bash
npm install
npm run dev
```

Then open your browser at `http://localhost:3000`.

## How it works

The first time the site opens it redirects straight to the signup page. Until an account is created no other page can be reached. This gate lives in `middleware/auth.global.ts` and it is strict. Once someone is logged in they cannot go back to the signup or login pages either. They stay locked in until they sign out.

Signup in `pages/signup.vue` saves a new account to localStorage under the key `cc_users` and logs the person in right away.

Login in `pages/login.vue` checks the saved account and starts a new session.

Profile in `pages/profile.vue` lets someone upload an avatar, edit their name, and change their password.

Sign out is available from the navbar and from the mobile menu. It clears the session key `cc_session`.

The menu, cart, and order history all live in localStorage as well, through the composables `useAuth.ts`, `useCart.ts`, and `useOrders.ts`.

This is a demo authentication gate only. Passwords are saved in plain text in localStorage with no encryption and no real security. A real product needs a proper backend with hashed passwords.

## Project structure

```
components/     Navbar, Footer, MenuCard, CartDrawer, StarRating, PromoBar
composables/    useAuth, useCart, useOrders, all localStorage backed
data/menu.ts    Menu items across Burgers, Pizza, Sides, and Drinks
middleware/     auth.global.ts, the signup and login gate
pages/          signup, login, index (menu), about, orders, profile, contact, locations
layouts/        default.vue
public/images/  Custom SVG illustrations used across the site
assets/css/     Tailwind and design tokens
```

## Build for production

```bash
npm run build
node .output/server/index.mjs
```