import { CoverageMapData } from '@web/test-runner-core';
import { BrowserObject } from 'webdriverio';

export interface BrowserResult {
  testCoverage?: CoverageMapData;
  url: string;
}

export function validateBrowserResult(result: any): result is BrowserResult {
  if (typeof result !== 'object') throw new Error('Browser did not return an object');
  if (result.testCoverage != null && typeof result.testCoverage !== 'object')
    throw new Error('Browser returned non-object testCoverage');

  return true;
}
