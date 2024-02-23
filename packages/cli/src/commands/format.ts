import spawn from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
import { default as debug } from 'debug';
import { ConfigType, lookupConfigFile, projectSrcDir, prettierBin } from '../config';

interface FormatOpts {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

const dbg = debug('please format');

export async function formatCommand(cfg: FormatOpts): Promise<SpawnSyncReturns<Buffer>> {
  const configPath = await lookupConfigFile(ConfigType.Prettier);
  const cmd = 'npx';
  const args = [
    prettierBin,
    ...(configPath ? ['--config', configPath] : []),
    '--write',
    `${projectSrcDir}/**/*.{ts,tsx,js,jsx}`,
    ...cfg.args,
  ];
  dbg('Running prettier command: %s with args: %s', cmd, args);
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
