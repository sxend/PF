export function assign(target, source: any, ...parents: any[]) {
  'use strict';
  let ctx = this;
  let from = Object(source);
  let to = Object(target);
  if (!!parents && parents.length > 0) {
    to = assign.apply(ctx, [to].concat(parents));
  }
  for (var key in from) {
    if (from.hasOwnProperty(key)) {
      to[key] = from[key];
    }
  }
  return to;
};
