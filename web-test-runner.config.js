const { createSauceLabsLauncher } = require('./dist/sauce/index');
const { visualRegressionPlugin } = require('./dist/regression/index');
const path = require('path');

const getFileName = ({ browser, name }, type, diff) => {
  const [theme, component, test] = name.split(':');
  return path.join(
    browser.replace('windows ', ''),
    type,
    theme,
    component,
    diff ? `${test}-diff` : test,
  );
};

const config = {
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: '20000' // default 2000
    }
  },
};

if (process.env.TEST_ENV === 'visual' || process.env.TEST_ENV === 'update') {
  config.concurrency = 1;

  config.testRunnerHtml = testFramework => `
    <!DOCTYPE html>
    <html>
      <body>
        <script>window.polymerSkipLoadingFontRoboto = true;</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `;

  config.plugins = [
    visualRegressionPlugin({
      baseDir: 'test/visual/screenshots',
      getBaselineName: (args) => getFileName(args, 'baseline'),
      getDiffName: (args) => getFileName(args, 'failed', true),
      getFailedName: (args) => getFileName(args, 'failed'),
      diffOptions: {
        threshold: 0.2
      },
      update: process.env.TEST_ENV === 'update'
    })
  ];
}

const sauceLabsLauncher = createSauceLabsLauncher(
  {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
  },
  {
    name: 'Components visual tests',
    build: `${process.env.GITHUB_REF || 'local'} build ${process.env.GITHUB_RUN_NUMBER || ''}`
  }
);

config.browsers = [
  sauceLabsLauncher({
    browserName: 'chrome',
    platformName: 'Windows 10',
    browserVersion: 'latest'
  }),
  sauceLabsLauncher({
    browserName: 'firefox',
    platformName: 'Windows 10',
    browserVersion: 'latest'
  })
];

module.exports = config;
