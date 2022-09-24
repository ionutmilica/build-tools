import { CommandPayload, ExecutableCommand } from '../internal/command';
import { runCommands, RunMode, handlerSpawnError } from '../internal/spawner';
import { ConfigType, lookupConfigFile, packageSrcDir, packageWorkingDir } from '../config';

type LintOpts = CommandPayload & {};

export async function lintCommand(cmd: LintOpts): Promise<void> {
  const commands = [await eslintCheckCommand(cmd)];

  commands.push(await stylesCheckCommand(cmd));
  commands.push(await typesCheckCommand(cmd));

  try {
    await runCommands(commands, RunMode.Synchronous);
  } catch (err) {
    handlerSpawnError(err as Error);
  }
}

async function eslintCheckCommand(job: LintOpts): Promise<ExecutableCommand> {
  const config = await lookupConfigFile(ConfigType.Eslint);

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

async function stylesCheckCommand(job: LintOpts): Promise<ExecutableCommand> {
  const prettierConfigPath = await lookupConfigFile(ConfigType.Prettier);

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

async function typesCheckCommand(job: LintOpts): Promise<ExecutableCommand> {
  const cmd = 'npx';
  const args = ['tsc', '--noEmit', 'true', '--incremental', 'false', ...job.args];
  return {
    cmd,
    args,
    name: 'Types Check',
  };
}
