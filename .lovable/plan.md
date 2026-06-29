## Plan: Polish pass across pages, navigation, profile, chat behavior

### 1. Assets
- Import attached `Logo Aroma Abadi BA-Helper.png` as a Lovable asset and use it for: the chatroom assistant avatar AND the floating AI button.
- Import attached `AI Logo.svg` as the alternate floating-AI mark if user prefers SVG (use PNG for avatar, SVG for floating button).
- Generate 6 distinct product images (one per module) and 5 distinct knowledge-card hero images so every module/card has its own picture.

### 2. Login Success
- Remove the bottom-right lotus silhouette from `src/routes/login-success.tsx`.

### 3. Typography & global tokens
- In `src/styles.css`, set `--font-serif` headings to `font-weight: 500` by default (Playfair Display Medium). Add a `.font-serif` rule enforcing weight 500.
- Replace `font-bold` on serif titles across pages with weight-500 classes.

### 4. Home page (`_authenticated.home.tsx`)
- Add 15px top padding above "Good Morning, Bella!".
- Module card title: 16px, sourced from `ModuleCard.tsx`.
- "X/Y cards completed" → regular weight (font-normal).
- Other Brands cards: 235×206px (update width/height + scroll offset).

### 5. Bottom navbar (`BottomNav.tsx`)
- "My Learning" forced to single line (whitespace-nowrap, wider slot).
- Add soft light gold top outline only (`border-t` with gold color token).

### 6. Floating AI (`FloatingAI.tsx`)
- Position 15px above bottom navbar (adjust `--floating-ai-bottom` token).
- Swap icon to uploaded BA-Helper logo PNG.

### 7. Module detail / Knowledge cards
- Knowledge card list items become `<Link>` to `/modules/$moduleId/cards/$cardId`.
- Each card uses its own distinct hero image (from new generated set).
- Each module uses its own distinct product image.

### 8. Profile page rebuild (`_authenticated.profile.tsx`)
Match attached UI Profile Page:
- Avatar with camera badge, name "Bella Victoria", email below.
- "Account Settings" section: Change Username, Change Password, Help, Logout (clickable rows; Logout in burgundy outline).
- "Your Achievements" grid (4 badge cards: First Article, 10 Articles, 50 Articles, Beauty Expert).
- "Reading Statistics": 24 Modules Read, 120 Minutes Reading, 7 Day Streak.
- Footer links FAQ, T&C, Privacy Policy clickable.

### 9. New static content pages
- `src/routes/_authenticated.faq.tsx`
- `src/routes/_authenticated.terms.tsx`
- `src/routes/_authenticated.privacy.tsx`
- `src/routes/_authenticated.help.tsx`
- `src/routes/_authenticated.change-username.tsx`
- `src/routes/_authenticated.change-password.tsx`
- Each with dummy fashion/beauty-brand copy and back button.

### 10. Category page (`_authenticated.category.tsx`)
- Wrap each category tile in `<Link to="/my-learning">` (or category-filtered listing) so they're clickable.
- Use full `SiteFooter` (match Home footer) and ensure spacing matches.

### 11. All Modules page
- New route `src/routes/_authenticated.modules.index.tsx`.
- 2 cols × 5 rows = 10 cards per page, pagination controls + "Showing X–Y of Z" footer.
- Wire `SEE ALL MODULES` button on Home and `SEE ALL` link to this route.
- Extend `modules` mock data to ≥20 items so pagination is meaningful.

### 12. Footer (`SiteFooter.tsx`)
- Increase bottom padding by 20px (taller black area).

### 13. Chat behavior (`_authenticated.chat.$assistantId.tsx` + `api/chat.ts`)
- If `assistantId` matches a known module → keep current product-context UX (show product card, system prompt references that product).
- If `assistantId === "general"` (entered via the FloatingAI from non-module pages) → ChatGPT-style: no product card, generic system prompt.
- Update `FloatingAI` to route to `/chat/general` when not inside a module.

### 14. Animations & micro-interactions
- Add Framer Motion entrance fades/slide-ups on Home sections, module grid cards (stagger), profile cards, all-modules grid items.
- Hover/tap scale on clickable cards (modules, knowledge cards, brand carousel, category tiles, profile rows).
- Page transitions via `AnimatePresence` in `_authenticated.tsx` Outlet wrapper.
- Subtle tap feedback on bottom nav icons.

### Technical notes
- No backend schema changes; all data stays in `src/data/modules.ts` (expanded).
- New routes auto-register via TanStack file-based routing.
- Use semantic Tailwind tokens; add `--gold-soft` token for navbar top outline.
- Distinct images generated via `imagegen` (fast tier) to keep cost low.
