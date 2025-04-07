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
var ParentSystem = Spawnable.define("ParentSystem", { 
  systemType:GameSystem,
  init( system = this.systemType.spawn() ){ 
    
      this.system = system;
      this.start();
      return this;
    
   },
  _update( args = this.args,buffers = this.buffers,system = this.system ){ 
    
      return system.update(args, system.data).then(((data) => {
      	return this.send(data);
      }));
    
   },
  start(  ){ 
    
      const handleMessage=((args, buffers) => {
      	return this._update(args, buffers);
      });
      self.onmessage = (function self$onmessage$(e) {
        /* self.onmessage eval.sibilant:15:4 */
      
        const buffers=e.data.buffers;
        const args=e.data.args;
        return handleMessage(args, buffers);
      });
      return self.onmessage;
    
   },
  send( data ){ 
    
      return self.postMessage(data);
    
   }
 });
export { 
  ParentSystem
 };