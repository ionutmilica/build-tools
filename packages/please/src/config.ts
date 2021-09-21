import { resolve, join } from 'path';

export const packageWorkingDir = resolve(process.cwd());
export const packageSrcDir = join(packageWorkingDir, 'src');
export const packageRootDir = join(__dirname, '..');
export const configDir = join(packageRootDir, 'config');

export const prettierConfigPath = join(configDir, 'prettier.config.js');
export const eslintConfigPath = join(configDir, 'eslint.config.js');
export const jestConfigPath = join(configDir, 'jest.config.js');
