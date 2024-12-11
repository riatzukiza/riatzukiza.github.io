require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/trail-dots.js":[function(require,module,exports){
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
},{"@obstacles/colors.js":"@obstacles/colors.js","@shared/systems/rendering/dot.js":"@shared/systems/rendering/dot.js"}]},{},[]);
