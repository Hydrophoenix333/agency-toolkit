<div align="center">

# Agency Toolkit

**Generate premium agency-level HTML proposals, landings, and diagnostics — with your own branding.**

[English](#english) · [Español](#español)

[![npm version](https://img.shields.io/npm/v/agency-toolkit.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/agency-toolkit)
[![npm downloads](https://img.shields.io/npm/dm/agency-toolkit.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/agency-toolkit)
[![GitHub release](https://img.shields.io/github/v/release/Hydrophoenix333/agency-toolkit?color=2060FF&logo=github)](https://github.com/Hydrophoenix333/agency-toolkit/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?logo=node.js)](https://nodejs.org)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skill-orange?logo=anthropic)](https://claude.com/claude-code)

```bash
npm install -g agency-toolkit
```

</div>

---

## English

### What is this?

A toolkit for marketing agencies, freelancers, and consultants who need to send **premium HTML proposals** instead of boring PDFs.

You bring your brand. Agency Toolkit gives you:

- An onboarding wizard that captures your brand identity (colors, fonts, logo, voice)
- A curated vanilla web stack (Motion, GSAP, Cult UI patterns, Chart.js, VanillaTilt)
- Ready-to-use HTML templates for **proposals, landings, diagnostics, design systems, and dashboards**
- A CLI that generates final HTML files with your branding pre-applied

Built so that proposals look like they were made by a senior designer, not by AI.

### Features

| Feature | What it does |
|---------|--------------|
| **Brand onboarding** | Interactive wizard to capture colors, typography, logo, industry, tone |
| **Stack installer** | Checks and offers to install Motion, GSAP, VanillaTilt, Chart.js, Lucide |
| **Proposal generator** | 4 proposal types: SEO/diagnostic, social media, ads management, full service |
| **Landing generator** | Conversion-optimized landings with your branding |
| **Design system generator** | Full HTML design system showcase from your brand config |
| **Bilingual templates** | Spanish + English copy variants out of the box |
| **Mobile-first** | Every template is responsive at 3 breakpoints |
| **Claude Code skill** | Install once into `~/.claude/skills/` and use via slash commands |

### Quick start

#### Option 1: As a CLI (anyone with Node 18+)

```bash
# Install globally
npm install -g agency-toolkit

# Onboarding (one-time per brand)
atk init

# Verify your stack libs are reachable via CDN
atk stack check

# Generate your first proposal
atk generate proposal --type=seo-diagnostic --client="Acme Corp"
```

#### Option 2: As a Claude Code skill

```bash
# Clone into your skills directory
git clone https://github.com/orion-agency/agency-toolkit.git ~/.claude/skills/agency-toolkit

# Now use slash commands in Claude Code:
/atk-init           # Set up your brand
/atk-stack          # Manage frontend stack
/atk-proposal       # Generate a new proposal
```

### How it works

```
1. atk init
   ↓ asks: brand name, primary color, font, logo URL, industry, voice
   ↓ generates: brand-config.json + design-tokens.css

2. atk stack check
   ↓ verifies CDN reachability of Motion, GSAP, VanillaTilt, Chart.js, Lucide
   ↓ asks if you want to download local copies for offline use

3. atk generate proposal --type=X --client=Y
   ↓ reads brand-config.json
   ↓ applies tokens to chosen template
   ↓ swaps placeholders for client-specific data
   ↓ writes output/proposal-{client}.html ready to deploy
```

### The stack (curated, all vanilla)

| Layer | Tool | Why |
|-------|------|-----|
| UX guidelines | [ui-ux-pro-max](https://uupm.cc) | Built-in design intelligence |
| Visual patterns | Cult UI (12 vanilla patterns) | Border Beam, Texture Card, Animated Number, Distorted Glass... |
| Modern animations | [Motion](https://motion.dev) via CDN | Declarative fade-in, hover, transitions |
| Complex animations | GSAP + ScrollTrigger | Counters, timelines, scroll-driven |
| 3D card tilt | VanillaTilt.js | Hover depth on cards |
| Charts | Chart.js 4 | Only when there is real data |
| Icons | Lucide SVG inline | Never emojis as structural icons |
| Typography | Plus Jakarta + Inter + JetBrains Mono | Default trio (overridable per brand) |

### Roadmap

- [x] Brand onboarding wizard
- [x] Stack checker
- [x] Proposal generator (4 types)
- [ ] Landing generator
- [ ] Diagnostic generator
- [ ] Design system HTML generator
- [ ] Deploy command (VPS / Netlify / Vercel)
- [ ] Client discovery (auto-scrape colors/logo from a URL)
- [ ] AI copy assistant (powered by Claude API)
- [ ] PDF export of proposals

### Contributing

PRs welcome. Read [CONTRIBUTING.md](./docs/EN/contributing.md) first.

### License

MIT — see [LICENSE](./LICENSE).

---

## Español

### ¿Qué es esto?

Un toolkit para agencias de marketing, freelancers y consultores que quieren mandar **propuestas HTML premium** en lugar de PDFs aburridos.

Tú pones tu marca. Agency Toolkit te da:

- Un wizard de onboarding que captura tu identidad (colores, tipografía, logo, voz)
- Un stack web vanilla curado (Motion, GSAP, Cult UI patterns, Chart.js, VanillaTilt)
- Templates HTML listos para **propuestas, landings, diagnósticos, design systems y dashboards**
- Un CLI que genera HTML final con tu branding ya aplicado

Hecho para que las propuestas se vean como diseñadas por un senior, no por una IA.

### Características

| Feature | Qué hace |
|---------|----------|
| **Onboarding de marca** | Wizard interactivo para capturar colores, tipografía, logo, industria, tono |
| **Instalador de stack** | Revisa y ofrece instalar Motion, GSAP, VanillaTilt, Chart.js, Lucide |
| **Generador de propuestas** | 4 tipos: SEO/diagnóstico, redes sociales, ads, full service |
| **Generador de landings** | Landings optimizadas para conversión con tu branding |
| **Generador de design system** | Showcase HTML completo desde tu brand config |
| **Templates bilingües** | Copy en español e inglés out of the box |
| **Mobile-first** | Todo template responsive en 3 breakpoints |
| **Skill de Claude Code** | Instalas una vez en `~/.claude/skills/` y usas via slash commands |

### Inicio rápido

#### Opción 1: Como CLI (cualquiera con Node 18+)

```bash
# Instalar global
npm install -g agency-toolkit

# Onboarding (una vez por marca)
atk init

# Verificar que las libs del stack carguen vía CDN
atk stack check

# Generar tu primera propuesta
atk generate proposal --type=seo-diagnostic --client="Acme Corp"
```

#### Opción 2: Como skill de Claude Code

```bash
# Clonar en tu carpeta de skills
git clone https://github.com/orion-agency/agency-toolkit.git ~/.claude/skills/agency-toolkit

# Ahora usa slash commands en Claude Code:
/atk-init           # Configurar tu marca
/atk-stack          # Manejar el stack frontend
/atk-proposal       # Generar una propuesta nueva
```

### Cómo funciona

```
1. atk init
   ↓ pregunta: nombre marca, color primario, tipografía, URL logo, industria, voz
   ↓ genera: brand-config.json + design-tokens.css

2. atk stack check
   ↓ verifica reachability CDN de Motion, GSAP, VanillaTilt, Chart.js, Lucide
   ↓ pregunta si quieres descargar copias locales para uso offline

3. atk generate proposal --type=X --client=Y
   ↓ lee brand-config.json
   ↓ aplica tokens al template elegido
   ↓ reemplaza placeholders con datos del cliente
   ↓ escribe output/proposal-{cliente}.html listo para deploy
```

### El stack (curado, todo vanilla)

| Capa | Herramienta | Por qué |
|------|-------------|---------|
| UX guidelines | [ui-ux-pro-max](https://uupm.cc) | Inteligencia de diseño integrada |
| Patrones visuales | Cult UI (12 patrones vanilla) | Border Beam, Texture Card, Animated Number, Distorted Glass... |
| Animaciones modernas | [Motion](https://motion.dev) vía CDN | Fade-in declarativo, hover, transiciones |
| Animaciones complejas | GSAP + ScrollTrigger | Counters, timelines, scroll-driven |
| 3D card tilt | VanillaTilt.js | Profundidad en hover de cards |
| Gráficas | Chart.js 4 | Solo cuando hay datos reales |
| Iconos | Lucide SVG inline | Nunca emojis como iconos estructurales |
| Tipografía | Plus Jakarta + Inter + JetBrains Mono | Trío default (override por marca) |

### Roadmap

- [x] Wizard de onboarding
- [x] Verificador de stack
- [x] Generador de propuestas (4 tipos)
- [ ] Generador de landings
- [ ] Generador de diagnósticos
- [ ] Generador de design system HTML
- [ ] Comando de deploy (VPS / Netlify / Vercel)
- [ ] Discovery de cliente (auto-scrape colores/logo desde URL)
- [ ] Asistente de copy con IA (Claude API)
- [ ] Export a PDF de propuestas

### Contribuir

PRs bienvenidas. Lee [CONTRIBUTING.md](./docs/ES/contribuir.md) primero.

### Licencia

MIT — ver [LICENSE](./LICENSE).

---

<div align="center">

**Built by [Orion Agency](https://orionagency.tech)** · Made for agencies that ship.

</div>
