const { webdriverIOLauncher } = require('./dist/wdio/index');
const { createSauceLabsLauncher } = require('./dist/sauce/index');
// const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');
const { visualRegressionPlugin } = require('./dist/regression/index');

const config = {
  nodeResolve: true
};

config.browsers = [
  webdriverIOLauncher({
    capabilities: {
      browserName: 'Chrome'
    }
  })
];

if (process.env.TEST_ENV === 'visual' || process.env.TEST_ENV === 'update') {
  config.concurrency = 1;

  config.plugins = [
    visualRegressionPlugin({
      baseDir: 'test/visual/screenshots',
      diffOptions: {
        threshold: 0.2
      },
      update: process.env.TEST_ENV === 'update'
    })
  ]
}

const sauceLabsLauncher = createSauceLabsLauncher({
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});

/*
config.browsers = [
  sauceLabsLauncher({
    browserName: 'chrome',
    platformName: 'Windows 10',
    browserVersion: 'latest'
  })
];
*/

module.exports = config;
