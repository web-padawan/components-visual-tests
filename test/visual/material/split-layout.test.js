import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('split-layout');

describe('split-layout', () => {
  let div;

  before(() => {
    div = fixture(`
      <vaadin-split-layout style="width: 200px; height: 100px">
        <div></div>
        <div></div>
      </vaadin-split-layout>
    `);
    document.body.appendChild(div);
  });

  it('horizontal', async () => {
    await screenshot(div, 'horizontal');
  });

  it('vertical', async () => {
    const layout = div.firstElementChild;
    layout.orientation = 'vertical';
    await screenshot(div, 'vertical');
  });
});
