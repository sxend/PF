import EventEmitter from '../event-emitter';

export default class Store extends EventEmitter {
  private dispatcher: EventEmitter;
  private data: any = {};
  constructor(dispatcher: EventEmitter) {
    super();
    this.dispatcher = dispatcher;
    this.dispatcher.on('initialize', this.onInitialize.bind(this));
  }
  getData() {
    return this.data;
  }
  private onInitialize(config) {
    this.data.config = config;
    this.dispatcher.on('fetched_data', this.onFetchData.bind(this));
    this.dispatcher.on('render', this.onRender.bind(this));
  }
  private onRender() {
    this.data.prepareText = "now loading...";
    this.emit("PREPARE");
  }
  private onFetchData(data) {
    this.data.fetchedData = data;
    this.emit('COMPLETE');
  }
}
