import spawn from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
import { tsNodeBin } from '../config';

interface RunOpts {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

export async function runCommand(cfg: RunOpts): Promise<SpawnSyncReturns<Buffer>> {
  const cmd = tsNodeBin;
  const args = ['--respawn', '--transpile-only', ...cfg.args];
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
