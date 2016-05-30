import EventEmitter from '../event-emitter';
import Action from '../actions/action';

export default class Store extends EventEmitter {
  private dispatcher: EventEmitter;
  private data: any = {};
  private Actions;
  constructor(dispatcher: EventEmitter) {
    super();
    this.dispatcher = dispatcher;
    this.Actions = Action.Protocol(this.dispatcher);
    this.Actions.INITIALIZE((config) => {
      this.onInitialize(config);
    });
  }
  getData() {
    return this.data;
  }
  private onInitialize(config) {
    this.data.config = config;
    this.Actions.FETCHED_DATA((data) => {
      this.onFetchData(data);
    });
    this.Actions.RENDER(() => {
      this.onRender();
    });
  }
  private onRender() {
    this.data.prepareText = "now loading...";
    this.emit("PREPARE");
  }
  private onFetchData(data) {
    this.data.fetchedData = data;
    this.emit('COMPLETE');
  }
  Protocol = {
    COMPLETE: (f: () => void) => {
      this.on("COMPLETE", f);
    },
    PREPARE: (f: () => void) => {
      this.on("PREPARE", f);
    }
  };
}
