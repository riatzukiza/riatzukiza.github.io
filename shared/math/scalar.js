Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
var Scalar = Interface.define("Scalar", { 
  init( value = this.value ){ 
    
      this.value = value;
      return this;
    
   },
  mul( array = this.array,value = this.value ){ 
    
      return array.map((function() {
        /* eval.sibilant:1:450 */
      
        return (arguments[0] * value);
      }));
    
   },
  div( array = this.array,value = this.value ){ 
    
      return array.map((function() {
        /* eval.sibilant:1:519 */
      
        return (arguments[0] / value);
      }));
    
   },
  sub( array = this.array,value = this.value ){ 
    
      return array.map((function() {
        /* eval.sibilant:1:588 */
      
        return (arguments[0] - value);
      }));
    
   }
 });
exports.Scalar = Scalar;