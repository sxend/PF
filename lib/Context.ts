export class Context {
  'use strict';
  private data: any;
  constructor(config: any = {}) {
    this.data = {};
    this.set('methods', {});
    this.set('config', config);
  }
  get<A>(name: string): A {
    return <A> this.data[name];
  }
  set<A>(name: string, value: A): void {
    this.data[name] = value;
  }
  require(name: string): Function {
    var instance = this.get('methods')[name];
    if (typeof instance === 'function') {
      return instance.bind(this);
    }
  }
  define(name: string, fn: Function): void {
    this.get('methods')[name] = fn;
  }
}
