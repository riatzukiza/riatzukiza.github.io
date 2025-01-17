require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/systems/rendering.js":[function(require,module,exports){
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

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
},{"@shared/systems/rendering/dot.js":"@shared/systems/rendering/dot.js","@shared/systems/rendering/layer.js":"@shared/systems/rendering/layer.js","@shared/systems/rendering/renderable.js":"@shared/systems/rendering/renderable.js","@shared/systems/rendering/scaling-vertex.js":"@shared/systems/rendering/scaling-vertex.js","@shared/systems/rendering/sprite.js":"@shared/systems/rendering/sprite.js","@shared/systems/rendering/vertex.js":"@shared/systems/rendering/vertex.js"}]},{},[]);
