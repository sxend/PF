export default class EventEmitter {
  private _maxListener:number;
  private _listeners:{[name:string]:Function[]} = {};
  private _onces:{[name:string]:Function[]} = {};

  setMaxListeners(maxListener:number) {
    this._maxListener = maxListener;
  }

  getMaxListeners() {
    return this._maxListener;
  }

  emit(name:string, message?:any) {
    (this._listeners[name] || []).concat(this._onces[name] || []).forEach(listener => {
      listener(message);
    });
    this._onces[name] = [];
  }

  addListener(name:string, listener:Function) {
    this.on(name, listener);
  }

  on(name:string, listener:Function) {
    (this._listeners[name] = this._listeners[name] || []).push(listener);
  }

  once(name:string, listener:Function) {
    (this._onces[name] = this._onces[name] || []).push(listener);
  }

  removeListener(name:string, listener:Function) {
    let listeners = this._listeners[name];
    let index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  removeAllListeners(name:string) {
    delete this._listeners[name];
  }

  listeners(name:string) {
    return this._listeners[name];
  }

  listenerCount(name:string) {
    return this._listeners[name] ? this._listeners[name].length : 0;
  }
}
