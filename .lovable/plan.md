
## Scope

Pixel-accurate rebuild of the screens in your attached references, plus the global post-login shell rules (persistent dark bottom navbar, floating AI button, chat-room exception). Static React only — no backend, all data mocked in `src/data/`.

## Global shell rules (post-login)

- Persistent **bottom navbar** rendered on every authenticated route (Home, Category, My Learning, Profile, Module Detail, Knowledge Detail): dark `#161616` rounded bar, 4 items (Home / Category / My Learning / Profile) with the active item in a warm gold/cream tint matching reference. Lives in an `_authenticated` layout route.
- Persistent **floating AI button** (burgundy circle, sparkles icon) on those same routes. Raised significantly above the bottom navbar — `bottom` offset ≈ `7rem` (roughly the "15 cm above" you asked for at mobile scale), right-aligned with `1rem` inset, never overlapping the navbar.
- **Chat room route is the exception**: bottom navbar hidden, floating AI button hidden, its own white top navbar shown instead.

## Pages

**1. Login** (`/`)
- Keep current layout (Welcome Back, inputs, Login button, Forgot Password link).
- Bottom decorative lotus illustration: lighter, more grey — drop opacity to ~`0.18` and shift fill toward warm grey so it blends into the cream background instead of reading as pink.

**2. Login Success splash** → already correct, no change.

**3. Home** (`/_authenticated/home`) — rebuild to match `Home.png`
- Top app bar: lotus logo + Laura Mercier wordmark left, profile circle right (this header reused across all authenticated pages except chat).
- "Good Morning, Bella!" serif heading + subtitle.
- Rounded search input.
- "Learning Modules" section title with "SEE ALL" link.
- 2-column grid of module cards: progress bar + % on top, product image, MAKEUP eyebrow, title.
- Full-width burgundy "SEE ALL MODULES" pill button.
- "Other Brands" carousel with prev/next chevron buttons (Dolce & Gabbana, bareMinerals tiles with dark gradient + label + module count).
- Dark footer with lotus mark, FAQ / T&C / Privacy Policy links, copyright.

**4. Module Detail** (`/_authenticated/modules/$moduleId`) — rebuild to match `Module Detail.png`
- "< Back to Home" link top.
- Hero summary card: product thumbnail + product name + "3/5 Cards completed" + progress bar with %.
- Vertical list of **Knowledge Card** tiles: KNOWLEDGE CARD N badge (left) + status pill (NOT STARTED / IN PROGRESS / COMPLETED, right), progress bar with %, image, title. Each tile navigates into Knowledge Detail.
- "Other Modules" carousel at bottom with chevron controls.
- Dark footer.

**5. Knowledge Detail** (`/_authenticated/modules/$moduleId/cards/$cardId`) — rebuild to match `Knowledge Detail.png` / `Aroma-1.png` / `Complete Read.png`
- "< Back to Modules" overlaid on hero image.
- **Hero image as full background, no gradient overlay.**
- **White card overlay** sitting on top of the image containing: small "KNOWLEDGE CARD N" badge, serif title, bullet list, "Key Ingredients" section. Card has rounded corners, soft shadow, no gradient.
- **Swipeable**: horizontal swipe / drag on the card area moves to the next/previous card (Framer Motion drag with snap, plus Prev/Next buttons as alt).
- Tan progress band below: white progress bar + %, then "< Knowledge Card N-1" / "Knowledge Card N+1 >" pill buttons.
- **Complete Read rule**: on first open of a card, if the card body fits the viewport without scrolling, immediately mark the card complete and show the burgundy "Congratulations! You've finished this module." banner above the white card (per `Complete Read.png`). If the content overflows, the banner only appears once the user has scrolled to the bottom of the white card. Track completed cards in `localStorage` keyed by `moduleId:cardId`.

**6. Chat Room** (`/_authenticated/chat/$assistantId`) — rebuild to match `CMIL 50.png`
- **No bottom navbar, no floating AI button on this route.**
- Top bar (white, separate from the global one): `< Back to [PreviousPage]` left, burgundy history icon button right. "Back to X" label is dynamic — read previous route from a small `useNavigationHistory` store updated in the `_authenticated` layout; falls back to "Modules".
- History icon opens a right-side **Sheet** listing the user's prior chat sessions (mock data) with title + timestamp; clicking one loads its messages.
- Assistant header strip: burgundy circular lotus avatar, "Aroma Abadi BA-Helper" + "online", 3-dot menu on the right.
- Product context card (Laura Mercier wordmark, thumbnail, product title, dismiss X) that can be closed.
- Messages: user bubble right-aligned with warm peach background + timestamp; assistant bubble left-aligned with light grey background + timestamp; tail/corner radius per reference.
- Bottom composer: pill text input "Message" + burgundy circular mic button on right; safe-area home-indicator line below.

**7. Category / My Learning / Profile** — stub routes that reuse the same header + navbar + footer so the persistent navbar contract is honored (full content out of scope this pass; placeholder sections).

## Technical notes

- TanStack Start file routes under `src/routes/_authenticated.*`. The `_authenticated.tsx` layout renders the top header, `<Outlet />`, footer, persistent bottom navbar, and the floating AI button. The chat route uses `_authenticated.chat.$assistantId.tsx` and conditionally hides the navbar + floating button by reading the route match.
- Add a tiny `useNavigationHistory` (Zustand or React context) updated on every route change inside the `_authenticated` layout to power the chat "Back to [X]" label.
- Knowledge card swipe via `framer-motion` `drag="x"` with `onDragEnd` threshold + animated `x` springs.
- "Complete Read" detection via `ResizeObserver` on the card body vs viewport on mount; persists with `localStorage`.
- Mock data in `src/data/modules.ts`, `src/data/knowledgeCards.ts`, `src/data/brands.ts`, `src/data/chatHistory.ts`.
- Design tokens already burgundy `#710014`, cream `#f5f0e8`, warm peach `#f8e8d8`, dark `#161616`, gold `#c9a455`, text greys per references. Add a `--floating-ai-bottom: 7rem` token so the AI button stays consistent.
- Logos: use the uploaded `Navbar_logo.svg` (Aroma + Laura Mercier wordmark) in the header, `AI_Logo.svg` in the chat assistant avatar + floating button, `Logo_Aroma.svg` as the lighter grey decorative login lotus (recolor to neutral grey, opacity ~0.18).
- Accessibility: every clickable icon has an `aria-label`, swipeable card has Prev/Next button fallback, focus rings preserved.

## Out of scope this pass

- Real authentication, Lovable Cloud, AI streaming. The Login button just navigates to `/login-success` → `/home`. The chat composer is non-functional (UI only) unless you ask for the AI hookup next.
- Category / My Learning / Profile full content — only shells.

Reply "approve" (or with tweaks) and I'll build it.
