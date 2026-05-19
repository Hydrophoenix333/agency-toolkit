import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

export async function generateCommand({ kind, type, client, output = 'output' }) {
  console.log(chalk.bold.cyan('\n  ⬢ Agency Toolkit') + chalk.gray(` — Generate ${kind}\n`));

  // ── Load brand config ──
  const configPath = join(process.cwd(), 'brand-config.json');
  if (!existsSync(configPath)) {
    console.log(chalk.red('  ✗ No brand-config.json found.'));
    console.log(chalk.gray('  Run ') + chalk.cyan('atk init') + chalk.gray(' first.\n'));
    process.exit(1);
  }
  const config = JSON.parse(readFileSync(configPath, 'utf8'));

  // ── Resolve template ──
  let templatePath;
  let outputName;

  if (kind === 'proposal') {
    const proposalType = type || 'seo-diagnostic';
    templatePath = join(TEMPLATES_DIR, 'proposal', `${proposalType}.html`);
    outputName = `proposal-${slugify(client || 'untitled')}.html`;
  } else if (kind === 'landing') {
    templatePath = join(TEMPLATES_DIR, 'landing', 'default.html');
    outputName = `landing-${slugify(client || 'untitled')}.html`;
  } else if (kind === 'diagnostic') {
    templatePath = join(TEMPLATES_DIR, 'diagnostic', 'default.html');
    outputName = `diagnostic-${slugify(client || 'untitled')}.html`;
  } else if (kind === 'design-system') {
    templatePath = join(TEMPLATES_DIR, 'design-system', 'default.html');
    outputName = `design-system-${slugify(config.brand.name)}.html`;
  }

  if (!existsSync(templatePath)) {
    console.log(chalk.red(`  ✗ Template not found: ${templatePath}`));
    console.log(chalk.gray(`  Available types for proposals: seo-diagnostic, social-media, ads, full-service\n`));
    process.exit(1);
  }

  // ── Get client info if missing ──
  let clientInfo = { name: client };
  if (kind !== 'design-system') {
    if (!client) {
      const answer = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Client name:',
        validate: (v) => !!v.trim() || 'Required'
      }]);
      clientInfo.name = answer.name;
      outputName = `${kind}-${slugify(clientInfo.name)}.html`;
    }

    const more = await inquirer.prompt([
      { type: 'input', name: 'website', message: 'Client website (optional):', default: '' },
      { type: 'input', name: 'industry', message: 'Client industry (optional):', default: '' }
    ]);
    clientInfo = { ...clientInfo, ...more };
  }

  // ── Render ──
  const spinner = ora('Rendering template...').start();
  let html = readFileSync(templatePath, 'utf8');
  html = renderTemplate(html, { brand: config.brand, client: clientInfo });

  // ── Write ──
  const outDir = join(process.cwd(), output);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, outputName);
  writeFileSync(outPath, html);
  spinner.succeed(`Generated ${chalk.cyan(outputName)}`);

  console.log(chalk.bold.green('\n  ✓ Done!'));
  console.log(chalk.gray('  File: ') + chalk.cyan(outPath));
  console.log(chalk.gray('  Open it in your browser, or deploy:'));
  console.log(chalk.gray('  → ') + chalk.cyan(`atk deploy ${outPath}\n`));
}

// ── Template renderer ──
function renderTemplate(html, data) {
  // Handle dot notation: {{brand.name}}, {{client.name}}
  return html.replace(/\{\{([^}]+)\}\}/g, (match, expr) => {
    const path = expr.trim().split('.');
    let value = data;
    for (const key of path) {
      if (value == null) return match;
      value = value[key];
    }
    return value != null ? String(value) : match;
  });
}

function slugify(str) {
  return String(str || 'untitled')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}
