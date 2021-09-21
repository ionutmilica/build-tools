import { packageWorkingDir, jestConfigPath } from '../config';
import { CommandPayload, ExecutableCommand, isInCiMode } from '../internal/command';
import { runCommands, RunMode, handlerSpawnError } from '../internal/spawner';

type TestOpts = CommandPayload & {};

export async function testCommand(cfg: TestOpts): Promise<void> {
  const commands = [jestCommand(cfg)];

  try {
    await runCommands(commands, RunMode.Synchronous);
  } catch (err) {
    handlerSpawnError(err as Error);
  }
}

function jestCommand(cfg: TestOpts): ExecutableCommand {
  const config = jestConfigPath;
  const path = `${packageWorkingDir}`;
  const inCiMode = isInCiMode(cfg);

  const cmd = 'npx';
  const args = [
    '--no-install',
    'jest',
    '--rootDir',
    path,
    '--passWithNoTests',
    ...(inCiMode ? ['--ci', 'true'] : []),
    ...(config ? ['--config', config] : []),
    ...cfg.args,
  ];

  return {
    cmd,
    args,
    name: 'Jest Command',
    env: inCiMode ? { CI: 'true' } : undefined,
  };
}
