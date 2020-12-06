const path = require('path');

const getFileName = ({ browser, name }, type, diff) => {
  const [component, test] = name.split(':');
  return path.join(browser.replace('windows ', ''), type, component, diff ? `${test}-diff` : test);
};

exports.getBaselineName = (args) => getFileName(args, 'baseline');

exports.getDiffName = (args) => getFileName(args, 'failed', true);

exports.getFailedName = (args) => getFileName(args, 'failed');
