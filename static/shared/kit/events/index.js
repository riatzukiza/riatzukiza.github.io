Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  Interface
 } from "../interface/index.js";
var R = require("ramda"),
    events = require("events");
var emit = R.curry(((event, emitter, data) => {
	return emitter.emit(event, data);
}));
var bubble = (function bubble$(src, target, event) {
  /* bubble eval.sibilant:14:0 */

  "cause an `event` on `src` to be emitted on another `target` emitter";
  return src.on(event, emit(event, target));
});
var EventEmitter = Interface.define("EventEmitter", { 
  init(  ){ 
    
      
      events.EventEmitter.call(this);
      return this;
    
   },
  doc:("a simple wrapper around the " + "event" + " modules  type" + "EventEmitter"),
  extend:events.EventEmitter.prototype
 });
export { 
  EventEmitter
 };
export { 
  emit
 };
export { 
  bubble
 };