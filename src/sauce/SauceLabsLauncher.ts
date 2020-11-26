import { TestRunnerCoreConfig } from '@web/test-runner-core';
import { Options } from 'webdriver';
import { WebdriverIOLauncher } from '../wdio/webdriverIOLauncher';
import ip from 'ip';
import { SauceLabsLauncherManager } from './SauceLabsLauncherManager';

export class SauceLabsLauncher extends WebdriverIOLauncher {
  constructor(
    private manager: SauceLabsLauncherManager,
    public name: string,
    seleniumCapabilities: Options,
  ) {
    super(seleniumCapabilities);
  }

  startSession(sessionId: string, url: string) {
    return super.startSession(sessionId, url.replace(/(localhost|127\.0\.0\.1)/, ip.address()));
  }

  async startDebugSession() {
    throw new Error('Starting a debug session is not supported in SauceLabs');
  }

  async initialize(config: TestRunnerCoreConfig) {
    await this.manager.registerLauncher(this);
    return super.initialize(config);
  }

  stop() {
    const stopPromise = super.stop();
    this.manager.deregisterLauncher(this);
    return stopPromise;
  }
}
