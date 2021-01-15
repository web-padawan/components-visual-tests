import '@vaadin/vaadin-radio-button/vaadin-radio-button.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('radio-button');

describe('radio-button', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-radio-button');
    element.textContent = 'Radio button';
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

  it('disabled checked', async () => {
    element.disabled = true;
    element.checked = true;
    await screenshot(div, 'disabled-checked');
  });

  it('empty', async () => {
    element.textContent = '';
    await screenshot(div, 'empty');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });
});
