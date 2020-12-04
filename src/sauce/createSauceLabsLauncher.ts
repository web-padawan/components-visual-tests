import { BrowserLauncher } from '@web/test-runner-core';
import { SauceLabsOptions, SauceConnectOptions } from 'saucelabs';
import { DesiredCapabilities, SauceLabsCapabilities } from 'webdriver';
import { RemoteOptions } from 'webdriverio';
import { v4 as uuid } from 'uuid';

import { SauceLabsLauncher } from './SauceLabsLauncher';
import { SauceLabsLauncherManager } from './SauceLabsLauncherManager';

export function createSauceLabsLauncher(
  saucelabsOptions: SauceLabsOptions,
  saucelabsCapabilities?: SauceLabsCapabilities,
  sauceConnectOptions?: SauceConnectOptions,
) {
  if (saucelabsOptions == null) {
    throw new Error('Options are required to set user and key.');
  }

  if (typeof saucelabsOptions.user !== 'string') {
    throw new Error('Missing user in options');
  }

  if (typeof saucelabsOptions.key !== 'string') {
    throw new Error('Missing key in options');
  }

  const finalSauceLabsOptions = { ...saucelabsOptions };
  if (typeof finalSauceLabsOptions.region !== 'string') {
    finalSauceLabsOptions.region = 'us';
  }

  const finalConnectOptions: SauceConnectOptions = { ...sauceConnectOptions };
  if (typeof finalConnectOptions.tunnelIdentifier !== 'string') {
    finalConnectOptions.tunnelIdentifier = `web-test-runner-${uuid()}`;
  }
  const manager = new SauceLabsLauncherManager(finalSauceLabsOptions, finalConnectOptions);

  return function sauceLabsLauncher(capabilities: DesiredCapabilities): BrowserLauncher {
    if (capabilities == null) {
      throw new Error('Capabilities are required.');
    }

    let finalCapabilities = { ...capabilities };

    const finalSauceCapabilities = {
      tunnelIdentifier: finalConnectOptions.tunnelIdentifier,
      ...saucelabsCapabilities,
    };

    // Setting 'sauce:options' forces SauceLabs to use W3C capabilities.
    // Only browserVersion is mandatory, platformName is optional.
    if (capabilities.browserVersion) {
      finalCapabilities.platformName =
        finalCapabilities.platformName || finalCapabilities.platform || 'Windows 10';
      finalCapabilities['sauce:options'] = {
        ...finalSauceCapabilities,
        ...(finalCapabilities['sauce:options'] || {}),
      };

      // Delete JWP capabilities, if any.
      delete finalCapabilities.version;
      delete finalCapabilities.platform;
    } else {
      // Use JWP capabilities for remote environments not yet supporting W3C.
      // This enables running tests on iPhone Simulators in SauceLabs.
      finalCapabilities = { ...finalCapabilities, ...finalSauceCapabilities };
    }

    // Type cast to not fail on snake case syntax e.g. browser_version.
    const caps = finalCapabilities as Record<string, string>;

    const browserName = caps.browserName ?? caps.browser ?? caps.device ?? 'unknown';
    const browserVersion = caps.browserVersion ?? caps.version ?? caps.browser_version ?? '';
    const platform = caps.platformName ?? caps.platform ?? '';

    const browserIdentifier = `${browserName}${browserVersion}${platform}`;

    const options: RemoteOptions = {
      user: finalSauceLabsOptions.user,
      key: finalSauceLabsOptions.key,
      region: finalSauceLabsOptions.region,
      logLevel: 'error',
      capabilities: {
        ...finalCapabilities,
      },
    };

    return new SauceLabsLauncher(manager, browserIdentifier, options);
  };
}
