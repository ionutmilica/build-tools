import { promisify } from 'util';
import { resolve, join } from 'path';
import { access, constants } from 'fs';

const accessAsync = promisify(access);

export const packageWorkingDir = resolve(process.cwd());
export const packageSrcDir = join(packageWorkingDir, 'src');
export const packageBinDir = join(packageWorkingDir, 'node_modules', '.bin');
export const packageRootDir = join(__dirname, '..');
export const configDir = join(packageRootDir, 'config');

export const prettierConfigPath = join(configDir, 'prettier.config.js');
export const eslintConfigPath = join(configDir, 'eslint.config.js');
export const jestConfigPath = join(configDir, 'jest.config.js');

export const tscBin = join(packageBinDir, 'tsc');
export const prettierBin = join(packageBinDir, 'prettier');
export const eslintBin = join(packageBinDir, 'eslint');
export const jestBin = join(packageBinDir, 'jest');
export const tsNodeBin = join(packageBinDir, 'ts-node-dev');

export enum ConfigType {
  Jest = 'jest',
  Eslint = 'eslint',
  Prettier = 'prettier',
  Typescript = 'typescript',
}

/**
 * Defines config types and their loading priority
 */
const configsMap: { [key in ConfigType]: string[] } = {
  jest: [join(packageWorkingDir, 'jest.config.js'), jestConfigPath],
  eslint: [join(packageWorkingDir, '.eslintrc.js'), eslintConfigPath],
  prettier: [join(packageWorkingDir, 'prettier.config.js'), prettierConfigPath],
  typescript: [join(configDir, 'tsconfig.json')],
};

export async function lookupConfigFile(configType: ConfigType): Promise<string> {
  const configs = configsMap[configType];
  if (!configs || configs.length === 0) {
    throw new Error('Failed to find the config in map for type ${configType}');
  }

  for (const configPath of configs) {
    try {
      await accessAsync(configPath, constants.F_OK);
      return configPath;
    } catch {
      // Empty block
    }
  }

  throw new Error(`Could not find a valid config file for type ${configType}`);
}
