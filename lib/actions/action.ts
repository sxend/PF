import {Prop} from '../prop';
import EventEmitter from '../event-emitter';

export class Action {
  private prop: Prop;
  private dispatcher:EventEmitter;

  constructor(prop: Prop, dispatcher:EventEmitter) {
    this.prop = prop;
    this.dispatcher = dispatcher;
  }

  render():void {
    this.dispatcher.emit('initialize');
    let id = this.prop.id;
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