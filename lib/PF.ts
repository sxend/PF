import Component from './components/component';

export module PF {
  'use strict';
  export function ready(callback): void {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
  }
  export function main(props: any): void {
    new Component(props);
  }
}
