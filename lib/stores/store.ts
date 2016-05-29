import EventEmitter from '../event-emitter';

export default class Store extends EventEmitter {
  private data: any = {};
  constructor(dispatcher: EventEmitter) {
    super();
    dispatcher.on('fetched_data', this.onFetchData.bind(this));
    dispatcher.on('render', this.onRender.bind(this));
  }
  getData() {
    return this.data;
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
