import { visualDiff } from '../../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-text-field/theme/material/vaadin-text-field.js';

describe('visual tests', () => {
  let div, element;

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

  it('default', async () => {
    await visualDiff(div, 'material-text-field-default');
  });

  it('disabled', async () => {
    element.disabled = true;
    await visualDiff(div, 'material-text-field-disabled');
  });

  it('label', async () => {
    element.label = 'Label';
    await visualDiff(div, 'material-text-field-label');
  });
});
