import { expect } from '@esm-bundle/chai';

describe('string', () => {
  it('should pass', () => {
    expect('a' + 'b').to.equal('ab');
  });
});
