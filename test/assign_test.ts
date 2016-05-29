declare var describe;
declare var it;
declare var chai;

import {assign} from '../lib/utils/assign';

let expect = chai.expect;

describe('assign', () => {
  describe('apply', () => {
    it('returns object', () => {
      let result = assign({}, {}, {});
      expect(result).to.deep.equal({});
    });
    it('returns merged object', () => {
      let result = assign({}, { a: 1 }, { b: 2 });
      expect(result).to.deep.equal({ a: 1, b: 2 });
    });
    it('returns merged object', () => {
      let result = assign({}, { a: 1 }, { a: 2, b: 2 });
      expect(result).to.deep.equal({ a: 1, b: 2 });
    });
    it('returns merged object', () => {
      let result = assign({}, { a: 1 }, { b: 2 }, { c: 3 });
      expect(result).to.deep.equal({ a: 1, b: 2, c: 3 });
    });
    it('returns merged object', () => {
      let result = assign({}, { a: 1, b: 1 }, { b: 2, c: 2 }, { c: 3 }, { d: 4 });
      expect(result).to.deep.equal({ a: 1, b: 1, c: 2, d: 4 });
    });
  });
});
