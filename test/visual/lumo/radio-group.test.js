import '@vaadin/vaadin-radio-button/vaadin-radio-group.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('radio-group');

describe('radio-group', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-radio-group');
    element.innerHTML = `
      <vaadin-radio-button value="a">A</vaadin-radio-button>
      <vaadin-radio-button value="b">B</vaadin-radio-button>
      <vaadin-radio-button value="c">C</vaadin-radio-button>
    `;
    div.appendChild(element);
  });

  afterEach(() => {
    div.removeChild(element);
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('disabled', async () => {
    element.disabled = true;
    await screenshot(div, 'disabled');
  });

  it('vertical', async () => {
    element.setAttribute('theme', 'vertical');
    await screenshot(div, 'vertical');
  });

  it('label', async () => {
    element.label = 'Label';
    await screenshot(div, 'label');
  });

  it('value', async () => {
    element.value = 'a';
    await screenshot(div, 'value');
  });

  it('required', async () => {
    element.label = 'Label';
    element.required = true;
    await screenshot(div, 'required');
  });

  it('error message', async () => {
    element.label = 'Label';
    element.errorMessage = 'This field is required';
    element.required = true;
    element.validate();
    await screenshot(div, 'error-message');
  });

  it('helper text', async () => {
    element.helperText = 'Helper text';
    await screenshot(div, 'helper-text');
  });

  it('wrapped', async () => {
    element.style.width = '150px';
    await screenshot(div, 'wrapped');
  });

  it('RTL basic', async () => {
    await screenshot(div, 'rtl');
  });

  it('RTL error message', async () => {
    element.label = 'Label';
    element.errorMessage = 'This field is required';
    element.required = true;
    element.validate();
    await screenshot(div, 'rtl-error-message');
  });

  it('RTL wrapped', async () => {
    element.style.width = '150px';
    await screenshot(div, 'rtl-wrapped');
  });
});
