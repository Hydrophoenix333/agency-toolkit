#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from '../src/commands/init.js';
import { stackCommand } from '../src/commands/stack.js';
import { generateCommand } from '../src/commands/generate.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

const program = new Command();

program
  .name('atk')
  .description(chalk.bold('Agency Toolkit') + ' — premium HTML for agencies')
  .version(pkg.version);

// ── init ──
program
  .command('init')
  .description('Brand onboarding wizard — capture colors, fonts, logo, voice')
  .option('-f, --force', 'Overwrite existing brand-config.json without asking')
  .action(initCommand);

// ── stack ──
const stack = program.command('stack').description('Manage frontend stack libraries');

stack
  .command('check')
  .description('Verify all stack libraries are reachable via CDN')
  .action(() => stackCommand({ action: 'check' }));

stack
  .command('install')
  .description('Download libraries locally for offline use')
  .action(() => stackCommand({ action: 'install' }));

stack
  .command('list')
  .description('List all libraries in the curated stack')
  .action(() => stackCommand({ action: 'list' }));

// ── generate ──
const generate = program.command('generate').alias('gen').description('Generate HTML deliverables');

generate
  .command('proposal')
  .description('Generate a premium HTML proposal')
  .option('-t, --type <type>', 'Proposal type: seo-diagnostic | social-media | ads | full-service', 'seo-diagnostic')
  .option('-c, --client <name>', 'Client name')
  .option('-o, --output <path>', 'Output directory', 'output')
  .action((options) => generateCommand({ kind: 'proposal', ...options }));

generate
  .command('landing')
  .description('Generate a conversion landing page')
  .option('-c, --client <name>', 'Client name')
  .option('-o, --output <path>', 'Output directory', 'output')
  .action((options) => generateCommand({ kind: 'landing', ...options }));

generate
  .command('diagnostic')
  .description('Generate a diagnostic / audit report')
  .option('-c, --client <name>', 'Client name')
  .option('-o, --output <path>', 'Output directory', 'output')
  .action((options) => generateCommand({ kind: 'diagnostic', ...options }));

generate
  .command('design-system')
  .description('Generate a full design system showcase HTML from your brand-config')
  .option('-o, --output <path>', 'Output directory', 'output')
  .action((options) => generateCommand({ kind: 'design-system', ...options }));

program.parse(process.argv);

// Show help if no command
if (!process.argv.slice(2).length) {
  console.log(chalk.bold.cyan('\n  ⬢ Agency Toolkit') + chalk.gray(' v' + pkg.version) + '\n');
  console.log(chalk.gray('  Premium HTML for agencies that ship.\n'));
  program.outputHelp();
}
