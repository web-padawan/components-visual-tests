import { visualDiff } from '../../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox.js';

describe('checkbox', () => {
  let div, element;

  async function visualTest(name) {
    await visualDiff(div, `checkbox:${name}`);
  }

  before(() => {
    const range = new Range().createContextualFragment(
      '<div style="padding: 10px; display: inline-block"></div>'
    );
    div = range.firstElementChild;
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-checkbox');
    element.textContent = 'Checkbox';
    div.appendChild(element);
  });

  afterEach(() => {
    div.removeChild(element);
  });

  it('basic', async () => {
    await visualTest('basic');
  });

  it('focus-ring', async () => {
    element.setAttribute('focus-ring', '');
    await visualTest('focus-ring');
  });

  it('disabled', async () => {
    element.disabled = true;
    await visualTest('disabled');
  });

  it('checked', async () => {
    element.checked = true;
    await visualTest('checked');
  });

  it('indeterminate', async () => {
    element.indeterminate = true;
    await visualTest('indeterminate');
  });

  it('disabled checked', async () => {
    element.disabled = true;
    element.checked = true;
    await visualTest('disabled-checked');
  });

  it('disabled indeterminate', async () => {
    element.disabled = true;
    element.indeterminate = true;
    await visualTest('disabled-indeterminate');
  });

  it('empty', async () => {
    element.textContent = '';
    await visualTest('empty');
  });

  it('RTL', async () => {
    document.documentElement.setAttribute('dir', 'rtl');
    await visualTest('rtl');
  });
});
