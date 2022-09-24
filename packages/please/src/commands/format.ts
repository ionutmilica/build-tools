import spawn from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
import { ConfigType, lookupConfigFile, packageSrcDir, prettierBin } from '../config';

interface FormatOpts {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

export async function formatCommand(cfg: FormatOpts): Promise<SpawnSyncReturns<Buffer>> {
  const configPath = await lookupConfigFile(ConfigType.Prettier);
  const cmd = prettierBin;
  const args = [
    ...(configPath ? ['--config', configPath] : []),
    '--write',
    `${packageSrcDir}/**/*.{ts,tsx,js,jsx}`,
    ...cfg.args,
  ];
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
