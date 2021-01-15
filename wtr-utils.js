const fs = require('fs');
const path = require('path');

const getFileName = ({ browser, name }, type, diff) => {
  const [component, test] = name.split(':');
  return path.join(
    browser.replace('Windows 10 ', '').replace(' latest', ''),
    type,
    component,
    diff ? `${test}-diff` : test
  );
};

exports.getBaselineName = (args) => getFileName(args, 'baseline');

exports.getDiffName = (args) => getFileName(args, 'failed', true);

exports.getFailedName = (args) => getFileName(args, 'failed');

exports.getTestGroups = (theme) => {
  const dir = `./test/visual/${theme}/`;

  return fs
    .readdirSync(dir)
    .filter((file) => file.includes('test.js'))
    .map((file) => {
      return {
        name: file.replace('.test.js', ''),
        files: `${dir}${file}`
      };
    });
};
