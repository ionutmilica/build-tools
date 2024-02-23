import { promisify } from 'util';
import { resolve, join } from 'path';
import { access, constants } from 'fs';

const accessAsync = promisify(access);

export const projectWorkingDir = resolve(process.cwd());
export const projectSrcDir = join(projectWorkingDir, 'src');

export const packageRootDir = join(__dirname, '..');
export const packageConfigDir = join(packageRootDir, 'config');

export const prettierConfigPath = join(packageConfigDir, 'prettier.config.js');
export const eslintConfigPath = join(packageConfigDir, 'eslint.config.js');
export const jestConfigPath = join(packageConfigDir, 'jest.config.js');

export const tscBin = 'tsc';
export const prettierBin = 'prettier';
export const eslintBin = 'eslint';
export const jestBin = 'jest';
export const tsNodeBin = 'tsx';

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
  jest: [join(projectWorkingDir, 'jest.config.js'), jestConfigPath],
  eslint: [join(projectWorkingDir, '.eslintrc.js'), eslintConfigPath],
  prettier: [join(projectWorkingDir, 'prettier.config.js'), prettierConfigPath],
  typescript: [join(projectWorkingDir, 'tsconfig.json')],
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
