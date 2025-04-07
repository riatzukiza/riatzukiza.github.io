Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

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
var ChildSystem = Spawnable.define("ChildSystem", { 
  data:[],
  args:{  },
  get buffers(  ){ 
    
      return this.data.map((({ 
        buffers
       }) => {
      	return buffers;
      }));
    
   },
  init( url = this.url,data = this.data,args = this.args ){ 
    
      this.url = url;this.data = data;this.args = args;
      return this;
    
   },
  start(  ){ 
    
      this.thread = Thread.spawn(this.url);
      return this.thread.start();
    
   },
  update( args = this.args,buffers = this.buffers,thread = this.thread ){ 
    
      return thread.send({ 
        args,
        buffers
       });
    
   }
 });
export { 
  ThreadedSystem
 };