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
 } from "../kit/interface/index.js";
var Spawnable = Interface.define("Spawnable", { 
  build(  ){ 
    
      return this.pool = [];
    
   },
  spawn( ...args ){ 
    
      return (function() {
        if (this.pool.length > 0) {
          return this.pool.pop().init(...args);
        } else {
          return create(this)(...args);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      throw (new Error("No clear function defined for spawnable datatype"))
    
   },
  despawn(  ){ 
    
      this.clear();
      return this.pool.push(this);
    
   }
 });
export { 
  Spawnable
 };