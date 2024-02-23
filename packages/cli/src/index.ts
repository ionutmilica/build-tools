import { Command } from 'commander';
import { command } from './internal/command';
import { buildCommand } from './commands/build';
import { lintCommand } from './commands/lint';
import { formatCommand } from './commands/format';
import { testCommand } from './commands/test';
import { runCommand } from './commands/run';

(async function main() {
  const program = new Command();

  program
    .command('build')
    .description('Command used to compile typescript code')
    .option('--no-types', 'Disable compilation of types')
    .option('--no-cjs', 'Disable CJS transformation')
    .option('--no-esm', 'Disable ESM code generation')
    .option('--app', 'App mode allows building applications', false)
    .allowUnknownOption()
    .action(command('build', buildCommand));

  program
    .command('format')
    .description('Format the code according to internal configurations')
    .action(command('format', formatCommand));

  program
    .command('lint')
    .description('Lint or type check your code')
    .option('--ci', 'Run in CI mode', false)
    .allowUnknownOption()
    .action(command('lint', lintCommand));

  program
    .command('test')
    .description('Test your code')
    .option('--ci', 'Run in CI mode', false)
    .allowUnknownOption()
    .action(command('test', testCommand));

  program
    .command('run <file>')
    .description('Run typescript application')
    .allowUnknownOption()
    .action(command('run', runCommand));

  await program.parseAsync();
})();
