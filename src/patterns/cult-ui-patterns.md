# Cult UI Patterns — Vanilla HTML/CSS/JS Edition

12 visual patterns adapted from [cult-ui.com](https://cult-ui.com) (React + Tailwind + Framer Motion) to **vanilla HTML/CSS/JS** with zero dependencies.

Copy-paste ready. Use them anywhere.

---

## 1. Border Beam

A spinning conic-gradient border that revolves around a card.

```html
<div class="border-beam">
  <div class="border-beam-inner">your content</div>
</div>
```

```css
@property --beam-angle {
  syntax: '<angle>'; initial-value: 0deg; inherits: false;
}
.border-beam {
  position: relative;
  border-radius: 16px;
  padding: 1px;
  background: conic-gradient(from var(--beam-angle), transparent 70%, #2060FF, transparent 80%);
  animation: beam-spin 4s linear infinite;
}
.border-beam-inner {
  background: #0D0E24;
  border-radius: 15px;
  padding: 28px;
}
@keyframes beam-spin { to { --beam-angle: 360deg; } }
```

---

## 2. Animated Number

Numbers that count up with spring easing when they scroll into view.

```html
<div class="animated-num" data-target="1247">0</div>
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      animateNumber(e.target, parseInt(e.target.dataset.target), 1500);
      observer.unobserve(e.target);
    }
  });
});
document.querySelectorAll('.animated-num').forEach((el) => observer.observe(el));

function animateNumber(el, target, duration) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

---

## 3. Gradient Heading

A heading where part of the text has a gradient fill.

```html
<h1>The future is <span class="grad">automated</span></h1>
```

```css
.grad {
  background: linear-gradient(135deg, #2060FF, #5B52E8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

## 4. Texture Card

Nested borders that create depth + a subtle texture overlay.

```html
<div class="texture-card">
  <div class="texture-inner">your content</div>
</div>
```

```css
.texture-card {
  background: linear-gradient(135deg, #0D0E24, #12142E);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1px;
}
.texture-inner {
  background:
    linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%),
    radial-gradient(at top right, rgba(32, 96, 255, 0.06), transparent 50%);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 17px;
  padding: 28px;
}
```

---

## 5. Distorted Glass

A glassmorphism effect with SVG distortion filter for organic refraction.

```html
<svg style="position:absolute;width:0;height:0">
  <filter id="distort">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3"/>
    <feDisplacementMap in="SourceGraphic" scale="20"/>
  </filter>
</svg>
<div class="distorted-glass">your content</div>
```

```css
.distorted-glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px) url(#distort);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 28px;
}
```

---

## 6. BgAnimateButton

A button with an animated conic-gradient background.

```html
<button class="bg-animate-btn">Click me</button>
```

```css
@property --btn-angle {
  syntax: '<angle>'; initial-value: 0deg; inherits: false;
}
.bg-animate-btn {
  position: relative;
  background: conic-gradient(from var(--btn-angle), #2060FF, #5B52E8, #2060FF);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 100px;
  font-weight: 600;
  cursor: pointer;
  animation: btn-spin 3s linear infinite;
}
@keyframes btn-spin { to { --btn-angle: 360deg; } }
```

---

## 7. Grid Beam

An animated SVG grid background with random "beam" flashes.

```html
<div class="grid-beam-bg">
  <svg viewBox="0 0 800 400" preserveAspectRatio="none">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(32,96,255,0.08)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  </svg>
</div>
```

---

## 8. Expandable Card

A card that expands smoothly when clicked, revealing more content.

```html
<div class="expand-card" onclick="this.classList.toggle('open')">
  <div class="expand-head">
    <span>Click to expand</span>
    <svg class="chev" width="16" height="16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg>
  </div>
  <div class="expand-body">Hidden content shows up when card opens.</div>
</div>
```

```css
.expand-card { background: #0D0E24; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; cursor: pointer; }
.expand-head { display: flex; justify-content: space-between; align-items: center; }
.chev { transition: transform 0.3s ease; }
.expand-card.open .chev { transform: rotate(180deg); }
.expand-body { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.expand-card.open .expand-body { max-height: 200px; padding-top: 16px; }
```

---

## 9. Dynamic Island

A pill-shaped container that morphs into different shapes.

```css
.dynamic-island {
  background: #000;
  color: white;
  padding: 12px 28px;
  border-radius: 100px;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dynamic-island.expanded {
  padding: 24px;
  border-radius: 24px;
  width: 320px;
}
```

---

## 10. Lightboard Text Flicker

Characters in a heading scramble through random letters before settling.

```js
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function scramble(el, finalText, duration = 1500) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);
    let output = '';
    for (let i = 0; i < finalText.length; i++) {
      output += i < revealed ? finalText[i] : chars[Math.floor(Math.random() * chars.length)];
    }
    el.textContent = output;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

---

## 11. Neumorph Card

Dark neumorphism with inset shadows for soft depth.

```css
.neumorph {
  background: #1a1d3d;
  border-radius: 20px;
  padding: 28px;
  box-shadow:
    inset 8px 8px 16px rgba(0,0,0,0.4),
    inset -8px -8px 16px rgba(255,255,255,0.04);
}
```

---

## 12. Squiggle Arrow

A hand-drawn arrow that draws itself in via stroke-dasharray.

```html
<svg class="squiggle" width="120" height="40" viewBox="0 0 120 40">
  <path d="M5 20 Q 30 5, 60 20 T 115 20 L 105 12 M 115 20 L 105 28"
        fill="none" stroke="#2060FF" stroke-width="2" stroke-linecap="round"/>
</svg>
```

```css
.squiggle path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw 1.5s ease-out forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }
```

---

## Combination guide

| Use case | Recommended combo |
|----------|-------------------|
| Diagnostic report | Texture Card + Gradient Heading + Animated Number + Border Beam |
| Sales proposal | BgAnimateButton + Distorted Glass + Grid Beam |
| Client landing | BgAnimateButton + Expandable Card + Animated Number |
| Dashboard | Animated Number + Border Beam + Grid Beam |
| Closing slide | Lightboard Text Flicker + Dynamic Island + Squiggle Arrow |
