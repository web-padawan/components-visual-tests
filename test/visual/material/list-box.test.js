import '@vaadin/vaadin-item/theme/material/vaadin-item.js';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box.js';
import { createTest } from '../utils.js';

const screenshot = createTest('list-box');

describe('list-box', () => {
  let div;

  before(() => {
    const range = new Range().createContextualFragment(`
      <div style="padding: 10px; display: inline-block">
        <vaadin-list-box selected="2">
          <vaadin-item>Item 0</vaadin-item>
          <vaadin-item>Item 1</vaadin-item>
          <vaadin-item>Item 2 (selected)</vaadin-item>
          <vaadin-item disabled>Item 3 (disabled)</vaadin-item>
          <vaadin-item>Item 4</vaadin-item>
        </vaadin-list-box>
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
