require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/forces.js":[function(require,module,exports){
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
  SignalField
 } = require("@shared/systems/physics/forces/signal-field.js"),
    { 
  Friction
 } = require("@shared/systems/physics/forces/friction.js"),
    { 
  game
 } = require("@obstacles/game.js"),
    { 
  createParticleUpdater,
  createVectorField
 } = require("@shared/field.js"),
    config = require("@obstacles/config.js");
console.log("initializing forces", { 
  Friction,
  SignalField
 });
var Friction = Friction.define("Friction", { 
  config:config,
  template:false,
  register(  ){ 
    
      return this.config = config;
    
   },
  reset(  ){ 
    
   }
 });
var SignalField = SignalField.define("SignalField", { 
  template:false,
  field:createVectorField(config.columns, config.rows),
  layer:createVectorField(config.columns, config.rows),
  register(  ){ 
    
      this.config = config;
      this.field = createVectorField(config.columns, config.rows);
      this.layer = createVectorField(config.columns, config.rows);
      return console.log("registering", this);
    
   },
  reset(  ){ 
    
      this.clear();
      return this.init();
    
   },
  clear(  ){ 
    
      this.field.each(((column) => {
      	
        return column.each(((cell) => {
        	
          return cell.release();
        
        }));
      
      }));
      this.layer.each(((column) => {
      	
        return column.each(((cell) => {
        	
          return cell.release();
        
        }));
      
      }));
      this.field = null;
      return this.layer = null;
    
   },
  config:config,
  game:game,
  get entities(  ){ 
    
      return require("@obstacles/entities.js");
    
   },
  updateParticle:createParticleUpdater(config, game)
 });
exports.Friction = Friction;
exports.SignalField = SignalField;
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/game.js":"@obstacles/game.js","@shared/field.js":"@shared/field.js","@shared/systems/physics/forces/friction.js":"@shared/systems/physics/forces/friction.js","@shared/systems/physics/forces/signal-field.js":"@shared/systems/physics/forces/signal-field.js"}]},{},[]);
