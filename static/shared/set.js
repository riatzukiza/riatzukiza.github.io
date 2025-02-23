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
var Set = Data.define("Set", { 
  get delete(  ){ 
    
      return remove.delete;
    
   },
  get set(  ){ 
    
      return this.data;
    
   },
  construct( data ){ 
    
      return (new Set(data));
    
   },
  add( member ){ 
    
      return this.data.set(member);
    
   },
  remove( member = this.member,data = this.data ){ 
    
      return data.delete(member);
    
   },
  each( f ){ 
    
   },
  map( f ){ 
    
   }
 });