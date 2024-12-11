var { 
  DotInterface,
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  rgba
 } = require("@obstacles/colors.js");
const baseColor=rgba(0, 0, 255, 255);
var TrailDot = DotInterface.define("TrailDot", { 
  color:rgba(0, 0, 255, 255),
  _clear(  ){ 
    
      return this.color = baseColor;
    
   }
 });
exports.TrailDot = TrailDot;
var TrailDots = Dot.define("TrailDots", { 
  interface:TrailDot,
  _updateComponent( dot ){ 
    
      dot.vertex.point.x = dot.pos.x;
      dot.vertex.point.y = dot.pos.y;
      dot.vertex.point.z = dot.pos.z;
      dot.vertex.size = 1;
      dot.vertex.color.r = dot.color.r;
      dot.vertex.color.g = dot.color.g;
      dot.vertex.color.b = dot.color.b;
      return dot.vertex.color.a = Math.round(Math.max(0, (255 * (dot.entity.trailSegment.remainingTime / dot.entity.trailSegment.duration))));
    
   }
 });
exports.TrailDots = TrailDots;