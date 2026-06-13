# Shopwave — Frontend Assignment

A mini e-commerce web app built as part of the Nua Woman frontend developer assessment.

**Live URL:** _Add your Vercel link here after deploying_

---

## Tech Stack

- React 18+ with hooks
- Vite as build tool
- SCSS for styling
- React Router v7 for navigation
- Context API for global cart state
- localStorage for cart persistence
- Fake Store API for product data
- Vitest for unit tests

---

## Setup

Make sure you have **Node 18+** installed.

# Clone the repository
git clone [https://github.com/Kirtisahu248/Ecom-WebApp-Assesment.git]

# Go into the project folder
cd ecom-webapp

# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test

# Build for production
npm run build

---

## Folder Structure

ecom-webapp/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── CartDrawer/
│   │   └── ProductCard/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.scss
│   │   ├── ProductDetailPage.jsx
│   │   └── ProductDetailPage.scss
│   ├── stores/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── mockData.js
│   └── styles/
│       ├── _variables.scss
│       └── global.scss
├── tests/
│   └── variantSelector.test.jsx
├── docs/
│   └── lighthouse.png
├── DECISIONS.md
└── README.md

---

## Features

- Product listing page with responsive grid
- Quick Add to Cart directly from product card
- Product detail page with thumbnail swapping, colour swatches, and size buttons
- Size states — available, low stock, and sold out
- Add to Cart and quantity controls disabled when selected variant is sold out
- Selected variant reflected in URL — page is deep-linkable
- Navbar with cart icon and live item count badge
- Cart drawer sliding in from the right with quantity controls
- Bill summary with subtotal and grand total
- Cart persists in localStorage across page refreshes
- Category-based variant display — clothing shows colours and sizes, jewellery hides both, monitors show screen sizes
- Fully responsive — desktop grid, mobile single column

---

## Tests

Tests are written using **Vitest**, located in the `tests/` folder.

`variantSelector.test.jsx` covers the following:

| Test | What it checks |
|---|---|
| Sold-out size state | XL is correctly marked as `sold-out` in mock data |
| Low-stock size state | M is correctly marked as `low-stock` in mock data |
| Available size state | XS is correctly marked as `available` in mock data |
| Quantity floor | Decrementing below 1 keeps quantity at 1 |
| Quantity increment | Quantity increases correctly from 1 to 2 |
| Sold-out detection | `isSoldOut` logic correctly identifies a sold-out variant |
| Add to Cart blocked | Cart does not update when selected variant is sold out |

Run tests with:

npm run test

---

## Known Trade-offs

- **Variant data is mocked** — Fake Store API has no colour, size, or stock data. These are hardcoded in `mockData.js`
- **Thumbnail images** — API provides one image per product. Same image is repeated with a fade animation to demonstrate the swapping interaction
- **Plain JavaScript** — TypeScript was preferred but skipped to meet the 48-hour deadline

---

## Design Decisions

See [DECISIONS.md] for architectural decisions and trade-offs made during the build.