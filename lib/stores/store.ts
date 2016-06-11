import EventEmitter from '../event-emitter';
import {Action, Protocol} from '../actions/action';

export class Store extends EventEmitter {
  private dispatcher:EventEmitter;
  private data:any = {};
  private action:Protocol;

  constructor(dispatcher:EventEmitter) {
    super();
    this.dispatcher = dispatcher;
    this.action = Action.protocol(dispatcher);
    this.action.initialize(this.onInitialize);
  }

  getData() {
    return this.data;
  }

  private onInitialize(config) {
    this.data.config = config;
    this.action.fetchedData(this.onFetchData);
    this.action.render(this.onRender);
  }

  private onRender() {
    this.data.prepareText = "now loading...";
    this.emit("PREPARE");
  }

  private onFetchData(data) {
    this.data.fetchedData = data;
    this.emit('COMPLETE');
  }

  public complete(f:() => void) {
    this.on("COMPLETE", f);
  }

  public prepare(f:() => void) {
    this.on("PREPARE", f);
  }
}
