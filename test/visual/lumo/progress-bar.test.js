import { visualDiff } from '../../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';

describe('progress-bar', () => {
  let div, element;

  async function visualTest(name) {
    await visualDiff(div, `progress-bar:${name}`);
  }

  before(() => {
    const range = new Range().createContextualFragment(`
      <div style="width: 300px; padding: 10px; display: inline-block">
        <vaadin-progress-bar value="0.1"></vaadin-progress-bar>
      </div>
    `);
    div = range.firstElementChild;
    document.body.appendChild(div);
    element = div.firstElementChild;
  });

  it('basic', async () => {
    await visualTest('basic');
  });

  it('RTL', async () => {
    document.documentElement.setAttribute('dir', 'rtl');
    await visualTest('rtl');
    document.documentElement.removeAttribute('dir');
  });

  it('contrast', async () => {
    element.setAttribute('theme', 'contrast');
    await visualTest('contrast');
  });

  it('success', async () => {
    element.setAttribute('theme', 'success');
    await visualTest('success');
  });

  it('error', async () => {
    element.setAttribute('theme', 'error');
    await visualTest('error');
  });
});
