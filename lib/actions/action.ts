import EventEmitter from '../event-emitter';

export default class Action {
  private dispatcher: EventEmitter;
  constructor(dispatcher: EventEmitter) {
    this.dispatcher = dispatcher;
  }
  render(config: any): void {
    this.dispatcher.emit('initialize', config);
    let id = config.id;
    window['pfcallback_' + id] = (data) => {
      setTimeout(() => {
        this.dispatcher.emit('fetched_data', data);
      }, Math.random() * 500);
    };
    let script = document.createElement('script');
    script.async = true;
    script.src = '//localhost:8000/examples/' + id + '.jsonp';
    document.body.appendChild(script);
    this.dispatcher.emit('render');
  }
}
