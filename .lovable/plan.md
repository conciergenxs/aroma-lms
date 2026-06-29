## Polish pass — round 3

### 1. Footer spacing (all pages)
- `src/components/layout/SiteFooter.tsx`: change `pb-[100px]` → `pb-[100px]` kept as internal bottom padding for footer content, and remove any wrapper margin below it. The user asked for "100px padding bottom to footer" AND "below footer section have 0px padding/empty area". Interpretation: footer keeps internal `pb-[100px]`, but there must be NO empty space rendered after the footer (audit `_authenticated.tsx` layout to ensure no `mb`/`pb` follows `<Outlet />`/footer wrapper).

### 2. Other Brands logos
- Upload the 4 attached brand assets (`BareMinerals.svg`, `Dolce&Gabbana logo.png`, `Rimmel.svg`, `Sisley.svg`) via `lovable-assets create` into `src/assets/brands/`.
- Update `brands` array in `src/data/modules.ts` to: Dolce & Gabbana, bareMinerals, Rimmel, Sisley — each with their logo asset.
- `src/routes/_authenticated.home.tsx`: render the brand logo centered on the dark card (white logo on the dark gradient background image), remove the text name (logo IS the name), keep count below.

### 3. Knowledge card cover (module detail page)
- `src/routes/_authenticated.modules.$moduleId.tsx`:
  - Increase image cover height by 15px (change `aspect-[16/8]` → fixed `h-[195px]` or similar, ~15px taller than current).
  - Add horizontal padding to match the progress bar's container (`px-3`), and apply `rounded-lg` to the image so it has rounded corners and side gutters.

### 4. Knowledge card click bug
- Verify `src/routes/_authenticated.modules.$moduleId.cards.$cardId.tsx` exists and route ID matches `/_authenticated/modules/$moduleId/cards/$cardId`.
- If the issue is the `<Link>` wrapping inside `motion.div` interfering with click on mobile, change `motion.div` → use `motion.create(Link)` or apply `whileTap` directly on Link via a wrapping div without blocking pointer events.
- Confirm `params={{ moduleId, cardId }}` are both passed.

### 5. Chat "Chat not found" for module-specific chats
- `src/data/chat.ts`: only 3 sessions exist. When floating AI button on any other module routes to `/chat/$moduleId`, loader throws notFound.
- Fix: in `src/routes/_authenticated.chat.$assistantId.tsx` loader, if `getSession(id)` returns nothing AND id matches a module, synthesize a new ChatSession on the fly using `getModule(id)` (product name/brand/image + greeting message referencing the module). Fall back to notFound only if neither session nor module matches.

### 6. Composer placeholder
- `src/routes/_authenticated.chat.$assistantId.tsx`: change `<PromptInputTextarea placeholder="Message" />` (or whatever current text) → `placeholder="Type your message here.."`.

### 7. Login page placeholders + password toggle
- `src/routes/index.tsx`:
  - Username input: `placeholder="Type your username here.."` with `placeholder:text-foreground/35`.
  - Password input: `placeholder="Type your password.."` same soft grey.
  - Wrap password in a relative container, add Eye/EyeOff button (lucide) absolute right, toggle `type` between `password` and `text`.
  - Clear default values (`useState("")`) so placeholders are visible.

### 8. Floating AI button — "make it more"
- Interpretation: increase visibility/prominence. `src/components/layout/FloatingAI.tsx`: bump size from 58px → 64px, strengthen shadow, add a subtle continuous pulse ring animation (framer-motion or tailwind `animate-pulse` halo).

### 9. Profile camera icon position
- `src/routes/_authenticated.profile.tsx`: move camera button from `-top-1 -right-1` → `bottom-1 right-1` (bottom-right of avatar circle, outside via slight offset).

### 10. Change Username / Change Password placeholders
- `src/routes/_authenticated.change-username.tsx`: add `placeholder="Type your new username here.."` to new username input (and `placeholder="Type your current username here.."` to current if it's an input).
- `src/routes/_authenticated.change-password.tsx`: `placeholder="Type your old password here.."`, `placeholder="Type your new password here.."`, `placeholder="Confirm your new password.."`.

### Technical notes
- Brand logos are white SVGs — render them as `<img>` with white tint already baked in; place over the existing dark image background.
- No backend changes; no new routes; no schema changes.
- All changes are presentation-only.
