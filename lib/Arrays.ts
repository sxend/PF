export module Arrays {
  'use strict';

  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  export function findIndex(arr, predicate): number {
    if (arr === null) {
      throw new TypeError('findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(arr);
    /* tslint:disable */
    var length = list.length >>> 0;
    /* tslint:enable */
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
