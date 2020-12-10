import '@vaadin/vaadin-select/theme/material/vaadin-select.js';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box.js';
import '@vaadin/vaadin-item/theme/material/vaadin-item.js';
import { createTest } from '../utils.js';

const screenshot = createTest('select');

describe('select', () => {
  let div, element;

  before(() => {
    const range = new Range().createContextualFragment('<div style="padding: 10px; display: inline-block"></div>');
    div = range.firstElementChild;
    document.body.appendChild(div);
  });

  beforeEach(() => {
    element = document.createElement('vaadin-select');
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
    element.renderer = (root) => {
      root.innerHTML = `
        <vaadin-list-box>
          <vaadin-item>value</vaadin-item>
        </vaadin-list-box>
      `;
    };
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
    element.renderer = (root) => {
      root.innerHTML = `
        <vaadin-list-box>
          <vaadin-item>value</vaadin-item>
        </vaadin-list-box>
      `;
    };
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
});
