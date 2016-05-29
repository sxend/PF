import EventEmitter from '../event-emitter';

export default class Action {
  private dispatcher: EventEmitter;
  constructor(dispatcher: EventEmitter) {
    this.dispatcher = dispatcher;
  }
  render(config: any): void {
    let id = config.id;
    window['pfcallback_' + id] = (data) => {
      setTimeout(() => {
        this.dispatcher.emit('fetched_data', data);
      }, Math.random() * 500);
    };
    let el = document.createElement('script');
    el.async = true;
    el.src = '//localhost:8000/examples/' + id + '.jsonp';
    document.body.appendChild(el);
    this.dispatcher.emit('render');
  }
}
