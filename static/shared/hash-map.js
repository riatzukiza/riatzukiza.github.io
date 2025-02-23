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
var HashMap = Data.define("HashMap", { 
  construct( keyValuePairs = this.keyValuePairs,mapFn = ((v) => {
  	return v;
  }) ){ 
    
      const result=Object.create(null);
      return for (var key of Object.keys(keyValuePairs))
      {
      result[key] = mapFn(keyValuePairs[key], key);
      }
      ;
    
   },
  set(  ){ 
    
   },
  get(  ){ 
    
   },
  each(  ){ 
    
   },
  some(  ){ 
    
   },
  every(  ){ 
    
   },
  where(  ){ 
    
   },
  when(  ){ 
    
   }
 });