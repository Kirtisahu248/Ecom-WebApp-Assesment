# DECISIONS.md

## Architectural Decision: Context API vs Redux

The most significant decision was choosing how to manage global cart state. I had two realistic options: React Context API with useState, or a dedicated state library like Redux.

Redux would have given me a clear action pattern and better devtools support, but it introduces significant boilerplate for a project of this size: actions, reducers, a store setup, and dispatchers just to add an item to a cart felt like overkill. The cart state here is simple — add, remove, update quantity, persist to localStorage. There are no complex derived states or async middlewares needed.

I went with Context API because it is built into React, requires no extra dependencies, and handles this use case cleanly. The CartContext exposes add, remove, update quantity, persist to localStorage. Context with useState handles all of this in one file cleanly.

If this app were to grow — adding user authentication, wishlists, order history, or multiple concurrent async operations — I would move to Redux at that point since the state interactions would become complex enough to justify it.

---

## Three Open Questions I Noticed

### 1. Single Product Image
The Fake Store API provides only one image per product. The requirement mentions thumbnail image swapping. I handled this by creating an array with the same image repeated, combined with a  fade animation so the swapping interaction is clearly visible and testable. I also emailed the HR team before submitting to flag this limitation and ask if there was a preferred approach.

### 2. Missing Variant Data
The API has no colour or size data. I hardcoded sensible defaults in mockData.js — four colours and five sizes with available, low-stock, and sold-out states. I also added category-based logic: clothing shows colours and sizes, jewellery hides both, electronics hides both except monitors which show screen sizes. This felt like the right call given the spec mentioned these states explicitly.

### 3. Sale Price
The API has no original or sale price. I applied a 1.2x multiplier to simulate a crossed-out original price on the detail page. This makes the UI requirement demonstrable without misrepresenting real data.

---

## What I Would Do Differently With More Time

**TypeScript** — I used plain JavaScript to move faster within the 48-hour deadline. In a production codebase I would add interfaces for Product, CartItem, and Variant types to catch errors early and improve readability.

**Shimmer loading UI** — Currently showing plain loading text while products fetch. A skeleton loader would give a more polished experience and is standard in production e-commerce apps.

**Custom useFetch hook** — The fetch logic is currently repeated in HomePage and ProductDetailPage. I would extract it into a reusable useFetch hook to keep components clean and avoid duplication.

**Error Boundary** — Fetch errors are handled with a simple message. A proper React Error Boundary would give users a better fallback experience across the app.

**Toast Notification** — Currently no feedback is shown when a user adds an item to the cart. Toast messages for add-to-cart confirmations and error states would give a clearer, more responsive user experience.
