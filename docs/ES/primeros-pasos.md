# Primeros pasos

## Instalación

```bash
# Como CLI global
npm install -g agency-toolkit

# Verificar instalación
atk --version
```

O clona para desarrollo:

```bash
git clone https://github.com/orion-agency/agency-toolkit.git
cd agency-toolkit
npm install
npm link
```

## Setup inicial (3 minutos)

### 1. Corre el wizard de onboarding

```bash
atk init
```

Te va a preguntar:

| Paso | Qué captura |
|------|-------------|
| Idioma | EN / ES / Bilingüe |
| Datos básicos | Nombre, tagline, sitio web, industria, ubicación |
| Identidad visual | Color primario, acento, fondo, tema, URL del logo |
| Tipografía | Elige un preset o define fuentes custom |
| Voz | 2-4 atributos que describen tu tono |
| Contacto | WhatsApp, email, URL de calendario |

Resultado: un `brand-config.json` y `design-tokens.css` en tu directorio actual.

### 2. Verifica el stack frontend

```bash
atk stack check
```

Verifica que Motion, GSAP, VanillaTilt, Chart.js, Lucide y Google Fonts carguen desde CDN.

Si necesitas copias offline (para deploy en VPS sin internet, o entornos con CSP estricto):

```bash
atk stack install
```

### 3. Genera tu primera propuesta

```bash
atk generate proposal --client="Acme Corp"
```

Te va a pedir sitio web e industria del cliente. El resultado queda en `output/proposal-acme-corp.html`.

Ábrelo en tu navegador para ver el resultado.

## Workflow diario

Una vez configurada tu marca, generar entregables nuevos es un solo comando:

```bash
# Propuestas
atk gen proposal --type=seo-diagnostic --client="Acme"
atk gen proposal --type=social-media --client="Beta Inc"
atk gen proposal --type=ads --client="Gamma LLC"
atk gen proposal --type=full-service --client="Delta Co"

# Landings
atk gen landing --client="Acme"

# Diagnósticos
atk gen diagnostic --client="Acme"

# Tu design system showcase
atk gen design-system
```

## Dónde quedan los archivos

```
tu-proyecto/
├── brand-config.json       ← Creado por `atk init`
├── design-tokens.css       ← Creado por `atk init`
├── lib/                    ← (opcional) Creado por `atk stack install`
└── output/                 ← Donde caen los HTMLs generados
    ├── proposal-acme.html
    ├── landing-acme.html
    └── design-system-tumarca.html
```

## Siguientes pasos

- [Personalizar templates](./propuestas.md) — cómo forkear y personalizar templates
- [Guía del stack](./stack.md) — cuándo usar Motion vs GSAP vs VanillaTilt
- [Ejemplos](../../examples/) — mira HTMLs generados reales
