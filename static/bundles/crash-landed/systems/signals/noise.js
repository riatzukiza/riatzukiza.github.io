require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/signals/noise.js":[function(require,module,exports){
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
  SparseVectorField
 } = require("@shared/data-structures/fields/sparse.js");
var { 
  Signal,
  Influence
 } = require("@crash-landed/systems/signal.js");
var noise = require("@shared/noise.js");
var config = require("@crash-landed/config.js");
var NoiseField = SparseVectorField.define("NoiseField", { 
  angleZoom:config.angleZoom,
  noiseZ:config.noiseZ,
  force:config.fieldForce,
  _equation( x = this.x,y = this.y,t = this.t,t_ = this.t_,v = this.v,v_ = this.v_,angleZoom = this.angleZoom,noiseZ = this.noiseZ,force = this.force ){ 
    
      v.setAngle((noise.simplex3((x / angleZoom / 5), (y / angleZoom / 5), (t * (noiseZ / 10000))) * Math.PI * 2));
      return v.setLength(((noise.simplex3(((x / 50) + 40000), ((y / 50) + 40000), (t * (noiseZ / 10000))) * force) / 20));
    
   }
 });
var Static = Influence.define("Static", { 
  
 });
var Noise = Signal.define("Noise", { 
  interface:Static,
  field:NoiseField.spawn()
 });
exports.Noise = Noise;
},{"@crash-landed/config.js":"@crash-landed/config.js","@crash-landed/systems/signal.js":"@crash-landed/systems/signal.js","@shared/data-structures/fields/sparse.js":"@shared/data-structures/fields/sparse.js","@shared/noise.js":"@shared/noise.js"}]},{},[]);
