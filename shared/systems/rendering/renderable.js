Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Interface
 } = require("@kit-js/interface");
var Renderable = Interface.define("Renderable", { 
  init( layer = this.layer,structure = this.structure ){ 
    
      this.layer = layer;this.structure = structure;
      return this;
    
   },
  clear(  ){ 
    
      return this.layer = null;
    
   }
 });
exports.Renderable = Renderable;