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
  Component,
  System
 } = require("@shared/ecs.js");
var PositionInterface = Component.define("PositionInterface", { 
  x:0,
  y:0,
  z:0,
  _clear(  ){ 
    
      this.x = null;
      this.y = null;
      return this.z = null;
    
   }
 });
exports.PositionInterface = PositionInterface;
var Position = System.define("Position", { 
  interface:PositionInterface,
  shift( c,[ xshift, yshift ] ){ 
    
      c.x = (c.x + xshift);
      c.y = (c.y + yshift);
      return this._updateComponent(c);
    
   },
  move( entity,{ 
    x,
    y
   } ){ 
    
      var c = this.components.get(entity);
      c.x = x;
      c.y = y;
      return this._updateComponent(c);
    
   },
  _updateComponent( c ){ 
    
      (function() {
        if (c.x < 0) {
          return c.x = (c.x + this.process.rendering.dimensions[0]);
        }
      }).call(this);
      (function() {
        if (c.y < 0) {
          return c.y = (c.y + this.process.rendering.dimensions[1]);
        }
      }).call(this);
      c.x = (c.x % this.process.rendering.dimensions[0]);
      return c.y = (c.y % this.process.rendering.dimensions[1]);
    
   }
 });
exports.Position = Position;