import nano from './nano';
import EventEmitter from './event-emitter';
import Action from './actions/action';
import Store from './stores/store';

export module PF {
  'use strict';
  export var template = nano;
  export function ready(callback): void {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
  }
  export function main(configs: any[]): void {
    configs.forEach(config => {
      let dispatcher = new EventEmitter();
      let action = new Action(dispatcher);
      let store = new Store(dispatcher);
      store.on('PREPARE', () => {
        config.area.innerText = store.getData().prepareText;
      });
      store.on('COMPLETE', () => {
        let data = store.getData().fetchedData;
        let el = document.createElement('div');
        el.innerHTML = nano(config.template, data);
        document.body.replaceChild(el, config.area);
      });
      action.render(config);
    });
  }
}
