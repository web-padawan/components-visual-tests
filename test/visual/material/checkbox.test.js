import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox.js';
import { createTest } from '../utils.js';

const screenshot = createTest('checkbox');

describe('checkbox', () => {
  let div, element;

  before(() => {
    const range = new Range().createContextualFragment(
      '<div style="padding: 10px; display: inline-block"></div>',
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
    await screenshot(div, 'basic');
  });

  it('focus-ring', async () => {
    element.setAttribute('focus-ring', '');
    await screenshot(div, 'focus-ring');
  });

  it('disabled', async () => {
    element.disabled = true;
    await screenshot(div, 'disabled');
  });

  it('checked', async () => {
    element.checked = true;
    await screenshot(div, 'checked');
  });

  it('indeterminate', async () => {
    element.indeterminate = true;
    await screenshot(div, 'indeterminate');
  });

  it('disabled checked', async () => {
    element.disabled = true;
    element.checked = true;
    await screenshot(div, 'disabled-checked');
  });

  it('disabled indeterminate', async () => {
    element.disabled = true;
    element.indeterminate = true;
    await screenshot(div, 'disabled-indeterminate');
  });

  it('empty', async () => {
    element.textContent = '';
    await screenshot(div, 'empty');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });
});
