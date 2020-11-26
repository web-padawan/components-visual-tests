import { TestRunnerCoreConfig } from '@web/test-runner-core';
import { BrowserObject } from 'webdriverio';
import { AbstractIFrameManager, BrowserResult } from '../manager/AbstractIFrameManager';

/**
 * Manages tests to be executed in iframes on a page.
 */
export class WebdriverIOIFrameManager extends AbstractIFrameManager {
  private driver: BrowserObject;

  constructor(config: TestRunnerCoreConfig, driver: BrowserObject, isIE: boolean) {
    super(config, isIE);
    this.driver = driver;
  }

  async navigateTo(pageUrl: string): Promise<void> {
    await this.driver.navigateTo(pageUrl);
  }

  async getIframeUrl(frameId: string): Promise<string | undefined> {
    const returnValue = (await this.driver.executeScript(`
      try {
        var iframe = document.getElementById("${frameId}");
        return iframe.contentWindow.location.href;
      } catch (_) {
        return undefined;
      }
    `, [])) as string | undefined;

    return returnValue;
  }

  async initIframe(frameId: string, url: string): Promise<void> {
    await this.driver.executeScript(`
      var iframe = document.createElement("iframe");
      iframe.id = "${frameId}";
      iframe.src = "${url}";
      document.body.appendChild(iframe);
    `, []);
  }

  async attachToIframe(frameId: string, url: string): Promise<void> {
    await this.driver.executeScript(`
      var iframe = document.getElementById("${frameId}");
      iframe.src = "${url}";
    `, []);
  }

  async getTestCoverage(frameId: string): Promise<BrowserResult> {
    // Retrieve test results from iframe. Note, we use IIFE to prevent
    // WebdriverIO from crashing failure with Puppeteer (default mode):
    // Error: Evaluation failed: SyntaxError: Illegal return statement
    // See https://github.com/webdriverio/webdriverio/pull/4829
    const returnValue = await this.driver.executeScript(`
      return (function() {
        var iframe = document.getElementById("${frameId}");
        var testCoverage;
        try {
          testCoverage = iframe.contentWindow.__coverage__;
        } catch (error) {
          // iframe can throw a cross-origin error if the test navigated
        }

        // set src after retrieving values to avoid the iframe from navigating away
        iframe.src = "data:,";
        return { testCoverage: testCoverage };
      })();
    `, []);

    return returnValue;
  }
}
