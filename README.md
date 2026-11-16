# DEEPIZZA — demo website

Multipage fast-food site for **highly stuffed** pizza: menu, cart, checkout, delivery tracking, and admin dashboard.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Page | Purpose |
|------|---------|
| Home | Branding, hero, highlights |
| Products | Pizza, burgers, drinks, sides — category cards + reviews |
| Pizza menu | Deep Dish / Stuffers / Premium focus |
| Home | Deal slider (from Instagram), best sellers, team, reviews |
| Order | Cart, customer details, payment, place order |
| Track Delivery | Order ID timeline (syncs with admin status) |
| About | Central Park location & contact |
| Admin | Open dashboard — incoming, pending & completed orders |

Orders are stored in `data/orders.json` on the server.

## Theme

Light purple & beige, scroll **fade-in** via `IntersectionObserver` (`.reveal`).