// const { webdriverIOLauncher } = require('./dist/wdio/index');
const { createSauceLabsLauncher } = require('./dist/sauce/index');
// const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');

const config = {
  nodeResolve: true
};

/*
config.browsers = [
  webdriverIOLauncher({
    capabilities: {
      browserName: 'Chrome'
    }
  })
];
*/

const sauceLabsLauncher = createSauceLabsLauncher({
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});

config.browsers = [
  sauceLabsLauncher({
    browserName: 'firefox',
    platformName: 'Windows 10',
    browserVersion: 'latest'
  })
];


module.exports = config;
