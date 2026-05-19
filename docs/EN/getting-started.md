# Getting Started

## Install

```bash
# As a global CLI
npm install -g agency-toolkit

# Verify install
atk --version
```

Or clone for development:

```bash
git clone https://github.com/orion-agency/agency-toolkit.git
cd agency-toolkit
npm install
npm link
```

## First-time setup (3 minutes)

### 1. Run the brand onboarding wizard

```bash
atk init
```

You'll be asked:

| Step | What it captures |
|------|------------------|
| Language | EN / ES / Bilingual |
| Brand basics | Name, tagline, website, industry, location |
| Visual identity | Primary color, accent color, background, theme, logo URL |
| Typography | Pick a preset or define custom fonts |
| Voice | 2-4 attributes that describe your tone |
| Contact | WhatsApp, email, calendar URL |

Result: a `brand-config.json` and `design-tokens.css` in your current directory.

### 2. Check the frontend stack

```bash
atk stack check
```

Verifies that Motion, GSAP, VanillaTilt, Chart.js, Lucide, and Google Fonts are all reachable from CDN.

If you need offline copies (for VPS deploy without internet, or strict CSP environments):

```bash
atk stack install
```

### 3. Generate your first proposal

```bash
atk generate proposal --client="Acme Corp"
```

You'll be asked for client website and industry. The result lands in `output/proposal-acme-corp.html`.

Open it in your browser to see the result.

## Daily workflow

Once your brand is configured, generating new deliverables is one command:

```bash
# Proposals
atk gen proposal --type=seo-diagnostic --client="Acme"
atk gen proposal --type=social-media --client="Beta Inc"
atk gen proposal --type=ads --client="Gamma LLC"
atk gen proposal --type=full-service --client="Delta Co"

# Landings
atk gen landing --client="Acme"

# Diagnostics
atk gen diagnostic --client="Acme"

# Your design system showcase
atk gen design-system
```

## Where files go

```
your-project/
├── brand-config.json       ← Created by `atk init`
├── design-tokens.css       ← Created by `atk init`
├── lib/                    ← (optional) Created by `atk stack install`
└── output/                 ← Where generated HTMLs land
    ├── proposal-acme.html
    ├── landing-acme.html
    └── design-system-yourbrand.html
```

## Next steps

- [Customize templates](./proposals.md) — how to fork templates and customize
- [Stack guide](./stack.md) — when to use Motion vs GSAP vs VanillaTilt
- [Examples](../../examples/) — see real generated HTMLs
