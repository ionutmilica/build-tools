import spawn from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
import { packageSrcDir, prettierConfigPath } from '../config';

interface FormatOpts {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

export async function formatCommand(cfg: FormatOpts): Promise<SpawnSyncReturns<Buffer>> {
  const cmd = 'npx';
  const config = prettierConfigPath;

  const args = [
    '--no-install',
    'prettier',
    ...(config ? ['--config', config] : []),
    '--write',
    `${packageSrcDir}/**/*.{ts,tsx,js,jsx}`,
    ...cfg.args,
  ];

  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
