import Context from './context';

export function main(context) {
  context.define('insertTask', function(index, newTask) {
    context.get('tasks').splice(index, 0, newTask);
  });
  var tasks = [
    preRender,
    adCall,
    reAdCall,
    observe
  ]
  context.method('insertTask', context.get('index') + 1, adCall);
}
function preRender(next) {
  var context: Context = this;
  context.require
}
function adCall(next) { }
function reAdCall(next) { }
function observe(next) { }
