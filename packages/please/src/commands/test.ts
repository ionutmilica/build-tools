import { projectWorkingDir, lookupConfigFile, ConfigType, jestBin } from '../config';
import { CommandPayload, ExecutableCommand, isInCiMode } from '../internal/command';
import { runCommands, RunMode, handlerSpawnError } from '../internal/spawner';

type TestOpts = CommandPayload & {};

export async function testCommand(cfg: TestOpts): Promise<void> {
  const commands = [await jestCommand(cfg)];

  try {
    await runCommands(commands, RunMode.Synchronous);
  } catch (err) {
    handlerSpawnError(err as Error);
  }
}

async function jestCommand(cfg: TestOpts): Promise<ExecutableCommand> {
  const config = await lookupConfigFile(ConfigType.Jest);
  const path = `${projectWorkingDir}`;
  const inCiMode = isInCiMode(cfg);

  const cmd = jestBin;
  const args = [
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
