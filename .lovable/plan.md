## Plan

I’ll treat the attached screenshots — not the current prototype output — as the exact visual source of truth and rebuild the mismatched screens around them.

### 1. Global visual system
- Tighten the app to the mobile reference width and spacing shown in the screenshots.
- Use the reference palette consistently: warm off-white background, burgundy primary, tan progress band, black footer/navbar, soft peach chat/product cards.
- Tune typography to match the screenshots: editorial serif headings and clean sans body text, with closer sizes/weights/spacing.
- Remove generic-looking styling that made the UI drift from the references.

### 2. Login and login success
- Rebuild login to match `Login-1.png`:
  - Centered burgundy Aroma lotus near the top.
  - `Welcome Back` heading and subtitle at the same vertical rhythm.
  - Rounded white username/password fields with the shown example values.
  - Forgot password link aligned right.
  - Burgundy pill login button.
  - Large pale grey lotus silhouette only in the bottom-right area, not centered across the whole bottom.
- Match `Login Success.png`:
  - Centered tan success circle/check.
  - Correct spacing, divider, Laura Mercier wordmark, and pale bottom-right lotus silhouette.

### 3. Authenticated header, footer, bottom navbar, floating AI
- Match the reference header exactly:
  - White header bar.
  - Aroma icon + vertical divider + Laura Mercier wordmark left.
  - Thin burgundy profile circle right.
- Bottom navbar:
  - Fixed dark bar with the same icon layout, height, active tan color, and shadow as the screenshots.
  - Keep it on Home, Category, My Learning, Profile, Module Detail, and Knowledge Detail.
- Floating AI button:
  - Burgundy circular button with the Aroma/AI mark, positioned like the screenshots above the bottom nav, not too low.
  - Hidden inside chatroom.
- Footer:
  - Match dark footer spacing, large white lotus, links, divider, and copyright.

### 4. Home page
- Rebuild to match `Home.png`:
  - Exact greeting section spacing.
  - Search input shape and placeholder styling.
  - Two-column learning module grid with compact cards.
  - Progress label/bar/% placement exactly like the screenshot.
  - Product images inside pale square panels.
  - Truncated long titles where needed.
  - `SEE ALL MODULES` burgundy pill button.
  - `Other Brands` horizontal cards with circular arrow controls and dark image overlays.

### 5. Category page
- Rebuild to match `Category.png`:
  - Same title/subtitle spacing.
  - Two-column tall image tiles.
  - Rounded corners, dark lower overlay, serif category title, module count.
  - Floating AI button overlapping the Wellness area like the reference.
  - Footer alignment and spacing matched to the screenshot.

### 6. Module detail page
- Refine the module detail page using the same card/progress/status language as the references and current Figma intent:
  - Less generic white cards.
  - Progress/card status presentation aligned with the module and knowledge-card visual system.
  - Card list should lead naturally into the knowledge detail screen.

### 7. Knowledge detail and complete-read states
- Rebuild to match `Knowledge Detail.png`, `Knowledge Card Details.png`, and `Complete Read.png`:
  - Header remains visible at top.
  - Hero image starts below header, no gradient overlay.
  - `Back to Modules` appears over the image.
  - White swipeable card overlays the image, with the next card peeking on the right.
  - Card contents match the screenshot: badge, serif title, divider, bullets, key ingredients.
  - AI floating button appears below/right of the card like reference.
  - Tan progress band with white progress bar, percentage, and previous/next knowledge card buttons.
  - Bottom navbar and footer remain visible like the screenshot.
  - Complete-read banner appears at the top in burgundy with tan check icon when progress is 100%, matching `Complete Read.png`.

### 8. Chatroom redesign + real AI behavior
- Rebuild chatroom to match `Chatroom.png`:
  - No global header/footer/bottom nav/floating AI in chat.
  - Top white navbar with `Back to Modules` and burgundy history icon.
  - Assistant strip with burgundy avatar, `Aroma Abadi BA-Helper`, online status, and vertical menu.
  - Product context card aligned to the right with Laura Mercier wordmark, product image, title, close icon, and chat-tail shape.
  - User messages on the right with soft peach background.
  - Assistant messages on the left with subtle light grey background.
  - Fixed bottom composer with rounded input, burgundy mic/send button, and home indicator spacing.
- Make the chat behave like a ChatGPT-style AI chat instead of a static mock:
  - Add an AI chat endpoint using Lovable AI.
  - Use AI Elements / AI SDK chat primitives as the foundation, styled to match the screenshot.
  - Send user messages, stream assistant replies, support markdown formatting, and keep the product context in the system prompt.
  - Keep history UI simple for this pass: show existing/mock sessions visually unless you later ask for saved account history.

### 9. Data/assets cleanup
- Replace random placeholder imagery where possible with more beauty/product-like imagery from the current data setup or available assets.
- Use the uploaded Aroma SVG for the grey lotus silhouette and burgundy/white marks where appropriate.
- Avoid embedding screenshot files as UI images; they remain references only.

### 10. Verification
- Check the rebuilt mobile screens against the attached references at the current 390px-wide viewport.
- Verify login flow, Home, Category, Module Detail, Knowledge Detail, Complete Read state, and Chatroom navigation.
- Confirm chat composer layout is usable and the AI chat surface visually matches the reference.
