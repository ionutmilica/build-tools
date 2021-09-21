import spawn from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';

interface RunOpts {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

export async function runCommand(cfg: RunOpts): Promise<SpawnSyncReturns<Buffer>> {
  const cmd = 'npx';
  const args = ['--no-install', 'ts-node-dev', '--respawn', '--transpile-only', ...cfg.args];
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
