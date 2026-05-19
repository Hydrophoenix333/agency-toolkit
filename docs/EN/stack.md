# Stack Guide

The toolkit ships with a curated, intentional stack. Each library has a specific job.

## Stack overview

| Library | Purpose | When to use |
|---------|---------|-------------|
| [Motion](https://motion.dev) | Modern animations | Fade-in, hover, layout shifts, page transitions |
| [GSAP](https://gsap.com) + ScrollTrigger | Complex animations | Counters, timelines, scroll-driven sequences |
| [VanillaTilt](https://micku7zu.github.io/vanilla-tilt.js/) | 3D hover | Card depth on hover |
| [Chart.js](https://www.chartjs.org) | Data viz | Only when there's real data |
| [Lucide](https://lucide.dev) | Icons | Inline SVG icons (never emojis) |
| Google Fonts | Typography | Plus Jakarta + Inter + JetBrains Mono (or your brand's choice) |

## Motion vs GSAP — when to pick which

**Use Motion when:**
- You need declarative, simple animations
- The animation is hover, fade, scale, layout
- You want minimal bundle (~15KB vs GSAP's ~70KB)
- You're animating React-like components

**Use GSAP when:**
- You need a timeline with many sequenced steps
- You're doing scroll-driven animations (ScrollTrigger)
- You need counters that interpolate numbers
- You're orchestrating multiple elements with stagger

**Use both** in the same file if needed. They don't conflict.

## CDN URLs (already included in templates)

```html
<!-- Motion (ES modules) -->
<script type="module">
  import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';
  animate('.card', { opacity: 1, y: 0 }, { duration: 0.6 });
</script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- VanillaTilt -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

## Cult UI patterns (12 included as CSS classes)

The toolkit includes 12 visual patterns adapted from cult-ui.com to vanilla CSS:

1. **Distorted Glass** — SVG feTurbulence + feDisplacementMap
2. **BgAnimateButton** — conic-gradient spin with @property
3. **Texture Card** — nested borders with gradients
4. **Gradient Heading** — bg-clip-text + transparent
5. **Animated Number** — spring easing with IntersectionObserver
6. **Expandable Card** — max-height transition + chevron
7. **Dynamic Island** — shape-morphing container
8. **Grid Beam** — SVG animated grid with random flashes
9. **Border Beam** — conic-gradient spinning border with CSS mask
10. **Lightboard Text Flicker** — character scramble reveal
11. **Neumorph Card** — dark neumorphism with inset shadows
12. **Squiggle Arrow** — SVG stroke-dasharray animation

See [src/patterns/cult-ui-patterns.md](../../src/patterns/cult-ui-patterns.md) for code snippets.

## When to use each pattern

| Use case | Recommended patterns |
|----------|---------------------|
| Diagnostic / Report | Texture Card + Gradient Heading + Animated Number + Border Beam |
| Sales Proposal | BgAnimateButton + Distorted Glass + Grid Beam |
| Client Landing | BgAnimateButton + Expandable Card + Animated Number |
| Dashboard | Animated Number + Border Beam + Grid Beam |
| Closing Slide | Lightboard Text Flicker + Dynamic Island + Squiggle Arrow |
