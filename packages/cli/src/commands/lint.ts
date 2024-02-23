import { default as debug } from 'debug';
import { CommandPayload, ExecutableCommand } from '../internal/command';
import { runCommands, RunMode, handlerSpawnError } from '../internal/spawner';
import {
  ConfigType,
  lookupConfigFile,
  projectSrcDir,
  projectWorkingDir,
  eslintBin,
  prettierBin,
  tscBin,
} from '../config';

type LintOpts = CommandPayload & {};

const dbg = debug('please lint');

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
    eslintBin,
    '--resolve-plugins-relative-to',
    projectWorkingDir,
    '--ext',
    'js,ts,jsx,tsx',
    projectSrcDir,
    ...(config ? ['--config', config] : []),
    ...job.args,
  ];

  dbg('Running Eslint with command %s and args: %s', cmd, args);

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
    prettierBin,
    '--config',
    prettierConfigPath,
    '--check',
    `${projectSrcDir}/**/*.{ts,tsx,js,jsx}`,
    ...job.args,
  ];

  dbg('Running Prettier with command %s and args: %s', cmd, args);

  return {
    cmd,
    args,
    name: 'Style Check',
  };
}

async function typesCheckCommand(job: LintOpts): Promise<ExecutableCommand> {
  const cmd = 'npx';
  const args = [tscBin, '--noEmit', 'true', '--incremental', 'false', ...job.args];

  dbg('Running Typescript type check with command %s and args: %s', cmd, args);

  return {
    cmd,
    args,
    name: 'Types Check',
  };
}
