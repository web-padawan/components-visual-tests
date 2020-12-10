import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('progress-bar');

describe('progress-bar', () => {
  let div, element;

  before(() => {
    div = fixture('<vaadin-progress-bar value="0.1"></vaadin-progress-bar>');
    div.style.width = '300px';
    document.body.appendChild(div);
    element = div.firstElementChild;
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });

  it('contrast', async () => {
    element.setAttribute('theme', 'contrast');
    await screenshot(div, 'contrast');
  });

  it('success', async () => {
    element.setAttribute('theme', 'success');
    await screenshot(div, 'success');
  });

  it('error', async () => {
    element.setAttribute('theme', 'error');
    await screenshot(div, 'error');
  });
});
