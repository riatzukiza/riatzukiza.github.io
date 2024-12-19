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
var { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js"),
    { 
  Andy
 } = require("@shared/gl.js");
var ScalingVertex = Renderable.define("ScalingVertex", { 
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   },
  clear(  ){ 
    
   },
  structure:(new Andy.Gl.Type.Composite({ 
    point:Andy.Type.Vector3,
    color:Andy.Color.RGBA,
    size:Andy.Type.float
   }))
 });
exports.ScalingVertex = ScalingVertex;