import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BANNER = `
${chalk.bold.cyan('  ⬢ Agency Toolkit')} ${chalk.gray('— Brand Onboarding')}
${chalk.gray('  Captures your brand identity so every output is on-brand.')}
`;

export async function initCommand(options = {}) {
  console.log(BANNER);

  const configPath = join(process.cwd(), 'brand-config.json');

  if (existsSync(configPath) && !options.force) {
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'brand-config.json already exists. Overwrite?',
      default: false
    }]);
    if (!overwrite) {
      console.log(chalk.yellow('\n  ✗ Cancelled.\n'));
      return;
    }
  }

  // ── Step 1: language ──
  const { language } = await inquirer.prompt([{
    type: 'list',
    name: 'language',
    message: 'Preferred language for deliverables / Idioma preferido:',
    choices: [
      { name: 'English', value: 'en' },
      { name: 'Español', value: 'es' },
      { name: 'Bilingual (EN+ES)', value: 'both' }
    ]
  }]);

  const t = translator(language === 'es' ? 'es' : 'en');

  // ── Step 2: brand basics ──
  console.log(chalk.cyan('\n  ' + t('Step 1 of 5 — Brand basics', 'Paso 1 de 5 — Datos básicos de marca')));

  const basics = await inquirer.prompt([
    { type: 'input', name: 'name', message: t('Brand name:', 'Nombre de la marca:'), validate: (v) => !!v.trim() || 'Required' },
    { type: 'input', name: 'tagline', message: t('Tagline (one line):', 'Tagline (una línea):'), default: '' },
    { type: 'input', name: 'website', message: t('Website URL:', 'URL del sitio web:'), default: '' },
    { type: 'input', name: 'industry', message: t('Industry / niche:', 'Industria / nicho:'), default: '' },
    { type: 'input', name: 'location', message: t('Location (city, country):', 'Ubicación (ciudad, país):'), default: '' }
  ]);

  // ── Step 3: visual identity ──
  console.log(chalk.cyan('\n  ' + t('Step 2 of 5 — Visual identity', 'Paso 2 de 5 — Identidad visual')));

  const visual = await inquirer.prompt([
    { type: 'input', name: 'primary', message: t('Primary color (hex):', 'Color primario (hex):'), default: '#2060FF', validate: hexValidator },
    { type: 'input', name: 'accent', message: t('Accent color (hex):', 'Color de acento (hex):'), default: '#5B52E8', validate: hexValidator },
    { type: 'input', name: 'background', message: t('Background color (hex, dark recommended):', 'Color de fondo (hex, oscuro recomendado):'), default: '#04040E', validate: hexValidator },
    { type: 'list', name: 'theme', message: t('Theme:', 'Tema:'), choices: ['dark', 'light'], default: 'dark' },
    { type: 'input', name: 'logoUrl', message: t('Logo URL (optional):', 'URL del logo (opcional):'), default: '' }
  ]);

  // ── Step 4: typography ──
  console.log(chalk.cyan('\n  ' + t('Step 3 of 5 — Typography', 'Paso 3 de 5 — Tipografía')));

  const typography = await inquirer.prompt([
    {
      type: 'list',
      name: 'preset',
      message: t('Typography preset:', 'Preset tipográfico:'),
      choices: [
        { name: 'Modern (Plus Jakarta Sans + Inter + JetBrains Mono) — recommended', value: 'modern' },
        { name: 'Editorial (Fraunces + Inter + JetBrains Mono)', value: 'editorial' },
        { name: 'Bold (Space Grotesk + Inter + JetBrains Mono)', value: 'bold' },
        { name: 'Classic (Inter + Inter + JetBrains Mono)', value: 'classic' },
        { name: 'Custom (pick your own)', value: 'custom' }
      ],
      default: 'modern'
    }
  ]);

  let fonts;
  if (typography.preset === 'custom') {
    const customFonts = await inquirer.prompt([
      { type: 'input', name: 'display', message: t('Display font (headings):', 'Fuente display (titulares):'), default: 'Plus Jakarta Sans' },
      { type: 'input', name: 'body', message: t('Body font:', 'Fuente cuerpo:'), default: 'Inter' },
      { type: 'input', name: 'mono', message: t('Mono font (data/code):', 'Fuente mono (datos/código):'), default: 'JetBrains Mono' }
    ]);
    fonts = customFonts;
  } else {
    fonts = fontPresets[typography.preset];
  }

  // ── Step 5: voice ──
  console.log(chalk.cyan('\n  ' + t('Step 4 of 5 — Brand voice', 'Paso 4 de 5 — Voz de marca')));

  const voice = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'attributes',
      message: t('Pick 2-3 attributes that describe your voice:', 'Elige 2-3 atributos de tu voz:'),
      choices: [
        'Direct', 'Friendly', 'Professional', 'Premium', 'Casual',
        'Technical', 'Empathetic', 'Bold', 'Witty', 'Minimal', 'Energetic', 'Authoritative'
      ],
      validate: (a) => (a.length >= 2 && a.length <= 4) || 'Pick between 2 and 4'
    },
    { type: 'list', name: 'address', message: t('Address the reader as:', 'Tratamiento al lector:'), choices: ['tú', 'usted', 'you (formal)', 'you (casual)'] }
  ]);

  // ── Step 6: contact ──
  console.log(chalk.cyan('\n  ' + t('Step 5 of 5 — Contact info', 'Paso 5 de 5 — Datos de contacto')));

  const contact = await inquirer.prompt([
    { type: 'input', name: 'whatsapp', message: t('WhatsApp (with country code, no symbols):', 'WhatsApp (con código país, sin símbolos):'), default: '' },
    { type: 'input', name: 'email', message: t('Email:', 'Email:'), default: '' },
    { type: 'input', name: 'calendly', message: t('Calendly / booking URL (optional):', 'URL Calendly / agenda (opcional):'), default: '' }
  ]);

  // ── Build config ──
  const config = {
    version: '0.1.0',
    language,
    brand: {
      name: basics.name,
      tagline: basics.tagline,
      website: basics.website,
      industry: basics.industry,
      location: basics.location,
      logoUrl: visual.logoUrl,
      colors: {
        primary: visual.primary,
        accent: visual.accent,
        background: visual.background,
        theme: visual.theme
      },
      typography: {
        preset: typography.preset,
        ...fonts
      },
      voice: {
        attributes: voice.attributes,
        address: voice.address
      },
      contact: {
        whatsapp: contact.whatsapp,
        email: contact.email,
        calendly: contact.calendly
      }
    },
    createdAt: new Date().toISOString()
  };

  // ── Write ──
  const spinner = ora(t('Writing brand-config.json...', 'Escribiendo brand-config.json...')).start();
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  spinner.succeed(t('brand-config.json created', 'brand-config.json creado'));

  // Also write design-tokens.css
  const tokensPath = join(process.cwd(), 'design-tokens.css');
  writeFileSync(tokensPath, generateTokens(config));
  console.log(chalk.green('  ✔ ') + t('design-tokens.css created', 'design-tokens.css creado'));

  // ── Done ──
  console.log(chalk.bold.green('\n  ✓ ' + t('Brand setup complete!', '¡Configuración de marca completa!')));
  console.log(chalk.gray('\n  ' + t('Next steps:', 'Siguientes pasos:')));
  console.log(chalk.gray('  → ') + chalk.cyan('atk stack check') + chalk.gray('  ' + t('verify stack', 'verificar stack')));
  console.log(chalk.gray('  → ') + chalk.cyan('atk generate proposal --client="Acme"') + chalk.gray('  ' + t('first proposal', 'primera propuesta') + '\n'));
}

