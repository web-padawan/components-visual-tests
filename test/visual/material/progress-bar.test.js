import '@vaadin/vaadin-progress-bar/theme/material/vaadin-progress-bar.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('progress-bar');

describe('progress-bar', () => {
  let div;

  before(() => {
    div = fixture('<vaadin-progress-bar value="0.1"></vaadin-progress-bar>');
    div.style.width = '300px';
    document.body.appendChild(div);
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });
});
