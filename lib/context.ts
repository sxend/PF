export default class Context {
  data: any;
  constructor(config: any = {}) {
    this.data = {};
    this.set('methods', {});
    this.set('config', config);
  }
  get(name) {
    return this.data[name];
  }
  set(name, value) {
    this.data[name] = value;
  }
  require(name) {
    var fn = this.get('methods')[name];
    if (typeof fn !== 'function') {
      return;
    }
    return fn.bind(this);
  }
  define(name, fn) {
    this.get('methods')[name] = fn;
  }}
