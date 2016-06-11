import {Prop} from '../prop';
import EventEmitter from '../event-emitter';
import {Action} from '../actions/action';
import {Store} from '../stores/store';
import nano from '../utils/nano';

export default class Component {
  private store:Store;
  private prop:Prop;

  constructor(prop:Prop) {
    this.prop = prop;
    let dispatcher = new EventEmitter();
    let action = new Action(prop, dispatcher);
    let store = this.store = new Store(prop, dispatcher);
    store.prepare(this.preRender);
    store.complete(() => {
      prop.configs.forEach(config => {
        config.onpfcomplete.bind(config, action, store, dispatcher);
      });
    });
    store.complete(this.render);
    action.render();
  }

  private preRender() {
    let text = this.store.getData().prepareText;
    this.prop.configs.forEach(config => {
      config.area.innerText = text;
    });
  }

  private render() {
    let data = this.store.getData().fetchedData;
    this.prop.configs.forEach(config => {
      let el = document.createElement('div');
      el.innerHTML = nano(config.template, data);
      document.body.replaceChild(el, config.area);
    });
  }
}
