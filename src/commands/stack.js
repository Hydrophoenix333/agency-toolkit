import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const STACK = [
  {
    name: 'Motion',
    description: 'Modern declarative animations (motion.dev) — fade-in, hover, transitions',
    cdn: 'https://cdn.jsdelivr.net/npm/motion@latest/+esm',
    local: 'lib/motion.min.js',
    type: 'esm',
    required: true
  },
  {
    name: 'GSAP',
    description: 'Complex scroll animations, timelines, counters',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    local: 'lib/gsap.min.js',
    type: 'umd',
    required: true
  },
  {
    name: 'ScrollTrigger',
    description: 'GSAP plugin for scroll-driven animations',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    local: 'lib/ScrollTrigger.min.js',
    type: 'umd',
    required: true
  },
  {
    name: 'VanillaTilt',
    description: '3D card tilt on hover',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js',
    local: 'lib/vanilla-tilt.min.js',
    type: 'umd',
    required: false
  },
  {
    name: 'Chart.js',
    description: 'Data visualization (only when real data exists)',
    cdn: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    local: 'lib/chart.umd.min.js',
    type: 'umd',
    required: false
  },
  {
    name: 'Lucide',
    description: 'SVG icons (alternative to inline SVG)',
    cdn: 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js',
    local: 'lib/lucide.min.js',
    type: 'umd',
    required: false
  }
];

const FONTS_CDN = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';

export async function stackCommand({ action }) {
  console.log(chalk.bold.cyan('\n  ⬢ Agency Toolkit') + chalk.gray(' — Stack manager\n'));

  if (action === 'list') {
    return listStack();
  }

  if (action === 'check') {
    return checkStack();
  }

  if (action === 'install') {
    return installStack();
  }
}

function listStack() {
  console.log(chalk.bold('  Curated frontend stack:\n'));
  STACK.forEach((lib, i) => {
    const num = chalk.gray(String(i + 1).padStart(2, ' ') + '.');
    const name = chalk.cyan(lib.name.padEnd(16));
    const flag = lib.required ? chalk.green('required') : chalk.gray('optional');
    console.log(`  ${num} ${name} ${flag}`);
    console.log(`      ${chalk.gray(lib.description)}`);
    console.log(`      ${chalk.dim(lib.cdn)}\n`);
  });
  console.log(chalk.bold('  Fonts:\n'));
  console.log(`  ${chalk.cyan('Google Fonts')} ${chalk.gray('— Plus Jakarta + Inter + JetBrains Mono')}`);
  console.log(`      ${chalk.dim(FONTS_CDN)}\n`);
}

async function checkStack() {
  console.log(chalk.gray('  Checking CDN reachability...\n'));

  for (const lib of STACK) {
    const spinner = ora(`${lib.name}`).start();
    try {
      const res = await fetch(lib.cdn, { method: 'HEAD' });
      if (res.ok) {
        spinner.succeed(`${chalk.cyan(lib.name.padEnd(16))} ${chalk.gray(res.status)} ${chalk.green('✓ reachable')}`);
      } else {
        spinner.fail(`${chalk.cyan(lib.name.padEnd(16))} ${chalk.gray(res.status)} ${chalk.red('✗ failed')}`);
      }
    } catch (err) {
      spinner.fail(`${chalk.cyan(lib.name.padEnd(16))} ${chalk.red('✗ no network')}`);
    }
  }

  // Fonts
  const spinner = ora('Google Fonts').start();
  try {
    const res = await fetch(FONTS_CDN, { method: 'HEAD' });
    spinner.succeed(`${chalk.cyan('Google Fonts'.padEnd(16))} ${chalk.gray(res.status)} ${chalk.green('✓ reachable')}`);
  } catch (err) {
    spinner.fail(`${chalk.cyan('Google Fonts'.padEnd(16))} ${chalk.red('✗ no network')}`);
  }

  console.log(chalk.gray('\n  All libraries load via CDN at runtime — no install needed.'));
  console.log(chalk.gray('  Run ') + chalk.cyan('atk stack install') + chalk.gray(' if you need offline copies.\n'));
}

async function installStack() {
  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: 'Download all stack libraries locally to ./lib/? (about 350KB total)',
    default: true
  }]);

  if (!confirm) {
    console.log(chalk.yellow('\n  ✗ Cancelled.\n'));
    return;
  }

  const libDir = join(process.cwd(), 'lib');
  if (!existsSync(libDir)) mkdirSync(libDir, { recursive: true });

  for (const lib of STACK) {
    const spinner = ora(`Downloading ${lib.name}...`).start();
    try {
      const res = await fetch(lib.cdn);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const content = await res.text();
      const filePath = join(process.cwd(), lib.local);
      writeFileSync(filePath, content);
      spinner.succeed(`${chalk.cyan(lib.name)} ${chalk.gray('→')} ${chalk.dim(lib.local)}`);
    } catch (err) {
      spinner.fail(`${chalk.cyan(lib.name)} ${chalk.red(err.message)}`);
    }
  }

  console.log(chalk.bold.green('\n  ✓ Stack installed locally in ./lib/'));
  console.log(chalk.gray('  Reference them in templates with relative paths.\n'));
}
