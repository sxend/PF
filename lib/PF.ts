import {Context} from "./context";
import {Cache} from './Cache';
import {Arrays} from './Arrays';

export module PF {
  'use strict';

  var render = function() {
    var context: Context = this;
    var registerTasks = context.require('registerTasks');
    registerTasks([]);
  };
  var setup = function() {
    var context: Context = this;
    var registerTasks = context.require('registerTasks');
    registerTasks([]);
  };
  export function register(config: any): void {
    var context = createContext(config);
    initialize(context);
    if (context.get('version') === void 0 || context.get('version') === 1) {
      context.require('render')();
    } else {
      context.require('setup')();
    }
    context.require('startTasks')();
  }
  function createContext(config: any): Context {
    return new Context(config);
  }

  function initialize(context: Context): void {
    context.set<Cache>('cache', new Cache());
    initializeTaskMethods(context);
    context.define('render', render);
    context.define('setup', setup);
  }
  function initializeTaskMethods(context: Context) {
    context.set<Function[]>("tasks", []);
    context.set<number>('index', 0);
    context.define('insertTask', function(index: number, newTask: Function, name: string = "") {
      if (name) {
        Object.defineProperty(newTask, 'name', {
          value: name
        });
      }
      context.get<Function[]>('tasks').splice(index, 0, newTask);
    });
    context.define('setNextTask', function(newTask: Function, name: string = "") {
      context.require('insertTask')(context.get<number>('index') + 1, newTask, name);
    });
    context.define('getTaskIndex', function(name: string): number {
      return Arrays.findIndex(context.get<Function[]>('tasks'), (task) => task['name'] === name);
    });
    context.define('registerTasks', function(newTasks: Function[]) {
      context.set('tasks', context.get<Function[]>('tasks').concat(newTasks));
    });
    defineStartTasks(context);
  }
  function defineStartTasks(context: Context) {
    var tasksStarted = false;
    context.define('startTasks', function() {
      if (tasksStarted) {
        console.log('tasks already started.');
        return;
      }
      tasksStarted = true;
      function next() {
        var task = context.get<Function[]>('tasks')[context.get<number>('index')];
        if (!task) {
          console.log("all task is done");
          return;
        }
        task.call(context, _next);
      }

      function _next() {
        context.set('index', context.get<number>('index') + 1);
        setTimeout(next, 0);
      }
      next();
    });
  }
}
