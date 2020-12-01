import { TestRunnerCoreConfig } from '@web/test-runner-core';
import { BrowserObject } from 'webdriverio';
import { validateBrowserResult } from './coverage';

/**
 * Manages tests to be executed in one session (concurrency: 1).
 */
export class SessionManager {
  private config: TestRunnerCoreConfig;
  private driver: BrowserObject;
  private locked?: Promise<unknown>;
  private isIE: boolean;
  private pageUrl?: string;

  constructor(config: TestRunnerCoreConfig, driver: BrowserObject, isIE: boolean) {
    this.config = config;
    this.driver = driver;
    this.isIE = isIE;
  }

  isActive(_: string) {
    return !!this.pageUrl;
  }

  async getBrowserUrl(_: string): Promise<string | undefined> {
    return this.pageUrl;
  }

  private async scheduleCommand<T>(fn: () => Promise<T>) {
    if (!this.isIE) {
      return fn();
    }

    while (this.locked) {
      await this.locked;
    }

    const fnPromise = fn();
    this.locked = fnPromise;
    const result = await fnPromise;
    this.locked = undefined;
    return result;
  }

  async queueStartSession(id: string, url: string) {
    this.scheduleCommand(() => this.startSession(url));
  }

  private async startSession(url: string) {
    this.pageUrl = url;
    await this.driver.navigateTo(url);
  }

  async queueStopSession(id: string) {
    return this.scheduleCommand(() => this.stopSession());
  }

  async stopSession() {
    // Retrieve test results from iframe. Note: IIFE is used to prevent
    // WebdriverIO from crashing failure with Puppeteer (default mode):
    // Error: Evaluation failed: SyntaxError: Illegal return statement
    // See https://github.com/webdriverio/webdriverio/pull/4829
    const returnValue = await this.driver.execute(`
      return (function() {
        return { testCoverage: window.__coverage__ };
      })();
    `);

    if (!validateBrowserResult(returnValue)) {
      throw new Error();
    }

    const { testCoverage } = returnValue;

    // navigate to an empty page to kill any running code on the page
    await this.driver.navigateTo('data:,');

    return { testCoverage: this.config.coverage ? testCoverage : undefined };
  }

  async takeScreenshot(_: string, locator: string): Promise<Buffer> {
    const elementData = (await this.driver.execute(locator, [])) as Element;

    const element = await this.driver.$(elementData);

    let base64;

    try {
      base64 = await this.driver.takeElementScreenshot(element.elementId);
    } catch (err) {
      console.log('Failed to take a screenshot:', err);
    }

    return Buffer.from(base64, 'base64');
  }
}
