declare var describe;
declare var it;
declare var chai;

import {PF} from '../lib/PF';

let expect = chai.expect;

describe('description', () => {
  describe('context', () => {
    it('assert', () => {
      expect(PF).to.be.an('object');
    });
  });
});
