var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Andy
 } = require("@shared/gl.js");
var { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js");
var setColor = (function setColor$(r, g, b, a, vert) {
  /* set-color eval.sibilant:1:279 */

  vert.color.r = r;
  vert.color.g = g;
  vert.color.b = b;
  return vert.color.a = a;
});
var setPoint = (function setPoint$(x, y, z, vert) {
  /* set-point eval.sibilant:1:385 */

  vert.point.x = x;
  vert.point.y = y;
  return vert.point.z = z;
});
var Vertex = Renderable.define("Vertex", { 
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   },
  structure:(new Andy.Gl.Type.Composite({ 
    point:Andy.Type.Vector3,
    color:Andy.Color.RGBA,
    size:Andy.Type.float
   }))
 });
exports.Vertex = Vertex;