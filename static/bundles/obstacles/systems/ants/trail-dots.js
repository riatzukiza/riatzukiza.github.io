require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/trail-dots.js":[function(require,module,exports){
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
      this.vertex.color.a = baseColor.a;
      return this.vertex.size = 1;
    
   }
 });
exports.TrailDot = TrailDot;
var TrailDots = Dot.define("TrailDots", { 
  maxVerts:100000,
  interface:TrailDot,
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
},{"@obstacles/colors.js":"@obstacles/colors.js","@shared/systems/rendering/dot.js":"@shared/systems/rendering/dot.js"}]},{},[]);
