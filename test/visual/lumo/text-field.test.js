import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('text-field');

describe('text-field', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-text-field');
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

  it('readonly', async () => {
    element.readonly = true;
    await screenshot(div, 'readonly');
  });

  it('label', async () => {
    element.label = 'Label';
    await screenshot(div, 'label');
  });

  it('placeholder', async () => {
    element.placeholder = 'Placeholder';
    await screenshot(div, 'placeholder');
  });

  it('value', async () => {
    element.value = 'value';
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

  it('clear button', async () => {
    element.value = 'value';
    element.clearButtonVisible = true;
    await screenshot(div, 'clear-button');
  });

  it('prefix slot', async () => {
    const span = document.createElement('span');
    span.setAttribute('slot', 'prefix');
    span.textContent = '$';
    element.appendChild(span);
    await screenshot(div, 'prefix');
  });

  it('suffix slot', async () => {
    const span = document.createElement('span');
    span.setAttribute('slot', 'suffix');
    span.textContent = '$';
    element.appendChild(span);
    await screenshot(div, 'suffix');
  });
});
