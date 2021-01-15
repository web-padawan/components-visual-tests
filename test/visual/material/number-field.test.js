import '@vaadin/vaadin-text-field/theme/material/vaadin-number-field.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('number-field');

describe('number-field', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-number-field');
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
    element.placeholder = 'Number';
    await screenshot(div, 'placeholder');
  });

  it('value', async () => {
    element.value = 10;
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

  it('controls', async () => {
    element.hasControls = true;
    await screenshot(div, 'controls');
  });
});
