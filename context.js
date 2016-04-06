'use strict';

function task(next) {
  var context = this;
  console.log("task print timestamp: " + (context.get('timestamp') || "first task call."));
  context.set('timestamp', Date.now());
  context.require('insertTask')(context.get('index') + 1, insertedTask);
  context.require('insertTask')(context.get('index') + 2, insertedTask);
  context.require('insertTask')(context.get('index') + 3, insertedTask);
  context.require('insertTask')(context.get('index') + 4, insertedTask);
  context.require('insertTask')(context.get('index') + 5, insertedTask);
  setTimeout(function() {
    console.log("task is done.");
    next();
  }, 1000);
}

function insertedTask(next) {
  var context = this;
  console.log('this is inserted task!!');
  setTimeout(function() {
    console.log("task is done.");
    next();
  }, 1000);
}

function initialize(next) {
  var context = this;
  context.define('insertTask', function(index, newTask) {
    context.get('tasks').splice(index, 0, newTask);
  });
  context.require('insertTask')(context.get('index') + 1, task);
  next();
}

function main(context) {
  context.set('tasks', []);
  context.set('index', 0);

  function next() {
    var task = context.get('tasks')[context.get('index')];
    if (!task) {
      console.log("all task is done");
      return;
    }
    task.call(context, _next);
  }

  function _next() {
    context.set('index', context.get('index') + 1);
    setTimeout(next, 0);
  }

  initialize.call(context, next);
}

class Context {
  constructor() {
    this.data = {};
    this.set('methods', {});
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
  }
}
main(new Context());
