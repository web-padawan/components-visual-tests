import { visualDiff } from '../../../src/regression/browser/commands.mjs';
import '@vaadin/vaadin-upload/theme/material/vaadin-upload.js';

describe('upload', () => {
  let div, element;

  async function visualTest(name) {
    const rtl = name.startsWith('rtl');
    rtl && document.documentElement.setAttribute('dir', 'rtl');
    await visualDiff(div, `upload:${name}`);
    rtl && document.documentElement.removeAttribute('dir');
  }

  before(() => {
    const range = new Range().createContextualFragment(`
      <div style="padding: 10px; display: inline-block">
        <vaadin-upload></vaadin-upload>
      </div>
    `);
    div = range.firstElementChild;
    document.body.appendChild(div);
    element = div.firstElementChild;
  });

  it('basic', async () => {
    await visualTest('basic');
  });

  it('RTL', async () => {
    await visualTest('rtl');
  });

  describe('files', () => {
    before(() => {
      element.files = [
        { name: 'Don Quixote.pdf', progress: 100, complete: true },
        { name: 'Hamlet.pdf', progress: 100, complete: true }
      ];
    });

    it('files', async () => {
      await visualTest('files');
    });

    it('RTL files', async () => {
      await visualTest('rtl-files');
    });
  });
});
