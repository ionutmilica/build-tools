import { CommandPayload, ExecutableCommand } from '../internal/command';
import { runCommands, RunMode, handlerSpawnError } from '../internal/spawner';
import { eslintConfigPath, packageSrcDir, packageWorkingDir, prettierConfigPath } from '../config';

type LintOpts = CommandPayload & {};

export async function lintCommand(cmd: LintOpts): Promise<void> {
  const commands = [eslintCheckCommand(cmd)];

  commands.push(stylesCheckCommand(cmd));
  commands.push(typesCheckCommand(cmd));

  try {
    await runCommands(commands, RunMode.Synchronous);
  } catch (err) {
    handlerSpawnError(err as Error);
  }
}

function eslintCheckCommand(job: LintOpts): ExecutableCommand {
  const config = eslintConfigPath;

  const cmd = 'npx';
  const args = [
    '--no-install',
    'eslint',
    '--resolve-plugins-relative-to',
    packageWorkingDir,
    '--ext',
    'js,ts,jsx,tsx',
    packageSrcDir,
    ...(config ? ['--config', config] : []),
    ...job.args,
  ];

  return {
    cmd,
    args,
    name: 'Lint Check',
  };
}

function stylesCheckCommand(job: LintOpts): ExecutableCommand {
  const cmd = 'npx';
  const args = [
    '--no-install',
    'prettier',
    '--config',
    prettierConfigPath,
    '--check',
    `${packageSrcDir}/**/*.{ts,tsx,js,jsx}`,
    ...job.args,
  ];

  return {
    cmd,
    args,
    name: 'Style Check',
  };
}

function typesCheckCommand(job: LintOpts): ExecutableCommand {
  const cmd = 'npx';
  const args = ['tsc', '--noEmit', 'true', '--incremental', 'false', ...job.args];
  return {
    cmd,
    args,
    name: 'Types Check',
  };
}