// ── Helpers ──

const fontPresets = {
  modern: { display: 'Plus Jakarta Sans', body: 'Inter', mono: 'JetBrains Mono' },
  editorial: { display: 'Fraunces', body: 'Inter', mono: 'JetBrains Mono' },
  bold: { display: 'Space Grotesk', body: 'Inter', mono: 'JetBrains Mono' },
  classic: { display: 'Inter', body: 'Inter', mono: 'JetBrains Mono' }
};

function hexValidator(value) {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value.trim()) || 'Must be a hex color like #2060FF';
}

function translator(lang) {
  return (en, es) => (lang === 'es' ? es : en);
}

function generateTokens(config) {
  const { colors, typography } = config.brand;
  return `/* Auto-generated by agency-toolkit init
   Brand: ${config.brand.name}
   Generated: ${config.createdAt}
*/

:root {
  /* Brand colors */
  --brand-primary: ${colors.primary};
  --brand-accent: ${colors.accent};
  --brand-bg: ${colors.background};

  /* Typography */
  --font-display: '${typography.display}', system-ui, sans-serif;
  --font-body: '${typography.body}', system-ui, sans-serif;
  --font-mono: '${typography.mono}', monospace;

  /* Text */
  --text-primary: ${colors.theme === 'dark' ? '#EDF0FF' : '#0A0A0F'};
  --text-secondary: ${colors.theme === 'dark' ? '#8B91B8' : '#5A5F7F'};
  --text-tertiary: ${colors.theme === 'dark' ? '#4E5375' : '#9CA3AF'};

  /* Functional */
  --success: #00C896;
  --warning: #FF8B3E;
  --error: #FF3E5F;

  /* Radii */
  --radius-sm: 8px;
  --radius: 14px;
  --radius-lg: 22px;
}
`;
}
