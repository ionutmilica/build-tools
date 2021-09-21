import { sync } from 'cross-spawn';
import { ExecutableCommand } from '../command';
import { CommandFailedError } from './error';

export async function sequentially(commands: ExecutableCommand[]): Promise<void> {
  let lastExitCode = 0;
  for (const command of commands) {
    const computedEnv = { ...process.env, ...(command.env || {}) };
    const result = sync(command.cmd, command.args, { stdio: 'inherit', env: computedEnv });
    if (result.status === null) {
      lastExitCode = 1;
      break;
    }
    if (result.status && result.status !== 0) {
      lastExitCode = result.status;
      break;
    }
  }
  if (lastExitCode !== 0) {
    throw new CommandFailedError('Command failed in sequentially run', lastExitCode);
  }
}
