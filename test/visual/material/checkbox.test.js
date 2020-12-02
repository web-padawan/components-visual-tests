import { visualDiff } from '../../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox.js';

describe('checkbox', () => {
  let div, element, text;

  async function visualTest(name) {
    await visualDiff(div, `material:checkbox:${name}`);
  }

  beforeEach(() => {
    div = document.createElement('div');
    div.style.padding = '10px';
    div.style.display = 'inline-block';
    element = document.createElement('vaadin-checkbox');
    div.appendChild(element);
    document.body.appendChild(div);
    text = document.createTextNode('Checkbox');
    element.appendChild(text);
  });

  afterEach(() => {
    document.body.removeChild(div);
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
});
