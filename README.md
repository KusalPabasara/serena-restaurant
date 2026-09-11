# Serenā Restaurant

Frontend-only luxury website for **Serenā** — a contemporary Sri Lankan farm-to-table fine-dining concept in Colombo 07.

> Concept / demo venue. Contact details and reservations are placeholders for presentation.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing — hero, Taste / Calm / Hygiene, origin story, signatures, atmosphere |
| `/foods` | Native seasonal menu with category filters and LKR pricing |
| `/contact` | Hours, map, dress code, client-side reservation form |

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Framer Motion (2D motion)
- React Three Fiber (desktop hero emblem; mobile uses a CSS 3D brand mark)

## Brand

- Cream `#F6F1E8`, linen `#E8E0D2`, forest `#2F3D32`, gold `#C4A574`
- Serif headings (Cormorant Garamond, self-hosted) + sans UI (Outfit)
- Logo: `public/logo.jpg`

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://127.0.0.1:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Project layout

```
src/pages/          Home, Foods, Contact
src/components/     Nav, Footer, DishCard, HeroCanvas, Reveal
src/data/menu.ts    Menu + venue copy
src/styles/theme.css
public/images/      Generated photography (WebP + JPG)
public/fonts/       Self-hosted brand fonts
```

## Notes

- Reservation form validates in the browser only (no backend).
- Mobile-first layout with hamburger navigation and `prefers-reduced-motion` support.
