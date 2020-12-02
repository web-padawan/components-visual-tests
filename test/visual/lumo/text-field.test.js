import { visualDiff } from '../../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-text-field';

describe('text-field', () => {
  let div, element;

  async function visualTest(name) {
    await visualDiff(div, `lumo:text-field:${name}`);
  }

  beforeEach(() => {
    div = document.createElement('div');
    div.style.padding = '10px';
    div.style.display = 'inline-block';
    element = document.createElement('vaadin-text-field');
    div.appendChild(element);
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('basic', async () => {
    await visualTest('basic');
  });

  it('disabled', async () => {
    element.disabled = true;
    await visualTest('disabled');
  });

  it('readonly', async () => {
    element.disabled = true;
    await visualTest('readonly');
  });

  it('label', async () => {
    element.label = 'Label';
    await visualTest('label');
  });

  it('placeholder', async () => {
    element.placeholder = 'Placeholder';
    await visualTest('placeholder');
  });

  it('value', async () => {
    element.value = 'value';
    await visualTest('value');
  });

  it('required', async () => {
    element.label = 'Label';
    element.required = true;
    await visualTest('required');
  });

  it('error message', async () => {
    element.label = 'Label';
    element.errorMessage = 'This field is required';
    element.required = true;
    element.validate();
    await visualTest('error-message');
  });

  it('helper text', async () => {
    element.helperText = 'Helper text';
    await visualTest('helper-text');
  });
});
