/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant';
import fs, { writeFileSync } from 'fs-extra';
import chalk from 'chalk';

<<<<<<< HEAD
import { getRootPath, getEnvConfig } from '../utils';
=======
import { getEnvConfig, getRootPath } from '../utils';
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
import { getConfigFileName } from '../getConfigFileName';

import pkg from '../../package.json';

<<<<<<< HEAD
function createConfig(
  {
    configName,
    config,
    configFileName = GLOB_CONFIG_FILE_NAME,
  }: { configName: string; config: any; configFileName?: string } = { configName: '', config: {} },
) {
=======
interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  try {
    const windowConf = `window.${configName}`;
    // Ensure that the variable will not be modified
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
  } catch (error) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + error));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
<<<<<<< HEAD
  createConfig({ config, configName: configFileName });
=======
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
}
