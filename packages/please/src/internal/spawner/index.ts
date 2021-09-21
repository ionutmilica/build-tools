import { concurrently } from './concurrently';
import { sequentially } from './sequentially';
import { ExecutableCommand } from '../command';

export enum RunMode {
  Asynchronous = 'ASYNCHRONOUS',
  Synchronous = 'SYNCHRONOUS',
}

export async function runCommands(commands: ExecutableCommand[], mode: RunMode): Promise<void> {
  switch (mode) {
    case RunMode.Asynchronous:
      return concurrently(commands);
    case RunMode.Synchronous:
      return sequentially(commands);
    default:
      throw new Error(`Wrong run mode provided: ${mode}`);
  }
}

export function handlerSpawnError(err: Error & { exitStatus?: number }): void {
  if (!err.exitStatus || !Number.isInteger(err.exitStatus)) {
    console.error('Failed to run the command');
    process.exit(1);
  }

  if (err.message && err.message.indexOf('Exited with status') < 0) {
    console.error(err);
  }

  process.exit(err.exitStatus);
}
