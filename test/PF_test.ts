declare var describe;
declare var it;
declare var chai;

import {PF} from '../lib/PF';

let expect = chai.expect;

describe('PF', () => {
  describe('import', () => {
    it('returns object', () => {
      expect(PF).to.be.an('object');
    });
  });
});
