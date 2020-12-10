import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs.js';
import { createTest, fixture } from '../utils.js';

const screenshot = createTest('tabs');

describe('tabs', () => {
  let div;

  describe('horizontal', () => {
    before(() => {
      div = fixture(`
        <vaadin-tabs>
          <vaadin-tab>Foo</vaadin-tab>
          <vaadin-tab>Bar</vaadin-tab>
          <vaadin-tab>Baz</vaadin-tab>
          <vaadin-tab disabled>Disabled</vaadin-tab>
        </vaadin-tabs>
      `);
      document.body.appendChild(div);
    });

    after(() => {
      document.body.removeChild(div);
    });

    it('horizontal', async () => {
      await screenshot(div, 'horizontal');
    });

    it('RTL horizontal', async () => {
      await screenshot(div, 'rtl-horizontal');
    });
  });

  describe('vertical', () => {
    before(() => {
      div = fixture(`
        <vaadin-tabs orientation="vertical" style="width: 150px">
          <vaadin-tab>Foo</vaadin-tab>
          <vaadin-tab>Bar</vaadin-tab>
          <vaadin-tab>Baz</vaadin-tab>
          <vaadin-tab disabled>Disabled</vaadin-tab>
        </vaadin-tabs>
      `);
      document.body.appendChild(div);
    });

    after(() => {
      document.body.removeChild(div);
    });

    it('vertical', async () => {
      await screenshot(div, 'vertical');
    });

    it('RTL vertical', async () => {
      await screenshot(div, 'rtl-vertical');
    });
  });

  describe('anchors', () => {
    let element;

    before(() => {
      div = fixture(`
        <vaadin-tabs>
          <vaadin-tab><a href="#">Foo</a></vaadin-tab>
          <vaadin-tab><a href="#">Bar</a></vaadin-tab>
          <vaadin-tab><a href="#">Baz</a></vaadin-tab>
        </vaadin-tabs>
      `);
      document.body.appendChild(div);
      element = div.firstElementChild;
    });

    after(() => {
      document.body.removeChild(div);
    });

    it('horizontal', async () => {
      await screenshot(div, 'horizontal-anchors');
    });

    it('vertical', async () => {
      element.orientation = 'vertical';
      await screenshot(div, 'vertical-anchors');
    });
  });

  describe('scroll', () => {
    describe('horizontal scroll', () => {
      before(() => {
        div = fixture(`
          <vaadin-tabs selected="8">
            <vaadin-tab>Tab-00</vaadin-tab>
            <vaadin-tab>Tab-01</vaadin-tab>
            <vaadin-tab>Tab-02</vaadin-tab>
            <vaadin-tab>Tab-03</vaadin-tab>
            <vaadin-tab>Tab-04</vaadin-tab>
            <vaadin-tab>Tab-05</vaadin-tab>
            <vaadin-tab>Tab-06</vaadin-tab>
            <vaadin-tab>Tab-07</vaadin-tab>
            <vaadin-tab>Tab-08</vaadin-tab>
            <vaadin-tab>Tab-09</vaadin-tab>
            <vaadin-tab>Tab-10</vaadin-tab>
            <vaadin-tab>Tab-11</vaadin-tab>
            <vaadin-tab>Tab-12</vaadin-tab>
            <vaadin-tab>Tab-13</vaadin-tab>
            <vaadin-tab>Tab-14</vaadin-tab>
            <vaadin-tab>Tab-15</vaadin-tab>
          </vaadin-tabs>
        `);
        div.style.width = '400px';
        document.body.appendChild(div);
      });

      after(() => {
        document.body.removeChild(div);
      });

      it('horizontal scroll', async () => {
        await screenshot(div, 'horizontal-scroll');
      });

      it('RTL horizontal scroll', async () => {
        await screenshot(div, 'rtl-horizontal-scroll');
      });
    });

    describe('vertical scroll', () => {
      before(() => {
        div = fixture(`
          <vaadin-tabs selected="8" orientation="vertical" style="overflow: hidden">
            <vaadin-tab>Tab-00</vaadin-tab>
            <vaadin-tab>Tab-01</vaadin-tab>
            <vaadin-tab>Tab-02</vaadin-tab>
            <vaadin-tab>Tab-03</vaadin-tab>
            <vaadin-tab>Tab-04</vaadin-tab>
            <vaadin-tab>Tab-05</vaadin-tab>
            <vaadin-tab>Tab-06</vaadin-tab>
            <vaadin-tab>Tab-07</vaadin-tab>
            <vaadin-tab>Tab-08</vaadin-tab>
            <vaadin-tab>Tab-09</vaadin-tab>
            <vaadin-tab>Tab-10</vaadin-tab>
            <vaadin-tab>Tab-11</vaadin-tab>
            <vaadin-tab>Tab-12</vaadin-tab>
            <vaadin-tab>Tab-13</vaadin-tab>
            <vaadin-tab>Tab-14</vaadin-tab>
            <vaadin-tab>Tab-15</vaadin-tab>
          </vaadin-tabs>
        `);
        div.style.height = '150px';
        div.style.display = 'inline-flex';
        document.body.appendChild(div);
      });

      after(() => {
        document.body.removeChild(div);
      });

      it('vertical scroll', async () => {
        await screenshot(div, 'vertical-scroll');
      });

      it('RTL vertical scroll', async () => {
        await screenshot(div, 'rtl-vertical-scroll');
      });
    });
  });
});
