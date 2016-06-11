import Component from './components/component';
import {Prop} from './prop';

export module PF {
  'use strict';
  export function ready(callback): void {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      callback();
    } else {
      let handler = () => {
        document.removeEventListener('DOMContentLoaded', handler);
        callback();
      };
      document.addEventListener('DOMContentLoaded', handler, false);
    }
  }
  export function main(prop: Prop): void {
    new Component(prop);
  }
}
