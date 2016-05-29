declare var describe;
declare var it;
declare var chai;

import {assign} from '../lib/utils/assign';

let expect = chai.expect;

describe('assign', () => {
  describe('apply', () => {
    it('returns extended object', () => {
      let result = assign({}, {}, {});
      expect(result).to.deep.equal({});
    });
  });
});
