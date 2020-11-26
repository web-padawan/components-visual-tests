import { DesiredCapabilities } from "webdriver";

function getPlatform(c: DesiredCapabilities) {
  return c.platformName || c.platform
}

export function getBrowserName(c: DesiredCapabilities): string {
  return c.browserName;
}

function getBrowserVersion(c: DesiredCapabilities): string {
  return c.browserVersion || c.version;
}

export function getBrowserLabel(c: DesiredCapabilities): string {
  return [getPlatform(c), getBrowserName(c), getBrowserVersion(c)].filter(_ => _).join(' ');
}
