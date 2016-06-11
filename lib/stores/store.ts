import {Prop} from '../prop';
import EventEmitter from '../event-emitter';
import {Action, Protocol} from '../actions/action';

export class Store extends EventEmitter {
  private prop: Prop;
  private dispatcher:EventEmitter;
  private data:any = {};
  private action:Protocol;

  constructor(prop: Prop, dispatcher:EventEmitter) {
    super();
    this.prop = prop;
    this.dispatcher = dispatcher;
    this.action = Action.protocol(dispatcher);
    this.action.initialize(this.onInitialize);
  }

  getData() {
    return this.data;
  }

  private onInitialize() {
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
