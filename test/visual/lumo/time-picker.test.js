import '@vaadin/vaadin-time-picker/vaadin-time-picker.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('time-picker');

describe('time-picker', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-time-picker');
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
    element.value = '12:12:12.122';
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
    element.value = '12:12:12.122';
    element.clearButtonVisible = true;
    await screenshot(div, 'clear-button');
  });
});
