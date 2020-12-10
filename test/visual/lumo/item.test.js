import '@vaadin/vaadin-item/vaadin-item.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('item');

describe('item', () => {
  let div, element;

  before(() => {
    div = fixture();
    document.body.appendChild(div);
    div.style.setProperty('--_lumo-item-selected-icon-display', 'block');
    div.style.padding = '0px';
  });

  beforeEach(() => {
    element = document.createElement('vaadin-item');
    element.textContent = 'Vaadin Item';
    div.appendChild(element);
  });

  afterEach(() => {
    div.removeChild(element);
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('focusable', async () => {
    element.setAttribute('tabindex', '0');
    await screenshot(div, 'focusable');
  });

  it('selected', async () => {
    element.setAttribute('tabindex', '0');
    element.setAttribute('selected', '');
    await screenshot(div, 'selected');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });

  it('RTL focusable', async () => {
    element.setAttribute('tabindex', '0');
    await screenshot(div, 'rtl-focusable');
  });

  it('RTL selected', async () => {
    element.setAttribute('tabindex', '0');
    element.setAttribute('selected', '');
    await screenshot(div, 'rtl-selected');
  });

  it('multi line', async () => {
    const second = document.createElement('div');
    second.textContent = 'Second line';
    element.appendChild(second);
    await screenshot(div, 'multi-line');
  });
});
