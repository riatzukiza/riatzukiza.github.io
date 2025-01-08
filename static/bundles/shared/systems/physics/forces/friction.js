require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/systems/physics/forces/friction.js":[function(require,module,exports){
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
  Physics
 } = require("@shared/systems/physics/system.js");
var Friction = Physics.Force.define("Friction", { 
  template:true,
  get config(  ){ 
    
      throw (new Error("No config provided to friction force sub system."))
    
   },
  apply( c = this.c,config = this.config ){ 
    
      var v = c.velocity;
      var physics = c.system.process.systems.get(Physics, c.entity);
      return (function() {
        if (!((v.xd === 0 && v.yd === 0))) {
          v.xd = (v.xd * (1 / (config.stationaryResistanceCoefficiant + (physics.mass * config.friction))));
          v.yd = (v.yd * (1 / (config.stationaryResistanceCoefficiant + (physics.mass * config.friction))));
          return null;
        }
      }).call(this);
    
   }
 });
exports.Friction = Friction;
},{"@shared/systems/physics/system.js":"@shared/systems/physics/system.js"}]},{},[]);
