import { BrowserLauncher, TestRunnerCoreConfig } from '@web/test-runner-core';
import { Options } from 'webdriver';
import { remote, BrowserObject } from 'webdriverio';
import { WebdriverIOIFrameManager } from './IFrameManager';
import { getBrowserLabel, getBrowserName } from './utils';

export class WebdriverIOLauncher implements BrowserLauncher {
  public name = 'Initializing...';
  public type = 'wdio';
  private config?: TestRunnerCoreConfig;
  private driver?: BrowserObject;
  private debugDriver: undefined | BrowserObject = undefined;
  private iframeManager?: WebdriverIOIFrameManager;
  private __iframeManagerPromise?: Promise<WebdriverIOIFrameManager>;
  private isIE = false;

  constructor(private options: Options) {}

  async initialize(config: TestRunnerCoreConfig) {
    this.config = config;

    const options: Options = { logLevel: 'error', ...this.options };
    this.driver = await remote(options);

    const cap = this.driver.capabilities;
    this.name = getBrowserLabel(cap);
    const browserName = getBrowserName(cap).toLowerCase().replace(/_/g, ' ');
    this.isIE =
      (browserName.includes('internet') && browserName.includes('explorer')) ||
      browserName === 'ie' ||
      browserName === 'ie11';
  }

  async stop() {
    try {
      await this.driver?.deleteSession();
      await this.debugDriver?.deleteSession();

      this.driver = undefined;
      this.debugDriver = undefined;
      this.iframeManager = undefined;
    } catch {
      //
    }
  }

  async startSession(id: string, url: string) {
    await this.ensureIframeManagerInitialized();
    return this.iframeManager!.queueStartSession(id, url);
  }

  isActive(id: string) {
    return !!this.iframeManager?.isActive(id);
  }

  getBrowserUrl(sessionId: string) {
    if (!this.iframeManager) {
      throw new Error('Not initialized');
    }
    return this.iframeManager.getBrowserUrl(sessionId);
  }

  async stopSession(id: string) {
    return this.iframeManager!.queueStopSession(id);
  }

  async startDebugSession(_: string, url: string) {
    if (this.debugDriver) {
      await this.debugDriver.deleteSession();
    }
    this.debugDriver = await remote(this.options);
    await this.debugDriver.navigateTo(url);
  }

  private async ensureIframeManagerInitialized(): Promise<void> {
    if (this.iframeManager) {
      return;
    }

    if (this.__iframeManagerPromise) {
      await this.__iframeManagerPromise;
      return;
    }

    this.__iframeManagerPromise = this.createIframeManager();
    await this.__iframeManagerPromise;
    this.__iframeManagerPromise = undefined;
  }

  private async createIframeManager() {
    if (!this.config) throw new Error('Not initialized');

    this.iframeManager = new WebdriverIOIFrameManager(this.config, this.driver, this.isIE);

    return this.iframeManager;
  }

  takeScreenshot(sessionId: string, locator: string) {
    if (!this.iframeManager) {
      throw new Error('Not initialized');
    }
    return this.iframeManager.takeScreenshot(sessionId, locator);
  }
}

export function webdriverIOLauncher(options: Options) {
  if (!options?.capabilities) {
    throw new Error(`WebdriverIO launcher requires a capabilities property.`);
  }

  return new WebdriverIOLauncher(options);
}
