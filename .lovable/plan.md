## Polish pass — fixes from feedback

### 1. Floating AI button
- `src/styles.css`: raise `--floating-ai-bottom` by 100px (current 79px → 179px) so the button sits ~100px higher.

### 2. Bottom navbar
- `src/components/layout/BottomNav.tsx`: remove the gold pill (`<motion.span layoutId="nav-dot" />`) that renders above the active icon. Keep gold color on active icon/label for state.

### 3. Category page routing
- Add a new route `src/routes/_authenticated.category.$categoryId.tsx` showing all modules filtered by category (reuse the All-Modules grid + pagination, scoped to `categoryId`).
- `src/routes/_authenticated.category.tsx`: change tile `<Link>` from `/my-learning?category=` to `/category/$categoryId`.
- `src/data/modules.ts`: ensure each module has a `categoryId` matching `categories[].id`; add a `getModulesByCategory(id)` helper.

### 4. Profile page
- `src/routes/_authenticated.profile.tsx`:
  - Move the camera button OUTSIDE the avatar circle (absolute-positioned just below-right but not clipped by `overflow-hidden`; wrap avatar img in its own div and place the button as a sibling).
  - Darken the achievement card unlocked color from `#f5a8ad` to a deeper pink (e.g. `#e87a85`).
  - Wire menu rows to real routes:
    - Change Username → `/change-username`
    - Change Password → `/change-password`
    - Help → `/help`
  - Logout: open a shadcn `AlertDialog` confirmation ("Are you sure you want to logout?" / Cancel / Logout). On confirm, navigate to `/`.

### 5. New routes (clickable previously-broken links)
- `src/routes/_authenticated.change-username.tsx`: simple form (current username display + new username input + Save). Back button to `/profile`. Dummy save (toast).
- `src/routes/_authenticated.change-password.tsx`: current password / new password / confirm fields + Save. Back to `/profile`. Dummy save (toast).
- `src/routes/_authenticated.help.tsx`: headline paragraph + "Contact Support" section + green WhatsApp button linking to `https://wa.me/<number>?text=...` (opens AI WhatsApp). Back to `/profile`.

### 6. Knowledge card click bug
- `src/routes/_authenticated.modules.$moduleId.cards.$cardId.tsx`: verify route exists and renders; the issue is most likely a `<Link>` nested incorrectly or `params` mismatch. Audit `src/routes/_authenticated.modules.$moduleId.tsx` knowledge-card `<Link>` — confirm `to="/modules/$moduleId/cards/$cardId"` and both `moduleId`/`cardId` params are passed. Also check that no parent element intercepts clicks (e.g. button inside link). Fix so clicking any knowledge card opens its detail.

### 7. Footer spacing
- Remove the extra bottom padding above every footer:
  - `src/components/layout/SiteFooter.tsx`: drop `mt-16` (and any large `pt-14`/extra top padding) so it sits flush against page content. Keep internal footer padding as-is.
  - Audit pages that add their own bottom margin before `<SiteFooter />` and remove it.

### Technical notes
- No backend changes.
- Use `@/components/ui/alert-dialog` for the logout confirmation (already in components/ui).
- WhatsApp link uses a placeholder number (`+62 812-0000-0000`) until user provides one.
- All new pages get framer-motion fade-in to match existing micro-interactions.
