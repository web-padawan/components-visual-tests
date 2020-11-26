import { TestRunnerCoreConfig } from '@web/test-runner-core';
import { BrowserObject, Element } from 'webdriverio';
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

  async takeScreenshot(sessionId: string, locator: string): Promise<Buffer> {
    const frameId = this.getFrameId(sessionId);

    const frame = await this.driver.$(`iframe#${frameId}`);

    await this.driver.switchToFrame(frame);

    const elementData = (await this.driver.execute(locator, [])) as Element;

    const element = await this.driver.$(elementData);

    let base64;

    try {
      base64 = await this.driver.takeElementScreenshot(element.elementId);
    } catch (err) {
      console.log('Failed to take a screenshot:', err);
    }

    await this.driver.switchToParentFrame();

    return Buffer.from(base64, 'base64');
  }
}
