import spawn from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
import { ConfigType, lookupConfigFile, packageSrcDir } from '../config';

interface FormatOpts {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

export async function formatCommand(cfg: FormatOpts): Promise<SpawnSyncReturns<Buffer>> {
  const cmd = 'npx';
  const configPath = await lookupConfigFile(ConfigType.Prettier);

  const args = [
    '--no-install',
    'prettier',
    ...(configPath ? ['--config', configPath] : []),
    '--write',
    `${packageSrcDir}/**/*.{ts,tsx,js,jsx}`,
    ...cfg.args,
  ];

  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
