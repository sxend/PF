import assign from '../utils/assign';
import EventEmitter from '../event-emitter';
import Action from '../actions/action';
import Store from '../stores/store';
import nano from '../utils/nano';

export default class Component {
  private config;
  private state = {};
  constructor(config) {
    this.config = config;
    let dispatcher = new EventEmitter();
    let action = new Action(dispatcher);
    let store = new Store(dispatcher);

    store.on('PREPARE', () => {
      config.area.innerText = store.getData().prepareText;
    });
    store.on('COMPLETE', () => {
      config.onpfcomplete();
      let data = store.getData().fetchedData;
      let el = document.createElement('div');
      el.innerHTML = nano(config.template, data);
      document.body.replaceChild(el, config.area);
    });
    action.render(config);
  }
  setState(nextState: any) {
    this.state = assign({}, nextState, this.state);
  }
}
