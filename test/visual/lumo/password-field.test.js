import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('password-field');

describe('password-field', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-password-field');
    div.appendChild(element);
  });

  afterEach(() => {
    div.removeChild(element);
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('value', async () => {
    element.value = 'value';
    await screenshot(div, 'value');
  });

  it('clear button', async () => {
    element.value = 'value';
    element.clearButtonVisible = true;
    await screenshot(div, 'clear-button');
  });

  it('reveal button hidden', async () => {
    element.value = 'value';
    element.revealButtonHidden = true;
    await screenshot(div, 'reveal-hidden');
  });

  it('RTL value', async () => {
    element.value = 'value';
    await screenshot(div, 'rtl-value');
  });

  it('RTL clear button', async () => {
    element.value = 'value';
    element.clearButtonVisible = true;
    await screenshot(div, 'rtl-clear-button');
  });

  it('RTL reveal button hidden', async () => {
    element.value = 'value';
    element.revealButtonHidden = true;
    await screenshot(div, 'rtl-reveal-hidden');
  });
});
