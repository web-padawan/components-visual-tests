import '@vaadin/vaadin-upload/vaadin-upload.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('upload');

describe('upload', () => {
  let div, element;

  before(() => {
    div = fixture('<vaadin-upload></vaadin-upload>');
    document.body.appendChild(div);
    element = div.firstElementChild;
  });

  it('basic', async () => {
    await screenshot(div, 'basic');
  });

  it('RTL', async () => {
    await screenshot(div, 'rtl');
  });

  describe('files', () => {
    before(() => {
      element.files = [
        { name: 'Don Quixote.pdf', progress: 100, complete: true },
        { name: 'Hamlet.pdf', progress: 100, complete: true }
      ];
    });

    it('files', async () => {
      await screenshot(div, 'files');
    });

    it('RTL files', async () => {
      await screenshot(div, 'rtl-files');
    });
  });
});
