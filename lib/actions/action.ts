import {Prop} from '../prop';
import EventEmitter from '../event-emitter';

export class Action {
  private prop:Prop;
  private dispatcher:EventEmitter;

  constructor(prop:Prop, dispatcher:EventEmitter) {
    this.prop = prop;
    this.dispatcher = dispatcher;
  }

  render():void {
    this.dispatcher.emit('initialize');
    this.prop.configs.forEach(config => {
      window['pfcallback_' + config.id] = (data) => {
        this.dispatcher.emit('fetched_data', {
          config: config,
          data: data
        });
      };
      let script = document.createElement('script');
      script.async = true;
      script.src = '//localhost:8000/examples/' + config.id + '.jsonp';
      document.body.appendChild(script);
      this.dispatcher.emit('render');
    });
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

  public onInitialize(f:() => void) {
    this.dispatcher.on('initialize', f);
  }

  public onFetchedData(f:(any) => void) {
    this.dispatcher.on('fetched_data', f);
  }

  public onRender(f:() => void) {
    this.dispatcher.on('render', f);
  }
}