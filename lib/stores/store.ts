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
    this.action.onInitialize(this.onInitialize());
  }

  getData() {
    return this.data;
  }

  private onInitialize() {
    return () => {
      this.action.onFetchedData(this.onFetchedData());
      this.action.onRender(this.onRender());
    };
  }

  private onRender() {
    return () => {
      this.data.prepareText = "now loading...";
      this.emit("PREPARE");
    };
  }

  private onFetchedData() {
    return (data) => {
      this.emit('COMPLETE', data);
    };
  }

  public onComplete(f:(any) => void) {
    this.on("COMPLETE", f);
  }

  public onPrepare(f:() => void) {
    this.on("PREPARE", f);
  }
}
