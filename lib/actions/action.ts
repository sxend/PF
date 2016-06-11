import EventEmitter from '../event-emitter';

export class Action {
  private dispatcher:EventEmitter;

  constructor(dispatcher:EventEmitter) {
    this.dispatcher = dispatcher;
  }

  render(config:any):void {
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

  static protocol(dispatcher):Protocol {
    return new Protocol(dispatcher);
  }
}

export class Protocol {
  private dispatcher:EventEmitter;

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  public initialize(f:(any) => void) {
    this.dispatcher.on('initialize', f);
  }

  public fetchedData(f:(any) => void) {
    this.dispatcher.on('fetched_data', f);
  }

  public render(f:(any) => void) {
    this.dispatcher.on('render', f);
  }
}