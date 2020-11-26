import { BrowserLauncher } from '@web/test-runner-core';
import { SauceLabsLauncher } from './SauceLabsLauncher';
import { SauceLabsLauncherManager } from './SauceLabsLauncherManager';
import { processConfig } from './process-config';

export function createSauceLabsLauncher(
  config: Record<string, string>
) {
  if (config == null) {
    throw new Error('Options are required to set user and key.');
  }

  if (typeof config.user !== 'string') {
    throw new Error('Missing user in options');
  }

  if (typeof config.key !== 'string') {
    throw new Error('Missing key in options');
  }

  return function sauceLabsLauncher(args: Record<string, unknown>): BrowserLauncher {
    if (args == null) {
      throw new Error('Capabilities are required.');
    }

    const {
      sauceConnectOptions,
      seleniumCapabilities,
      browserName
    } = processConfig(config, args);

    const manager = new SauceLabsLauncherManager(seleniumCapabilities, sauceConnectOptions);

    return new SauceLabsLauncher(
      manager,
      browserName,
      seleniumCapabilities
    );
  };
}
