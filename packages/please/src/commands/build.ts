import { CommandPayload, ExecutableCommand } from '../internal/command';
import { handlerSpawnError, runCommands, RunMode } from '../internal/spawner';
import { tscBin } from '../config';

type BuildOpts = CommandPayload & {};

export async function buildCommand(cmd: BuildOpts): Promise<void> {
  const { esm, cjs, types, app } = cmd.opts;
  let commands = [];
  if (esm) {
    commands.push(esmCommand(cmd));
  }
  if (cjs) {
    commands.push(cjsCommand(cmd));
  }
  if (types) {
    commands.push(typesCommand(cmd));
  }
  if (!commands.length) {
    commands.push(esmCommand(cmd), cjsCommand(cmd), typesCommand(cmd));
  }
  if (app) {
    commands = [appCommand(cmd)];
  }
  try {
    await runCommands(commands, RunMode.Synchronous);
  } catch (err) {
    handlerSpawnError(err as Error);
  }
}

function esmCommand(job: BuildOpts): ExecutableCommand {
  const cmd = tscBin;
  const args = [
    '--allowJs',
    '--outDir',
    'esm',
    '--noEmit',
    'false',
    '--module',
    'es2015',
    ...job.args,
  ];
  return {
    cmd,
    args,
    name: 'ESM Build',
  };
}

function appCommand(job: BuildOpts): ExecutableCommand {
  const cmd = tscBin;
  const args = ['--allowJs', '--outDir', 'build', '--noEmit', 'false', ...job.args];
  return {
    cmd,
    args,
    name: 'App Build',
  };
}

function cjsCommand(job: BuildOpts): ExecutableCommand {
  const cmd = tscBin;
  const args = ['--allowJs', '--outDir', 'cjs', '--noEmit', 'false', ...job.args];
  return {
    cmd,
    args,
    name: 'CommonJS Build',
  };
}

function typesCommand(job: BuildOpts): ExecutableCommand {
  const cmd = tscBin;
  const args = [
    '--declaration',
    '--declarationMap',
    '--outDir',
    'types',
    '--emitDeclarationOnly',
    '--noEmit',
    'false',
    ...job.args,
  ];
  return {
    cmd,
    args,
    name: 'Types Build',
  };
}
