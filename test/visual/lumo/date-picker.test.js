import { visualDiff } from '@web/test-runner-visual-regression';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

describe('date-picker', () => {
  let div, element;

  async function visualTest(name) {
    await visualDiff(div, `date-picker:${name}`);
  }

  before(() => {
    const range = new Range().createContextualFragment(
      '<div style="padding: 10px; display: inline-block"></div>'
    );
    div = range.firstElementChild;
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-date-picker');
    div.appendChild(element);
  });

  afterEach(() => {
    div.removeChild(element);
  });

  it('basic', async () => {
    await visualTest('basic');
  });

  it('disabled', async () => {
    element.disabled = true;
    await visualTest('disabled');
  });

  it('readonly', async () => {
    element.readonly = true;
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
    element.value = '1991-12-20';
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

  it('clear button', async () => {
    element.value = '1991-12-20';
    element.clearButtonVisible = true;
    await visualTest('clear-button');
  });

  it('prefix slot', async () => {
    const span = document.createElement('span');
    span.setAttribute('slot', 'prefix');
    span.textContent = '$';
    element.appendChild(span);
    await visualTest('prefix');
  });
});
