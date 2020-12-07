import { visualDiff } from '@web/test-runner-visual-regression';
import '@vaadin/vaadin-progress-bar/theme/material/vaadin-progress-bar.js';

describe('progress-bar', () => {
  let div;

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
  });

  it('basic', async () => {
    await visualTest('basic');
  });

  it('RTL', async () => {
    document.documentElement.setAttribute('dir', 'rtl');
    await visualTest('rtl');
    document.documentElement.removeAttribute('dir');
  });
});
