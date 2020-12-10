import '@vaadin/vaadin-progress-bar/theme/material/vaadin-progress-bar.js';
import { createTest } from '../utils.js';

const screenshot = createTest('progress-bar');

describe('progress-bar', () => {
  let div;

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
    await screenshot(div, 'basic');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });
});
