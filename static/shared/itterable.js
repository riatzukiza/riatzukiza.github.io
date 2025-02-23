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
var Itterable = Data.define("Itterable", { 
  get:target,
  map( f = this.f,data = this.data,target = this.target ){ 
    
      forIn__BANG(key, data, target[key] = f(data, key););
      return target;
    
   },
  generator(  ){ 
    
   },
  flat(  ){ 
    
   },
  filter(  ){ 
    
   }
 });