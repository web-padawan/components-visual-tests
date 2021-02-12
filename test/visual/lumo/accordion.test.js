import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('accordion');

describe('accordion', () => {
  let div, element;

  before(() => {
    div = fixture(`
      <vaadin-accordion>
        <vaadin-accordion-panel>
          <div slot="summary">Panel 1</div>
          <div>Content 1</div>
        </vaadin-accordion-panel>
        <vaadin-accordion-panel>
          <div slot="summary">Panel 2</div>
          <div>Content 2</div>
        </vaadin-accordion-panel>
        <vaadin-accordion-panel>
          <div slot="summary">Panel 3</div>
          <div>Content 3</div>
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `);
    document.body.appendChild(div);
    element = div.firstElementChild;
  });

  it('opened-start', async () => {
    await screenshot(div, 'opened-start');
  });

  it('opened-middle', async () => {
    element.opened = 1;
    await screenshot(div, 'opened-middle');
  });

  it('opened-end', async () => {
    element.opened = 2;
    await screenshot(div, 'opened-end');
  });

  it('closed', async () => {
    element.opened = null;
    await screenshot(div, 'closed');
  });
});
