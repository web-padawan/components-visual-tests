import '@vaadin/vaadin-details/theme/material/vaadin-details.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('details');

describe('details', () => {
  let div, element;

  beforeEach(() => {
    div = fixture(`
      <vaadin-details>
        <div slot="summary">Summary</div>
        <span>Content</span>
      </vaadin-details>
    `);
    document.body.appendChild(div);
    element = div.firstElementChild;
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('opened', async () => {
    element.opened = true;
    await screenshot(div, 'opened');
  });

  it('focus-ring', async () => {
    element.setAttribute('focus-ring', '');
    await screenshot(div, 'focus-ring');
  });

  it('disabled', async () => {
    element.disabled = true;
    await screenshot(div, 'disabled');
  });

  it('disabled opened', async () => {
    element.opened = true;
    element.disabled = true;
    await screenshot(div, 'disabled-opened');
  });

  it('RTL basic', async () => {
    await screenshot(div, 'rtl');
  });

  it('RTL opened', async () => {
    element.opened = true;
    await screenshot(div, 'rtl-opened');
  });
});
