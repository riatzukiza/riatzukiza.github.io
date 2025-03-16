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
  CompositeTypedArray
 } from "./composite.js";
var DoubleBufferedArray = CompositeTypedArray.define("DoubleBufferedArray", { 
  get arrayType(  ){ 
    
      const t=Object.create(CompositeTypedArray);
      t.dataType = this.dataType;
      return t;
    
   },
  init( length = 0,currentState = this.arrayType.spawn(length),nextState = this.arrayType.spawn(length) ){ 
    
      this.length = length;this.currentState = currentState;this.nextState = nextState;
      return this;
    
   },
  step(  ){ 
    
      const state=this.currentState;
      const nextState=this.nextState;
      this.nextState = state;
      return this.currentState = nextState;
    
   }
 });
export { 
  DoubleBufferedArray
 };