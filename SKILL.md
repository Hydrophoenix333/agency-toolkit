---
name: agency-toolkit
description: Generate premium agency-level HTML proposals, landings, diagnostics, and design systems with the user's own branding. Use when the user asks to "create a proposal", "build a landing", "generate a diagnostic", "make a design system", "build a marketing report", or wants to start a new client deliverable. Uses Motion, GSAP, Cult UI patterns, and Chart.js on a vanilla HTML/CSS/JS base — no build step required. Multilingual (EN + ES).
type: skill
version: 0.1.0
author: Orion Agency
homepage: https://github.com/orion-agency/agency-toolkit
license: MIT
---

# Agency Toolkit Skill

Premium HTML generator for marketing agencies, freelancers, and consultants.

## When to invoke

Invoke this skill when the user says any of:

- "Create a proposal for [client]"
- "Generate a landing page"
- "Build a diagnostic report"
- "Make a design system for my brand"
- "Build a marketing report"
- "Start a new client deliverable"
- "Genera una propuesta"
- "Hazme una landing"
- "Crea un diagnóstico"

## Workflow

### Step 0 — Check brand config

Before generating any HTML, verify that `brand-config.json` exists in the current directory or in `~/.agency-toolkit/`.

If it does not exist, run `/atk-init` first to capture the user's brand identity.

### Step 1 — Identify deliverable type

Ask the user which type of deliverable they want:

1. **Proposal** (4 sub-types: SEO/diagnostic, social media, ads management, full service)
2. **Landing page** (conversion-focused)
3. **Diagnostic / audit report**
4. **Design system showcase**
5. **Dashboard / report**

### Step 2 — Identity rule (critical)

Apply the **Orion Agency identity rule**:

- If the deliverable is FROM the user's agency (proposal, diagnostic, report, internal page) → use the user's brand tokens
- If the deliverable is FOR a client to use (their landing, their website, their funnel) → discover and apply the **client's** branding, not the user's

Always ask the user which case applies if ambiguous.

### Step 3 — Discovery (when output is for a client)

When generating output for a client, do client discovery first:

| Resource | Source |
|----------|--------|
| Client logo | Web, social media, ask user |
| Client colors | CSS of their website, brand guide |
| Client photos | Their website, Instagram, Google Maps |
| Screenshots of current state | Playwright / browser tool |

### Step 4 — Generate

Use the appropriate template from `src/templates/`. Replace placeholders:

- `{{brand.name}}` — brand name
- `{{brand.primary}}` — primary color hex
- `{{brand.accent}}` — accent color hex
- `{{brand.logo}}` — logo SVG or image URL
- `{{client.name}}` — client name (if applicable)
- `{{client.url}}` — client website
- `{{date}}` — current date

### Step 5 — Quality gate

Before delivering, verify:

- [ ] Brand colors applied consistently
- [ ] Mobile responsive at 3 breakpoints (≤900px, ≤700px, ≤420px)
- [ ] Client name appears ≥5 times if output is a proposal
- [ ] No invented case studies or fake testimonials
- [ ] Disclaimer present on any results projection section
- [ ] WhatsApp / contact CTA points to the user's real number
- [ ] All CDN libs load (Motion, GSAP, Chart.js, VanillaTilt)

### Step 6 — Output location

Save final HTML to:

```
output/{type}-{slug}.html
```

Where `{slug}` is the kebab-case of client/project name.

## Stack used (always)

| Tool | Purpose |
|------|---------|
| Vanilla HTML/CSS/JS | Single file, deployable anywhere |
| Motion (motion.dev) | Modern declarative animations |
| GSAP + ScrollTrigger | Complex scroll-driven animations and counters |
| VanillaTilt.js | 3D hover on cards |
| Chart.js 4 | Data visualization (only when real data exists) |
| Cult UI patterns | Border Beam, Texture Card, Animated Number, Glass, Grid Beam |
| Lucide icons | Inline SVG, never emojis structurally |
| Plus Jakarta Sans + Inter + JetBrains Mono | Default typography (override-able per brand) |

## CLI commands available

The user can also invoke commands directly:

```bash
atk init                                          # Brand onboarding
atk stack check                                   # Verify stack libs
atk stack install                                 # Download libs locally
atk generate proposal --type=X --client=Y         # Generate proposal
atk generate landing --client=Y                   # Generate landing
atk generate diagnostic --client=Y                # Generate diagnostic
atk generate design-system                        # Generate design system showcase
atk deploy --target=vps                           # Deploy to VPS
```

## Bilingual support

All copy in templates is available in EN and ES. Read `brand-config.json` for the user's preferred language and use that variant.

## Notes for the AI

- Never invent client testimonials, case studies, or fake numbers
- Always ask for the price before filling in the investment section
- If client has no logo / weak branding, offer to generate a placeholder
- Mobile-first: every template must look great at 375px width
- Avoid emojis in deliverables (use Lucide SVG icons instead)
