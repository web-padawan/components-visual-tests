import { visualDiff } from '../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-text-field';

describe('visual tests', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('vaadin-text-field');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('default', async () => {
    await visualDiff(element, 'default');
  });

  it('disabled', async () => {
    element.disabled = true;
    await visualDiff(element, 'disabled');
  });

  it('label', async () => {
    element.label = 'Label';
    await visualDiff(element, 'label');
  });
});
