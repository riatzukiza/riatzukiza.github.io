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
  DotInterface,
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  Layer
 } = require("@shared/systems/rendering/layer.js"),
    { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js"),
    { 
  ScalingVertex
 } = require("@shared/systems/rendering/scaling-vertex.js"),
    { 
  SpriteInterface,
  Sprite
 } = require("@shared/systems/rendering/sprite.js"),
    { 
  Vertex
 } = require("@shared/systems/rendering/vertex.js");