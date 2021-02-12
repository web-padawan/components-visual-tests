import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('dialog');

describe('dialog', () => {
  let div;

  before(() => {
    div = fixture(`
      <vaadin-dialog opened>
        <template>
          <div>Simple dialog with text</div>
        </template>
      </vaadin-dialog>
    `);
    document.body.style.height = '600px';
    document.body.appendChild(div);
  });

  it('basic', async () => {
    await screenshot(document.body, 'basic');
  });
});
