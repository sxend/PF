
export default class EventEmitter {
  private _maxListener: number;
  private _listeners = {};
  private _onces = {};

  setMaxListeners(maxListener: number) {
    this._maxListener = maxListener;
  }
  getMaxListeners() {
    return this._maxListener;
  }
  emit(name: string, message?: any) {
    (this._listeners[name] || []).concat(this._onces[name] || []).forEach(listener => {
      listener(message);
    });
    this._onces[name] = [];
  }
  addListener(name: string, listener) {
    this.on(name, listener);
  }
  on(name: string, listener) {
    (this._listeners[name] = this._listeners[name] || []).push(listener);
  }
  once(name: string, listener) {
    (this._onces[name] = this._onces[name] || []).push(listener);
  }
  removeListener(name: string) {
    delete this._listeners[name];
  }
  removeAllListeners(name: string, listener) {
    let listeners = this._listeners[name];
    var index = listeners[name].indexOf(listener);
    if (index !== -1) {
      delete listeners[name][index];
    }
  }
  listeners(name: string) {
    return this._listeners[name];
  }
  listenerCount(name: string) {
    return this._listeners[name] ? this._listeners[name].length : 0;
  }
}
