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
    store.onPrepare(this.preRender());
    store.onComplete(({config}) => {
      config.onpfcomplete.bind(config, action, store, dispatcher);
    });
    store.onComplete(this.render());
    action.render();
  }

  private preRender() {
    return () => {
      let text = this.store.getData().prepareText;
      this.prop.configs.forEach(config => {
        config.area.innerText = text;
      });
    };
  }

  private render() {
    return ({config, data}) => {
      let el = document.createElement('div');
      el.innerHTML = nano(config.template, data);
      document.body.replaceChild(el, config.area);
    };
  }
}
