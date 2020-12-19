const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');
const { visualRegressionPlugin } = require('@web/test-runner-visual-regression/plugin');
const { getBaselineName, getDiffName, getFailedName, getTestGroups } = require('./wtr-utils.js');

const sauceLabsLauncher = createSauceLabsLauncher(
  {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY
  },
  {
    name: 'Material visual tests',
    build: `${process.env.GITHUB_REF || 'local'} build ${process.env.GITHUB_RUN_NUMBER || ''}`,
    recordScreenshots: false,
    recordVideo: false
  }
);

const config = {
  concurrency: 1,
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: '20000' // default 2000
    }
  },
  groups: getTestGroups('material'),
  browsers: [
    sauceLabsLauncher({
      browserName: 'chrome',
      platformName: 'Windows 10',
      browserVersion: 'latest'
    })
  ],
  plugins: [
    visualRegressionPlugin({
      baseDir: 'test/visual/material/screenshots',
      getBaselineName,
      getDiffName,
      getFailedName,
      diffOptions: {
        threshold: 0.2
      },
      update: process.env.TEST_ENV === 'update'
    })
  ],
  testRunnerHtml: (testFramework) => `
    <!DOCTYPE html>
    <html>
      <body>
        <script>window.polymerSkipLoadingFontRoboto = true;</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
};

module.exports = config;
