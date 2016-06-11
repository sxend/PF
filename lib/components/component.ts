import EventEmitter from '../event-emitter';
import Action from '../actions/action';
import Store from '../stores/store';
import nano from '../utils/nano';

export default class Component {
  constructor(props) {
    props.configs.forEach(config => {
      let dispatcher = new EventEmitter();
      let action = new Action(dispatcher);
      let store = new Store(dispatcher);

      store.Protocol.PREPARE(() => {
        config.area.innerText = store.getData().prepareText;
      });
      store.Protocol.COMPLETE(() => {
        config.onpfcomplete.bind(config, action, store, dispatcher);
      });
      store.Protocol.COMPLETE(() => {
        let data = store.getData().fetchedData;
        let el = document.createElement('div');
        el.innerHTML = nano(config.template, data);
        document.body.replaceChild(el, config.area);
      });
      action.render(config);
    });
  }
}