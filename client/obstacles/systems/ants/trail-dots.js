var { 
  DotInterface,
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  rgba
 } = require("@obstacles/colors.js");
const baseColor=rgba(20, 20, 125, 255);
var TrailDot = DotInterface.define("TrailDot", { 
  _color:baseColor,
  changed__QUERY:true,
  get color(  ){ 
    
      return this._color;
    
   },
  set color( c ){ 
    
      this.changed__QUERY = true;
      return this._color = c;
    
   },
  _clear(  ){ 
    
      DotInterface._clear.call(this);
      return this.color = baseColor;
    
   },
  register(  ){ 
    
      DotInterface.register.call(this);
      this.vertex.color.r = baseColor.r;
      this.vertex.color.g = baseColor.g;
      this.vertex.color.b = baseColor.b;
      this.vertex.color.a = 0;
      return this.vertex.size = 1;
    
   }
 });
exports.TrailDot = TrailDot;
var TrailDots = Dot.define("TrailDots", { 
  maxVerts:100000,
  interface:TrailDot,
  visible__QUERY:true,
  toggleVisibility(  ){ 
    
      return (function() {
        if (this.visible__QUERY) {
          this.components.each(((c) => {
          	
            return c.vertex.color.a = 0;
          
          }));
          return this.visible__QUERY = false;
        } else {
          return this.visible__QUERY = true;
        }
      }).call(this);
    
   },
  _updateAll( args ){ 
    
      return (function() {
        if (this.visible__QUERY) {
          return this.proto._updateAll.call(this, args);
        }
      }).call(this);
    
   },
  _updateComponent( dot ){ 
    
      dot.vertex.color.a = Math.round(Math.max(0, (255 * (dot.entity.trailSegment.remainingTime / dot.entity.trailSegment.duration))));
      if( dot.changed__QUERY ){ 
        dot.vertex.color.r = dot.color.r;
        dot.vertex.color.g = dot.color.g;
        dot.vertex.color.b = dot.color.b;;
        this.changed__QUERY = false;
       };
      return null;
    
   }
 });
exports.TrailDots = TrailDots;