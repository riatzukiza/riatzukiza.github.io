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
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
var Thread = WebWorker.define("Thread", { 
  init( url = this.url,promise = Promise.resolve() ){ 
    
      this.url = url;this.promise = promise;
      WebWorker.init.call(this);
      return this;
    
   },
  send:sendThread
 });
export { 
  Thread
 };