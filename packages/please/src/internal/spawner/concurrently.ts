import { ExecutableCommand } from '../command';
import { CommandFailedError } from './error';

export async function concurrently(commands: ExecutableCommand[]): Promise<void> {
  throw new CommandFailedError(
    'Failed to run commands in concurrent mode. Reason: Not Implemented',
    1,
  );
}
