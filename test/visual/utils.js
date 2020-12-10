import { visualDiff } from '@web/test-runner-visual-regression';

export const createTest = (component) => async (target, name) => {
  const rtl = name.startsWith('rtl');
  rtl && document.documentElement.setAttribute('dir', 'rtl');
  await visualDiff(target, `${component}:${name}`);
  rtl && document.documentElement.removeAttribute('dir');
};
