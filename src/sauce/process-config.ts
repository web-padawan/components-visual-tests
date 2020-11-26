import { v4 as uuid } from 'uuid';
import {isW3C} from "./utils";

export function processConfig(config: any = {}, args: any = {}) {
  const username = config.user || process.env.SAUCE_USERNAME;
  const accessKey = config.key || process.env.SAUCE_ACCESS_KEY;

  let tunnelIdentifier = args.tunnelIdentifier || config.tunnelIdentifier || `web-test-runner-${uuid()}`;;

  const browserName = `${args.browserName} ${args.browserVersion || args.version || ''} ${args.platformName || args.platform || ''}`;

  const capabilitiesFromConfig = {
    // Test annotation
    build: config.build || args.build,
    name: config.testName || args.testName || 'Saucelabs Launcher Tests',
    tags: config.tags || args.tags || [],
    'custom-data': config.customData || args.customData,
    customData: config.customData || args.customData || {},
    // Timeouts
    maxDuration: config.maxDuration || 1800,
    commandTimeout: config.commandTimeout || 300,
    idleTimeout: config.idleTimeout || 90,
    // Custom Testing Options
    parentTunnel: config.parentTunnel,
    tunnelIdentifier: tunnelIdentifier,
    timeZone: config.timeZone || args.timeZone,
    public: config.public || 'public',
    // Optional Testing Features
    recordScreenshots: config.recordScreenshots || args.recordScreenshots,
    recordVideo: config.recordVideo || config.recordVideo,
  };

  const sauceConnectOptions = {
    tunnelIdentifier: tunnelIdentifier,
    ...config.connectOptions,
  };

  // transform JWP capabilities into W3C capabilities for backward compatibility
  if (isW3C(args)) {
    args.browserVersion = args.browserVersion || args.version || 'latest';
    args.platformName = args.platformName || args.platform || 'Windows 10';
    args['sauce:options'] = {...capabilitiesFromConfig, ...(args['sauce:options'] || {})};

    // delete JWP capabilities
    delete args.version;
    delete args.platform;
  } else {
    args = {...args, ...capabilitiesFromConfig}
  }

  const seleniumCapabilities = {
    user: username,
    key: accessKey,
    region: config.region || 'us',
    headless: config.headless,
    logLevel: 'error',
    capabilities: {
      ...args
    },
    ...config.options
  };

  return {
    sauceConnectOptions,
    seleniumCapabilities,
    browserName
  };
}
