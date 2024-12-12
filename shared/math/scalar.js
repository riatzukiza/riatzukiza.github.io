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
        /* eval.sibilant:1:307 */
      
        return (arguments[0] * value);
      }));
    
   },
  div( array = this.array,value = this.value ){ 
    
      return array.map((function() {
        /* eval.sibilant:1:376 */
      
        return (arguments[0] / value);
      }));
    
   },
  sub( array = this.array,value = this.value ){ 
    
      return array.map((function() {
        /* eval.sibilant:1:445 */
      
        return (arguments[0] - value);
      }));
    
   }
 });
exports.Scalar = Scalar;